'use client'

import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { SectionMark } from './SectionMark'
import { PhoneCarousel } from './PhoneCarousel'
import { InputMacBook } from './InputMacBook'
import { ViewToggle, ViewMode } from './ViewToggle'

const C = {
  creamElev: '#FFFFFF',
  creamBorder: '#E9E3D8',
  creamDeep: '#F1ECE2',
  navy: '#0F1B33',
  ocean: '#2563EB',
  hueso: '#6B7793',
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
      <SectionMark label="02" position="top-left" tone="ocean" opacity={0.55} />

      <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div ref={titleReveal.ref} className={`reveal ${titleReveal.inView ? 'is-visible' : ''} max-w-[920px]`}>
          <p className="eyebrow eyebrow--with-rule mb-7">Cómo es el recorrido</p>
          <h2
            className="font-display font-light text-[var(--navy)] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.0, letterSpacing: '-0.04em' }}
          >
            ¿Cómo funciona Timon?
          </h2>
          <p className="text-[1rem] sm:text-[1.125rem] leading-[1.65] text-[var(--navy)]/75 w-full mb-6">
            No es un formulario. Son módulos que revelan cómo pensás, qué te mueve y qué te frena.
          </p>
          {!isMobile && <ViewToggle value={view} onChange={setView} options={['phone', 'desktop']} />}
        </div>
      </div>

      <div className="w-full pb-16 sm:pb-24">
        {view === 'phone' && <PhoneCarousel />}
        {view === 'desktop' && (
          <div className="px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw]">
            <InputMacBook />
          </div>
        )}
      </div>
    </section>
  )
}
