-- ============================================================
-- 0002_auth_rls.sql — login real (Supabase Auth) + RLS por usuario
--
-- Reemplaza la RLS permisiva de demo de 0001 por el modelo real:
--   1. Cada fila de `usuarios` pertenece a una cuenta de Supabase Auth
--      (columna user_id → auth.users).
--   2. Solo correos @covalto.com pueden crear (o cambiar a) una cuenta:
--      trigger en auth.users.
--   3. RLS por usuario: cada quien lee, crea y actualiza SOLO su fila;
--      `anon` no tiene acceso a la tabla.
--   4. Ranking: función que devuelve solo columnas públicas
--      (id, alias, xp_total, rango) a usuarios autenticados.
--
-- Idempotente: se puede ejecutar más de una vez.
-- Requisito: ninguna fila sin user_id (la tabla estaba vacía al crearla).
--
-- Limitación conocida (fuera de alcance): un usuario todavía puede
-- modificar el progreso de SU propia fila desde el navegador (XP,
-- monedas). Mover ese cálculo al servidor queda para una migración
-- posterior.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Enlace con Supabase Auth
-- ------------------------------------------------------------
alter table public.usuarios
  add column if not exists user_id uuid unique references auth.users (id) on delete cascade;

do $$
begin
  if exists (select 1 from public.usuarios where user_id is null) then
    raise exception 'Hay filas en public.usuarios sin user_id: enlázalas a auth.users antes de aplicar 0002';
  end if;
end
$$;

alter table public.usuarios alter column user_id set not null;

comment on column public.usuarios.user_id is
  'Cuenta de Supabase Auth dueña de la fila (auth.users.id). Base de las políticas RLS.';

-- ------------------------------------------------------------
-- 2. Solo correos @covalto.com (barrera real; el cliente también valida)
--    La función vive en un esquema no expuesto por la Data API.
-- ------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.validar_dominio_covalto()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email is null or lower(new.email) !~ '^[a-z0-9._%+-]+@covalto\.com$' then
    raise exception 'Solo se permiten cuentas con correo @covalto.com'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

revoke execute on function private.validar_dominio_covalto() from public, anon, authenticated;

drop trigger if exists solo_correos_covalto on auth.users;
create trigger solo_correos_covalto
  before insert or update of email on auth.users
  for each row
  execute function private.validar_dominio_covalto();

-- ------------------------------------------------------------
-- 3. RLS por usuario
-- ------------------------------------------------------------
alter table public.usuarios enable row level security;

-- Fuera las políticas permisivas de demo (0001)
drop policy if exists "usuarios_select_anon" on public.usuarios;
drop policy if exists "usuarios_insert_anon" on public.usuarios;
drop policy if exists "usuarios_update_anon" on public.usuarios;

-- Privilegios mínimos (desde 2026 las tablas nuevas no se exponen solas a la
-- Data API: los GRANT explícitos son los que la exponen a `authenticated`).
revoke all on public.usuarios from anon;
revoke all on public.usuarios from authenticated;

grant select on public.usuarios to authenticated;

-- Alta: solo datos de identidad/perfil; el progreso arranca con los defaults
grant insert (user_id, nombre, alias, correo, rol) on public.usuarios to authenticated;

-- Actualización: perfil y progreso. NUNCA user_id, correo, fecha_registro
-- (ultimo_acceso lo mantiene el trigger de 0001).
grant update (
  nombre, alias, rol, rango, nivel_actual, xp_total, xp_nivel_actual,
  xp_nivel_objetivo, monedas, racha_dias, ultima_actividad,
  cursos_completados, sellos_obtenidos, recompensas_canjeadas,
  evaluacion_completada, respuestas_evaluacion
) on public.usuarios to authenticated;

drop policy if exists "usuarios_select_propio" on public.usuarios;
create policy "usuarios_select_propio" on public.usuarios
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "usuarios_insert_propio" on public.usuarios;
create policy "usuarios_insert_propio" on public.usuarios
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and lower(correo) = lower((select auth.jwt()) ->> 'email')
  );

drop policy if exists "usuarios_update_propio" on public.usuarios;
create policy "usuarios_update_propio" on public.usuarios
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Sin política de DELETE: nadie borra filas desde la app.

comment on table public.usuarios is
  'Usuarios de la ruta "Explorador IA". Cada fila pertenece a una cuenta de Supabase Auth (user_id); RLS por usuario (ver 0002_auth_rls.sql).';

-- ------------------------------------------------------------
-- 4. Ranking con columnas públicas
--    SECURITY DEFINER a propósito: la RLS solo deja ver la fila propia y el
--    ranking necesita las de todos. Por eso devuelve ÚNICAMENTE columnas
--    públicas, exige un usuario autenticado y solo `authenticated` puede
--    ejecutarla. Vive en `public` porque la app la llama por RPC.
-- ------------------------------------------------------------
create or replace function public.ranking_exploradores(limite integer default 20)
returns table (id uuid, alias text, xp_total integer, rango text)
language sql
stable
security definer
set search_path = ''
as $$
  select u.id, u.alias, u.xp_total, u.rango
  from public.usuarios u
  where (select auth.uid()) is not null
  order by u.xp_total desc
  limit least(greatest(coalesce(limite, 20), 1), 100);
$$;

revoke execute on function public.ranking_exploradores(integer) from public, anon;
grant execute on function public.ranking_exploradores(integer) to authenticated;

comment on function public.ranking_exploradores(integer) is
  'Top de exploradores por XP para el Ranking: solo id, alias, xp_total y rango. Solo para usuarios autenticados.';
