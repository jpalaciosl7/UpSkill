/**
 * ExplorerPassport.tsx — Pasaporte del Explorador (pantalla 5): la metáfora
 * de pasaporte a dos páginas (perfil + sellos) y las estadísticas. En
 * Espacial se suma la ilustración del libro-pasaporte de campaña.
 */
import { pasaporteLibro } from '@/assets/espacial'
import { SoloEnTema } from '@/theme'
import { EstadisticasExplorador } from './EstadisticasExplorador'
import { PaginaPerfil } from './PaginaPerfil'
import { PaginaSellos } from './PaginaSellos'

/** Orquesta el pasaporte: ilustración (Espacial), páginas y estadísticas */
export function ExplorerPassport() {
  return (
    <div className="space-y-6">
      <SoloEnTema tema="espacial">
        <div className="flex justify-center rounded-card bg-surface p-3 shadow-card">
          <img
            src={pasaporteLibro}
            alt="Pasaporte del Explorador IA — ilustración de campaña"
            className="max-h-64 rounded-lg object-contain"
          />
        </div>
      </SoloEnTema>

      <div className="grid gap-4 rounded-card bg-surface-beige p-4 shadow-card md:grid-cols-[1fr_1.4fr] md:p-6">
        <PaginaPerfil />
        <PaginaSellos />
      </div>

      <EstadisticasExplorador />
    </div>
  )
}
