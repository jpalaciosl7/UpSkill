/**
 * navegacionNiveles.test.ts — vecinos del planeta actual y bloqueos.
 */
import { describe, expect, it } from 'vitest'
import type { Level } from '@/data/types'
import { reglaDesbloqueo, vecinosDeNivel } from './navegacionNiveles'

const niveles = [1, 2, 3, 4, 5, 6].map((id) => ({ id, nombre: `N${id}` }) as Level)
const desbloqueado = reglaDesbloqueo(3, [1, 2])

describe('vecinosDeNivel', () => {
  it('en un nivel intermedio da anterior y siguiente, marcando el bloqueado', () => {
    const { anterior, siguiente } = vecinosDeNivel(niveles, 3, desbloqueado)
    expect(anterior).toEqual({ nivel: niveles[1], bloqueado: false })
    expect(siguiente).toEqual({ nivel: niveles[3], bloqueado: true })
  })

  it('el primero no tiene anterior y el último no tiene siguiente', () => {
    expect(vecinosDeNivel(niveles, 1, desbloqueado).anterior).toBeNull()
    expect(vecinosDeNivel(niveles, 6, desbloqueado).siguiente).toBeNull()
  })

  it('un nivel desconocido no tiene vecinos', () => {
    expect(vecinosDeNivel(niveles, 99, desbloqueado)).toEqual({ anterior: null, siguiente: null })
  })
})

describe('reglaDesbloqueo', () => {
  it('abre niveles con sello o hasta el nivel actual', () => {
    const regla = reglaDesbloqueo(2, [5])
    expect([1, 2, 3, 5].map((id) => regla(niveles[id - 1]))).toEqual([true, true, false, true])
  })
})
