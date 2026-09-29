# CommunityTeaser — tarjetas de la capa social

Pantalla 8 (Comunidad / Hackatón): tarjetas teaser de foros, retos, Hackatón y
Día IA. `// PLACEHOLDER`: sin foros ni eventos reales todavía.

| Archivo | Qué hace |
|---|---|
| `CommunityTeaser.tsx` | La tarjeta: cabecera, título, descripción y CTA; la destacada usa el primario |
| `CabeceraTeaser.tsx` | Ícono + chip de etiqueta; en la destacada, velo `bg-text-on-primary/15` (se adapta al tema) |
| `ImagenCampana.tsx` | Trofeo u otra ilustración en la esquina, solo en Espacial |
| `index.ts` | API pública (`CommunityTeaser`) |

En Espacial la tarjeta destacada estrecha el texto (`espacial:max-w-[65%]`)
para dejar sitio a la ilustración.

**Pruebas:** revisión visual en ambos temas.
