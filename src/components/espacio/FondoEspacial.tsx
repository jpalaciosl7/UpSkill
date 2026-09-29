/**
 * FondoEspacial.tsx — el espacio exterior detrás de toda la app (tema
 * espacial): nebulosa, tres capas de estrellas a distintas velocidades
 * (lejanas lentas y pequeñas, cercanas rápidas y grandes) y una viñeta que
 * oscurece los bordes. Decorativo: no recibe clics ni lo leen los lectores
 * de pantalla. Con "reducir movimiento" queda quieto (src/styles/movimiento.css).
 *
 * Se monta con posición fija y z-index negativo dentro de un contenedor con
 * `isolate` (AppLayout, LandingPage), así queda detrás del contenido.
 */
import './espacio.css'
import { CapaEstrellas } from './CapaEstrellas'
import { Nebulosa } from './Nebulosa'

/** Capas del cielo: de la más lejana a la más cercana */
const CAPAS = [
  { cantidad: 140, semilla: 11, tamanoMaximo: 1.5, duracionDeriva: 360 },
  { cantidad: 70, semilla: 23, tamanoMaximo: 2, duracionDeriva: 220, titila: true },
  { cantidad: 30, semilla: 37, tamanoMaximo: 3, duracionDeriva: 130 },
] as const

/** Fondo inmersivo de espacio exterior */
export function FondoEspacial() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <Nebulosa />
      {CAPAS.map((capa) => (
        <CapaEstrellas key={capa.semilla} {...capa} />
      ))}
      <div className="espacio-vineta absolute inset-0" />
    </div>
  )
}
