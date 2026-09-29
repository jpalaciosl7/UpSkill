# TESTING_GUIDE — pruebas y validación

La suite es **Vitest 5** (agregada el 2026-09-28). Es chica y rápida: la suite
completa corre en menos de 1 s. **Mientras siga así, corre la suite completa
en vez de seleccionar**; los comandos acotados están para cuando crezca o para
iterar.

Todos los comandos se corren desde la **raíz del repo**. Si `pnpm` no está en
el PATH, antepone `corepack` (`corepack pnpm test`).

## Capacidades actuales (verificadas)

### Comandos completos

| Qué | Comando | Evidencia de una corrida correcta |
|---|---|---|
| Pruebas | `pnpm test` (`vitest run`) | `Test Files 15 passed (15)`, `Tests 132 passed (132)` (2026-09-29) |
| Lint | `pnpm lint` (`oxlint`) | 0 errores; warnings `max-lines` solo en archivos pendientes del refactor SRP |
| Typecheck | `pnpm typecheck` (`tsc -b`) | sin salida, exit 0 |
| Build | `pnpm build` (`tsc -b && vite build`) | `✓ built in …` |

### Comandos acotados (Vitest 5.0.2, oxlint 1.85)

| Patrón | Ejemplo en este repo | Evidencia verificada |
|---|---|---|
| Por carpeta | `pnpm exec vitest run src/state` | 3 archivos, **30 pruebas** ejecutadas |
| Por archivo | `pnpm exec vitest run src/data/dataService.test.ts` | 1 archivo, 7 pruebas |
| Por nombre | `pnpm exec vitest run -t "CANJEAR_RECOMPENSA"` | **2 pasan, 130 omitidas** (solo ese `describe`) |
| Relacionadas con un fuente | `pnpm exec vitest related --run src/state/explorerReducer.ts` | selecciona 3 archivos que lo importan: **23 pruebas** |
| Lint acotado | `pnpm exec oxlint src/state` | lint solo de esa carpeta (3 warnings conocidos) |

- **Typecheck acotado no existe** en la práctica: `tsc -b` es de proyecto
  completo (y es rápido). Úsalo siempre entero.
- Una corrida acotada que dice `No test files found` **no** cuenta como
  verificación: corrige el selector o corre la suite completa.

## Mapeo fuente → prueba

Regla: **prueba co-ubicada** `<archivo>.test.ts` junto al archivo fuente.

| Fuente tocado | Pruebas a correr |
|---|---|
| `src/state/explorerReducer.ts`, `src/state/types.ts` | `src/state/explorerReducer.test.ts` |
| `src/state/sesion.ts`, `src/state/explorerContext.tsx` | `src/state/sesion.test.ts` (el Provider no tiene prueba de React: typecheck + recorrido manual) |
| `src/state/racha.ts` | `src/state/racha.test.ts` + `src/state/explorerReducer.test.ts` (consumidor) |
| `src/data/*.json`, `src/data/dataService.ts`, `src/data/types.ts` | `src/data/dataService.test.ts` (invariantes de los mocks) |
| `src/state/types.ts` o `src/data/types.ts` (tipos compartidos) | ambas + `pnpm typecheck` |
| `src/backend/mapping.ts`, `src/backend/types.ts` | `src/backend/mapping.test.ts` (si cambia `COLUMNAS_ACTUALIZABLES`, debe cambiar también el `GRANT UPDATE` de la migración) |
| `src/backend/authService.ts` | `src/backend/authService.test.ts` (doble de `supabaseClient`) |
| `supabase/migrations/*.sql` (RLS, grants) | `node tmp/supabase-tools/sql.mjs --file tmp/supabase-tools/rls_checks.sql` contra la BD de pruebas (local, no versionado) |
| `src/components/auth/LoginEnlaceMagico/reenvio.ts` | `src/components/auth/LoginEnlaceMagico/reenvio.test.ts` |
| `src/styles/tokens/*.css`, `src/styles/contraste/*` | `src/styles/contraste/contraste.test.ts` (contraste WCAG de ambos temas) |
| `src/theme/tipos.ts`, `src/theme/almacenamiento.ts` | `src/theme/almacenamiento.test.ts` |
| `src/components/ranking/LeaderboardTable/construirFilas.ts` | `src/components/ranking/LeaderboardTable/construirFilas.test.ts` |
| `src/components/map/estadoNodo.ts` | `src/components/map/estadoNodo.test.ts` |
| `src/components/map/orbita/geometriaOrbita.ts`, `estadoOrbita.ts` | `src/components/map/orbita/geometriaOrbita.test.ts` (geometría + navegación) |
| `src/components/espacio/generarEstrellas.ts`, `sombrasEstrellas.ts` | `src/components/espacio/generarEstrellas.test.ts` |
| `src/components/espacio/viaje/navegacionNiveles.ts` | `src/components/espacio/viaje/navegacionNiveles.test.ts` |
| `src/components/ranking/nombreRanking.ts` | `src/components/ranking/nombreRanking.test.ts` |
| `src/components/**`, `src/pages/**` (resto) | sin pruebas de UI: `pnpm typecheck` + `pnpm lint` + revisión manual en `pnpm dev` |
| `src/styles/index.css`, `src/theme/**`, `src/assets/**` | revisión visual en **ambos temas** |
| `supabase/migrations/*.sql` | sin prueba automática: revisar consistencia con `src/backend/types.ts` y `mapping.ts` |

