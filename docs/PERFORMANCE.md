# PERFORMANCE — rendimiento

Prototipo estático de demo: el rendimiento importa en la **primera carga** y en
la fluidez de la demo, no en escala.

## Estado actual (build del 2026-09-28)

| Asset | Tamaño | Nota |
|---|---|---|
| JS principal (`index-*.js`) | ~333 kB (~113 kB gzip) | React + router + supabase-js + app |
| CSS (`index-*.css`) | ~39 kB (~7.5 kB gzip) | Tailwind v4 |
| `material-symbols-outlined-*.woff2` | **~3.96 MB** | fuente variable completa de íconos — el asset más pesado |
| Noto Sans (4 pesos × subsets) | ~45–85 kB por archivo | solo se descargan los subsets que usa la página |
| Arte espacial (`src/assets/espacial/*.webp`) | 1.6–34 kB c/u | ya optimizado en webp |

## Puntos sensibles

- **Fuente de íconos (~4 MB):** es el principal costo de primera carga. Si hace
  falta optimizar, opciones en orden de esfuerzo: subset de la fuente a los
  íconos usados, o SVGs inline por ícono. Cualquier opción debe seguir siendo
  auto-hospedada (sin CDN, guardrail §9).
- **Sincronización con Supabase:** debounce de 500 ms en `explorerContext.tsx`
  para no escribir en cada acción; el refresco al montar compara JSON antes de
  despachar para evitar ciclos de escritura. No quites ninguna de las dos
  guardas.
- **Ranking real:** `listarRankingUsuarios(20)` usa el índice
  `usuarios_xp_total_idx`; mantén el `limit`.
- **Datos mock:** los JSON se importan en el bundle (~15 kB); sin costo de red.

## Pendientes (TODO — por validar)

- **TODO(perf) · Fuente de íconos Material Symbols (~3.96 MB).** *Registrado el
  2026-09-28; **no implementado** por decisión del owner — se valida después.*
  - **Problema:** `@import 'material-symbols/outlined.css'` en
    `src/styles/index.css` empaqueta la fuente variable completa
    (`material-symbols-outlined-*.woff2` ≈ 3,964 kB en `pnpm build`), aunque la
    app usa unas pocas decenas de íconos.
  - **Opciones a evaluar:** (1) subset de la fuente a los íconos realmente
    usados (lista obtenible buscando `<Icon name="…">` y los `icono=` en
    `src/`); (2) reemplazar la fuente por SVGs inline por ícono dentro de
    `src/components/ui/Icon.tsx`.
  - **Restricción:** cualquier opción debe seguir **auto-hospedada** (sin CDN,
    guardrail §9) y mantener el componente `<Icon name="…" />` como única API.
  - **Criterio de validación:** el asset de íconos baja de forma significativa
    en la salida de `pnpm build`, todos los íconos se siguen viendo en ambos
    temas y `pnpm lint && pnpm test && pnpm build` queda en verde.

## Presupuestos sugeridos

- No crecer el JS principal más de ~20% sin justificación (p. ej. no agregar
  librerías de UI/animación pesadas para un efecto).
- Imágenes nuevas en **webp** y dimensionadas al uso real.
