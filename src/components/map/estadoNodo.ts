/**
 * estadoNodo.ts — regla única del estado de cada nivel en el mapa
 * (bloqueado / activo / completado). La usan el mapa lineal (Covalto) y la
 * órbita (Espacial). Lógica pura.
 */
import type { Level } from '@/data/types'

/** Estado visual de un nivel en el mapa */
export type EstadoNodo = 'bloqueado' | 'activo' | 'completado'

/**
 * Resuelve el estado de un nivel a partir del progreso del explorador.
 * @param nivel nivel a evaluar
 * @param nivelActual nivel en curso del explorador (1–6)
 * @param sellosObtenidos ids de nivel con sello
 */
export function calcularEstado(nivel: Level, nivelActual: number, sellosObtenidos: number[]): EstadoNodo {
  if (sellosObtenidos.includes(nivel.id)) return 'completado'
  if (nivel.id === nivelActual) return 'activo'
  if (nivel.id < nivelActual) return 'completado' // por si el sello no se registró aún
  return 'bloqueado'
}

/**
 * Indica si se puede entrar al nivel (todo menos bloqueado).
 * @param estado estado del nivel
 */
export function esEnterable(estado: EstadoNodo): boolean {
  return estado !== 'bloqueado'
}
