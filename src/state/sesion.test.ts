/**
 * sesion.test.ts — decisiones sobre la sesión (datos ficticios).
 */
import { describe, expect, it } from 'vitest'
import { ESTADO_INICIAL } from './explorerReducer'
import { debeSincronizar, resolverSesion } from './sesion'
import type { ExplorerState } from './types'

const sesion = { userId: 'uid-1', correo: 'persona.ficticia@covalto.com' }
const identificado: ExplorerState = { ...ESTADO_INICIAL, nombre: 'Persona Ficticia', correo: 'persona.ficticia@covalto.com' }

describe('resolverSesion', () => {
  it('sin sesión desde el modo local no cambia nada', () => {
    expect(resolverSesion(null, null, ESTADO_INICIAL)).toEqual({ tipo: 'sin_sesion', volverAModoLocal: false })
  })

  it('sin sesión con un estado identificado vuelve al modo local', () => {
    expect(resolverSesion(null, null, identificado)).toEqual({ tipo: 'sin_sesion', volverAModoLocal: true })
  })

  it('con sesión y sin fila pide el perfil inicial', () => {
    expect(resolverSesion(sesion, null, ESTADO_INICIAL)).toEqual({ tipo: 'perfil_pendiente' })
  })

  it('con sesión y fila distinta al estado actual pide despachar', () => {
    const resultado = resolverSesion(sesion, identificado, ESTADO_INICIAL)
    expect(resultado).toEqual({ tipo: 'identificado', estado: identificado, cambio: true })
  })

  it('con sesión y fila idéntica al estado actual no despacha (sin ciclo de escritura)', () => {
    const resultado = resolverSesion(sesion, { ...identificado }, identificado)
    expect(resultado).toMatchObject({ tipo: 'identificado', cambio: false })
  })
})

describe('debeSincronizar', () => {
  it('solo cuando el estado en pantalla es el de la cuenta con sesión', () => {
    expect(debeSincronizar(sesion, identificado)).toBe(true)
    expect(debeSincronizar(sesion, { ...identificado, correo: 'PERSONA.FICTICIA@covalto.com' })).toBe(true)
  })

  it('nunca sin sesión, con el mock de demo o con el estado de otra cuenta', () => {
    expect(debeSincronizar(null, identificado)).toBe(false)
    expect(debeSincronizar(sesion, ESTADO_INICIAL)).toBe(false)
    expect(debeSincronizar(sesion, { ...identificado, correo: 'otra.persona@covalto.com' })).toBe(false)
  })
})
