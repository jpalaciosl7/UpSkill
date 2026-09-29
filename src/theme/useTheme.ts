/**
 * useTheme.ts — hook para leer y cambiar el tema desde cualquier componente.
 */
import { useContext } from 'react'
import { ContextoTema, type ValorContextoTema } from './contextoTema'

/**
 * Devuelve el tema actual y las funciones para cambiarlo.
 * @throws Error si se usa fuera de <ThemeProvider>
 */
export function useTheme(): ValorContextoTema {
  const contexto = useContext(ContextoTema)
  if (!contexto) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return contexto
}
