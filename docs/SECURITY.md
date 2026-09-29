# SECURITY — seguridad y datos sensibles

Contexto: Covalto es banca regulada. Este repo es un prototipo de demo, pero
sus guardrails se tratan como obligatorios.

## Secretos

- Única configuración sensible: `VITE_SUPABASE_URL` y
  `VITE_SUPABASE_ANON_KEY`, en **`.env.local`** (gitignored junto con `.env`,
  `.env.*.local` y `*.local`). La plantilla sin valores es `.env.example`.
- En producción viven en *Project Settings → Environment Variables* de Vercel.
- La **anon key es pública por diseño** (se incrusta en el bundle, prefijo
  `VITE_`). La **`service_role` key jamás** entra al repo, al front-end ni a
  Vercel para este proyecto.
- Un agente **nunca** lee, imprime, copia ni escribe valores de `.env.local`
  en código, docs, pruebas, logs, planes (`.dwp/`) ni `tmp/`.

## Modelo de autenticación (limitación conocida)

- **No hay autenticación real.** "Identificarse" = escribir un correo
  `@covalto.com`; no se verifica que sea de quien lo escribe.
- La validación de dominio está en el cliente (`validarCorreoCovalto`) y en la
  BD (`check` sobre `correo`) — defensa en profundidad, pero no es auth.
- Las políticas **RLS son permisivas**: cualquiera con la anon key puede leer
  y escribir cualquier fila de `usuarios`. Aceptable para demo interna; **no
  usar con datos reales de producción** sin Supabase Auth (magic link
  restringido a `@covalto.com`) y RLS por `auth.uid()`. Detalle en
  `supabase/migrations/0001_usuarios.sql`.

## Datos personales

- **Mocks, pruebas, docs y arte: cero PII**, cero nombres reales. Usa nombres
  evidentemente ficticios.
- Datos reales (nombre, correo, progreso) de quien se identifica viven solo en
  la tabla `usuarios` de Supabase (excepción aprobada el 2026-08-06).
- El Ranking muestra el **alias**, no el nombre real. Ojo: si un usuario no
  define alias, `LeaderboardTable` cae a mostrar su `nombre` — hallazgo
  conocido, pendiente de decisión del stakeholder.
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
