/**
 * IconoNivel.tsx — nodo del tema Covalto: círculo con el ícono del nivel (o
 * candado) y contorno `border-strong` para que el nodo se distinga del fondo
 * (≥ 3:1) en cualquier estado.
 */
import { Icon } from '@/components/ui/Icon'
import { ICONO_POR_NIVEL } from '@/data/levelIcons'
import type { EstadoNodo } from '../estadoNodo'
import { InsigniaEstado } from './InsigniaEstado'

/** Relleno y color del ícono por estado */
const ESTILO_POR_ESTADO: Record<EstadoNodo, string> = {
  bloqueado: 'bg-node-locked text-text-muted',
  activo: 'bg-node-active text-text-on-accent ring-4 ring-accent/30',
  completado: 'bg-node-done text-text-on-accent',
}

/**
 * Nodo circular con ícono de nivel.
 * @param nivelId id del nivel (elige el ícono)
 * @param estado estado del nivel
 */
export function IconoNivel({ nivelId, estado }: { nivelId: number; estado: EstadoNodo }) {
  return (
    <span className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-card">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-border-strong ${ESTILO_POR_ESTADO[estado]}`}
      >
        <Icon name={estado === 'bloqueado' ? 'lock' : ICONO_POR_NIVEL[nivelId]} className="text-2xl" />
      </span>
      <InsigniaEstado estado={estado} />
    </span>
  )
}
