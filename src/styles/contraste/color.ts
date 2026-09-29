/**
 * color.ts — interpretar colores CSS (#rgb, #rrggbb, rgb(), rgba()) y
 * componer un color translúcido sobre un fondo opaco.
 */

/** Color RGB con alfa; r, g, b en 0–255 y a en 0–1 */
export interface ColorRgba {
  r: number
  g: number
  b: number
  a: number
}

/**
 * Interpreta un color CSS en hexadecimal o rgb()/rgba().
 * @throws Error si el formato no es soportado
 */
export function leerColor(valor: string): ColorRgba {
  const texto = valor.trim().toLowerCase()
  const hex = texto.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/)
  if (hex) {
    const digitos = hex[1].length === 3 ? [...hex[1]].map((d) => d + d).join('') : hex[1]
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(digitos.slice(i, i + 2), 16))
    return { r, g, b, a: 1 }
  }
  const funcional = texto.match(/^rgba?\(([^)]+)\)$/)
  if (funcional) {
    const [r, g, b, a = 1] = funcional[1].split(',').map((parte) => parseFloat(parte))
    return { r, g, b, a }
  }
  throw new Error(`Color no soportado: ${valor}`)
}

/**
 * Compone un color (posiblemente translúcido) sobre un fondo opaco, como lo
 * vería el ojo en pantalla.
 * @param color color de delante
 * @param fondo color opaco de detrás
 */
export function componerSobre(color: ColorRgba, fondo: ColorRgba): ColorRgba {
  const mezclar = (de: number, sobre: number) => Math.round(de * color.a + sobre * (1 - color.a))
  return { r: mezclar(color.r, fondo.r), g: mezclar(color.g, fondo.g), b: mezclar(color.b, fondo.b), a: 1 }
}
