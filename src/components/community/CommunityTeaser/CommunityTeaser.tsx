/**
 * CommunityTeaser.tsx — tarjeta teaser de la capa social (pantalla 8):
 * foros, retos, Hackatón, Día IA. // PLACEHOLDER: sin backend todavía.
 */
import { CabeceraTeaser } from './CabeceraTeaser'
import { ImagenCampana } from './ImagenCampana'

interface CommunityTeaserProps {
  icono: string
  titulo: string
  descripcion: string
  etiqueta: string
  cta: string
  /** Tarjeta resaltada con el color primario */
  destacado?: boolean
  /** Ilustración de campaña para la tarjeta destacada (solo tema espacial) */
  imagenEspacial?: string
}

/** Tarjeta de comunidad; la destacada deja espacio a la ilustración en Espacial */
export function CommunityTeaser({ icono, titulo, descripcion, etiqueta, cta, destacado = false, imagenEspacial }: CommunityTeaserProps) {
  const conImagen = destacado && Boolean(imagenEspacial)
  return (
    <div
      className={`relative flex flex-col gap-3 overflow-hidden rounded-card p-6 shadow-card ${
        destacado ? 'bg-primary text-text-on-primary' : 'border border-border bg-surface'
      }`}
    >
      {conImagen && imagenEspacial && <ImagenCampana src={imagenEspacial} />}
      <CabeceraTeaser icono={icono} etiqueta={etiqueta} destacado={destacado} />
      <h3 className={`text-lg font-bold ${conImagen ? 'espacial:max-w-[65%]' : ''}`}>{titulo}</h3>
      <p className={`text-sm ${conImagen ? 'espacial:max-w-[75%]' : ''} ${destacado ? 'opacity-90' : 'text-text-muted'}`}>
        {descripcion}
      </p>
      <button
        type="button"
        className={`relative mt-auto self-start rounded-full px-4 py-1.5 text-sm font-semibold ${
          destacado ? 'bg-accent text-text-on-accent' : 'bg-surface-mint text-primary'
        }`}
      >
        {cta}
      </button>
    </div>
  )
}
