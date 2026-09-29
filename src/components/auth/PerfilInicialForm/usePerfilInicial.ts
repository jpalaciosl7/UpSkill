/**
 * usePerfilInicial.ts — estado y guardado del perfil del primer ingreso
 * (nombre, alias, rol). El correo sale de la sesión y no se edita.
 */
import { useState, type FormEvent } from 'react'
import { crearPerfil } from '@/backend/usersService'
import { useExplorer } from '@/state/explorerContext'
import type { RolExplorador } from '@/state/types'

/** Campos del formulario y acciones para las vistas */
export interface PerfilInicial {
  nombre: string
  setNombre: (valor: string) => void
  alias: string
  setAlias: (valor: string) => void
  rol: RolExplorador
  setRol: (valor: RolExplorador) => void
  guardando: boolean
  error: string | null
  /** Valida y crea la fila propia; al terminar pasa a modo identificado */
  enviar: (evento: FormEvent) => Promise<void>
}

/** Maneja el formulario del perfil inicial de la cuenta con sesión */
export function usePerfilInicial(): PerfilInicial {
  const { estado, sesion, alPerfilCreado } = useExplorer()
  const [nombre, setNombre] = useState('')
  const [alias, setAlias] = useState('')
  const [rol, setRol] = useState<RolExplorador>(estado.rol)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /** Crea el perfil con progreso en cero; errores de BD → mensaje genérico en español */
  const enviar = async (evento: FormEvent) => {
    evento.preventDefault()
    setError(null)
    if (!sesion) return
    if (!nombre.trim()) return setError('Escribe tu nombre.')
    setGuardando(true)
    try {
      const fila = await crearPerfil({ userId: sesion.userId, correo: sesion.correo, nombre, alias: alias || undefined, rol })
      alPerfilCreado(fila)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[usuarios] no se pudo crear el perfil:', err)
      setError('No se pudo guardar tu perfil. Intenta de nuevo en unos minutos.')
    } finally {
      setGuardando(false)
    }
  }

  return { nombre, setNombre, alias, setAlias, rol, setRol, guardando, error, enviar }
}
