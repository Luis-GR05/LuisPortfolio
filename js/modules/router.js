/**
 * @file router.js
 * @description Navegación SPA manual. Gestiona el cambio entre vistas
 *   y sincroniza el estado visual de los botones de navegación.
 *   CORRECCIÓN: usa requestAnimationFrame en lugar del setTimeout(10ms) hack.
 */

/**
 * Inicializa el router y devuelve la API pública.
 * @returns {{ navigate: (targetId: string) => void }}
 */
export function initRouter() {

  const navButtons = document.querySelectorAll('.nav-btn');
  const sections   = document.querySelectorAll('.view-section');
  const overlayBtn = document.getElementById('mobile-menu-btn');
  const headerNode = document.querySelector('.hud-header');

  // Comportamiento del botón hamburguesa
  if (overlayBtn) {
    overlayBtn.addEventListener('click', () => {
      const isOpen = headerNode.classList.toggle('is-menu-open');
      overlayBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  /** Navega a la vista con el id dado y actualiza botones */
  function navigate(targetId) {
    // 0. Cerrar menú móvil si está abierto
    if (headerNode && headerNode.classList.contains('is-menu-open')) {
      headerNode.classList.remove('is-menu-open');
      if (overlayBtn) overlayBtn.setAttribute('aria-expanded', 'false');
    }

    // 1. Desactivar todas las secciones
    sections.forEach(section => {
      section.classList.remove('is-active');
    });

    // 2. Activar la sección objetivo en el siguiente frame de render
    //    (evita el hack de setTimeout — el navegador aplica el estado
    //    invisible primero y luego anima la transición correctamente)
    requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (target) target.classList.add('is-active');
    });

    // 3. Sincronizar estados de botones de navegación
    navButtons.forEach(btn => {
      const isActive = btn.dataset.target === targetId;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // 4. Log de sistema (útil para debugging y efecto visual en consola)
    console.log(`%c[NAV] → ${targetId}`, 'color: #00c8ff; font-weight: bold;');
  }

  // Conectar eventos de click a los botones de navegación
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) navigate(target);
    });
  });

  // Exponer API pública (otros módulos pueden navegar programáticamente)
  return { navigate };
}
