/**
 * estadoNodo.test.ts — estado de cada nivel en el mapa.
 */
import { describe, expect, it } from 'vitest'
import type { Level } from '@/data/types'
import { calcularEstado, esEnterable } from './estadoNodo'

/** Nivel mínimo para la prueba */
const nivel = (id: number) => ({ id }) as Level

describe('calcularEstado', () => {
  it('con sello → completado, aunque sea el nivel actual', () => {
    expect(calcularEstado(nivel(2), 2, [2])).toBe('completado')
  })

  it('nivel actual sin sello → activo; anteriores → completado; posteriores → bloqueado', () => {
    expect(calcularEstado(nivel(3), 3, [1, 2])).toBe('activo')
    expect(calcularEstado(nivel(1), 3, [])).toBe('completado')
    expect(calcularEstado(nivel(4), 3, [1, 2])).toBe('bloqueado')
  })

  it('solo los bloqueados no son enterables', () => {
    expect(esEnterable('bloqueado')).toBe(false)
    expect(esEnterable('activo')).toBe(true)
    expect(esEnterable('completado')).toBe(true)
  })
})
