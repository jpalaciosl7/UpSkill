# AGENTS.md — Covalto³ · Ruta de Formación IA ("Explorador IA")

Punto de entrada para cualquier agente de IA (Claude Code, Cursor, Codex, Gemini,
Copilot…) que trabaje en este repositorio. Es un **índice compacto**: las reglas
obligatorias y los comandos viven aquí; el detalle vive en `docs/` y en los
`README.md` de cada módulo, a un enlace de distancia.

DWP standard: 5.0.0 (onboarded 2026-09-28; skill 5.5.1)

> **Qué es esto, en una línea:** un prototipo web (React + Vite + TypeScript +
> Tailwind) de la ruta de formación gamificada "Explorador IA" de Covalto³, para
> demostrar el concepto a stakeholders. Detalle de producto, alcance y
> decisiones abiertas en [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md).

> **Referencias `CLAUDE.md §N` en el código:** el contenido que antes vivía en
> `CLAUDE.md` se movió a `docs/PRODUCT_SPEC.md` **conservando la numeración
> §1–§10**. Cuando un comentario diga "CLAUDE.md §7", léelo como
> `docs/PRODUCT_SPEC.md` §7. El original está respaldado en `CLAUDE.md.bak`.

---

## Índice de documentación

| Documento | Para qué sirve |
|---|---|
| [`docs/README.md`](docs/README.md) | Índice maestro de `docs/` |
| [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md) | El *por qué*: problema, audiencia, las 9 pantallas, los 6 niveles, mecánica, decisiones abiertas y guardrails (antes `CLAUDE.md`) |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Capas (pages → components → state → data/backend), flujo de estado, persistencia dual localStorage/Supabase, despliegue en Vercel |
| [`docs/STANDARDS.md`](docs/STANDARDS.md) | Convenciones de código: español, alias `@/`, tokens CSS, `// PLACEHOLDER`, manejo de errores, anti-patrones |
| [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md) | Vitest: comandos completos y acotados, mapeo fuente→prueba, puntos ciegos, postura de pruebas |
| [`docs/DEVELOPMENT_COMMANDS.md`](docs/DEVELOPMENT_COMMANDS.md) | Referencia completa de comandos pnpm (completo / acotado) |
| [`docs/SECURITY.md`](docs/SECURITY.md) | Secretos (`.env.local`), anon key vs service_role, RLS permisiva conocida, PII, qué nunca escribir |
| [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) | Presupuesto del bundle, fuentes auto-hospedadas, debounce de sincronización |
| [`docs/AI_AGENT_ONBOARDING.md`](docs/AI_AGENT_ONBOARDING.md) | Checklist de primera sesión para un agente |
| [`docs/AI_AGENT_COLLAB.md`](docs/AI_AGENT_COLLAB.md) | Traspasos, propiedad de archivos, cómo evitar conflictos entre agentes |
| [`docs/Covalto3_Ruta_Formacion_Documento_Base.md`](docs/Covalto3_Ruta_Formacion_Documento_Base.md) | Documento ancla del contenido (fuente, no se edita sin pedirlo) |
| `docs/concepto-visual.png` | Concepto visual de UI/mecánica (referencia de pulido) |

Documentación por módulo (léela antes de tocar ese módulo):

| Módulo | README |
|---|---|
| Estado global del explorador | [`src/state/README.md`](src/state/README.md) |
| Datos mock + servicio de acceso | [`src/data/README.md`](src/data/README.md) |
| Acceso a la BD real (Supabase) | [`src/backend/README.md`](src/backend/README.md) |
| Componentes por dominio | [`src/components/README.md`](src/components/README.md) |
| Páginas (una por pantalla) | [`src/pages/README.md`](src/pages/README.md) |
| Tema, branding y estilos | [`src/theme/README.md`](src/theme/README.md) |
| Migraciones SQL | [`supabase/README.md`](supabase/README.md) |
| Kit de agentes (`.agents/`) | [`.agents/README.md`](.agents/README.md) |

