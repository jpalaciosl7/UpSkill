# src/components/espacio/viaje — viaje entre planetas (tema espacial)

Durante el curso (detalle de nivel) el planeta es protagonista y se puede
viajar al planeta anterior o siguiente. Entrar desde la órbita "acerca" el
planeta hasta la cabecera del nivel.

| Archivo | Qué hace |
|---|---|
| `PlanetaProtagonista.tsx` | Planeta grande con halo y giro lento; `view-transition-name: planeta-viaje` |
| `NavegacionPlanetas.tsx` | ‹ anterior · siguiente › respetando bloqueos; navega con `viewTransition` |
| `navegacionNiveles.ts` | Lógica pura: vecinos del nivel y la regla de desbloqueo de la página |
| `viaje.css` | Transición de viaje (View Transitions API) y giro del planeta; nada con reduced-motion |
| `index.ts` | API pública |

**Cómo funciona el viaje:** React Router navega con `{ viewTransition: true }`,
que usa `document.startViewTransition` si el navegador lo soporta. El planeta
enfocado de la órbita (`../../map/orbita/PlanetaOrbital.tsx`) y el protagonista
llevan el mismo nombre de transición, así el navegador anima uno hacia el otro.
Sin soporte, el cambio de página es directo.

**Pruebas:** `pnpm exec vitest run src/components/espacio`.
