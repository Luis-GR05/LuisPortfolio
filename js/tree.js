// js/tree.js

const SkillTreeEngine = {
    // 1. CONSTANTES MATEMÁTICAS (Múltiplos de 4px)
    gridSize: 128, // Distancia base entre nodos (32 * 4)
    nodeSize: 48,  // Tamaño del nodo (12 * 4)
    
    // 2. BASE DE DATOS DE HABILIDADES
    nodes: {
        // Core Frontend
        'htmlcss': { label: 'HTML/CSS', col: 1, row: 2, desc: 'Maquetación semántica, layouts complejos y Responsive Design estricto.' },
        'js':      { label: 'JavaScript', col: 3, row: 2, desc: 'Lógica de cliente. Ecosistema frontend y manipulación avanzada del DOM.' },
        'react':   { label: 'React.js', col: 4, row: 1, desc: 'Desarrollo de SPAs. Ciclo de vida, Hooks y gestión de estado.' },
        
        // Core Backend & Lógica
        'java':    { label: 'Java', col: 3, row: 4, desc: 'Arquitectura orientada a objetos, robustez en el lado del servidor.' },
        'python':  { label: 'Python', col: 5, row: 4, desc: 'Scripts, automatización y desarrollo de backend ágil.' },
        'laravel': { label: 'Laravel', col: 5, row: 2, desc: 'Experiencia en frameworks PHP MVC. Rutas, ORM y APIs.' },
        'cpp':     { label: 'C++', col: 2, row: 5, desc: 'Fundamentos sólidos de memoria, punteros y rendimiento a bajo nivel.' }
    },

    // 3. MATRIZ DE CONEXIONES (Origen -> Destino)
    edges: [
        ['htmlcss', 'js'],
        ['js', 'react'],
        ['js', 'laravel'], // JS se conecta con Laravel (vistas Blade/Vue/etc)
        ['java', 'python'], // Conexión de lenguajes de propósito general
        ['cpp', 'java']     // La base de C++ fortalece tu entendimiento de Java
    ],

    // 4. INICIALIZACIÓN
    init() {
        this.canvas = document.getElementById('skill-canvas');
        this.detailsTitle = document.getElementById('detail-title');
        this.detailsDesc = document.getElementById('detail-desc');
        this.detailsPanel = document.getElementById('skill-details');
        
        if (!this.canvas) {
            console.error("[SYS_ERROR] Nodo 'skill-canvas' no encontrado en el DOM.");
            return;
        }

        this.render();
    },

    // 5. EL MOTOR DE RENDERIZADO SVG
    render() {
        // ViewBox dinámico para asegurar adaptabilidad responsiva
        let svgHTML = `<svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">`;

        // DIBUJAR LÍNEAS (Capa de fondo)
        this.edges.forEach(edge => {
            const origin = this.nodes[edge[0]];
            const target = this.nodes[edge[1]];
            
            // Si hay un error en el JSON, evitamos que el motor colapse
            if (!origin || !target) return; 

            // Conversión de matriz a píxeles
            const x1 = origin.col * this.gridSize;
            const y1 = origin.row * this.gridSize;
            const x2 = target.col * this.gridSize;
            const y2 = target.row * this.gridSize;

            svgHTML += `
                <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                      class="tree-edge" stroke-dasharray="4" />
            `;
        });

        // DIBUJAR NODOS (Capa frontal)
        Object.entries(this.nodes).forEach(([id, node]) => {
            const cx = node.col * this.gridSize;
            const cy = node.row * this.gridSize;
            const r = this.nodeSize / 2;

            svgHTML += `
                <g class="tree-node" data-id="${id}" transform="translate(${cx}, ${cy})">
                    <circle cx="0" cy="0" r="${r + 16}" fill="transparent" class="node-hitbox" />
                    <circle cx="0" cy="0" r="${r}" class="node-core" />
                    <text x="0" y="${r + 24}" class="node-label" text-anchor="middle">${node.label}</text>
                </g>
            `;
        });

        svgHTML += `</svg>`;
        
        // Inyección directa y limpia en el DOM
        this.canvas.innerHTML = svgHTML;

        // Una vez inyectado el HTML, mapeamos los eventos
        this.attachEvents();
    },

    // 6. SISTEMA DE INTERACCIÓN Y ESTADO
    attachEvents() {
        const nodeElements = this.canvas.querySelectorAll('.tree-node');
        
        nodeElements.forEach(el => {
            el.addEventListener('click', (e) => {
                // 6.1 Resetear estado activo global
                nodeElements.forEach(n => n.classList.remove('active'));
                
                // 6.2 Aplicar estado activo local
                const target = e.currentTarget;
                target.classList.add('active');
                
                // 6.3 Recuperar datos mediante el ID inyectado en el data-attribute
                const id = target.getAttribute('data-id');
                const nodeData = this.nodes[id];
                
                // 6.4 Inyectar datos en el HUD lateral
                this.detailsTitle.textContent = nodeData.label;
                this.detailsDesc.textContent = nodeData.desc;
                
                // 6.5 Revelar el panel lateral
                this.detailsPanel.classList.remove('hidden');
            });
        });
    }
};