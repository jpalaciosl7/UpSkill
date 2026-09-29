/**
 * presentacionTema.ts — cómo se presenta cada tema en la interfaz (nombre e
 * ícono del botón). Un mapa en lugar de `tema === …` en los componentes.
 */
import type { Tema } from './tipos'

/** Nombre visible e ícono (Material Symbols) de un tema */
export interface PresentacionTema {
  nombre: string
  icono: string
}

/** Presentación de cada tema, para el botón del header y la landing */
export const PRESENTACION_TEMA: Record<Tema, PresentacionTema> = {
  covalto: { nombre: 'Tema Covalto', icono: 'rocket_launch' },
  espacial: { nombre: 'Tema Espacial', icono: 'auto_awesome' },
}
