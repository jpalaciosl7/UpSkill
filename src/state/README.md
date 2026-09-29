# src/state — estado global del explorador

**Responsabilidad:** el único estado de la app (el "explorador": identidad,
nivel, XP, monedas, racha, módulos, sellos, recompensas) y su persistencia.

| Archivo | Qué expone |
|---|---|
| `types.ts` | `ExplorerState`, `RangoExplorador`, `RolExplorador`, `ID_EXPLORADOR_MOCK` |
| `explorerReducer.ts` | `explorerReducer`, `ESTADO_INICIAL` (mock de demo), tipo `ExplorerAction` |
| `explorerContext.tsx` | `ExplorerProvider`, `useExplorer`, `useReiniciarProgreso`, `useCerrarSesion` |
| `explorerStorage.ts` | leer/guardar/borrar en localStorage (`explorador-ia-state`) |
| `explorerReducer.test.ts` | pruebas de comportamiento del reducer |

**Reglas:**

- El reducer es **puro** y contiene las guardas de negocio (sin doble conteo,
  no gastar más monedas de las que hay, la evaluación no quita progreso, el
  nivel 6 no avanza). Toda regla nueva va aquí, con prueba.
- El contexto hace la persistencia dual: localStorage siempre; Supabase con
  debounce de 500 ms si hay `correo` y la BD está configurada. No importa
  `@supabase/supabase-js`: habla con `@/backend/usersService` y
  `@/backend/mapping`.
- Si agregas un campo a `ExplorerState`, actualiza también `ESTADO_INICIAL`,
  `PROGRESO_CERO`, `src/backend/mapping.ts`, `src/backend/types.ts` y (si
  persiste) una migración nueva en `supabase/migrations/`.

**Pruebas:** `pnpm exec vitest run src/state`. Ver
[`docs/TESTING_GUIDE.md`](../../docs/TESTING_GUIDE.md).
