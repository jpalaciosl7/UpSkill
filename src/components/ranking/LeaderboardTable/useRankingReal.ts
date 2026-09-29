/**
 * useRankingReal.ts — carga el Ranking real y la fila propia desde Supabase
 * cuando hay sesión. Sin sesión o sin BD no hace nada (se usa el mock).
 */
import { useEffect, useState } from 'react'
import { listarRankingUsuarios, obtenerUsuarioPorUserId, isSupabaseConfigured } from '@/backend/usersService'
import type { FilaRankingDB } from '@/backend/types'

/** Resultado del hook: filas públicas, id de la fila propia y si aún carga */
export interface RankingReal {
  filas: FilaRankingDB[]
  idPropio: string | null
  cargando: boolean
}

/** Datos cargados, guardados junto al userId con el que se pidieron */
interface Cargado {
  userId: string
  filas: FilaRankingDB[]
  idPropio: string | null
}

/**
 * Pide ranking + fila propia para la sesión dada. Si la sesión cambia, lo
 * cargado para la anterior deja de aplicar (sin setState síncrono en el efecto).
 * @param userId usuario con sesión, o null
 */
export function useRankingReal(userId: string | null): RankingReal {
  const [cargado, setCargado] = useState<Cargado | null>(null)
  const vigente = cargado && cargado.userId === userId ? cargado : null

  useEffect(() => {
    if (!isSupabaseConfigured || !userId) return
    let activo = true
    Promise.all([listarRankingUsuarios(20), obtenerUsuarioPorUserId(userId)])
      .then(([filas, propia]) => {
        if (activo) setCargado({ userId, filas, idPropio: propia?.id ?? null })
      })
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error('[ranking] no se pudo cargar el ranking real de Supabase:', error)
        if (activo) setCargado({ userId, filas: [], idPropio: null })
      })
    return () => {
      activo = false
    }
  }, [userId])

  return {
    filas: vigente?.filas ?? [],
    idPropio: vigente?.idPropio ?? null,
    cargando: isSupabaseConfigured && userId !== null && vigente === null,
  }
}
