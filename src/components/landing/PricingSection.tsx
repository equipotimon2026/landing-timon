'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import {
  LIST_PRICE_ARS,
  PSICO_ADDON_ARS,
  INSTALLMENTS,
  UPFRONT_DISCOUNT_PCT,
  GROUP_SIZE_THRESHOLD,
  GROUP_DISCOUNT_PCT,
  FREE_STOPS,
  TOTAL_STOPS,
  fmtArs,
} from '@/lib/pricing'

const APP_URL = 'https://app.timonear.com'

type Mode = 'cuotas' | 'unico'

/**
 * Precios, como sección de la home — reunión del 07/09/2026.
 *
 * El problema no era el precio, era el número: "si mostrar 150 lucas asusta,
 * mostremos 12 de 12". Por eso la modalidad de pago es lo primero que se elige
 * y el número grande cambia con ella.
 *
 * Es pago en cuotas, NO suscripción: no se puede dar de baja a mitad de camino
 * y por eso no lo llamamos "por mes" en ningún lado.
 *
 * Fede (06/09/2026): "en ninguna parte está el precio visible de forma fácil".
 * Por eso dejó de ser una vista aparte y vive acá, en la misma página.
 */
const MODALITIES = [
  {
    id: 'individual',
    name: 'Individual',
    size: '1 persona',
    discountPct: 0,
    note: '',
    highlight: false,
  },
  {
    id: 'amigos',
    name: 'Con amigos',
    size: `${GROUP_SIZE_THRESHOLD} personas`,
    discountPct: GROUP_DISCOUNT_PCT,
    note: `Junten ${GROUP_SIZE_THRESHOLD} y todos pagan ${GROUP_DISCOUNT_PCT}% menos`,
    highlight: true,
  },
]

const FEATURES = [
  `Las ${TOTAL_STOPS} paradas completas`,
  'Informe con carreras y universidades sugeridas',
  'Una charla de 30 minutos con un profesional afín',
  'Acceso de tu familia al informe (nunca a tus respuestas)',
]

