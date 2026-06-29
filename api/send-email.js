import { Resend } from 'resend';

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  const { name, email, message } = req.body;

  // Validación básica en el servidor
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos (nombre, email, mensaje) son obligatorios.' });
  }

  // Leer configuraciones de las variables de entorno
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'luisgorrod@gmail.com';

  // Verificar si Resend está configurado
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'La API Key de Resend no está configurada en las variables de entorno.' 
    });
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend requiere onboarding@resend.dev por defecto si no hay dominio configurado
      to: toEmail,
      replyTo: email,                // Permite responder directamente al remitente
      subject: `Nuevo mensaje de contacto de ${name} (Portfolio)`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #0091ff; border-radius: 8px; background-color: #0c0c0e; color: #ffffff;">
          <h2 style="color: #0091ff; border-bottom: 2px solid #0091ff; padding-bottom: 10px; margin-top: 0;">Nuevo mensaje de contacto</h2>
          <p style="margin: 10px 0;"><strong style="color: #0091ff;">Nombre:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #0091ff;">Email:</strong> <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></p>
          <p style="margin: 15px 0 5px 0;"><strong style="color: #0091ff;">Mensaje:</strong></p>
          <div style="white-space: pre-line; background-color: #16161a; padding: 15px; border-left: 4px solid #0091ff; border-radius: 4px; color: #e4e4e7; line-height: 1.5;">${message}</div>
          <hr style="border: 0; border-top: 1px solid #27272a; margin: 20px 0;">
          <p style="font-size: 11px; color: #71717a; text-align: center; margin: 0;">Mensaje enviado automáticamente desde tu Portfolio.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error retornado por la API de Resend:', error);
      return res.status(500).json({ error: `Error de Resend: ${error.message}` });
    }

    return res.status(200).json({ success: true, message: 'Email enviado correctamente.', data });
  } catch (error) {
    console.error('Error al enviar email por Resend:', error);
    return res.status(500).json({ error: `Error al enviar correo: ${error.message}` });
  }
}
