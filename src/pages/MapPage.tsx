/**
 * MapPage.tsx — pantalla 3 (mapa de trayectoria, `/mapa`): encabezado con el
 * nivel actual, el mapa del tema (órbita 3D en Espacial, fila lineal en
 * Covalto) y la leyenda de estados.
 */
import { TrajectoryMap } from '@/components/map/lineal'
import { OrbitaPlanetas } from '@/components/map/orbita'
import { SoloEnTema } from '@/theme'
import { Icon } from '@/components/ui/Icon'
import { getLevels } from '@/data/dataService'
import { useExplorer } from '@/state/explorerContext'

/** Leyenda de estados de nivel (colores de los tokens node-*) */
const LEYENDA: { estado: string; icono: string; clase: string; texto: string }[] = [
  { estado: 'completado', icono: 'check', clase: 'bg-node-done', texto: 'Completado' },
  { estado: 'activo', icono: 'my_location', clase: 'bg-node-active', texto: 'En curso' },
  { estado: 'bloqueado', icono: 'lock', clase: 'bg-node-locked', texto: 'Bloqueado' },
]

/** Mapa de trayectoria con el mapa que corresponde al tema activo */
export function MapPage() {
  const {
    estado: { nivelActual, rango },
  } = useExplorer()
  const nivelActivo = getLevels().find((n) => n.id === nivelActual)

  return (
    <div className="space-y-8">
      <div className="rounded-card border border-[var(--color-border)] bg-surface p-6 shadow-card">
        <p className="text-sm text-text-muted">Tu trayectoria · rango {rango}</p>
        <h1 className="titular-degradado mt-1 text-2xl font-bold">
          {nivelActivo ? `Estás en el Nivel ${nivelActivo.id} · ${nivelActivo.nombre}` : 'Trayectoria completa'}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {nivelActivo?.senalDominio ?? 'Has recorrido los 6 niveles de la ruta Explorador IA.'}
        </p>
      </div>

      {/* Espacial: órbita 3D giratoria · Covalto: trayectoria lineal */}
      <SoloEnTema tema="espacial" enOtroTema={<TrajectoryMap />}>
        <OrbitaPlanetas />
      </SoloEnTema>

      <div className="flex flex-wrap items-center gap-4 rounded-card bg-surface-beige px-4 py-3 text-sm text-text-muted">
        <Icon name="info" className="text-[18px]" />
        {LEYENDA.map((item) => (
          <span key={item.estado} className="flex items-center gap-1.5">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-text-on-accent ${item.clase}`}>
              <Icon name={item.icono} className="text-[12px]" />
            </span>
            {item.texto}
          </span>
        ))}
      </div>
    </div>
  )
}
