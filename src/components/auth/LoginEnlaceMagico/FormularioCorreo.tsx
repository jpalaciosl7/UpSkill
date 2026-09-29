/**
 * FormularioCorreo.tsx — vista para escribir el correo @covalto.com y pedir
 * el enlace de acceso.
 */
import { useState, type FormEvent } from 'react'
import { CampoTexto } from '@/components/ui/CampoTexto'
import { Icon } from '@/components/ui/Icon'
import { MensajeError } from '@/components/ui/MensajeError'

interface FormularioCorreoProps {
  enviando: boolean
  error: string | null
  /** Se llama con el correo escrito al enviar el formulario */
  alEnviar: (correo: string) => void
}

/** Formulario de correo para el login sin contraseña */
export function FormularioCorreo({ enviando, error, alEnviar }: FormularioCorreoProps) {
  const [correo, setCorreo] = useState('')

  /** Evita el envío nativo y delega el correo */
  const enviar = (evento: FormEvent) => {
    evento.preventDefault()
    alEnviar(correo)
  }

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-card border border-border bg-surface p-6 shadow-card">
      <div>
        <h2 className="text-lg font-bold">Entra con tu correo Covalto</h2>
        <p className="mt-1 text-sm text-text-muted">
          Sin contraseñas: te enviamos un enlace de acceso a tu correo @covalto.com.
        </p>
      </div>

      <CampoTexto
        etiqueta="Correo Covalto"
        type="email"
        autoComplete="email"
        placeholder="tu.nombre@covalto.com"
        valor={correo}
        alCambiar={setCorreo}
      />

      <MensajeError mensaje={error} />

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
