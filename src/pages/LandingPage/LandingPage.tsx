/**
 * LandingPage.tsx — pantalla 1 (PRODUCT_SPEC §3): hero inmersivo sin el
 * chrome de la app. En Covalto, hero centrado con la marca; en Espacial, el
 * espacio exterior de fondo y el astronauta a dos columnas. Las diferencias
 * de layout usan la variante `espacial:` (src/styles/tailwind-tema.css).
 */
import { FondoEspacial } from '@/components/espacio'
import { SoloEnTema } from '@/theme'
import { EncabezadoLanding } from './EncabezadoLanding'
import { HeroTexto } from './HeroTexto'
import { IlustracionHero } from './IlustracionHero'

/** Orquesta la landing: fondo del tema, encabezado y hero */
export function LandingPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden text-text-on-dark" style={{ background: 'var(--gradient-hero)' }}>
      <SoloEnTema tema="espacial">
        <FondoEspacial />
      </SoloEnTema>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'var(--gradient-space-accent)' }} />

      <EncabezadoLanding />

      <main className="relative mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-16 text-center espacial:max-w-5xl espacial:pt-10 espacial:lg:flex-row espacial:lg:items-center espacial:lg:gap-10 espacial:lg:pt-16 espacial:lg:text-left">
        <HeroTexto />
        <IlustracionHero />
      </main>
    </div>
  )
}
