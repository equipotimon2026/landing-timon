'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { Marquee } from './Marquee'
import { Logo } from './Logo'

type Props = {
  onSelect: (a: 'estudiante' | 'padre') => void
}

type Path = 'estudiante' | 'padre' | null

export function HeroUniversal({ onSelect }: Props) {
  const headline = useInView<HTMLDivElement>()
  const sub = useInView<HTMLParagraphElement>()
  const fork = useInView<HTMLDivElement>()

  const [hovered, setHovered] = useState<Path>(null)

  return (
    <section
      className="relative overflow-hidden flex flex-col bg-[var(--cream)]"
      style={{ minHeight: '100dvh', marginTop: '-4rem', paddingTop: '4rem' }}
    >
      {/* Animated gradient mesh — soft brand-color flow */}
      <div className="mesh-stage" aria-hidden>
        <div className="mesh-blob mesh-blob--ocean-a" />
        <div className="mesh-blob mesh-blob--terra" />
        <div className="mesh-blob mesh-blob--ocean-b" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col sm:justify-between w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] pt-8 sm:pt-8 pb-8 sm:pb-10 z-10">
        {/* TOP — logo, desktop only */}
        <div
          ref={headline.ref}
          className={`reveal ${headline.inView ? 'is-visible' : ''}`}
        >
          <div className="flex items-center gap-3">
            <Logo tone="navy" size={48} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--hueso)] hidden sm:inline-flex items-center gap-3 before:content-[''] before:w-6 before:h-px before:bg-[var(--border-cream-strong)]">
              Claridad antes de elegir
            </span>
          </div>
        </div>

        {/* MIDDLE — title + subtitle, centrado verticalmente en mobile */}
        <div
          ref={sub.ref}
          className={`reveal reveal-delay-2 ${sub.inView ? 'is-visible' : ''} min-h-[72dvh] sm:min-h-0 flex flex-col justify-center sm:flex-none sm:justify-start`}
        >
          <h1
            className="font-display font-light text-[var(--navy)] mb-4 sm:mb-6"
            style={{
              fontSize: 'clamp(2.75rem, 11.5vw, 4rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.045em',
            }}
          >
            Para definir qué{' '}
            <span className="text-[var(--ocean)] font-normal not-italic">
              Carrera y Universidad
            </span>{' '}
            elegir.
          </h1>

          <p className="text-[14px] sm:text-[17px] xl:text-[18px] leading-[1.55] text-[var(--navy)]/65 max-w-[580px]">
            Carreras a tu medida con la información que importa: Qué son, dónde se estudian, cuánto cuestan y el mercado laboral.
          </p>
        </div>

        {/* BOTTOM — fork cards */}
        <div>
          {/* Tiny eyebrow */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--hueso)]">
              ¿Quién sos?
            </span>
            <span className="flex-1 h-px bg-[var(--border-cream-strong)]" />
          </div>

          {/* Two cards — compact, less visual weight */}
          <div
            ref={fork.ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
          >
            {/* TEEN CARD */}
            <button
              onClick={() => onSelect('estudiante')}
              onMouseEnter={() => setHovered('estudiante')}
              onMouseLeave={() => setHovered(null)}
              className={`reveal reveal-delay-3 ${fork.inView ? 'is-visible' : ''} group relative text-left rounded-2xl overflow-hidden px-7 py-6 sm:px-9 sm:py-8 cursor-pointer transition-[transform,opacity,box-shadow] duration-700 ease-out`}
              style={{
                background: 'var(--ocean)',
                color: 'var(--cream-elev)',
                transform: hovered === 'estudiante' ? 'scale(1.012)' : hovered === 'padre' ? 'scale(0.988)' : 'scale(1)',
                opacity: hovered === 'padre' ? 0.6 : 1,
                boxShadow:
                  hovered === 'estudiante'
                    ? '0 24px 60px rgba(30, 91, 160, 0.28)'
                    : '0 12px 32px rgba(30, 91, 160, 0.18)',
              }}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-baseline gap-4 min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold opacity-80 shrink-0">
                    01
                  </span>
                  <h3
                    className="font-display font-light truncate"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.1,
                    }}
                  >
                    Soy <span className="font-normal">estudiante</span>
                  </h3>
                </div>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.5] opacity-75 max-w-[420px]">
                14–18 años · Empiezo el recorrido a mi tiempo.
              </p>
            </button>

            {/* PADRE CARD */}
            <button
              onClick={() => onSelect('padre')}
              onMouseEnter={() => setHovered('padre')}
              onMouseLeave={() => setHovered(null)}
              className={`reveal reveal-delay-4 ${fork.inView ? 'is-visible' : ''} group relative text-left rounded-2xl overflow-hidden px-7 py-6 sm:px-9 sm:py-8 cursor-pointer transition-[transform,opacity,box-shadow,border-color] duration-700 ease-out`}
              style={{
                background: 'var(--cream-elev)',
                color: 'var(--navy)',
                border: '1px solid var(--border-cream)',
                transform: hovered === 'padre' ? 'scale(1.012)' : hovered === 'estudiante' ? 'scale(0.988)' : 'scale(1)',
                opacity: hovered === 'estudiante' ? 0.6 : 1,
                boxShadow:
                  hovered === 'padre'
                    ? '0 24px 60px rgba(15, 31, 54, 0.12)'
                    : '0 6px 18px rgba(15, 31, 54, 0.04)',
                borderColor: hovered === 'padre' ? 'var(--ocean)' : 'var(--border-cream)',
              }}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-baseline gap-4 min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--ocean)] shrink-0">
                    02
                  </span>
                  <h3
                    className="font-display font-light truncate"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.1,
                    }}
                  >
                    Soy <span className="text-[var(--ocean)] font-normal">padre/madre</span>
                  </h3>
                </div>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--hueso)] group-hover:text-[var(--ocean)] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.5] text-[var(--navy)]/65 max-w-[420px]">
                Habilito el recorrido para mi hijo/a. Privado · a su tiempo.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee anchored to bottom of viewport */}
      <div className="relative mt-auto">
        <Marquee variant="universities" surface="cream" speedSec={70} />
      </div>
    </section>
  )
}
