/**
 * types.ts — shape de la fila `usuarios` tal como la devuelve Supabase.
 * Refleja 1:1 las columnas de supabase/migrations/0001_usuarios.sql y
 * 0002_auth_rls.sql (snake_case, como las devuelve la API de PostgREST).
 */
import type { RangoExplorador, RolExplorador } from '@/state/types'

export interface UsuarioDB {
  id: string
  /** Cuenta de Supabase Auth dueña de la fila (0002) */
  user_id: string
  nombre: string
  alias: string | null
  correo: string
  rol: RolExplorador
  rango: RangoExplorador
  nivel_actual: number
  xp_total: number
  xp_nivel_actual: number
  xp_nivel_objetivo: number
  monedas: number
  racha_dias: number
  ultima_actividad: string | null
  cursos_completados: string[]
  sellos_obtenidos: number[]
  recompensas_canjeadas: string[]
  evaluacion_completada: boolean
  respuestas_evaluacion: Record<string, number> | null
  fecha_registro: string
  ultimo_acceso: string
}

/**
 * Columnas que `authenticated` puede actualizar (GRANT UPDATE por columna en
 * 0002_auth_rls.sql). Nunca id, user_id, correo, fecha_registro ni
 * ultimo_acceso (lo mantiene un trigger).
 */
export const COLUMNAS_ACTUALIZABLES = [
  'nombre',
  'alias',
  'rol',
  'rango',
  'nivel_actual',
  'xp_total',
  'xp_nivel_actual',
  'xp_nivel_objetivo',
  'monedas',
  'racha_dias',
  'ultima_actividad',
  'cursos_completados',
  'sellos_obtenidos',
  'recompensas_canjeadas',
  'evaluacion_completada',
  'respuestas_evaluacion',
] as const satisfies readonly (keyof UsuarioDB)[]

export type ActualizacionUsuarioDB = Partial<Pick<UsuarioDB, (typeof COLUMNAS_ACTUALIZABLES)[number]>>

/**
 * Columnas mínimas que el Ranking necesita de CADA usuario. A propósito sin
 * `nombre` ni `correo`: el nombre real de otros no debe llegar al navegador
 * por el Ranking (el alias es el nombre público).
 */
export type FilaRankingDB = Pick<UsuarioDB, 'id' | 'alias' | 'xp_total' | 'rango'>

/** Perfil inicial del usuario autenticado (el correo sale de su sesión) */
export interface NuevoPerfilInput {
  userId: string
  correo: string
  nombre: string
  alias?: string
  rol: RolExplorador
}
