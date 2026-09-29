/**
 * PlanetaProtagonista.tsx — el planeta del nivel en grande, con halo violeta
 * y un giro lento, en la cabecera del curso (tema espacial). Comparte
 * `view-transition-name` con el planeta enfocado de la órbita para el viaje.
 */
import './viaje.css'
import { PLANETA_POR_NIVEL } from '@/assets/espacial'

/**
 * Planeta decorativo del nivel.
 * @param nivelId id del nivel (elige la ilustración)
 */
export function PlanetaProtagonista({ nivelId }: { nivelId: number }) {
  return (
    <div aria-hidden="true" className="viaje-planeta mx-auto h-40 w-40 shrink-0 rounded-full sm:mx-0 sm:h-48 sm:w-48" style={{ boxShadow: 'var(--glow-primario)' }}>
      <div
        className="viaje-giro h-full w-full rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${PLANETA_POR_NIVEL[nivelId]})` }}
      />
    </div>
  )
}
