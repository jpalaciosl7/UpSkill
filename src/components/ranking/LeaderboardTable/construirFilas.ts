/**
 * construirFilas.ts — convierte los datos del Ranking (reales o mock) en
 * filas listas para mostrar. Lógica pura, sin React ni red.
 */
import type { FilaRankingDB } from '@/backend/types'
import type { RankingEntry } from '@/data/types'
import type { ExplorerState } from '@/state/types'
import { nombreFilaLocal, nombreVisibleEnRanking } from '../nombreRanking'
import type { FilaRanking } from './tipos'

/**
 * Filas del Ranking real (función `ranking_exploradores`), en el orden que
 * devuelve la BD.
 * @param filas filas públicas (id, alias, xp, rango)
 * @param idPropio id de la fila del explorador actual, para marcar "(tú)"
 */
export function construirFilasReales(filas: FilaRankingDB[], idPropio: string | null): FilaRanking[] {
  return filas.map((fila) => ({
    id: fila.id,
    nombreMostrado: nombreVisibleEnRanking(fila.alias),
    xp: fila.xp_total,
    rango: fila.rango,
    esUsuarioActual: idPropio !== null && fila.id === idPropio,
  }))
}

/**
 * Filas del Ranking de demostración: el mock más el explorador local,
 * ordenadas por XP descendente.
 * @param mock ranking ficticio de src/data
 * @param estado estado del explorador que está viendo
 */
export function construirFilasDemo(mock: RankingEntry[], estado: ExplorerState): FilaRanking[] {
  const propias: FilaRanking = {
    id: 'yo',
    nombreMostrado: nombreFilaLocal(estado),
    xp: estado.xpTotal,
    rango: estado.rango,
    esUsuarioActual: true,
  }
  const ajenas = mock.map((r) => ({ id: r.id, nombreMostrado: r.nombre, xp: r.xp, rango: r.rango, esUsuarioActual: false }))
  return [...ajenas, propias].sort((a, b) => b.xp - a.xp)
}
