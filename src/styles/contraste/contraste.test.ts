/**
 * contraste.test.ts — los dos temas cumplen el contrato de accesibilidad
 * (PARES_TEMA) leyendo sus archivos de tokens reales. Si cambias un color y
 * esta prueba falla, el cambio deja texto o bordes ilegibles.
 */
/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { componerSobre, leerColor } from './color'
import { PARES_TEMA } from './paresTema'
import { leerTokensColor } from './tokensCss'
import { relacionContraste } from './wcag'

/** Contenido real de un archivo de tokens (Vitest vacía los `?raw` de CSS) */
const leerTokensDe = (tema: string) => readFileSync(new URL(`../tokens/${tema}.css`, import.meta.url), 'utf8')

const TEMAS = { covalto: leerTokensDe('covalto'), espacial: leerTokensDe('espacial') }

/**
 * Contraste de un par dentro de un tema; los colores translúcidos se componen
 * primero sobre el fondo de página (`bg`), como se ven en pantalla.
 */
function contrasteDe(tokens: Record<string, string>, frente: string, fondo: string): number {
  const pagina = leerColor(tokens.bg)
  const opaco = (nombre: string) => componerSobre(leerColor(tokens[nombre]), pagina)
  const fondoOpaco = opaco(fondo)
  return relacionContraste(componerSobre(leerColor(tokens[frente]), fondoOpaco), fondoOpaco)
}

for (const [tema, css] of Object.entries(TEMAS)) {
  describe(`contraste del tema ${tema}`, () => {
    const tokens = leerTokensColor(css)

    it.each(PARES_TEMA)('$uso ($frente / $fondo) ≥ $minimo', ({ frente, fondo, minimo }) => {
      expect(tokens[frente], `falta el token --color-${frente}`).toBeDefined()
      expect(tokens[fondo], `falta el token --color-${fondo}`).toBeDefined()
      expect(contrasteDe(tokens, frente, fondo)).toBeGreaterThanOrEqual(minimo)
    })
  })
}

describe('utilidades de color', () => {
  it('lee hex corto, largo y rgba, y compone la transparencia', () => {
    expect(leerColor('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(leerColor('rgba(0, 0, 0, 0.5)')).toEqual({ r: 0, g: 0, b: 0, a: 0.5 })
    expect(componerSobre(leerColor('rgba(0,0,0,0.5)'), leerColor('#ffffff'))).toEqual({ r: 128, g: 128, b: 128, a: 1 })
    expect(relacionContraste(leerColor('#000'), leerColor('#fff'))).toBeCloseTo(21, 0)
  })

  it('resuelve referencias var() entre tokens', () => {
    const tokens = leerTokensColor(':root { --color-a: #123456; --color-b: var(--color-a); }')
    expect(tokens.b).toBe('#123456')
  })
})
