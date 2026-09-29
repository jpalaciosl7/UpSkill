/**
 * PerfilInicialForm.tsx — primer ingreso: la cuenta ya está autenticada
 * (enlace mágico) pero aún no tiene fila en `usuarios`. Pide nombre, alias y
 * rol; el progreso arranca en cero (Nivel 1).
 */
import { CampoTexto } from '@/components/ui/CampoTexto'
import { Icon } from '@/components/ui/Icon'
import { MensajeError } from '@/components/ui/MensajeError'
import { ETIQUETA_SIN_ALIAS } from '@/components/ranking/nombreRanking'
import { NOMBRE_EXPERIENCIA } from '@/config/branding'
import { useExplorer } from '@/state/explorerContext'
import { SelectorRol } from './SelectorRol'
import { usePerfilInicial } from './usePerfilInicial'

/** Formulario del perfil inicial; no renderiza nada sin sesión */
export function PerfilInicialForm() {
  const { sesion } = useExplorer()
  const perfil = usePerfilInicial()
  if (!sesion) return null

  return (
    <form
      onSubmit={(evento) => void perfil.enviar(evento)}
      className="space-y-4 rounded-card border border-border bg-surface p-6 shadow-card"
    >
      <div>
        <h2 className="text-lg font-bold">¡Bienvenido a {NOMBRE_EXPERIENCIA}!</h2>
        <p className="mt-1 text-sm text-text-muted">
          Entraste como <span className="font-semibold text-text">{sesion.correo}</span>. Completa tu perfil para
          empezar tu viaje desde el Nivel 1.
        </p>
      </div>

      <div className="space-y-3">
        <CampoTexto etiqueta="Nombre" autoComplete="name" placeholder="Tu nombre completo" valor={perfil.nombre} alCambiar={perfil.setNombre} />
        <CampoTexto
          etiqueta="Alias (público, se muestra en el Ranking)"
          placeholder="Opcional — p. ej. NovaExplorador"
          valor={perfil.alias}
          alCambiar={perfil.setAlias}
          ayuda={`Tu nombre real nunca aparece en el Ranking: sin alias, aparecerás como “${ETIQUETA_SIN_ALIAS}”.`}
        />
        <SelectorRol rol={perfil.rol} alCambiar={perfil.setRol} />
      </div>

      <MensajeError mensaje={perfil.error} />

      <button
        type="submit"
        disabled={perfil.guardando}
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-text-on-primary shadow-card transition disabled:opacity-60"
      >
        <Icon name={perfil.guardando ? 'progress_activity' : 'rocket_launch'} className="text-[18px]" />
        {perfil.guardando ? 'Guardando…' : 'Empezar mi viaje'}
      </button>
    </form>
  )
}
