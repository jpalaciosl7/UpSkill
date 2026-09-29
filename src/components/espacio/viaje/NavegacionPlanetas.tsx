/**
 * NavegacionPlanetas.tsx — ‹ planeta anterior · planeta siguiente › desde el
 * curso (tema espacial), respetando bloqueos. Navega con la transición de
 * viaje (View Transitions) cuando el navegador la soporta.
 */
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { Vecino, VecinosNivel } from './navegacionNiveles'

/**
 * Botón hacia un planeta vecino; deshabilitado si no existe o está bloqueado.
 * @param direccion 'anterior' o 'siguiente'
 */
function BotonViaje({ vecino, direccion }: { vecino: Vecino | null; direccion: 'anterior' | 'siguiente' }) {
  const navigate = useNavigate()
  const esSiguiente = direccion === 'siguiente'
  const bloqueado = !vecino || vecino.bloqueado
  const texto = vecino ? `${esSiguiente ? 'Siguiente' : 'Anterior'}: ${vecino.nivel.nombre}` : esSiguiente ? 'Fin de la ruta' : 'Inicio de la ruta'

  return (
    <button
      type="button"
      disabled={bloqueado}
      onClick={() => vecino && navigate(`/nivel/${vecino.nivel.id}`, { viewTransition: true })}
      className={`flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-primary shadow-card transition hover:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-50 ${
        esSiguiente ? 'flex-row-reverse' : ''
      }`}
    >
      <Icon name={vecino?.bloqueado ? 'lock' : esSiguiente ? 'chevron_right' : 'chevron_left'} className="text-[18px]" />
      <span className="max-w-40 truncate">{texto}</span>
    </button>
  )
}

/** Barra de viaje entre planetas vecinos */
export function NavegacionPlanetas({ vecinos }: { vecinos: VecinosNivel }) {
  return (
    <nav aria-label="Viajar entre planetas" className="flex items-center justify-between gap-3">
      <BotonViaje vecino={vecinos.anterior} direccion="anterior" />
      <BotonViaje vecino={vecinos.siguiente} direccion="siguiente" />
    </nav>
  )
}
