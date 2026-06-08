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

      if (!CONFIG.formspreeId || CONFIG.formspreeId === 'YOUR_FORMSPREE_ID') {
        showResponse(response, '> ERROR AL ENVIAR CORREO.', 'is-error');
        setLoadingState(false, submitBtn);
        return;
      }

      await sendToFormspree(name, email, message);
      showResponse(response, '> TRANSMISIÓN COMPLETADA. Responderé en breve.', 'is-success');
      form.reset();
    } catch (err) {
      console.error('[Contact] Error al enviar email:', err);
      showResponse(response, '> ERROR AL ENVIAR CORREO.', 'is-error');
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
  const response = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
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
