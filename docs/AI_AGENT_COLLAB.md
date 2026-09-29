# AI_AGENT_COLLAB — colaboración entre agentes

Reglas para que varios agentes (o agente + persona) trabajen en este repo sin
pisarse.

## Propiedad y puntos de contención

Archivos que casi todo cambio toca — coordina antes de editarlos en paralelo:

| Archivo | Por qué es contencioso |
|---|---|
| `src/state/explorerReducer.ts` / `src/state/types.ts` | contrato del estado; cambia tipos de todo el árbol |
| `src/styles/index.css` | tokens de ambos temas |
| `src/data/modules.json` / `levels.json` | invariantes cruzadas (XP objetivo = suma) |
| `src/App.tsx` | tabla de rutas |
| `package.json` / `pnpm-lock.yaml` | un solo cambio de dependencias a la vez |
| `AGENTS.md` | índice compartido; cambios mínimos y quirúrgicos |

Regla: **un agente por archivo contencioso a la vez**. Si dos tareas lo
necesitan, sérialízalas o divide el cambio.

## Traspasos (handoff)

Al pasar trabajo a otro agente o sesión, deja:

1. Qué se hizo y qué falta (con rutas `archivo:línea`).
2. Qué se validó y con qué comando (`pnpm test`, etc.) y el resultado real.
3. Decisiones tomadas y supuestos.
4. Dónde está el estado: plan en `.dwp/plans/PLAN_*/` (usa `/dwp-resume`), o
   notas en `tmp/` si no hay plan.

## Conflictos y ramas

- Trabaja en la rama actual salvo que se pida otra; no hagas push.
- Commits pequeños y atómicos por dominio (`feat(data): …`, `fix(state): …`).
- No reescribas historial (`rebase`, `reset --hard`, `push --force`) sin
  instrucción explícita.
- Si encuentras cambios sin commit de otra persona/agente, **no los
  descartes**: pregunta.

## Decisiones que no son del agente

Marca, recompensas, plataforma, estructura de rutas por rol, escala D1–D5 y
nombre ([`PRODUCT_SPEC.md`](PRODUCT_SPEC.md) §7) son del stakeholder. Un agente
propone con opciones y recomendación; no las cierra en código.

## Revisión

Antes de dar por listo un cambio no trivial, aplica la persona
[`reviewer`](../.agents/agents/reviewer.md) (el revisor automático *AI Diff
Reviewer* no está instalado — excepción declarada en `AGENTS.md`).
