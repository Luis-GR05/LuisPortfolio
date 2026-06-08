/**
 * @file app.js
 * @description Orquestador principal de la aplicación.
 *   Inicializa todos los subsistemas en el orden correcto y gestiona
 *   el ciclo de arranque del preloader.
 */

import { CONFIG }          from './config.js';
import { SliderEngine }     from './modules/slider.js';
import { Typewriter }      from './modules/typewriter.js';
import { SkillTreeEngine } from './modules/skill-tree.js';
import { ProjectsEngine }  from './modules/projects.js';
import { initFx, runBoot } from './modules/fx.js';
import { initContact }     from './modules/contact.js';

// ── Punto de Entrada ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initApp().catch(err => {
    console.error('[APP] Error crítico durante el arranque:', err);
  });
});

async function initApp() {
  // 1. Inyectar datos dinámicos del desarrollador en el DOM
  injectDevData();

  // 2. Inicializar efectos visuales generales (cursor, reloj de sesión, etc.)
  initFx();

  // 3. Inicializar motores de renderizado de contenido
  SkillTreeEngine.init(CONFIG.skills);
  ProjectsEngine.init(CONFIG.projects);
  
  // 4. Inicializar lógica de validación y envío de contacto
  initContact();

  // 5. Inicializar motor del slider vertical (pantalla completa)
  SliderEngine.init();

  // 6. Activar comportamiento del menú móvil responsivo
  setupMobileMenu();

  // 7. Ejecutar secuencia de carga del Preloader (barra de carga y textos)
  await runBoot();
  document.body.classList.add('is-booted');

  // 8. Iniciar Typewriter para la biografía (tras desaparecer el cargador)
  const bioEl    = document.getElementById('hero-bio');
  const cursorEl = document.querySelector('.bio-cursor');
  if (bioEl) {
    new Typewriter(bioEl, { speed: 18, cursorEl }).type(CONFIG.bio);
  }

  // Confirmación por consola
  console.log(
    `%c LuisPortfolio Premium v${CONFIG.version || '3.0'} %c Cargado en: ${Math.round(performance.now())}ms`,
    'background: #8b5cf6; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'color: #06b6d4; font-weight: 500;'
  );
}

/**
 * Inyecta datos estructurados en los placeholders correspondientes del DOM.
 */
function injectDevData() {
  setTextContent('hero-name', CONFIG.name);
  setTextContent('hero-role', CONFIG.role);
  
  const statusEl = document.getElementById('sys-status-bar');
  if (statusEl) {
    statusEl.textContent = `SISTEMA ${CONFIG.status || 'ONLINE'}`;
  }
}

/** Helper para inyectar textos de forma segura */
function setTextContent(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/**
 * Configura la barra de navegación del menú móvil (hamburguesa).
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !header) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-menu-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar el menú al hacer click en cualquier link de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('is-menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
