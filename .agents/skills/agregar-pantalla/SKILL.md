---
name: agregar-pantalla
description: Agrega una pantalla nueva al prototipo (página, ruta, navegación, componentes por dominio) con los tokens de marca y ambos temas. Úsalo cuando se pide una pantalla o sección nueva.
---

# agregar-pantalla

## Pasos

1. **Componentes** en `src/components/<dominio>/` (carpeta nueva si es un
   dominio nuevo), `PascalCase.tsx`, export nombrado, comentario de cabecera
   que cite la sección de `docs/PRODUCT_SPEC.md` que la motiva.
2. **Página** `src/pages/<Nombre>Page.tsx` que compone esos componentes.
3. **Ruta** en `src/App.tsx`: dentro de `<Route element={<AppLayout />}>` para
   tener Header + HUD; fuera solo si es inmersiva como la landing. Rutas en
   español (`/comunidad`, `/recompensas`).
4. **Navegación** en `src/components/layout/Header.tsx`.
5. **Datos** vía `@/data/dataService` (agrega getter + JSON si es contenido
   nuevo; nada de importar JSON en la página). Estado vía `useExplorer()`.
6. **Contenido provisional** marcado `// PLACEHOLDER`; si la pantalla aún no
   tiene diseño, `PlaceholderScreen` de `src/components/ui/` sirve de teaser.
7. **Docs**: agrega la fila en `src/pages/README.md` y en la tabla §3 de
   `docs/PRODUCT_SPEC.md` si es una pantalla del alcance.

## Validación

`pnpm typecheck && pnpm lint`, y revisión en `pnpm dev`: la ruta carga
directo (recargando), se ve bien en tema `covalto` y `espacial`, y en ancho de
móvil. Vercel ya reescribe cualquier ruta a `index.html`.
