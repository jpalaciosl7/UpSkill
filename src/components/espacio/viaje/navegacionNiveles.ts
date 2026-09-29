/**
 * navegacionNiveles.ts — a qué planeta se puede viajar desde el nivel actual
 * del curso: el anterior y el siguiente, indicando si están bloqueados.
 * Lógica pura.
 */
import type { Level } from '@/data/types'

/** Un vecino de la trayectoria y si se puede entrar */
export interface Vecino {
  nivel: Level
  bloqueado: boolean
}

/** Planetas vecinos del nivel (null si no hay: primero o último) */
export interface VecinosNivel {
  anterior: Vecino | null
  siguiente: Vecino | null
}

/**
 * Calcula los vecinos navegables de un nivel.
 * @param niveles niveles ordenados de la trayectoria
 * @param nivelId nivel en el que está el explorador
 * @param estaDesbloqueado indica si un nivel se puede abrir (misma regla que la página)
 */
export function vecinosDeNivel(niveles: Level[], nivelId: number, estaDesbloqueado: (nivel: Level) => boolean): VecinosNivel {
  const indice = niveles.findIndex((nivel) => nivel.id === nivelId)
  /** Vecino en una posición, o null fuera de rango / nivel desconocido */
  const vecino = (posicion: number): Vecino | null => {
    const nivel = indice === -1 ? undefined : niveles[posicion]
    return nivel ? { nivel, bloqueado: !estaDesbloqueado(nivel) } : null
  }
  return { anterior: vecino(indice - 1), siguiente: vecino(indice + 1) }
}

/**
 * Regla de acceso a un nivel en la página de detalle: con sello, o igual o
 * anterior al nivel actual.
 * @param nivelActual nivel en curso del explorador
 * @param sellosObtenidos ids con sello
 */
export function reglaDesbloqueo(nivelActual: number, sellosObtenidos: number[]) {
  return (nivel: Level) => sellosObtenidos.includes(nivel.id) || nivel.id <= nivelActual
}
