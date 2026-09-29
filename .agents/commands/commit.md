---
description: Crea un commit convencional en español con los cambios actuales, después de validar
---

# /commit

1. `git status` y `git diff` para ver qué cambió. No incluyas `.env*`,
   `dist/`, `tmp/`, `.dwp/` ni archivos que no sean parte del cambio.
2. Valida según `docs/TESTING_GUIDE.md` (mínimo `pnpm lint`, las pruebas del
   mapeo y `pnpm build`). Si falla, no hagas commit: reporta.
3. Mensaje `tipo(scope): descripción` en español, minúsculas. Tipos: `feat`,
   `fix`, `chore`, `docs`, `test`, `refactor`. Scopes: `state`, `data`,
   `backend`, `ui`, `pages`, `theme`, `supabase`, `deps`, `agents`, `docs`.
   Cuerpo opcional con el *por qué*.
4. Commit en la rama actual. **No** hagas push.
