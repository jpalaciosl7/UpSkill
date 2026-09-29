/**
 * CapaEstrellas.tsx — una capa del cielo: N estrellas pintadas con un solo
 * elemento (box-shadow) que deriva lentamente hacia arriba. Varias capas con
 * velocidades distintas dan la sensación de profundidad (parallax).
 */
import { useMemo, type CSSProperties } from 'react'
import { generarEstrellas } from './generarEstrellas'
import { sombrasEstrellas } from './sombrasEstrellas'

interface CapaEstrellasProps {
  cantidad: number
  /** Semilla del cielo de esta capa */
  semilla: number
  /** Tamaño máximo de estrella en px */
  tamanoMaximo: number
  /** Segundos para recorrer una pantalla: más lento = más lejano */
  duracionDeriva: number
  /** true para que las estrellas titilen */
  titila?: boolean
}

/** Capa de estrellas decorativa (sin interacción, oculta a lectores de pantalla) */
export function CapaEstrellas({ cantidad, semilla, tamanoMaximo, duracionDeriva, titila = false }: CapaEstrellasProps) {
  const sombras = useMemo(
    () => sombrasEstrellas(generarEstrellas(cantidad, semilla, tamanoMaximo)),
    [cantidad, semilla, tamanoMaximo],
  )
  const estilo = { boxShadow: sombras, '--duracion-deriva': `${duracionDeriva}s` } as CSSProperties

  return (
    <div className={titila ? 'espacio-titila absolute inset-0' : 'absolute inset-0'}>
      <div className="espacio-capa" style={estilo} />
    </div>
  )
}
