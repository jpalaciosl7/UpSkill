/**
 * mapping.test.ts — contrato entre el estado del front y la fila `usuarios`.
 * Datos ficticios.
 */
import { describe, expect, it } from 'vitest'
import { estadoAActualizacionUsuario, usuarioDbAEstado } from './mapping'
import { COLUMNAS_ACTUALIZABLES, type UsuarioDB } from './types'

const fila: UsuarioDB = {
  id: 'fila-1',
  user_id: 'uid-1',
  nombre: 'Persona Ficticia',
  alias: 'Orbita',
  correo: 'persona.ficticia@covalto.com',
  rol: 'tecnico',
  rango: 'Explorador',
  nivel_actual: 3,
  xp_total: 900,
  xp_nivel_actual: 120,
  xp_nivel_objetivo: 550,
  monedas: 210,
  racha_dias: 4,
  ultima_actividad: '2026-09-27',
  cursos_completados: ['1-1', '1-2'],
  sellos_obtenidos: [1, 2],
  recompensas_canjeadas: ['r1'],
  evaluacion_completada: true,
  respuestas_evaluacion: { d1: 4 },
  fecha_registro: '2026-09-01T10:00:00Z',
  ultimo_acceso: '2026-09-27T18:00:00Z',
}

describe('mapping fila ↔ estado', () => {
  it('ida y vuelta conserva perfil y progreso', () => {
    const cambios = estadoAActualizacionUsuario(usuarioDbAEstado(fila))
    for (const columna of COLUMNAS_ACTUALIZABLES) {
      expect(cambios[columna]).toEqual(fila[columna])
    }
  })

  it('la actualización solo incluye columnas que authenticated puede modificar (GRANT de 0002)', () => {
    const cambios = estadoAActualizacionUsuario(usuarioDbAEstado(fila))
    expect(Object.keys(cambios).sort()).toEqual([...COLUMNAS_ACTUALIZABLES].sort())
    for (const protegida of ['id', 'user_id', 'correo', 'fecha_registro', 'ultimo_acceso']) {
      expect(cambios).not.toHaveProperty(protegida)
    }
  })

  it('respuestas de evaluación ausentes viajan como null', () => {
    const estado = usuarioDbAEstado({ ...fila, respuestas_evaluacion: null })
    expect(estado.respuestasEvaluacion).toBeUndefined()
    expect(estadoAActualizacionUsuario(estado).respuestas_evaluacion).toBeNull()
  })
})
