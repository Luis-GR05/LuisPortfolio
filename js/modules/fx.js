/**
 * @file fx.js
 * @description Efectos visuales del sistema HUD.
 *   - Cursor personalizado (reemplaza el nativo)
 *   - Noise canvas (ruido estático CRT)
 *   - Boot sequence (secuencia de arranque)
 *   - Reloj y uptime en footer
 */

/* ══════════════════════════════════════════════
   CURSOR PERSONALIZADO
   ══════════════════════════════════════════════ */

function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Actualizar posición via CSS custom properties (más eficiente que left/top)
  document.addEventListener('mousemove', (e) => {
    cursor.style.setProperty('--cx', `${e.clientX}px`);
    cursor.style.setProperty('--cy', `${e.clientY}px`);
  });

  // Ocultar cursor cuando sale del viewport
  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

  // Estado hover — detectar sobre todos los elementos interactivos
  const interactiveSelector = 'a, button, [tabindex], input, textarea, label, .tree-node, .arcade-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('is-hovering');
    }
  });

  // Estado click
  document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('is-clicking'));
}


/* ══════════════════════════════════════════════
   NOISE CANVAS (Ruido estático CRT)
   ══════════════════════════════════════════════ */

function initNoiseCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id    = 'noise-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawNoise() {
    const { width, height } = canvas;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Llenar con ruido aleatorio en escala de grises
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255 | 0;
      data[i]     = value; // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 18;    // Alpha muy bajo → opacidad CSS hace el resto
    }

    ctx.putImageData(imageData, 0, 0);
    animId = requestAnimationFrame(drawNoise);
  }

  resize();
  window.addEventListener('resize', resize);
  drawNoise();

  // Reducción de movimiento: detener el canvas
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(animId);
    canvas.style.display = 'none';
  }
}


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

    // Reloj
    if (clockEl) {
      clockEl.textContent =
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    // Uptime de sesión
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
   BOOT SEQUENCE
   ══════════════════════════════════════════════ */

/**
 * Ejecuta la secuencia de arranque tipo terminal.
 * @param {Array<{text: string, delay: number, class?: string}>} lines
 * @returns {Promise<void>} Resuelve cuando el boot termina
 */
export async function runBoot(lines) {
  const overlay    = document.getElementById('boot-overlay');
  const logEl      = document.getElementById('boot-log');
  const barFill    = document.getElementById('boot-bar-fill');

  if (!overlay || !logEl) return;

  const total   = lines.length;

  // Crear y mostrar cada línea según su delay
  const promises = lines.map((entry, i) =>
    new Promise(resolve => {
      setTimeout(() => {
        const li = document.createElement('li');
        li.className = `boot-line ${entry.class ?? ''}`;
        li.textContent = `> ${entry.text}`;
        logEl.appendChild(li);
        li.scrollIntoView({ block: 'end', behavior: 'smooth' });

        // Progreso de barra
        if (barFill) {
          barFill.style.width = `${Math.round(((i + 1) / total) * 100)}%`;
        }

        resolve();
      }, entry.delay);
    })
  );

  await Promise.all(promises);

  // Pausa final antes de ocultar
  await new Promise(r => setTimeout(r, 500));

  // Ocultar overlay — GSAP si está disponible, CSS transition como fallback
  await hideOverlay(overlay);
}

function hideOverlay(overlayEl) {
  return new Promise(resolve => {
    // Usar GSAP si está cargado (más fluido)
    if (typeof gsap !== 'undefined') {
      gsap.to(overlayEl, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          overlayEl.style.display = 'none';
          resolve();
        },
      });
    } else {
      // Fallback CSS
      overlayEl.style.transition = 'opacity 0.5s ease';
      overlayEl.style.opacity = '0';
      overlayEl.addEventListener('transitionend', () => {
        overlayEl.style.display = 'none';
        resolve();
      }, { once: true });
    }
  });
}


/* ══════════════════════════════════════════════
   EASTER EGG — KONAMI CODE
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
  console.log('%c[KONAMI] Easter egg activado 🎮', 'color: #ff00ff; font-size: 16px; font-weight: bold;');

  // Invertir colores del HUD brevemente
  document.documentElement.style.setProperty('--c-primary', 'hsl(300, 100%, 60%)');
  document.documentElement.style.setProperty('--c-bg', 'hsl(270, 20%, 5%)');

  // Sonido retro via AudioContext
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.2);
    });
  } catch (_) {}

  // Restaurar colores tras 3s
  setTimeout(() => {
    document.documentElement.style.removeProperty('--c-primary');
    document.documentElement.style.removeProperty('--c-bg');
  }, 3000);
}


/* ══════════════════════════════════════════════
   EXPORT PRINCIPAL
   ══════════════════════════════════════════════ */

/** Inicializa todos los efectos FX del sistema */
export function initFx() {
  initCursor();
  initNoiseCanvas();
  initFooterClock();
  initKonamiCode();
}
