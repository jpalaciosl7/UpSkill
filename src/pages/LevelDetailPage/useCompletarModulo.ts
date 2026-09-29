/**
 * useCompletarModulo.ts — completar un módulo del nivel: arma la acción
 * COMPLETAR_MODULO con la fecha local (racha) y, si era el último del nivel,
 * el sello y el desbloqueo del siguiente (máximo nivel 6).
 */
import { useState } from 'react'
import { getLevelById } from '@/data/dataService'
import type { Level, Module } from '@/data/types'
import { useExplorer } from '@/state/explorerContext'
import { fechaLocalISO } from '@/state/racha'

/** Último nivel de la trayectoria */
export const NIVEL_MAXIMO = 6

/**
 * Devuelve la acción de completar y si se acaba de obtener el sello del nivel.
 * @param nivel nivel abierto
 * @param modulos módulos del nivel (ya con la variante de rol)
 */
export function useCompletarModulo(nivel: Level, modulos: Module[]) {
  const {
    estado: { modulosCompletados },
    dispatch,
  } = useExplorer()
  const [selloRecienObtenido, setSelloRecienObtenido] = useState(false)

  /** Completa un módulo (idempotente: ignora los ya completados) */
  const completar = (moduloId: string) => {
    const modulo = modulos.find((m) => m.id === moduloId)
    if (!modulo || modulosCompletados.includes(moduloId)) return
    const esUltimo = modulos.every((m) => m.id === moduloId || modulosCompletados.includes(m.id))
    const siguienteNivelId = Math.min(nivel.id + 1, NIVEL_MAXIMO)

    dispatch({
      type: 'COMPLETAR_MODULO',
      moduloId: modulo.id,
      xp: modulo.xp,
      monedas: modulo.monedas,
      fecha: fechaLocalISO(new Date()),
      completaNivel: esUltimo
        ? {
            nivelId: nivel.id,
            siguienteNivelId,
            siguienteXpObjetivo: getLevelById(siguienteNivelId)?.xpObjetivo ?? nivel.xpObjetivo,
          }
        : undefined,
    })
    if (esUltimo) setSelloRecienObtenido(true)
  }

  return { completar, selloRecienObtenido }
}
