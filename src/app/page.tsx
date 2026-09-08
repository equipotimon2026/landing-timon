'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/landing/Navbar'
import { HeroEntrada } from '@/components/landing/HeroEntrada'
import { InputSection } from '@/components/landing/InputSection'
import { OutputSection } from '@/components/landing/OutputSection'
import { CierreSection } from '@/components/landing/CierreSection'
import { Footer } from '@/components/landing/Footer'
import { ColegiosSection } from '@/components/landing/ColegiosSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { FloatingChat } from '@/components/landing/FloatingChat'
import { ScrollProgress } from '@/components/landing/ScrollProgress'

type Audience = 'universal' | 'colegios'

/**
 * Orden de la home (reuniones del 06/09 y 07/09/2026):
 *
 *   1. Hero = la puerta de entrada (formulario).
 *   2. Cómo funciona (las paradas, en el teléfono y en la compu).
 *   3. Qué devuelve: el antes/después y un ejemplo tangible del informe.
 *   4. Precios, visibles en la misma página — Fede: "en ninguna parte está el
 *      precio visible de forma fácil".
 *   5. Preguntas frecuentes.
 *   6. Cierre con la llamada a empezar.
 *
 * "Para colegios" sigue siendo una vista aparte: es otro público.
 */
export default function Home() {
  const [audience, setAudience] = useState<Audience>('universal')

  const handleSelect = (a: 'colegios') => {
    setAudience(a)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleReset = () => {
    setAudience('universal')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    document.title =
      audience === 'colegios'
        ? 'Timon — Para colegios'
        : 'Timon — El primer paso no es elegir'
  }, [audience])

  return (
    <main className="flex-1 flex flex-col bg-[var(--cream)]">
      <ScrollProgress />
      <Navbar
        audience={audience}
        onLogoClick={handleReset}
        onSwitchAudience={handleSelect}
        onBack={handleReset}
      />

      <div className="flex-1">
        {audience === 'universal' && (
          <>
            <HeroEntrada />
            <div id="que-es">
              <InputSection />
            </div>
            <OutputSection />
            <PricingSection />
            <FaqSection />
            <CierreSection />
          </>
        )}
        {audience === 'colegios' && <ColegiosSection onBack={handleReset} />}
      </div>

      <Footer onColegios={() => handleSelect('colegios')} />
      <FloatingChat />
    </main>
  )
}
