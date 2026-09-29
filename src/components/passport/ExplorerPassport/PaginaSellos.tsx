/**
 * PaginaSellos.tsx — página derecha del pasaporte: un sello de misión por
 * nivel y un mensaje según cuántos se han obtenido.
 */
import { getLevels } from '@/data/dataService'
import { useExplorer } from '@/state/explorerContext'
import { MissionStamp } from '../MissionStamp'

/** Sellos de misión de los 6 niveles */
export function PaginaSellos() {
  const {
    estado: { sellosObtenidos },
  } = useExplorer()
  const completa = sellosObtenidos.length >= 6

  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Sellos de misión</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {getLevels().map((nivel) => (
          <MissionStamp key={nivel.id} nivel={nivel} obtenido={sellosObtenidos.includes(nivel.id)} />
        ))}
      </div>
      <p className="mt-4 text-xs text-text-muted">
        {completa
          ? '¡Trayectoria completa! Eres un referente Experto IA.'
          : 'Sigue completando misiones para convertirte en Experto IA.'}
      </p>
    </div>
  )
}
