/**
 * IlustracionHero.tsx — astronauta del arte de campaña, solo en el tema
 * espacial (el tema Covalto se queda con la marca pura, sin ilustración).
 */
import { astronautaHero } from '@/assets/espacial'
import { SoloEnTema } from '@/theme'

/** Ilustración decorativa del hero (texto alternativo vacío: no aporta información) */
export function IlustracionHero() {
  return (
    <SoloEnTema tema="espacial">
      <img src={astronautaHero} alt="" className="mt-12 w-full max-w-xs shrink-0 drop-shadow-2xl lg:mt-0 lg:max-w-sm" />
    </SoloEnTema>
  )
}
