# LevelDetailPage — pantalla 4 (detalle de nivel)

`/nivel/:levelId`: los módulos del nivel, su XP y la acción "completar". Al
completar el último módulo se obtiene el sello y se desbloquea el siguiente
nivel (máximo 6). En el tema espacial el planeta del nivel es protagonista y se
puede viajar al planeta anterior/siguiente.

| Archivo | Qué hace |
|---|---|
| `LevelDetailPage.tsx` | Orquesta: nivel de la URL → no encontrado, bloqueado o curso |
| `CursoNivel.tsx` | Curso abierto: regreso al mapa, viaje entre planetas (Espacial), cabecera, aviso y módulos |
| `CabeceraNivel.tsx` | Nivel, pilar AAA+, sello, nombre, señal y avance; planeta protagonista en Espacial |
| `AvisoSello.tsx` | "¡Sello obtenido!" con acceso al mapa o al pasaporte |
| `NivelNoDisponible.tsx` | `NivelNoEncontrado` y `NivelBloqueado` |
| `useCompletarModulo.ts` | Arma `COMPLETAR_MODULO` (fecha local, sello y siguiente nivel); `NIVEL_MAXIMO` |
| `index.ts` | API pública (`LevelDetailPage`) |

`CursoNivel` se monta con `key` por nivel: al viajar entre planetas el aviso de
sello no se arrastra al siguiente.

**Pruebas:** la lógica de completar la cubren las pruebas del reducer
(`src/state/`); la navegación entre planetas, `src/components/espacio/viaje/`.
