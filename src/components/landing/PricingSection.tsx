'use client'

import { useState } from 'react'
import { ArrowRight, Check, Plus, X } from 'lucide-react'
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
const PSICO_ADDON_PRICE = 80000

const MODALITIES = [
  { id: 'individual', name: 'Individual', size: '1 persona',     discountPct: 0,  discountNote: '',                   highlight: false },
  { id: 'grupito',   name: 'Grupito',    size: '2 – 3 personas', discountPct: 10, discountNote: 'Si invitás 2 o 3 amigos tenés 10% off', highlight: false },
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

function DesktopTable({ psicoAdded, onTogglePsico }: { psicoAdded: Record<string, boolean>; onTogglePsico: (id: string) => void }) {
  const COL = 'grid-cols-[200px_1fr_1fr_1fr]'
  const cellBase = 'px-6 py-5 flex flex-col items-center justify-center text-center'

  return (
    <div className={`w-full hidden lg:block rounded-2xl overflow-hidden border border-[var(--border-cream)]`} style={{ background: C.creamElev }}>

      {/* Column headers */}
      <div className={`grid ${COL}`}>
        <div className="px-0 pt-7 pb-5 flex items-end">
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
        <div className="pl-2 py-5 flex items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: C.hueso }}>Precio</span>
        </div>
        {MODALITIES.map(m => {
          const base = calcPrice(BASE_PRICE, m.discountPct)
          const total = base + (psicoAdded[m.id] ? PSICO_ADDON_PRICE : 0)
          return (
            <div key={m.id} className={cellBase} style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
              <span className="font-display font-light tracking-[-0.035em]" style={{ fontSize: '1.75rem', color: C.navy }}>
                {formatPrice(total)}
              </span>
              {m.discountPct > 0 && (
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] mt-0.5" style={{ color: C.hueso }}>c/u</span>
              )}
              {psicoAdded[m.id] && (
                <span className="font-mono text-[10px] mt-1" style={{ color: C.hueso }}>
                  {formatPrice(base)} + {formatPrice(PSICO_ADDON_PRICE)} psico
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Feature rows */}
      {BASE_FEATURES.map(feat => (
        <div key={feat} className={`grid ${COL} border-t border-[var(--border-cream)]`}>
          <div className="pl-2 py-5 flex items-center pr-4">
            <span className="text-[13px] leading-snug" style={{ color: C.navy }}>{feat}</span>
          </div>
          {MODALITIES.map(m => (
            <div key={m.id} className={cellBase} style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
              <Check size={16} style={{ color: C.ocean }} strokeWidth={2.5} />
            </div>
          ))}
        </div>
      ))}

      {/* Add-on row — psicopedagogo */}
      <div className={`grid ${COL} border-t`} style={{ borderColor: C.creamBorderStrong, borderTopStyle: 'dashed', background: 'rgba(30,91,160,0.015)' }}>
        <div className="pl-2 py-5 flex flex-col justify-center pr-4">
          <span className="text-[13px] leading-snug" style={{ color: C.navy }}>
            Reunión con profesional para revisar tu resultado en conjunto
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: C.hueso }}>Opcional · + $80.000</span>
        </div>
        {MODALITIES.map(m => (
          <div key={m.id} className={cellBase} style={{ background: m.highlight ? 'rgba(30,91,160,0.04)' : 'transparent', borderLeft: `1px solid ${C.creamBorder}` }}>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => onTogglePsico(m.id)}
                className="inline-flex items-center gap-1 font-mono text-[11px] px-3 py-1.5 rounded-full transition-all cursor-pointer"
                style={psicoAdded[m.id]
                  ? { background: C.ocean, color: C.creamElev, border: `1px solid ${C.ocean}` }
                  : { border: `1px solid ${C.ocean}`, color: C.ocean }
                }
              >
                {psicoAdded[m.id]
                  ? <><X size={10} strokeWidth={2.5} /> Quitar</>
                  : <><Plus size={10} strokeWidth={2.5} /> Agregar</>
                }
              </button>
              <span className="text-[10px]" style={{ color: C.hueso }}>+ {formatPrice(PSICO_ADDON_PRICE)} de recargo</span>
            </div>
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

function MobileCards({ psicoAdded, onTogglePsico }: { psicoAdded: Record<string, boolean>; onTogglePsico: (id: string) => void }) {
  return (
    <div className="lg:hidden flex flex-col gap-4">
      {MODALITIES.map(m => {
        const base = calcPrice(BASE_PRICE, m.discountPct)
        const total = base + (psicoAdded[m.id] ? PSICO_ADDON_PRICE : 0)
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
              {psicoAdded[m.id] && (
                <p className="font-mono text-[11px] mt-0.5" style={{ color: m.highlight ? 'rgba(251,245,234,0.6)' : C.hueso }}>
                  {formatPrice(base)} + {formatPrice(PSICO_ADDON_PRICE)} psico
                </p>
              )}
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
              <button
                onClick={() => onTogglePsico(m.id)}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full font-mono text-[11px] transition-all cursor-pointer"
                style={psicoAdded[m.id]
                  ? { background: m.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(30,91,160,0.1)', color: m.highlight ? C.creamElev : C.ocean, border: 'none' }
                  : { border: `1px solid ${m.highlight ? 'rgba(251,245,234,0.35)' : C.creamBorderStrong}`, color: m.highlight ? 'rgba(251,245,234,0.7)' : C.hueso }
                }
              >
                {psicoAdded[m.id]
                  ? <><X size={10} strokeWidth={2.5} /> Quitar psicopedagogo/a</>
                  : <><Plus size={10} strokeWidth={2.5} /> Agregar psicopedagogo/a · {formatPrice(PSICO_ADDON_PRICE)}</>
                }
              </button>
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
  const [psicoAdded, setPsicoAdded] = useState<Record<string, boolean>>({})

  const togglePsico = (id: string) => setPsicoAdded(prev => ({ ...prev, [id]: !prev[id] }))

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

            <MobileCards psicoAdded={psicoAdded} onTogglePsico={togglePsico} />
            <DesktopTable psicoAdded={psicoAdded} onTogglePsico={togglePsico} />

            <p className="mt-5 text-[12px] leading-[1.55]" style={{ color: C.hueso, maxWidth: 520 }}>
              En grupos, cada persona puede elegir su modalidad de forma independiente. El descuento aplica sobre el precio de Timon de cada integrante.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}
