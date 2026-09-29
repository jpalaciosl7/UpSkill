# src/pages — una página por pantalla

**Responsabilidad:** las pantallas enrutadas en `src/App.tsx`. Las páginas
componen componentes de `src/components/` y, cuando hace falta, calculan el
contexto de una acción antes de despacharla.

| Página | Ruta | Nota |
|---|---|---|
| `LandingPage` | `/` | hero inmersivo, sin Header/HUD |
| `MapPage` | `/mapa` | mapa de trayectoria |
| `LevelDetailPage` | `/nivel/:levelId` | decide si el módulo cierra el nivel y arma `completaNivel` (`NIVEL_MAXIMO = 6`) |
| `PassportPage` | `/pasaporte` | envuelve `ExplorerPassport` |
| `EvaluationPage` | `/evaluacion` | envuelve `PlacementQuiz` |
| `RankingPage` | `/ranking` | envuelve `LeaderboardTable` |
| `CommunityPage` | `/comunidad` | teasers |
| `RewardsPage` | `/recompensas` | catálogo no monetario |
| `AccountPage` | `/cuenta` | identificación / cerrar sesión |

**Agregar una pantalla:** crea `XPage.tsx` con export nombrado, regístrala en
`src/App.tsx` dentro de `<AppLayout>` (o fuera, si es inmersiva) y agrega el
enlace en `components/layout/Header.tsx`. Vercel ya reescribe toda ruta a
`index.html`.

**Pruebas:** sin pruebas de UI; `pnpm typecheck` + revisión manual del flujo.
