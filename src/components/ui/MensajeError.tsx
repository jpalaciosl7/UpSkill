/**
 * MensajeError.tsx — mensaje de error de formulario, con el color de error
 * del tema (`text-danger`, contraste verificado) y anunciado a lectores de
 * pantalla (`role="alert"`).
 */
import { Icon } from '@/components/ui/Icon'

/**
 * Muestra un error si hay texto; no renderiza nada si `mensaje` es null.
 * @param mensaje texto del error en español
 */
export function MensajeError({ mensaje }: { mensaje: string | null }) {
  if (!mensaje) return null
  return (
    <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
      <Icon name="error" className="text-[16px]" />
      {mensaje}
    </p>
  )
}
