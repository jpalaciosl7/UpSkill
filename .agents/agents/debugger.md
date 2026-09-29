---
name: debugger
description: Diagnostica fallas del prototipo (estado inconsistente, sincronización con Supabase, build/lint rotos) hasta la causa raíz.
---

# debugger — diagnóstico

## Sospechosos habituales en este repo

- **Estado raro al recargar:** localStorage (`explorador-ia-state`) con una
  forma vieja de `ExplorerState`. Borrar la clave o "reiniciar progreso";
  si la forma cambió, considerar migración/validación en `explorerStorage.ts`.
- **Progreso que "vuelve":** el refresco desde Supabase al montar
  (`explorerContext.tsx`) sobrescribe la caché con la fila real.
- **No sincroniza:** faltan `VITE_SUPABASE_*` (`console.warn` de `[supabase]`),
  RLS, o checks SQL (dominio, nivel 1–6, no negativos). Buscar
  `console.error('[usuarios] …')`.
- **Barra de XP incoherente:** `xpNivelObjetivo` no coincide con
  `levels.json`, o se despachó `completaNivel` mal calculado en
  `LevelDetailPage`.
- **Build roto:** `tsc -b` con `noUnusedLocals`/`verbatimModuleSyntax`
  (falta `import type`).

## Método

Reproduce (idealmente con una prueba que falle en `src/state` o `src/data`),
aísla la capa, corrige la causa y deja la prueba de regresión. Reporta causa,
arreglo y evidencia.
