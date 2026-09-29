/**
 * paresTema.ts — el contrato de accesibilidad de los temas: qué pares
 * (color de delante / color de fondo) deben cumplir qué mínimo. Los dos
 * temas deben cumplir todos los pares; si agregas un token que se usa como
 * texto o como borde que delimita, agrega aquí su par.
 */
import { MINIMO_GRAFICO, MINIMO_TEXTO } from './wcag'

/** Un par de tokens a comparar y el mínimo exigido */
export interface ParContraste {
  /** Qué representa, para el mensaje de la prueba */
  uso: string
  /** Token de delante (texto, borde, ícono), sin `--color-` */
  frente: string
  /** Token de fondo, sin `--color-`; si es translúcido se compone sobre `bg` */
  fondo: string
  minimo: number
}

/** Pares obligatorios en cualquier tema */
export const PARES_TEMA: ParContraste[] = [
  { uso: 'texto sobre fondo', frente: 'text', fondo: 'bg', minimo: MINIMO_TEXTO },
  { uso: 'texto sobre tarjeta', frente: 'text', fondo: 'surface', minimo: MINIMO_TEXTO },
  { uso: 'texto secundario sobre tarjeta', frente: 'text-muted', fondo: 'surface', minimo: MINIMO_TEXTO },
  { uso: 'texto secundario sobre fondo', frente: 'text-muted', fondo: 'bg', minimo: MINIMO_TEXTO },
  { uso: 'texto secundario sobre chip', frente: 'text-muted', fondo: 'surface-beige', minimo: MINIMO_TEXTO },
  { uso: 'primario como texto sobre tarjeta', frente: 'primary', fondo: 'surface', minimo: MINIMO_TEXTO },
  { uso: 'primario sobre chip de acento', frente: 'primary', fondo: 'surface-mint', minimo: MINIMO_TEXTO },
  { uso: 'texto sobre botón primario', frente: 'text-on-primary', fondo: 'primary', minimo: MINIMO_TEXTO },
  { uso: 'texto sobre ámbar', frente: 'text-on-accent', fondo: 'accent', minimo: MINIMO_TEXTO },
  { uso: 'ámbar legible sobre tarjeta', frente: 'accent-text', fondo: 'surface', minimo: MINIMO_TEXTO },
  { uso: 'error sobre tarjeta', frente: 'danger', fondo: 'surface', minimo: MINIMO_TEXTO },
  { uso: 'error sobre fondo', frente: 'danger', fondo: 'bg', minimo: MINIMO_TEXTO },
  { uso: 'borde de campo sobre tarjeta', frente: 'border-strong', fondo: 'surface', minimo: MINIMO_GRAFICO },
  { uso: 'borde de campo sobre fondo', frente: 'border-strong', fondo: 'bg', minimo: MINIMO_GRAFICO },
  { uso: 'nodo completado sobre fondo', frente: 'node-done', fondo: 'bg', minimo: MINIMO_GRAFICO },
  { uso: 'ícono sobre nodo bloqueado', frente: 'text-muted', fondo: 'node-locked', minimo: MINIMO_GRAFICO },
  { uso: 'medalla oro sobre tarjeta', frente: 'medalla-oro', fondo: 'surface', minimo: MINIMO_GRAFICO },
  { uso: 'medalla plata sobre tarjeta', frente: 'medalla-plata', fondo: 'surface', minimo: MINIMO_GRAFICO },
  { uso: 'medalla bronce sobre tarjeta', frente: 'medalla-bronce', fondo: 'surface', minimo: MINIMO_GRAFICO },
]