/** Precio final por persona según modalidad y forma de pago. */
function priceFor(groupPct: number, mode: Mode) {
  const afterGroup = Math.round((LIST_PRICE_ARS * (100 - groupPct)) / 100)
  if (mode === 'cuotas') {
    return {
      total: afterGroup,
      perInstallment: Math.round(afterGroup / INSTALLMENTS / 100) * 100,
    }
  }
  const upfront =
    Math.round((afterGroup * (100 - UPFRONT_DISCOUNT_PCT)) / 100 / 100) * 100
  return { total: upfront, perInstallment: null }
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-[var(--r-pill)] border border-[var(--border-cream-strong)] bg-white p-1">
      {(
        [
          ['cuotas', `${INSTALLMENTS} cuotas`],
          ['unico', 'Un solo pago'],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          aria-pressed={mode === id}
          className={`cursor-pointer rounded-[var(--r-pill)] px-5 py-2 text-[13px] font-bold transition-all ${
            mode === id
              ? 'bg-[var(--ocean)] text-white'
              : 'text-[var(--hueso)] hover:text-[var(--navy)]'
          }`}
        >
          {label}
          {id === 'unico' && mode !== id && (
            <span className="ml-1.5 text-[11px] text-[var(--terra-ink)]">
              −{UPFRONT_DISCOUNT_PCT}%
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function PlanCard({ m, mode }: { m: (typeof MODALITIES)[number]; mode: Mode }) {
  const p = priceFor(m.discountPct, mode)
  const hi = m.highlight

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[var(--r-xl)] p-7 ${
        hi ? 'text-white' : 'glass glass-strong'
      }`}
      style={
        hi
          ? {
              background: 'linear-gradient(155deg, #2563EB 0%, #1D4ED8 100%)',
              boxShadow: '0 20px 50px rgba(37,99,235,0.28)',
            }
          : undefined
      }
    >
      {hi && (
        <span className="mono-label mb-4 w-fit rounded-[var(--r-pill)] bg-[var(--terra)] px-3 py-1 !text-white">
          Mejor valor
        </span>
      )}

      <p
        className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em]"
        style={{ color: hi ? '#fff' : 'var(--navy)' }}
      >
        {m.name}
      </p>
      <p className="mono-label mt-1" style={{ color: hi ? 'rgba(255,255,255,0.7)' : undefined }}>
        {m.size}
      </p>

      {/* El número grande: cambia con el toggle */}
      <div className="mt-5">
        {p.perInstallment !== null ? (
          <>
            <div className="flex flex-wrap items-baseline gap-2">
              <span
                className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.045em]"
                style={{ color: hi ? '#fff' : 'var(--navy)' }}
              >
                {fmtArs(p.perInstallment)}
              </span>
              <span
                className="text-[15px] font-bold"
                style={{ color: hi ? 'rgba(255,255,255,0.8)' : 'var(--hueso)' }}
              >
                × {INSTALLMENTS}
              </span>
            </div>
            <p
              className="mt-1.5 text-[12.5px]"
              style={{ color: hi ? 'rgba(255,255,255,0.75)' : 'var(--hueso)' }}
            >
              {fmtArs(p.total)} en total · sin interés
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span
                className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.045em]"
                style={{ color: hi ? '#fff' : 'var(--navy)' }}
              >
                {fmtArs(p.total)}
              </span>
              <span
                className="text-[14px] line-through"
                style={{ color: hi ? 'rgba(255,255,255,0.55)' : 'var(--hueso-soft)' }}
              >
                {fmtArs(Math.round((LIST_PRICE_ARS * (100 - m.discountPct)) / 100))}
              </span>
            </div>
            <p
              className="mt-1.5 text-[12.5px]"
              style={{ color: hi ? 'rgba(255,255,255,0.75)' : 'var(--hueso)' }}
            >
              {UPFRONT_DISCOUNT_PCT}% menos por pagarlo de una
            </p>
          </>
        )}
      </div>

      {m.note && (
        <span
          className="mt-3 w-fit rounded-[var(--r-pill)] px-3 py-1 text-[12px] font-bold"
          style={{
            background: hi ? 'rgba(255,255,255,0.16)' : 'var(--ocean-wash)',
            color: hi ? '#fff' : 'var(--ocean)',
          }}
        >
          {m.note}
        </span>
      )}

      <ul className="mt-6 flex flex-col gap-2.5">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              size={15}
              strokeWidth={3}
              className="mt-0.5 shrink-0"
              style={{ color: hi ? '#fff' : 'var(--verde)' }}
            />
            <span
              className="text-[14px] leading-snug"
              style={{ color: hi ? 'rgba(255,255,255,0.92)' : 'var(--navy)' }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={`${APP_URL}/entrar?modo=crear`}
        className={`btn-timon group mt-7 h-12 w-full ${hi ? 'btn-timon--white' : 'btn-timon--primary'}`}
      >
        Empezar
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </a>

      <p
        className="mt-3 text-center text-[11.5px]"
        style={{ color: hi ? 'rgba(255,255,255,0.7)' : 'var(--hueso)' }}
      >
        Las primeras {FREE_STOPS} paradas son gratis. Pagás cuando querés seguir.
      </p>
    </div>
  )
}

export function PricingSection() {
  const block = useInView<HTMLDivElement>()
  const [mode, setMode] = useState<Mode>('cuotas')

  return (
    <section id="precios" className="timon-wash relative overflow-hidden border-t border-[var(--border-cream)]">
      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 py-16 sm:px-8 sm:py-24">
        <div>
          <div ref={block.ref} className={`reveal ${block.inView ? 'is-visible' : ''}`}>
          <span className="eyebrow eyebrow--with-rule">Planes y precios</span>

          <h2
            className="mt-4 font-display font-extrabold tracking-[-0.045em] text-[var(--navy)]"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', lineHeight: 1.02 }}
          >
            Un solo pago.
            <br />
            <span className="serif-accent text-[var(--ocean)]">
              O doce, si te queda mejor.
            </span>
          </h2>

          <p className="mt-4 max-w-[34rem] text-[15.5px] leading-relaxed text-[var(--hueso)]">
            No es una suscripción: no se renueva y no hay nada que dar de baja.
            Es el recorrido completo, una sola vez, pagado como te sirva.
          </p>

          </div>

          <div className="mt-7">
            <ModeToggle mode={mode} onChange={setMode} />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {MODALITIES.map((m) => (
              <PlanCard key={m.id} m={m} mode={mode} />
            ))}
          </div>

          <div className="glass mt-6 px-5 py-4">
            <p className="text-[14px] leading-snug text-[var(--navy)]">
              Podés sumar una reunión con un psicopedagogo profesional por{' '}
              <span className="font-bold">{fmtArs(PSICO_ADDON_ARS)}</span> más.
            </p>
            <p className="mono-label mt-1">Se agrega más adelante, dentro del proceso</p>
          </div>

          <p className="mt-5 max-w-[34rem] text-[12.5px] leading-[1.55] text-[var(--hueso)]">
            El recorrido es individual: cada persona hace el suyo y recibe su propio
            informe. Lo único grupal es el descuento: el código se comparte y el
            precio baja para todos los del grupo que todavía no pagaron.
          </p>
        </div>
      </div>
    </section>
  )
}
