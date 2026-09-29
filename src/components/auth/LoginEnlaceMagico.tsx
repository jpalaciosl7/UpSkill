import { useEffect, useState, type FormEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { enviarEnlaceMagico } from '@/backend/authService'
import { validarCorreoCovalto } from '@/backend/usersService'
import { NOMBRE_EXPERIENCIA } from '@/config/branding'
import { segundosParaReenviar } from './reenvio'

/**
 * LoginEnlaceMagico — acceso sin contraseña: el explorador escribe su correo
 * @covalto.com y recibe un enlace de un solo uso. Al abrirlo vuelve a /cuenta
 * con la sesión iniciada (ver src/backend/authService.ts).
 */
export function LoginEnlaceMagico() {
  const [correo, setCorreo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviadoA, setEnviadoA] = useState<string | null>(null)
  const [enviadoEn, setEnviadoEn] = useState<number | null>(null)
  const [ahora, setAhora] = useState(() => Date.now())
  const [error, setError] = useState<string | null>(null)

  const espera = segundosParaReenviar(enviadoEn, ahora)

  // Reloj de la cuenta regresiva solo mientras hay espera activa
  useEffect(() => {
    if (espera === 0) return
    const intervalo = setInterval(() => setAhora(Date.now()), 1000)
    return () => clearInterval(intervalo)
  }, [espera])

  const pedirEnlace = async (destino: string) => {
    setError(null)
    if (!validarCorreoCovalto(destino)) {
      setError('El correo debe ser del dominio @covalto.com')
      return
    }
    setEnviando(true)
    try {
      await enviarEnlaceMagico(destino)
      const momento = Date.now()
      setEnviadoA(destino.trim().toLowerCase())
      setEnviadoEn(momento)
      setAhora(momento)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el enlace. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const enviar = (evento: FormEvent) => {
    evento.preventDefault()
    void pedirEnlace(correo)
  }

  if (enviadoA) {
    return (
      <div className="space-y-4 rounded-card border border-[var(--color-border)] bg-surface p-6 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-mint text-primary">
            <Icon name="mark_email_read" className="text-[22px]" />
          </span>
          <div>
            <h2 className="text-lg font-bold">Revisa tu correo</h2>
            <p className="mt-1 text-sm text-text-muted">
              Enviamos un enlace de acceso a <span className="font-semibold text-text">{enviadoA}</span>. Ábrelo
              para entrar a {NOMBRE_EXPERIENCIA}. Caduca en 1 hora.
            </p>
          </div>
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-sm text-red-600">
            <Icon name="error" className="text-[16px]" />
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={espera > 0 || enviando}
            onClick={() => void pedirEnlace(enviadoA)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-text-on-primary shadow-card transition disabled:opacity-60"
          >
            <Icon name="refresh" className="text-[18px]" />
            {espera > 0 ? `Reenviar en ${espera} s` : 'Reenviar enlace'}
          </button>
          <button
            type="button"
            onClick={() => {
              setEnviadoA(null)
              setError(null)
            }}
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-primary hover:text-primary"
          >
            Usar otro correo
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-card border border-[var(--color-border)] bg-surface p-6 shadow-card">
      <div>
        <h2 className="text-lg font-bold">Entra con tu correo Covalto</h2>
        <p className="mt-1 text-sm text-text-muted">
          Sin contraseñas: te enviamos un enlace de acceso a tu correo @covalto.com.
        </p>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Correo Covalto</span>
        <input
          type="email"
          autoComplete="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="tu.nombre@covalto.com"
          className="w-full rounded-full border border-[var(--color-border)] bg-bg px-4 py-2 text-sm outline-none focus:border-primary"
        />
      </label>

      {error && (
        <p className="flex items-center gap-1.5 text-sm text-red-600">
          <Icon name="error" className="text-[16px]" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-text-on-primary shadow-card transition disabled:opacity-60"
      >
        <Icon name={enviando ? 'progress_activity' : 'send'} className="text-[18px]" />
        {enviando ? 'Enviando…' : 'Enviar enlace de acceso'}
      </button>
    </form>
  )
}
