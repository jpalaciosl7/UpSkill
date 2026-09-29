/**
 * NivelNoDisponible.tsx — pantallas del detalle de nivel cuando no se puede
 * abrir: el nivel no existe o todavía está bloqueado.
 */
import { Link } from 'react-router-dom'
import { PlaceholderScreen } from '@/components/ui/PlaceholderScreen'

/** El id de la URL no corresponde a ningún nivel */
export function NivelNoEncontrado() {
  return (
    <PlaceholderScreen
      icono="error"
      titulo="Nivel no encontrado"
      bloque={5}
      descripcion="Este nivel no existe en la trayectoria. Vuelve al mapa para elegir uno válido."
    />
  )
}

/**
 * El nivel existe pero aún no se desbloquea.
 * @param nombre nombre del nivel
 */
export function NivelBloqueado({ nombre }: { nombre: string }) {
  return (
    <div className="space-y-4">
      <PlaceholderScreen
        icono="lock"
        titulo={`${nombre} está bloqueado`}
        bloque={4}
        descripcion="Completa los niveles anteriores en el mapa de trayectoria para desbloquear este contenido."
      />
      <div className="text-center">
        <Link to="/mapa" className="text-sm font-medium text-primary underline underline-offset-4">
          Volver al mapa
        </Link>
      </div>
    </div>
  )
}
