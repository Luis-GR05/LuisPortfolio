/**
 * @file skill-tree.js
 * @description Motor de renderizado del panel de habilidades en formato Dashboard.
 *   Agrupa las habilidades por categorías y las presenta en tarjetas de
 *   cristal interactivas con tooltips descriptivos y pips de nivel.
 */

export const SkillTreeEngine = {
  
  /** @type {HTMLElement} */
  grid: null,

  /**
   * Inicializa el renderizado del dashboard de habilidades.
   * @param {object} skillsConfig - CONFIG.skills
   */
  init(skillsConfig) {
    this.grid = document.getElementById('skills-grid');

    if (!this.grid) {
      console.error('[Skills] Contenedor de habilidades no encontrado.');
      return;
    }

    this.render(skillsConfig);
  },

  /**
   * Renderiza el dashboard en categorías lógicas.
   * @param {object} config
   */
  render(config) {
    const { nodes } = config;

    // Clasificar las habilidades por categorías
    const categories = {
      frontend: { title: 'Frontend Development', skills: [] },
      backend:  { title: 'Backend Development', skills: [] },
      data:     { title: 'Bases de Datos', skills: [] },
      systems:  { title: 'Sistemas & Herramientas', skills: [] }
    };

    // Agrupar nodos por su categoría correspondiente
    Object.entries(nodes).forEach(([id, skill]) => {
      const cat = skill.category;
      if (categories[cat]) {
        categories[cat].skills.push({ id, ...skill });
      } else {
        // Fallback si la categoría no está predefinida
        categories.systems.skills.push({ id, ...skill });
      }
    });

    this.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    // Crear grupo para cada categoría
    Object.entries(categories).forEach(([catKey, catData]) => {
      if (catData.skills.length === 0) return;

      const groupDiv = document.createElement('div');
      groupDiv.className = 'skill-group';

      // Header de la categoría
      const header = document.createElement('h3');
      header.className = `skill-group-title ${catKey}`;
      header.innerHTML = `<span class="dot"></span> ${catData.title}`;
      groupDiv.appendChild(header);

      // Grid de skills individuales
      const listDiv = document.createElement('div');
      listDiv.className = 'skills-list';

      catData.skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.setAttribute('tabindex', '0');

        // Generar pips de nivel
        const pipsHtml = Array.from({ length: 5 }, (_, i) => 
          `<span class="level-pip ${i < skill.level ? 'is-filled' : ''}" aria-hidden="true"></span>`
        ).join('');

        card.innerHTML = `
          <div class="skill-icon-wrapper">
            <img src="${skill.icon || 'assets/icons/html.jpg'}" alt="Icono de ${skill.label}" class="skill-icon" loading="lazy">
          </div>
          <div class="skill-info">
            <span class="skill-name">${skill.label}</span>
            <div class="skill-level-container" aria-label="Nivel de dominio ${skill.level} de 5">
              ${pipsHtml}
            </div>
          </div>
          <div class="skill-tooltip" role="tooltip">
            <strong>${skill.label}</strong><br>
            ${skill.desc}<br>
            <span style="opacity: 0.6; font-size: 10px; font-family: var(--font-mono)">
              EXPERIENCIA: ${skill.years} AÑO${skill.years !== 1 ? 'S' : ''}
            </span>
          </div>
        `;

        listDiv.appendChild(card);
      });

      groupDiv.appendChild(listDiv);
      fragment.appendChild(groupDiv);
    });

    this.grid.appendChild(fragment);
  }
};
