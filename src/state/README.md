# src/state — estado global del explorador

**Responsabilidad:** el único estado de la app (el "explorador": identidad,
nivel, XP, monedas, racha, módulos, sellos, recompensas) y su persistencia.

| Archivo | Qué expone |
|---|---|
| `types.ts` | `ExplorerState`, `RangoExplorador`, `RolExplorador`, `ID_EXPLORADOR_MOCK` |
| `explorerReducer.ts` | `explorerReducer`, `ESTADO_INICIAL` (mock de demo), tipo `ExplorerAction` |
| `explorerContext.tsx` | `ExplorerProvider`, `useExplorer` (`estado`, `dispatch`, `sesion`, `cargandoSesion`, `perfilPendiente`, `alPerfilCreado`), `useReiniciarProgreso`, `useCerrarSesion` (también cierra la sesión de Supabase Auth) |
| `sesion.ts` | decisiones puras de sesión: `resolverSesion` (sin sesión / perfil pendiente / identificado) y `debeSincronizar` |
| `explorerStorage.ts` | leer/guardar/borrar en localStorage (`explorador-ia-state`) |
| `racha.ts` | lógica pura de la racha: `fechaLocalISO`, `diaAnterior`, `calcularRacha`, `rachaVigente` |
| `explorerReducer.test.ts` / `racha.test.ts` | pruebas de comportamiento del reducer y de la racha |

**Racha:** `COMPLETAR_MODULO` lleva `fecha` (local, `yyyy-mm-dd`, calculada por
quien despacha con `fechaLocalISO(new Date())`) y el reducer aplica
`calcularRacha`: misma fecha → sin cambio; ayer → +1; más antigua → 1; sin fecha
→ +1. Solo completar módulos cuenta como actividad. Para mostrarla, usa
`rachaVigente(racha, hoy)`, que da 0 si la última actividad fue antes de ayer.

**Reglas:**

- El reducer es **puro** y contiene las guardas de negocio (sin doble conteo,
  no gastar más monedas de las que hay, la evaluación no quita progreso, el
  nivel 6 no avanza). Toda regla nueva va aquí, con prueba.
- El contexto hace la persistencia dual: localStorage siempre; con Supabase
  configurado se suscribe a la sesión de Auth (`alCambiarSesion`), carga la
  fila propia por `user_id` (o marca `perfilPendiente`) y sincroniza con
  debounce de 500 ms solo cuando `debeSincronizar` (el estado en pantalla es el
  de la cuenta con sesión). No importa `@supabase/supabase-js`: habla con
  `@/backend/authService`, `@/backend/usersService` y `@/backend/mapping`.
- Si agregas un campo a `ExplorerState`, actualiza también `ESTADO_INICIAL`,
  `PROGRESO_CERO`, `src/backend/mapping.ts`, `src/backend/types.ts` y (si
  persiste) una migración nueva en `supabase/migrations/`.

**Pruebas:** `pnpm exec vitest run src/state`. Ver
[`docs/TESTING_GUIDE.md`](../../docs/TESTING_GUIDE.md).
