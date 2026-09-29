# LeaderboardTable — Ranking de Exploradores

Pantalla 7. Con sesión de Supabase y al menos un explorador real, muestra el
ranking de la BD (función `ranking_exploradores`: solo alias, XP y rango). Sin
sesión o sin BD, el ranking mock con el explorador local insertado.

| Archivo | Qué hace |
|---|---|
| `LeaderboardTable.tsx` | Orquesta: elige la fuente de datos y pinta la tabla |
| `useRankingReal.ts` | Carga ranking + fila propia de Supabase para la sesión actual |
| `construirFilas.ts` | Lógica pura: filas reales (alias o anónimo, "(tú)") y filas de demo |
| `FilaDeRanking.tsx` | Una fila: puesto, avatar con inicial, nombre, rango, XP |
| `PosicionRanking.tsx` | Medalla del podio (tokens `--color-medalla-*`) o número |
| `tipos.ts` | `FilaRanking` |
| `index.ts` | API pública (`LeaderboardTable`) |

Nunca se muestra el nombre real de otro explorador: la regla vive en
`../nombreRanking.ts`.

**Pruebas:** `pnpm exec vitest run src/components/ranking` (`construirFilas`
y `nombreRanking`). La carga real se verifica contra Supabase a mano.
