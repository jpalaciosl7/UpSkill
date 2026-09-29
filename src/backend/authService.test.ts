/**
 * authService.test.ts — login con enlace mágico. El cliente de Supabase se
 * sustituye por un doble en la frontera (supabaseClient); datos ficticios.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const auth = {
  signInWithOtp: vi.fn(),
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  signOut: vi.fn(),
}

vi.mock('./supabaseClient', () => ({
  isSupabaseConfigured: true,
  supabase: { auth },
  requerirSupabase: () => ({ auth }),
}))

const { aSesionAuth, alCambiarSesion, enviarEnlaceMagico, mensajeErrorAuth, obtenerSesion } = await import('./authService')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('enviarEnlaceMagico', () => {
  it('rechaza correos que no son @covalto.com sin llamar a Supabase', async () => {
    await expect(enviarEnlaceMagico('alguien@gmail.com', 'https://app.test/cuenta')).rejects.toThrow('@covalto.com')
    expect(auth.signInWithOtp).not.toHaveBeenCalled()
  })

  it('pide el enlace con el correo normalizado y la URL de regreso', async () => {
    auth.signInWithOtp.mockResolvedValue({ error: null })
    await enviarEnlaceMagico('  Persona.Ficticia@Covalto.com ', 'https://app.test/cuenta')
    expect(auth.signInWithOtp).toHaveBeenCalledWith({
      email: 'persona.ficticia@covalto.com',
      options: { emailRedirectTo: 'https://app.test/cuenta', shouldCreateUser: true },
    })
  })

  it('traduce el error de Supabase a un mensaje en español', async () => {
    auth.signInWithOtp.mockResolvedValue({ error: { message: 'email rate limit exceeded', status: 429 } })
    await expect(enviarEnlaceMagico('persona.ficticia@covalto.com', 'https://app.test/cuenta')).rejects.toThrow(
      'Espera un minuto',
    )
  })
})

describe('mensajeErrorAuth', () => {
  it('reconoce el límite de envíos, el rechazo de dominio de la BD y cae a un mensaje genérico', () => {
    expect(mensajeErrorAuth({ message: 'x', code: 'over_email_send_rate_limit' })).toContain('Espera un minuto')
    expect(mensajeErrorAuth({ message: 'Database error saving new user' })).toContain('@covalto.com')
    expect(mensajeErrorAuth({ message: 'algo inesperado' })).toContain('Intenta de nuevo')
  })
})

describe('sesión', () => {
  it('aSesionAuth devuelve null sin usuario y normaliza el correo', () => {
    expect(aSesionAuth(null)).toBeNull()
    const session = { user: { id: 'uid-1', email: 'Persona.Ficticia@covalto.com' } } as never
    expect(aSesionAuth(session)).toEqual({ userId: 'uid-1', correo: 'persona.ficticia@covalto.com' })
  })

  it('obtenerSesion traduce la sesión actual', async () => {
    auth.getSession.mockResolvedValue({ data: { session: { user: { id: 'uid-1', email: 'a@covalto.com' } } }, error: null })
    await expect(obtenerSesion()).resolves.toEqual({ userId: 'uid-1', correo: 'a@covalto.com' })
  })

  it('alCambiarSesion notifica sesiones traducidas y permite desuscribirse', () => {
    const unsubscribe = vi.fn()
    auth.onAuthStateChange.mockImplementation((cb: (evento: string, session: unknown) => void) => {
      cb('SIGNED_IN', { user: { id: 'uid-1', email: 'a@covalto.com' } })
      cb('SIGNED_OUT', null)
      return { data: { subscription: { unsubscribe } } }
    })
    const recibidas: unknown[] = []
    const desuscribir = alCambiarSesion((s) => recibidas.push(s))
    expect(recibidas).toEqual([{ userId: 'uid-1', correo: 'a@covalto.com' }, null])
    desuscribir()
    expect(unsubscribe).toHaveBeenCalledOnce()
  })
})
