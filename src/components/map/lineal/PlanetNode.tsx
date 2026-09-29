/**
 * PlanetNode.tsx — un nivel del mapa lineal: nodo (ícono en Covalto, planeta
 * ilustrado en Espacial), nombre, número y pilar AAA+. Clic → detalle del
 * nivel, salvo si está bloqueado.
 */
import type { Level } from '@/data/types'
import { SoloEnTema } from '@/theme'
import { esEnterable, type EstadoNodo } from '../estadoNodo'
import { IconoNivel } from './IconoNivel'
import { PlanetaIlustrado } from './PlanetaIlustrado'

interface PlanetNodeProps {
  nivel: Level
  estado: EstadoNodo
  onSeleccionar: (nivel: Level) => void
}

/** Botón de un nivel en la trayectoria lineal */
export function PlanetNode({ nivel, estado, onSeleccionar }: PlanetNodeProps) {
  const interactivo = esEnterable(estado)
  return (
    <button
      type="button"
      disabled={!interactivo}
      onClick={() => onSeleccionar(nivel)}
      className={`group flex w-32 shrink-0 flex-col items-center gap-2 rounded-card p-2 text-center transition ${
        interactivo ? 'cursor-pointer hover:-translate-y-1' : 'cursor-not-allowed opacity-80'
      }`}
    >
      <SoloEnTema tema="espacial" enOtroTema={<IconoNivel nivelId={nivel.id} estado={estado} />}>
        <PlanetaIlustrado nivelId={nivel.id} estado={estado} />
      </SoloEnTema>
      <div>
        <p className="text-xs font-medium text-text-muted">Nivel {nivel.id}</p>
        <p className="text-sm font-semibold leading-tight">{nivel.nombre}</p>
        <span className="mt-1 inline-block rounded-full bg-surface-beige px-2 py-0.5 text-[10px] font-medium text-text-muted">
          {nivel.aaa}
        </span>
      </div>
    </button>
  )
}
