# AI_AGENT_ONBOARDING — primera sesión de un agente

Checklist para que un agente (o persona) nuevo quede productivo en este repo.

## 1 · Contexto (5 min)

1. Lee [`AGENTS.md`](../AGENTS.md) completo: reglas obligatorias y comandos.
2. Lee [`PRODUCT_SPEC.md`](PRODUCT_SPEC.md) "En resumen" y §7 (decisiones
   abiertas — no las cierres tú).
3. Hojea [`ARCHITECTURE.md`](ARCHITECTURE.md) (capas y persistencia dual).
4. Lee el `README.md` del módulo que vas a tocar (índice en `AGENTS.md`).

## 2 · Entorno

```bash
corepack pnpm --version   # pnpm vía corepack si no está global
pnpm install
pnpm lint && pnpm test && pnpm build   # línea base: debe quedar en verde
pnpm dev                               # http://localhost:5173
```

- Sin `.env.local` la app corre en **modo local** (esperado); verás un
  `console.warn` de `[supabase]` en desarrollo. No necesitas Supabase para
  casi ningún cambio.
- En Windows sin symlinks: `CLAUDE.md` contiene `@AGENTS.md`; `.claude` y
  `.cursor` son *junctions* locales hacia `.agents` (ver
  [`.agents/README.md`](../.agents/README.md)).

## 3 · Dónde vive cada cosa

| Quiero cambiar… | Ve a… |
|---|---|
| Contenido de niveles/módulos/recompensas/evaluación | `src/data/*.json` (y corre `pnpm exec vitest run src/data`) |
| Reglas de XP, sellos, canjes | `src/state/explorerReducer.ts` (+ su `.test.ts`) |
| Una pantalla | `src/pages/<Pantalla>Page.tsx` y sus componentes en `src/components/<dominio>/` |
| Colores / tipografía | tokens en `src/styles/index.css` (ambos temas) |
| Nombre o taglines | `src/config/branding.ts` |
| Tabla de usuarios | `supabase/migrations/` + `src/backend/types.ts` + `mapping.ts` |

## 4 · Antes de terminar

- `pnpm lint && pnpm test && pnpm build` en verde.
- Si tocaste UI: revisa la pantalla en `pnpm dev` en **ambos temas**.
- Guardrails: sin PII, sin recompensas monetarias, `// PLACEHOLDER` en mocks.
- Commit convencional en español (`feat(ui): …`), sin push.

## 5 · Trabajo estructurado

Para trabajo de varias partes, usa `/dwp-create` (ver bloque "Deep Work Plans"
en `AGENTS.md`). Los planes quedan en `.dwp/plans/` (gitignored).
