# LandingPage — pantalla 1

Hero inmersivo sin Header ni HUD. "Despega ahora" lleva al mapa; la
autoevaluación queda como enlace secundario.

| Archivo | Qué hace |
|---|---|
| `LandingPage.tsx` | Orquesta: fondo del tema (espacio exterior en Espacial), encabezado y hero |
| `EncabezadoLanding.tsx` | Marca del programa + botón de tema |
| `HeroTexto.tsx` | Nombre, lemas, descripción y acciones |
| `AccionesHero.tsx` | CTA "Despega ahora" y enlace a la autoevaluación |
| `IlustracionHero.tsx` | Astronauta de campaña (solo Espacial, vía `SoloEnTema`) |
| `index.ts` | API pública (`LandingPage`) |

**Temas:** Covalto = hero centrado (`max-w-2xl`); Espacial = dos columnas en
pantallas grandes, con la variante `espacial:` de Tailwind (sin lógica de tema
en el componente).

**Pruebas:** sin pruebas de UI; revisión visual en ambos temas.
