/**
 * aplicarTema.ts — refleja el tema en el documento para que los tokens CSS
 * (src/styles/tokens/*.css, selector :root[data-theme]) tomen efecto.
 *
 * index.html hace lo mismo con un script en línea antes del primer render
 * (evita el parpadeo); esta función mantiene el DOM al día al alternar.
 */
import type { Tema } from './tipos'

/**
 * Aplica el tema al elemento raíz: `data-theme` para los tokens y
 * `color-scheme` para que el navegador pinte controles nativos acordes.
 * @param tema tema a aplicar
 * @param raiz elemento raíz (por defecto <html>)
 */
export function aplicarTema(tema: Tema, raiz: HTMLElement = document.documentElement): void {
  raiz.dataset.theme = tema
  raiz.style.colorScheme = tema === 'espacial' ? 'dark' : 'light'
}
