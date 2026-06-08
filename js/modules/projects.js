/**
 * @file projects.js
 * @description Motor de renderizado y control para las tarjetas de proyectos.
 *   - Crea las tarjetas agrupadas por categoría (Terminados / En proceso).
 *   - Soporte para reproducción de vídeo en hover.
 *   - Controla las flechas del carrusel horizontal con desactivación inteligente.
 */

export const ProjectsEngine = {

  /** @type {HTMLElement} */
  grid: null,
  
  /** @type {HTMLElement} */
  prevBtn: null,
  
  /** @type {HTMLElement} */
  nextBtn: null,

  /** @type {NodeListOf<HTMLElement>} */
  tabs: [],

  /** @type {Array} */
  allProjects: [],

  /** @type {string} */
  activeGroup: 'completed',

  /**
   * Inicializa el módulo de proyectos.
   * @param {Array} projects - CONFIG.projects
   */
  init(projects) {
    this.grid = document.getElementById('project-grid');
    this.prevBtn = document.getElementById('project-prev-btn');
    this.nextBtn = document.getElementById('project-next-btn');
    this.tabs = document.querySelectorAll('.project-tab-btn');
    this.allProjects = projects;

    if (!this.grid) {
      console.error('[Projects] Contenedor de proyectos no encontrado.');
      return;
    }

    this.renderActiveGroup();
    this.setupCarouselOnce();
    this.setupTabs();
    this.setupHoverVideos();
  },

  /** Configura los eventos para alternar entre pestañas de proyectos */
  setupTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const group = tab.getAttribute('data-group');
        if (group === this.activeGroup) return;

        // Cambiar clases de estado activo en las pestañas
        this.tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        this.activeGroup = group;

        // Reset del scroll del grid al inicio para evitar desajustes
        this.grid.scrollLeft = 0;

        // Renderizar grupo activo y enlazar vídeos de nuevo
        this.renderActiveGroup();
        this.setupHoverVideos();

        // Forzar actualización inmediata del estado de botones de scroll
        this.updateCarouselButtons();
      });
    });
  },

  /** Renderiza los proyectos que correspondan al grupo activo */
  renderActiveGroup() {
    const filtered = this.allProjects.filter(p => p.statusGroup === this.activeGroup);
    this.render(filtered);
  },

  /** Renderiza las tarjetas de proyectos filtradas en el DOM */
  render(projects) {
    this.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    projects.forEach((proj, index) => {
      const card = document.createElement('article');
      card.className = 'project-card animate-in';
      card.setAttribute('role', 'listitem');
      card.style.animationDelay = `${index * 0.08}s`;

      // Determinar si hay demo desplegada
      const hasDemo = proj.demoUrl && proj.demoUrl !== '#';

      card.innerHTML = `
        <div class="project-media">
          <span class="project-status-tag ${proj.statusColor || 'info'}">${proj.status}</span>
          ${proj.video ? `
            <video class="project-video" loop muted playsinline poster="${proj.previewImg || ''}">
              <source src="${proj.video}" type="video/mp4">
            </video>
          ` : ''}
          ${proj.previewImg && !proj.video ? `
            <img src="${proj.previewImg}" alt="${proj.title}" class="project-img" loading="lazy">
          ` : ''}
        </div>
        <div class="project-body">
          <div class="project-header-row">
            <h3 class="project-title">${proj.title}</h3>
            <span class="project-year">${proj.year}</span>
          </div>
          <span class="project-category">${proj.category}</span>
          <div class="project-desc-block">
            <p class="desc-row"><strong>Reto:</strong> ${proj.problem}</p>
            <p class="desc-row"><strong>Solución:</strong> ${proj.solution}</p>
            <p class="desc-row"><strong>Impacto:</strong> ${proj.impact}</p>
          </div>
        </div>
        <div class="project-footer">
          <ul class="project-tech-list" aria-label="Tecnologías usadas">
            ${proj.tech.map(t => `<li class="project-tech-tag">${t}</li>`).join('')}
          </ul>
          <div class="project-actions">
            <a href="${proj.url}" class="project-btn secondary" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            ${hasDemo ? `
              <a href="${proj.demoUrl}" class="project-btn primary" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            ` : ''}
          </div>
        </div>
      `;

      fragment.appendChild(card);
    });

    this.grid.appendChild(fragment);
  },

  /** Agrega la funcionalidad de scroll con botones prev/next del slider una sola vez */
  setupCarouselOnce() {
    if (!this.prevBtn || !this.nextBtn) return;

    // Scroll manual de paso ajustable (ancho de tarjeta + gap)
    const getScrollStep = () => {
      const card = this.grid.querySelector('.project-card');
      if (card) {
        return card.offsetWidth + 24; // 24px es el gap (var(--sp-6))
      }
      return 340; // Fallback
    };

    this.prevBtn.addEventListener('click', () => {
      this.grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    this.nextBtn.addEventListener('click', () => {
      this.grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    // Escuchar el evento scroll y resize para recalcular el estado de las flechas
    this.grid.addEventListener('scroll', () => this.updateCarouselButtons());
    window.addEventListener('resize', () => this.updateCarouselButtons());

    // Timeout inicial para dar tiempo a renderizar
    setTimeout(() => this.updateCarouselButtons(), 200);
  },

  /** Recalcula el estado deshabilitado de los botones del carrusel */
  updateCarouselButtons() {
    if (!this.prevBtn || !this.nextBtn) return;

    // Esperar al siguiente frame para asegurar que el scrollLeft/scrollWidth se actualicen
    requestAnimationFrame(() => {
      const scrollLeft = this.grid.scrollLeft;
      const maxScroll = this.grid.scrollWidth - this.grid.clientWidth;
      
      this.prevBtn.disabled = scrollLeft <= 5;
      this.nextBtn.disabled = scrollLeft >= maxScroll - 5;
    });
  },

  /** Activa la reproducción de vídeo en Hover de las tarjetas */
  setupHoverVideos() {
    const cards = this.grid.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      const video = card.querySelector('.project-video');
      if (!video) return;

      // Eventos mouseenter/mouseleave para activar el bucle
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {
          // Capturar errores del navegador si bloquea autoplay sin interacción
        });
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Reiniciar reproducción al inicio
      });

      // Eventos táctiles para móviles (reproduce al tocar)
      card.addEventListener('touchstart', () => {
        video.play().catch(() => {});
      }, { passive: true });
    });
  }
};
