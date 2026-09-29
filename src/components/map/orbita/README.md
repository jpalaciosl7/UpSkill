# src/components/map/orbita — órbita 3D de planetas (tema espacial)

Los 6 niveles como planetas en un anillo inclinado con perspectiva. Al elegir
un planeta el anillo **gira** (por el camino más corto) hasta traerlo al
frente; los del fondo se ven más pequeños, tenues y oscuros. El tema Covalto
usa el mapa lineal (`../lineal/`).

| Archivo | Qué hace |
|---|---|
| `OrbitaPlanetas.tsx` | Orquesta: progreso del explorador, navegación, anuncio en vivo y ficha |
| `EscenaOrbital.tsx` | Escena 3D: anillo que gira, trayectoria punteada, un planeta por nivel |
| `PlanetaOrbital.tsx` | Planeta: ilustración, candado, insignia, nombre; opacidad/brillo por cercanía |
| `ControlesOrbita.tsx` | Botones ‹ › y "Nivel N de 6" |
| `TarjetaPlanetaEnfocado.tsx` | Ficha del planeta al frente y "Entrar al planeta" (no si está bloqueado) |
| `useOrbita.ts` | Hook: enfocado, rotación, `irA`/`siguiente`/`anterior`, teclado (← → Inicio Fin) |
| `useDeslizar.ts` | Gesto de deslizar (> 40 px) para girar en pantallas táctiles |
| `estadoOrbita.ts` | Reducer puro de la navegación |
| `geometriaOrbita.ts` | Matemática pura: ángulos, giro más corto, cercanía a la cámara |
| `orbita.css` | Perspectiva, anillo, trayectoria y contrarrotación de planetas |
| `index.ts` | API pública (`OrbitaPlanetas`) |

**Cómo funciona el 3D:** el anillo aplica `rotateX(inclinación) rotateY(rotación)`
y cada planeta `rotateY(ángulo) translateZ(radio)` y luego contrarrota
`−(ángulo + rotación)` con la misma transición, así siempre mira a la cámara.
El navegador resuelve qué planeta tapa a cuál (`preserve-3d`).

**Accesibilidad:** la sección es enfocable y navegable con teclado; los
botones ‹ › tienen etiqueta; `aria-live` anuncia el planeta al frente; con
"reducir movimiento" el giro es instantáneo.

**Pruebas:** `pnpm exec vitest run src/components/map` (geometría, navegación y
estado de los niveles).
