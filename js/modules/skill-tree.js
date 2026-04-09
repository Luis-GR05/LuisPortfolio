/**
 * @file skill-tree.js
 * @description Motor de renderizado SVG para el árbol de habilidades.
 *   MEJORAS vs versión anterior:
 *   - Nodos con arco de nivel de proficiency (SVG strokeDasharray)
 *   - Colores por categoría de skill
 *   - Sanitización de labels antes de inyectar en SVG (evita XSS)
 *   - Panel de detalles con pips de nivel
 *   - Coordenadas calculadas para ajustarse al viewBox
 */

const GRID  = 120; // Distancia entre nodos (múltiplo de 8 → alineado al sistema)
const NODE_R = 28; // Radio del nodo agrandado para aguantar la imagen

/** Sanitiza texto antes de inyectarlo en SVG */
const sanitize = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const SkillTreeEngine = {

  /** @type {HTMLElement} */
  canvas: null,

  /** @type {object} Configuración completa de skills del CONFIG */
  config: null,

  /** @type {string|null} ID del nodo activo */
  activeNodeId: null,

  /**
   * Inicializa el motor con los datos de skills.
   * @param {object} skillsConfig - CONFIG.skills
   */
  init(skillsConfig) {
    this.config = skillsConfig;
    this.canvas = document.getElementById('skill-canvas');

    if (!this.canvas) {
      console.error('[SkillTree] Canvas no encontrado en el DOM.');
      return;
    }

    this.render();
  },

  /** Renderiza el SVG completo */
  render() {
    const { nodes, edges, categoryColors } = this.config;

    // Calcular dimensiones del viewBox según las columnas/filas máximas
    const maxCol = Math.max(...Object.values(nodes).map(n => n.col)) + 1;
    const maxRow = Math.max(...Object.values(nodes).map(n => n.row)) + 1;
    const vw = maxCol * GRID + GRID;
    const vh = maxRow * GRID + GRID;

    let svg = `<svg
      width="100%" height="100%"
      viewBox="0 0 ${vw} ${vh}"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >`;

    // ── Defs: filtros de glow y clip paths para los iconos ─────────────────
    svg += `<defs>
      <clipPath id="circle-clip" clipPathUnits="objectBoundingBox">
        <circle cx="0.5" cy="0.5" r="0.48"/>
      </clipPath>
    `;
    Object.entries(categoryColors).forEach(([cat, colors]) => {
      svg += `
        <filter id="glow-${cat}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
    });
    svg += `</defs>`;

    // ── Grupo de líneas (renderizadas debajo de los nodos) ─────────────────
    svg += `<g class="edges-layer">`;
    edges.forEach(([fromId, toId]) => {
      const from = nodes[fromId];
      const to   = nodes[toId];
      if (!from || !to) return;

      // Color de la línea: promedio entre las categorías de los dos nodos
      const fromColor = categoryColors[from.category]?.stroke ?? '#444';

      const x1 = from.col * GRID;
      const y1 = from.row * GRID;
      const x2 = to.col   * GRID;
      const y2 = to.row   * GRID;

      svg += `<line
        x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        class="tree-edge"
        stroke="${fromColor}"
        stroke-dasharray="6 4"
      />`;
    });
    svg += `</g>`;

    // ── Grupo de nodos ─────────────────────────────────────────────────────
    svg += `<g class="nodes-layer">`;
    Object.entries(nodes).forEach(([id, node]) => {
      const cx = node.col * GRID;
      const cy = node.row * GRID;
      const color = categoryColors[node.category]?.stroke ?? '#444';

      // Arco de nivel: circunferencia = 2πr; el arco cubre (level/5) del total
      const arcR         = NODE_R + 8;
      const circumference = 2 * Math.PI * arcR;
      const arcLength    = circumference * (node.level / 5);
      const arcGap       = circumference - arcLength;

      // Medidas para la imagen
      const imgSize = NODE_R * 2;
      const imgX = cx - NODE_R;
      const imgY = cy - NODE_R;

      svg += `
        <g class="tree-node" data-id="${sanitize(id)}" tabindex="0"
           aria-label="${sanitize(node.label)}, nivel ${node.level} de 5">
          <!-- Área de click ampliada -->
          <circle cx="${cx}" cy="${cy}" r="${arcR + 12}" class="node-hitbox"/>

          <!-- Anillo de nivel de proficiency -->
          <circle
            cx="${cx}" cy="${cy}" r="${arcR}"
            class="node-level-arc"
            stroke="${color}"
            stroke-dasharray="${arcLength} ${arcGap}"
            transform="rotate(-90 ${cx} ${cy})"
          />

          <!-- Círculo principal / Fondo oscuro -->
          <circle cx="${cx}" cy="${cy}" r="${NODE_R}"
            class="node-core"
            stroke="${color}"
          />
          
          <!-- Imagen del Icono (con clip path circular) -->
          ${node.icon ? `<image href="${node.icon}" x="${imgX}" y="${imgY}" width="${imgSize}" height="${imgSize}" clip-path="url(#circle-clip)" class="node-icon" preserveAspectRatio="xMidYMid slice" />` : ''}

          <!-- Label -->
          <text x="${cx}" y="${cy + NODE_R + 18}"
            class="node-label" text-anchor="middle"
          >${sanitize(node.label)}</text>
        </g>`;
    });
    svg += `</g></svg>`;

    this.canvas.innerHTML = svg;
    this.attachEvents();
  },

  /** Conecta los eventos de click/keyboard a cada nodo renderizado */
  attachEvents() {
    const nodeEls = this.canvas.querySelectorAll('.tree-node');
    const panel   = document.getElementById('skill-details');
    const svgEl   = this.canvas.querySelector('svg');

    // Cerrar panel al hacer click en un espacio vacío (backdrop del árbol)
    if (svgEl) {
      svgEl.addEventListener('click', (e) => {
        // Cierra si el click no proviene de dentro de un elemento árbol (tree-node)
        if (!e.target.closest('.tree-node')) {
          this.activeNodeId = null;
          nodeEls.forEach(n => n.classList.remove('is-active'));
          this.canvas.querySelectorAll('.node-ping').forEach(p => p.remove());
          if (panel) panel.setAttribute('hidden', '');
        }
      });
    }

    nodeEls.forEach(el => {
      const activate = () => {
        const id = el.dataset.id;
        if (!id) return;

        // Resetear estado global
        nodeEls.forEach(n => n.classList.remove('is-active'));

        // Activar nodo
        el.classList.add('is-active');
        this.activeNodeId = id;

        // Añadir efecto de ping
        this._addPing(el);

        // Mostrar panel de detalles
        this.showDetails(id, panel);
      };

      el.addEventListener('click', activate);
      // Accesibilidad: activar con Enter/Space también
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  },

  /**
   * Rellena el panel lateral con los datos del nodo seleccionado.
   * @param {string}      id    - ID del nodo
   * @param {HTMLElement} panel - Elemento del panel
   */
  showDetails(id, panel) {
    const node = this.config.nodes[id];
    if (!node || !panel) return;

    const titleEl = document.getElementById('detail-title');
    const levelEl = document.getElementById('detail-level');
    const descEl  = document.getElementById('detail-desc');
    const metaEl  = document.getElementById('detail-meta');

    if (titleEl) titleEl.textContent = node.label;
    if (descEl)  descEl.textContent  = node.desc;

    // Renderizar pips de nivel (5 círculos)
    if (levelEl) {
      levelEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
        `<span class="level-pip ${i < node.level ? 'is-filled' : ''}"
               aria-hidden="true"></span>`
      ).join('');
      levelEl.setAttribute('aria-label', `Nivel ${node.level} de 5`);
    }

    if (metaEl) {
      metaEl.textContent = `CATEGORÍA: ${node.category.toUpperCase()} · ${node.years} AÑO${node.years !== 1 ? 'S' : ''} · LVL ${node.level}/5`;
    }

    // Mostrar panel (quitar atributo hidden para el CSS)
    panel.removeAttribute('hidden');
  },

  /**
   * Añade un círculo de "ping" animado alrededor del nodo activado.
   * @param {SVGGElement} nodeEl
   */
  _addPing(nodeEl) {
    // Eliminar pings anteriores
    this.canvas.querySelectorAll('.node-ping').forEach(p => p.remove());

    const id = nodeEl.dataset.id;
    const node = this.config.nodes[id];
    if (!node) return;

    const cx = node.col * GRID;
    const cy = node.row * GRID;
    const color = this.config.categoryColors[node.category]?.stroke ?? '#00c8ff';

    const ping = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ping.setAttribute('cx', cx);
    ping.setAttribute('cy', cy);
    ping.setAttribute('r', NODE_R + 4);
    ping.setAttribute('stroke', color);
    ping.setAttribute('class', 'node-ping');

    // Insertar antes del grupo de nodos (debajo)
    const nodesLayer = this.canvas.querySelector('.nodes-layer');
    this.canvas.querySelector('svg').insertBefore(ping, nodesLayer);
  },
};
