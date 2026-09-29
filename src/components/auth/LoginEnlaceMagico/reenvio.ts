/**
 * reenvio.ts — espera entre enlaces mágicos. Supabase permite pedir un
 * enlace cada 60 s por usuario; la UI lo respeta para no mostrar errores
 * evitables.
 */
export const ESPERA_REENVIO_MS = 60_000

/** Segundos que faltan para poder pedir otro enlace (0 si ya se puede) */
export function segundosParaReenviar(enviadoEn: number | null, ahora: number): number {
  if (enviadoEn === null) return 0
  const restante = enviadoEn + ESPERA_REENVIO_MS - ahora
  return restante > 0 ? Math.ceil(restante / 1000) : 0
}