## Estructura del repositorio

```
UpSkill/
├── AGENTS.md                 # este archivo (fuente única para agentes)
├── CLAUDE.md                 # una línea: @AGENTS.md (Windows sin symlinks)
├── README.md                 # README humano: setup, stack, BD
├── package.json              # scripts pnpm; packageManager fijado
├── pnpm-lock.yaml            # lockfile (pnpm; no reintroducir package-lock.json)
├── vite.config.ts            # Vite + React + Tailwind; alias '@' → src (Vitest lo reusa)
├── vercel.json               # build/install con pnpm + rewrite SPA
├── .env.example              # plantilla VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
├── docs/                     # guías categorizadas + documentos fuente
├── supabase/
│   └── migrations/           # SQL a ejecutar a mano en el dashboard (0001_usuarios.sql)
├── public/                   # favicon
├── src/
│   ├── main.tsx / App.tsx    # arranque + rutas (react-router)
│   ├── config/               # branding.ts: NOMBRE_EXPERIENCIA y demás constantes de copy
│   ├── theme/                # ThemeContext: flag 'covalto' | 'espacial'
│   ├── styles/               # index.css: tokens de marca por data-theme + Tailwind v4
│   ├── data/                 # *.json mock + dataService.ts (única puerta a los datos)
│   ├── backend/              # supabaseClient, usersService, mapping (única puerta a la BD)
│   ├── state/                # explorerReducer + Context + persistencia localStorage
│   ├── components/           # UI por dominio: hud, map, level, passport, ranking, ...
│   ├── pages/                # una página por pantalla del prototipo
│   └── assets/espacial/      # arte de campaña (webp) del tema espacial
├── .agents/                  # kit cross-agent: agents/, commands/, skills/, docs/
├── .dwp/                     # (gitignored) planes de Deep Work Plan
└── tmp/                      # (gitignored) scratch efímero
```

---

## Reglas obligatorias

1. **Idioma: español.** Código, comentarios, documentación, copy de UI y
   mensajes de commit se escriben en español (convención del repo desde su
   primer commit). *Desviación declarada del DWP standard*, que pide inglés: se
   mantiene el español por decisión del owner (2026-09-28). Identificadores
   técnicos de librerías se quedan como son.
2. **Commits convencionales:** `tipo(scope): descripción` en español, en
   minúsculas, modo imperativo o sustantivo. Tipos usados: `feat`, `fix`,
   `chore`, `docs`, `test`, `refactor`. Scopes recomendados (dominios reales):
   `state`, `data`, `backend`, `ui`, `pages`, `theme`, `supabase`, `deps`,
   `agents`, `docs`. El historial previo usa `tipo: descripción` sin scope — es
   válido; añade el scope cuando el cambio es de un solo dominio.
3. **Guardrails de banca regulada (no negociables):**
   - Cero PII y cero datos reales en mocks, pruebas, docs e ilustraciones. Todo
     nombre de ejemplo es ficticio.
   - **Cero recompensas monetarias**: solo reconocimiento, tiempo protegido,
     acceso a eventos, visibilidad (`placeholder: true`). Nada de dinero/becas.
   - Nada de personajes con IP de terceros ni marcas ajenas en arte o íconos.
   - Marca `// PLACEHOLDER` todo lo que sea mock o provisional.
   - **Métrica dual:** módulos `aplica` valen más XP que `aprende`; no diseñes
     mecánicas que premien actividad vacía. Hay una prueba que lo vigila.
   - Sin llamadas de red en tiempo de ejecución **salvo** Supabase (excepción
     explícita del stakeholder, 2026-08-06). Fuentes e íconos se auto-hospedan.
4. **Capas aisladas:** los componentes nunca importan `*.json` ni
   `@supabase/supabase-js` directamente — solo `@/data/dataService` y
   `@/backend/usersService`. El prototipo debe seguir **100% demostrable sin
   BD** (modo local).
