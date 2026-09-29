/**
 * EscenaOrbital.tsx — la escena 3D: perspectiva, anillo inclinado que gira,
 * trayectoria punteada y un planeta por nivel.
 */
import type { CSSProperties } from 'react'
import type { Level } from '@/data/types'
import type { EstadoNodo } from '../estadoNodo'
import { anguloPlaneta, cercania } from './geometriaOrbita'
import { PlanetaOrbital } from './PlanetaOrbital'

interface EscenaOrbitalProps {
  niveles: Level[]
  estados: EstadoNodo[]
  enfocado: number
  /** Rotación acumulada del anillo (grados) */
  rotacion: number
  alSeleccionar: (indice: number) => void
}

/** Escena con el anillo de planetas (decorativa para teclado: se navega con los controles) */
export function EscenaOrbital({ niveles, estados, enfocado, rotacion, alSeleccionar }: EscenaOrbitalProps) {
  const total = niveles.length
  return (
    <div className="orbita-escena">
      <div className="orbita-anillo" style={{ '--rotacion': `${rotacion}deg` } as CSSProperties}>
        <div className="orbita-trayectoria" aria-hidden="true" />
        {niveles.map((nivel, indice) => (
          <PlanetaOrbital
            key={nivel.id}
            nivel={nivel}
            estado={estados[indice]}
            angulo={anguloPlaneta(indice, total)}
            cercania={cercania(indice, total, rotacion)}
            enfocado={indice === enfocado}
            alSeleccionar={() => alSeleccionar(indice)}
          />
        ))}
      </div>
    </div>
  )
}
