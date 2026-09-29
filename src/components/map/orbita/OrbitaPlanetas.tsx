/**
 * OrbitaPlanetas.tsx — mapa del tema espacial (pantalla 3): los 6 niveles
 * como planetas en una órbita 3D que gira para traer al frente el planeta
 * elegido. Se navega con los botones ‹ ›, las flechas del teclado, deslizando
 * o haciendo clic en un planeta; un anuncio en vivo informa a lectores de
 * pantalla qué planeta quedó al frente.
 */
import './orbita.css'
import { getLevels, getModulesByLevel } from '@/data/dataService'
import { useExplorer } from '@/state/explorerContext'
import { calcularEstado } from '../estadoNodo'
import { ControlesOrbita } from './ControlesOrbita'
import { EscenaOrbital } from './EscenaOrbital'
import { TarjetaPlanetaEnfocado } from './TarjetaPlanetaEnfocado'
import { useDeslizar } from './useDeslizar'
import { useOrbita } from './useOrbita'

/** Orquesta la órbita: datos del progreso, navegación y ficha del planeta */
export function OrbitaPlanetas() {
  const {
    estado: { nivelActual, sellosObtenidos, modulosCompletados, rol },
  } = useExplorer()
  const niveles = getLevels()
  const estados = niveles.map((nivel) => calcularEstado(nivel, nivelActual, sellosObtenidos))
  const orbita = useOrbita(niveles.length, Math.max(0, niveles.findIndex((n) => n.id === nivelActual)))
  const deslizar = useDeslizar(orbita.siguiente, orbita.anterior)

  const nivel = niveles[orbita.enfocado]
  const modulos = getModulesByLevel(nivel.id, rol)
  const completados = modulos.filter((m) => modulosCompletados.includes(m.id)).length

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Órbita de niveles — usa las flechas para girar"
      tabIndex={0}
      onKeyDown={orbita.alPresionarTecla}
      className="space-y-4 rounded-card outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="touch-pan-y select-none" {...deslizar}>
        <EscenaOrbital niveles={niveles} estados={estados} enfocado={orbita.enfocado} rotacion={orbita.rotacion} alSeleccionar={orbita.irA} />
      </div>
      <ControlesOrbita enfocado={orbita.enfocado} total={niveles.length} alAnterior={orbita.anterior} alSiguiente={orbita.siguiente} />
      <p className="sr-only" aria-live="polite">
        Planeta al frente: nivel {nivel.id}, {nivel.nombre}, {estados[orbita.enfocado]}.
      </p>
      <TarjetaPlanetaEnfocado nivel={nivel} estado={estados[orbita.enfocado]} completados={completados} totalModulos={modulos.length} />
    </section>
  )
}
