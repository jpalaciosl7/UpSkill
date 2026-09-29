---
name: lib-upgrade
description: Actualiza las dependencias del repo de forma segura (por lotes, validado, reversible) vía el addon dependency-upgrade de DeepWorkPlan.
---

# /lib-upgrade

Pone al día las dependencias **sin romper el build**. Es un **delegador
delgado** al addon `deepworkplan-addon-dependency-upgrade`; no contiene la
lógica de actualización. Instalarlo no actualiza nada.

## Pasos

1. Lee `~/.claude/skills/deepworkplan/addons/dependency-upgrade/SKILL.md` y
   sigue su flujo.
2. Gestor de paquetes: **pnpm** (`pnpm-lock.yaml`, `packageManager` en
   `package.json`; vía `corepack pnpm` si no está global). Clasifica
   patch/minor/major, actualiza por lotes y después de cada lote corre el gate
   real: `pnpm lint && pnpm test && pnpm build`. Revierte el lote cuyo gate
   falle.
3. Muestra el reporte y el diff; **no** hagas commit automático.

## Notas

- Los majors (p. ej. React, Vite, TypeScript, Tailwind) requieren aprobación
  explícita antes de entrar en un lote.
- El lockfile lo regenera pnpm — nunca se edita a mano; nunca se crea
  `package-lock.json`.
