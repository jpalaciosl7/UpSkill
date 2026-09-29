/**
 * usersService.ts — capa de acceso a la tabla `usuarios` en Supabase.
 * Equivalente "backend real" de src/data/dataService.ts: el resto de la
 * app llama a estas funciones, nunca a `supabase` directamente.
 *
 * Desde la migración 0002 cada fila pertenece a una cuenta de Supabase Auth
 * (`user_id`) y la RLS solo deja leer/crear/actualizar la fila propia; por eso
 * las operaciones van por `user_id` y requieren una sesión activa.
 */
import { isSupabaseConfigured, requerirSupabase } from './supabaseClient'
import type { ActualizacionUsuarioDB, FilaRankingDB, NuevoPerfilInput, UsuarioDB } from './types'

const TABLA = 'usuarios'

/** Valida el dominio @covalto.com en el cliente (la BD también lo valida — defensa en profundidad) */
export function validarCorreoCovalto(correo: string): boolean {
  return /^[a-z0-9._%+-]+@covalto\.com$/i.test(correo.trim())
}

/** Fila del usuario autenticado. null si todavía no creó su perfil. */
export async function obtenerUsuarioPorUserId(userId: string): Promise<UsuarioDB | null> {
  const cliente = requerirSupabase()
  const { data, error } = await cliente.from(TABLA).select('*').eq('user_id', userId).maybeSingle()
  if (error) throw error
  return data
}

/**
 * Crea el perfil del usuario autenticado con progreso en cero (Nivel 1).
 * El correo debe ser el de la sesión: la RLS rechaza cualquier otro.
 */
export async function crearPerfil(datos: NuevoPerfilInput): Promise<UsuarioDB> {
  if (!validarCorreoCovalto(datos.correo)) {
    throw new Error('El correo debe ser del dominio @covalto.com')
  }
  const cliente = requerirSupabase()
  const { data, error } = await cliente
    .from(TABLA)
    .insert({
      user_id: datos.userId,
      nombre: datos.nombre.trim(),
      alias: datos.alias?.trim() || null,
      correo: datos.correo.trim().toLowerCase(),
      rol: datos.rol,
    })
    .select('*')
    .single()

  if (error) throw error
  return data
}

/** Actualiza perfil/progreso de la fila propia (la RLS impide tocar otras) */
export async function actualizarProgresoPorUserId(userId: string, cambios: ActualizacionUsuarioDB): Promise<void> {
  const cliente = requerirSupabase()
  const { error } = await cliente.from(TABLA).update(cambios).eq('user_id', userId)
  if (error) throw error
}

/**
 * Top N exploradores por XP, para el Ranking (Bloque 8). Va por la función
 * `ranking_exploradores` (0002): la RLS solo deja leer la fila propia, y la
 * función devuelve de TODOS únicamente las columnas públicas (FilaRankingDB),
 * nunca `nombre` ni `correo`. Requiere sesión (solo `authenticated` la ejecuta).
 */
export async function listarRankingUsuarios(limite = 20): Promise<FilaRankingDB[]> {
  const cliente = requerirSupabase()
  const { data, error } = await cliente.rpc('ranking_exploradores', { limite })
  if (error) throw error
  return (data ?? []) as FilaRankingDB[]
}

export { isSupabaseConfigured }
