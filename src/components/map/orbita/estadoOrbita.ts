/**
 * estadoOrbita.ts — estado de la órbita (planeta enfocado y rotación del
 * anillo) y sus transiciones. Reducer puro: lo usa useOrbita y se prueba sin React.
 */
import { indiceCiclico, rotacionHacia } from './geometriaOrbita'

/** Planeta enfocado y rotación acumulada del anillo (grados) */
export interface EstadoOrbita {
  enfocado: number
  rotacion: number
}

/** Acciones de navegación de la órbita */
export type AccionOrbita = { tipo: 'ir'; indice: number } | { tipo: 'siguiente' } | { tipo: 'anterior' }

/**
 * Estado inicial con un planeta ya al frente.
 * @param enfocado índice a enfocar al entrar (el nivel actual)
 * @param total cantidad de planetas
 */
export function estadoInicialOrbita(enfocado: number, total: number): EstadoOrbita {
  return { enfocado, rotacion: rotacionHacia(0, enfocado, total) }
}

/**
 * Aplica una acción: enfoca un planeta y gira el anillo por el camino más corto.
 * @param total cantidad de planetas
 */
export function reducirOrbita(estado: EstadoOrbita, accion: AccionOrbita, total: number): EstadoOrbita {
  const objetivo =
    accion.tipo === 'ir'
      ? indiceCiclico(accion.indice, 0, total)
      : indiceCiclico(estado.enfocado, accion.tipo === 'siguiente' ? 1 : -1, total)
  if (objetivo === estado.enfocado) return estado
  return { enfocado: objetivo, rotacion: rotacionHacia(estado.rotacion, objetivo, total) }
}
