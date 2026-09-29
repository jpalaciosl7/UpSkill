/**
 * reenvio.test.ts — espera de 60 s entre enlaces mágicos.
 */
import { describe, expect, it } from 'vitest'
import { segundosParaReenviar } from './reenvio'

describe('segundosParaReenviar', () => {
  it('sin envío previo se puede pedir de inmediato', () => {
    expect(segundosParaReenviar(null, 1_000)).toBe(0)
  })

  it('cuenta hacia atrás en segundos redondeando hacia arriba', () => {
    expect(segundosParaReenviar(0, 0)).toBe(60)
    expect(segundosParaReenviar(0, 59_001)).toBe(1)
  })

  it('pasados 60 s ya se puede reenviar', () => {
    expect(segundosParaReenviar(0, 60_000)).toBe(0)
    expect(segundosParaReenviar(0, 90_000)).toBe(0)
  })
})
