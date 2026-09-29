/**
 * authService.ts — login real con Supabase Auth (enlace mágico por correo).
 *
 * Única puerta de la app a `supabase.auth`. Flujo "implicit" (ver
 * supabaseClient.ts): el usuario pide un enlace, lo abre desde su correo y
 * supabase-js recoge la sesión al volver (detectSessionInUrl) y la persiste.
 *
 * El dominio @covalto.com se valida aquí (UX) y en la BD (trigger
 * solo_correos_covalto de 0002_auth_rls.sql), que es la barrera real.
 */
import type { AuthError, Session } from '@supabase/supabase-js'
import { requerirSupabase } from './supabaseClient'
import { validarCorreoCovalto } from './usersService'

/** Lo que la app necesita de una sesión de Supabase Auth */
export interface SesionAuth {
  userId: string
  correo: string
}

/** Traduce una sesión de supabase-js a SesionAuth (null si no hay usuario) */
export function aSesionAuth(session: Session | null): SesionAuth | null {
  if (!session?.user) return null
  return { userId: session.user.id, correo: (session.user.email ?? '').toLowerCase() }
}

/** Mensaje en español para los errores de Auth más comunes */
export function mensajeErrorAuth(error: Pick<AuthError, 'message'> & { status?: number; code?: string }): string {
  const texto = error.message.toLowerCase()
  if (error.status === 429 || error.code === 'over_email_send_rate_limit' || texto.includes('rate limit')) {
    return 'Ya pediste un enlace hace poco. Espera un minuto antes de pedir otro.'
  }
  // El trigger de dominio aborta la creación de la cuenta y Auth lo reporta así
  if (texto.includes('database error saving new user') || texto.includes('@covalto.com')) {
    return 'Solo se permiten cuentas con correo @covalto.com.'
  }
  if (texto.includes('invalid') && texto.includes('email')) {
    return 'El correo no es válido.'
  }
  return 'No se pudo completar el acceso. Intenta de nuevo en unos minutos.'
}

/** Envía el enlace mágico. Rechaza dominios ajenos sin llamar a Supabase. */
export async function enviarEnlaceMagico(correo: string, redirigirA?: string): Promise<void> {
  if (!validarCorreoCovalto(correo)) {
    throw new Error('El correo debe ser del dominio @covalto.com')
  }
  const cliente = requerirSupabase()
  const { error } = await cliente.auth.signInWithOtp({
    email: correo.trim().toLowerCase(),
    options: {
      emailRedirectTo: redirigirA ?? `${window.location.origin}/cuenta`,
      shouldCreateUser: true,
    },
  })
  if (error) throw new Error(mensajeErrorAuth(error))
}

/** Sesión actual (la restaura de localStorage o del enlace recién abierto) */
export async function obtenerSesion(): Promise<SesionAuth | null> {
  const cliente = requerirSupabase()
  const { data, error } = await cliente.auth.getSession()
  if (error) throw error
  return aSesionAuth(data.session)
}

/** Suscribe a cambios de sesión (entrar, salir, refresco). Devuelve la función para desuscribirse. */
export function alCambiarSesion(alCambiar: (sesion: SesionAuth | null) => void): () => void {
  const cliente = requerirSupabase()
  const { data } = cliente.auth.onAuthStateChange((_evento, session) => alCambiar(aSesionAuth(session)))
  return () => data.subscription.unsubscribe()
}

/** Cierra la sesión en Supabase (el estado local lo limpia quien llama) */
export async function cerrarSesionSupabase(): Promise<void> {
  const cliente = requerirSupabase()
  const { error } = await cliente.auth.signOut()
  if (error) throw error
}
