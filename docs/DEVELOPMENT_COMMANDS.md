# DEVELOPMENT_COMMANDS — referencia de comandos

Gestor de paquetes: **pnpm** (versión fijada en `package.json` →
`"packageManager": "pnpm@12.6.0"`). Si `pnpm` no está instalado globalmente,
antepone `corepack` a cada comando: `corepack pnpm install`. Todos se corren
desde la raíz del repo. No hay CI ni contenedores: todo corre local.

Requisito: Node.js 20+ (verificado con Node 24.21).

## Instalación

| Comando | Tipo | Qué hace |
|---|---|---|
| `pnpm install` | full | Instala dependencias según `pnpm-lock.yaml` |
| `pnpm add <pkg>` / `pnpm add -D <pkg>` | — | Agrega dependencia (pide aprobación antes: cambia el lockfile) |

## Desarrollo

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor Vite con HMR en http://localhost:5173 |
| `pnpm preview` | Sirve el `dist/` construido |
| `cp .env.example .env.local` | Plantilla para conectar Supabase (opcional) |

## Validación

| Acción | Tipo | Comando |
|---|---|---|
| Pruebas | full | `pnpm test` |
| Pruebas | scoped (carpeta) | `pnpm exec vitest run src/state` |
| Pruebas | scoped (archivo) | `pnpm exec vitest run src/data/dataService.test.ts` |
| Pruebas | scoped (nombre) | `pnpm exec vitest run -t "COMPLETAR_MODULO"` |
| Pruebas | scoped (relacionadas) | `pnpm exec vitest related --run src/state/explorerReducer.ts` |
| Pruebas en watch | — | `pnpm test:watch` |
| Lint | full | `pnpm lint` |
| Lint | scoped | `pnpm exec oxlint src/state` |
| Typecheck | full | `pnpm typecheck` (`tsc -b`; no hay variante acotada) |
| Build | full | `pnpm build` (`tsc -b && vite build` → `dist/`) |
| Todo | full | `pnpm lint && pnpm test && pnpm build` |

Estado verificado el 2026-09-28: lint 0 errores / 4 warnings conocidos;
17 pruebas en verde; build OK.

## Base de datos

No hay CLI de Supabase en el repo. Las migraciones de
`supabase/migrations/` se ejecutan **a mano** en el SQL Editor del dashboard,
en orden (`0001_…`, `0002_…`). Un agente **no** las ejecuta sin instrucción
explícita.

## Despliegue

Vercel lee `vercel.json` (`pnpm install`, `pnpm run build`, `dist/`). Los
despliegues los hace el owner; un agente no despliega.
