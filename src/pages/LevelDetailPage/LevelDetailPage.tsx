/**
 * LevelDetailPage.tsx — pantalla 4 (detalle de nivel, `/nivel/:levelId`):
 * resuelve el nivel de la URL y decide qué mostrar — no encontrado,
 * bloqueado o el curso.
 */
import { useParams } from 'react-router-dom'
import { reglaDesbloqueo } from '@/components/espacio/viaje'
import { getLevelById } from '@/data/dataService'
import { useExplorer } from '@/state/explorerContext'
import { CursoNivel } from './CursoNivel'
import { NivelBloqueado, NivelNoEncontrado } from './NivelNoDisponible'

/** Orquesta el detalle de nivel */
export function LevelDetailPage() {
  const { levelId } = useParams()
  const nivel = getLevelById(Number(levelId))
  const {
    estado: { nivelActual, sellosObtenidos },
  } = useExplorer()

  if (!nivel) return <NivelNoEncontrado />
  if (!reglaDesbloqueo(nivelActual, sellosObtenidos)(nivel)) return <NivelBloqueado nombre={nivel.nombre} />
  return <CursoNivel key={nivel.id} nivel={nivel} />
}