**Consumidores dependientes:** usa `vitest related --run <fuente>` para
encontrar las pruebas que importan un archivo. No hay otra herramienta de
consumidores; si `related` no selecciona nada para un archivo compartido,
corre la suite completa.

**Puntos ciegos:** `vitest related` sigue imports estáticos, no ve:
- cambios a los `*.json` importados vía `dataService` (sí los ve, pero
  revísalo) ni a `vite.config.ts` / `tsconfig*.json`;
- variables de entorno (`VITE_SUPABASE_*`) — el modo identificado no tiene
  pruebas automáticas;
- CSS/tokens y arte;
- el comportamiento de Supabase (RLS, checks SQL).

**Qué NO entra en la suite:** `tmp/` y `.dwp/` están excluidos en
`vite.config.ts` (`test.exclude`): son áreas locales que pueden traer repos o
scripts ajenos con sus propias pruebas.

**Escalamiento a suite completa** (siempre `pnpm test && pnpm build`):
cambios a `package.json`, `pnpm-lock.yaml`, `vite.config.ts`,
`tsconfig*.json`, `.oxlintrc.json`, a tipos compartidos
(`src/state/types.ts`, `src/data/types.ts`, `src/backend/types.ts`), o a
cualquier cosa que el mapeo no cubra.

**Fallback:** para cualquier cosa que el acotado no cubra, corre
`pnpm lint && pnpm test && pnpm build`.

## Postura de pruebas

- **Unitarias primero, de comportamiento:** la lógica de negocio vive en
  funciones puras (`explorerReducer`, `dataService`); pruébala por lo que
  hace (estado de entrada → estado de salida), cubriendo casos borde y
  regresiones (doble conteo, saldo insuficiente, nivel máximo, no quitar
  progreso). Nada de aserciones sobre secuencias de llamadas internas.
- **Invariantes de datos:** los mocks tienen reglas (6 niveles, 3–5 módulos,
  `xpObjetivo` = suma de XP, métrica dual, recompensas no monetarias). Si
  editas un JSON, esas pruebas son tu red.
- **Integración en costuras reales:** la costura estado ↔ BD es
  `src/backend/mapping.ts`; si la cambias, agrega una prueba de ida y vuelta.
  No se mockea Supabase en pruebas unitarias del reducer.
- **E2E:** no hay. Para un prototipo de demo, la revisión manual del flujo
  completo en `pnpm dev` (landing → evaluación → mapa → nivel → pasaporte →
  ranking → recompensas, en ambos temas) es la verificación de punta a punta.
- **Datos de prueba ficticios** siempre (guardrail §9): "Persona Ficticia",
  `ficticia@covalto.com`.
- Sin metas de cobertura ni de número de pruebas: cubre lo que puede romper la
  mecánica.

## Propuesto (no instalado)

Si el prototipo crece en UI, el siguiente paso razonable sería
`@testing-library/react` + `jsdom` (entorno `jsdom` en Vitest) para probar
componentes como `ModuleCard` o `PlacementQuiz`, y opcionalmente Playwright
para 1–2 flujos de punta a punta. **No está instalado ni verificado**; pedir
aprobación antes de agregar dependencias.
