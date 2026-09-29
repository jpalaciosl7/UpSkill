---
description: Corre la validación completa del repo (lint, pruebas, typecheck + build) y reporta el resultado real
---

# /validar

Corre, desde la raíz del repo y en este orden, deteniéndote en el primer fallo:

1. `pnpm lint` — se aceptan los 4 warnings conocidos de `only-export-components`; cualquier error falla.
2. `pnpm test`
3. `pnpm build` (incluye `tsc -b`)

Si `pnpm` no está en el PATH, usa `corepack pnpm …`.

Reporta cada paso con su resultado real (número de pruebas, errores con
`archivo:línea`). Si algo falla, diagnostica la causa antes de proponer un
arreglo. No hagas commit como parte de este comando.
