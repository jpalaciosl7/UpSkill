/**
 * EstadisticasExplorador.tsx — tarjetas de monedas, XP total, racha vigente y
 * rango debajo del pasaporte.
 */
import { Icon } from '@/components/ui/Icon'
import { NOMBRE_MONEDA } from '@/config/branding'
import { useExplorer } from '@/state/explorerContext'
import { fechaLocalISO, rachaVigente } from '@/state/racha'

/**
 * Una tarjeta de estadística; el ícono usa `text-accent-text` (ámbar legible).
 * @param icono nombre de Material Symbols
 */
function TarjetaEstadistica({ icono, etiqueta, valor }: { icono: string; etiqueta: string; valor: string }) {
  return (
    <div className="rounded-card bg-surface p-4 text-center shadow-card">
      <Icon name={icono} className="text-2xl text-accent-text" />
      <p className="mt-1 text-lg font-bold">{valor}</p>
      <p className="text-xs text-text-muted">{etiqueta}</p>
    </div>
  )
}

/** Cuadrícula de estadísticas del explorador */
export function EstadisticasExplorador() {
  const {
    estado: { xpTotal, monedas, racha, rango },
  } = useExplorer()

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <TarjetaEstadistica icono="monetization_on" etiqueta={NOMBRE_MONEDA} valor={monedas.toLocaleString('es-MX')} />
      <TarjetaEstadistica icono="bolt" etiqueta="XP total" valor={xpTotal.toLocaleString('es-MX')} />
      <TarjetaEstadistica
        icono="local_fire_department"
        etiqueta="Racha"
        valor={`${rachaVigente(racha, fechaLocalISO(new Date()))} días`}
      />
      <TarjetaEstadistica icono="military_tech" etiqueta="Rango" valor={rango} />
    </div>
  )
}
