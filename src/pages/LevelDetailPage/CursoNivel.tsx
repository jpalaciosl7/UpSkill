/**
 * CursoNivel.tsx — el curso de un nivel abierto: regreso al mapa, viaje entre
 * planetas (tema espacial), cabecera, aviso de sello y módulos.
 */
import { Link } from 'react-router-dom'
import { NavegacionPlanetas, reglaDesbloqueo, vecinosDeNivel } from '@/components/espacio/viaje'
import { ModuleCard } from '@/components/level/ModuleCard'
import { Icon } from '@/components/ui/Icon'
import { getLevels, getModulesByLevel } from '@/data/dataService'
import type { Level } from '@/data/types'
import { useExplorer } from '@/state/explorerContext'
import { SoloEnTema } from '@/theme'
import { AvisoSello } from './AvisoSello'
import { CabeceraNivel } from './CabeceraNivel'
import { useCompletarModulo } from './useCompletarModulo'

/** Contenido del nivel (se monta con key por nivel: el aviso no se arrastra entre planetas) */
export function CursoNivel({ nivel }: { nivel: Level }) {
  const {
    estado: { nivelActual, sellosObtenidos, modulosCompletados, rol },
  } = useExplorer()
  const modulos = getModulesByLevel(nivel.id, rol)
  const { completar, selloRecienObtenido } = useCompletarModulo(nivel, modulos)
  const completados = modulos.filter((m) => modulosCompletados.includes(m.id)).length
  const vecinos = vecinosDeNivel(getLevels(), nivel.id, reglaDesbloqueo(nivelActual, sellosObtenidos))

  return (
    <div className="space-y-6">
      <Link to="/mapa" className="flex items-center gap-1 text-sm text-text-muted hover:text-primary">
        <Icon name="arrow_back" className="text-[16px]" />
        Mapa de trayectoria
      </Link>
      <SoloEnTema tema="espacial">
        <NavegacionPlanetas vecinos={vecinos} />
      </SoloEnTema>
      <CabeceraNivel nivel={nivel} conSello={sellosObtenidos.includes(nivel.id)} completados={completados} totalModulos={modulos.length} />
      {selloRecienObtenido && <AvisoSello nivel={nivel} />}
      <div className="space-y-3">
        {modulos.map((modulo) => (
          <ModuleCard
            key={modulo.id}
            modulo={modulo}
            completado={modulosCompletados.includes(modulo.id)}
            onCompletar={() => completar(modulo.id)}
          />
        ))}
      </div>
    </div>
  )
}