5. **Pruebas y validación:** pruebas Vitest co-ubicadas como `*.test.ts` junto
   al archivo que prueban. Todo cambio de comportamiento en `src/state/`,
   `src/data/` o `src/backend/mapping.ts` agrega o ajusta pruebas. **Regla de
   gates:** selecciona las pruebas por la superficie tocada usando el mapeo de
   [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md); si el cambio toca
   configuración, dependencias, tipos compartidos o no está cubierto por el
   mapeo, corre la suite completa (`pnpm test`). Antes de dar por terminado:
   `pnpm lint` sin errores y `pnpm build` en verde (incluye `tsc -b`). No hay
   meta de cobertura numérica; la expectativa es cubrir la lógica de negocio.
6. **Errores y logging:** los errores de Supabase se lanzan desde
   `usersService` y se atrapan en el consumidor con
   `console.error('[dominio] mensaje:', error)` sin romper la UI (el progreso
   ya vive en localStorage). Los hooks de contexto lanzan `Error` si se usan
   fuera de su Provider. localStorage corrupto → se empieza de cero, sin crash.
7. **Secretos:** nunca escribas valores reales de `.env.local`, la anon key ni
   jamás la `service_role` en código, docs, pruebas o logs. Ver
   [`docs/SECURITY.md`](docs/SECURITY.md).
8. **Límites del repositorio:** el agente puede editar y hacer commit en este
   repo, en la rama actual. **No** hace `push`, no abre PRs, no despliega a
   Vercel ni ejecuta SQL contra Supabase sin instrucción explícita. No edita
   `docs/Covalto3_Ruta_Formacion_Documento_Base.md` ni `docs/concepto-visual.png`
   (son fuentes) salvo que se pida.
9. **Gestor de paquetes: pnpm.** Nunca generes `package-lock.json` ni
   `yarn.lock`. Si `pnpm` no está en el PATH, usa `corepack pnpm …`.
10. **Reporte de progreso:** después de trabajo significativo, reporta qué se
    hizo y qué se validó. Reportar **nunca bloquea** el trabajo: si un canal de
    reporte falla, sigue y menciónalo al final.
11. **Excepciones declaradas del DWP standard:** (a) idioma español (regla 1);
    (b) el revisor local *AI Diff Reviewer* no está instalado — el owner no
    autorizó la instalación vía npx (2026-09-28); la revisión de cambios usa
    la persona [`.agents/agents/reviewer.md`](.agents/agents/reviewer.md);
    (c) sin symlinks en este checkout de Windows: `CLAUDE.md` es `@AGENTS.md`
    y `.claude`/`.cursor` son *junctions* locales (ver
    [`.agents/README.md`](.agents/README.md)).

## Principios de trabajo

Trabaja con autonomía, ownership y buen juicio. Busca la excelencia vía
corrección, claridad, simplicidad y cierre verificado.

- **Hazte cargo del resultado.** Lleva el trabajo autorizado por
  investigación, ejecución y validación adecuada, hasta completarlo o toparte
  con un bloqueo concreto.
- **Investiga antes de preguntar.** Revisa código, docs, herramientas y
  decisiones previas (`docs/PRODUCT_SPEC.md` §7 lista las abiertas). Resuelve lo
  que puedas averiguar tú.
- **Decide lo rutinario por tu cuenta.** Elige enfoques sensatos dentro del
  alcance autorizado; explicita los supuestos importantes; no pidas
  confirmación para pasos rutinarios o ya autorizados.
- **Pregunta cuando falta juicio o autorización.** Decisiones de marca,
  recompensas, plataforma o nombre (§7) son del stakeholder: trae la
  investigación, opciones y tu recomendación.
- **Haz las aprobaciones concretas.** Prepara lo autorizado antes de pedir
  aprobación; presenta algo revisable y di qué acción la requiere y por qué.
- **Supera obstáculos.** Investiga fallas e intenta recuperarte dentro del
  alcance; sigue con el trabajo independiente; escala cuando necesites input o
  un cambio externo (p. ej. credenciales de Supabase).
