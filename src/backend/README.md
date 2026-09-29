# src/backend — acceso a la base de datos real (Supabase)

**Responsabilidad:** leer y escribir la tabla `usuarios` en Supabase, de forma
opcional. Sin variables de entorno, todo queda desactivado y la app corre en
modo local.

| Archivo | Qué expone |
|---|---|
| `supabaseClient.ts` | `supabase` (o `null`), `isSupabaseConfigured`, `requerirSupabase()` — único import de `@supabase/supabase-js`; auth con flujo **implicit** (el enlace funciona aunque se abra en otro navegador) |
| `authService.ts` | Login con enlace mágico: `enviarEnlaceMagico(correo, redirigirA?)` (valida `@covalto.com` antes de llamar), `obtenerSesion()`, `alCambiarSesion(cb)` → desuscribir, `cerrarSesionSupabase()`, `aSesionAuth`, `mensajeErrorAuth` (errores en español) |
| `usersService.ts` | `validarCorreoCovalto`, `obtenerUsuarioPorUserId`, `crearPerfil`, `actualizarProgresoPorUserId`, `listarRankingUsuarios` (RPC `ranking_exploradores`, requiere sesión) |
| `types.ts` | `UsuarioDB` (fila snake_case, con `user_id`), `COLUMNAS_ACTUALIZABLES` / `ActualizacionUsuarioDB`, `FilaRankingDB` (columnas públicas del Ranking: `id, alias, xp_total, rango`), `NuevoPerfilInput` |
| `mapping.ts` | `usuarioDbAEstado`, `estadoAActualizacionUsuario` (fila ↔ `ExplorerState`) |

**Reglas:**

- Las funciones del servicio **lanzan** los errores de Supabase; quien llama
  los atrapa con `console.error('[dominio] …', error)` sin romper la UI.
- `types.ts` debe coincidir con `supabase/migrations/*.sql`; si cambias una
  columna, cambia los tres (SQL, `types.ts`, `mapping.ts`).
- Consultas que devuelven filas de **otros** usuarios piden solo columnas
  públicas (hoy: `listarRankingUsuarios` → `FilaRankingDB`); nunca `select('*')`
  para listados.
- Solo la **anon key** (`VITE_SUPABASE_ANON_KEY`). Nunca la `service_role`.
  Limitaciones de seguridad en [`docs/SECURITY.md`](../../docs/SECURITY.md).

**Pruebas:** `authService.test.ts` (cliente de Supabase sustituido por un doble
en la frontera de `supabaseClient`) y `mapping.test.ts` (ida y vuelta, y que la
actualización solo lleve `COLUMNAS_ACTUALIZABLES`, espejo del `GRANT UPDATE` de
0002). Las políticas RLS se verifican contra la BD de pruebas con
`tmp/supabase-tools/rls_checks.sql`.
