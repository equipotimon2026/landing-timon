'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/landing/Navbar'
import { HeroEntrada } from '@/components/landing/HeroEntrada'
import { InputSection } from '@/components/landing/InputSection'
import { OutputSection } from '@/components/landing/OutputSection'
import { Footer } from '@/components/landing/Footer'
import { ColegiosSection } from '@/components/landing/ColegiosSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { FloatingChat } from '@/components/landing/FloatingChat'
import { ScrollProgress } from '@/components/landing/ScrollProgress'

type Audience = 'universal' | 'colegios' | 'pricing'

export default function Home() {
  const [audience, setAudience] = useState<Audience>('universal')

  const handleSelect = (a: 'colegios' | 'pricing') => {
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
        : audience === 'pricing'
        ? 'Timon — Planes y Precios'
        : 'Timon — Claridad antes de elegir'
  }, [audience])

  return (
    <main className="flex-1 flex flex-col bg-[var(--cream)] paper-grain">
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
            <OutputSection onPricing={() => handleSelect('pricing')} />
            <FaqSection />
          </>
        )}
        {audience === 'colegios' && <ColegiosSection onBack={handleReset} />}
        {audience === 'pricing' && <PricingSection onBack={handleReset} />}
      </div>

      <Footer />
      <FloatingChat />
    </main>
  )
}
