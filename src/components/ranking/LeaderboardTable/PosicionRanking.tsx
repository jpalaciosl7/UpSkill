/**
 * PosicionRanking.tsx — celda de posición: medalla para el podio (colores de
 * tema con contraste verificado) o el número del puesto.
 */
import { Icon } from '@/components/ui/Icon'

/** Clase de color de la medalla por puesto (tokens --color-medalla-*) */
const CLASE_MEDALLA: Record<number, string> = {
  1: 'text-medalla-oro',
  2: 'text-medalla-plata',
  3: 'text-medalla-bronce',
}

/**
 * Muestra el puesto; en el podio, una medalla con el puesto anunciado a
 * lectores de pantalla.
 * @param posicion puesto (1 = primero)
 */
export function PosicionRanking({ posicion }: { posicion: number }) {
  const claseMedalla = CLASE_MEDALLA[posicion]
  return (
    <span className="flex items-center gap-1">
      {claseMedalla ? (
        <>
          <Icon name="emoji_events" className={`text-lg ${claseMedalla}`} />
          <span className="sr-only">Puesto {posicion}</span>
        </>
      ) : (
        <span className="text-text-muted">{posicion}</span>
      )}
    </span>
  )
}
