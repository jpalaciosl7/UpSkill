/**
 * PlanetaOrbital.tsx — un planeta en la órbita: ilustración circular, candado
 * si está bloqueado, insignia de estado y nombre. Su opacidad y brillo bajan
 * cuanto más lejos está de la cámara (profundidad).
 */
import type { CSSProperties } from 'react'
import { PLANETA_POR_NIVEL } from '@/assets/espacial'
import { Icon } from '@/components/ui/Icon'
import type { Level } from '@/data/types'
import type { EstadoNodo } from '../estadoNodo'
import { InsigniaEstado } from '../InsigniaEstado'

interface PlanetaOrbitalProps {
  nivel: Level
  estado: EstadoNodo
  /** Ángulo del planeta en el anillo (grados) */
  angulo: number
  /** 1 al frente, 0 al fondo */
  cercania: number
  enfocado: boolean
  alSeleccionar: () => void
}

/** Botón-planeta dentro de la escena 3D */
export function PlanetaOrbital({ nivel, estado, angulo, cercania, enfocado, alSeleccionar }: PlanetaOrbitalProps) {
  const estilo = {
    '--angulo': `${angulo}deg`,
    opacity: 0.35 + 0.65 * cercania,
    filter: `brightness(${0.55 + 0.45 * cercania})`,
  } as CSSProperties

  return (
    <button
      type="button"
      onClick={alSeleccionar}
      tabIndex={-1}
      aria-label={`Nivel ${nivel.id}, ${nivel.nombre}`}
      className={`orbita-planeta flex flex-col items-center gap-2 text-center ${enfocado ? 'orbita-planeta-enfocado' : ''}`}
      style={estilo}
    >
      <span className="relative block">
        <span
          className={`orbita-cuerpo block h-24 w-24 rounded-full bg-cover bg-center ${estado === 'bloqueado' ? 'grayscale' : ''}`}
          style={{ backgroundImage: `url(${PLANETA_POR_NIVEL[nivel.id]})` }}
        />
        {estado === 'bloqueado' && (
          <span className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-bg/70 text-text">
            <Icon name="lock" className="text-lg" />
          </span>
        )}
        <InsigniaEstado estado={estado} />
      </span>
      <span className="text-xs font-semibold text-text">{nivel.nombre}</span>
    </button>
  )
}
