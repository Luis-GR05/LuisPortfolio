/**
 * site.js — lógica de la página de scroll.
 * Los datos (proyectos, habilidades) siguen viviendo en config.js.
 */
import { CONFIG } from './config.js';

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Categorías en castellano (config.js las guarda en inglés) */
const KIND = {
  kore: 'Reserva y gestión de pistas deportivas',
  dailyset: 'Registro y análisis de entrenamientos',
  nidus: 'Inmobiliaria boutique',
  mantra: 'Catálogo para conectar con tatuadores',
  nextvault: 'Gestor de contraseñas',
  bistroson: 'Web y reservas para un restaurante de Badajoz',
};
const STATUS = { LIVE: 'En producción', DEV: 'En desarrollo' };
/* Imágenes que llenan el marco en vez de mostrarse como logo */
const COVER = new Set(['kore', 'bistroson']);
/* Logo de cada app (square: icono cuadrado; si no, el logotipo horizontal) */
const LOGO = {
  kore:      { src: 'assets/img/kore-logo.webp', w: 225, h: 256, square: true, contain: true, bg: '#FFFFFF' },
  dailyset:  { src: 'assets/img/dailyset-logo.png', w: 190, h: 62 },
  nidus:     { src: 'assets/img/Nidus.png', w: 132, h: 53 },
  mantra:    { src: 'assets/img/Mantra.png', w: 172, h: 56 },
  nextvault: { src: 'assets/img/nextvault.png', w: 165, h: 47 },
  bistroson: { src: 'assets/img/bistroson-mark.webp', w: 256, h: 222, square: true, contain: true, bg: '#16241D' },
};
/* Icono de cada tecnología (assets/tech, colección Devicon) */
const TECH_ICON = [
  ['react', 'react'], ['tailwind', 'tailwindcss'], ['supabase', 'supabase'], ['next', 'nextjs'], ['three', 'threejs'],
  ['framer', 'framermotion'], ['vercel', 'vercel'], ['html', 'html5'], ['css', 'css3'], ['js', 'javascript'],
  ['javascript', 'javascript'], ['typescript', 'typescript'],
];
const SKILL_ICON = { html: 'html5', css: 'css3', js: 'javascript', react: 'react', java: 'java', python: 'python', laravel: 'laravel', cpp: 'cplusplus', sql: 'postgresql' };
const techIcon = t => {
  const hit = TECH_ICON.find(([k]) => t.toLowerCase().includes(k));
  return hit ? `<img src="assets/tech/${hit[1]}.svg" alt="" width="18" height="18" loading="lazy">` : '';
};
/* Iconos de interfaz (trazo propio, 24×24) */
const ICONS = {
  ext: '<path d="M7 17 17 7M8 7h9v9"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
  down: '<path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/>',
  arrowdown: '<path d="M12 5v14m-6-6 6 6 6-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
  send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
  pin: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};
const icon = name => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));
/* Cómo aparece cada habilidad en las listas de tecnologías de los proyectos */
const SKILL_MATCH = { html: ['html'], css: ['css', 'tailwind'], js: ['js', 'javascript'], react: ['react'], sql: ['supabase', 'sql'] };

renderProjects();
renderSkills();
initThemeOnScroll();
initHeroType();
initProgress();
initNavState();
initContact();
initMotion();
fitTitles();
$('#year').textContent = new Date().getFullYear();
initClock();

