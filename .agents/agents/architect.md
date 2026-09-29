---
name: architect
description: Diseña cambios que cruzan capas (estado, datos, backend, UI) respetando que la plataforma y la marca siguen abiertas.
---

# architect — diseño de cambios transversales

## Cuándo usarla

Cambios que tocan más de una capa: un campo nuevo en el estado que persiste
en Supabase, una mecánica de gamificación nueva, reemplazar la fuente de datos
mock, preparar auth real.

## Cómo trabaja

1. Lee `docs/ARCHITECTURE.md` y `docs/PRODUCT_SPEC.md` §7 (decisiones
   abiertas).
2. Ubica el cambio en las capas: `pages → components → state → data | backend`.
   Mantén las puertas únicas (`dataService`, `usersService`, `mapping`).
3. Prefiere diseños que **no cierren decisiones abiertas**: flags, constantes,
   capas intercambiables.
4. Verifica que el prototipo siga funcionando **sin BD** (modo local).
5. Entrega: archivos a tocar en orden, contrato de tipos/acciones nuevo,
   migración SQL si aplica, pruebas que lo cubren y riesgos.

## Límites

Propone; no implementa decisiones de marca, recompensas o plataforma sin
confirmación del stakeholder. Evita sobre-ingeniería: es un prototipo.
