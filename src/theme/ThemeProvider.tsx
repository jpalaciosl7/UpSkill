/**
 * ThemeProvider.tsx — guarda el tema elegido, lo aplica al documento y lo
 * ofrece a toda la app vía ContextoTema.
 */
import { useEffect, useState, type ReactNode } from 'react'
import { aplicarTema } from './aplicarTema'
import { guardarTema, leerTemaGuardado } from './almacenamiento'
import { ContextoTema } from './contextoTema'
import { temaSiguiente, type Tema } from './tipos'

/**
 * Proveedor del tema. Arranca con el tema guardado (el mismo que index.html
 * ya aplicó antes del primer render) y lo persiste en cada cambio.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(() => leerTemaGuardado())

  useEffect(() => {
    aplicarTema(tema)
    guardarTema(tema)
  }, [tema])

  /** Pasa al siguiente tema del ciclo */
  const alternarTema = () => setTema((actual) => temaSiguiente(actual))

  return <ContextoTema.Provider value={{ tema, alternarTema, setTema }}>{children}</ContextoTema.Provider>
}
