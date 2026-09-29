/**
 * HeroTexto.tsx — textos del hero: nombre de la experiencia, lema de
 * campaña, lema del viaje, descripción y acciones.
 */
import { NOMBRE_EXPERIENCIA, TAGLINE_CAMPANA, TAGLINE_JOURNEY } from '@/config/branding'
import { AccionesHero } from './AccionesHero'

/** Bloque de texto del hero (centrado en Covalto, a la izquierda en Espacial) */
export function HeroTexto() {
  return (
    <div className="espacial:lg:flex-1">
      <p className="text-sm font-medium uppercase tracking-widest opacity-80">{NOMBRE_EXPERIENCIA}</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{TAGLINE_CAMPANA}</h1>
      <p className="mt-4 text-lg opacity-90">{TAGLINE_JOURNEY}</p>
      <p className="mt-6 max-w-lg text-sm opacity-75">
        Embárcate en una ruta gamificada de capacitación en Inteligencia Artificial y lleva tu conocimiento a otro
        nivel. Completa misiones, gana XP y monedas, colecciona sellos y conviértete en referente IA.
      </p>
      <AccionesHero />
    </div>
  )
}
