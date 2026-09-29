/**
 * LoginEnlaceMagico.tsx — acceso sin contraseña: pide el correo @covalto.com
 * y, tras enviar el enlace, muestra "Revisa tu correo". Al abrir el enlace se
 * vuelve a /cuenta con la sesión iniciada (ver src/backend/authService.ts).
 */
import { AvisoRevisaCorreo } from './AvisoRevisaCorreo'
import { FormularioCorreo } from './FormularioCorreo'
import { useEnvioEnlace } from './useEnvioEnlace'

/** Orquesta el login: formulario de correo o aviso de enlace enviado */
export function LoginEnlaceMagico() {
  const envio = useEnvioEnlace()

  if (envio.enviadoA) {
    const correo = envio.enviadoA
    return (
      <AvisoRevisaCorreo
        correo={correo}
        espera={envio.espera}
        enviando={envio.enviando}
        error={envio.error}
        alReenviar={() => void envio.pedirEnlace(correo)}
        alUsarOtroCorreo={envio.usarOtroCorreo}
      />
    )
  }

  return <FormularioCorreo enviando={envio.enviando} error={envio.error} alEnviar={(correo) => void envio.pedirEnlace(correo)} />
}
