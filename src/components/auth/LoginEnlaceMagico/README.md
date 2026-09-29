# LoginEnlaceMagico — login sin contraseña

Pide el correo `@covalto.com`, envía el enlace mágico de Supabase Auth y
muestra "Revisa tu correo". Al abrir el enlace, la app vuelve a `/cuenta` con
la sesión iniciada.

| Archivo | Qué hace |
|---|---|
| `LoginEnlaceMagico.tsx` | Orquesta: formulario o aviso de enlace enviado |
| `useEnvioEnlace.ts` | Estado del envío: correo, espera de 60 s, error; valida el dominio antes de llamar |
| `FormularioCorreo.tsx` | Vista: campo de correo y botón "Enviar enlace de acceso" |
| `AvisoRevisaCorreo.tsx` | Vista: "Revisa tu correo", reenviar tras la espera, usar otro correo |
| `reenvio.ts` | Lógica pura: segundos que faltan para reenviar |
| `reenvio.test.ts` | Prueba de la espera |
| `index.ts` | API pública (`LoginEnlaceMagico`) |

Usa `CampoTexto` y `MensajeError` de `src/components/ui/` (borde y color de
error con contraste verificado).

**Pruebas:** `pnpm exec vitest run src/components/auth`. El envío real se
prueba con un correo `@covalto.com` (ver README raíz, "Base de datos").
