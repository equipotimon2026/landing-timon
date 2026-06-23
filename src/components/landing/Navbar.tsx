'use client'

import { Logo } from './Logo'
import { ArrowLeft, ArrowRight } from 'lucide-react'


type Audience = 'universal' | 'estudiante' | 'padre' | 'colegios' | 'pricing'

type Props = {
  audience: Audience
  onLogoClick: () => void
  onSwitchAudience: (a: 'estudiante' | 'padre' | 'colegios' | 'pricing') => void
  onBack: () => void
}

export function Navbar({ audience, onLogoClick, onSwitchAudience, onBack }: Props) {
  const isHome = audience === 'universal'
  const isColegios = audience === 'colegios'
  const isPricing = audience === 'pricing'

  const textBase = 'text-[var(--hueso)]'
  const textHover = 'hover:text-[var(--navy)]'
  const btnClass = `hidden sm:inline-flex text-[13px] ${textBase} ${textHover} transition-colors cursor-pointer`

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] h-16 flex items-center justify-between gap-3">

        {/* Left — back + logo */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {!isHome && (
            <button
              onClick={onBack}
              aria-label="Volver al inicio"
              className={`inline-flex items-center gap-1.5 text-sm ${textBase} ${textHover} transition-colors cursor-pointer pr-3 sm:border-r sm:border-[var(--border-cream)] shrink-0`}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Volver</span>
            </button>
          )}
          {!isHome && (
            <>
              <Logo onClick={onLogoClick} tone="navy" size={26} />
              <span className="hidden md:inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--hueso)] ml-1">
                Claridad antes de elegir
              </span>
            </>
          )}
        </div>

        {/* Right — nav links + CTA */}
        <nav className="flex items-center gap-4 sm:gap-5 shrink-0">

          {/* Audience-specific links */}
          {audience === 'estudiante' && (
            <button onClick={() => onSwitchAudience('padre')} className={btnClass}>
              ¿Sos padre o madre?
            </button>
          )}
          {audience === 'padre' && (
            <button onClick={() => onSwitchAudience('estudiante')} className={btnClass}>
              ¿Sos estudiante?
            </button>
          )}
          {audience === 'universal' && (
            <>
              <button onClick={() => onSwitchAudience('estudiante')} className={btnClass}>
                Para estudiantes
              </button>
              <button onClick={() => onSwitchAudience('padre')} className={btnClass}>
                Para familias
              </button>
            </>
          )}
          {(isColegios || isPricing) && (
            <>
              <button onClick={() => onSwitchAudience('estudiante')} className={btnClass}>
                Para estudiantes
              </button>
              <button onClick={() => onSwitchAudience('padre')} className={btnClass}>
                Para familias
              </button>
            </>
          )}

          {/* Pricing link — show everywhere except on pricing page */}
          {!isPricing && (
            <button onClick={() => onSwitchAudience('pricing')} className={btnClass}>
              Precios
            </button>
          )}

          {/* Colegios link — show everywhere except colegios + pricing */}
          {!isColegios && !isPricing && (
            <button onClick={() => onSwitchAudience('colegios')} className={btnClass}>
              Para colegios
            </button>
          )}

          {/* CTA — hide on colegios (institutional) and pricing (has its own CTA) */}
          {!isColegios && !isPricing && (
            <button
              onClick={() => onSwitchAudience('pricing')}
              className="group inline-flex items-center gap-2 px-4 py-[7px] rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] text-[12px] font-medium hover:bg-[var(--ocean-deep)] transition-all whitespace-nowrap cursor-pointer"
            >
              Empezar el recorrido
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
