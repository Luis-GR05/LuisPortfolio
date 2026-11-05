LuisPortfolio: portfolio personal Luis Gordillo, una página. https://luis-portfolio-pi.vercel.app/
stack: HTML/CSS/JS sin framework, Lenis, i18n ES/EN; api/send-email.js (Vercel + Resend, rate limit Upstash)
archivos: index.html (SEO, OG, datos estructurados) | css/site.css (temas por proyecto, paleta ciruela, claro/oscuro) | js/config.js (datos proyectos y skills: editar solo aquí) | js/site.js (render, temas scroll, form)
añadir proyecto: entrada en projects de config.js -> KIND/LOGO en site.js -> colores body[data-theme=id] en site.css
env: RESEND_API_KEY CONTACT_TO_EMAIL UPSTASH_REDIS_REST_URL/TOKEN RATE_LIMIT*
dev: servidor estático (Live Server)
