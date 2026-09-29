# SECURITY — seguridad y datos sensibles

Contexto: Covalto es banca regulada. Este repo es un prototipo de demo, pero
sus guardrails se tratan como obligatorios.

## Secretos

- Única configuración sensible: `VITE_SUPABASE_URL` y
  `VITE_SUPABASE_ANON_KEY`, en **`.env.local`** (gitignored junto con `.env`,
  `.env.*.local` y `*.local`). La plantilla sin valores es `.env.example`.
- En producción viven en *Project Settings → Environment Variables* de Vercel.
- La **anon/publishable key es pública por diseño** (se incrusta en el bundle,
  prefijo `VITE_`); la protección real es la RLS. La **`service_role`/secret
  key jamás** entra al repo, al front-end ni a Vercel para este proyecto.
- `SUPABASE_DB_URL` (conexión Postgres con contraseña, **secreta**) vive solo
  en `.env.local`, sin prefijo `VITE_` (nunca llega al bundle) y solo la usan
  scripts locales de migración (`tmp/supabase-tools/`). No va en Vercel.
- Un agente **nunca** imprime ni copia valores de `.env.local` en código, docs,
  pruebas, logs, planes (`.dwp/`) ni commits; los scripts de verificación solo
  reportan presencia/forma.

## Modelo de autenticación

Desde `supabase/migrations/0002_auth_rls.sql` (aplicada en la BD de pruebas el
2026-09-28):

- **Login real con Supabase Auth** (enlace mágico). Cada fila de `usuarios`
  pertenece a una cuenta (`user_id` → `auth.users`).
- **Solo `@covalto.com`:** trigger `solo_correos_covalto` en `auth.users`
  (función `private.validar_dominio_covalto`) rechaza crear una cuenta o
  cambiar el correo a otro dominio. El cliente también valida (UX) y el
  `check` de 0001 sigue en `usuarios.correo`.
- **RLS por usuario:** `anon` no tiene acceso a `usuarios`; `authenticated`
  solo lee, crea y actualiza **su** fila (`auth.uid() = user_id`); el alta
  exige que el correo sea el del JWT. Nadie puede cambiar `user_id`, `correo`
  ni `fecha_registro`, ni borrar filas.
- **Ranking:** `public.ranking_exploradores(limite)` es `SECURITY DEFINER` a
  propósito (necesita ver a todos) pero devuelve solo `id, alias, xp_total,
  rango`, exige usuario autenticado y solo `authenticated` puede ejecutarla.
- **Limitación conocida:** un usuario todavía puede modificar el progreso de su
  **propia** fila desde el navegador (XP, monedas). Mover ese cálculo al
  servidor queda para un plan posterior.
- **App:** `/cuenta` pide el enlace mágico (`authService`), el estado global
  sigue a la sesión y toda escritura va por `user_id`; verificado que la Data
  API real rechaza a `anon` (401 / `42501`) en lectura, inserción y ranking.

## Datos personales

- **Mocks, pruebas, docs y arte: cero PII**, cero nombres reales. Usa nombres
  evidentemente ficticios.
- Datos reales (nombre, correo, progreso) de quien se identifica viven solo en
  la tabla `usuarios` de Supabase (excepción aprobada el 2026-08-06).
- El Ranking muestra solo el **alias**; un usuario real sin alias aparece como
  "Explorador anónimo" (`src/components/ranking/nombreRanking.ts`), nunca con
  su nombre real. El Ranking real (`listarRankingUsuarios` → RPC
  `ranking_exploradores`) solo recibe `id, alias, xp_total, rango` y solo con
  sesión; sin sesión se ve el ranking mock. La fila propia se marca por `id`,
  obtenido de la propia fila del usuario (`obtenerUsuarioPorUserId`).
- Con la RLS de 0002, consultar la API directo tampoco expone filas ajenas:
  la tabla solo devuelve la fila propia y el ranking pasa por la función de
  columnas públicas.
- localStorage (`explorador-ia-state`) guarda una copia del estado, incluido
  el correo, en el navegador del usuario. "Cerrar sesión" lo borra.

## Red

- Sin llamadas de red en runtime salvo Supabase. Fuentes (`@fontsource`) e
  íconos (`material-symbols`) se empaquetan localmente; no agregues CDNs.

## Lo que un agente NO debe hacer

- Escribir secretos, tokens o valores de entorno en cualquier archivo.
- Ejecutar SQL contra una BD real, cambiar políticas RLS o desplegar sin
  instrucción explícita.
- Introducir datos reales de colaboradores o marcas/IP de terceros.
- Implementar recompensas monetarias.
- Hacer commit de `.env*` (salvo `.env.example` sin valores).
