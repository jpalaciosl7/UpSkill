# src/theme — sistema de temas

Dos temas alternables con el botón del header (`ThemeToggle`):

- **`covalto`** (por defecto): la marca empresarial.
- **`espacial`**: la capa inmersiva de campaña (espacio exterior).

La decisión de marca sigue abierta ([`docs/PRODUCT_SPEC.md`](../../docs/PRODUCT_SPEC.md)
§6–§7): ningún tema reemplaza al otro.

## Archivos (uno por responsabilidad)

| Archivo | Responsabilidad |
|---|---|
| `tipos.ts` | Dominio: `Tema`, `TEMAS`, `TEMA_POR_DEFECTO`, `CLAVE_TEMA`, `esTema`, `temaSiguiente` |
| `almacenamiento.ts` | `leerTemaGuardado` / `guardarTema` en localStorage, tolerantes a fallos |
| `aplicarTema.ts` | Pone `data-theme` y `color-scheme` en `<html>` |
| `contextoTema.ts` | `ContextoTema` y su tipo `ValorContextoTema` |
| `ThemeProvider.tsx` | Estado del tema: lo lee, lo aplica y lo guarda en cada cambio |
| `useTheme.ts` | Hook para leer/cambiar el tema (lanza fuera del Provider) |
| `index.ts` | API pública: `ThemeProvider`, `useTheme`, `Tema`, `TEMAS`, `TEMA_POR_DEFECTO`, `temaSiguiente` |
| `almacenamiento.test.ts` | Pruebas del almacenamiento y del dominio |

Fuera de esta carpeta se importa **solo** desde `@/theme`.

## Sin parpadeo al recargar

`index.html` tiene un script en línea que lee `explorador-ia-tema` de
localStorage y aplica `data-theme` **antes** de que cargue la app. Si cambias
la clave o los nombres de los temas en `tipos.ts`, actualiza también ese
script.

## Dónde viven los colores

Los valores de cada tema son tokens CSS (`:root[data-theme='…']`) en
`src/styles/` — ver su README. Los componentes usan las utilidades de Tailwind
mapeadas a esos tokens (`bg-surface`, `text-primary`…), nunca colores fijos.

## Otras piezas de marca

- `src/config/branding.ts`: nombre de la experiencia (`NOMBRE_EXPERIENCIA`,
  // PLACEHOLDER), taglines, nombre de la moneda y del pasaporte.
- `src/assets/espacial/`: arte de campaña (webp) del tema espacial.

## Pruebas

`pnpm exec vitest run src/theme`. El aplicado al DOM y el Provider se validan
con typecheck y revisión manual (alternar el botón y recargar).
