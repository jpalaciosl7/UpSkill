/**
 * explorerReducer.test.ts — pruebas de comportamiento del reducer del explorador.
 * Cubre las reglas de gamificación de CLAUDE.md §3/§5: completar módulos otorga
 * XP/monedas sin doble conteo, cerrar un nivel da sello y desbloquea el siguiente,
 * el nivel máximo no avanza, y canjear recompensas respeta saldo y unicidad.
 */
import { describe, expect, it } from 'vitest'
import { ESTADO_INICIAL, explorerReducer } from './explorerReducer'
import type { ExplorerState } from './types'

const base: ExplorerState = { ...ESTADO_INICIAL, modulosCompletados: [], sellosObtenidos: [] }

describe('COMPLETAR_MODULO', () => {
  it('suma XP y monedas y registra el módulo', () => {
    const estado = explorerReducer(base, { type: 'COMPLETAR_MODULO', moduloId: '2-1', xp: 50, monedas: 10 })
    expect(estado.xpTotal).toBe(base.xpTotal + 50)
    expect(estado.xpNivelActual).toBe(base.xpNivelActual + 50)
    expect(estado.monedas).toBe(base.monedas + 10)
    expect(estado.modulosCompletados).toEqual(['2-1'])
  })

  it('no cuenta dos veces el mismo módulo', () => {
    const accion = { type: 'COMPLETAR_MODULO', moduloId: '2-1', xp: 50, monedas: 10 } as const
    const unaVez = explorerReducer(base, accion)
    expect(explorerReducer(unaVez, accion)).toBe(unaVez)
  })

  it('al cerrar el nivel otorga el sello y avanza al siguiente con la barra en cero', () => {
    const estado = explorerReducer(
      { ...base, nivelActual: 2 },
      {
        type: 'COMPLETAR_MODULO',
        moduloId: '2-4',
        xp: 100,
        monedas: 25,
        completaNivel: { nivelId: 2, siguienteNivelId: 3, siguienteXpObjetivo: 550 },
      },
    )
    expect(estado.sellosObtenidos).toContain(2)
    expect(estado.nivelActual).toBe(3)
    expect(estado.xpNivelActual).toBe(0)
    expect(estado.xpNivelObjetivo).toBe(550)
  })

  it('en el nivel máximo otorga el sello sin avanzar ni reiniciar la barra', () => {
    const previo = { ...base, nivelActual: 6, xpNivelActual: 800, xpNivelObjetivo: 980 }
    const estado = explorerReducer(previo, {
      type: 'COMPLETAR_MODULO',
      moduloId: '6-4',
      xp: 180,
      monedas: 40,
      completaNivel: { nivelId: 6, siguienteNivelId: 6, siguienteXpObjetivo: 980 },
    })
    expect(estado.sellosObtenidos).toContain(6)
    expect(estado.nivelActual).toBe(6)
    expect(estado.xpNivelActual).toBe(980)
  })
})

describe('CANJEAR_RECOMPENSA', () => {
  it('descuenta monedas y registra el canje', () => {
    const estado = explorerReducer({ ...base, monedas: 100 }, { type: 'CANJEAR_RECOMPENSA', recompensaId: 'r1', costoMonedas: 60 })
    expect(estado.monedas).toBe(40)
    expect(estado.recompensasCanjeadas).toEqual(['r1'])
  })

  it('rechaza el canje sin saldo suficiente o si ya se canjeó', () => {
    const sinSaldo = { ...base, monedas: 10 }
    expect(explorerReducer(sinSaldo, { type: 'CANJEAR_RECOMPENSA', recompensaId: 'r1', costoMonedas: 60 })).toBe(sinSaldo)
    const yaCanjeada = { ...base, monedas: 500, recompensasCanjeadas: ['r1'] }
    expect(explorerReducer(yaCanjeada, { type: 'CANJEAR_RECOMPENSA', recompensaId: 'r1', costoMonedas: 60 })).toBe(yaCanjeada)
  })
})

describe('COMPLETAR_EVALUACION', () => {
  const accion = {
    type: 'COMPLETAR_EVALUACION',
    rango: 'Avanzado',
    respuestas: { d1: 4 },
    nivelSugerido: 3,
    xpObjetivoNivelSugerido: 550,
  } as const

  it('reposiciona al nivel sugerido si no hay progreso previo', () => {
    const estado = explorerReducer(base, accion)
    expect(estado.rango).toBe('Avanzado')
    expect(estado.evaluacionCompletada).toBe(true)
    expect(estado.nivelActual).toBe(3)
  })

  it('nunca quita progreso real ya hecho', () => {
    const conProgreso = { ...base, nivelActual: 2, modulosCompletados: ['2-1'] }
    const estado = explorerReducer(conProgreso, accion)
    expect(estado.rango).toBe('Avanzado')
    expect(estado.nivelActual).toBe(2)
  })
})

describe('REINICIAR_PROGRESO', () => {
  it('en modo local vuelve al estado inicial de demo', () => {
    expect(explorerReducer({ ...base, monedas: 999 }, { type: 'REINICIAR_PROGRESO' })).toBe(ESTADO_INICIAL)
  })

  it('identificado conserva la identidad y deja el progreso en cero', () => {
    const identificado = { ...base, nombre: 'Persona Ficticia', correo: 'ficticia@covalto.com', xpTotal: 500 }
    const estado = explorerReducer(identificado, { type: 'REINICIAR_PROGRESO' })
    expect(estado.correo).toBe('ficticia@covalto.com')
    expect(estado.nombre).toBe('Persona Ficticia')
    expect(estado.xpTotal).toBe(0)
    expect(estado.nivelActual).toBe(1)
  })
})
