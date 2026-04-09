/**
 * @file typewriter.js
 * @description Efecto typewriter tipo terminal.
 *   MEJORAS vs versión anterior:
 *   - Cancelable: retorna handle con método .cancel()
 *   - RAF-based (no setInterval — más eficiente y sincronizado con repaint)
 *   - Soporte para cursor parpadeante externo
 *   - Manejo de errores si el elemento no existe
 */

export class Typewriter {
  /**
   * @param {HTMLElement} element  - Elemento donde se escribe el texto
   * @param {object}      options
   * @param {number}      [options.speed=20]    - ms entre cada caracter
   * @param {HTMLElement} [options.cursorEl]    - Elemento cursor (opcional)
   */
  constructor(element, options = {}) {
    if (!element) {
      console.warn('[Typewriter] Elemento no encontrado. Abortando.');
      return;
    }

    this.el       = element;
    this.speed    = options.speed ?? 20;
    this.cursorEl = options.cursorEl ?? null;
    this._rafId   = null;
    this._active  = false;
  }

  /**
   * Inicia el efecto de escritura con el texto dado.
   * @param {string} text
   * @returns {this} Para encadenamiento
   */
  type(text) {
    if (!this.el) return this;

    this.cancel(); // Cancelar escritura anterior si la hay

    this.el.textContent = '';
    this._active = true;

    let index = 0;
    let lastTime = 0;

    if (this.cursorEl) this.cursorEl.style.display = 'inline';

    const step = (timestamp) => {
      if (!this._active) return;

      // Control de velocidad via RAF (sin setInterval)
      if (timestamp - lastTime >= this.speed) {
        if (index < text.length) {
          this.el.textContent += text[index];
          index++;
          lastTime = timestamp;
        } else {
          // Escritura completa — ocultar cursor si fue externo
          this._active = false;
          if (this.cursorEl) {
            // El cursor sigue parpadeando, simplemente ya no "tipa"
          }
          return;
        }
      }

      this._rafId = requestAnimationFrame(step);
    };

    this._rafId = requestAnimationFrame(step);
    return this;
  }

  /** Cancela la escritura en curso */
  cancel() {
    this._active = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }
}
