# STANDARDS — convenciones de código

Convenciones observadas en el código actual. Síguelas; si un cambio necesita
romper una, dilo explícitamente.

## Modularidad (regla del owner, 2026-09-29)

Objetivo: abrir cualquier archivo y entenderlo de un vistazo, y poder depurar
yendo directo al bloque que falla.

**1. Responsabilidad única (SRP).** Un archivo = una responsabilidad, y el
nombre la dice. Si para describir un archivo necesitas "y" ("valida el correo
**y** muestra el formulario **y** cuenta el tiempo"), son varios archivos.

**2. Límite de tamaño.** Contando todas las líneas del archivo (con comentarios
y líneas en blanco):

| Líneas | Estado |
|---|---|
| ≤ 75 | ✅ lo normal |
| 76–120 | ⚠️ excepción: solo con motivo escrito en el comentario de cabecera (`// TAMAÑO: …`) |
| > 120 | ❌ prohibido: se divide |

Aplica a `.ts`, `.tsx`, pruebas (`*.test.ts`) y `.css`. `oxlint` lo vigila en
TS/TSX (`max-lines`); el CSS se revisa a mano.

**3. Lo que crece, es carpeta.** Estructura esperada:

```
src/components/auth/LoginEnlaceMagico/
├── README.md                 # qué es, estados, cómo se prueba
├── index.ts                  # API pública: export { LoginEnlaceMagico }
├── LoginEnlaceMagico.tsx     # orquesta: decide qué vista mostrar
├── FormularioCorreo.tsx      # vista: pedir el correo
├── AvisoRevisaCorreo.tsx     # vista: "revisa tu correo" + reenviar
├── useEnvioEnlace.ts         # estado y efectos del envío
├── reenvio.ts                # lógica pura (sin React)
└── reenvio.test.ts           # su prueba, junto a ella
```

Lo mismo para lógica: un reducer grande se vuelve
`explorerReducer/` con un archivo por acción (`completarModulo.ts`,
`canjearRecompensa.ts`…) y un `index.ts` que las compone.

Reglas de la carpeta: se importa **solo** por su `index.ts` desde fuera
(`@/components/auth/LoginEnlaceMagico`); la lógica pura va en archivos sin
React para poder probarla; los componentes de vista no hacen llamadas de red
(las hace el hook o el servicio).

**4. Documentación obligatoria (siempre versionada).**

- **Cabecera** en cada archivo: `/** archivo.ts — qué es y por qué existe */`.
- **JSDoc en cada función, método, componente y hook**, exportado o no, justo
  encima de su definición: qué hace (no cómo) y, cuando no sea obvio, sus
  parámetros, su retorno y los errores que lanza. Ejemplo:

  ```ts
  /**
   * Envía el enlace mágico al correo. Rechaza dominios ajenos sin llamar a Supabase.
   * @param correo correo @covalto.com del explorador
   * @param redirigirA URL a la que vuelve el enlace (por defecto /cuenta)
   * @throws Error con mensaje en español si el dominio no es válido o Supabase falla
   */
  export async function enviarEnlaceMagico(correo: string, redirigirA?: string) { … }
  ```
- **Tipos e interfaces** exportados: JSDoc de una línea; campos no obvios con
  su propio comentario.
- **`README.md` por carpeta**: responsabilidad, archivos y qué hace cada uno,
  API pública, cómo se prueba.
- Comentarios de línea solo para el *por qué* no obvio (una guarda de negocio,
  una decisión de seguridad).

**5. Al tocar código existente** que incumpla, se deja cumpliendo en el mismo
cambio. El código nuevo nace cumpliendo.

## Ramas y commits (regla del owner, 2026-09-29)

**Ramas.** La principal (`claude/covalto-gamification-prototype-3drw55`) no
recibe commits directos. Cada trabajo nuevo:

```bash
git switch claude/covalto-gamification-prototype-3drw55
git switch -c feature/login-codigo-otp      # prefijo = tipo de trabajo
```

| Prefijo | Para |
|---|---|
| `feature/` | funcionalidad nueva |
| `fix/` | corregir un bug |
| `hotfix/` | corrección urgente de algo ya desplegado |
| `refactor/` | reorganizar sin cambiar comportamiento |
| `docs/` | solo documentación |
| `chore/` | herramientas, dependencias, configuración |

Nombre en kebab-case y en español, que diga el objetivo. Una rama, un
objetivo. Se integra a la principal cuando el owner lo decide.

**Commits.** `tipo(scope): qué cambia`, en español, imperativo, minúsculas:

| Tipo | Cuándo | Ejemplo |
|---|---|---|
| `feat` | funcionalidad nueva | `feat(auth): iniciar sesión con código de 6 dígitos` |
| `fix` | corrige un bug | `fix(state): no perder el último progreso al cerrar sesión` |
| `hotfix` | corrección urgente en producción | `hotfix(auth): aceptar redirect del dominio de Vercel` |
| `refactor` | reorganiza sin cambiar comportamiento | `refactor(state): dividir explorerReducer en una acción por archivo` |
| `perf` | mejora de rendimiento | `perf(theme): subset de la fuente de íconos` |
| `test` | solo pruebas | `test(backend): cubrir mapping de columnas protegidas` |
| `docs` | solo documentación | `docs(supabase): documentar la migración 0002` |
| `style` | formato sin cambio de lógica | `style(ui): ordenar clases de Tailwind` |
| `chore` / `build` | herramientas, deps, config | `chore(lint): limitar archivos a 75 líneas` |

Cuerpo del commit: el **por qué** y, si aplica, cómo se verificó. Un commit =
un cambio coherente que compila y pasa las pruebas.

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
  `text-text-muted`, `rounded-card`, `shadow-card`, `bg-accent/15`). Tabla de
  qué token usar para qué en [`src/styles/README.md`](../src/styles/README.md)
  (ámbar como texto → `text-accent-text`; error → `text-danger`; borde de
  campo → `border-border-strong`).
- **Nunca** colores fijos en componentes (hex, `text-red-600`, `bg-black/…`):
  si hace falta un color nuevo, agrégalo como token en
  `src/styles/tokens/covalto.css` **y** `espacial.css`, su utilidad en
  `src/styles/tailwind-tema.css` y, si es texto o borde, su par en
  `src/styles/contraste/paresTema.ts` (la prueba de contraste lo vigila).
- Campos y errores de formulario con `CampoTexto` y `MensajeError`
  (`src/components/ui/`).
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
