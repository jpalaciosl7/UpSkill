/**
 * CampoTexto.tsx — campo de formulario con etiqueta, ayuda opcional y borde
 * de campo accesible (`border-border-strong`, ≥ 3:1 en ambos temas).
 */
import type { InputHTMLAttributes, ReactNode } from 'react'

interface CampoTextoProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Texto visible de la etiqueta */
  etiqueta: string
  /** Valor actual del campo */
  valor: string
  /** Se llama con el texto nuevo en cada cambio */
  alCambiar: (valor: string) => void
  /** Ayuda opcional debajo del campo */
  ayuda?: ReactNode
}

/**
 * Campo de texto etiquetado; acepta los atributos nativos de <input>
 * (type, placeholder, autoComplete…).
 */
export function CampoTexto({ etiqueta, valor, alCambiar, ayuda, ...atributos }: CampoTextoProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{etiqueta}</span>
      <input
        {...atributos}
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
        className="w-full rounded-full border border-border-strong bg-bg px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
      {ayuda && <span className="mt-1 block text-xs text-text-muted">{ayuda}</span>}
    </label>
  )
}
