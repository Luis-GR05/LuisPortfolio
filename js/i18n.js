/**
 * @file i18n.js
 * @description Idioma de la página (español por defecto, inglés opcional).
 *   El HTML está escrito en español; aquí solo vive la versión en inglés.
 *   Los textos que vienen de config.js usan su campo `en` (ver tr()).
 */

const read = () => {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'es') {
    try { localStorage.setItem('idioma', q); } catch {}
    return q;
  }
  try { return localStorage.getItem('idioma') === 'en' ? 'en' : 'es'; } catch { return 'es'; }
};

export const LANG = read();
document.documentElement.lang = LANG;

/** Texto según idioma: t('Hola', 'Hello') */
export const t = (es, en) => (LANG === 'en' ? en : es);

/** Campo de un objeto de config.js, usando obj.en[campo] si existe y el idioma es inglés */
export const tr = (obj, field) => (LANG === 'en' && obj.en && obj.en[field] != null ? obj.en[field] : obj[field]);

/* Textos estáticos de index.html: [selector, html] o [selector, valor, atributo] */
const EN = [
  ['.skip-link', 'Skip to content'],
  ['.top-nav', 'Sections', 'aria-label'],
  ['.top-nav a[href="#proyectos"]', 'Projects'],
  ['.top-nav a[href="#servicios"]', 'Services'],
  ['.top-nav a[href="#habilidades"]', 'Skills'],
  ['.top-nav a[href="#trayectoria"]', 'Experience'],
  ['.top-nav a[href="#contacto"]', 'Contact'],

  // Hero
  ['.hero-lede', 'Websites and booking systems for businesses in Badajoz and Extremadura: get found on Google, let customers book without calling, and manage everything from one dashboard.'],
  ['.hero-stack', 'Full-stack web developer working with React, Laravel and Supabase.'],
  ['.hero-actions .btn-solid', 'Get a quote'],
  ['.hero-actions .btn:not(.btn-solid)', 'See projects'],
  ['#hero-status', 'Ready to start new projects.'],
  ['.hero-photo img', 'Portrait of Luis Gordillo', 'alt'],

  // Sobre mí
  ['#story-title', 'I don’t build mock-ups: I build software that works.'],
  ['#sobre-mi .story-item:nth-child(1) .story-text', 'Real-time bookings with no overlaps: two people can never take the same court.'],
  ['#sobre-mi .story-item:nth-child(2) .story-text', 'Logging a set takes under 10 seconds and it’s saved even if the connection drops.'],
  ['#sobre-mi .story-item:nth-child(3) .story-text', 'Simulates a brute-force attack in real time to measure how strong a password is.'],
  ['#sobre-mi .story-item:nth-child(4) .story-text', 'A catalogue with step-by-step scrolling and colour-curtain transitions between artists.'],
  ['.demo-kore .demo-bar span:first-child', 'Padel courts, Saturday'],
  ['.demo-kore .demo-live', 'Live'],
  ['.demo-toast', 'Court 2 booked for 18:30'],
  ['.demo-warn', '19:00 is already booked'],
  ['.demo-daily .demo-bar span:first-child', 'Bench press'],
  ['.sets li:nth-child(1)', '<span>Set 1</span><span>60 kg × 8</span>'],
  ['.sets li:nth-child(2)', '<span>Set 2</span><span>62.5 kg × 8</span>'],
  ['.sets li:nth-child(3)', '<span>Set 3</span><span>62.5 kg × 7</span>'],
  ['.demo-vault .demo-bar span:first-child', 'Vault'],
  ['.demo-vault .demo-live', 'Simulating attack'],
  ['.meter-labels', '<span>Weak</span><span>Medium</span><span>Strong</span>'],
  ['.demo-mantra .demo-bar span:last-child', 'Artists'],
  ['.ink-3 p', 'Traditional'],

  // Proyectos
  ['.projects-intro h2', 'Projects'],
  ['.projects-intro p', 'Each project has its own identity, so the page takes on its look while you read about it. Each one links to its live version.'],
  ['#rail', 'Project list', 'aria-label'],

  // Servicios
  ['#services-title', 'Services'],
  ['#servicios .story-intro', 'Websites, booking systems and maintenance. Here’s how we work, step by step:'],
  ['.demo-flow .demo-bar', '<span>Call notes</span><span>No commitment</span>'],
  ['.notes li:nth-child(1)', '<span>Business</span><b>Padel club</b>'],
  ['.notes li:nth-child(2)', '<span>Problem</span><b>Bookings by phone</b>'],
  ['.notes li:nth-child(3)', '<span>Needs</span><b>Online bookings and a dashboard</b>'],
  ['.notes li:nth-child(4)', '<span>Next step</span><b>Written proposal</b>'],
  ['.flow .node:nth-child(1)', 'Pick a court'],
  ['.flow .node:nth-child(3)', 'Pick a time'],
  ['.flow .node:nth-child(5)', 'Confirm'],
  ['.flow .node:nth-child(7)', 'Booked'],
  ['.demo-system .demo-bar', '<span>An identity for each project</span><span>5 systems</span>'],
  ['.code code', '<span class="k">export function</span> <span class="f">SetCard</span>({ weight, reps }) {\n  <span class="k">return</span> (\n    &lt;<span class="t">button</span> <span class="a">onClick</span>={save}&gt;\n      {weight} kg × {reps}\n    &lt;/<span class="t">button</span>&gt;\n  );\n}'],
  ['.set-btn', '62.5 kg × 7'],
  ['.code-out small', 'Saved'],
  ['.demo-launch .demo-live', 'Live'],
  ['.kore-top span', 'Booking dashboard'],
  ['.kore-week span:nth-child(1)', 'M'], ['.kore-week span:nth-child(2)', 'T'], ['.kore-week span:nth-child(3)', 'W'],
  ['.kore-week span:nth-child(4)', 'T'], ['.kore-week span:nth-child(5)', 'F'], ['.kore-week span:nth-child(6)', 'S'],
  ['.kore-week span:nth-child(7)', 'S'],
  ['.kore-deploy', 'Deployed on Vercel'],
  ['.checks', '<li>Backups</li><li>Updates</li><li>Changes whenever you need them</li>'],
  ['.plans-intro', 'Three ways to work together. Every project is different, so the price depends on what your business needs: get in touch and I’ll give you a quote with no commitment.'],

  // Habilidades y trayectoria
  ['#habilidades h2', 'Skills'],
  ['#habilidades .block-head > p', 'Tap a technology to see what I do with it and which projects I’ve used it in.'],
  ['#trayectoria h2', 'Experience'],
  ['#trayectoria .block-head > p', 'Education and experience. If you’re hiring for your team, here’s my full CV.'],
  ['.btn-cv', 'Download CV<span class="sr-only"> (PDF, in Spanish)</span>'],
  ['.timeline li:nth-child(1) time', 'September 2026 – June 2027'],
  ['.timeline li:nth-child(1) h3', 'Higher Diploma in Multi-platform Application Development'],
  ['.timeline li:nth-child(1) .where', 'Second year, in progress'],
  ['.timeline li:nth-child(1) .where + p', 'Taking what I learned in web development to desktop and mobile apps, while working on freelance projects.'],
  ['.timeline li:nth-child(2) time', 'June 2026 – present'],
  ['.timeline li:nth-child(2) h3', 'Freelance web developer'],
  ['.timeline li:nth-child(2) .where', 'Custom projects'],
  ['.timeline li:nth-child(2) .where + p', 'I design and build custom websites and apps for clients, from the first proposal to deployment and maintenance.'],
  ['.timeline li:nth-child(3) time', 'March – June 2026'],
  ['.timeline li:nth-child(3) h3', 'Web developer intern'],
  ['.timeline li:nth-child(3) .where + p', 'Work placement in the development and design team: building and maintaining web solutions across the whole development cycle.'],
  ['.timeline li:nth-child(4) h3', 'Higher Diploma in Web Application Development'],
  ['.timeline li:nth-child(4) .where + p', 'Final project: KoreManager, a booking system for municipal sports facilities.'],
  ['.timeline li:nth-child(5) time', 'February 2024'],
  ['.timeline li:nth-child(5) h3', 'Job shadowing'],
  ['.timeline li:nth-child(5) .where + p', 'Two weeks seeing how a product team works: workflows, agile organisation and internal tools.'],

  // Contacto
  ['#giant', 'Let’s talk', 'aria-label'],
  ['#giant a', 'Let’s talk'],
  ['#contacto .block-head > p', 'Tell me what your business needs and I’ll reply by email with a price and timeline. If you’re reaching out about a job, you can also write to me here.'],
  ['.contact-links a[href*="github"]', 'GitHub<span class="sr-only"> (opens in a new tab)</span>'],
  ['.contact-links a[href*="linkedin"]', 'LinkedIn<span class="sr-only"> (opens in a new tab)</span>'],
  ['label[for="f-name"]', 'Name'],
  ['label[for="f-email"]', 'Email'],
  ['label[for="f-need"]', 'What do you need?'],
  ['#f-need option[value=""]', 'Choose an option'],
  ['#f-need option[value="web"]', 'A website for my business'],
  ['#f-need option[value="reservas"]', 'A booking system'],
  ['#f-need option[value="mantenimiento"]', 'Maintenance for my website'],
  ['#f-need option[value="otro"]', 'Something else'],
  ['#f-need option[value="empleo"]', 'A job offer'],
  ['label[for="f-budget"]', 'Approximate budget <span class="field-optional">(optional)</span>'],
  ['#f-budget option[value=""]', 'Not sure yet'],
  ['#f-budget option[value="menos-500"]', 'Under €500'],
  ['#f-budget option[value="500-1000"]', '€500 to €1,000'],
  ['#f-budget option[value="1000-2000"]', '€1,000 to €2,000'],
  ['#f-budget option[value="mas-2000"]', 'Over €2,000'],
  ['label[for="f-message"]', 'Message'],
  ['label[for="f-privacy"]', 'I have read the <a href="privacidad.html">privacy policy</a> (in Spanish) and agree to my data being used to reply to my message.'],
  ['.form-legal', '<strong>Controller:</strong> Luis Gordillo Rodríguez. <strong>Purpose:</strong> to reply to your message and, if you ask, prepare a quote. <strong>Legal basis:</strong> your consent. <strong>Recipients:</strong> the providers that host the website and send the email, with safeguards for transfers outside the EU. <strong>Rights:</strong> access, rectification, erasure and the other rights granted by law, by writing to luisgordillor01@gmail.com. More information in the <a href="privacidad.html">privacy policy</a> (in Spanish).'],
  ['#f-submit', 'Send message'],

  // Pie
  ['.foot-legal', 'Legal information', 'aria-label'],
  ['.foot-legal a[href="aviso-legal.html"]', 'Legal notice'],
  ['.foot-legal a[href="privacidad.html"]', 'Privacy'],
  ['.foot-legal a[href="#inicio"]', 'Back to top'],
];

const META_EN = {
  title: 'Web developer in Badajoz | Websites and booking systems',
  description: 'Web developer in Badajoz: websites for businesses and online booking systems in Badajoz, Montijo and across Extremadura. Get a quote with no commitment.',
};

/** Traduce la página si el idioma es inglés. Se llama antes de pintar iconos y contenido dinámico. */
export function translatePage() {
  if (LANG !== 'en') return;
  for (const [sel, value, attr] of EN) {
    const el = document.querySelector(sel);
    if (!el) continue;
    if (attr) el.setAttribute(attr, value);
    else el.innerHTML = value;
  }
  document.title = META_EN.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', META_EN.description);
}

/** Botón ES/EN: recarga la página en el otro idioma conservando la sección actual */
export function initLangToggle(btn) {
  if (!btn) return;
  const other = LANG === 'en' ? 'es' : 'en';
  btn.textContent = other.toUpperCase();
  btn.lang = other;
  btn.setAttribute('aria-label', LANG === 'en' ? 'ES: ver la web en español' : 'EN: view this site in English');
  btn.addEventListener('click', () => {
    try { localStorage.setItem('idioma', other); } catch {}
    const url = new URL(location.href);
    url.searchParams.set('lang', other);
    location.href = url.toString();
  });
}
