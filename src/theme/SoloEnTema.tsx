/**
 * SoloEnTema.tsx — muestra su contenido solo cuando el tema activo coincide.
 * Reemplaza los `tema === 'espacial' ? … : …` repartidos por los componentes:
 * la decisión de tema vive aquí, en un solo lugar.
 */
import type { ReactNode } from 'react'
import type { Tema } from './tipos'
import { useTheme } from './useTheme'

interface SoloEnTemaProps {
  /** Tema en el que se muestra el contenido */
  tema: Tema
  children: ReactNode
  /** Qué mostrar en cualquier otro tema (por defecto, nada) */
  enOtroTema?: ReactNode
}

/**
 * Renderiza `children` en el tema indicado y `enOtroTema` en los demás.
 * @example <SoloEnTema tema="espacial"><FondoEspacial /></SoloEnTema>
 */
export function SoloEnTema({ tema, children, enOtroTema = null }: SoloEnTemaProps) {
  const { tema: activo } = useTheme()
  return <>{activo === tema ? children : enOtroTema}</>
}
