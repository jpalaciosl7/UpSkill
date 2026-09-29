/**
 * EncabezadoLanding.tsx — barra superior de la landing: marca del programa y
 * el botón para alternar el tema.
 */
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Icon } from '@/components/ui/Icon'
import { NOMBRE_PROGRAMA } from '@/config/branding'

/** Marca + selector de tema, sobre el hero */
export function EncabezadoLanding() {
  return (
    <header className="relative flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2 font-semibold">
        <Icon name="rocket_launch" />
        {NOMBRE_PROGRAMA}
      </div>
      <ThemeToggle />
    </header>
  )
}
