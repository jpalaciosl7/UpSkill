# Covalto³ · Ruta de Formación IA — "Explorador IA"

Prototipo de la ruta de formación gamificada de Covalto³ (Línea 1 ·
Capacidades). React + Vite + TypeScript + Tailwind. **Datos mock por
defecto, cero PII de colaboradores reales, recompensas solo no
monetarias.**

> **Nota de alcance:** el prototipo arrancó 100% front-end/sin backend. Por
> decisión explícita del stakeholder (2026-08-06) se sumó un backend real
> (Postgres/Supabase) para una tabla de usuarios — ver la sección **Base de
> datos** abajo.
> Sigue funcionando sin él: si no hay una BD conectada, todo cae de vuelta
> al modo local/demo tal como arrancó el prototipo.

El repositorio solo versiona el código de la app, sus pruebas y las
migraciones SQL. La documentación de producto y la configuración de agentes
de IA viven fuera del repo.

## Requisitos

- Node.js 20+
- pnpm (versión fijada en `package.json` → `packageManager`). Si no lo tienes
  instalado, antepone `corepack` a cada comando (`corepack pnpm install`).

## Desarrollo

```bash
pnpm install
pnpm dev         # http://localhost:5173
pnpm test        # pruebas (Vitest)
pnpm lint        # oxlint
pnpm build       # typecheck + build de producción en dist/
pnpm preview     # sirve el build de producción localmente
```

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`), tokens de marca definidos en
  `src/styles/index.css` y conectados a utilidades con `@theme inline`
- **Tipografía Noto Sans** e **íconos Material Symbols Outlined**
  auto-hospedados (`@fontsource/noto-sans`, `material-symbols`) — sin
  llamadas de red en tiempo de ejecución
- **React Router** para la navegación entre pantallas
- Estado del "explorador" en Context + `useReducer`, persistido en
  `localStorage` (modo local) y sincronizado con **Supabase** (Postgres)
  cuando el explorador entra con su enlace mágico (`@covalto.com`)

## Estructura

```
src/
├── config/       # constantes de branding (nombre de la experiencia, etc.)
├── theme/        # flag de tema 'covalto' | 'espacial'
├── data/         # capa de datos mock (JSON) + servicio de acceso — niveles, módulos...
├── backend/      # capa de acceso a la BD real (Supabase): cliente, tipos, usersService
├── state/        # estado global del explorador (reducer + persistencia dual)
├── components/   # componentes reutilizables por dominio (hud, map, level, auth, ...)
└── pages/        # una página por pantalla del prototipo
```

## Base de datos (Supabase)

Login real con **Supabase Auth** (enlace mágico al correo `@covalto.com`,
sin contraseñas) y una tabla `usuarios` con nombre, alias (público, se
muestra en el Ranking en vez del nombre real), correo, rol, rango,
nivel/XP/monedas/racha, módulos completados, sellos, recompensas canjeadas,
fecha de registro y último acceso. Cada explorador solo puede leer y
modificar su propia fila (RLS). Esquema en `supabase/migrations/`
(`0001_usuarios.sql`, `0002_auth_rls.sql`, en orden).

**Setup (requiere tu cuenta de Supabase):**

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. **SQL Editor:** ejecuta, en orden, `supabase/migrations/0001_usuarios.sql`
   y `supabase/migrations/0002_auth_rls.sql`.
3. **Project Settings → API Keys:** copia el **Project URL** y la
   **publishable key** (o la *anon* legacy). ⚠️ Nunca la *secret* /
   *service_role*.
4. `cp .env.example .env.local` y pega ambos valores en
   `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
5. **Authentication → Sign In / Providers → Email:** activado (enlace
   mágico).
6. **Authentication → URL Configuration:**
   - **Site URL:** el dominio de producción (p. ej.
     `https://<tu-proyecto>.vercel.app`).
   - **Redirect URLs:** `http://localhost:5173/**` y
     `https://<tu-proyecto>.vercel.app/**`.
7. `pnpm dev` → **Cuenta** → escribe tu correo `@covalto.com` → abre el
   enlace que llega → completa tu perfil.
8. **Vercel:** agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en
   *Settings → Environment Variables* y vuelve a desplegar.

Notas:

- El correo incluido en Supabase envía pocos enlaces por hora (sirve para
  probar). Para un piloto con más personas, configura un SMTP propio en
  *Authentication → Emails → SMTP Settings*.
- Un enlace se puede pedir cada 60 s y caduca en 1 hora.
- **Limitación conocida:** cada explorador solo puede tocar su propia fila,
  pero el cálculo de XP/monedas todavía ocurre en el navegador; moverlo al
  servidor es un paso pendiente.

## Decisiones de marca abiertas

El sistema de diseño implementa un **flag de tema** (`covalto` | `espacial`,
alternable en el header) en vez de cerrar la decisión de marca: la decisión
sigue abierta con los stakeholders.
