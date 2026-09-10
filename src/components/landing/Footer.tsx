import Link from 'next/link'
import { Logo } from './Logo'

const CONTACT_EMAIL = 'info@timonear.com'

export function Footer({ onColegios }: { onColegios?: () => void }) {
  return (
    <footer className="border-t border-[var(--border-cream)] bg-[var(--cream-deep)]">
      <div className="shell flex flex-col gap-4 py-6 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-0">
        {/* Brand */}
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <Logo tone="navy" size={26} />
          <span className="mono-label ml-1 hidden md:inline">El primer paso no es elegir</span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-[var(--hueso)]">
          <a href="#que-es" className="transition-colors hover:text-[var(--navy)]">Cómo funciona</a>
          <a href="#precios" className="transition-colors hover:text-[var(--navy)]">Precios</a>
          {onColegios ? (
            <button onClick={onColegios} className="cursor-pointer transition-colors hover:text-[var(--navy)]">
              Colegios
            </button>
          ) : (
            <Link href="/" className="transition-colors hover:text-[var(--navy)]">Colegios</Link>
          )}
          <Link href="/terminos" className="transition-colors hover:text-[var(--navy)]">Términos</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-[var(--navy)]">Contacto</a>
        </nav>

        {/* Legal */}
        <div className="mono-label flex shrink-0 items-center gap-2">
          <span>© {new Date().getFullYear()} Timon</span>
          <span className="text-[var(--terra)]">⌖</span>
          <span>Hecho en Argentina</span>
        </div>
      </div>
    </footer>
  )
}
