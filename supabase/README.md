# supabase — migraciones SQL

**Responsabilidad:** el esquema de la base de datos real (opcional) del
prototipo.

| Archivo | Contenido |
|---|---|
| `migrations/0001_usuarios.sql` | tabla `public.usuarios`, checks (dominio `@covalto.com`, rol, rango, nivel 1–6, no negativos), índices (`xp_total desc`, `lower(correo)`), RLS permisiva de demo (reemplazada por 0002) |
| `migrations/0002_auth_rls.sql` | `user_id` → `auth.users` (not null, único, cascade); trigger `solo_correos_covalto` en `auth.users` (función en esquema `private`); RLS por usuario (`TO authenticated` + `auth.uid() = user_id`), `anon` sin acceso; INSERT/UPDATE por columnas (nunca `user_id`, `correo`, `fecha_registro`); función `ranking_exploradores(limite)` con solo `id, alias, xp_total, rango` |

**Aplicado en la BD de pruebas** (`ygwytdfukpdhsgchxyba`): 0001 y 0002
(2026-09-28). Desde un agente se aplican con la herramienta local
`tmp/supabase-tools/sql.mjs --file <migración>` (lee `SUPABASE_DB_URL` de
`.env.local`; usa el pooler IPv4) y se verifican con
`tmp/supabase-tools/rls_checks.sql` (transacción con `rollback`).

**Cómo se aplican:** a mano, en el SQL Editor del dashboard de Supabase, en
orden. No hay CLI de Supabase ni migraciones automáticas en este repo.

**Reglas:**

- Nunca edites una migración ya aplicada: crea la siguiente
  (`0002_<descripcion>.sql`), idempotente (`if not exists`) y comentada en
  español.
- Mantén en sincronía `src/backend/types.ts` y `src/backend/mapping.ts`.
- Un agente **no** ejecuta SQL contra una BD real sin instrucción explícita.
- La RLS es por usuario desde 0002 (requiere Supabase Auth) — ver
  [`docs/SECURITY.md`](../docs/SECURITY.md).

**Pruebas:** sin pruebas automáticas; revisar el SQL contra los tipos del
front.
