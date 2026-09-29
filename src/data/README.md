# src/data — datos mock y servicio de acceso

**Responsabilidad:** el contenido del prototipo (niveles, módulos, ranking
ficticio, recompensas, autoevaluación) y la **única puerta** para leerlo.

| Archivo | Contenido |
|---|---|
| `levels.json` | 6 niveles (`id`, `slug`, `nombre`, `aaa`, `senalDominio`, `moduloIds`, `xpObjetivo`) |
| `modules.json` | 24 módulos (4 por nivel), `tipo: aprende \| aplica`, `xp`, `monedas`, `fuenteConceptual`, `variantesPorRol` opcional |
| `ranking.json` | leaderboard ficticio (sin personas reales) |
| `rewards.json` | recompensas **no monetarias**, todas `placeholder: true` |
| `evaluation.json` | escala 1–5, 5 preguntas D1–D5, umbrales puntaje → rango → nivel sugerido |
| `types.ts` | tipos de todos los JSON |
| `dataService.ts` | `getLevels`, `getLevelById`, `getLevelBySlug`, `getModulesByLevel(levelId, rol)`, `getModuleById`, `getRanking`, `getRewards`, `getEvaluationQuestions`, `getEvaluationThresholds`, `resolverUmbralPorPuntaje` |
| `levelIcons.ts` | ícono Material Symbols por nivel |
| `dataService.test.ts` | invariantes de los datos |

**Invariantes (las vigila `dataService.test.ts`):**

- 6 niveles, ids 1–6; cada uno con 3–5 módulos y `moduloIds` igual a los
  módulos de `modules.json` con ese `levelId`.
- `xpObjetivo` de cada nivel = suma del `xp` de sus módulos.
- **Métrica dual:** en cada nivel, todo módulo `aplica` vale más XP que
  cualquier `aprende`.
- Recompensas solo de categorías no monetarias.

**Reglas:** nadie fuera de este módulo importa los `.json`. Contenido con
títulos plausibles, sin datos internos inventados ni nombres reales. Las ramas
por rol (`variantesPorRol`) aplican desde el nivel 3.

**Pruebas:** `pnpm exec vitest run src/data`.
