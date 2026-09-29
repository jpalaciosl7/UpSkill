/**
 * geometriaOrbita.test.ts — geometría y navegación de la órbita de 6 planetas.
 */
import { describe, expect, it } from 'vitest'
import { estadoInicialOrbita, reducirOrbita } from './estadoOrbita'
import { anguloPlaneta, cercania, indiceCiclico, rotacionHacia } from './geometriaOrbita'

const TOTAL = 6

describe('geometriaOrbita', () => {
  it('reparte los planetas cada 60°', () => {
    expect([0, 1, 2, 5].map((i) => anguloPlaneta(i, TOTAL))).toEqual([0, 60, 120, 300])
  })

  it('gira por el camino más corto, acumulando vueltas', () => {
    expect(rotacionHacia(0, 1, TOTAL)).toBe(-60)
    expect(rotacionHacia(0, 5, TOTAL)).toBe(60) // del 1 al 6: un paso hacia atrás, no cinco
    expect(rotacionHacia(-300, 0, TOTAL)).toBe(-360) // del 6 al 1: sigue avanzando
  })

  it('el planeta enfocado queda al frente (cercanía 1) y el opuesto al fondo (0)', () => {
    const rotacion = rotacionHacia(0, 2, TOTAL)
    expect(cercania(2, TOTAL, rotacion)).toBe(1)
    expect(cercania(5, TOTAL, rotacion)).toBe(0)
    expect(cercania(1, TOTAL, rotacion)).toBe(0.75)
  })

  it('los índices dan la vuelta en ambos sentidos', () => {
    expect(indiceCiclico(5, 1, TOTAL)).toBe(0)
    expect(indiceCiclico(0, -1, TOTAL)).toBe(5)
  })
})

describe('estadoOrbita', () => {
  it('arranca con el nivel actual al frente', () => {
    const inicial = estadoInicialOrbita(2, TOTAL)
    expect(inicial.enfocado).toBe(2)
    expect(cercania(2, TOTAL, inicial.rotacion)).toBe(1)
  })

  it('siguiente/anterior dan la vuelta y "ir" al mismo planeta no cambia nada', () => {
    let estado = estadoInicialOrbita(5, TOTAL)
    estado = reducirOrbita(estado, { tipo: 'siguiente' }, TOTAL)
    expect(estado.enfocado).toBe(0)
    estado = reducirOrbita(estado, { tipo: 'anterior' }, TOTAL)
    expect(estado.enfocado).toBe(5)
    expect(reducirOrbita(estado, { tipo: 'ir', indice: 5 }, TOTAL)).toBe(estado)
  })

  it('al avanzar siempre gira en el mismo sentido (sin rebobinar)', () => {
    const inicial = estadoInicialOrbita(5, TOTAL)
    const despues = reducirOrbita(inicial, { tipo: 'siguiente' }, TOTAL)
    expect(despues.rotacion).toBe(inicial.rotacion - 60)
  })
})
