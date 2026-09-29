/**
 * racha.ts — lógica pura de la racha de días (PRODUCT_SPEC §3/§5).
 *
 * Las fechas son strings 'yyyy-mm-dd' en la zona horaria LOCAL del
 * navegador (no UTC): con toISOString() un módulo completado a las 19:00
 * en CDMX (UTC-6) contaría como el día siguiente.
 *
 * Nada aquí llama a `new Date()` por su cuenta: quien despacha calcula
 * "hoy" con fechaLocalISO(new Date()) y lo pasa, así el reducer sigue
 * siendo puro y las pruebas son deterministas.
 */
import type { RachaExplorador } from './types'

function dosDigitos(n: number): string {
  return String(n).padStart(2, '0')
}

/** Fecha local 'yyyy-mm-dd' de un Date */
export function fechaLocalISO(fecha: Date): string {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`
}

/** Día anterior a una fecha 'yyyy-mm-dd' (cruza meses, años y bisiestos) */
export function diaAnterior(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split('-').map(Number)
  // El constructor local normaliza el día 0 al último día del mes anterior
  return fechaLocalISO(new Date(anio, mes - 1, dia - 1))
}

/**
 * Racha tras registrar actividad (completar un módulo) en la fecha `hoy`:
 *  - misma fecha que la última actividad → sin cambio
 *  - última actividad ayer → +1
 *  - última actividad más antigua → reinicia en 1
 *  - sin fecha registrada → +1 (el mock de demo 4 → 5; un explorador nuevo 0 → 1)
 */
export function calcularRacha(racha: RachaExplorador, hoy: string): RachaExplorador {
  if (racha.ultimaActividad === hoy) return racha
  if (racha.ultimaActividad === null || racha.ultimaActividad === diaAnterior(hoy)) {
    return { dias: racha.dias + 1, ultimaActividad: hoy }
  }
  return { dias: 1, ultimaActividad: hoy }
}

/**
 * Días de racha a MOSTRAR en la fecha `hoy`. Si la última actividad fue
 * antes de ayer, la racha está rota y se muestra 0 (el estado se corrige
 * en la siguiente actividad). Sin fecha registrada se muestra tal cual.
 */
export function rachaVigente(racha: RachaExplorador, hoy: string): number {
  if (racha.ultimaActividad === null) return racha.dias
  if (racha.ultimaActividad === hoy || racha.ultimaActividad === diaAnterior(hoy)) return racha.dias
  return 0
}
