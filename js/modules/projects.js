/**
 * @file projects.js
 * @description Motor de renderizado de tarjetas de proyectos.
 *   Los datos vienen del CONFIG (Single Source of Truth).
 *   MEJORAS: estructura problema/solución/impacto, delays escalonados,
 *   sin globals — export named.
 */

export const ProjectsEngine = {

  /** @type {HTMLElement} */
  grid: null,

  /**
   * @param {Array} projects - CONFIG.projects
   */
  init(projects) {
    this.grid = document.getElementById('project-grid');

    if (!this.grid) {
      console.error('[Projects] Grid container no encontrado.');
      return;
    }

    this.render(projects);
  },

  render(projects) {
    // Construir el HTML una sola vez, luego inyectar (evitar reflows múltiples)
    const fragment = document.createDocumentFragment();

    projects.forEach((proj, index) => {
      const article = document.createElement('article');
      article.className = 'arcade-card';
      article.setAttribute('role', 'listitem');
      article.setAttribute('tabindex', '0');
      // Delay escalonado para la animación card-reveal
      article.style.animationDelay = `${index * 0.1}s`;

      article.innerHTML = `
        <div class="card-header">
          <span class="proj-id">SYS.${proj.id.toUpperCase()}</span>
          <span class="proj-status ${proj.statusColor}">${proj.status}</span>
        </div>
        <div class="card-body">
          <h3 class="proj-title">${proj.title}</h3>
          <p class="proj-cat">${proj.category}</p>
          <span class="proj-year">${proj.year}</span>
          <div class="proj-case-block">
            <p class="case-row"><strong>PROBLEMA</strong> ${proj.problem}</p>
            <p class="case-row"><strong>SOLUCIÓN</strong> ${proj.solution}</p>
            <p class="case-row"><strong>IMPACTO</strong>  ${proj.impact}</p>
          </div>
        </div>
        <div class="card-footer">
          <ul class="tech-list" aria-label="Tecnologías usadas">
            ${proj.tech.map(t => `<li class="tech-tag">${t}</li>`).join('')}
          </ul>
          <a
            href="${proj.url}"
            class="btn-launch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver proyecto ${proj.title}"
          >▶ LAUNCH</a>
        </div>
      `;

      fragment.appendChild(article);
    });

    this.grid.appendChild(fragment);
  },
};
