---
description: Crea un commit convencional en español con los cambios actuales, en una rama de trabajo y después de validar
---

# /commit

1. **Rama:** si la rama actual es la principal
   (`main`), **no** hagas commit ahí:
   crea una rama de trabajo con el prefijo del tipo (`feature/`, `fix/`,
   `hotfix/`, `refactor/`, `docs/`, `chore/` + objetivo en kebab-case) y sigue
   en ella. Ver `AGENTS.md` regla 2.
2. `git status` y `git diff` para ver qué cambió. No incluyas `.env*` (salvo
   `.env.example` sin valores), `dist/`, `tmp/`, `.dwp/`, skills de terceros
   ni archivos ajenos al cambio.
3. Valida según `docs/TESTING_GUIDE.md` (mínimo `pnpm lint`, las pruebas del
   mapeo y `pnpm build`) y revisa la regla de modularidad (`AGENTS.md` 4b) en
   los archivos tocados. Si algo falla, no hagas commit: reporta.
4. Mensaje `tipo(scope): qué cambia`, en español, imperativo, minúsculas.
   Tipos: `feat`, `fix`, `hotfix`, `refactor`, `perf`, `test`, `docs`,
   `style`, `chore`, `build`. Scopes: `state`, `data`, `backend`, `auth`,
   `ui`, `pages`, `theme`, `supabase`, `deps`, `lint`, `agents`, `docs`.
   Cuerpo con el **por qué** cuando no sea obvio. Un commit = un cambio
   coherente.
5. **No** hagas push ni merge.
