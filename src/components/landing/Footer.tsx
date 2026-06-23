import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-[var(--cream-deep)] border-t border-[var(--border-cream)]">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <Logo tone="navy" size={26} />
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--hueso)] ml-1">
            Claridad antes de elegir
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-[var(--hueso)]">
          <a href="#" className="hover:text-[var(--navy)] transition-colors">Estudiantes</a>
          <a href="#" className="hover:text-[var(--navy)] transition-colors">Familias</a>
          <a href="#colegios" className="hover:text-[var(--navy)] transition-colors">Colegios</a>
          <a href="/terminos" className="hover:text-[var(--navy)] transition-colors">Términos</a>
          <a href="mailto:hola@timon.com.ar" className="hover:text-[var(--navy)] transition-colors">Contacto</a>
        </nav>

        {/* Legal */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--hueso)] shrink-0">
          <span>© {new Date().getFullYear()} Timon</span>
          <span className="text-[var(--terra)]">⌖</span>
          <span className="hidden sm:inline">Hecho en Argentina</span>
        </div>
      </div>
    </footer>
  )
}
