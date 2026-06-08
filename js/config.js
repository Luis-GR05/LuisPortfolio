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

  // ID de formulario de Formspree para envío de correos
  formspreeId: 'YOUR_FORMSPREE_ID',

  // ── Secuencia de boot ────────────────────────────────────────────────────────
  bootLines: [
    { text: 'BIOS v2.0.4 ... OK',                            delay: 0 },
    { text: 'Iniciando módulos del sistema...',              delay: 300 },
    { text: 'Cargando perfil: Luis Gordillo Rodríguez',      delay: 600, class: '' },
    { text: 'Compilando árbol de habilidades... OK',         delay: 900 },
    { text: 'Cargando base de datos de proyectos... OK',     delay: 1150 },
    { text: 'Motor SVG: READY',                              delay: 1350 },
    { text: 'Verificando integridad... PASSED',              delay: 1550 },
    { text: '██████████████████████ 100%',                   delay: 1750 },
    { text: 'SYSTEM READY. Bienvenido.',                     delay: 1950, class: 'boot-success' },
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
      status:      'LIVE',
      statusColor: 'success',
      url:         'https://github.com/Luis-GR05/KoreManager',
      demoUrl:     'https://kore-manager.vercel.app/',
      previewImg:  'assets/img/koreManager.png',
      video:       'https://assets.mixkit.co/videos/preview/mixkit-web-development-concept-with-html-code-41854-large.mp4',
      year:        '2025',
      problem:     'Carencia de sistema digital para gestión de reservas deportivas municipales.',
      solution:    'SPA reactiva con Supabase BaaS. Motor de estadísticas en tiempo real y control de concurrencia en sesiones.',
      impact:      'TFG orientado a digitalizar instalaciones públicas del municipio.',
      statusGroup: 'completed',
    },
    {
      id:          'dailyset',
      title:       'DailySet',
      category:    'Fitness App & Metrics',
      tech:        ['React 19', 'Tailwind v4', 'Supabase'],
      status:      'LIVE',
      statusColor: 'success',
      url:         'https://github.com/Luis-GR05/dailyset',
      demoUrl:     'https://dailyset.vercel.app/',
      previewImg:  'assets/img/dailyset.png',
      video:       'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-with-a-healthy-meal-planning-app-42211-large.mp4',
      year:        '2026',
      problem:     'Dificultad para registrar y analizar entrenamientos diarios sin fricciones de interfaz.',
      solution:    'SPA con React 19 y Tailwind v4. Sistema cache-first con sincronización optimista en base de datos Supabase.',
      impact:      'Registro rápido en menos de 10 segundos por serie y análisis visual mediante Recharts.',
      statusGroup: 'completed',
    },
    {
      id:          'nidus',
      title:       'Nidus',
      category:    'Boutique Real Estate',
      tech:        ['HTML/CSS', 'Vanilla JS', 'Map Mock'],
      status:      'DEV',
      statusColor: 'warning',
      url:         'https://github.com/Luis-GR05/Nidus',
      demoUrl:     'https://nidus-brown.vercel.app/',
      previewImg:  'assets/img/Nidus.png',
      video:       'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-design-44026-large.mp4',
      year:        '2025',
      problem:     'Las plataformas de búsqueda de vivienda tradicionales son genéricas y no transmiten la personalidad de los espacios.',
      solution:    'Experiencia inmobiliaria minimalista estructurada en paneles interactivos de pantalla completa con previsualización de mapa.',
      impact:      'Diseño enfocado en la estética editorial de alta gama, tipografías distinguidas y micro-interacciones.',
      statusGroup: 'in-progress',
    },
    {
      id:          'mantra',
      title:       'Mantra',
      category:    'Tattoo & Artist Connector',
      tech:        ['Vanilla JS', 'GSAP', 'CSS Grid'],
      status:      'DEV',
      statusColor: 'warning',
      url:         'https://github.com/Luis-GR05/Mantra',
      demoUrl:     'https://mantra-three-weld.vercel.app/',
      previewImg:  'assets/img/Mantra.png',
      video:       'https://assets.mixkit.co/videos/preview/mixkit-white-ink-spilling-into-water-31355-large.mp4',
      year:        '2026',
      problem:     'Dificultad de conectar con artistas específicos de tatuajes y visualizar diseños de manera fluida.',
      solution:    'Catálogo inmersivo con snap scroll, transiciones de cortina de color y previsualización animada.',
      impact:      'Diseño interactivo potenciado por GSAP y ScrollTrigger con sensación premium y fluidez extrema.',
      statusGroup: 'in-progress',
    },
    {
      id:          'nextvault',
      title:       'NextVault',
      category:    'Cryptographic Safe & Manager',
      tech:        ['React', 'Framer Motion', 'Tailwind'],
      status:      'DEV',
      statusColor: 'warning',
      url:         'https://github.com/Luis-GR05/NextVault',
      demoUrl:     'https://next-vault-nine.vercel.app/',
      previewImg:  'assets/img/nextvault.png',
      video:       'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-neon-lights-42512-large.mp4',
      year:        '2026',
      problem:     'La gestión tradicional de contraseñas carece de retroalimentación sobre entropía y robustez.',
      solution:    'Bóveda de alta seguridad con simulador en tiempo real de ataques por fuerza bruta y generador dinámico de entropía.',
      impact:      'Interfaz interactiva ciberpunk de precisión quirúrgica con retroalimentación animada.',
      statusGroup: 'in-progress',
    },
  ],
};
