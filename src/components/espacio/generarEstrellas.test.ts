/**
 * generarEstrellas.test.ts — el cielo es determinista, respeta sus límites y
 * se puede repetir sin cortes.
 */
import { describe, expect, it } from 'vitest'
import { TONOS_ESTRELLA, aleatorioConSemilla, generarEstrellas } from './generarEstrellas'
import { sombrasEstrellas } from './sombrasEstrellas'

describe('generarEstrellas', () => {
  it('misma semilla → mismas estrellas; otra semilla → otro cielo', () => {
    expect(generarEstrellas(20, 7, 3)).toEqual(generarEstrellas(20, 7, 3))
    expect(generarEstrellas(20, 8, 3)).not.toEqual(generarEstrellas(20, 7, 3))
  })

  it('respeta cantidad, posiciones (0–100 %), tamaño, brillo y tono', () => {
    const estrellas = generarEstrellas(200, 42, 3)
    expect(estrellas).toHaveLength(200)
    for (const { x, y, tamano, brillo, tono } of estrellas) {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x).toBeLessThanOrEqual(100)
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(100)
      expect(tamano).toBeGreaterThanOrEqual(1)
      expect(tamano).toBeLessThanOrEqual(3)
      expect(brillo).toBeGreaterThanOrEqual(0.35)
      expect(brillo).toBeLessThanOrEqual(1)
      expect(tono).toBeLessThan(TONOS_ESTRELLA.length)
    }
  })

  it('el generador con semilla produce números en [0, 1)', () => {
    const aleatorio = aleatorioConSemilla(123)
    const valores = Array.from({ length: 100 }, aleatorio)
    expect(valores.every((v) => v >= 0 && v < 1)).toBe(true)
  })
})

describe('sombrasEstrellas', () => {
  it('pinta cada estrella dos veces (una pantalla más abajo) para repetir sin cortes', () => {
    const sombras = sombrasEstrellas([{ x: 10, y: 20, tamano: 2, brillo: 0.5, tono: 0 }])
    expect(sombras).toBe('10vw 20vh 0 0.5px rgba(255, 255, 255, 0.5), 10vw 120vh 0 0.5px rgba(255, 255, 255, 0.5)')
  })
})
