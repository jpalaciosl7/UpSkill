/**
 * wcag.ts — cálculo de contraste según WCAG 2.x (luminancia relativa y
 * relación de contraste). Mínimos: 4.5 texto normal, 3 texto grande y
 * elementos gráficos (bordes de campos, íconos, nodos).
 */
import type { ColorRgba } from './color'

/** Mínimo de contraste para texto normal */
export const MINIMO_TEXTO = 4.5

/** Mínimo de contraste para elementos gráficos y texto grande */
export const MINIMO_GRAFICO = 3

/**
 * Luminancia relativa de un color opaco (0 negro – 1 blanco).
 * @param color color con a = 1
 */
export function luminancia({ r, g, b }: ColorRgba): number {
  const canal = (valor: number) => {
    const c = valor / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
}

/**
 * Relación de contraste entre dos colores opacos (1 a 21).
 * @param a primer color
 * @param b segundo color
 */
export function relacionContraste(a: ColorRgba, b: ColorRgba): number {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (claro + 0.05) / (oscuro + 0.05)
}
