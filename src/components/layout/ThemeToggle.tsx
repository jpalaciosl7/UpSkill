/**
 * ThemeToggle.tsx — botón visible para alternar el tema en vivo (Covalto ↔
 * Espacial). La decisión de marca sigue abierta (PRODUCT_SPEC §6): ambos temas
 * conviven y se eligen aquí.
 */
import { Icon } from '@/components/ui/Icon'
import { PRESENTACION_TEMA, temaSiguiente, useTheme } from '@/theme'

/** Muestra el tema actual y, al hacer clic, pasa al siguiente */
export function ThemeToggle() {
  const { tema, alternarTema } = useTheme()
  const actual = PRESENTACION_TEMA[tema]
  const siguiente = PRESENTACION_TEMA[temaSiguiente(tema)]

  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label={`${actual.nombre} activo. Cambiar a ${siguiente.nombre}`}
      title={`Cambiar a ${siguiente.nombre}`}
      className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text shadow-card transition hover:shadow-card-hover"
    >
      <Icon name={actual.icono} className="text-[18px]" />
      <span className="hidden sm:inline">{actual.nombre}</span>
    </button>
  )
}
