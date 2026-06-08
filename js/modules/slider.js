/**
 * @file slider.js
 * @description Motor de slider a pantalla completa utilizando GSAP.
 *   Intercepta gestos táctiles, rueda del ratón y teclado, aplicando
 *   animaciones fluidas con efecto de parallax de contenidos.
 */

let currentIndex = 0;
let isAnimating = false;
const animationDuration = 0.85; // Duración de la transición en segundos
let slides = [];
let navLinks = [];
const onSlideChangeCallbacks = [];

function isSliderActive() {
  return window.innerWidth >= 992 && window.innerHeight >= 650;
}

export const SliderEngine = {
  
  init() {
    slides = Array.from(document.querySelectorAll('.slide-section'));
    navLinks = Array.from(document.querySelectorAll('.nav-link'));

    if (slides.length === 0) return;

    this.handleResize();
    this.setupEvents();
    this.updateUI();
  },

  handleResize() {
    if (isSliderActive()) {
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('is-active');
          if (typeof gsap !== 'undefined') {
            gsap.set(slide, { opacity: 1, y: '0%', scale: 1, visibility: 'visible' });
          } else {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
          }
        } else {
          slide.classList.remove('is-active');
          if (typeof gsap !== 'undefined') {
            gsap.set(slide, { opacity: 0, y: '100%', scale: 0.95, visibility: 'hidden' });
          } else {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
          }
        }
      });
    }
  },

  setupEvents() {
    // Interceptar la rueda del ratón (wheel)
    window.addEventListener('wheel', (e) => {
      if (!isSliderActive()) return;
      if (isAnimating) return;
      if (Math.abs(e.deltaY) < 35) return; // Umbral de sensibilidad mínimo

      if (e.deltaY > 0) {
        this.next();
      } else {
        this.prev();
      }
    }, { passive: true });

    // Interceptar gestos móviles (Swipe)
    let startY = 0;
    window.addEventListener('touchstart', (e) => {
      if (!isSliderActive()) return;
      startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (!isSliderActive()) return;
      if (isAnimating) return;
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (Math.abs(deltaY) < 55) return; // Umbral de swipe en píxeles

      if (deltaY > 0) {
        this.next();
      } else {
        this.prev();
      }
    }, { passive: true });

    // Interceptar teclas del teclado
    window.addEventListener('keydown', (e) => {
      if (!isSliderActive()) return;
      if (isAnimating) return;
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          this.next();
          break;
        case 'ArrowUp':
        case 'PageUp':
          this.prev();
          break;
        case 'Home':
          this.goTo(0);
          break;
        case 'End':
          this.goTo(slides.length - 1);
          break;
      }
    });

    // Clicks en los enlaces de navegación del header
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        if (!isSliderActive()) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
        const targetIdx = slides.findIndex(s => s.id === targetId);
        if (targetIdx !== -1) {
          this.goTo(targetIdx);
        }
      });
    });

    // Botones CTAs específicos
    document.addEventListener('click', (e) => {
      const ctaBtn = e.target.closest('[data-go-to]');
      if (ctaBtn) {
        const targetId = ctaBtn.getAttribute('data-go-to');
        if (!isSliderActive()) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
        const targetIdx = slides.findIndex(s => s.id === targetId);
        if (targetIdx !== -1) {
          this.goTo(targetIdx);
        }
      }
    });

    // Evento de cambio de tamaño (resize)
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  },

  next() {
    if (currentIndex < slides.length - 1) {
      this.goTo(currentIndex + 1, 'down');
    }
  },

  prev() {
    if (currentIndex > 0) {
      this.goTo(currentIndex - 1, 'up');
    }
  },

  goTo(targetIndex, direction = null) {
    if (targetIndex === currentIndex || isAnimating || targetIndex < 0 || targetIndex >= slides.length) return;

    isAnimating = true;
    const oldSlide = slides[currentIndex];
    const newSlide = slides[targetIndex];

    if (!direction) {
      direction = targetIndex > currentIndex ? 'down' : 'up';
    }

    const oldY = direction === 'down' ? '-100%' : '100%';
    const newYStart = direction === 'down' ? '100%' : '-100%';

    oldSlide.classList.remove('is-active');
    oldSlide.style.pointerEvents = 'none';

    newSlide.classList.add('is-active');
    newSlide.style.pointerEvents = 'auto';

    // Despachar callbacks
    onSlideChangeCallbacks.forEach(cb => cb(targetIndex, currentIndex, direction));

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(oldSlide, { visibility: 'hidden' });
          isAnimating = false;
        }
      });

      // Posicionar la nueva slide antes de animarla
      gsap.set(newSlide, { visibility: 'visible', opacity: 0, y: newYStart, scale: 0.95 });

      // Animar slide vieja
      tl.to(oldSlide, {
        y: oldY,
        opacity: 0,
        scale: 0.95,
        duration: animationDuration,
        ease: 'power4.inOut'
      }, 0);

      // Animar slide nueva
      tl.to(newSlide, {
        y: '0%',
        opacity: 1,
        scale: 1,
        duration: animationDuration,
        ease: 'power4.inOut'
      }, 0);

      // Micro-animación de entrada (Parallax/Stagger) de los contenidos de la nueva slide
      const animElements = newSlide.querySelectorAll('.animate-in');
      if (animElements.length > 0) {
        tl.fromTo(animElements,
          { opacity: 0, y: direction === 'down' ? 40 : -40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          `-=${animationDuration * 0.45}`
        );
      }
    } else {
      // Fallback si GSAP falla
      oldSlide.style.visibility = 'hidden';
      oldSlide.style.opacity = '0';
      newSlide.style.visibility = 'visible';
      newSlide.style.opacity = '1';
      isAnimating = false;
    }

    currentIndex = targetIndex;
    this.updateUI();
  },

  updateUI() {

    const activeSlideId = slides[currentIndex]?.id;
    navLinks.forEach((link) => {
      const isTarget = link.getAttribute('data-target') === activeSlideId;
      link.classList.toggle('is-active', isTarget);
    });
  },

  onSlideChange(callback) {
    onSlideChangeCallbacks.push(callback);
  },

  getCurrentIndex() {
    return currentIndex;
  }
};
