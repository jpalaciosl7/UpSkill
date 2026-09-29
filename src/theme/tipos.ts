/**
 * tipos.ts — dominio del sistema de temas: qué temas existen, cuál es el de
 * partida y cómo se pasa de uno a otro.
 *
 * Decisión de marca ABIERTA (PRODUCT_SPEC §6): 'covalto' es la marca
 * empresarial (default) y 'espacial' la capa inmersiva de campaña; ninguno
 * reemplaza al otro, se alternan con el botón del header.
 */

/** Temas disponibles de la app */
export type Tema = 'covalto' | 'espacial'

/** Todos los temas, en el orden en que los recorre el botón */
export const TEMAS: readonly Tema[] = ['covalto', 'espacial']

/** Tema con el que arranca la app si no hay uno guardado */
export const TEMA_POR_DEFECTO: Tema = 'covalto'

/** Clave de localStorage donde se recuerda el tema (también la usa index.html) */
export const CLAVE_TEMA = 'explorador-ia-tema'

/**
 * Indica si un valor cualquiera es un tema válido.
 * @param valor lo leído de localStorage u otra fuente no confiable
 */
export function esTema(valor: unknown): valor is Tema {
  return typeof valor === 'string' && (TEMAS as readonly string[]).includes(valor)
}

/**
 * Devuelve el tema que sigue al actual (el botón recorre TEMAS en ciclo).
 * @param actual tema aplicado ahora
 */
export function temaSiguiente(actual: Tema): Tema {
  const indice = TEMAS.indexOf(actual)
  return TEMAS[(indice + 1) % TEMAS.length]
}
