/**
 * CabeceraTeaser.tsx — ícono y etiqueta de una tarjeta de comunidad. En la
 * tarjeta destacada (fondo primario) los fondos son un velo del color de
 * texto sobre primario, así se adaptan a cada tema.
 */
import { Icon } from '@/components/ui/Icon'

interface CabeceraTeaserProps {
  icono: string
  etiqueta: string
  destacado: boolean
}

/** Ícono en círculo + chip de etiqueta */
export function CabeceraTeaser({ icono, etiqueta, destacado }: CabeceraTeaserProps) {
  const velo = destacado ? 'bg-text-on-primary/15' : ''
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${velo || 'bg-surface-mint text-primary'}`}>
        <Icon name={icono} className="text-xl" />
      </span>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${velo || 'bg-surface-beige text-text-muted'}`}
      >
        {etiqueta}
      </span>
    </div>
  )
}
