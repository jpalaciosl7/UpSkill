/**
 * FilaDeRanking.tsx — una fila visual del Ranking: puesto, avatar con
 * inicial, nombre mostrado (con "(tú)" en la propia), rango y XP.
 */
import { PosicionRanking } from './PosicionRanking'
import type { FilaRanking } from './tipos'

/** Columnas compartidas con el encabezado de la tabla */
export const COLUMNAS_RANKING = 'grid grid-cols-[3rem_1fr_6rem_6rem] items-center gap-2'

/**
 * Inicial para el avatar ilustrativo (sin fotos ni datos reales).
 * @param nombre nombre mostrado de la fila
 */
function inicial(nombre: string): string {
  return nombre.trim().charAt(0).toUpperCase()
}

/**
 * Pinta una fila del Ranking.
 * @param fila datos ya preparados por construirFilas
 * @param posicion puesto (1 = primero)
 */
export function FilaDeRanking({ fila, posicion }: { fila: FilaRanking; posicion: number }) {
  return (
    <div
      className={`${COLUMNAS_RANKING} border-b border-border px-4 py-3 text-sm last:border-0 ${
        fila.esUsuarioActual ? 'bg-accent/10 font-semibold' : ''
      }`}
    >
      <PosicionRanking posicion={posicion} />
      <span className="flex items-center gap-2 truncate">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-text-on-primary">
          {inicial(fila.nombreMostrado)}
        </span>
        <span className="truncate">
          {fila.nombreMostrado} {fila.esUsuarioActual && <span className="text-accent-text">(tú)</span>}
        </span>
      </span>
      <span className="text-right text-text-muted">{fila.rango}</span>
      <span className="text-right">{fila.xp.toLocaleString('es-MX')}</span>
    </div>
  )
}
