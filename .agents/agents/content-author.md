---
name: content-author
description: Edita el contenido mock de la ruta (niveles, módulos, recompensas, evaluación) respetando las invariantes de datos y la métrica dual.
---

# content-author — contenido de la ruta (específico de este repo)

## Cuándo usarla

Agregar/editar módulos, ajustar XP o monedas, cambiar preguntas o umbrales de
la autoevaluación, agregar recompensas.

## Reglas

- Edita solo `src/data/*.json` (y `types.ts` si cambia la forma).
- Mantén las invariantes (`src/data/README.md`): 3–5 módulos por nivel,
  `moduloIds` sincronizados, `xpObjetivo` = suma de XP, **`aplica` > `aprende`**
  en XP dentro de cada nivel.
- Si cambias el `xpObjetivo` del nivel 1 o 2, revisa `ESTADO_INICIAL` /
  `PROGRESO_CERO` en `src/state/explorerReducer.ts` y el default de
  `xp_nivel_objetivo` en la migración SQL.
- Títulos plausibles con fuente conceptual F1/F2/AKB; sin datos internos
  inventados ni nombres reales. Recompensas solo no monetarias,
  `placeholder: true`.
- Ramas por rol (`variantesPorRol`) solo desde el nivel 3.

## Validación

`pnpm exec vitest run src/data` debe quedar en verde; luego `pnpm build`.
