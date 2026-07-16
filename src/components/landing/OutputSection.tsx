'use client'

import { ArrowRight } from 'lucide-react'
import { BeforeAfter } from './BeforeAfter'
import { WheelMark } from './Logo'
import { SectionMark } from './SectionMark'
import { ReportCarousel } from './ReportCarousel'
import { useInView } from '@/hooks/useInView'

type Props = { onPricing: () => void }

export function OutputSection({ onPricing }: Props) {
  const titleReveal = useInView<HTMLDivElement>({ threshold: 0.2 })
  const closingTitle = useInView<HTMLHeadingElement>()

  return (
    <>
      {/* 1. El Cambio — BeforeAfter primero */}
      <BeforeAfter
        eyebrow="El antes y el después"
        title="De la incertidumbre"
        titleEm="a tener el mapa en tus manos."
        beforeLabel="Tu realidad hoy"
        afterLabel="Tu realidad con Timon"
        pairs={[
          {
            before: '"No sé qué carreras van conmigo."',
            after: 'Entendés qué opciones encajan con tu perfil, y exactamente por qué.',
          },
          {
            before: '"No sé bien de qué se trata cada una."',
            after: 'Tenés el detalle real y los planes de estudio de cada carrera.',
          },
          {
            before: '"No sé dónde se estudia ni qué me conviene."',
            after: 'Conocés las universidades argentinas reales según tus posibilidades.',
          },
          {
            before: '"No sé a qué laburo te lleva cada carrera."',
            after: 'Accedés a las salidas laborales y los rangos salariales actuales.',
          },
        ]}
      />

      {/* 2. Lo que se lleva — después de El Cambio */}
      <section className="relative border-t border-[var(--border-cream)] bg-[var(--cream-elev)] overflow-hidden">
        <SectionMark label="03" position="top-left" tone="ocean" opacity={0.55} />

        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-16 sm:py-24">
          <div
            ref={titleReveal.ref}
            className={`reveal ${titleReveal.inView ? 'is-visible' : ''} mb-14 sm:mb-20`}
          >
            <p className="eyebrow eyebrow--with-rule mb-7">Lo que se lleva</p>
            <h2
              className="font-display font-light text-[var(--navy)] mb-5 max-w-[760px]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
              }}
            >
              ¿Qué devuelve Timon?
            </h2>
            <p className="text-[1rem] sm:text-[1.125rem] leading-[1.65] text-[var(--navy)]/65 w-full mb-8 sm:mb-10">
              Sección de introspección, carreras, universidades y mercado laboral.
            </p>
            <ReportCarousel />
          </div>

        </div>
      </section>

      {/* 3. CTA Final */}
      <section className="relative bg-[var(--cream-elev)] border-t border-[var(--border-cream)] overflow-hidden">
        <SectionMark label="04" position="bottom-right" tone="terra" />

        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-16 sm:py-24 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] mb-8 inline-flex items-center gap-3 justify-center">
            <span className="w-8 h-px bg-[var(--terra)]/60" />
            Cierre
            <span className="w-8 h-px bg-[var(--terra)]/60" />
          </p>
          <div className="flex justify-center mb-6">
            <WheelMark tone="terra" size={48} className="spin-helm-slow" />
          </div>
          <h2
            ref={closingTitle.ref}
            className={`reveal ${closingTitle.inView ? 'is-visible' : ''} font-display font-light text-[var(--navy)] mb-10 sm:mb-12 mx-auto max-w-[820px]`}
            style={{
              fontSize: 'clamp(1.9rem, 6.5vw, 5.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.045em',
            }}
          >
            Claridad{' '}
            <span className="text-[var(--ocean)] font-normal not-italic">
              antes
            </span>{' '}
            de elegir.
          </h2>
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
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--hueso)]">
            Privado · sin límite de tiempo
          </p>
        </div>
      </section>
    </>
  )
}
