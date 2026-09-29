/**
 * generarEstrellas.ts — posiciones de estrellas pseudoaleatorias pero
 * DETERMINISTAS (misma semilla → mismo cielo en cada render y en cada visita).
 * Lógica pura, sin React ni DOM.
 */

/** Una estrella: posición en % de la pantalla, tamaño en px, brillo 0–1 y tono */
export interface Estrella {
  x: number
  y: number
  tamano: number
  brillo: number
  /** Índice en TONOS_ESTRELLA */
  tono: number
}

/** Tonos RGB de las estrellas: blanco, lavanda y azul hielo */
export const TONOS_ESTRELLA = ['255, 255, 255', '221, 214, 254', '186, 230, 253'] as const

/**
 * Generador pseudoaleatorio mulberry32: rápido y repetible a partir de una semilla.
 * @param semilla entero cualquiera
 * @returns función que devuelve números en [0, 1)
 */
export function aleatorioConSemilla(semilla: number): () => number {
  let estado = semilla >>> 0
  return () => {
    estado = (estado + 0x6d2b79f5) >>> 0
    let t = estado
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Genera las estrellas de una capa.
 * @param cantidad cuántas estrellas
 * @param semilla semilla del cielo (cada capa usa la suya)
 * @param tamanoMaximo tamaño máximo en px (el mínimo es 1)
 */
export function generarEstrellas(cantidad: number, semilla: number, tamanoMaximo: number): Estrella[] {
  const aleatorio = aleatorioConSemilla(semilla)
  return Array.from({ length: cantidad }, () => ({
    x: Math.round(aleatorio() * 1000) / 10,
    y: Math.round(aleatorio() * 1000) / 10,
    tamano: Math.round((1 + aleatorio() * (tamanoMaximo - 1)) * 2) / 2,
    brillo: Math.round((0.35 + aleatorio() * 0.65) * 100) / 100,
    tono: Math.floor(aleatorio() * TONOS_ESTRELLA.length),
  }))
}
