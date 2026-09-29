/**
 * ControlesOrbita.tsx — botones ‹ › para girar la órbita y el indicador de
 * posición ("Nivel 3 de 6").
 */
import { Icon } from '@/components/ui/Icon'

interface ControlesOrbitaProps {
  enfocado: number
  total: number
  alAnterior: () => void
  alSiguiente: () => void
}

/** Botón redondo de navegación */
function BotonGiro({ icono, etiqueta, alPulsar }: { icono: string; etiqueta: string; alPulsar: () => void }) {
  return (
    <button
      type="button"
      onClick={alPulsar}
      aria-label={etiqueta}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-primary shadow-card transition hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Icon name={icono} />
    </button>
  )
}

/** Controles de giro de la órbita */
export function ControlesOrbita({ enfocado, total, alAnterior, alSiguiente }: ControlesOrbitaProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <BotonGiro icono="chevron_left" etiqueta="Planeta anterior" alPulsar={alAnterior} />
      <span className="min-w-28 text-center text-sm text-text-muted">
        Nivel {enfocado + 1} de {total}
      </span>
      <BotonGiro icono="chevron_right" etiqueta="Planeta siguiente" alPulsar={alSiguiente} />
    </div>
  )
}
