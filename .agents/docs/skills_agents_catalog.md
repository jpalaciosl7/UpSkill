# Catálogo de skills y agentes

Refleja exactamente lo que existe en `.agents/` (actualízalo al agregar o
quitar algo).

## Agentes (`.agents/agents/`)

| Agente | Archivo | Úsalo para |
|---|---|---|
| reviewer | [`agents/reviewer.md`](../agents/reviewer.md) | Revisar un diff contra reglas, guardrails y capas (sustituye al AI Diff Reviewer) |
| architect | [`agents/architect.md`](../agents/architect.md) | Diseñar cambios que cruzan capas sin cerrar decisiones abiertas |
| executor | [`agents/executor.md`](../agents/executor.md) | Implementar una tarea acotada de punta a punta |
| debugger | [`agents/debugger.md`](../agents/debugger.md) | Diagnosticar estado inconsistente, sync con Supabase, build roto |
| qa | [`agents/qa.md`](../agents/qa.md) | Pruebas + recorrido manual de la demo en ambos temas |
| perf-optimizer | [`agents/perf-optimizer.md`](../agents/perf-optimizer.md) | Reducir el costo de primera carga (fuente de íconos, bundle) |
| security-auditor | [`agents/security-auditor.md`](../agents/security-auditor.md) | Secretos, PII, RLS, exposición de datos |
| content-author | [`agents/content-author.md`](../agents/content-author.md) | Editar niveles/módulos/recompensas/evaluación respetando invariantes |
| component-author | [`agents/component-author.md`](../agents/component-author.md) | Componentes y pantallas con tokens y ambos temas |

## Skills del repo (`.agents/skills/`)

| Skill | Archivo | Úsalo para |
|---|---|---|
| agregar-campo-estado | [`skills/agregar-campo-estado/SKILL.md`](../skills/agregar-campo-estado/SKILL.md) | Propagar un campo nuevo de `ExplorerState` por tipos, reducer, mapping, BD y pruebas |
| agregar-pantalla | [`skills/agregar-pantalla/SKILL.md`](../skills/agregar-pantalla/SKILL.md) | Agregar una pantalla: página, ruta, navegación, componentes |

## Skills externos

| Skill | Dónde | Nota |
|---|---|---|
| supabase 0.1.2 | `.agents/skills/supabase/` (**solo local, gitignored**) | Oficial de Supabase (MIT): Auth, RLS, CLI/MCP, migraciones, depuración y checklist de seguridad. Instalar con `git clone https://github.com/supabase/agent-skills` y copiar; commit fijado en su `ORIGEN.md` |
| supabase-postgres-best-practices 1.1.1 | `.agents/skills/supabase-postgres-best-practices/` (**solo local, gitignored**) | Oficial de Supabase (MIT): esquema, índices, RLS, conexiones |
| deepworkplan 5.5.1 | `~/.claude/skills/deepworkplan/` (nivel usuario) | Flujos DWP; los usan los comandos `dwp-*`, `skill-create`, `agent-create` |
| ai-diff-reviewer | — | **No instalado** (excepción declarada en `AGENTS.md`) |
