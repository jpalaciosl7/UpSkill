/**
 * TarjetaPlanetaEnfocado.tsx — ficha del planeta al frente de la órbita:
 * nivel, pilar AAA+, señal de dominio, progreso de módulos y "Entrar al
 * planeta" (deshabilitado si está bloqueado).
 */
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { Level } from '@/data/types'
import { esEnterable, type EstadoNodo } from '../estadoNodo'

interface TarjetaPlanetaEnfocadoProps {
  nivel: Level
  estado: EstadoNodo
  completados: number
  totalModulos: number
}

/** Texto del estado para la ficha */
const TEXTO_ESTADO: Record<EstadoNodo, string> = { bloqueado: 'Bloqueado', activo: 'En curso', completado: 'Completado' }

/** Ficha del planeta enfocado */
export function TarjetaPlanetaEnfocado({ nivel, estado, completados, totalModulos }: TarjetaPlanetaEnfocadoProps) {
  const navigate = useNavigate()
  const enterable = esEnterable(estado)
  const avance = totalModulos ? Math.round((completados / totalModulos) * 100) : 0

  return (
    <div className="mx-auto max-w-md rounded-card border border-border bg-surface p-5 text-center shadow-card backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Nivel {nivel.id} · {nivel.aaa} · {TEXTO_ESTADO[estado]}
      </p>
      <h2 className="mt-1 text-2xl font-bold">{nivel.nombre}</h2>
      <p className="mt-1 text-sm text-text-muted">{nivel.senalDominio}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-primary" style={{ width: `${avance}%` }} />
        </div>
        {completados}/{totalModulos} módulos
      </div>
      <button
        type="button"
        disabled={!enterable}
        onClick={() => navigate(`/nivel/${nivel.id}`, { viewTransition: true })}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-text-on-primary shadow-card transition hover:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon name={enterable ? 'rocket_launch' : 'lock'} className="text-[18px]" />
        {enterable ? 'Entrar al planeta' : 'Completa los niveles anteriores'}
      </button>
    </div>
  )
}
