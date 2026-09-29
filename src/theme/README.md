# src/theme (+ src/config, src/styles) — tema, branding y estilos

Las tres carpetas implementan juntas el sistema de diseño y la decisión de
marca abierta ([`docs/PRODUCT_SPEC.md`](../../docs/PRODUCT_SPEC.md) §6–§7).

| Archivo | Responsabilidad |
|---|---|
| `src/theme/ThemeContext.tsx` | `ThemeProvider`, `useTheme` — flag `'covalto' \| 'espacial'` (default `covalto`), persistido en localStorage (`explorador-ia-tema`) y reflejado en `<html data-theme>` |
| `src/styles/index.css` | Tailwind v4 + fuentes auto-hospedadas + **tokens CSS por tema** (`:root[data-theme=…]`) mapeados a utilidades con `@theme inline` |
| `src/config/branding.ts` | `NOMBRE_EXPERIENCIA` (// PLACEHOLDER, nombre por confirmar), `NOMBRE_PROGRAMA`, taglines, `NOMBRE_MONEDA`, `NOMBRE_PASAPORTE` |
| `src/assets/espacial/` | arte de campaña (webp) + `index.ts` que lo exporta |

**Reglas:**

- Un color nuevo = un token nuevo, definido **en los dos temas**.
- El tema `covalto` es la marca; `espacial` es capa ilustrativa. No elimines
  ninguno: la decisión sigue abierta.
- Renombrar la experiencia = cambiar solo `NOMBRE_EXPERIENCIA`.
- Fuentes e íconos siempre auto-hospedados (sin CDN).
- Arte: sin IP de terceros; webp dimensionado al uso.

**Pruebas:** revisión visual de las pantallas en ambos temas (`pnpm dev`,
alternar en el header).
