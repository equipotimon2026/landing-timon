'use client'

import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { PhoneCarousel } from './PhoneCarousel'
import { InputMacBook } from './InputMacBook'
import { ViewToggle, ViewMode } from './ViewToggle'

const C = {
  creamElev: '#FFFFFF',
  creamBorder: '#E3E8F0',
  creamDeep: '#F1EEE7',
  navy: '#0F1F36',
  ocean: '#2563EB',
  hueso: '#5A6B85',
}


export function InputSection() {
  const [isMobile, setIsMobile] = useState(true)
  const [view, setView] = useState<ViewMode>('phone')
  const titleReveal = useInView<HTMLDivElement>({ threshold: 0.2 })

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile && view === 'desktop') setView('phone')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative border-t border-[var(--border-cream)] bg-[var(--cream)] overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div ref={titleReveal.ref} className={`reveal ${titleReveal.inView ? 'is-visible' : ''} max-w-[920px]`}>
          <p className="eyebrow eyebrow--with-rule mb-7">Cómo es el recorrido</p>
          <h2
            className="font-display font-extrabold text-[var(--navy)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)', lineHeight: 1.02, letterSpacing: '-0.04em' }}
          >
            ¿Cómo funciona Timon?
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-relaxed text-[var(--hueso)] max-w-[60ch] mb-6">
            No es un formulario. Son módulos que revelan cómo pensás, qué te mueve y qué te frena.
          </p>
          {!isMobile && <ViewToggle value={view} onChange={setView} options={['phone', 'desktop']} />}
        </div>
      </div>

      <div className="w-full pb-16 sm:pb-24">
        {view === 'phone' && <PhoneCarousel />}
        {view === 'desktop' && (
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <InputMacBook />
          </div>
        )}
      </div>
    </section>
  )
}
