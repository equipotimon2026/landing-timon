'use client'

import { WheelMark } from './Logo'

type Pair = { before: string; after: string }

type Props = {
  eyebrow: string
  title: string
  titleEm?: string
  subtitle?: string
  beforeLabel?: string
  afterLabel?: string
  pairs: Pair[]
}

/**
 * Two-column shift composition with stronger visual contrast.
 * Left column: cream-deep, muted, italic Fraunces — "el antes".
 * Right column: cream-elev with ocean accent, bold IBM Plex — "el después".
 * Center column on desktop: a vertical thread with ⌖ markers
 * tying each pair across the gutter.
 */
export function BeforeAfter({
  eyebrow,
  title,
  titleEm,
  subtitle,
  beforeLabel = 'Hoy',
  afterLabel = 'Con Timon',
  pairs,
}: Props) {
  return (
    <section className="relative py-20 sm:py-28 border-y border-[var(--border-cream)] bg-[var(--cream-elev)] overflow-hidden">
      {/* Decorative editorial halo */}
      <div
        className="absolute pointer-events-none ocean-orb"
        style={{ top: '20%', right: '-10%', width: 600, height: 600 }}
      />

      <div className="shell relative">
        <div className="mx-auto mb-14 max-w-[46rem] text-center sm:mb-16">
          <p className="eyebrow eyebrow--with-rule eyebrow--center mb-7">{eyebrow}</p>
          <h2
            className="font-display font-extrabold text-[var(--navy)]"
            style={{
              fontSize: 'clamp(2rem, 4.6vw, 3.6rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
            }}
          >
            {title}{' '}
            {titleEm && (
              <span className="serif-accent text-[var(--ocean)]">
                {titleEm}
              </span>
            )}
          </h2>
          {subtitle && (
            <p className="mt-5 text-[1.0625rem] sm:text-[1.125rem] leading-[1.55] text-[var(--navy)]/65 mx-auto max-w-[560px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Column headers — visible on lg up */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_72px_1fr] gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--hueso)] font-semibold">
              {beforeLabel}
            </span>
            <span className="flex-1 h-px bg-[var(--border-cream-strong)]" />
          </div>
          <div />
          <div className="flex items-center gap-3">
            <span className="flex-1 h-px bg-[var(--ocean)]/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ocean)] font-semibold">
              {afterLabel}
            </span>
          </div>
        </div>

        {/* Pairs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_72px_1fr] gap-6 lg:gap-0">
          {/* Mobile labels group + pair rendering */}
          {pairs.map((p, idx) => (
            <div key={idx} className="lg:contents flex flex-col gap-2">
              {/* BEFORE card */}
              <div
                className="relative rounded-2xl border border-dashed border-[var(--border-cream-strong)] bg-[var(--cream-deep)]/60 px-6 py-6 lg:py-7 lg:mb-3 transition-all hover:border-[var(--border-cream-strong)]"
              >
                <span className="lg:hidden font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--hueso)] block mb-2">
                  {beforeLabel}
                </span>
                <p
                  className="font-sans text-[var(--navy)]/55 leading-[1.45]"
                  style={{
                    fontWeight: 400,
                    fontSize: '1.0625rem',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {p.before}
                </p>
              </div>

              {/* CENTER — visual thread with ⌖ marker */}
              <div className="hidden lg:flex relative items-center justify-center lg:mb-3">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[var(--border-cream-strong)] via-[var(--terra)]/40 to-[var(--ocean)]/40" />
                <div
                  className="relative z-10 w-10 h-10 rounded-full bg-[var(--cream-elev)] border border-[var(--border-cream)] flex items-center justify-center"
                  style={{ boxShadow: 'var(--glass-shadow)' }}
                >
                  <WheelMark tone="ocean" size={20} />
                </div>
              </div>

              {/* AFTER card */}
              <div
                className="relative rounded-2xl bg-[var(--cream)] px-6 py-6 lg:py-7 lg:mb-3 border-l-[3px] border border-[var(--border-cream)] transition-all hover:border-[var(--ocean)]"
                style={{ borderLeftColor: 'var(--ocean)' }}
              >
                <span className="lg:hidden font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--ocean)] block mb-2">
                  {afterLabel}
                </span>
                <p
                  className="text-[var(--navy)] font-medium leading-[1.4]"
                  style={{
                    fontSize: '1.0625rem',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {p.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
