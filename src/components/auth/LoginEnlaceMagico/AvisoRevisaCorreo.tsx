/**
 * AvisoRevisaCorreo.tsx — vista tras enviar el enlace: "Revisa tu correo",
 * reenviar (tras la espera) y cambiar de correo.
 */
import { Icon } from '@/components/ui/Icon'
import { MensajeError } from '@/components/ui/MensajeError'
import { NOMBRE_EXPERIENCIA } from '@/config/branding'

interface AvisoRevisaCorreoProps {
  correo: string
  /** Segundos para poder reenviar (0 = ya se puede) */
  espera: number
  enviando: boolean
  error: string | null
  alReenviar: () => void
  alUsarOtroCorreo: () => void
}

/** Confirma el envío del enlace y ofrece reenviar o usar otro correo */
export function AvisoRevisaCorreo({ correo, espera, enviando, error, alReenviar, alUsarOtroCorreo }: AvisoRevisaCorreoProps) {
  return (
    <div className="space-y-4 rounded-card border border-border bg-surface p-6 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-mint text-primary">
          <Icon name="mark_email_read" className="text-[22px]" />
        </span>
        <div>
          <h2 className="text-lg font-bold">Revisa tu correo</h2>
          <p className="mt-1 text-sm text-text-muted">
            Enviamos un enlace de acceso a <span className="font-semibold text-text">{correo}</span>. Ábrelo para
            entrar a {NOMBRE_EXPERIENCIA}. Caduca en 1 hora.
          </p>
        </div>
      </div>

      <MensajeError mensaje={error} />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={espera > 0 || enviando}
          onClick={alReenviar}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-text-on-primary shadow-card transition disabled:opacity-60"
        >
          <Icon name="refresh" className="text-[18px]" />
          {espera > 0 ? `Reenviar en ${espera} s` : 'Reenviar enlace'}
        </button>
        <button
          type="button"
          onClick={alUsarOtroCorreo}
          className="rounded-full border border-border-strong px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-primary hover:text-primary"
        >
          Usar otro correo
        </button>
      </div>
    </div>
  )
}
