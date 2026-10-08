import { Resend } from 'resend';
import { createHash } from 'node:crypto';

/* ─────────────────────────────────────────────────────────────
   Formulario de contacto: envía el mensaje con Resend y limita
   a UN mensaje cada 24 horas por persona (mismo correo o misma IP).

   Variables de entorno en Vercel:
   - RESEND_API_KEY            clave de Resend (obligatoria)
   - CONTACT_TO_EMAIL          buzón que recibe los mensajes
   - UPSTASH_REDIS_REST_URL    base de datos Upstash Redis para el límite
   - UPSTASH_REDIS_REST_TOKEN  (las crea la integración de Upstash en Vercel)
   - RATE_LIMIT_SALT           texto secreto para cifrar correo e IP (recomendado)
   ───────────────────────────────────────────────────────────── */

const WINDOW_SECONDS = 24 * 60 * 60;
const LIMITS = { name: 100, email: 200, message: 5000 };

const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Correo e IP no se guardan en claro: solo una huella (hash) que caduca a las 24 h
const fingerprint = value =>
  createHash('sha256').update(`${process.env.RATE_LIMIT_SALT || 'luis-portfolio'}:${value}`).digest('hex');

const clientIp = req =>
  String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '')
    .split(',')[0]
    .trim();

// Llamada mínima a la API REST de Upstash (sin dependencias)
async function redis(commands) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null; // límite desactivado si no está configurado
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Upstash respondió ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { name, email, message, consent } = req.body || {};

  // ── Validación en el servidor ──
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos (nombre, email, mensaje) son obligatorios.' });
  }
  if (consent !== true) {
    return res.status(400).json({ error: 'Hay que aceptar la política de privacidad para enviar el mensaje.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    return res.status(400).json({ error: 'El correo electrónico no es válido.' });
  }
  if (String(name).length > LIMITS.name || String(email).length > LIMITS.email || String(message).length > LIMITS.message) {
    return res.status(400).json({ error: 'El mensaje es demasiado largo.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'luisgorrod@gmail.com';
  if (!apiKey) {
    return res.status(500).json({ error: 'La API Key de Resend no está configurada en las variables de entorno.' });
  }

  // ── Límite: un mensaje cada 24 h por correo y por IP ──
  const keys = [
    `contact:email:${fingerprint(String(email).trim().toLowerCase())}`,
    `contact:ip:${fingerprint(clientIp(req))}`,
  ];
  try {
    const found = await redis(keys.map(k => ['EXISTS', k]));
    if (found === null) {
      console.warn('Límite de envíos desactivado: faltan UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.');
    } else if (found.some(r => r.result === 1)) {
      return res.status(429).json({ error: 'Ya has enviado un mensaje hoy. Podrás enviar otro pasadas 24 horas.' });
    }
  } catch (err) {
    // Si el almacén falla, no se bloquea el formulario: se registra y se envía igualmente
    console.error('No se pudo comprobar el límite de envíos:', err);
  }

  try {
    const resend = new Resend(apiKey);
    const safeName = esc(name), safeEmail = esc(email), safeMessage = esc(message);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend usa este remitente mientras no haya un dominio verificado
      to: toEmail,
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${String(name).slice(0, 100)} (Portfolio)`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #2440E6; border-radius: 8px; background-color: #0F1730; color: #ffffff;">
          <h2 style="color: #9DB0FF; border-bottom: 2px solid #2440E6; padding-bottom: 10px; margin-top: 0;">Nuevo mensaje de contacto</h2>
          <p style="margin: 10px 0;"><strong style="color: #9DB0FF;">Nombre:</strong> ${safeName}</p>
          <p style="margin: 10px 0;"><strong style="color: #9DB0FF;">Email:</strong> <a href="mailto:${safeEmail}" style="color: #ffffff; text-decoration: underline;">${safeEmail}</a></p>
          <p style="margin: 15px 0 5px 0;"><strong style="color: #9DB0FF;">Mensaje:</strong></p>
          <div style="white-space: pre-line; background-color: #16203d; padding: 15px; border-left: 4px solid #2440E6; border-radius: 4px; color: #e4e4e7; line-height: 1.5;">${safeMessage}</div>
          <hr style="border: 0; border-top: 1px solid #27304d; margin: 20px 0;">
          <p style="font-size: 11px; color: #9CA8C4; text-align: center; margin: 0;">Mensaje enviado desde tu portfolio.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error retornado por la API de Resend:', error);
      return res.status(500).json({ error: `Error de Resend: ${error.message}` });
    }

    // El cupo del día solo se gasta cuando el correo sale bien
    try {
      await redis(keys.map(k => ['SET', k, '1', 'EX', String(WINDOW_SECONDS)]));
    } catch (err) {
      console.error('No se pudo registrar el envío para el límite diario:', err);
    }

    return res.status(200).json({ success: true, message: 'Email enviado correctamente.', data });
  } catch (error) {
    console.error('Error al enviar email por Resend:', error);
    return res.status(500).json({ error: `Error al enviar correo: ${error.message}` });
  }
}
