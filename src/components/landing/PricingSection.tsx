'use client'

import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const PRODUCT_URL = 'https://app.timon.com.ar'

type Props = { onBack: () => void }

const PLANS = [
  {
    name: 'Individual',
    size: '1 persona',
    price: '$140.000',
    unit: '',
    discount: '—',
    access: 'Inmediato',
    howItWorks: 'Paga y arranca el recorrido',
    highlight: false,
  },
  {
    name: 'Grupito',
    size: '2 - 3 personas',
    price: '$126.000',
    unit: 'c/u',
    discount: '10% off',
    access: 'Grupal',
    howItWorks: 'Cada usuario paga su parte y arrancan el recorrido por separado',
    highlight: false,
  },
  {
    name: 'Amigos',
    size: '4 personas',
    price: '$105.000',
    unit: 'c/u',
    discount: '25% off',
    access: 'Grupal',
    howItWorks: 'Cada usuario paga su parte y arrancan el recorrido por separado',
    highlight: true,
  },
]

const ROWS: { label: string; key: keyof (typeof PLANS)[0] }[] = [
  { label: 'Precio por persona', key: 'price' },
  { label: 'Tamaño del grupo',   key: 'size' },
  { label: 'Descuento',          key: 'discount' },
  { label: 'Acceso',             key: 'access' },
  { label: 'Cómo funciona',      key: 'howItWorks' },
]

