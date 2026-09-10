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
      <div className="shell relative pt-20 pb-8 sm:pt-28 sm:pb-12">
        <div ref={titleReveal.ref} className={`reveal ${titleReveal.inView ? 'is-visible' : ''} mx-auto max-w-[46rem] text-center`}>
          <p className="eyebrow eyebrow--with-rule eyebrow--center mb-7">Cómo es el recorrido</p>
          <h2
            className="font-display font-extrabold text-[var(--navy)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)', lineHeight: 1.02, letterSpacing: '-0.04em' }}
          >
            ¿Cómo funciona Timon?
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-relaxed text-[var(--hueso)] mx-auto max-w-[60ch] mb-6">
            No es un formulario. Son módulos que revelan cómo pensás, qué te mueve y qué te frena.
          </p>
          {!isMobile && <ViewToggle value={view} onChange={setView} options={['phone', 'desktop']} />}
        </div>
      </div>

      <div className="w-full pb-20 sm:pb-28">
        {view === 'phone' && <PhoneCarousel />}
        {view === 'desktop' && (
          <div className="shell">
            <InputMacBook />
          </div>
        )}
      </div>
    </section>
  )
}
