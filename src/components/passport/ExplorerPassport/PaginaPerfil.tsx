/**
 * PaginaPerfil.tsx — página izquierda del pasaporte: avatar, nombre, id
 * ficticio, rol y el resumen de nivel, rango y sellos.
 */
import { Icon } from '@/components/ui/Icon'
import { NOMBRE_PASAPORTE } from '@/config/branding'
import { useExplorer } from '@/state/explorerContext'
import { ID_EXPLORADOR_MOCK } from '@/state/types'
import { AvatarExplorador } from './AvatarExplorador'

/** Etiqueta visible de cada rol */
const ETIQUETA_ROL: Record<string, string> = { tecnico: 'Rol técnico', no_tecnico: 'Rol no técnico' }

/** Una fila "etiqueta · valor" del resumen */
function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted">{etiqueta}</span>
      <span className="font-semibold">{valor}</span>
    </div>
  )
}

/** Perfil del explorador en el pasaporte */
export function PaginaPerfil() {
  const {
    estado: { nombre, rol, rango, nivelActual, sellosObtenidos },
  } = useExplorer()

  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
        <Icon name="badge" className="text-[16px]" />
        {NOMBRE_PASAPORTE}
      </div>
      <div className="mt-4 flex flex-col items-center text-center">
        <AvatarExplorador />
        <p className="mt-3 text-lg font-bold">{nombre}</p>
        <p className="text-xs text-text-muted">ID explorador: {ID_EXPLORADOR_MOCK}</p>
        <p className="mt-1 text-xs text-text-muted">{ETIQUETA_ROL[rol]}</p>
      </div>
      <div className="mt-5 space-y-1 border-t border-border pt-4 text-sm">
        <Dato etiqueta="Nivel actual" valor={`${nivelActual} / 6`} />
        <Dato etiqueta="Rango" valor={rango} />
        <Dato etiqueta="Sellos obtenidos" valor={`${sellosObtenidos.length} / 6`} />
      </div>
    </div>
  )
}
