/**
 * supabaseClient.ts — único punto de conexión a la base de datos real.
 *
 * Todo lo demás en /src/backend habla con la base de datos exclusivamente
 * a través de este cliente, nunca importando @supabase/supabase-js
 * directamente en otro lugar — así el día que cambie el backend, solo se
 * toca este archivo y usersService.ts (mismo principio de aislamiento de
 * datos que CLAUDE.md §7 pide para los mocks en /src/data).
 *
 * Variables de entorno requeridas (ver .env.example):
 *   VITE_SUPABASE_URL       — URL del proyecto Supabase
 *   VITE_SUPABASE_ANON_KEY  — clave pública "anon"/"publishable" (NO la service_role/secret)
 *
 * Auth (login con enlace mágico, ver authService.ts): flujo "implicit" a
 * propósito. Con PKCE el enlace solo funciona si se abre en el mismo
 * navegador que lo pidió (el verificador vive en su localStorage), algo
 * frágil en equipos corporativos donde el cliente de correo abre otro
 * navegador. detectSessionInUrl recoge la sesión al volver del enlace y
 * persistSession la guarda en localStorage.
 *
 * Sin estas variables, isSupabaseConfigured queda en false y el resto de
 * la app cae de vuelta al modo local/demo (localStorage) sin romperse —
 * así el prototipo sigue siendo demostrable incluso sin un proyecto
 * Supabase configurado (por ejemplo, en este entorno de desarrollo).
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { flowType: 'implicit', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true },
      })
    : null

/** Devuelve el cliente o lanza un error claro si Supabase no está configurado */
export function requerirSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase no está configurado (faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
        'Revisa el README para conectar la base de datos real.',
    )
  }
  return supabase
}

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console -- aviso de setup solo en desarrollo
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY no están configuradas. ' +
      'La app sigue funcionando en modo local (localStorage); ver README para conectar la BD real.',
  )
}
