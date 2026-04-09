// js/arcade.js

const ArcadeEngine = {
    // BASE DE DATOS DE PROYECTOS
    projects: [
        {
            id: 'kore',
            title: 'KoreManager',
            category: 'Municipal Booking System',
            tech: ['React', 'Tailwind', 'Supabase'],
            status: 'BETA', // Cámbialo a DEPLOYED si ya está en producción
            url: 'https://github.com/Luis-GR05/KoreManager',
            caseStudy: 'El Problema: Carencia de un sistema digital eficiente para las reservas deportivas del municipio. La Arquitectura: SPA reactiva respaldada por Supabase (BaaS). El mayor reto técnico fue orquestar el control de concurrencia en las sesiones de usuario y diseñar un motor de estadísticas en tiempo real. El Impacto: Proyecto TFG orientado a digitalizar instalaciones públicas.'
        },
        {
            id: 'btc',
            title: 'Bittacora Systems',
            category: 'Corporate Experience',
            tech: ['Java', 'Python', 'HTML/CSS'],
            status: 'DEPLOYED',
            url: '#', 
            caseStudy: 'Experiencia real en entorno corporativo. Desarrollo y mantenimiento de plataformas, optimización de tiempos de respuesta y entrega de código bajo presión.'
        },
        {
            id: 'sys',
            title: 'LuisPortfolio.OS',
            category: 'Frontend Architecture',
            tech: ['Vanilla JS', 'SVG Math', 'CSS Grid'],
            status: 'V1.0',
            url: 'https://github.com/Luis-GR05',
            caseStudy: 'Diseño de un motor SPA sin frameworks. Renderizado de vectores matemáticos e inyección de dependencias modular. 100% Lighthouse Score.'
        }
    ],

    init() {
        this.gridContainer = document.getElementById('project-grid');
        this.render();
    },

    render() {
        let htmlChunks = '';

        this.projects.forEach((proj, index) => {
            // Accesibilidad: tabindex="0" permite navegar por las tarjetas con el tabulador
            htmlChunks += `
                <article class="arcade-card" tabindex="0" data-index="${index}">
                    <div class="card-header">
                        <span class="proj-id">SYS.${proj.id.toUpperCase()}</span>
                        <span class="proj-status ${proj.status.toLowerCase()}">${proj.status}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="proj-title">${proj.title}</h3>
                        <p class="proj-cat">${proj.category}</p>
                        <p class="proj-case">${proj.caseStudy}</p>
                    </div>
                    <div class="card-footer">
                        <ul class="tech-list">
                            ${proj.tech.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                        <a href="${proj.url}" class="btn-launch" tabindex="-1">LAUNCH_</a>
                    </div>
                </article>
            `;
        });

        this.gridContainer.innerHTML = htmlChunks;
    }
};

// Inicializar
// ArcadeEngine.init();