/* ── Proyectos ─────────────────────────────────────────────── */
function renderProjects() {
  const list = $('#projects-list');
  const rail = $('#rail');

  list.innerHTML = CONFIG.projects.map(p => {
    const logo = LOGO[p.id];
    const logoHtml = logo
      ? `<img class="project-logo reveal${logo.square ? ' is-square' : ''}${logo.contain ? ' is-contain' : ''}" ${logo.bg ? ` style="background:${logo.bg}"` : ''} src="${logo.src}" width="${logo.w}" height="${logo.h}" alt="Logo de ${esc(p.title)}" loading="lazy">`
      : '';
    const head = `
      ${logoHtml}
      <p class="project-status reveal">${esc(STATUS[p.status] || p.status)}, ${esc(p.year)}</p>
      <h3 class="project-title"><span class="mask"><span>${esc(p.title)}</span></span></h3>`;

    if (p.pending) {
      return `<article class="project" id="p-${p.id}" data-id="${p.id}">
        <div>${head}<p class="pending-note">Ficha en preparación. Muy pronto, aquí, el detalle del proyecto y su demo.</p></div>
      </article>`;
    }

    const host = p.demoUrl ? new URL(p.demoUrl).host : '';
    return `<article class="project" id="p-${p.id}" data-id="${p.id}">
      <div>
        ${head}
        <p class="project-kind reveal" style="--i:2">${esc(KIND[p.id] || p.category)}</p>
        <dl>
          <div class="reveal" style="--i:3"><dt>El problema</dt><dd>${esc(p.problem)}</dd></div>
          <div class="reveal" style="--i:4"><dt>La solución</dt><dd>${esc(p.solution)}</dd></div>
          <div class="reveal" style="--i:5"><dt>El resultado</dt><dd>${esc(p.impact)}</dd></div>
        </dl>
        <ul class="tech reveal" style="--i:6">${p.tech.map(t => `<li>${techIcon(t)}${esc(t)}</li>`).join('')}</ul>
        <div class="project-links reveal" style="--i:7">
          ${p.demoUrl ? `<a class="btn btn-solid" href="${esc(p.demoUrl)}" target="_blank" rel="noopener">${icon('ext')}Ver el proyecto<span class="sr-only"> (se abre en una pestaña nueva)</span></a>` : ''}
          ${p.url ? `<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">${icon('code')}Ver el código<span class="sr-only"> (se abre en una pestaña nueva)</span></a>` : ''}
        </div>
      </div>
      <div class="frame-tilt"><div class="frame">
        <div class="frame-bar"><span>${esc(host)}</span></div>
        <div class="frame-view">
          ${p.previewImg ? `<img class="${COVER.has(p.id) ? 'cover' : ''}" src="${esc(p.previewImg)}" alt="Imagen de ${esc(p.title)}" loading="lazy" decoding="async">` : `<span class="frame-poster">${esc(p.title)}</span>`}
          ${p.demoUrl ? `<a class="btn frame-play" href="${esc(p.demoUrl)}" target="_blank" rel="noopener">${icon('ext')}Ver el proyecto<span class="sr-only"> (se abre en una pestaña nueva)</span></a>` : ''}
        </div>
      </div></div>
    </article>`;
  }).join('');

  rail.innerHTML = CONFIG.projects.map(p => `<a href="#p-${p.id}" data-id="${p.id}">${esc(p.title)}</a>`).join('');
}

/* La página adopta el tema del proyecto que ocupa el centro de la pantalla */
function initThemeOnScroll() {
  const railLinks = [...document.querySelectorAll('.rail a')];
  const visible = new Set();
  const setTheme = id => {
    document.body.dataset.theme = id;
    railLinks.forEach(a => a.setAttribute('aria-current', String(a.dataset.id === id)));
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    const current = [...visible].pop();
    setTheme(current ? current.dataset.id : 'base');
  }, { rootMargin: '-50% 0px -50% 0px' });
  document.querySelectorAll('.project').forEach(el => io.observe(el));
}

/* ── Hero: el nombre cambia de peso y anchura con el puntero ── */
function initHeroType() {
  const name = $('#hero-name');
  if (reduceMotion || !matchMedia('(pointer: fine)').matches) return;
  let raf = 0;
  addEventListener('pointermove', e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;
      name.style.setProperty('--w', Math.round(250 + x * 550));
      name.style.setProperty('--wd', Math.round(100 - y * 25));
    });
  }, { passive: true });
}

function initProgress() {
  const bar = $('#progress-bar');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

function initNavState() {
  const links = [...document.querySelectorAll('.top-nav a')];
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.setAttribute('aria-current', String(a.hash === `#${en.target.id}`)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section').forEach(s => io.observe(s));
}

/* ── Habilidades ───────────────────────────────────────────── */
function renderSkills() {
  const root = $('#skills');
  const nodes = Object.entries(CONFIG.skills.nodes).sort((a, b) => b[1].level - a[1].level);

  root.innerHTML = nodes.map(([id, s], i) => {
    const keys = SKILL_MATCH[id] || [s.label.toLowerCase()];
    const used = CONFIG.projects.filter(p => (p.tech || []).some(t => keys.some(k => t.toLowerCase().includes(k))));
    const usedHtml = used.length
      ? `<p>La he usado en ${used.map(p => `<a href="#p-${p.id}">${esc(p.title)}</a>`).join(', ')}.</p>`
      : '';
    return `<div class="skill reveal" style="--i:${i}">
      <button type="button" aria-expanded="false" aria-controls="sk-${id}">
        <img class="skill-icon" src="assets/tech/${SKILL_ICON[id]}.svg" alt="" width="28" height="28" loading="lazy">
        <span class="skill-name">${esc(s.label)}</span>
        <span class="skill-years">${s.years} ${s.years === 1 ? 'año' : 'años'}</span>
        <span class="skill-sign" aria-hidden="true">+</span>
      </button>
      <div class="skill-panel" id="sk-${id}" inert><div><p>${esc(s.desc)}</p>${usedHtml}</div></div>
    </div>`;
  }).join('');

  root.addEventListener('click', e => {
    const btn = e.target.closest('.skill > button');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') === 'true';
    root.querySelectorAll('.skill > button').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.inert = true;
    });
    btn.setAttribute('aria-expanded', String(!open));
    btn.nextElementSibling.inert = open;
  });
}

