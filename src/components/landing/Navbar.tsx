'use client'

import { Logo } from './Logo'
import { ArrowLeft } from 'lucide-react'

const APP_URL = 'https://app.timonear.com'

type Audience = 'universal' | 'colegios' | 'pricing'

type Props = {
  audience: Audience
  onLogoClick: () => void
  onSwitchAudience: (a: 'colegios' | 'pricing') => void
  onBack: () => void
}

/**
 * Navbar liviana.
 *
 * Desde que el hero ES la puerta de entrada (reunión 07/09/2026), el botón
 * "Empezar el recorrido" acá arriba duplicaba el formulario que está tres
 * centímetros más abajo. Queda solo "Entrar" para el que vuelve y ya scrolleó,
 * y en las vistas internas (precios / colegios), donde no hay formulario.
 */
export function Navbar({ audience, onLogoClick, onSwitchAudience, onBack }: Props) {
  const isHome = audience === 'universal'
  const isColegios = audience === 'colegios'
  const isPricing = audience === 'pricing'

  const link =
    'hidden sm:inline-flex text-[13px] text-[var(--hueso)] hover:text-[var(--navy)] transition-colors cursor-pointer'

  return (
    <header className="sticky left-0 right-0 top-0 z-50">
      <div className="flex h-16 w-full items-center justify-between gap-3 px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw]">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {!isHome && (
            <button
              onClick={onBack}
              aria-label="Volver al inicio"
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 pr-3 text-sm text-[var(--hueso)] transition-colors hover:text-[var(--navy)] sm:border-r sm:border-[var(--border-cream)]"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Volver</span>
            </button>
          )}
          <Logo onClick={onLogoClick} tone="navy" size={28} />
        </div>

        <nav className="flex shrink-0 items-center gap-4 sm:gap-5">
          {!isPricing && (
            <button onClick={() => onSwitchAudience('pricing')} className={link}>
              Precios
            </button>
          )}
          {!isColegios && !isPricing && (
            <button onClick={() => onSwitchAudience('colegios')} className={link}>
              Para colegios
            </button>
          )}
          {isHome && (
            <a href="#faq" className={link}>
              Preguntas
            </a>
          )}
          <a
            href={`${APP_URL}/entrar`}
            className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-[var(--r-pill)] bg-[var(--ocean)] px-4 py-[7px] text-[12px] font-semibold text-white transition-all hover:bg-[var(--ocean-deep)]"
          >
            Entrar
          </a>
        </nav>
      </div>
    </header>
  )
}
