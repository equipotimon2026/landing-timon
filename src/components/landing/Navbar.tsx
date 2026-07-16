'use client'

import { Logo } from './Logo'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const APP_URL = 'https://app.timonear.com.ar'

type Audience = 'universal' | 'colegios' | 'pricing'

type Props = {
  audience: Audience
  onLogoClick: () => void
  onSwitchAudience: (a: 'colegios' | 'pricing') => void
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
          <Logo onClick={onLogoClick} tone="navy" size={28} />
          {!isHome && (
            <span className="hidden md:inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--hueso)] ml-1">
              Claridad antes de elegir
            </span>
          )}
        </div>

        <nav className="flex items-center gap-4 sm:gap-5 shrink-0">
          {!isPricing && (
            <button onClick={() => onSwitchAudience('pricing')} className={btnClass}>
              Precios
            </button>
          )}
          {!isColegios && !isPricing && (
            <button onClick={() => onSwitchAudience('colegios')} className={btnClass}>
              Para colegios
            </button>
          )}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-[7px] rounded-full text-[12px] font-medium whitespace-nowrap cursor-pointer border border-[var(--border-cream-strong)] text-[var(--navy)] hover:border-[var(--navy)] transition-all"
          >
            Iniciar sesión
          </a>
          {!isColegios && !isPricing && (
            <button
              onClick={() => onSwitchAudience('pricing')}
              className="group inline-flex items-center gap-2 px-4 py-[7px] rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] text-[12px] font-medium hover:bg-[var(--ocean-deep)] transition-all whitespace-nowrap cursor-pointer"
            >
              <span className="sm:hidden">Empezar</span>
              <span className="hidden sm:inline">Empezar el recorrido</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
