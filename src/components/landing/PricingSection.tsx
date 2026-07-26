'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const PRODUCT_URL = 'https://app.timonear.com'

type Props = { onBack: () => void }

const C = {
  navy: '#0F1F36',
  ocean: '#1E5BA0',
  creamElev: '#FBF5EA',
  creamDeep: '#EDE2CF',
  creamBorder: '#E6DCC9',
  creamBorderStrong: '#D8CCB4',
  hueso: '#6B7B96',
  terra: '#C97F5E',
}

const BASE_PRICE = 140000
const PSICO_ADDON_PRICE = 50000

const MODALITIES = [
  { id: 'individual', name: 'Individual', size: '1 persona',     discountPct: 0,  discountNote: '',                   highlight: false },
  { id: 'amigos',    name: 'Amigos',     size: '4 personas',     discountPct: 25, discountNote: 'Si invitás 4 amigos tenés 25% off',       highlight: true  },
]

const BASE_FEATURES = [
  'Análisis de quién sos',
  'Carreras compatibles con tu perfil',
  'Universidades en Argentina',
  'Salida laboral y rangos salariales',
]

function formatPrice(n: number): string {
  return '$' + n.toLocaleString('es-AR')
}

function calcPrice(base: number, pct: number): number {
  return Math.round(base * (1 - pct / 100))
}

// ── Desktop table ──────────────────────────────────────────────────────────────

