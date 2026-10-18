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

  // ── Disponibilidad (badge del hero) ─────────────────────────────────────────
  // Mes en que se puede empezar un proyecto nuevo. Dejar '' para ocultar el mes.
  availableFrom: 'noviembre',

  // ── Servicios y precios ─────────────────────────────────────────────────────
  // Precios en euros. from: true muestra "desde" delante del precio.
  // need: valor que se preselecciona en "¿Qué necesitas?" del formulario.
  // timelineLabel: texto de la etiqueta del plazo (por defecto "Plazo orientativo").
  // TODO: confirmar los plazos orientativos y el tiempo de respuesta del mantenimiento.
  services: [
    {
      id:       'web',
      need:     'web',
      name:     'Web para negocio',
      price:    350,
      from:     true,
      summary:  'Tu negocio bien presentado en Google y en el móvil, con una forma fácil de contactarte.',
      includes: [
        'Diseño a medida, adaptado a móvil, tablet y ordenador',
        'SEO básico para aparecer en búsquedas de tu zona',
        'Formulario de contacto que llega a tu correo',
        'Publicación en internet y dominio configurado',
      ],
      timeline: '2 a 3 semanas',
    },
    {
      id:       'reservas',
      need:     'reservas',
      name:     'Sistema de reservas',
      price:    600,
      from:     true,
      featured: true,
      summary:  'Tus clientes reservan online a cualquier hora y tú lo controlas todo desde un panel.',
      includes: [
        'Reservas online desde la web, sin llamadas',
        'Panel de gestión para ver, mover y cancelar reservas',
        'Horarios, pistas, mesas o servicios configurables',
        'Todo lo que incluye la web para negocio',
      ],
      timeline: '4 a 6 semanas',
      proof: [
        { label: 'KoreManager', url: 'https://kore-manager.vercel.app/' },
        { label: 'Bistroson',   url: 'https://bistroson-web.vercel.app/' },
      ],
    },
    {
      id:       'mantenimiento',
      need:     'mantenimiento',
      name:     'Mantenimiento',
      price:    50,
      unit:     '/mes',
      from:     false,
      summary:  'Tu web al día y alguien de confianza a quien escribir cuando necesites un cambio.',
      includes: [
        'Actualizaciones de seguridad y de versiones',
        'Cambios menores de textos, fotos y horarios',
        'Copias de seguridad periódicas',
        'Soporte por correo',
      ],
      timeline: '48 h laborables',
      timelineLabel: 'Respuesta',
    },
  ],

  // Pasos del proceso de trabajo (sección Servicios)
  process: [
    { title: 'Llamada',           text: 'Una llamada corta y sin compromiso para entender tu negocio y lo que necesitas.' },
    { title: 'Propuesta',         text: 'Te envío por escrito qué incluye, cuánto cuesta y cuándo la tendrás.' },
    { title: 'Desarrollo',        text: 'Construyo la web y te enseño avances para que opines antes de publicar.' },
    { title: 'Entrega y soporte', text: 'La publico, te explico cómo usarla y sigo disponible para cambios.' },
  ],

  // ── Redes sociales ───────────────────────────────────────────────────────────
  socials: {
    github:   'https://github.com/Luis-GR05',
    linkedin: 'https://www.linkedin.com/in/luisgordilloo/',
  },



  // ── Habilidades (Skill Tree) ─────────────────────────────────────────────────
  skills: {

    // Nodos: cada skill es una entrada
    nodes: {
      'html': {
        label: 'HTML', level: 5, category: 'frontend', years: 3,
        desc: 'Maquetación semántica, layouts accesibles y estructuración para SEO.'
      },
      'css': {
        label: 'CSS', level: 5, category: 'frontend', years: 3,
        desc: 'Layouts complejos (Grid/Flexbox) y Responsive Design estricto. Custom properties y design systems.'
      },
      'js': {
        label: 'JavaScript', level: 4, category: 'frontend', years: 2,
        desc: 'Ecosistema frontend moderno. ESModules, async/await, manipulación del DOM, patrones SPA sin frameworks y optimización de rendimiento.'
      },
      'react': {
        label: 'React', level: 3, category: 'frontend', years: 1,
        desc: 'Desarrollo de SPAs reactivas. Hooks (useState, useEffect, useContext), gestión de estado con Context API y optimización de renders.'
      },
      'java': {
        label: 'Java', level: 4, category: 'backend', years: 2,
        desc: 'Arquitectura OOP robusta para servidor. Patrones de diseño, Collections framework, streams y programación concurrente.'
      },
      'python': {
        label: 'Python', level: 3, category: 'backend', years: 2,
        desc: 'Scripts de automatización, procesamiento de datos y desarrollo backend ágil. Experiencia con FastAPI y scripting de sistemas.'
      },
      'laravel': {
        label: 'Laravel', level: 4, category: 'backend', years: 2,
        desc: 'Framework MVC PHP. Eloquent ORM, sistema de rutas, middlewares, Blade templates y desarrollo de APIs RESTful.'
      },
      'cpp': {
        label: 'C++', level: 2, category: 'systems', years: 1,
        desc: 'Fundamentos de gestión de memoria, punteros y rendimiento a bajo nivel. Base sólida que fortalece la comprensión del software en profundidad.'
      },
      'sql': {
        label: 'SQL/DB', level: 3, category: 'data', years: 2,
        desc: 'Diseño de bases de datos relacionales, consultas complejas con JOINs y subconsultas, optimización de índices. MySQL, PostgreSQL y SQLite.'
      },
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
      previewImg:  'assets/img/kore.webp',
      year:        '2025',
      problem:     'Reservar una pista de pádel, fútbol o tenis en instalaciones municipales seguía dependiendo de llamadas y papel.',
      solution:    'Plataforma de reservas instantáneas y gestión centralizada de pistas, usable desde web y móvil. SPA en React sobre Supabase, con estadísticas en tiempo real y control de concurrencia.',
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
      previewImg:  'assets/img/dailyset-logo.png',
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
      year:        '2026',
      problem:     'La gestión tradicional de contraseñas carece de retroalimentación sobre entropía y robustez.',
      solution:    'Bóveda de alta seguridad con simulador en tiempo real de ataques por fuerza bruta y generador dinámico de entropía.',
      impact:      'Interfaz interactiva ciberpunk de precisión quirúrgica con retroalimentación animada.',
      statusGroup: 'in-progress',
    },
    {
      id:          'bistroson',
      title:       'Bistroson',
      category:    'Restaurant Website & Booking',
      tech:        ['Next.js', 'React', 'Three.js', 'GSAP', 'Tailwind'],
      status:      'LIVE',
      statusColor: 'success',
      url:         'https://github.com/Luis-GR05/bistroson-web',
      demoUrl:     'https://bistroson-web.vercel.app/',
      previewImg:  'assets/img/bistroson.jpg',
      year:        '2026',
      problem:     'Un restaurante del centro de Badajoz con tres espacios distintos (salón, taberna y terraza) necesitaba una web que los presentara y facilitara reservar.',
      solution:    'Sitio en Next.js con el logo en 3D en la portada (Three.js), animaciones con GSAP, la carta completa, la presentación de cada espacio, horarios, contacto y reserva online.',
      impact:      'Web publicada para un negocio real, con la reserva y la carta accesibles desde el móvil.',
      statusGroup: 'completed',
    },
  ],
};
