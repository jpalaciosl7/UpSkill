/**
 * TrajectoryMap.tsx — mapa lineal: los 6 niveles en fila, unidos por una
 * trayectoria punteada (pantalla 3). Es el mapa del tema Covalto; el tema
 * espacial usa la órbita 3D.
 */
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLevels } from '@/data/dataService'
import { useExplorer } from '@/state/explorerContext'
import { calcularEstado } from '../estadoNodo'
import { PlanetNode } from './PlanetNode'

/** Tramo punteado entre dos niveles */
function Conector() {
  return (
    <div
      aria-hidden="true"
      className="mt-8 h-0.5 w-10 shrink-0 sm:w-16"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, var(--color-border-strong) 0, var(--color-border-strong) 6px, transparent 6px, transparent 12px)',
      }}
    />
  )
}

/** Fila de niveles con su estado; clic en un nivel lleva a su detalle */
export function TrajectoryMap() {
  const {
    estado: { nivelActual, sellosObtenidos },
  } = useExplorer()
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max items-start px-2">
        {getLevels().map((nivel, indice) => (
          <Fragment key={nivel.id}>
            {indice > 0 && <Conector />}
            <PlanetNode
              nivel={nivel}
              estado={calcularEstado(nivel, nivelActual, sellosObtenidos)}
              onSeleccionar={(n) => navigate(`/nivel/${n.id}`)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
