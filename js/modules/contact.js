/**
 * @file contact.js
 * @description Lógica del formulario de contacto estilo terminal.
 *   Validación en tiempo real con feedback visual.
 *   Envío simulado (sin backend). Para activar envío real:
 *   sustituir simulateSend() por fetch a Formspree/EmailJS.
 */

import { CONFIG } from '../config.js';

export function initContact() {
  const form      = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('btn-submit');
  const response  = document.getElementById('form-response');

  // Mapa de campos: id-input → id-error
  const fields = {
    'input-name':    { errorId: 'error-name',    validate: validateName },
    'input-email':   { errorId: 'error-email',   validate: validateEmail },
    'input-message': { errorId: 'error-message', validate: validateMessage },
  };

  // Validación en tiempo real (al salir del campo)
  Object.entries(fields).forEach(([inputId, { errorId, validate }]) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;

    input.addEventListener('blur', () => {
      const msg = validate(input.value);
      showFieldError(input, error, msg);
    });

    // Limpiar error mientras escribe
    input.addEventListener('input', () => {
      if (input.classList.contains('has-error')) {
        const msg = validate(input.value);
        if (!msg) clearFieldError(input, error);
      }
    });
  });

  // Envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    let isValid = true;
    Object.entries(fields).forEach(([inputId, { errorId, validate }]) => {
      const input = document.getElementById(inputId);
      const error = document.getElementById(errorId);
      const msg = validate(input?.value ?? '');
      if (msg) {
        showFieldError(input, error, msg);
        isValid = false;
      }
    });

    if (!isValid) return;

    // Estado de carga
    setLoadingState(true, submitBtn);
    clearResponse(response);

    try {
      const name = document.getElementById('input-name').value;
      const email = document.getElementById('input-email').value;
      const message = document.getElementById('input-message').value;

      let sent = false;
      let methodUsed = '';

      try {
        console.log('[Contact] Intentando enviar correo mediante API SMTP...');
        const apiResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message })
        });

        if (apiResponse.ok) {
          sent = true;
          methodUsed = 'SMTP';
          console.log('[Contact] Envío exitoso por SMTP.');
        } else {
          console.warn(`[Contact] API SMTP retornó código ${apiResponse.status}.`);
          // Si es un error que no sea 404 (Endpoint ausente en local) o 500 (SMTP sin configurar),
          // arrojamos error para no ignorar problemas de validación u otros del servidor
          if (apiResponse.status !== 404 && apiResponse.status !== 500) {
            const errData = await apiResponse.json().catch(() => ({}));
            throw new Error(errData.error || `Error del servidor: ${apiResponse.status}`);
          }
        }
      } catch (apiErr) {
        console.warn('[Contact] Error al intentar conectar con la API SMTP:', apiErr);
        // Si no es un error de fetch/red ni un error 404/500 de API, y tiene un mensaje descriptivo, propagamos
        if (apiErr.message && !apiErr.message.includes('fetch') && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('Server error')) {
          throw apiErr;
        }
      }

      // Si no se envió con SMTP (por ejemplo, en local o sin configurar), hacemos fallback a Formspree
      if (!sent) {
        if (!CONFIG.formspreeId || CONFIG.formspreeId === 'YOUR_FORMSPREE_ID') {
          throw new Error('Servicio de correo no configurado (SMTP y Formspree ausentes).');
        }
        console.log('[Contact] Iniciando fallback de envío mediante Formspree...');
        await sendToFormspree(name, email, message);
        methodUsed = 'Formspree';
        console.log('[Contact] Envío exitoso por Formspree.');
      }

      showResponse(response, '> TRANSMISIÓN COMPLETADA. Responderé en breve.', 'is-success');
      form.reset();
    } catch (err) {
      console.error('[Contact] Error al enviar email:', err);
      showResponse(response, `> ERROR: ${err.message || 'FALLO AL ENVIAR CORREO.'}`, 'is-error');
    } finally {
      setLoadingState(false, submitBtn);
    }
  });
}

/* ── Validaciones ────────────────────────────────────────────────────────── */

function validateName(value) {
  if (!value || value.trim().length < 2)
    return '> NOMBRE requerido (mínimo 2 caracteres)';
  return '';
}

function validateEmail(value) {
  if (!value || !value.includes('@') || !value.includes('.'))
    return '> EMAIL inválido';
  return '';
}

function validateMessage(value) {
  if (!value || value.trim().length < 10)
    return '> MENSAJE requerido (mínimo 10 caracteres)';
  return '';
}

/* ── Helpers de UI ───────────────────────────────────────────────────────── */

function showFieldError(input, errorEl, message) {
  if (!input || !errorEl) return;
  if (message) {
    input.classList.add('has-error');
    errorEl.textContent = message;
  } else {
    clearFieldError(input, errorEl);
  }
}

function clearFieldError(input, errorEl) {
  input?.classList.remove('has-error');
  if (errorEl) errorEl.textContent = '';
}

function setLoadingState(isLoading, btn) {
  if (!btn) return;
  btn.classList.toggle('is-loading', isLoading);
  btn.disabled = isLoading;
}

function showResponse(el, message, className) {
  if (!el) return;
  el.className = `form-response ${className}`;
  el.textContent = message;
}

function clearResponse(el) {
  if (!el) return;
  el.className = 'form-response';
  el.textContent = '';
}

/* ── Envío a Formspree ───────────────────────────────────────────────────── */

/**
 * Envía los datos del formulario a Formspree.
 */
async function sendToFormspree(name, email, message) {
  const url = CONFIG.formspreeId.startsWith('http')
    ? CONFIG.formspreeId
    : `https://formspree.io/f/${CONFIG.formspreeId}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  });

  if (!response.ok) {
    throw new Error('Formspree returned error status: ' + response.status);
  }
  return await response.json();
}
