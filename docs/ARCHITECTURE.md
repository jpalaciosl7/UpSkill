# ARCHITECTURE — Explorador IA

SPA de React 19 empaquetada con Vite, desplegada como sitio estático en
Vercel, con un backend **opcional** (Supabase/Postgres) para la tabla
`usuarios`. Sin servidor propio.

## Capas y dependencias

```
main.tsx
 └─ ThemeProvider (src/theme)          flag 'covalto' | 'espacial' → <html data-theme>
     └─ ExplorerProvider (src/state)   estado global del explorador
         └─ App.tsx                    rutas (react-router-dom, BrowserRouter)
             ├─ /            LandingPage (sin chrome)
             └─ AppLayout    Header + PersistentHUD + <Outlet/>
                 └─ pages/*  una página por pantalla
                     └─ components/<dominio>/*

pages / components ──► state (useExplorer, dispatch)
        │                 │
        │                 ├─► state/explorerStorage   (localStorage)
        │                 └─► backend/usersService    (Supabase, si está configurado)
        ├──────────────► data/dataService             (JSON mock: niveles, módulos, ranking, recompensas, evaluación)
        └──────────────► backend/usersService         (ranking real, identificación)
```

Reglas de dependencia (se respetan hoy y hay que mantenerlas):

- Solo `src/data/dataService.ts` importa los `*.json`.
- Solo `src/backend/supabaseClient.ts` importa `@supabase/supabase-js`; solo
  `usersService.ts` usa el cliente.
- `src/state/` no conoce la forma de la tabla SQL: la traducción
  snake_case ↔ camelCase vive en `src/backend/mapping.ts`.
- `src/data/types.ts` importa tipos de `src/state/types.ts` (rango, rol); no al
  revés salvo tipos.

## Flujo de estado

- **Reducer puro** (`src/state/explorerReducer.ts`): acciones
  `COMPLETAR_MODULO`, `COMPLETAR_EVALUACION`, `CANJEAR_RECOMPENSA`,
  `CAMBIAR_ROL`, `REINICIAR_PROGRESO`, `IDENTIFICAR_USUARIO`, `CERRAR_SESION`.
  Las guardas de negocio (sin doble conteo, sin saldo negativo, no quitar
  progreso en la evaluación, nivel máximo 6) viven **en el reducer**, no solo
  en la UI.
- **Quien despacha calcula el contexto**: p. ej. `LevelDetailPage` decide si el
  módulo es el último del nivel y pasa `completaNivel` con el siguiente nivel
  (`min(id + 1, 6)`) y su `xpObjetivo`, y pasa la `fecha` local de hoy con la
  que el reducer recalcula la racha (`src/state/racha.ts`). El reducer nunca
  llama a `new Date()`.
- **Estado inicial de demo** (`ESTADO_INICIAL`): explorador ficticio "a media
  ruta" (nivel 2, 820 XP, 450 monedas) para que la demo se vea poblada.

## Persistencia dual

| Modo | Condición | Fuente de verdad | Caché |
|---|---|---|---|
| Local/demo | `estado.correo === null` | localStorage (`explorador-ia-state`) | — |
| Identificado | `estado.correo` con `@covalto.com` y Supabase configurado | tabla `usuarios` | localStorage |

- Cada cambio de estado se guarda en localStorage de inmediato.
- En modo identificado, se sincroniza con Supabase con un **debounce de 500 ms**
  (`actualizarProgresoUsuario`). Fallas → `console.error`, la UI no se rompe.
- Al montar con sesión en caché, se refresca desde la BD y solo se despacha si
  hay diferencias (evita un ciclo de escritura).
- Identificación (`/cuenta`, `IdentityForm`): busca por correo; si no existe,
  crea la fila con progreso en cero; despacha `IDENTIFICAR_USUARIO`.
- Sin `VITE_SUPABASE_*`, `isSupabaseConfigured = false` y todo corre en modo
  local.

## Datos mock

`src/data/*.json`, tipados en `src/data/types.ts`:

- `levels.json` — 6 niveles; `xpObjetivo` = suma del XP de sus módulos.
- `modules.json` — 4 módulos por nivel, `tipo: aprende | aplica`,
  `variantesPorRol` opcional (ramas por rol desde el nivel 3).
- `ranking.json` — leaderboard ficticio.
- `rewards.json` — recompensas no monetarias, todas `placeholder: true`.
- `evaluation.json` — 5 preguntas D1–D5, escala 1–5, umbrales puntaje → rango
  → nivel sugerido.

## Theming

Tokens CSS en `src/styles/index.css` bajo `:root[data-theme='covalto']` y
`:root[data-theme='espacial']`, expuestos a Tailwind v4 con `@theme inline`
(clases como `bg-surface`, `text-primary`, `rounded-card`, `shadow-card`). El
tema se persiste en localStorage (`explorador-ia-tema`). El arte del tema
espacial está en `src/assets/espacial/` (webp).

## Base de datos

Una tabla, `public.usuarios` (`supabase/migrations/0001_usuarios.sql`), con
checks de dominio `@covalto.com`, rango, rol y nivel 1–6, índice por
`xp_total desc` y RLS permisiva (ver [`SECURITY.md`](SECURITY.md)). Las
migraciones se aplican a mano desde el SQL Editor de Supabase.

## Despliegue

Vercel (`vercel.json`): `pnpm install`, `pnpm run build`, salida `dist/`, y un
rewrite `/(.*) → /index.html` para que las rutas del SPA funcionen al
recargar. Variables `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` se
configuran en el proyecto de Vercel; se incrustan en el bundle en build time.

## Decisiones clave

- **Context + useReducer** en vez de Zustand: una sola rebanada de estado,
  reducer fácil de probar.
- **Capas de datos intercambiables** (`dataService`, `usersService`) porque la
  plataforma definitiva está abierta ([`PRODUCT_SPEC.md`](PRODUCT_SPEC.md) §7).
- **Flag de tema** en vez de elegir marca (decisión abierta §6).
- **Supabase opcional** (nota de alcance 2026-08-06): el prototipo debe seguir
  siendo demostrable sin BD.
