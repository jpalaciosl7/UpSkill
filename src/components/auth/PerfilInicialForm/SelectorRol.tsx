/**
 * SelectorRol.tsx — elegir la ruta (rol técnico / no técnico) con botones
 * tipo píldora sobre radios nativos (accesibles con teclado).
 */
import type { RolExplorador } from '@/state/types'

/** Opciones de rol en el orden en que se muestran */
const ROLES: { valor: RolExplorador; etiqueta: string }[] = [
  { valor: 'no_tecnico', etiqueta: 'Rol no técnico' },
  { valor: 'tecnico', etiqueta: 'Rol técnico' },
]

/**
 * Grupo de radios para el rol.
 * @param rol rol seleccionado
 * @param alCambiar se llama con el rol elegido
 */
export function SelectorRol({ rol, alCambiar }: { rol: RolExplorador; alCambiar: (rol: RolExplorador) => void }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-1 font-medium">Tu ruta</legend>
      <div className="flex flex-wrap gap-2">
        {ROLES.map((opcion) => (
          <label
            key={opcion.valor}
            className={`cursor-pointer rounded-full border px-4 py-1.5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40 ${
              rol === opcion.valor
                ? 'border-primary bg-surface-mint font-semibold text-primary'
                : 'border-border-strong text-text-muted'
            }`}
          >
            <input
              type="radio"
              name="rol"
              value={opcion.valor}
              checked={rol === opcion.valor}
              onChange={() => alCambiar(opcion.valor)}
              className="sr-only"
            />
            {opcion.etiqueta}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
