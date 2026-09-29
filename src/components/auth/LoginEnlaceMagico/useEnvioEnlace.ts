/**
 * useEnvioEnlace.ts — estado y efectos del envío del enlace mágico: a qué
 * correo se envió, la cuenta regresiva para reenviar y el error, si lo hay.
 */
import { useEffect, useState } from 'react'
import { enviarEnlaceMagico } from '@/backend/authService'
import { validarCorreoCovalto } from '@/backend/usersService'
import { segundosParaReenviar } from './reenvio'

/** Lo que el hook ofrece a las vistas del login */
export interface EnvioEnlace {
  enviando: boolean
  /** Correo al que se envió el último enlace; null si aún no se envía */
  enviadoA: string | null
  /** Segundos para poder reenviar (0 = ya se puede) */
  espera: number
  error: string | null
  /** Pide el enlace para un correo (valida el dominio antes) */
  pedirEnlace: (correo: string) => Promise<void>
  /** Vuelve al formulario para escribir otro correo */
  usarOtroCorreo: () => void
}

/** Maneja el envío del enlace mágico y la espera entre envíos */
export function useEnvioEnlace(): EnvioEnlace {
  const [enviando, setEnviando] = useState(false)
  const [enviadoA, setEnviadoA] = useState<string | null>(null)
  const [enviadoEn, setEnviadoEn] = useState<number | null>(null)
  const [ahora, setAhora] = useState(() => Date.now())
  const [error, setError] = useState<string | null>(null)
  const espera = segundosParaReenviar(enviadoEn, ahora)

  // Reloj de la cuenta regresiva, solo mientras hay espera activa
  useEffect(() => {
    if (espera === 0) return
    const intervalo = setInterval(() => setAhora(Date.now()), 1000)
    return () => clearInterval(intervalo)
  }, [espera])

  /** Valida y envía; guarda cuándo se envió para la espera de 60 s */
  const pedirEnlace = async (correo: string) => {
    setError(null)
    if (!validarCorreoCovalto(correo)) return setError('El correo debe ser del dominio @covalto.com')
    setEnviando(true)
    try {
      await enviarEnlaceMagico(correo)
      const momento = Date.now()
      setEnviadoA(correo.trim().toLowerCase())
      setEnviadoEn(momento)
      setAhora(momento)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el enlace. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  /** Limpia el envío para volver al formulario */
  const usarOtroCorreo = () => {
    setEnviadoA(null)
    setError(null)
  }

  return { enviando, enviadoA, espera, error, pedirEnlace, usarOtroCorreo }
}
