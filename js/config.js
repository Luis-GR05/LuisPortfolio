/**
 * @file config.js
 * @description Single Source of Truth del portfolio.
 *   Editar SOLO aquí. Todos los módulos importan de este archivo.
 *   Separación estricta: datos ≠ lógica.
 */

export const CONFIG = {

  // ── Datos del desarrollador ─────────────────────────────────────────────────
  name:     'Luis Gordillo Rodríguez',
  handle:   'LGR05',
  role:     'Técnico Superior en DAW',
  tagline:  'Forjado en backend. Obsesionado con el frontend.',
  location: 'Montijo, Badajoz, ES',
  status:   'ONLINE',
  version:  '2.0',
  bio: 'Técnico Superior en Desarrollo Web. Forjado en distintos entornos corporativos e institucionales. Construyo arquitecturas robustas combinando lógica de backend (Java/Python) con interfaces de precisión (HTML/CSS/React). Entrego código limpio a alta velocidad.',

  // ── Redes sociales ───────────────────────────────────────────────────────────
  socials: {
    github:   'https://github.com/Luis-GR05',
    linkedin: '#', // Actualizar con URL real
  },

  // ── Secuencia de boot ────────────────────────────────────────────────────────
  bootLines: [
    { text: 'BIOS v2.0.4 ... OK',                            delay: 0 },
    { text: 'Iniciando módulos del sistema...',              delay: 40 },
    { text: 'Cargando perfil: Luis Gordillo Rodríguez',      delay: 80, class: '' },
    { text: 'Compilando árbol de habilidades... OK',         delay: 120 },
    { text: 'Cargando base de datos de proyectos... OK',     delay: 160 },
    { text: 'Motor SVG: READY',                              delay: 200 },
    { text: 'Verificando integridad... PASSED',              delay: 240 },
    { text: '██████████████████████ 100%',                   delay: 280 },
    { text: 'SYSTEM READY. Bienvenido.',                     delay: 300, class: 'boot-success' },
  ],

  // ── Habilidades (Skill Tree) ─────────────────────────────────────────────────
  skills: {

    // Nodos: cada skill es una entrada
    nodes: {
      'html': {
        label: 'HTML', col: 1, row: 2, level: 5, category: 'frontend', years: 3,
        desc: 'Maquetación semántica, layouts accesibles y estructuración para SEO.',
        icon: 'assets/icons/html.jpg'
      },
      'css': {
        label: 'CSS', col: 2, row: 2, level: 5, category: 'frontend', years: 3,
        desc: 'Layouts complejos (Grid/Flexbox) y Responsive Design estricto. Custom properties y design systems.',
        icon: 'assets/icons/css.webp'
      },
      'js': {
        label: 'JavaScript', col: 3, row: 2, level: 4, category: 'frontend', years: 2,
        desc: 'Ecosistema frontend moderno. ESModules, async/await, manipulación del DOM, patrones SPA sin frameworks y optimización de rendimiento.',
        icon: 'assets/icons/javascript.png'
      },
      'react': {
        label: 'React', col: 4, row: 1, level: 3, category: 'frontend', years: 1,
        desc: 'Desarrollo de SPAs reactivas. Hooks (useState, useEffect, useContext), gestión de estado con Context API y optimización de renders.',
        icon: 'assets/icons/react.jpg'
      },
      'java': {
        label: 'Java', col: 3, row: 4, level: 4, category: 'backend', years: 2,
        desc: 'Arquitectura OOP robusta para servidor. Patrones de diseño, Collections framework, streams y programación concurrente.',
        icon: 'assets/icons/java.png'
      },
      'python': {
        label: 'Python', col: 5, row: 3, level: 3, category: 'backend', years: 2,
        desc: 'Scripts de automatización, procesamiento de datos y desarrollo backend ágil. Experiencia con FastAPI y scripting de sistemas.',
        icon: 'assets/icons/python.jpg'
      },
      'laravel': {
        label: 'Laravel', col: 5, row: 2, level: 4, category: 'backend', years: 2,
        desc: 'Framework MVC PHP. Eloquent ORM, sistema de rutas, middlewares, Blade templates y desarrollo de APIs RESTful.',
        icon: 'assets/icons/laravel.png'
      },
      'cpp': {
        label: 'C++', col: 2, row: 4, level: 2, category: 'systems', years: 1,
        desc: 'Fundamentos de gestión de memoria, punteros y rendimiento a bajo nivel. Base sólida que fortalece la comprensión del software en profundidad.',
        icon: 'assets/icons/cpp.png'
      },
      'sql': {
        label: 'SQL/DB', col: 4, row: 4, level: 3, category: 'data', years: 2,
        desc: 'Diseño de bases de datos relacionales, consultas complejas con JOINs y subconsultas, optimización de índices. MySQL, PostgreSQL y SQLite.',
        icon: 'assets/icons/sql.jpg'
      },
    },

    // Conexiones entre nodos: [origen, destino]
    edges: [
      ['html', 'css'],
      ['css', 'js'],
      ['js', 'react'],
      ['js', 'laravel'],
      ['java', 'python'],
      ['cpp', 'java'],
      ['java', 'sql'],
      ['laravel', 'sql'],
    ],

    // Colores por categoría (alineados con tokens CSS)
    categoryColors: {
      frontend: { stroke: '#00c8ff', glow: 'rgba(0, 200, 255, 0.35)' },
      backend:  { stroke: '#ff8c1a', glow: 'rgba(255, 140, 26, 0.35)' },
      systems:  { stroke: '#bb55ff', glow: 'rgba(187, 85, 255, 0.35)' },
      data:     { stroke: '#33dd88', glow: 'rgba(51, 221, 136, 0.35)' },
    },
  },

  // ── Proyectos ────────────────────────────────────────────────────────────────
  projects: [
    {
      id:          'kore',
      title:       'KoreManager',
      category:    'Municipal Booking System',
      tech:        ['React', 'Tailwind', 'Supabase'],
      status:      'BETA',
      statusColor: 'warning',
      url:         'https://github.com/Luis-GR05/KoreManager',
      year:        '2025',
      problem:     'Carencia de sistema digital para gestión de reservas deportivas municipales.',
      solution:    'SPA reactiva con Supabase BaaS. Motor de estadísticas en tiempo real y control de concurrencia en sesiones.',
      impact:      'TFG orientado a digitalizar instalaciones públicas del municipio.',
    },
    {
      id:          'btc',
      title:       'Bittacora Systems',
      category:    'Corporate Experience',
      tech:        ['Java', 'Python', 'HTML/CSS'],
      status:      'LIVE',
      statusColor: 'success',
      url:         '#',
      year:        '2024',
      problem:     'Mantenimiento y evolución de plataformas corporativas en producción.',
      solution:    'Desarrollo y optimización de módulos bajo presión de entorno real.',
      impact:      'Experiencia en ciclos de entrega rápida y código de producción estable.',
    },
    {
      id:          'portfolio',
      title:       'LuisPortfolio.OS',
      category:    'Frontend Architecture',
      tech:        ['Vanilla JS', 'SVG Math', 'CSS Grid'],
      status:      'v2.0',
      statusColor: 'info',
      url:         'https://github.com/Luis-GR05',
      year:        '2026',
      problem:     'Los portfolios convencionales no transmiten capacidad técnica real.',
      solution:    'Motor SPA sin frameworks, renderizado SVG matemático y design system modular.',
      impact:      'Interface inmersiva estilo videojuego. Lighthouse Score objetivo: 100.',
    },
  ],
};
