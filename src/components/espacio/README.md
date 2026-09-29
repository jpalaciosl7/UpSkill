# src/components/espacio — espacio exterior (tema espacial)

Fondo inmersivo detrás de toda la app cuando el tema es `espacial`. Sin
imágenes ni librerías: CSS generado.

| Archivo | Qué hace |
|---|---|
| `FondoEspacial.tsx` | Compone el cielo: nebulosa + 3 capas de estrellas + viñeta; fijo detrás del contenido |
| `CapaEstrellas.tsx` | Una capa: N estrellas en un solo elemento (box-shadow) que deriva hacia arriba |
| `Nebulosa.tsx` | Nubes de gas moradas/azules (gradientes con tokens `--nebulosa-*`) |
| `generarEstrellas.ts` | Lógica pura: estrellas deterministas por semilla (mulberry32) |
| `sombrasEstrellas.ts` | Lógica pura: estrellas → `box-shadow`, repetidas para una deriva sin cortes |
| `espacio.css` | Animaciones (deriva, titileo, respiración) y viñeta; solo transform/opacity |
| `index.ts` | API pública (`FondoEspacial`) |
| `viaje/` | Viaje entre planetas en el curso: planeta protagonista, anterior/siguiente, transición (ver su README) |

**Profundidad:** la capa lejana tiene 140 estrellas pequeñas que tardan 360 s
en cruzar la pantalla; la cercana, 30 más grandes en 130 s. La diferencia de
velocidad da el parallax.

**Uso:** dentro de un contenedor con `isolate` (ver `AppLayout` y la landing):

```tsx
<SoloEnTema tema="espacial"><FondoEspacial /></SoloEnTema>
```

**Accesibilidad y rendimiento:** `aria-hidden`, `pointer-events: none`; con
"reducir movimiento" queda quieto; 3 elementos animados en total.

**Pruebas:** `pnpm exec vitest run src/components/espacio`.
