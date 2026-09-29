/**
 * nombreRanking.ts — qué nombre se muestra en el Ranking (guardrail §9).
 *
 * El Ranking es público dentro de la demo: de un explorador real solo se
 * muestra su alias. Sin alias aparece como ETIQUETA_SIN_ALIAS, nunca con su
 * nombre real. En modo local/demo (sin correo) el nombre es el mock ficticio
 * y se puede mostrar tal cual.
 */
import type { ExplorerState } from '@/state/types'

export const ETIQUETA_SIN_ALIAS = 'Explorador anónimo'

/** Nombre público de un explorador real: su alias, o la etiqueta anónima */
export function nombreVisibleEnRanking(alias: string | null): string {
  const limpio = alias?.trim()
  return limpio ? limpio : ETIQUETA_SIN_ALIAS
}

/** Nombre de la fila del explorador actual en el ranking mock */
export function nombreFilaLocal(estado: Pick<ExplorerState, 'nombre' | 'alias' | 'correo'>): string {
  return estado.correo ? nombreVisibleEnRanking(estado.alias) : estado.nombre
}
