/**
 * LuisPortfolio OS - Core Logic
 * Arquitectura: State-Driven UI (Vanilla JS)
 */

document.addEventListener("DOMContentLoaded", () => {
  const app = {
    // 1. DATA STATE (Inyectable desde configuración externa)
    config: {
      name: "Luis Gordillo Rodríguez",
      role: "Técnico Superior en Desarrollo de Aplicaciones Web",
      location: "Montijo, Badajoz, ES",
      status: "SYSTEM_READY",
      version: "1.0.4",
      bio: "Técnico Superior en Desarrollo Web. Forjado en el entorno de distintas instituciones y empresas. Construyo arquitecturas robustas combinando la lógica de backend (Java/Python/JavaScript) con interfaces precisas (HTML/CSS/React). Entrego código limpio a alta velocidad."
    },

    // 2. CACHE DE ELEMENTOS (Evitamos consultas repetitivas al DOM)
    ui: {
      navButtons: document.querySelectorAll(".nav-btn"),
      sections: document.querySelectorAll(".view-section"),
      displayRole: document.getElementById("hero-role"),
      displayName: document.getElementById("sys-name"),
      displayStatus: document.getElementById("sys-status"),
      displayLocation: document.getElementById("sys-location"),
    },

    // 3. INICIALIZACIÓN
    init() {
      console.log(`[SYS] Inicializando ${this.config.name}Portfolio...`);
      this.injectData();
      this.setupEventListeners();
      this.bootSequence();
      
      // Encender subsistemas
      if (typeof SkillTreeEngine !== 'undefined') {
          SkillTreeEngine.init();
      }
      if (typeof ArcadeEngine !== 'undefined') {
          ArcadeEngine.init();
      }
    },

    // 4. INYECCIÓN DE DATOS (Single Source of Truth)
    injectData() {
      this.ui.displayName.textContent = this.config.name;
      this.ui.displayRole.textContent = this.config.role;
      this.ui.displayStatus.textContent = this.config.status;
      this.ui.displayLocation.textContent = this.config.location;
    },

    // 5. LÓGICA DE NAVEGACIÓN (SPA Manual)
    setupEventListeners() {
      this.ui.navButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const target = e.currentTarget.getAttribute("data-target");
          this.switchView(target);

          // Actualizar estado visual de los botones
          this.ui.navButtons.forEach((b) => b.classList.remove("active"));
          e.currentTarget.classList.add("active");
        });
      });
    },

    switchView(targetId) {
      this.ui.sections.forEach((section) => {
        // Transición limpia: primero quitamos active
        section.classList.remove("active");
        section.classList.add("hidden");

        if (section.id === targetId) {
          section.classList.remove("hidden");
          // Delay mínimo para permitir que el motor de render note el cambio de 'hidden'
          setTimeout(() => section.classList.add("active"), 10);
        }
      });

      // Log de sistema (efecto visual en consola o HUD futuro)
      console.log(`[NAV] Accediendo a: ${targetId}`);
    },

    // 6. EFECTOS DE "BOOTUP"
    bootSequence() {
      // Aquí añadiremos efectos de glitch iniciales
      const prompt = document.querySelector(".terminal-prompt");
      this.typeWriter(prompt, this.config.bio, 25);
    },

    // js/main.js - Añadir al objeto 'app'

    typeWriter(element, text, speed = 50) {
      element.textContent = "";
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    },
  };

  app.init();
});
