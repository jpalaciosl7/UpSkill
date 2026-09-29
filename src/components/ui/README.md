# src/components/ui — piezas genéricas de interfaz

| Archivo | Qué es |
|---|---|
| `Icon.tsx` | Ícono de Material Symbols Outlined (auto-hospedado) |
| `PlaceholderScreen.tsx` | Pantalla de relleno para contenido pendiente o estados vacíos |
| `CampoTexto.tsx` | Campo de formulario con etiqueta, ayuda y borde accesible (`border-border-strong`) |
| `MensajeError.tsx` | Mensaje de error con `text-danger` y `role="alert"` |

Úsalas en lugar de repetir `<input>` o mensajes de error a mano: así el
contraste y la accesibilidad quedan resueltos en un solo lugar.
