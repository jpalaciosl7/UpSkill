# src/components/map/lineal — mapa lineal (tema Covalto)

Los 6 niveles en fila unidos por una trayectoria punteada. Es el mapa del tema
empresarial; en Espacial se usa la órbita 3D (`../orbita/`).

| Archivo | Qué hace |
|---|---|
| `TrajectoryMap.tsx` | Fila de niveles con su estado (`../estadoNodo.ts`) y conectores punteados |
| `PlanetNode.tsx` | Un nivel: nodo + nombre + pilar AAA+; clic → `/nivel/:id` salvo bloqueado |
| `IconoNivel.tsx` | Nodo Covalto: círculo con ícono o candado, contorno `border-strong` (≥ 3:1) |
| `PlanetaIlustrado.tsx` | Nodo con el planeta del arte (si este mapa se muestra en Espacial) |
| `InsigniaEstado.tsx` | Insignia "en curso" / "completado" (una sola, sin duplicar) |
| `index.ts` | API pública (`TrajectoryMap`) |

**Pruebas:** la regla de estado se prueba en `../estadoNodo.test.ts`; la vista,
con revisión visual.
