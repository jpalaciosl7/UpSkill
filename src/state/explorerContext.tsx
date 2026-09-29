/**
 * explorerContext.tsx — Context + Provider del estado global del explorador.
 *
 * Persistencia dual (CLAUDE.md, nota de alcance sobre backend real):
 *  - Modo local/demo (sin Supabase configurado, o sin sesión): solo
 *    localStorage, como arrancó el prototipo.
 *  - Modo identificado (sesión de Supabase Auth + fila propia en `usuarios`):
 *    localStorage sigue siendo la caché instantánea, pero la fuente de verdad
 *    es la BD — cada cambio de estado se sincroniza con un debounce corto.
 *
 * La sesión la maneja Supabase Auth (enlace mágico, ver src/backend/authService.ts):
 * el Provider se suscribe a los cambios de sesión y carga la fila propia, o
 * marca "perfil pendiente" si la cuenta aún no la creó.
 */
import { createContext, useContext, useEffect, useReducer, useRef, useState, type Dispatch, type ReactNode } from 'react'
import { explorerReducer, ESTADO_INICIAL, type ExplorerAction } from './explorerReducer'
import { leerEstadoGuardado, guardarEstado, borrarEstadoGuardado } from './explorerStorage'
import { debeSincronizar, resolverSesion } from './sesion'
import { actualizarProgresoPorUserId, obtenerUsuarioPorUserId, isSupabaseConfigured } from '@/backend/usersService'
import { alCambiarSesion, cerrarSesionSupabase, type SesionAuth } from '@/backend/authService'
import { estadoAActualizacionUsuario, usuarioDbAEstado } from '@/backend/mapping'
import type { UsuarioDB } from '@/backend/types'
import type { ExplorerState } from './types'

interface ExplorerContextValue {
  estado: ExplorerState
  dispatch: Dispatch<ExplorerAction>
  /** Sesión de Supabase Auth (null sin sesión o sin Supabase configurado) */
  sesion: SesionAuth | null
  /** true mientras se resuelve la sesión inicial / la fila propia */
  cargandoSesion: boolean
  /** Autenticado pero sin fila en `usuarios`: hay que pedir el perfil inicial */
  perfilPendiente: boolean
  /** Llamar tras crear el perfil inicial para pasar a modo identificado */
  alPerfilCreado: (fila: UsuarioDB) => void
}

const ExplorerContext = createContext<ExplorerContextValue | undefined>(undefined)

function inicializar(): ExplorerState {
  return leerEstadoGuardado() ?? ESTADO_INICIAL
}

const DEBOUNCE_SYNC_MS = 500

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [estado, dispatch] = useReducer(explorerReducer, undefined, inicializar)
  const [sesion, setSesion] = useState<SesionAuth | null>(null)
  const [cargandoSesion, setCargandoSesion] = useState(isSupabaseConfigured)
  const [perfilPendiente, setPerfilPendiente] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  // Último estado, para leerlo desde callbacks asíncronos sin re-suscribirse
  const estadoRef = useRef(estado)

  // Caché local instantánea — siempre, en ambos modos (funciona sin red)
  useEffect(() => {
    estadoRef.current = estado
    guardarEstado(estado)
  }, [estado])

  // Suscripción a la sesión de Supabase Auth (emite INITIAL_SESSION al suscribirse).
  // El callback es síncrono a propósito (recomendación de auth-js): la consulta
  // de la fila propia corre fuera de él.
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let vigente = true

    const desuscribir = alCambiarSesion((nuevaSesion) => {
      setSesion(nuevaSesion)
      const cargarFila = nuevaSesion ? obtenerUsuarioPorUserId(nuevaSesion.userId) : Promise.resolve(null)
      cargarFila
        .then((fila) => {
          if (!vigente) return
          const resultado = resolverSesion(nuevaSesion, fila ? usuarioDbAEstado(fila) : null, estadoRef.current)
          setPerfilPendiente(resultado.tipo === 'perfil_pendiente')
          if (resultado.tipo === 'sin_sesion' && resultado.volverAModoLocal) {
            borrarEstadoGuardado()
            dispatch({ type: 'CERRAR_SESION' })
          }
          if (resultado.tipo === 'identificado' && resultado.cambio) {
            dispatch({ type: 'IDENTIFICAR_USUARIO', estado: resultado.estado })
          }
        })
        .catch((error: unknown) => {
          // eslint-disable-next-line no-console
          console.error('[usuarios] no se pudo cargar el perfil desde Supabase:', error)
        })
        .finally(() => {
          if (vigente) setCargandoSesion(false)
        })
    })

    return () => {
      vigente = false
      desuscribir()
    }
  }, [])

  // Sincronización con la BD cuando el estado en pantalla es el de la cuenta con sesión
  useEffect(() => {
    if (!isSupabaseConfigured || !sesion || !debeSincronizar(sesion, estado)) return

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      actualizarProgresoPorUserId(sesion.userId, estadoAActualizacionUsuario(estado)).catch((error: unknown) => {
        // No rompe la UI: el progreso ya vive en localStorage como respaldo
        // eslint-disable-next-line no-console
        console.error('[usuarios] no se pudo sincronizar el progreso con Supabase:', error)
      })
    }, DEBOUNCE_SYNC_MS)

    return () => clearTimeout(debounceRef.current)
  }, [estado, sesion])

  const alPerfilCreado = (fila: UsuarioDB) => {
    setPerfilPendiente(false)
    dispatch({ type: 'IDENTIFICAR_USUARIO', estado: usuarioDbAEstado(fila) })
  }

  return (
    <ExplorerContext.Provider value={{ estado, dispatch, sesion, cargandoSesion, perfilPendiente, alPerfilCreado }}>
      {children}
    </ExplorerContext.Provider>
  )
}

export function useExplorer(): ExplorerContextValue {
  const ctx = useContext(ExplorerContext)
  if (!ctx) throw new Error('useExplorer debe usarse dentro de <ExplorerProvider>')
  return ctx
}

/** Reinicia el progreso (conserva identidad si está identificado) — botón "reiniciar progreso" */
export function useReiniciarProgreso() {
  const { dispatch } = useExplorer()
  return () => {
    borrarEstadoGuardado()
    dispatch({ type: 'REINICIAR_PROGRESO' })
  }
}

/**
 * Cierra sesión: termina la sesión de Supabase Auth (si la hay) y vuelve al
 * modo local/demo, sin tocar la fila real en la BD.
 */
export function useCerrarSesion() {
  const { dispatch, sesion } = useExplorer()
  return async () => {
    if (isSupabaseConfigured && sesion) {
      await cerrarSesionSupabase().catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error('[auth] no se pudo cerrar la sesión en Supabase:', error)
      })
    }
    borrarEstadoGuardado()
    dispatch({ type: 'CERRAR_SESION' })
  }
}