- **Respeta intención y alcance.** Un pedido de análisis sigue siendo análisis.
  Propón mejoras mayores por separado. Preserva el trabajo y decisiones
  existentes.
- **Rigor proporcional.** Ataca causas de fondo con soluciones mantenibles,
  sin complejidad innecesaria ni cambios no relacionados. Es un prototipo:
  pulido sí, sobre-ingeniería no.
- **Comunica directo y preciso.** Empieza por el resultado; distingue hechos
  verificados, supuestos e incertidumbre.
- **Verifica antes de declarar terminado.** Corre los checks pertinentes,
  corrige lo que esté en alcance y reporta qué se validó y qué quedó
  pendiente. Nunca afirmes acciones o resultados que no ocurrieron.

---

## Comandos rápidos (Quick Commands)

Todos se corren desde la raíz del repo. Si `pnpm` no está en el PATH, antepone
`corepack` (p. ej. `corepack pnpm test`). Detalle en
[`docs/DEVELOPMENT_COMMANDS.md`](docs/DEVELOPMENT_COMMANDS.md).

| Acción | Tipo | Comando |
|---|---|---|
| Instalar | full | `pnpm install` |
| Servidor de desarrollo | — | `pnpm dev` (http://localhost:5173) |
| Pruebas | full | `pnpm test` |
| Pruebas | scoped | `pnpm exec vitest run src/state` (carpeta) · `pnpm exec vitest run src/data/dataService.test.ts` (archivo) · `pnpm exec vitest run -t "CANJEAR_RECOMPENSA"` (nombre) |
| Pruebas relacionadas | scoped | `pnpm exec vitest related --run src/state/explorerReducer.ts` |
| Lint | full | `pnpm lint` |
| Lint | scoped | `pnpm exec oxlint src/state` |
| Typecheck | full | `pnpm typecheck` (`tsc -b`; solo proyecto completo) |
| Build | full | `pnpm build` (typecheck + `vite build` → `dist/`) |
| Validar todo | full | `pnpm lint && pnpm test && pnpm build` |
| Preview del build | — | `pnpm preview` |

No hay CI configurado: la validación es local. No hay comandos que corran solo
en contenedor.

## Deep Work Plans — invocación

El trabajo estructurado corre por los flujos DWP locales (delegadores
`.agents/commands/dwp-*`; los flujos viven en el skill `deepworkplan`,
instalado a nivel de usuario en `~/.claude/skills/deepworkplan/` — el
descubrimiento es local, no se consulta ningún servicio de red):

| Intención | Ruta |
|---|---|
| "planea este trabajo", "crea un plan" | `/dwp-create` |
| "ejecuta / corre el plan" | `/dwp-execute` |
| "continúa / retoma el plan interrumpido" | `/dwp-resume` |
| "cambia el alcance del plan" | `/dwp-refine` |
| "estado del plan", "qué falta" | `/dwp-status` (solo lectura) |
| "verifica el repo / el plan" | `/dwp-verify` (solo lectura) |
| edición directa ordinaria ("arregla esto", "renombra aquello") | se hace directo — nunca se vuelve plan en silencio |

Los hosts sin slash commands invocan los mismos flujos por nombre
(`#deepworkplan-create` o texto plano). `trust`/`auto` autoriza continuar sin
supervisión dentro del flujo pedido; no es un selector de flujo, y las rutas de
solo lectura siguen siendo de solo lectura.

## Directorios de trabajo (gitignored)

- **`.dwp/`** — salida estructurada de los Deep Work Plans (`.dwp/plans/`). La
  evidencia producida al ejecutar un plan va en el `analysis_results/` de ese
  plan.
- **`tmp/`** — scratch libre y efímero (exploraciones, exports, handoffs entre
  agentes). Se puede borrar en cualquier momento; no escribas basura en `src/`
  ni en `docs/`.
