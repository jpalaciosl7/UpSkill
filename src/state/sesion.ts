/**
 * sesion.ts — decisiones puras sobre la sesión de Supabase Auth y el estado
 * del explorador. Sin React ni red, para poder probarlas aisladas; el
 * efecto que las usa vive en explorerContext.tsx.
 */
import type { SesionAuth } from '@/backend/authService'
import type { ExplorerState } from './types'

export type ResultadoSesion =
  /** Sin sesión: si el estado actual quedó "identificado", hay que volver al modo local */
  | { tipo: 'sin_sesion'; volverAModoLocal: boolean }
  /** Autenticado pero sin fila en `usuarios`: la UI debe pedir el perfil inicial */
  | { tipo: 'perfil_pendiente' }
  /** Autenticado con perfil: `cambio` indica si hay que despachar el estado fresco */
  | { tipo: 'identificado'; estado: ExplorerState; cambio: boolean }

/**
 * Qué hacer tras un cambio de sesión.
 * @param estadoFresco la fila propia ya traducida a estado, o null si no existe
 */
export function resolverSesion(
  sesion: SesionAuth | null,
  estadoFresco: ExplorerState | null,
  estadoActual: ExplorerState,
): ResultadoSesion {
  if (!sesion) return { tipo: 'sin_sesion', volverAModoLocal: estadoActual.correo !== null }
  if (!estadoFresco) return { tipo: 'perfil_pendiente' }
  // Comparar antes de despachar evita un ciclo de escritura hacia la BD sin cambios reales
  return { tipo: 'identificado', estado: estadoFresco, cambio: JSON.stringify(estadoFresco) !== JSON.stringify(estadoActual) }
}

/**
 * Solo se sincroniza con la BD cuando el estado en pantalla ES el de la cuenta
 * con sesión (evita escribir el mock de demo o el estado de otra cuenta).
 */
export function debeSincronizar(sesion: SesionAuth | null, estado: ExplorerState): boolean {
  return sesion !== null && estado.correo !== null && estado.correo.toLowerCase() === sesion.correo.toLowerCase()
}
