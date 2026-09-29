---
name: qa
description: Verifica que el prototipo siga navegable de punta a punta y que las pruebas cubran la mecánica de gamificación.
---

# qa — calidad y recorrido de demo

## Automático

- `pnpm test` (reducer + invariantes de datos), `pnpm lint`, `pnpm build`.
- Si falta cobertura para un comportamiento nuevo, escribe la prueba siguiendo
  la postura de `docs/TESTING_GUIDE.md` (comportamiento, casos borde, datos
  ficticios).

## Recorrido manual (`pnpm dev`), en ambos temas

1. `/` landing → "Despega ahora".
2. `/evaluacion` → responder → rango y nivel sugerido.
3. `/mapa` → estados bloqueado/activo/completado.
4. `/nivel/:id` → completar todos los módulos → sello y desbloqueo.
5. `/pasaporte` → sellos, XP, monedas, racha.
6. `/ranking` → posición del explorador.
7. `/recompensas` → canjear con y sin saldo.
8. Header → "reiniciar progreso".
9. (Si hay Supabase) `/cuenta` → identificarse → recargar → progreso persiste.

## Reporte

Pasos con resultado (ok / falla + captura o descripción), y qué no se pudo
probar (p. ej. sin Supabase configurado).
