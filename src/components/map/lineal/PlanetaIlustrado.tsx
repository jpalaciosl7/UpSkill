/**
 * PlanetaIlustrado.tsx — nodo del tema espacial: el planeta del arte de
 * campaña, atenuado y con candado si está bloqueado.
 */
import { Icon } from '@/components/ui/Icon'
import { PLANETA_POR_NIVEL } from '@/assets/espacial'
import type { EstadoNodo } from '../estadoNodo'
import { InsigniaEstado } from '../InsigniaEstado'

/**
 * Planeta ilustrado del nivel.
 * @param nivelId id del nivel (elige la ilustración)
 * @param estado estado del nivel
 */
export function PlanetaIlustrado({ nivelId, estado }: { nivelId: number; estado: EstadoNodo }) {
  return (
    <span className="relative flex h-20 w-24 items-center justify-center">
      <span
        className={`h-20 w-24 rounded-2xl bg-cover bg-center shadow-card ${estado === 'bloqueado' ? 'opacity-35 grayscale' : ''} ${
          estado === 'activo' ? 'ring-4 ring-accent/50' : ''
        }`}
        style={{ backgroundImage: `url(${PLANETA_POR_NIVEL[nivelId]})` }}
      />
      {estado === 'bloqueado' && (
        <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-bg/70 text-text">
          <Icon name="lock" className="text-base" />
        </span>
      )}
      <InsigniaEstado estado={estado} />
    </span>
  )
}
