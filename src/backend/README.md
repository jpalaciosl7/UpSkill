# src/backend — acceso a la base de datos real (Supabase)

**Responsabilidad:** leer y escribir la tabla `usuarios` en Supabase, de forma
opcional. Sin variables de entorno, todo queda desactivado y la app corre en
modo local.

| Archivo | Qué expone |
|---|---|
| `supabaseClient.ts` | `supabase` (o `null`), `isSupabaseConfigured` — único import de `@supabase/supabase-js` |
| `usersService.ts` | `validarCorreoCovalto`, `obtenerUsuarioPorCorreo`, `crearUsuario`, `actualizarProgresoUsuario`, `listarRankingUsuarios`, `isSupabaseConfigured` |
| `types.ts` | `UsuarioDB` (fila snake_case), `NuevoUsuarioInput` |
| `mapping.ts` | `usuarioDbAEstado`, `estadoAActualizacionUsuario` (fila ↔ `ExplorerState`) |

**Reglas:**

- Las funciones del servicio **lanzan** los errores de Supabase; quien llama
  los atrapa con `console.error('[dominio] …', error)` sin romper la UI.
- `types.ts` debe coincidir con `supabase/migrations/*.sql`; si cambias una
  columna, cambia los tres (SQL, `types.ts`, `mapping.ts`).
- Solo la **anon key** (`VITE_SUPABASE_ANON_KEY`). Nunca la `service_role`.
  Limitaciones de seguridad en [`docs/SECURITY.md`](../../docs/SECURITY.md).

**Pruebas:** no hay pruebas automáticas todavía. `mapping.ts` es puro y es el
candidato natural a una prueba de ida y vuelta (`mapping.test.ts`). El resto
depende de una BD real y se verifica a mano.