function PricingTable() {
  const reveal = useInView<HTMLDivElement>()
  return (
    <div ref={reveal.ref} className={`reveal ${reveal.inView ? 'is-visible' : ''} w-full pt-5`}>

      {/* Mobile: vertical cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl overflow-hidden ${
              plan.highlight
                ? 'bg-[var(--ocean)]'
                : 'bg-[var(--cream-elev)] border border-[var(--border-cream)]'
            }`}
            style={plan.highlight ? { boxShadow: '0 16px 48px rgba(30,91,160,0.22)' } : undefined}
          >
            {plan.highlight && (
              <div className="flex justify-center pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] bg-[var(--terra)] text-[var(--cream-elev)] px-3 py-1 rounded-full">
                  Mejor valor
                </span>
              </div>
            )}
            <div className="px-6 pt-5 pb-2">
              <p className={`font-display font-normal text-[1.3rem] tracking-[-0.02em] mb-1 ${plan.highlight ? 'text-[var(--cream-elev)]' : 'text-[var(--navy)]'}`}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className={`font-display font-light text-[2rem] tracking-[-0.03em] ${plan.highlight ? 'text-[var(--cream-elev)]' : 'text-[var(--navy)]'}`}>
                  {plan.price}
                </span>
                {plan.unit && (
                  <span className={`font-mono text-[11px] uppercase tracking-[0.1em] ${plan.highlight ? 'text-[var(--cream-elev)]/60' : 'text-[var(--hueso)]'}`}>
                    {plan.unit}
                  </span>
                )}
              </div>
            </div>
            <div className={`mx-6 border-t ${plan.highlight ? 'border-white/15' : 'border-[var(--border-cream-strong)]'}`} />
            {ROWS.filter(r => r.key !== 'price').map((row) => {
              const value = plan[row.key] as string
              const isDiscount = row.key === 'discount'
              return (
                <div key={row.key} className="flex items-start justify-between gap-4 px-6 py-3">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.12em] shrink-0 pt-0.5 ${plan.highlight ? 'text-[var(--cream-elev)]/50' : 'text-[var(--hueso)]'}`}>
                    {row.label}
                  </span>
                  {isDiscount && value !== '—' ? (
                    <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full text-right ${plan.highlight ? 'bg-white/15 text-[var(--cream-elev)]' : 'bg-[var(--ocean)]/10 text-[var(--ocean)]'}`}>
                      {value}
                    </span>
                  ) : (
                    <span className={`text-[13px] text-right leading-snug ${plan.highlight ? 'text-[var(--cream-elev)]/85' : value === '—' ? 'text-[var(--hueso)]' : 'text-[var(--navy)]/80'}`}>
                      {value}
                    </span>
                  )}
                </div>
              )
            })}
            <div className="px-6 pb-6 pt-3">
              <a
                href={PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium text-[14px] transition-all cursor-pointer ${
                  plan.highlight
                    ? 'bg-[var(--cream-elev)] text-[var(--ocean)] hover:bg-white'
                    : 'bg-[var(--ocean)] text-[var(--cream-elev)] hover:bg-[var(--ocean-deep)]'
                }`}
              >
                Empezar
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
      <table
        className="w-full"
        style={{ borderCollapse: 'separate', borderSpacing: 0, tableLayout: 'fixed' }}
      >
        <colgroup>
          <col style={{ width: 160 }} />
          <col />
          <col />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th />
            {PLANS.map((plan) => (
              <th
                key={plan.name}
                className={`relative px-6 pt-8 pb-4 text-center font-normal ${
                  plan.highlight
                    ? 'bg-[var(--ocean)]'
                    : 'bg-[var(--cream-elev)] border-t border-x border-[var(--border-cream)]'
                }`}
                style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] bg-[var(--terra)] text-[var(--cream-elev)] px-3 py-1 rounded-full whitespace-nowrap">
                    Mejor valor
                  </span>
                )}
                <p
                  className={`font-display font-normal text-[1.2rem] tracking-[-0.02em] ${
                    plan.highlight ? 'text-[var(--cream-elev)]' : 'text-[var(--navy)]'
                  }`}
                >
                  {plan.name}
                </p>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ROWS.map((row, rIdx) => (
            <tr key={row.label}>
              <td
                className={`px-4 py-4 align-middle ${
                  rIdx > 0 ? 'border-t border-[var(--border-cream-strong)]' : ''
                }`}
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--navy)]/70 leading-tight">
                  {row.label}
                </span>
              </td>
              {PLANS.map((plan) => {
                const value = plan[row.key] as string
                const isPrice = row.key === 'price'
                const isDiscount = row.key === 'discount'
                const isHowItWorks = row.key === 'howItWorks'
                return (
                  <td
                    key={plan.name}
                    className={`px-5 py-4 text-center align-middle border-x ${
                      plan.highlight
                        ? 'bg-[var(--ocean)] border-[var(--ocean)]'
                        : 'bg-[var(--cream-elev)] border-[var(--border-cream)]'
                    }`}
                    style={
                      rIdx > 0 && plan.highlight
                        ? { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.10)' }
                        : rIdx > 0
                        ? { borderTopWidth: 1, borderTopColor: 'var(--border-cream)' }
                        : undefined
                    }
                  >
                    {isPrice ? (
                      <div>
                        <span
                          className={`font-display font-light block ${
                            plan.highlight ? 'text-[var(--cream-elev)]' : 'text-[var(--navy)]'
                          }`}
                          style={{ fontSize: '1.375rem', letterSpacing: '-0.03em' }}
                        >
                          {value}
                        </span>
                        {plan.unit && (
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                              plan.highlight ? 'text-[var(--cream-elev)]/60' : 'text-[var(--hueso)]'
                            }`}
                          >
                            {plan.unit}
                          </span>
                        )}
                      </div>
                    ) : isDiscount && value !== '—' ? (
                      <span
                        className={`font-mono text-[12px] font-semibold px-2 py-0.5 rounded-full ${
                          plan.highlight
                            ? 'bg-[var(--cream-elev)]/15 text-[var(--cream-elev)]'
                            : 'bg-[var(--ocean)]/10 text-[var(--ocean)]'
                        }`}
                      >
                        {value}
                      </span>
                    ) : isHowItWorks ? (
                      <span
                        className={`text-[12px] leading-[1.4] ${
                          plan.highlight ? 'text-[var(--cream-elev)]/80' : 'text-[var(--navy)]/70'
                        }`}
                      >
                        {value}
                      </span>
                    ) : (
                      <span
                        className={`text-[14px] ${
                          plan.highlight
                            ? 'text-[var(--cream-elev)]/85'
                            : value === '—'
                            ? 'text-[var(--hueso)]'
                            : 'text-[var(--navy)]/80'
                        }`}
                      >
                        {value}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td />
            {PLANS.map((plan) => (
              <td
                key={plan.name}
                className={`px-5 py-5 text-center ${
                  plan.highlight
                    ? 'bg-[var(--ocean)]'
                    : 'bg-[var(--cream-elev)] border-b border-x border-[var(--border-cream)]'
                }`}
                style={{ borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
              >
                <a
                  href={PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium text-[13px] transition-all cursor-pointer whitespace-nowrap ${
                    plan.highlight
                      ? 'bg-[var(--cream-elev)] text-[var(--ocean)] hover:bg-white'
                      : 'bg-[var(--ocean)] text-[var(--cream-elev)] hover:bg-[var(--ocean-deep)]'
                  }`}
                >
                  Empezar
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
      </div>{/* end desktop table wrapper */}

    </div>
  )
}

export function PricingSection({ onBack: _onBack }: Props) {
  const block = useInView<HTMLDivElement>()

  return (
    <div className="animate-fade-in bg-[var(--cream)]">
      <section
        className="relative overflow-hidden min-h-screen flex flex-col justify-center"
        style={{ marginTop: '-4rem', paddingTop: '4rem' }}
      >
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
              className="font-display font-light text-[var(--navy)] mb-12"
              style={{
                fontSize: 'clamp(2rem, 4vw, 4rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
              }}
            >
              El recorrido es 100% individual.{' '}
              <span className="text-[var(--ocean)] font-normal">
                El descuento es grupal.
              </span>
            </h1>
            <PricingTable />
          </div>
        </div>
      </section>
    </div>
  )
}
