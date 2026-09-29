/**
 * nombreRanking.test.ts — el Ranking nunca muestra el nombre real de un
 * explorador identificado (datos de prueba ficticios).
 */
import { describe, expect, it } from 'vitest'
import { ETIQUETA_SIN_ALIAS, nombreFilaLocal, nombreVisibleEnRanking } from './nombreRanking'

describe('nombreVisibleEnRanking', () => {
  it('muestra el alias, recortado', () => {
    expect(nombreVisibleEnRanking('  NovaExplorador ')).toBe('NovaExplorador')
  })

  it('sin alias (null, vacío o solo espacios) muestra la etiqueta anónima', () => {
    expect(nombreVisibleEnRanking(null)).toBe(ETIQUETA_SIN_ALIAS)
    expect(nombreVisibleEnRanking('')).toBe(ETIQUETA_SIN_ALIAS)
    expect(nombreVisibleEnRanking('   ')).toBe(ETIQUETA_SIN_ALIAS)
  })
})

describe('nombreFilaLocal', () => {
  it('identificado sin alias: anónimo, nunca el nombre real', () => {
    const nombre = nombreFilaLocal({ nombre: 'Persona Ficticia', alias: null, correo: 'ficticia@covalto.com' })
    expect(nombre).toBe(ETIQUETA_SIN_ALIAS)
  })

  it('identificado con alias: el alias', () => {
    expect(nombreFilaLocal({ nombre: 'Persona Ficticia', alias: 'Orbita', correo: 'ficticia@covalto.com' })).toBe('Orbita')
  })

  it('modo local/demo (sin correo): el nombre mock', () => {
    expect(nombreFilaLocal({ nombre: 'Tu Nombre Aquí', alias: null, correo: null })).toBe('Tu Nombre Aquí')
  })
})
