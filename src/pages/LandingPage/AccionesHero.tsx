/**
 * AccionesHero.tsx — llamados a la acción de la landing: "Despega ahora" va
 * al mapa; la autoevaluación queda disponible aparte, sin bloquear la entrada.
 */
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

/** CTA principal y enlace secundario a la autoevaluación */
export function AccionesHero() {
  const navigate = useNavigate()
  return (
    <div className="mt-10 flex flex-col items-center gap-3 espacial:lg:items-start">
      <button
        type="button"
        onClick={() => navigate('/mapa')}
        className="flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-semibold text-text-on-accent shadow-card transition hover:shadow-card-hover"
      >
        <Icon name="rocket_launch" />
        Despega ahora
      </button>
      <button
        type="button"
        onClick={() => navigate('/evaluacion')}
        className="text-sm underline decoration-dotted underline-offset-4 opacity-80 hover:opacity-100"
      >
        Prefiero autoevaluarme primero
      </button>
    </div>
  )
}
