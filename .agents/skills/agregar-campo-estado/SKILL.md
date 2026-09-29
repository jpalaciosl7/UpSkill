---
name: agregar-campo-estado
description: Agrega un campo nuevo al estado del explorador y lo propaga por todas las capas (tipos, reducer, mapping, tipos de BD, migración SQL, pruebas). Úsalo cuando una mecánica nueva necesita guardar un dato del explorador.
---

# agregar-campo-estado

Un campo de `ExplorerState` vive en seis lugares. Olvidar uno rompe la
sincronización con Supabase o el modo local en silencio.

## Pasos

1. **`src/state/types.ts`** — agrega el campo a `ExplorerState` con comentario
   JSDoc en español (qué es, en qué modo aplica).
2. **`src/state/explorerReducer.ts`** — dale valor en `ESTADO_INICIAL` (mock de
   demo, `// PLACEHOLDER` si aplica) y en `PROGRESO_CERO` si es progreso; agrega
   o ajusta la acción que lo modifica, con sus guardas.
3. **`src/state/explorerReducer.test.ts`** — prueba del comportamiento nuevo.
4. Si debe persistir en la BD:
   - **`supabase/migrations/000N_<descripcion>.sql`** — nueva migración
     idempotente (`alter table public.usuarios add column if not exists …`)
     con default y check si aplica. No edites migraciones ya aplicadas.
   - **`src/backend/types.ts`** — columna en `UsuarioDB` (snake_case).
   - **`src/backend/mapping.ts`** — en `usuarioDbAEstado` y en
     `estadoAActualizacionUsuario`.
5. **UI** — muéstralo donde corresponda (HUD, pasaporte…) con tokens.
6. **localStorage** — estados guardados antes del cambio no tendrán el campo:
   maneja `undefined` al leer (valor por defecto) o documenta que basta con
   "reiniciar progreso".

## Validación

`pnpm exec vitest run src/state`, luego `pnpm lint && pnpm test && pnpm build`.
La migración **no** se ejecuta contra la BD real sin instrucción explícita:
déjala lista y avisa al owner.
