# supabase — migraciones SQL

**Responsabilidad:** el esquema de la base de datos real (opcional) del
prototipo.

| Archivo | Contenido |
|---|---|
| `migrations/0001_usuarios.sql` | tabla `public.usuarios`, checks (dominio `@covalto.com`, rol, rango, nivel 1–6, no negativos), índices (`xp_total desc`, `lower(correo)`), RLS permisiva de demo |

**Cómo se aplican:** a mano, en el SQL Editor del dashboard de Supabase, en
orden. No hay CLI de Supabase ni migraciones automáticas en este repo.

**Reglas:**

- Nunca edites una migración ya aplicada: crea la siguiente
  (`0002_<descripcion>.sql`), idempotente (`if not exists`) y comentada en
  español.
- Mantén en sincronía `src/backend/types.ts` y `src/backend/mapping.ts`.
- Un agente **no** ejecuta SQL contra una BD real sin instrucción explícita.
- La RLS actual es permisiva a propósito (demo); endurecerla requiere Supabase
  Auth — ver [`docs/SECURITY.md`](../docs/SECURITY.md).

**Pruebas:** sin pruebas automáticas; revisar el SQL contra los tipos del
front.
