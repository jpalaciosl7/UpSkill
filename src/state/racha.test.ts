/**
 * racha.test.ts — reglas de la racha de días (D1/D2 del plan de racha).
 */
import { describe, expect, it } from 'vitest'
import { calcularRacha, diaAnterior, fechaLocalISO, rachaVigente } from './racha'

describe('fechaLocalISO', () => {
  it('usa la fecha local, no UTC, incluso cerca de medianoche', () => {
    expect(fechaLocalISO(new Date(2026, 8, 28, 23, 59))).toBe('2026-09-28')
    expect(fechaLocalISO(new Date(2026, 0, 5, 0, 1))).toBe('2026-01-05')
  })
})

describe('diaAnterior', () => {
  it('resta un día dentro del mes', () => {
    expect(diaAnterior('2026-09-28')).toBe('2026-09-27')
  })

  it('cruza bordes de mes, de año y bisiestos', () => {
    expect(diaAnterior('2026-03-01')).toBe('2026-02-28')
    expect(diaAnterior('2027-01-01')).toBe('2026-12-31')
    expect(diaAnterior('2028-03-01')).toBe('2028-02-29')
  })
})

describe('calcularRacha', () => {
  const hoy = '2026-09-28'

  it('no cambia si ya hubo actividad hoy', () => {
    const racha = { dias: 3, ultimaActividad: hoy }
    expect(calcularRacha(racha, hoy)).toBe(racha)
  })

  it('suma un día si la última actividad fue ayer', () => {
    expect(calcularRacha({ dias: 3, ultimaActividad: '2026-09-27' }, hoy)).toEqual({ dias: 4, ultimaActividad: hoy })
  })

  it('reinicia en 1 si la última actividad fue antes de ayer', () => {
    expect(calcularRacha({ dias: 9, ultimaActividad: '2026-09-20' }, hoy)).toEqual({ dias: 1, ultimaActividad: hoy })
  })

  it('sin fecha registrada suma un día (demo 4 → 5, explorador nuevo 0 → 1)', () => {
    expect(calcularRacha({ dias: 4, ultimaActividad: null }, hoy)).toEqual({ dias: 5, ultimaActividad: hoy })
    expect(calcularRacha({ dias: 0, ultimaActividad: null }, hoy)).toEqual({ dias: 1, ultimaActividad: hoy })
  })
})

describe('rachaVigente', () => {
  const hoy = '2026-09-28'

  it('muestra los días si la última actividad fue hoy o ayer', () => {
    expect(rachaVigente({ dias: 5, ultimaActividad: hoy }, hoy)).toBe(5)
    expect(rachaVigente({ dias: 5, ultimaActividad: '2026-09-27' }, hoy)).toBe(5)
  })

  it('muestra 0 si la racha se rompió', () => {
    expect(rachaVigente({ dias: 5, ultimaActividad: '2026-09-26' }, hoy)).toBe(0)
  })

  it('sin fecha registrada muestra los días tal cual', () => {
    expect(rachaVigente({ dias: 4, ultimaActividad: null }, hoy)).toBe(4)
  })
})
