/**
 * index.ts — API pública del sistema de temas. Desde fuera de src/theme/ se
 * importa solo desde aquí (`@/theme`).
 */
export { ThemeProvider } from './ThemeProvider'
export { useTheme } from './useTheme'
export { SoloEnTema } from './SoloEnTema'
export { TEMAS, TEMA_POR_DEFECTO, temaSiguiente, type Tema } from './tipos'
