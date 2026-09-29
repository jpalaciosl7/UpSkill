/**
 * AvisoSello.tsx — aviso al obtener el sello del nivel: siguiente nivel
 * desbloqueado, o trayectoria completa en el último.
 */
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { NOMBRE_EXPERIENCIA } from '@/config/branding'
import type { Level } from '@/data/types'
import { NIVEL_MAXIMO } from './useCompletarModulo'

/**
 * Aviso con acceso al mapa (o al pasaporte si se completó la ruta).
 * @param nivel nivel cuyo sello se acaba de obtener
 */
export function AvisoSello({ nivel }: { nivel: Level }) {
  const navigate = useNavigate()
  const hayMas = nivel.id < NIVEL_MAXIMO

  return (
    <div role="status" className="flex items-center justify-between gap-3 rounded-card bg-accent/15 px-5 py-4 text-sm">
      <span className="flex items-center gap-2 font-semibold text-primary">
        <Icon name="workspace_premium" />
        {hayMas
          ? `¡Sello de ${nivel.nombre} obtenido! Desbloqueaste el siguiente nivel.`
          : `¡Sello de ${nivel.nombre} obtenido! Completaste toda la trayectoria ${NOMBRE_EXPERIENCIA}.`}
      </span>
      <button
        type="button"
        onClick={() => navigate(hayMas ? '/mapa' : '/pasaporte')}
        className="shrink-0 rounded-full bg-primary px-4 py-1.5 font-semibold text-text-on-primary"
      >
        {hayMas ? 'Ver mapa' : 'Ver pasaporte'}
      </button>
    </div>
  )
}