function DesktopTable() {
  const COL = 'grid-cols-[200px_1fr_1fr]'
  const cellBase = 'px-6 py-5 flex flex-col items-center justify-center text-center'

  return (
    <div className={`w-full hidden lg:block rounded-2xl overflow-hidden border border-[var(--border-cream)]`} style={{ background: C.creamElev }}>

      {/* Column headers */}
      <div className={`grid ${COL}`}>
        <div className="px-4 pt-7 pb-5 flex items-end justify-center text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: C.hueso }}>Funcionalidades</span>
        </div>
        {MODALITIES.map(m => (
          <div
            key={m.id}
            className="px-6 pt-7 pb-5 flex flex-col items-center text-center"
            style={{
              background: m.highlight ? C.ocean : 'transparent',
              borderLeft: `1px solid ${C.creamBorder}`,
            }}
          >
            {m.highlight && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 rounded-full mb-3" style={{ background: C.terra, color: C.creamElev }}>
                Mejor valor
              </span>
            )}
            <p className="font-display font-normal text-[1.3rem] tracking-[-0.02em]" style={{ color: m.highlight ? C.creamElev : C.navy }}>
              {m.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: m.highlight ? 'rgba(251,245,234,0.55)' : C.hueso }}>
              {m.size}
            </p>
            {m.discountNote && (
              <p
                className="text-[11px] leading-snug mt-2 max-w-[160px]"
                style={{ color: m.highlight ? 'rgba(251,245,234,0.75)' : C.ocean }}
              >
                {m.discountNote}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Price row */}
      <div className={`grid ${COL} border-t border-[var(--border-cream)]`}>
        <div className="px-4 py-5 flex items-center justify-center text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: C.hueso }}>Precio</span>
        </div>
        {MODALITIES.map(m => {
          const total = calcPrice(BASE_PRICE, m.discountPct)
          return (
            <div key={m.id} className={cellBase} style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
              <span className="font-display font-light tracking-[-0.035em]" style={{ fontSize: '1.75rem', color: C.navy }}>
                {formatPrice(total)}
              </span>
              {m.discountPct > 0 && (
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] mt-0.5" style={{ color: C.hueso }}>c/u</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Feature rows */}
      {BASE_FEATURES.map(feat => (
        <div key={feat} className={`grid ${COL} border-t border-[var(--border-cream)]`}>
          <div className="px-4 py-5 flex items-center justify-center text-center">
            <span className="text-[13px] leading-snug" style={{ color: C.navy }}>{feat}</span>
          </div>
          {MODALITIES.map(m => (
            <div key={m.id} className={cellBase} style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
              <Check size={16} style={{ color: C.ocean }} strokeWidth={2.5} />
            </div>
          ))}
        </div>
      ))}

      {/* Add-on info row — psicopedagogo (informativo, se agrega en el proceso) */}
      <div className={`grid ${COL} border-t`} style={{ borderColor: C.creamBorderStrong, borderTopStyle: 'dashed', background: 'rgba(30,91,160,0.015)' }}>
        <div className="px-4 py-5 flex items-center justify-center text-center">
          <span className="text-[13px] leading-snug" style={{ color: C.navy }}>
            Incluir una reunión con un psicopedagogo profesional{' '}
            <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: C.hueso }}>
              · + {formatPrice(PSICO_ADDON_PRICE)}
            </span>
          </span>
        </div>
        {MODALITIES.map(m => (
          <div key={m.id} className={cellBase} style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
            <span className="text-[11px] leading-snug text-center" style={{ color: C.hueso, maxWidth: 150 }}>
              Vas a poder sumarlo más adelante, durante el proceso
            </span>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className={`grid ${COL} border-t border-[var(--border-cream)]`}>
        <div />
        {MODALITIES.map(m => (
          <div key={m.id} className="px-6 py-5" style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
            <a
              href={PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-medium text-[13px] transition-all cursor-pointer ${
                m.highlight
                  ? 'bg-[var(--ocean)] text-[var(--cream-elev)] hover:bg-[var(--ocean-deep)]'
                  : 'border border-[var(--border-cream-strong)] text-[var(--navy)] hover:border-[var(--ocean)] hover:text-[var(--ocean)]'
              }`}
            >
              Empezar
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>

    </div>
  )
}

// ── Mobile cards ───────────────────────────────────────────────────────────────

function MobileCards() {
  return (
    <div className="lg:hidden flex flex-col gap-4">
      {MODALITIES.map(m => {
        const total = calcPrice(BASE_PRICE, m.discountPct)
        return (
          <div
            key={m.id}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: m.highlight ? C.ocean : C.creamElev,
              border: m.highlight ? 'none' : `1px solid ${C.creamBorder}`,
              boxShadow: m.highlight ? '0 12px 40px rgba(30,91,160,0.22)' : undefined,
            }}
          >
            {m.highlight && (
              <div className="flex justify-center pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 rounded-full" style={{ background: C.terra, color: C.creamElev }}>
                  Mejor valor
                </span>
              </div>
            )}
            <div className="px-6 pt-5 pb-6">
              <p className="font-display font-normal text-[1.2rem] tracking-[-0.02em]" style={{ color: m.highlight ? C.creamElev : C.navy }}>
                {m.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] mt-0.5" style={{ color: m.highlight ? 'rgba(251,245,234,0.55)' : C.hueso }}>
                {m.size}
              </p>
              <div className="flex items-baseline gap-1.5 mt-3">
                <span className="font-display font-light text-[2rem] tracking-[-0.03em]" style={{ color: m.highlight ? C.creamElev : C.navy }}>
                  {formatPrice(total)}
                </span>
                {m.discountPct > 0 && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: m.highlight ? 'rgba(251,245,234,0.6)' : C.hueso }}>c/u</span>
                )}
              </div>
              {m.discountNote && (
                <span className="inline-block font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full mt-2" style={{ background: m.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(30,91,160,0.1)', color: m.highlight ? C.creamElev : C.ocean }}>
                  {m.discountNote}
                </span>
              )}
              <a
                href={PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-[14px] transition-all cursor-pointer ${
                  m.highlight
                    ? 'bg-[var(--cream-elev)] text-[var(--ocean)] hover:bg-white'
                    : 'bg-[var(--ocean)] text-[var(--cream-elev)] hover:bg-[var(--ocean-deep)]'
                }`}
              >
                Empezar
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <div
                className="mt-3 w-full py-2.5 px-3 rounded-xl text-center"
                style={{ border: `1px dashed ${m.highlight ? 'rgba(251,245,234,0.35)' : C.creamBorderStrong}` }}
              >
                <p className="text-[11px] leading-snug" style={{ color: m.highlight ? 'rgba(251,245,234,0.85)' : C.navy }}>
                  Incluir una reunión con un psicopedagogo profesional
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: m.highlight ? 'rgba(251,245,234,0.55)' : C.hueso }}>
                  Costo adicional + {formatPrice(PSICO_ADDON_PRICE)} · se agrega más adelante en el proceso
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────

export function PricingSection({ onBack: _onBack }: Props) {
  const block = useInView<HTMLDivElement>()

  return (
    <div className="animate-fade-in bg-[var(--cream)]">
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center" style={{ marginTop: '-4rem', paddingTop: '4rem' }}>
        <div className="mesh-stage" aria-hidden>
          <div className="mesh-blob mesh-blob--ocean-a" />
          <div className="mesh-blob mesh-blob--terra" />
          <div className="mesh-blob mesh-blob--ocean-b" />
        </div>

        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] py-16 sm:py-20 z-10">
          <div ref={block.ref} className={`reveal ${block.inView ? 'is-visible' : ''}`}>

            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] mb-8 inline-flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--terra)]/60" />
              Planes y precios
            </p>
            <h1
              className="font-display font-light text-[var(--navy)] mb-10"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 0.98, letterSpacing: '-0.04em' }}
            >
              El recorrido es 100% individual.{' '}
              <span className="text-[var(--ocean)] font-normal">El descuento es grupal.</span>
            </h1>

            <MobileCards />
            <DesktopTable />

            <p className="mt-5 text-[12px] leading-[1.55]" style={{ color: C.hueso, maxWidth: 520 }}>
              En grupos, cada persona puede elegir su modalidad de forma independiente. El descuento aplica sobre el precio de Timon de cada integrante.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}
