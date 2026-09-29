# ExplorerPassport — Pasaporte del Explorador

Pantalla 5: perfil + sellos de misión (uno por nivel) + estadísticas. En el
tema espacial se suma la ilustración del libro-pasaporte y el avatar de
astronauta.

| Archivo | Qué hace |
|---|---|
| `ExplorerPassport.tsx` | Orquesta: ilustración (solo Espacial), las dos páginas y las estadísticas |
| `PaginaPerfil.tsx` | Página izquierda: avatar, nombre, id ficticio, rol, nivel, rango, sellos |
| `AvatarExplorador.tsx` | Astronauta (Espacial) o ícono de cohete (Covalto), vía `SoloEnTema` |
| `PaginaSellos.tsx` | Página derecha: `MissionStamp` por nivel y mensaje de avance |
| `EstadisticasExplorador.tsx` | Monedas, XP total, racha vigente y rango |
| `index.ts` | API pública (`ExplorerPassport`) |

`MissionStamp` vive un nivel arriba (`../MissionStamp.tsx`). El id del
explorador es un `// PLACEHOLDER` ficticio (`ID_EXPLORADOR_MOCK`).

**Pruebas:** sin pruebas de UI; la racha vigente se prueba en
`src/state/racha.test.ts`.
