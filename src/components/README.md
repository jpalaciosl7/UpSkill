# src/components — componentes por dominio

**Responsabilidad:** la UI reutilizable, agrupada por dominio de la pantalla
que la usa.

| Carpeta | Componentes | Pantalla |
|---|---|---|
| `layout/` | `AppLayout` (Header + HUD + Outlet), `Header` (navegación, reiniciar progreso, cuenta), `ThemeToggle` | todas menos la landing |
| `hud/` | `PersistentHUD` — monedas · nivel/rango · barra XP · racha vigente (`rachaVigente` de `@/state/racha`) | HUD persistente |
| `map/` | `TrajectoryMap`, `PlanetNode` (bloqueado/activo/completado) | Mapa |
| `level/` | `ModuleCard` (XP, tipo, completar) | Detalle de nivel |
| `passport/` | `ExplorerPassport`, `MissionStamp` | Pasaporte |
| `evaluation/` | `PlacementQuiz` (D1–D5 → rango y nivel sugerido) | Autoevaluación |
| `ranking/` | `LeaderboardTable` (real vía `ranking_exploradores` si hay sesión, si no mock + explorador local; "(tú)" por id de la fila propia); `nombreRanking.ts` decide el nombre visible (alias o "Explorador anónimo", nunca el nombre real) | Ranking |
| `community/` | `CommunityTeaser` | Comunidad |
| `rewards/` | `RewardCard` | Recompensas |
| `auth/` | `LoginEnlaceMagico` (pedir enlace + "revisa tu correo", reenvío tras 60 s — `reenvio.ts`), `PerfilInicialForm` (nombre, alias, rol en el primer ingreso), `AvisoSinBaseDatos` | Cuenta |
| `ui/` | `Icon` (Material Symbols), `PlaceholderScreen` | genéricos |

**Reglas:**

- Leen estado con `useExplorer()` y datos con `@/data/dataService`; nunca
  importan JSON ni Supabase directo (salvo vía `@/backend/usersService`).
- La lógica de negocio va en el reducer; el componente solo arma la acción.
- Colores vía tokens/clases de Tailwind (`bg-surface`, `text-primary`…), sin
  hex sueltos; revisa ambos temas.
- Copy de marca desde `@/config/branding`.

**Pruebas:** sin pruebas de componentes (no hay `jsdom` ni Testing Library;
ver "Propuesto" en [`docs/TESTING_GUIDE.md`](../../docs/TESTING_GUIDE.md)).
Validación: `pnpm typecheck`, `pnpm lint` y revisión manual en `pnpm dev`.
