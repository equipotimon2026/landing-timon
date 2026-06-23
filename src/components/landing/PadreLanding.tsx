'use client'

import { ArrowRight } from 'lucide-react'
import { ReportPreview } from './ReportPreview'
import { BeforeAfter } from './BeforeAfter'
import { WheelMark } from './Logo'
import { Marquee } from './Marquee'
import { SectionMark } from './SectionMark'
import { AnimatedCounter } from './AnimatedCounter'
import { useInView } from '@/hooks/useInView'

const PRODUCT_URL = 'https://app.timon.com.ar'

type Props = { onBack: () => void; onPricing: () => void }

const STATS: {
  pre?: string
  to: number
  unit: string
  label: string
  source: string
}[] = [
  {
    to: 40,
    unit: '%',
    label: 'de los chicos que arrancan una carrera la dejan o cambian en el primer año.',
    source: 'Universidad Torcuato Di Tella',
  },
  {
    to: 52,
    unit: '%',
    label: 'de los adolescentes argentinos de 15 años no puede proyectar qué ocupación tendrá en su vida laboral.',
    source: 'Observatorio de Argentinos por la Educación',
  },
  {
    to: 1,
    unit: 'de 5',
    label: 'termina la carrera elegida en el tiempo nominal previsto.',
    source: 'Universidad de Belgrano',
  },
  {
    pre: 'USD ',
    to: 30,
    unit: 'K',
    label: 'la inversión promedio entre aranceles y costo de oportunidad de una carrera no terminada.',
    source: 'Cálculo Fin. en base aranceles promedio de Universidades Privadas',
  },
]

const PROMISES = [
  {
    n: '01',
    name: 'El punto de partida',
    text: 'De la incertidumbre a tener sus intereses y fricciones descritos con claridad.',
  },
  {
    n: '02',
    name: 'El universo de opciones',
    text: 'Carreras nuevas y tradicionales, descritas con profundidad para entender la realidad de cada una.',
  },
  {
    n: '03',
    name: 'El Por qué',
    text: 'Argumentos concretos del por qué se adapta con su perfil.',
  },
  {
    n: '04',
    name: 'El mundo real',
    text: 'Universidades, costos actualizados, salidas laborales y rangos salariales.',
  },
]

function StatCard({ stat, idx }: { stat: (typeof STATS)[number]; idx: number }) {
  const reveal = useInView<HTMLDivElement>({ threshold: 0.35 })
  return (
    <div
      ref={reveal.ref}
      className={`reveal reveal-delay-${idx + 1} ${reveal.inView ? 'is-visible' : ''} border-l border-[var(--navy-mid)] pl-8 py-3 hover:border-l-[var(--terra)] transition-colors`}
    >
      <div
        className="font-display font-light text-[var(--cream)] mb-5"
        style={{
          fontSize: 'clamp(2.25rem, 7vw, 5.75rem)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        {stat.pre && (
          <span className="text-[1.75rem] sm:text-[2rem] align-baseline mr-1 text-[var(--ocean-light)] font-normal">
            {stat.pre}
          </span>
        )}
        <span className="font-normal text-[var(--terra-soft)]">
          <AnimatedCounter to={stat.to} />
        </span>
        <span className="text-[1.75rem] sm:text-[2rem] align-baseline ml-1 text-[var(--ocean-light)] font-normal">
          {stat.unit}
        </span>
      </div>
      <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[var(--cream)]/85 mb-3 max-w-[280px]">
        {stat.label}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cream)]/50">
        {stat.source}
      </p>
    </div>
  )
}

