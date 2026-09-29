import { Icon } from '@/components/ui/Icon'

/** Aviso de /cuenta cuando no hay Supabase configurado (modo local/demo) */
export function AvisoSinBaseDatos() {
  return (
    <div className="rounded-card border border-dashed border-[var(--color-border)] bg-surface p-6 text-sm text-text-muted">
      <p className="flex items-center gap-2 font-semibold text-text">
        <Icon name="cloud_off" className="text-[18px]" />
        La base de datos no está conectada en este entorno
      </p>
      <p className="mt-2">
        Para entrar y guardar tu progreso real, define <code>VITE_SUPABASE_URL</code> y{' '}
        <code>VITE_SUPABASE_ANON_KEY</code> (ver README). Mientras tanto, el prototipo sigue funcionando en modo local
        con datos de demo.
      </p>
    </div>
  )
}
