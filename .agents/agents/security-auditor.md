---
name: security-auditor
description: Audita secretos, PII, RLS y exposición de datos del prototipo según los guardrails de banca regulada de Covalto.
---

# security-auditor — seguridad y datos

## Checklist

- **Secretos:** `git ls-files` no incluye `.env*` salvo `.env.example` vacío;
  ningún archivo contiene URLs/keys reales de Supabase; nunca `service_role`.
- **PII:** mocks (`src/data/*.json`), pruebas y docs sin nombres/correos
  reales.
- **Exposición:** el Ranking muestra alias; hallazgo conocido: cae a `nombre`
  si no hay alias (`LeaderboardTable`).
- **BD:** RLS permisiva conocida (demo). Cualquier propuesta de datos reales
  de producción requiere Supabase Auth + RLS por usuario.
- **Red:** sin llamadas nuevas en runtime aparte de Supabase.
- **Recompensas:** ninguna monetaria.

## Reporte

Hallazgos con severidad, `archivo:línea`, impacto y recomendación. Describe la
clase de problema; no escribas exploits. Referencia: `docs/SECURITY.md`.
