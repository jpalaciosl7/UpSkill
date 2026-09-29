/**
 * sombrasEstrellas.ts — convierte estrellas en un `box-shadow` CSS: toda una
 * capa del cielo se pinta con UN solo elemento (barato para el navegador).
 * Lógica pura.
 */
import { TONOS_ESTRELLA, type Estrella } from './generarEstrellas'

/**
 * Una sombra por estrella, y cada estrella repetida una pantalla más abajo
 * para que la deriva vertical (translateY −100vh) se repita sin cortes.
 * @param estrellas estrellas de la capa (posiciones en % de la pantalla)
 * @returns valor listo para la propiedad `box-shadow`
 */
export function sombrasEstrellas(estrellas: Estrella[]): string {
  const sombra = ({ x, y, tamano, brillo, tono }: Estrella, desplazamientoVh: number) =>
    `${x}vw ${y + desplazamientoVh}vh 0 ${(tamano - 1) / 2}px rgba(${TONOS_ESTRELLA[tono]}, ${brillo})`
  return estrellas.flatMap((estrella) => [sombra(estrella, 0), sombra(estrella, 100)]).join(', ')
}
