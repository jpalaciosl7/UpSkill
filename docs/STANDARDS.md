# STANDARDS — convenciones de código

Convenciones observadas en el código actual. Síguelas; si un cambio necesita
romper una, dilo explícitamente.

## Idioma y nombres

- **Español** para identificadores de dominio, comentarios, copy y commits:
  `completarModulo`, `sellosObtenidos`, `resolverUmbralPorPuntaje`,
  `ESTADO_INICIAL`. Términos de React/librerías se quedan en inglés
  (`useExplorer`, `ThemeProvider`, `dispatch`).
- Tipos de acción del reducer en `MAYUSCULAS_CON_GUION_BAJO`
  (`COMPLETAR_MODULO`).
- Componentes y páginas en `PascalCase.tsx`, un componente principal por
  archivo, con **export nombrado** (`export function LevelDetailPage`). Solo
  `App.tsx` usa `export default`.
- Constantes de módulo en `MAYUSCULAS` (`NIVEL_MAXIMO`, `DEBOUNCE_SYNC_MS`).
- Columnas SQL en `snake_case`; estado del front en `camelCase`; la
  traducción vive solo en `src/backend/mapping.ts`.

## Imports

- Usa el alias **`@/`** para todo lo que esté fuera de la carpeta actual
  (`@/data/dataService`, `@/state/explorerContext`); rutas relativas solo
  dentro del mismo módulo (`./types`).
- `import type { … }` para imports solo de tipos (`verbatimModuleSyntax` está
  activo en `tsconfig.app.json`).
- Orden habitual: librerías externas → `@/…` → relativos.

## Comentarios

- Cada archivo abre con un bloque `/** archivo.ts — propósito */` que explica
  su rol y cita la sección de [`PRODUCT_SPEC.md`](PRODUCT_SPEC.md) que lo
  motiva (las citas históricas dicen "CLAUDE.md §N" — misma numeración).
- **`// PLACEHOLDER:`** marca todo valor mock o provisional (nombres ficticios,
  ids de demo, nombre de trabajo). Obligatorio (guardrail §9).
- Comenta el *por qué* de las guardas de negocio, no el *qué*.

## Estilos

- Tailwind v4 con utilidades mapeadas a tokens (`bg-surface`, `text-primary`,
  `text-text-muted`, `rounded-card`, `shadow-card`, `bg-accent/15`).
- **Nunca** hex sueltos en componentes: si hace falta un color nuevo, agrégalo
  como token en `src/styles/index.css` para **ambos** temas. (Excepción
  existente: colores de medalla en `LeaderboardTable`.)
- Íconos con `<Icon name="…" />` (`src/components/ui/Icon.tsx`, Material
  Symbols Outlined auto-hospedado).
- Copy de marca desde `src/config/branding.ts`, nunca el string "Explorador IA"
  repetido.

## TypeScript

- `strict` vía `tsconfig.app.json` con `noUnusedLocals`,
  `noUnusedParameters`, `erasableSyntaxOnly` (sin `enum` ni `namespace`: usa
  uniones de strings).
- Tipos del estado en `src/state/types.ts`, de datos mock en
  `src/data/types.ts`, de la BD en `src/backend/types.ts`.
- Los JSON se castean una sola vez en `dataService.ts`.

## Errores y logging

- Servicios (`usersService`) **lanzan**; consumidores **atrapan** con
  `console.error('[dominio] mensaje en español:', error)` y siguen
  funcionando. Prefijos en uso: `[usuarios]`, `[ranking]`, `[supabase]`.
- Cuando se desactiva una regla de lint en línea, se justifica en el mismo
  comentario (`// eslint-disable-next-line … -- motivo`).
- Hooks de contexto lanzan `Error('useX debe usarse dentro de <XProvider>')`.

## Lint

`oxlint` con plugins `react`, `typescript`, `oxc` (`.oxlintrc.json`):
`react/rules-of-hooks` es error; `react/only-export-components` es warning
(hay 4 warnings conocidos en `explorerContext.tsx` y `ThemeContext.tsx` por
exportar hooks junto al Provider — aceptados).

## Anti-patrones prohibidos

- Importar `*.json` o `@supabase/supabase-js` fuera de su capa.
- Lógica de negocio solo en la UI sin guarda en el reducer.
- Datos reales o nombres de personas reales en mocks o pruebas.
- Recompensas con valor monetario.
- Llamadas de red en runtime (CDN de fuentes, APIs) aparte de Supabase.
- `package-lock.json` / `yarn.lock` (el repo usa pnpm).
