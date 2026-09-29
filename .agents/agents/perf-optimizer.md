---
name: perf-optimizer
description: Mide y reduce el costo de primera carga del prototipo (bundle, fuentes, imágenes) sin romper los guardrails de auto-hospedaje.
---

# perf-optimizer — rendimiento

## Método

1. Mide: `pnpm build` y lee la tabla de assets que imprime Vite. Compara con
   la línea base de `docs/PERFORMANCE.md`.
2. Ataca el mayor costo primero — hoy la fuente de Material Symbols (~4 MB).
3. Toda optimización mantiene fuentes/íconos **auto-hospedados** (sin CDN).
4. Re-mide y actualiza `docs/PERFORMANCE.md` con los números nuevos.

## Límites

No agrega dependencias sin aprobación. No quita el debounce ni la
comparación previa al despacho en `explorerContext.tsx`.
