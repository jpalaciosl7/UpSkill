/**
 * LeaderboardTable.tsx — Ranking por XP (pantalla 7). Con sesión y datos
 * reales muestra el ranking de la BD (solo alias o "Explorador anónimo");
 * si no, el ranking mock con el explorador local insertado.
 */
import { Icon } from '@/components/ui/Icon'
import { getRanking } from '@/data/dataService'
import { useExplorer } from '@/state/explorerContext'
import { construirFilasDemo, construirFilasReales } from './construirFilas'
import { COLUMNAS_RANKING, FilaDeRanking } from './FilaDeRanking'
import { useRankingReal } from './useRankingReal'

/** Orquesta el Ranking: decide la fuente de datos y pinta la tabla */
export function LeaderboardTable() {
  const { estado, sesion } = useExplorer()
  const real = useRankingReal(sesion?.userId ?? null)
  const hayDatosReales = real.filas.length > 0
  const filas = hayDatosReales ? construirFilasReales(real.filas, real.idPropio) : construirFilasDemo(getRanking(), estado)

  if (real.cargando) {
    return (
      <div className="rounded-card border border-border bg-surface p-8 text-center text-sm text-text-muted shadow-card">
        Cargando ranking…
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
        <Icon name={hayDatosReales ? 'database' : 'science'} className="text-[14px]" />
        {hayDatosReales ? 'Ranking real, desde la base de datos' : 'Ranking de demostración (datos mock)'}
      </p>
      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <div
          className={`${COLUMNAS_RANKING} border-b border-border bg-surface-beige px-4 py-2 text-xs font-semibold uppercase tracking-wide text-text-muted`}
        >
          <span>#</span>
          <span>Explorador</span>
          <span className="text-right">Rango</span>
          <span className="text-right">XP</span>
        </div>
        {filas.map((fila, indice) => (
          <FilaDeRanking key={fila.id} fila={fila} posicion={indice + 1} />
        ))}
      </div>
    </div>
  )
}
