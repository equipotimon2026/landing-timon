'use client'

import { Logo } from './Logo'
import { ArrowLeft } from 'lucide-react'

const APP_URL = 'https://app.timonear.com'

type Audience = 'universal' | 'colegios'

type Props = {
  audience: Audience
  onLogoClick: () => void
  onSwitchAudience: (a: 'colegios') => void
  onBack: () => void
}

/**
 * Navbar liviana.
 *
 * Desde que el hero ES la puerta de entrada (reunión 07/09/2026), el botón
 * grande de "Empezar" acá arriba duplicaba el formulario que está tres
 * centímetros más abajo. Queda "Entrar" para el que vuelve y ya scrolleó, y
 * los enlaces a las secciones de la misma página (precios incluido, que ahora
 * es una sección y no una vista aparte).
 */
export function Navbar({ audience, onLogoClick, onSwitchAudience, onBack }: Props) {
  const isHome = audience === 'universal'

  const link =
    'hidden sm:inline-flex text-[13.5px] font-semibold text-[var(--hueso)] hover:text-[var(--navy)] transition-colors cursor-pointer'

  return (
    <header className="sticky left-0 right-0 top-0 z-50 border-b border-[rgba(15,31,54,0.06)] bg-white/60 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-3">
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

        <nav className="flex shrink-0 items-center gap-4 sm:gap-6">
          {isHome && (
            <>
              <a href="#que-es" className={link}>Cómo funciona</a>
              <a href="#precios" className={link}>Precios</a>
              <button onClick={() => onSwitchAudience('colegios')} className={link}>
                Para colegios
              </button>
              <a href="#faq" className={link}>Preguntas</a>
            </>
          )}
          <a
            href={`${APP_URL}/entrar?modo=entrar`}
            className="inline-flex h-10 cursor-pointer items-center whitespace-nowrap rounded-[var(--r-sm)] bg-[var(--ocean)] px-4 text-[13.5px] font-bold text-white transition-all hover:bg-[var(--ocean-deep)]"
            style={{ boxShadow: 'var(--btn-shadow)' }}
          >
            Entrar
          </a>
        </nav>
      </div>
    </header>
  )
}
