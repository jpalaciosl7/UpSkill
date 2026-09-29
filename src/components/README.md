# src/components — componentes por dominio

**Responsabilidad:** la UI reutilizable, agrupada por dominio de la pantalla
que la usa.

| Carpeta | Componentes | Pantalla |
|---|---|---|
| `layout/` | `AppLayout` (fondo del tema + Header + HUD + Outlet), `Header` (navegación, reiniciar progreso, cuenta), `ThemeToggle` (nombre e ícono desde `PRESENTACION_TEMA`) | todas menos la landing |
| `espacio/` | `FondoEspacial` (estrellas en capas + nebulosa; solo tema espacial — ver su README) | todas en Espacial |
| `hud/` | `PersistentHUD` — monedas · nivel/rango · barra XP · racha vigente (`rachaVigente` de `@/state/racha`) | HUD persistente |
| `map/` | `estadoNodo.ts` e `InsigniaEstado.tsx` (compartidos); `lineal/` (mapa de Covalto) y `orbita/` (órbita 3D giratoria del tema espacial) — ver sus README | Mapa |
| `level/` | `ModuleCard` (XP, tipo, completar) | Detalle de nivel |
| `passport/` | `ExplorerPassport/` (carpeta: perfil, avatar por tema, sellos, estadísticas — ver su README), `MissionStamp` | Pasaporte |
| `evaluation/` | `PlacementQuiz` (D1–D5 → rango y nivel sugerido) | Autoevaluación |
| `ranking/` | `LeaderboardTable/` (carpeta: orquestador, `useRankingReal`, `construirFilas`, fila y medalla — ver su README; real vía `ranking_exploradores` si hay sesión, si no mock + explorador local); `nombreRanking.ts` decide el nombre visible (alias o "Explorador anónimo", nunca el nombre real) | Ranking |
| `community/` | `CommunityTeaser/` (carpeta: cabecera, imagen de campaña — ver su README) | Comunidad |
| `rewards/` | `RewardCard` | Recompensas |
| `auth/` | `LoginEnlaceMagico/` (carpeta: pedir enlace + "revisa tu correo", reenvío tras 60 s), `PerfilInicialForm/` (carpeta: nombre, alias, rol en el primer ingreso), `AvisoSinBaseDatos` — cada carpeta con su README | Cuenta |
| `ui/` | `Icon`, `PlaceholderScreen`, `CampoTexto`, `MensajeError` (ver su README) | genéricos |

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
