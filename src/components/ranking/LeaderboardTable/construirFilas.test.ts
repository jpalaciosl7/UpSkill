/**
 * construirFilas.test.ts — filas del Ranking real y de demostración (datos ficticios).
 */
import { describe, expect, it } from 'vitest'
import { ESTADO_INICIAL } from '@/state/explorerReducer'
import { ETIQUETA_SIN_ALIAS } from '../nombreRanking'
import { construirFilasDemo, construirFilasReales } from './construirFilas'

describe('construirFilasReales', () => {
  it('usa alias o la etiqueta anónima y marca solo la fila propia', () => {
    const filas = construirFilasReales(
      [
        { id: 'a', alias: 'Orbita', xp_total: 500, rango: 'Explorador' },
        { id: 'b', alias: null, xp_total: 300, rango: 'Novato' },
      ],
      'b',
    )
    expect(filas.map((f) => f.nombreMostrado)).toEqual(['Orbita', ETIQUETA_SIN_ALIAS])
    expect(filas.map((f) => f.esUsuarioActual)).toEqual([false, true])
  })

  it('sin fila propia conocida no marca a nadie', () => {
    const filas = construirFilasReales([{ id: 'a', alias: 'Orbita', xp_total: 500, rango: 'Explorador' }], null)
    expect(filas[0].esUsuarioActual).toBe(false)
  })
})

describe('construirFilasDemo', () => {
  it('inserta al explorador local en su posición por XP', () => {
    const mock = [
      { id: 'm1', nombre: 'Nova', xp: 2000, rango: 'Avanzado' as const, avatarSeed: 'n' },
      { id: 'm2', nombre: 'Luna', xp: 100, rango: 'Novato' as const, avatarSeed: 'l' },
    ]
    const filas = construirFilasDemo(mock, { ...ESTADO_INICIAL, xpTotal: 820 })
    expect(filas.map((f) => f.id)).toEqual(['m1', 'yo', 'm2'])
    expect(filas[1]).toMatchObject({ esUsuarioActual: true, xp: 820 })
  })
})
