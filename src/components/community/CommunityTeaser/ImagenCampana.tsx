/**
 * ImagenCampana.tsx — ilustración de campaña en la esquina de la tarjeta
 * destacada, solo en el tema espacial.
 */
import { SoloEnTema } from '@/theme'

/**
 * Imagen decorativa (texto alternativo vacío).
 * @param src ruta del arte de campaña
 */
export function ImagenCampana({ src }: { src: string }) {
  return (
    <SoloEnTema tema="espacial">
      <img src={src} alt="" className="pointer-events-none absolute -right-3 -top-3 w-28 opacity-95 sm:w-32" />
    </SoloEnTema>
  )
}
