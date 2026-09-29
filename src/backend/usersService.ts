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
import type { ActualizacionUsuarioDB, FilaRankingDB, NuevoPerfilInput, NuevoUsuarioInput, UsuarioDB } from './types'

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

// ---------------------------------------------------------------------------
// API anterior (identificación por correo, sin Auth). Con la RLS de 0002 ya
// no funciona contra la BD; se mantiene solo mientras sus llamadores migran
// (PLAN_login_enlace_magico, tasks 3–5) y se elimina en la task 5.
// ---------------------------------------------------------------------------

/** @deprecated Usar obtenerUsuarioPorUserId (requiere sesión de Supabase Auth). */
export async function obtenerUsuarioPorCorreo(correo: string): Promise<UsuarioDB | null> {
  const cliente = requerirSupabase()
  const { data, error } = await cliente.from(TABLA).select('*').ilike('correo', correo.trim()).maybeSingle()
  if (error) throw error
  return data
}

/** @deprecated Usar crearPerfil (requiere sesión de Supabase Auth). */
export async function crearUsuario(datos: NuevoUsuarioInput): Promise<UsuarioDB> {
  if (!validarCorreoCovalto(datos.correo)) {
    throw new Error('El correo debe ser del dominio @covalto.com')
  }
  const cliente = requerirSupabase()
  const { data, error } = await cliente
    .from(TABLA)
    .insert({
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

/** @deprecated Usar actualizarProgresoPorUserId (requiere sesión de Supabase Auth). */
export async function actualizarProgresoUsuario(correo: string, cambios: ActualizacionUsuarioDB): Promise<void> {
  const cliente = requerirSupabase()
  const { error } = await cliente.from(TABLA).update(cambios).ilike('correo', correo.trim())
  if (error) throw error
}

/**
 * Top N usuarios reales por XP, para el Ranking (Bloque 8). Solo pide las
 * columnas públicas (FilaRankingDB): nunca `nombre` ni `correo` de otros.
 * (La task 5 lo cambia a la función `ranking_exploradores`.)
 */
export async function listarRankingUsuarios(limite = 10): Promise<FilaRankingDB[]> {
  const cliente = requerirSupabase()
  const { data, error } = await cliente
    .from(TABLA)
    .select('id, alias, xp_total, rango')
    .order('xp_total', { ascending: false })
    .limit(limite)

  if (error) throw error
  return data ?? []
}

export { isSupabaseConfigured }
