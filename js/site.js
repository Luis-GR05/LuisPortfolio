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
  kore: 'Reservas de instalaciones deportivas municipales',
  dailyset: 'Registro y análisis de entrenamientos',
  nidus: 'Inmobiliaria boutique',
  mantra: 'Catálogo para conectar con tatuadores',
  nextvault: 'Gestor de contraseñas',
  bistroson: 'Web y reservas para un restaurante de Badajoz',
};
const STATUS = { LIVE: 'En producción', DEV: 'En desarrollo' };
/* Imágenes que llenan el marco en vez de mostrarse como logo */
const COVER = new Set(['kore']);
/* Cómo aparece cada habilidad en las listas de tecnologías de los proyectos */
const SKILL_MATCH = { html: ['html'], css: ['css', 'tailwind'], js: ['js', 'javascript'], react: ['react'], sql: ['supabase', 'sql'] };

renderProjects();
renderSkills();
initThemeOnScroll();
initHeroType();
initProgress();
initNavState();
initContact();
$('#year').textContent = new Date().getFullYear();

/* ── Proyectos ─────────────────────────────────────────────── */
function renderProjects() {
  const list = $('#projects-list');
  const rail = $('#rail');

  list.innerHTML = CONFIG.projects.map(p => {
    const head = `
      <p class="project-status">${esc(STATUS[p.status] || p.status)}, ${esc(p.year)}</p>
      <h3 class="project-title">${esc(p.title)}</h3>`;

    if (p.pending) {
      return `<article class="project" id="p-${p.id}" data-id="${p.id}">
        <div>${head}<p class="pending-note">Ficha en preparación. Muy pronto, aquí, el detalle del proyecto y su demo.</p></div>
      </article>`;
    }

    const host = p.demoUrl ? new URL(p.demoUrl).host : '';
    return `<article class="project" id="p-${p.id}" data-id="${p.id}">
      <div>
        ${head}
        <p class="project-kind">${esc(KIND[p.id] || p.category)}</p>
        <dl>
          <div><dt>El problema</dt><dd>${esc(p.problem)}</dd></div>
          <div><dt>La solución</dt><dd>${esc(p.solution)}</dd></div>
          <div><dt>El resultado</dt><dd>${esc(p.impact)}</dd></div>
        </dl>
        <ul class="tech">${p.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="project-links">
          ${p.demoUrl ? `<a class="btn btn-solid" href="${esc(p.demoUrl)}" target="_blank" rel="noopener">Abrir la demo</a>` : ''}
          ${p.url ? `<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">Ver el código</a>` : ''}
        </div>
      </div>
      <div class="frame">
        <div class="frame-bar"><span>${esc(host)}</span><button type="button" class="frame-close" hidden>Cerrar la demo</button></div>
        <div class="frame-view">
          ${p.previewImg ? `<img class="${COVER.has(p.id) ? 'cover' : ''}" src="${esc(p.previewImg)}" alt="Imagen de ${esc(p.title)}" loading="lazy">` : `<span class="frame-poster">${esc(p.title)}</span>`}
          ${p.demoUrl ? `<button type="button" class="btn frame-play" data-src="${esc(p.demoUrl)}" data-title="${esc(p.title)}">Probar la demo aquí</button>` : ''}
        </div>
      </div>
    </article>`;
  }).join('');

  rail.innerHTML = CONFIG.projects.map(p => `<a href="#p-${p.id}" data-id="${p.id}">${esc(p.title)}</a>`).join('');

  // Demo embebida: se carga solo cuando se pide
  list.addEventListener('click', e => {
    const play = e.target.closest('.frame-play');
    const close = e.target.closest('.frame-close');
    if (play) {
      const view = play.parentElement;
      const iframe = document.createElement('iframe');
      iframe.src = play.dataset.src;
      iframe.title = `Demo de ${play.dataset.title}`;
      iframe.loading = 'lazy';
      view.append(iframe);
      play.hidden = true;
      $('.frame-close', view.parentElement).hidden = false;
    }
    if (close) {
      const frame = close.closest('.frame');
      $('iframe', frame)?.remove();
      $('.frame-play', frame).hidden = false;
      close.hidden = true;
    }
  });
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

  root.innerHTML = nodes.map(([id, s]) => {
    const keys = SKILL_MATCH[id] || [s.label.toLowerCase()];
    const used = CONFIG.projects.filter(p => (p.tech || []).some(t => keys.some(k => t.toLowerCase().includes(k))));
    const usedHtml = used.length
      ? `<p>La he usado en ${used.map(p => `<a href="#p-${p.id}">${esc(p.title)}</a>`).join(', ')}.</p>`
      : '';
    return `<div class="skill">
      <button type="button" aria-expanded="false" aria-controls="sk-${id}">
        <span class="skill-name">${esc(s.label)}</span>
        <span class="skill-years">${s.years} ${s.years === 1 ? 'año' : 'años'}</span>
        <span class="skill-sign" aria-hidden="true">+</span>
      </button>
      <div class="skill-panel" id="sk-${id}"><div><p>${esc(s.desc)}</p>${usedHtml}</div></div>
    </div>`;
  }).join('');

  root.addEventListener('click', e => {
    const btn = e.target.closest('.skill > button');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') === 'true';
    root.querySelectorAll('.skill > button').forEach(b => b.setAttribute('aria-expanded', 'false'));
    btn.setAttribute('aria-expanded', String(!open));
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
  };
  const check = name => {
    const input = form.elements[name];
    const msg = rules[name](input.value);
    $(`#e-${name}`).textContent = msg;
    input.setAttribute('aria-invalid', String(Boolean(msg)));
    return !msg;
  };
  Object.keys(rules).forEach(name => form.elements[name].addEventListener('blur', () => check(name)));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    const post = url => fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    }).then(r => { if (!r.ok) throw new Error(r.status); });

    submit.disabled = true;
    submit.textContent = 'Enviando…';
    status.textContent = '';
    try {
      await post('/api/send-email').catch(() => post(`https://formspree.io/f/${CONFIG.formspreeId}`));
      form.reset();
      status.textContent = 'Mensaje enviado. Te responderé por correo.';
    } catch {
      status.textContent = 'No se pudo enviar el mensaje. Escríbeme a luisgordillor01@gmail.com.';
    } finally {
      submit.disabled = false;
      submit.textContent = 'Enviar mensaje';
    }
  });
}
