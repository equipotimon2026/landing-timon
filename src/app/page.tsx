'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/landing/Navbar'
import { HeroUniversal } from '@/components/landing/HeroUniversal'
import { EstudianteLanding } from '@/components/landing/EstudianteLanding'
import { PadreLanding } from '@/components/landing/PadreLanding'
import { Footer } from '@/components/landing/Footer'
import { ColegiosSection } from '@/components/landing/ColegiosSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FloatingChat } from '@/components/landing/FloatingChat'
import { ScrollProgress } from '@/components/landing/ScrollProgress'

type Audience = 'universal' | 'estudiante' | 'padre' | 'colegios' | 'pricing'

export default function Home() {
  const [audience, setAudience] = useState<Audience>('universal')

  const handleSelect = (a: 'estudiante' | 'padre' | 'colegios' | 'pricing') => {
    setAudience(a)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleReset = () => {
    setAudience('universal')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    document.title =
      audience === 'estudiante'
        ? 'Timon — El primer paso no es elegir. Es entenderte.'
        : audience === 'padre'
        ? 'Timon — Que salga de la nebulosa con un mapa propio'
        : audience === 'colegios'
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
        {audience === 'universal' && <HeroUniversal onSelect={handleSelect} />}
        {audience === 'estudiante' && <EstudianteLanding onBack={handleReset} onPricing={() => handleSelect('pricing')} />}
        {audience === 'padre' && <PadreLanding onBack={handleReset} onPricing={() => handleSelect('pricing')} />}
        {audience === 'colegios' && <ColegiosSection onBack={handleReset} />}
        {audience === 'pricing' && <PricingSection onBack={handleReset} />}
      </div>

      <Footer />
      <FloatingChat />
    </main>
  )
}