function PromiseCard({ item, idx }: { item: (typeof PROMISES)[number]; idx: number }) {
  const reveal = useInView<HTMLDivElement>({ threshold: 0.3 })
  return (
    <article
      ref={reveal.ref}
      className={`reveal reveal-delay-${(idx % 2) + 1} ${reveal.inView ? 'is-visible' : ''} group relative bg-[var(--cream)] p-6 sm:p-12 transition-colors hover:bg-[var(--cream-elev)]`}
    >
      <div className="flex items-baseline gap-5 mb-6">
        <span
          className="font-display font-light text-[var(--ocean)]/70"
          style={{
            fontSize: '2.25rem',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {item.n}
        </span>
        <span className="h-px flex-1 bg-[var(--border-cream-strong)] mb-2" />
      </div>
      <h3
        className="font-display text-[var(--navy)] mb-5"
        style={{
          fontWeight: 400,
          fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
        }}
      >
        {item.name}
      </h3>
      <p className="text-[1rem] sm:text-[1.0625rem] leading-[1.65] text-[var(--navy)]/75 max-w-[420px]">{item.text}</p>
    </article>
  )
}

export function PadreLanding({ onBack: _onBack, onPricing }: Props) {
  const heroLeft = useInView<HTMLDivElement>()
  const heroRight = useInView<HTMLDivElement>()
  const dataTitle = useInView<HTMLDivElement>()
  const promisesTitle = useInView<HTMLDivElement>()
  const rolBlock = useInView<HTMLDivElement>()
  const closing = useInView<HTMLHeadingElement>()

  return (
    <div className="animate-fade-in bg-[var(--cream)]">
      {/* HERO */}
      <section className="relative overflow-hidden flex flex-col min-h-[100dvh] sm:min-h-0" style={{ marginTop: '-4rem', paddingTop: '4rem' }}>
        {/* Animated gradient mesh */}
        <div className="mesh-stage" aria-hidden>
          <div className="mesh-blob mesh-blob--ocean-a" />
          <div className="mesh-blob mesh-blob--terra" />
          <div className="mesh-blob mesh-blob--ocean-b" />
        </div>

        {/* Section number — offset by extra paddingTop */}
        <div className="absolute top-24 sm:top-[6.5rem] right-5 sm:right-8 lg:right-12 xl:right-[5vw] 2xl:right-[6vw] font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] z-10">
          02 / Padre o madre
        </div>

        <div className="relative flex-1 w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] flex flex-col justify-center sm:justify-start sm:pt-28 sm:pb-32 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-start">
            <div ref={heroLeft.ref} className={`reveal ${heroLeft.inView ? 'is-visible' : ''}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] mb-4 sm:mb-8 inline-flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--ocean)]/60" />
                Padre o madre
              </p>

              <h1
                className="font-display font-light text-[var(--navy)] mb-5 sm:mb-12"
                style={{
                  fontSize: 'clamp(2.25rem, 10vw, 4rem)',
                  lineHeight: 0.97,
                  letterSpacing: '-0.04em',
                }}
              >
                Para identificar<br />
                intereses reales<br />
                y elegir qué estudiar{' '}
                <span className="text-[var(--ocean)] font-normal not-italic">
                  sin improvisar.
                </span>
              </h1>

              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--hueso)]">
                  Privado · a su propio ritmo
                </p>
            </div>

            <div ref={heroRight.ref} className={`reveal reveal-delay-3 ${heroRight.inView ? 'is-visible' : ''} hidden sm:block lg:pl-4 max-w-md mx-auto w-full`}>
              <ReportPreview />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Marquee variant="universities" surface="cream" speedSec={70} />
        </div>
      </section>

      {/* ─── DATA SLAB — navy bg, evidencia ─── */}
      <section className="relative bg-[var(--navy)] text-[var(--cream)] border-y border-[var(--navy-mid)] overflow-hidden">
        <SectionMark label="02" position="top-right" tone="cream" />

        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-16 sm:py-24">
          <div
            ref={dataTitle.ref}
            className={`reveal ${dataTitle.inView ? 'is-visible' : ''} max-w-[920px] mb-12 sm:mb-16`}
          >
            <p className="font-mono text-[11px] font-medium text-[var(--ocean-light)] uppercase tracking-[0.16em] mb-7 inline-flex items-center gap-3">
              <span className="w-8 h-px bg-current opacity-50" />
              02 · Evidencia
            </p>
            <h2
              className="font-display font-light text-[var(--cream)]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.25rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
              }}
            >
              El costo de elegir{' '}
              <span className="text-[var(--terra-soft)] font-normal not-italic">
                sin información.
              </span>
            </h2>
            <p className="mt-7 text-[var(--cream)]/75 text-[1.0625rem] sm:text-[1.1875rem] leading-[1.55] max-w-[680px]">
              Cuatro cifras de fuentes públicas que dimensionan lo que hoy carga cada familia argentina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, idx) => (
              <StatCard key={idx} stat={s} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Careers marquee on navy surface */}
      <Marquee variant="careers" surface="navy" speedSec={75} />

      {/* ─── 4 PROMESAS ─── */}
      <section className="relative bg-[var(--cream)] overflow-hidden">
        <SectionMark label="03" position="bottom-left" tone="ocean" opacity={0.55} />

        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-16 sm:py-24">
          <div
            ref={promisesTitle.ref}
            className={`reveal ${promisesTitle.inView ? 'is-visible' : ''} max-w-[920px] mb-12 sm:mb-16`}
          >
            <p className="eyebrow eyebrow--with-rule mb-7">Lo que se lleva</p>
            <h2
              className="font-display font-light text-[var(--navy)]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
              }}
            >
              Más que información.{' '}
              <span className="text-[var(--ocean)] font-normal not-italic">
                Capacidad de decidir.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-cream)]">
            {PROMISES.map((item, idx) => (
              <PromiseCard key={item.n} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA INTERMEDIO ─── */}
      <section className="bg-[var(--cream)] border-t border-[var(--border-cream)] py-12 sm:py-16 text-center">
        <button
          onClick={onPricing}
          className="group inline-flex items-center gap-3 px-8 py-[18px] rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] font-medium text-[15px] hover:bg-[var(--ocean-deep)] transition-all cursor-pointer"
          style={{ boxShadow: '0 12px 32px rgba(30, 91, 160, 0.20)' }}
        >
          Dar acceso al recorrido
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>

      {/* ─── ANTES / DESPUÉS — JTBD shift padre ─── */}
      <BeforeAfter
        eyebrow="El cambio"
        title="El impacto de la"
        titleEm="información."
        subtitle="Lo que sí va a pasar."
        beforeLabel="Sin Timon"
        afterLabel="Con Timon"
        pairs={[
          { before: 'Mi hijo queda en la nebulosa.', after: 'Sale con un mapa de opciones que entendió y comparó.' },
          { before: 'Estudia años algo que no le convence.', after: 'Sabe de qué se trata su carrera antes de empezar.' },
          { before: 'Elige con dudas y por descarte.', after: 'Decide con convicción antes de invertir 4 años y USD 30K.' },
        ]}
      />

      {/* ─── TU ROL ─── */}
      <section className="relative bg-[var(--cream-elev)] border-y border-[var(--border-cream)] overflow-hidden">
        <SectionMark label="05" position="top-right" tone="terra" opacity={0.6} />

        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-16 sm:py-24">
          <div
            ref={rolBlock.ref}
            className={`reveal ${rolBlock.inView ? 'is-visible' : ''} max-w-[760px]`}
          >
            <p className="eyebrow eyebrow--with-rule mb-7">Tu rol en el proceso</p>
            <h2
              className="font-display font-light text-[var(--navy)] mb-10 sm:mb-12"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
              }}
            >
              Facilitar la herramienta.
            </h2>

            <ul className="border-t border-dashed border-[var(--border-cream-strong)]">
              {[
                {
                  strong: 'Hacés posible que empiece:',
                  rest: 'Eso solo ya cambia las cosas.',
                },
                {
                  strong: 'Esperar sin invadir:',
                  rest: 'El recorrido es privado y tiene su tiempo.',
                },
                {
                  strong: 'Información sobre la mesa:',
                  rest: 'Datos de oferta y costos, sin discutir en el aire.',
                },
              ].map((line) => (
                <li
                  key={line.strong}
                  className="grid grid-cols-[24px_1fr] gap-4 py-6 border-b border-dashed border-[var(--border-cream-strong)] hover:bg-[var(--cream)] transition-colors -mx-3 px-3 rounded-md"
                >
                  <span className="text-[var(--ocean)] font-mono text-[15px] font-semibold leading-[1.5]">+</span>
                  <p className="text-[var(--navy)] text-[16px] sm:text-[17px] leading-[1.6]">
                    <span className="font-semibold text-[var(--navy)]">
                      {line.strong}
                    </span>{' '}
                    <span className="text-[var(--navy)]/75">{line.rest}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="relative bg-[var(--cream)] overflow-hidden">
        <SectionMark label="06" position="bottom-right" tone="terra" />

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
            ref={closing.ref}
            className={`reveal ${closing.inView ? 'is-visible' : ''} font-display font-light text-[var(--navy)] mb-10 sm:mb-12 mx-auto max-w-[820px]`}
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
          <button
            onClick={onPricing}
            className="group inline-flex items-center gap-3 px-8 py-[18px] rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] font-medium text-[15px] hover:bg-[var(--ocean-deep)] transition-all cursor-pointer"
            style={{ boxShadow: '0 12px 32px rgba(30, 91, 160, 0.20)' }}
          >
            Dar acceso al recorrido
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--hueso)]">
            Hoy es un buen momento para que arranque.
          </p>
        </div>
      </section>
    </div>
  )
}
