/**
 * contextoTema.ts — el Context de React que comparten ThemeProvider y
 * useTheme. Separado de ambos para que ninguno dependa del otro.
 */
import { createContext } from 'react'
import type { Tema } from './tipos'

/** Lo que el sistema de temas ofrece a los componentes */
export interface ValorContextoTema {
  /** Tema aplicado ahora */
  tema: Tema
  /** Pasa al siguiente tema (lo usa el botón del header) */
  alternarTema: () => void
  /** Fija un tema concreto */
  setTema: (tema: Tema) => void
}

/** Context del tema; undefined fuera de <ThemeProvider> */
export const ContextoTema = createContext<ValorContextoTema | undefined>(undefined)
