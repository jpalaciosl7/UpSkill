/**
 * CabeceraNivel.tsx — cabecera del curso: número y pilar AAA+, sello si ya se
 * obtuvo, nombre, señal de dominio y avance. En el tema espacial el planeta del
 * nivel es protagonista a un lado.
 */
import { PlanetaProtagonista } from '@/components/espacio/viaje'
import { Icon } from '@/components/ui/Icon'
import type { Level } from '@/data/types'
import { SoloEnTema } from '@/theme'

interface CabeceraNivelProps {
  nivel: Level
  conSello: boolean
  completados: number
  totalModulos: number
}

/** Cabecera del detalle de nivel */
export function CabeceraNivel({ nivel, conSello, completados, totalModulos }: CabeceraNivelProps) {
  return (
    <div className="flex flex-col gap-6 rounded-card border border-border bg-surface p-6 shadow-card sm:flex-row sm:items-center">
      <SoloEnTema tema="espacial">
        <PlanetaProtagonista nivelId={nivel.id} />
      </SoloEnTema>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface-beige px-2.5 py-0.5 text-xs font-semibold text-text-muted">
            Nivel {nivel.id} · {nivel.aaa}
          </span>
          {conSello && (
            <span className="flex items-center gap-1 rounded-full bg-surface-mint px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Icon name="check_circle" className="text-[14px]" />
              Sello obtenido
            </span>
          )}
        </div>
        <h1 className="titular-degradado mt-2 text-2xl font-bold espacial:text-3xl">{nivel.nombre}</h1>
        <p className="mt-1 text-sm text-text-muted">{nivel.senalDominio}</p>
        <p className="mt-3 text-sm font-medium text-text-muted">
          {completados}/{totalModulos} módulos completados
        </p>
      </div>
    </div>
  )
}
