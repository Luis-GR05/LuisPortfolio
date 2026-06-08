/**
 * @file fx.js
 * @description Efectos visuales de la interfaz premium.
 *   - Cursor personalizado reactivo
 *   - Reloj y uptime en footer
 *   - Barra de carga e inicio del sistema (Preloader)
 *   - Easter egg (Código Konami)
 */



/* ══════════════════════════════════════════════
   RELOJ Y UPTIME EN FOOTER
   ══════════════════════════════════════════════ */

function initFooterClock() {
  const clockEl  = document.getElementById('footer-clock');
  const uptimeEl = document.getElementById('footer-uptime');
  const startTime = Date.now();

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now = new Date();

    // Actualizar reloj
    if (clockEl) {
      clockEl.textContent =
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    // Actualizar tiempo de sesión (uptime)
    if (uptimeEl) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const h = Math.floor(elapsed / 3600);
      const m = Math.floor((elapsed % 3600) / 60);
      const s = elapsed % 60;
      uptimeEl.textContent = `UP: ${pad(h)}:${pad(m)}:${pad(s)}`;
    }
  }

  update();
  setInterval(update, 1000);
}


/* ══════════════════════════════════════════════
   PRELOADER - SECUENCIA DE ARRANQUE
   ══════════════════════════════════════════════ */

/**
 * Anima la barra de progreso y desvanece el preloader.
 * @returns {Promise<void>}
 */
export async function runBoot() {
  const overlay    = document.getElementById('boot-overlay');
  const barFill    = document.getElementById('boot-bar-fill');
  const labelText  = document.getElementById('boot-progress-label');

  if (!overlay || !barFill) return;

  const steps = [
    'SYS_INIT...',
    'CARGANDO TOKENS DE DISEÑO...',
    'COMPILANDO PROYECTOS...',
    'RENDERIZANDO INTERFAZ...',
    'SISTEMA LISTO'
  ];

  return new Promise(resolve => {
    let progress = 0;

    const interval = setInterval(() => {
      // Incremento aleatorio de velocidad de carga
      progress += Math.floor(Math.random() * 8) + 4;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        barFill.style.width = '100%';
        if (labelText) labelText.textContent = 'SYSTEM READY';

        // Ocultar preloader tras pequeña pausa
        setTimeout(async () => {
          await hideOverlay(overlay);
          resolve();
        }, 500);
      } else {
        barFill.style.width = `${progress}%`;
        const stepIdx = Math.min(Math.floor(progress / 22), steps.length - 1);
        if (labelText) labelText.textContent = steps[stepIdx];
      }
    }, 60);
  });
}

function hideOverlay(overlayEl) {
  return new Promise(resolve => {
    if (typeof gsap !== 'undefined') {
      gsap.to(overlayEl, {
        opacity: 0,
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          overlayEl.style.display = 'none';
          resolve();
        },
      });
    } else {
      // Fallback CSS
      overlayEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      overlayEl.style.opacity = '0';
      overlayEl.style.transform = 'translateY(-100%)';
      overlayEl.addEventListener('transitionend', () => {
        overlayEl.style.display = 'none';
        resolve();
      }, { once: true });
    }
  });
}


/* ══════════════════════════════════════════════
   EASTER EGG — CÓDIGO KONAMI
   ══════════════════════════════════════════════ */

function initKonamiCode() {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let sequence = [];

  document.addEventListener('keydown', (e) => {
    sequence.push(e.key);
    if (sequence.length > KONAMI.length) sequence.shift();

    if (sequence.join(',') === KONAMI.join(',')) {
      activateKonami();
      sequence = [];
    }
  });
}

function activateKonami() {
  console.log('%c[EASTER EGG] ¡Código Konami activado! 🎮', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');

  // Cambiar color primario temporalmente a rosa neon
  document.documentElement.style.setProperty('--c-primary', 'hsl(320, 100%, 60%)');

  // Reproducir efectos de sonido retro a través de Web Audio API
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.18);
    });
  } catch (_) {}

  // Restaurar colores normales
  setTimeout(() => {
    document.documentElement.style.removeProperty('--c-primary');
  }, 3000);
}


/* ══════════════════════════════════════════════
   EXPORT PRINCIPAL
   ══════════════════════════════════════════════ */

export function initFx() {
  initFooterClock();
  initKonamiCode();
}
