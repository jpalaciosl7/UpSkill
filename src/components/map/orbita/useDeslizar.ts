/**
 * useDeslizar.ts — gesto de deslizar (dedo o mouse) para girar la órbita en
 * pantallas táctiles. Un arrastre horizontal de más de 40 px cuenta.
 */
import { useRef, type PointerEvent } from 'react'

/** Distancia mínima (px) para contar un deslizamiento */
const UMBRAL_PX = 40

/**
 * Devuelve manejadores de puntero para un contenedor.
 * @param alDeslizarIzquierda se llama al deslizar hacia la izquierda (siguiente)
 * @param alDeslizarDerecha se llama al deslizar hacia la derecha (anterior)
 */
export function useDeslizar(alDeslizarIzquierda: () => void, alDeslizarDerecha: () => void) {
  const inicioX = useRef<number | null>(null)

  return {
    onPointerDown: (evento: PointerEvent) => {
      inicioX.current = evento.clientX
    },
    onPointerUp: (evento: PointerEvent) => {
      if (inicioX.current === null) return
      const desplazamiento = evento.clientX - inicioX.current
      inicioX.current = null
      if (desplazamiento <= -UMBRAL_PX) alDeslizarIzquierda()
      if (desplazamiento >= UMBRAL_PX) alDeslizarDerecha()
    },
    onPointerCancel: () => {
      inicioX.current = null
    },
  }
}
