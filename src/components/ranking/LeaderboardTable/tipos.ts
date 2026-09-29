/**
 * tipos.ts — forma de una fila del Ranking ya lista para mostrar.
 */

/** Una fila del Ranking, independiente de si viene de la BD o del mock */
export interface FilaRanking {
  /** Identificador estable para React */
  id: string
  /** Alias, "Explorador anónimo" o nombre mock — nunca el nombre real de otros */
  nombreMostrado: string
  xp: number
  rango: string
  /** true en la fila del explorador que está viendo el Ranking */
  esUsuarioActual: boolean
}
