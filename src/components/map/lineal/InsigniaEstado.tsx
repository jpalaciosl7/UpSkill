/**
 * InsigniaEstado.tsx — insignia en la esquina de un planeta/nodo: "en curso"
 * (activo) o "completado". Una sola pieza para ambos temas (antes se
 * duplicaba en cada rama).
 */
import { Icon } from '@/components/ui/Icon'
import type { EstadoNodo } from '../estadoNodo'

/**
 * Insignia del estado; no pinta nada para "bloqueado" (el candado va dentro del nodo).
 * @param estado estado del nivel
 */
export function InsigniaEstado({ estado }: { estado: EstadoNodo }) {
  if (estado === 'bloqueado') return null
  const activo = estado === 'activo'
  return (
    <span
      className={`absolute -top-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full shadow-card ${
        activo ? 'bg-primary text-text-on-primary' : 'bg-accent text-text-on-accent'
      }`}
    >
      <Icon name={activo ? 'my_location' : 'check'} className="text-[14px]" />
      <span className="sr-only">{activo ? 'En curso' : 'Completado'}</span>
    </span>
  )
}
