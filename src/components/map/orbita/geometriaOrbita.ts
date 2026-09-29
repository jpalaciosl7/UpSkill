/**
 * geometriaOrbita.ts — matemática de la órbita de planetas: dónde va cada
 * planeta en el anillo, cuánto girar para traer uno al frente por el camino
 * más corto y qué tan "cerca" de la cámara queda cada uno. Lógica pura.
 */

/**
 * Ángulo (grados) del planeta `indice` en un anillo de `total` planetas.
 * @param indice posición 0…total−1
 * @param total cantidad de planetas
 */
export function anguloPlaneta(indice: number, total: number): number {
  return (360 / total) * indice
}

/**
 * Rotación del anillo que deja al planeta `objetivo` al frente, eligiendo la
 * vuelta más corta desde la rotación actual (de 6 a 1 avanza, no rebobina).
 * @param rotacionActual rotación actual del anillo en grados (puede acumular vueltas)
 * @param objetivo índice del planeta a enfocar
 * @param total cantidad de planetas
 */
export function rotacionHacia(rotacionActual: number, objetivo: number, total: number): number {
  const destino = -anguloPlaneta(objetivo, total)
  const diferencia = ((((destino - rotacionActual) % 360) + 540) % 360) - 180
  return rotacionActual + diferencia
}

/**
 * Cercanía a la cámara de un planeta: 1 al frente, 0 al fondo del anillo.
 * @param indice planeta
 * @param total cantidad de planetas
 * @param rotacion rotación actual del anillo en grados
 */
export function cercania(indice: number, total: number, rotacion: number): number {
  const radianes = ((anguloPlaneta(indice, total) + rotacion) * Math.PI) / 180
  return Math.round(((Math.cos(radianes) + 1) / 2) * 1000) / 1000
}

/**
 * Índice siguiente/anterior con vuelta al inicio/fin.
 * @param indice índice actual
 * @param paso +1 (siguiente) o −1 (anterior)
 * @param total cantidad de planetas
 */
export function indiceCiclico(indice: number, paso: number, total: number): number {
  return (((indice + paso) % total) + total) % total
}
