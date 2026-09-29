/**
 * almacenamiento.test.ts — el tema se recuerda y, ante cualquier fallo, la app
 * arranca con el tema por defecto.
 */
import { describe, expect, it } from 'vitest'
import { guardarTema, leerTemaGuardado } from './almacenamiento'
import { CLAVE_TEMA, TEMA_POR_DEFECTO, esTema, temaSiguiente } from './tipos'

/** Almacén en memoria con la forma mínima de localStorage */
function almacenEnMemoria(inicial: Record<string, string> = {}) {
  const datos = new Map(Object.entries(inicial))
  return {
    getItem: (clave: string) => datos.get(clave) ?? null,
    setItem: (clave: string, valor: string) => void datos.set(clave, valor),
  }
}

/** Almacén que lanza en todo (modo privado / bloqueado) */
const almacenRoto = {
  getItem: () => {
    throw new Error('bloqueado')
  },
  setItem: () => {
    throw new Error('bloqueado')
  },
}

describe('almacenamiento del tema', () => {
  it('lee el tema guardado y lo vuelve a guardar', () => {
    const almacen = almacenEnMemoria()
    guardarTema('espacial', almacen)
    expect(leerTemaGuardado(almacen)).toBe('espacial')
  })

  it('valor inválido, ausente o almacén inexistente → tema por defecto', () => {
    expect(leerTemaGuardado(almacenEnMemoria({ [CLAVE_TEMA]: 'neon' }))).toBe(TEMA_POR_DEFECTO)
    expect(leerTemaGuardado(almacenEnMemoria())).toBe(TEMA_POR_DEFECTO)
    expect(leerTemaGuardado(null)).toBe(TEMA_POR_DEFECTO)
  })

  it('un almacén que falla no rompe ni la lectura ni la escritura', () => {
    expect(leerTemaGuardado(almacenRoto)).toBe(TEMA_POR_DEFECTO)
    expect(() => guardarTema('espacial', almacenRoto)).not.toThrow()
  })
})

describe('dominio de temas', () => {
  it('reconoce solo temas válidos y alterna en ciclo', () => {
    expect(esTema('covalto')).toBe(true)
    expect(esTema('otro')).toBe(false)
    expect(temaSiguiente('covalto')).toBe('espacial')
    expect(temaSiguiente('espacial')).toBe('covalto')
  })
})
