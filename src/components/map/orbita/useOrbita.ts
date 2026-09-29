/**
 * useOrbita.ts — navegación de la órbita: qué planeta está enfocado, cuánto
 * gira el anillo, y controles por botón, clic y teclado (← →, Inicio, Fin).
 */
import { useReducer, type KeyboardEvent } from 'react'
import { estadoInicialOrbita, reducirOrbita, type AccionOrbita, type EstadoOrbita } from './estadoOrbita'

/** Estado y acciones de la órbita para los componentes */
export interface Orbita extends EstadoOrbita {
  irA: (indice: number) => void
  siguiente: () => void
  anterior: () => void
  /** Manejador de teclado para el contenedor de la órbita */
  alPresionarTecla: (evento: KeyboardEvent) => void
}

/**
 * Maneja la órbita de `total` planetas.
 * @param total cantidad de planetas
 * @param inicial índice enfocado al entrar (el nivel actual)
 */
export function useOrbita(total: number, inicial: number): Orbita {
  const [estado, despachar] = useReducer(
    (actual: EstadoOrbita, accion: AccionOrbita) => reducirOrbita(actual, accion, total),
    undefined,
    () => estadoInicialOrbita(inicial, total),
  )

  /** Teclas: flechas navegan; Inicio/Fin saltan al primer/último planeta */
  const alPresionarTecla = (evento: KeyboardEvent) => {
    const acciones: Record<string, AccionOrbita> = {
      ArrowRight: { tipo: 'siguiente' },
      ArrowLeft: { tipo: 'anterior' },
      Home: { tipo: 'ir', indice: 0 },
      End: { tipo: 'ir', indice: total - 1 },
    }
    const accion = acciones[evento.key]
    if (!accion) return
    evento.preventDefault()
    despachar(accion)
  }

  return {
    ...estado,
    irA: (indice) => despachar({ tipo: 'ir', indice }),
    siguiente: () => despachar({ tipo: 'siguiente' }),
    anterior: () => despachar({ tipo: 'anterior' }),
    alPresionarTecla,
  }
}
