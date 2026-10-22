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

  // ── Disponibilidad (frase bajo los botones del hero) ────────────────────────
  // Mes en que se puede empezar un proyecto nuevo (p. ej. 'noviembre'). Vacío: no se muestra mes.
  // availableFromEn: el mismo mes en inglés (p. ej. 'November') para la versión en inglés.
  availableFrom: '',
  availableFromEn: '',

  // ── Servicios ───────────────────────────────────────────────────────────────
  // Sin precios publicados: cada tarjeta invita a consultarlo por el formulario.
  // need: valor que se preselecciona en "¿Qué necesitas?" del formulario.
  // timelineLabel: texto de la etiqueta del plazo (por defecto "Plazo orientativo").
  // en: los mismos textos en inglés (se usan cuando la web está en inglés).
  // TODO: confirmar los plazos orientativos y el tiempo de respuesta del mantenimiento.
  services: [
    {
      id:       'web',
      need:     'web',
      name:     'Web para negocio',
      summary:  'Tu negocio bien presentado en Google y en el móvil, con una forma fácil de contactarte.',
      includes: [
        'Diseño a medida, adaptado a móvil, tablet y ordenador',
        'SEO básico para aparecer en búsquedas de tu zona',
        'Formulario de contacto que llega a tu correo',
        'Publicación en internet y dominio configurado',
      ],
      timeline: '2 a 3 semanas',
      en: {
        name:     'Business website',
        summary:  'Your business well presented on Google and on mobile, with an easy way to get in touch.',
        includes: [
          'Custom design for mobile, tablet and desktop',
          'Basic SEO to show up in local searches',
          'Contact form that goes straight to your inbox',
          'Published online with your domain set up',
        ],
        timeline: '2 to 3 weeks',
      },
    },
    {
      id:       'reservas',
      need:     'reservas',
      name:     'Sistema de reservas',
      featured: true,
      summary:  'Tus clientes reservan online a cualquier hora y tú lo controlas todo desde un panel.',
      includes: [
        'Reservas online desde la web, sin llamadas',
        'Panel de gestión para ver, mover y cancelar reservas',
        'Horarios, pistas, mesas o servicios configurables',
        'Todo lo que incluye la web para negocio',
      ],
      timeline: '4 a 6 semanas',
      en: {
        name:     'Booking system',
        summary:  'Your customers book online at any time and you manage everything from one dashboard.',
        includes: [
          'Online bookings from your website, no phone calls',
          'Dashboard to view, move and cancel bookings',
          'Configurable hours, courts, tables or services',
          'Everything in the business website',
        ],
        timeline: '4 to 6 weeks',
      },
      proof: [
        { label: 'KoreManager', url: 'https://kore-manager.vercel.app/' },
      ],
    },
    {
      id:       'mantenimiento',
      need:     'mantenimiento',
      name:     'Mantenimiento',
      summary:  'Tu web al día y alguien de confianza a quien escribir cuando necesites un cambio.',
      includes: [
        'Actualizaciones de seguridad y de versiones',
        'Cambios menores de textos, fotos y horarios',
        'Copias de seguridad periódicas',
        'Soporte por correo',
      ],
      timeline: '48 h laborables',
      timelineLabel: 'Respuesta',
      en: {
        name:     'Maintenance',
        summary:  'Your website kept up to date, and someone you trust to message whenever you need a change.',
        includes: [
          'Security and version updates',
          'Small changes to text, photos and opening hours',
          'Regular backups',
          'Email support',
        ],
        timeline: '48 business hours',
        timelineLabel: 'Response time',
      },
    },
  ],

  // Pasos del proceso de trabajo (sección Servicios)
  process: [
    { title: 'Llamada',           text: 'Una llamada corta y sin compromiso para entender tu negocio y lo que necesitas.',
      en: { title: 'Call',              text: 'A short, no-commitment call to understand your business and what you need.' } },
    { title: 'Propuesta',         text: 'Te envío por escrito qué incluye, cuánto cuesta y cuándo la tendrás.',
      en: { title: 'Proposal',          text: 'I send you in writing what’s included, what it costs and when it will be ready.' } },
    { title: 'Desarrollo',        text: 'Construyo la web y te enseño avances para que opines antes de publicar.',
      en: { title: 'Development',       text: 'I build the website and show you progress so you can give feedback before launch.' } },
    { title: 'Entrega y soporte', text: 'La publico, te explico cómo usarla y sigo disponible para cambios.',
      en: { title: 'Launch and support', text: 'I publish it, show you how to use it and stay available for changes.' } },
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
        desc: 'Maquetación semántica, layouts accesibles y estructuración para SEO.',
        en: { desc: 'Semantic markup, accessible layouts and structure for SEO.' }
      },
      'css': {
        label: 'CSS', level: 5, category: 'frontend', years: 3,
        desc: 'Layouts complejos (Grid/Flexbox) y Responsive Design estricto. Custom properties y design systems.',
        en: { desc: 'Complex layouts (Grid/Flexbox) and strict responsive design. Custom properties and design systems.' }
      },
      'js': {
        label: 'JavaScript', level: 4, category: 'frontend', years: 2,
        desc: 'Ecosistema frontend moderno. ESModules, async/await, manipulación del DOM, patrones SPA sin frameworks y optimización de rendimiento.',
        en: { desc: 'Modern frontend ecosystem. ES modules, async/await, DOM manipulation, framework-free SPA patterns and performance optimisation.' }
      },
      'react': {
        label: 'React', level: 3, category: 'frontend', years: 1,
        desc: 'Desarrollo de SPAs reactivas. Hooks (useState, useEffect, useContext), gestión de estado con Context API y optimización de renders.',
        en: { desc: 'Reactive SPAs. Hooks (useState, useEffect, useContext), state management with the Context API and render optimisation.' }
      },
      'java': {
        label: 'Java', level: 4, category: 'backend', years: 2,
        desc: 'Arquitectura OOP robusta para servidor. Patrones de diseño, Collections framework, streams y programación concurrente.',
        en: { desc: 'Robust OOP server architecture. Design patterns, the Collections framework, streams and concurrent programming.' }
      },
      'python': {
        label: 'Python', level: 3, category: 'backend', years: 2,
        desc: 'Scripts de automatización, procesamiento de datos y desarrollo backend ágil. Experiencia con FastAPI y scripting de sistemas.',
        en: { desc: 'Automation scripts, data processing and fast backend development. Experience with FastAPI and system scripting.' }
      },
      'laravel': {
        label: 'Laravel', level: 4, category: 'backend', years: 2,
        desc: 'Framework MVC PHP. Eloquent ORM, sistema de rutas, middlewares, Blade templates y desarrollo de APIs RESTful.',
        en: { desc: 'PHP MVC framework. Eloquent ORM, routing, middleware, Blade templates and RESTful API development.' }
      },
      'cpp': {
        label: 'C++', level: 2, category: 'systems', years: 1,
        desc: 'Fundamentos de gestión de memoria, punteros y rendimiento a bajo nivel. Base sólida que fortalece la comprensión del software en profundidad.',
        en: { desc: 'Fundamentals of memory management, pointers and low-level performance. A solid base for understanding software in depth.' }
      },
      'sql': {
        label: 'SQL/DB', level: 3, category: 'data', years: 2,
        desc: 'Diseño de bases de datos relacionales, consultas complejas con JOINs y subconsultas, optimización de índices. MySQL, PostgreSQL y SQLite.',
        en: { desc: 'Relational database design, complex queries with JOINs and subqueries, index optimisation. MySQL, PostgreSQL and SQLite.' }
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
      // Línea "problema → solución" pensada para el cliente que llega desde Servicios.
      // TODO: si hay datos reales de uso (reservas al mes, horas ahorradas…), añadirlos aquí.
      forClient:   'De apuntar reservas por teléfono y en papel a que cada vecino reserve su pista desde el móvil y la gestión lo vea todo en un panel.',
      en: {
        problem:  'Booking a padel, football or tennis court at municipal facilities still relied on phone calls and paper.',
        solution: 'Instant booking and centralised court management platform, usable on web and mobile. A React SPA on Supabase, with real-time statistics and concurrency control.',
        impact:   "Final degree project aimed at digitalising the town's public facilities.",
        forClient: 'From taking bookings by phone and on paper to every resident booking their court on their phone, with staff seeing everything in one dashboard.',
      },
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
      en: {
        problem:  'Logging and analysing daily workouts was hard without interface friction.',
        solution: 'SPA with React 19 and Tailwind v4. Cache-first system with optimistic sync to a Supabase database.',
        impact:   'Fast logging in under 10 seconds per set and visual analysis with Recharts.',
      },
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
      en: {
        problem:  "Traditional home search platforms are generic and don't convey the personality of each space.",
        solution: 'A minimalist real estate experience built from interactive full-screen panels with a map preview.',
        impact:   'Design focused on high-end editorial aesthetics, distinctive typography and micro-interactions.',
      },
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
      en: {
        problem:  'It was hard to connect with specific tattoo artists and browse designs smoothly.',
        solution: 'Immersive catalogue with snap scrolling, colour-curtain transitions and animated previews.',
        impact:   'Interactive design powered by GSAP and ScrollTrigger, with a premium, extremely smooth feel.',
      },
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
      en: {
        problem:  'Traditional password management gives no feedback on entropy or strength.',
        solution: 'High-security vault with a real-time brute-force attack simulator and a dynamic entropy generator.',
        impact:   'Precise, cyberpunk-style interactive interface with animated feedback.',
      },
      statusGroup: 'in-progress',
    },
  ],
};
