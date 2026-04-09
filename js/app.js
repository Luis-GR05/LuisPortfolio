/**
 * @file app.js
 * @description Orquestador principal — punto de entrada de la aplicación.
 *   Patrón: Dependency Injection. Todos los módulos reciben sus datos aquí.
 *   No hay estado global disperso — todo fluye desde CONFIG → módulos.
 */

import { CONFIG }          from './config.js';
import { initRouter }      from './modules/router.js';
import { Typewriter }      from './modules/typewriter.js';
import { SkillTreeEngine } from './modules/skill-tree.js';
import { ProjectsEngine }  from './modules/projects.js';
import { initFx, runBoot } from './modules/fx.js';
import { initContact }     from './modules/contact.js';

// ── Punto de entrada ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initApp().catch(err => {
    console.error('[APP] Error de arranque:', err);
  });
});


async function initApp() {

  // 1. Inyectar datos del dev en el DOM (antes que todo lo demás)
  injectDevData();

  // 2. Efectos visuales: cursor, noise canvas, reloj, Konami
  initFx();

  // 3. Router de navegación SPA
  const router = initRouter();

  // 4. Subsistemas de contenido (pueden renderizar mientras el boot corre)
  SkillTreeEngine.init(CONFIG.skills);
  ProjectsEngine.init(CONFIG.projects);
  initContact();

  // 5. CTA "Contacto" en home → navega a la vista de contacto
  document.getElementById('cta-contact')?.addEventListener('click', () => {
    router.navigate('view-contact');
    // Sincronizar botón de nav activo
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.target === 'view-contact');
    });
  });

  // 6. Boot sequence — revela el HUD al terminar
  await runBoot(CONFIG.bootLines);
  document.body.classList.add('is-booted');

  // 7. Typewriter del bio DESPUÉS del boot (usuario ya ve el HUD)
  const bioEl    = document.getElementById('hero-bio');
  const cursorEl = document.querySelector('.bio-cursor');
  if (bioEl) {
    new Typewriter(bioEl, { speed: 18, cursorEl }).type(CONFIG.bio);
  }

  // Log de sistema en consola (branded)
  console.log(
    `%c LuisPortfolio.OS v${CONFIG.version} \n%c Loaded in: ${Math.round(performance.now())}ms`,
    'background: #00c8ff; color: #000; font-weight: bold; padding: 4px 8px;',
    'color: #00c8ff;'
  );
}


/**
 * Inyecta todos los datos del CONFIG en los nodos del DOM.
 * Separación estricta: el HTML define la estructura, JS inyecta los datos.
 * CORRECCIÓN CRÍTICA: data-text sincronizado con textContent para glitch.
 */
function injectDevData() {
  // Nombre en el sidebar (glitch)
  const nameEl = document.getElementById('dev-name');
  if (nameEl) {
    nameEl.textContent = CONFIG.handle;
    nameEl.setAttribute('data-text', CONFIG.handle); // ← FIX: glitch necesita esto
  }

  // H1 hero
  setTextContent('hero-name', CONFIG.name);
  setTextContent('hero-role', CONFIG.role);

  // Footer / sidebar
  setTextContent('sys-status',     CONFIG.status);
  setTextContent('sys-status-bar', CONFIG.status);
  setTextContent('sys-location',   CONFIG.location);
}

/** Helper: setea textContent de forma segura */
function setTextContent(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
