import { useState, type FormEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { crearPerfil } from '@/backend/usersService'
import { ETIQUETA_SIN_ALIAS } from '@/components/ranking/nombreRanking'
import { NOMBRE_EXPERIENCIA } from '@/config/branding'
import { useExplorer } from '@/state/explorerContext'
import type { RolExplorador } from '@/state/types'

const ROLES: { valor: RolExplorador; etiqueta: string }[] = [
  { valor: 'no_tecnico', etiqueta: 'Rol no técnico' },
  { valor: 'tecnico', etiqueta: 'Rol técnico' },
]

/**
 * PerfilInicialForm — primer ingreso: la cuenta ya está autenticada (enlace
 * mágico) pero aún no tiene fila en `usuarios`. El correo sale de la sesión y
 * no se edita; el progreso arranca en cero (Nivel 1).
 */
export function PerfilInicialForm() {
  const { estado, sesion, alPerfilCreado } = useExplorer()
  const [nombre, setNombre] = useState('')
  const [alias, setAlias] = useState('')
  const [rol, setRol] = useState<RolExplorador>(estado.rol)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!sesion) return null

  const enviar = async (evento: FormEvent) => {
    evento.preventDefault()
    setError(null)
    if (!nombre.trim()) {
      setError('Escribe tu nombre.')
      return
    }
    setGuardando(true)
    try {
      const fila = await crearPerfil({
        userId: sesion.userId,
        correo: sesion.correo,
        nombre,
        alias: alias || undefined,
        rol,
      })
      alPerfilCreado(fila)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[usuarios] no se pudo crear el perfil:', err)
      setError('No se pudo guardar tu perfil. Intenta de nuevo en unos minutos.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-card border border-[var(--color-border)] bg-surface p-6 shadow-card">
      <div>
        <h2 className="text-lg font-bold">¡Bienvenido a {NOMBRE_EXPERIENCIA}!</h2>
        <p className="mt-1 text-sm text-text-muted">
          Entraste como <span className="font-semibold text-text">{sesion.correo}</span>. Completa tu perfil para
          empezar tu viaje desde el Nivel 1.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Nombre</span>
          <input
            type="text"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
            className="w-full rounded-full border border-[var(--color-border)] bg-bg px-4 py-2 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium">Alias (público, se muestra en el Ranking)</span>
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Opcional — p. ej. NovaExplorador"
            className="w-full rounded-full border border-[var(--color-border)] bg-bg px-4 py-2 text-sm outline-none focus:border-primary"
          />
          <span className="mt-1 block text-xs text-text-muted">
            Tu nombre real nunca aparece en el Ranking: sin alias, aparecerás como “{ETIQUETA_SIN_ALIAS}”.
          </span>
        </label>

        <fieldset className="text-sm">
          <legend className="mb-1 font-medium">Tu ruta</legend>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((opcion) => (
              <label
                key={opcion.valor}
                className={`cursor-pointer rounded-full border px-4 py-1.5 transition ${
                  rol === opcion.valor
                    ? 'border-primary bg-surface-mint font-semibold text-primary'
                    : 'border-[var(--color-border)] text-text-muted'
                }`}
              >
                <input
                  type="radio"
                  name="rol"
                  value={opcion.valor}
                  checked={rol === opcion.valor}
                  onChange={() => setRol(opcion.valor)}
                  className="sr-only"
                />
                {opcion.etiqueta}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-sm text-red-600">
          <Icon name="error" className="text-[16px]" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={guardando}
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-text-on-primary shadow-card transition disabled:opacity-60"
      >
        <Icon name={guardando ? 'progress_activity' : 'rocket_launch'} className="text-[18px]" />
        {guardando ? 'Guardando…' : 'Empezar mi viaje'}
      </button>
    </form>
  )
}
