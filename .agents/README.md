# .agents — kit cross-agent

Hogar canónico y versionado de la configuración para agentes de IA. Cualquier
agente puede leer estos archivos como personas y procedimientos en markdown.

| Carpeta / archivo | Contenido |
|---|---|
| `agents/` | Personas por rol: `reviewer`, `architect`, `executor`, `debugger`, `qa`, `perf-optimizer`, `security-auditor` y dos propias del repo: `content-author`, `component-author` |
| `commands/` | Comandos: los delegadores DWP (`dwp-*`, `skill-create`, `agent-create`, `lib-upgrade`) y dos propios: `validar`, `commit` |
| `skills/` | Skills del repo: `agregar-campo-estado`, `agregar-pantalla` |
| `docs/` | [`skills_agents_catalog.md`](docs/skills_agents_catalog.md) y [`COMMANDS_REFERENCE.md`](docs/COMMANDS_REFERENCE.md) |
| `settings.json` | Permisos base de Claude Code (permite pnpm lint/test/build y git de solo lectura; niega leer `.env*`, `git push` y `vercel`) |

## `.claude` y `.cursor` en Windows (sustituto de symlink)

El estándar pide los symlinks `.claude → .agents` y `.cursor → .agents`. En
este checkout de Windows crear symlinks requiere permisos de administrador,
así que se usan **junctions** locales (no requieren admin) y se gitignoran
(`/.claude`, `/.cursor` en `.gitignore`), porque git recorre las junctions
como si fueran carpetas y duplicaría el contenido. `.agents/` es la única
fuente versionada.

Para recrearlas en un clon nuevo (PowerShell, desde la raíz del repo):

```powershell
New-Item -ItemType Junction -Path .claude -Target "$PWD\.agents"
New-Item -ItemType Junction -Path .cursor -Target "$PWD\.agents"
```

En macOS/Linux: `ln -s .agents .claude && ln -s .agents .cursor`.

## Skill DeepWorkPlan

Los flujos DWP no están copiados en `skills/`: el skill `deepworkplan` (v5.5.1)
está instalado a nivel de usuario en `~/.claude/skills/deepworkplan/` y los
delegadores `commands/dwp-*` apuntan ahí. Otra persona que quiera usar
`/dwp-*` necesita el skill instalado en esa misma ruta (excepción declarada
en `AGENTS.md`).
