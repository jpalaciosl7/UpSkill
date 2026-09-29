/**
 * AppLayout.tsx — layout de todas las pantallas post-landing: fondo del tema,
 * Header con HUD persistente y el contenido de la ruta.
 */
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { FondoEspacial } from '@/components/espacio'
import { SoloEnTema } from '@/theme'

/**
 * Layout base. `isolate` crea el contexto de apilamiento para que el fondo
 * espacial (z-index negativo) quede detrás del contenido y no del body.
 */
export function AppLayout() {
  return (
    <div className="isolate min-h-screen text-text">
      <SoloEnTema tema="espacial">
        <FondoEspacial />
      </SoloEnTema>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
