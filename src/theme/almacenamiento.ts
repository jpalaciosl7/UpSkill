/**
 * almacenamiento.ts — recordar el tema elegido entre visitas (localStorage).
 *
 * Tolerante a fallos: en modo privado, sin cuota o con un valor corrupto, la
 * app sigue funcionando con el tema por defecto.
 */
import { CLAVE_TEMA, TEMA_POR_DEFECTO, esTema, type Tema } from './tipos'

/** Lo mínimo que necesitamos de un almacén tipo localStorage */
type AlmacenLectura = Pick<Storage, 'getItem'>
type AlmacenEscritura = Pick<Storage, 'setItem'>

/** localStorage si existe y es accesible; null en SSR/pruebas o si el navegador lo bloquea */
function almacenPorDefecto(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

/**
 * Lee el tema guardado.
 * @param almacen almacén a usar (por defecto localStorage)
 * @returns el tema guardado, o TEMA_POR_DEFECTO si no hay uno válido
 */
export function leerTemaGuardado(almacen: AlmacenLectura | null = almacenPorDefecto()): Tema {
  try {
    const guardado = almacen?.getItem(CLAVE_TEMA)
    return esTema(guardado) ? guardado : TEMA_POR_DEFECTO
  } catch {
    return TEMA_POR_DEFECTO
  }
}

/**
 * Guarda el tema elegido. Si el almacén falla, no pasa nada: solo no se recuerda.
 * @param tema tema a recordar
 * @param almacen almacén a usar (por defecto localStorage)
 */
export function guardarTema(tema: Tema, almacen: AlmacenEscritura | null = almacenPorDefecto()): void {
  try {
    almacen?.setItem(CLAVE_TEMA, tema)
  } catch {
    // Sin persistencia (modo privado / cuota): el tema vale solo para esta visita
  }
}
