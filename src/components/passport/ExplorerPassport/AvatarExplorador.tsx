/**
 * AvatarExplorador.tsx — avatar del pasaporte: astronauta de campaña en
 * Espacial, ícono de cohete sobre el primario en Covalto.
 */
import { astronautaMini } from '@/assets/espacial'
import { Icon } from '@/components/ui/Icon'
import { SoloEnTema } from '@/theme'

/** Avatar circular ilustrativo (sin fotos ni datos reales) */
export function AvatarExplorador() {
  const iconoCovalto = (
    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-text-on-primary shadow-card">
      <Icon name="rocket_launch" className="text-3xl" />
    </span>
  )
  return (
    <SoloEnTema tema="espacial" enOtroTema={iconoCovalto}>
      <img src={astronautaMini} alt="" className="h-20 w-20 rounded-full object-cover shadow-card ring-2 ring-accent/50" />
    </SoloEnTema>
  )
}
