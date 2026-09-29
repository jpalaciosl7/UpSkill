/**
 * MissionStamp.tsx — un sello de misión del Pasaporte, uno por nivel
 * (pantalla 5). El color del sello obtenido sale del token
 * `--color-sello-N` del tema: ámbar en Covalto, un color por nivel en Espacial.
 */
import type { CSSProperties } from 'react'
import { Icon } from '@/components/ui/Icon'
import { ICONO_POR_NIVEL } from '@/data/levelIcons'
import type { Level } from '@/data/types'

interface MissionStampProps {
  nivel: Level
  obtenido: boolean
}

/** Sello obtenido (color del nivel) o pendiente (punteado y con candado) */
export function MissionStamp({ nivel, obtenido }: MissionStampProps) {
  const colorSello = { '--color-sello-actual': `var(--color-sello-${nivel.id})` } as CSSProperties
  return (
    <div
      style={colorSello}
      className={`flex flex-col items-center gap-1.5 rounded-card border-2 p-3 text-center ${
        obtenido ? 'border-(--color-sello-actual) bg-surface-beige' : 'border-dashed border-border bg-surface opacity-60'
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          obtenido ? 'bg-(--color-sello-actual) text-text-on-accent' : 'bg-node-locked text-text-muted'
        }`}
      >
        <Icon name={obtenido ? ICONO_POR_NIVEL[nivel.id] : 'lock'} className="text-xl" />
      </span>
      <p className="text-xs font-semibold leading-tight">{nivel.nombre}</p>
      <p className="text-[10px] text-text-muted">Nivel {nivel.id}</p>
    </div>
  )
}
