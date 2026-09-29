# Referencia de comandos

Cada comando es un archivo markdown en `.agents/commands/`. Tres formas de
invocarlo, según el host:

- **`/<nombre>`** en Claude Code (p. ej. `/dwp-create`, `/validar`).
- **`#<nombre>`** en agentes que interceptan la sintaxis con barra.
- **Texto plano** ("corre `validar`", "run deepworkplan-create") en hosts sin
  slash commands: el agente lee el archivo y sigue el procedimiento.

El descubrimiento es local: todo está en disco, nada pasa por un servicio de
red.

## Comandos del repo

| Comando | Archivo | Qué hace |
|---|---|---|
| `validar` | [`commands/validar.md`](../commands/validar.md) | `pnpm lint` → `pnpm test` → `pnpm build`, con el resultado real |
| `commit` | [`commands/commit.md`](../commands/commit.md) | Valida y crea un commit convencional en español, sin push |

## Comandos DWP (delegadores al skill `deepworkplan`)

| Comando | Archivo | Sub-skill | Modo |
|---|---|---|---|
| `dwp-create` | [`commands/dwp-create.md`](../commands/dwp-create.md) | `create` | escribe en `.dwp/` |
| `dwp-execute` | [`commands/dwp-execute.md`](../commands/dwp-execute.md) | `execute` | ejecuta tareas del plan |
| `dwp-refine` | [`commands/dwp-refine.md`](../commands/dwp-refine.md) | `refine` | modifica un plan |
| `dwp-resume` | [`commands/dwp-resume.md`](../commands/dwp-resume.md) | `resume` | retoma un plan interrumpido |
| `dwp-status` | [`commands/dwp-status.md`](../commands/dwp-status.md) | `status` | solo lectura |
| `dwp-verify` | [`commands/dwp-verify.md`](../commands/dwp-verify.md) | `verify` | solo lectura |
| `dwp-upgrade` | [`commands/dwp-upgrade.md`](../commands/dwp-upgrade.md) | `upgrade` | actualiza el skill/harness |
| `skill-create` | [`commands/skill-create.md`](../commands/skill-create.md) | `author` | crea/actualiza un skill del repo |
| `agent-create` | [`commands/agent-create.md`](../commands/agent-create.md) | `author` | crea/actualiza un agente del repo |
| `lib-upgrade` | [`commands/lib-upgrade.md`](../commands/lib-upgrade.md) | addon `dependency-upgrade` | actualiza dependencias por lotes con gate; inerte hasta que se invoca |

Los delegadores DWP están en inglés porque son propiedad del skill (se
refrescan desde sus plantillas); los comandos propios del repo, en español.
