'use client'

import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { Marquee } from './Marquee'
import { Logo } from './Logo'

type Props = {
  onPricing: () => void
}

export function HeroUniversal({ onPricing }: Props) {
  const headline = useInView<HTMLDivElement>()
  const sub = useInView<HTMLDivElement>()
  const cta = useInView<HTMLDivElement>()

  return (
    <section
      className="relative overflow-hidden flex flex-col bg-[var(--cream)]"
      style={{ minHeight: '100dvh', marginTop: '-4rem', paddingTop: '4rem' }}
    >
      <div className="mesh-stage" aria-hidden>
        <div className="mesh-blob mesh-blob--ocean-a" />
        <div className="mesh-blob mesh-blob--terra" />
        <div className="mesh-blob mesh-blob--ocean-b" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-8 sm:py-12 z-10">
        <div
          ref={headline.ref}
          className={`reveal ${headline.inView ? 'is-visible' : ''} mb-8 sm:mb-12`}
        >
          <div className="flex items-center gap-3">
            <Logo tone="navy" size={96} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--hueso)] hidden sm:inline-flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--border-cream-strong)]">
              Claridad antes de elegir
            </span>
          </div>
        </div>

        <div
          ref={sub.ref}
          className={`reveal reveal-delay-2 ${sub.inView ? 'is-visible' : ''}`}
        >
          <h1
            className="font-display font-light text-[var(--navy)] mb-5 sm:mb-7 w-full"
            style={{
              fontSize: 'clamp(1.9rem, 6.5vw, 5.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.045em',
            }}
          >
            Descubrí{' '}
            <span className="text-[var(--ocean)] font-normal not-italic">cómo</span>
            {' '}pensás,{' '}
            <span className="text-[var(--ocean)] font-normal not-italic">qué</span>
            {' '}estudiar y{' '}
            <span className="text-[var(--ocean)] font-normal not-italic">dónde</span>
            {' '}empezar.
          </h1>

        </div>

        <div
          ref={cta.ref}
          className={`reveal reveal-delay-3 ${cta.inView ? 'is-visible' : ''} flex flex-col items-start gap-4`}
        >
          <a
            href="https://app.timonear.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-[18px] rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] font-medium text-[15px] hover:bg-[var(--ocean-deep)] transition-all cursor-pointer"
            style={{ boxShadow: '0 12px 32px rgba(30, 91, 160, 0.20)' }}
          >
            Empezar el recorrido
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div className="relative mt-auto">
        <Marquee variant="careers" surface="cream" speedSec={70} />
      </div>
    </section>
  )
}