/* ── Contacto ──────────────────────────────────────────────── */
function initContact() {
  const form = $('#contact-form');
  const status = $('#form-status');
  const submit = $('#f-submit');
  const rules = {
    name: v => (v.trim().length >= 2 ? '' : 'Escribe tu nombre.'),
    email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Escribe un correo válido, como nombre@dominio.com.'),
    message: v => (v.trim().length >= 10 ? '' : 'Escribe un mensaje de al menos 10 caracteres.'),
    privacy: v => (v ? '' : 'Marca la casilla para poder enviar el mensaje.'),
  };
  const check = name => {
    const input = form.elements[name];
    const msg = rules[name](input.type === 'checkbox' ? input.checked : input.value);
    $(`#e-${name}`).textContent = msg;
    input.setAttribute('aria-invalid', String(Boolean(msg)));
    return !msg;
  };
  Object.keys(rules).forEach(name => form.elements[name].addEventListener(name === 'privacy' ? 'change' : 'blur', () => check(name)));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }

    const { privacy, ...data } = Object.fromEntries(new FormData(form));
    data.consent = privacy === 'on';
    const post = url => fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    }).then(r => { if (!r.ok) throw new Error(r.status); });

    submit.disabled = true;
    submit.lastChild.textContent = 'Enviando…';
    status.textContent = '';
    try {
      await post('/api/send-email').catch(() => post(`https://formspree.io/f/${CONFIG.formspreeId}`));
      form.reset();
      status.textContent = 'Mensaje enviado. Te responderé por correo.';
    } catch {
      status.textContent = 'No se pudo enviar el mensaje. Escríbeme a luisgordillor01@gmail.com.';
    } finally {
      submit.disabled = false;
      submit.lastChild.textContent = 'Enviar mensaje';
    }
  });
}

/* ── Animación ─────────────────────────────────────────────── */
function initClock() {
  const el = $('#clock');
  const fmt = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 1000);
}

function initMotion() {
  if (reduceMotion) return;

  // 0. Scroll suave
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ autoRaf: true, anchors: { offset: -60 }, lerp: 0.11 });
  }

  // 0b. Cortina de carga: cuenta hasta 100 y se levanta
  const loader = $('#loader');
  const count = $('#loader-count');
  const t0 = performance.now();
  // Sin cookies ni almacenamiento local: la cortina dura poco y se muestra siempre
  const DURATION = 700;
  lenis?.stop();
  (function step(now) {
    const k = Math.min(1, (now - t0) / DURATION);
    count.textContent = Math.round((1 - Math.pow(1 - k, 3)) * 100);
    if (k < 1) return requestAnimationFrame(step);
    loader.classList.add('done');
    document.documentElement.classList.add('ready');
    lenis?.start();
  })(t0);

  // 0c. Declaración: las palabras se encienden al avanzar
  const statement = $('#statement');
  const wrapWords = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part.trim()) return frag.append(part);
          const span = document.createElement('span');
          span.className = 'w';
          span.textContent = part;
          frag.append(span);
        });
        child.replaceWith(frag);
      } else if (child.tagName === 'IMG') {
        child.classList.add('w');
      } else {
        wrapWords(child);
      }
    });
  };
  wrapWords(statement);
  const words = [...statement.querySelectorAll('.w')];
  const statementBox = statement.closest('.statement');

  // 0d. Cierre gigante, letra a letra
  const giant = $('#giant');
  const giantLink = $('a', giant);
  giantLink.innerHTML = [...giantLink.textContent].map((ch, i) => `<span class="ch" style="--i:${i}">${ch}</span>`).join('');
  giant.classList.add('watch');

  const fine = matchMedia('(pointer: fine)').matches;

  // 1. Entrada del nombre, letra a letra
  const name = $('#hero-name');
  let n = 0;
  name.querySelectorAll(':scope > span').forEach(line => {
    line.innerHTML = [...line.textContent].map(ch => `<span class="ch" style="--i:${n++}">${ch}</span>`).join('');
  });
  name.classList.add('split');

  // 2. Titulares de sección con máscara
  document.querySelectorAll('.projects-intro h2, .block-head h2:not(.giant)').forEach(h => {
    h.innerHTML = `<span class="mask"><span>${h.innerHTML}</span></span>`;
    h.classList.add('watch');
  });
  document.querySelectorAll('.projects-intro p, .block-head > p, .contact-links, .timeline li, .form > *').forEach((el, i) => {
    el.classList.add('reveal', 'watch');
    el.style.setProperty('--i', i % 5);
  });
  document.querySelectorAll('.skill').forEach(el => el.classList.add('watch'));

  // 3. Revelados al entrar en pantalla
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  document.querySelectorAll('.watch, .project').forEach(el => io.observe(el));

  // 4. Efectos ligados al scroll: hero y línea de trayectoria
  const hero = $('.hero');
  const timeline = $('.timeline');
  const header = $('.top');
  const tilts = [...document.querySelectorAll('.frame-tilt')];
  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    if (y < innerHeight * 1.2) hero.style.setProperty('--sy', y);
    // cabecera: se esconde al bajar y vuelve al subir
    header.classList.toggle('is-hidden', y > lastY && y > innerHeight * 0.6);
    lastY = y;
    // declaración
    const sr = statementBox.getBoundingClientRect();
    const pinned = sr.height > innerHeight * 1.5;
    const sp = pinned
      ? (-sr.top / (sr.height - innerHeight)) * 1.2 - 0.03
      : (innerHeight * 0.85 - sr.top) / (sr.height + innerHeight * 0.1);
    words.forEach((w, i) => w.classList.toggle('lit', i / words.length < sp));
    // parallax de los marcos (solo escritorio)
    if (innerWidth > 900) tilts.forEach(t => {
      const tr = t.parentElement.getBoundingClientRect();
      if (tr.bottom < 0 || tr.top > innerHeight) return;
      const off = (tr.top + tr.height / 2 - innerHeight / 2) / innerHeight;
      t.style.setProperty('--py', `${(off * -70).toFixed(1)}px`);
    });
    const r = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
    timeline.style.setProperty('--p', p);
    timeline.querySelectorAll('li').forEach(li => {
      li.classList.toggle('lit', li.getBoundingClientRect().top < innerHeight * 0.7);
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if (!fine) return;

  // 5. Marco de la demo: inclinación 3D siguiendo el puntero
  document.querySelectorAll('.project').forEach(project => {
    const frame = $('.frame', project);
    if (!frame) return;
    project.addEventListener('pointermove', e => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      frame.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`);
      frame.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
    });
    project.addEventListener('pointerleave', () => {
      frame.style.removeProperty('--rx');
      frame.style.removeProperty('--ry');
    });
  });

  // 6. Botones magnéticos
  document.querySelectorAll('.btn:not(.frame-play)').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.translate = ''; });
  });

  // 7. Cursor
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.append(cursor);
  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
  addEventListener('pointermove', e => {
    tx = e.clientX; ty = e.clientY;
    cursor.classList.add('on');
    cursor.classList.toggle('big', Boolean(e.target.closest('a, button, .frame')));
    cursor.classList.toggle('hide', Boolean(e.target.closest('iframe, input, textarea')));
  }, { passive: true });
  document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
  let running = false;
  const loop = () => {
    cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    running = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.2;
    if (running) requestAnimationFrame(loop);
  };
  addEventListener('pointermove', () => { if (!running) { running = true; requestAnimationFrame(loop); } }, { passive: true });
}

/* Los títulos de proyecto nunca se parten: si no caben en su columna, se reducen */
function fitTitles() {
  const fit = () => {
    document.querySelectorAll('.project-title').forEach(title => {
      const inner = title.querySelector('.mask > span') || title;
      title.style.fontSize = '';
      let size = parseFloat(getComputedStyle(title).fontSize);
      for (let i = 0; i < 12 && inner.scrollWidth > inner.clientWidth + 1 && size > 24; i++) {
        size *= Math.max(0.6, (inner.clientWidth / inner.scrollWidth) * 0.98);
        title.style.fontSize = `${size}px`;
      }
    });
  };
  fit();
  document.fonts?.ready.then(fit);
  document.fonts?.addEventListener?.('loadingdone', fit);
  addEventListener('load', fit);
  let t = 0;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(fit, 150); });
}
