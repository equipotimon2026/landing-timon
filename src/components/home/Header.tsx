import Link from 'next/link'
import { Isotipo } from './Isotipo'
import { URL_ENTRAR } from '@/lib/landing'

const LINKS = [
  { href: '#app', texto: 'Cómo funciona' },
  { href: '#red', texto: 'La red' },
  { href: '#preguntas', texto: 'Preguntas' },
]

/** Barra fina y translúcida: marca, tres anclas, Entrar y un solo botón (terra). */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--borde)]/70 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center gap-6 px-5">
        <Link href="/" aria-label="Timon, inicio" className="inline-flex items-center gap-2 text-[17px] font-semibold tracking-[-0.02em]">
          <Isotipo size={22} className="text-[var(--ocean)]" />
          Timon
        </Link>
        <nav aria-label="Principal" className="ml-auto flex items-center gap-1 text-[14px]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-3 py-1.5 text-[var(--texto2)] transition-colors hover:text-[var(--texto)] md:block"
            >
              {l.texto}
            </a>
          ))}
          <a
            href={URL_ENTRAR}
            className="hidden rounded-full px-3 py-1.5 text-[var(--texto2)] transition-colors hover:text-[var(--texto)] sm:block"
          >
            Entrar
          </a>
          <a
            href="#anotalo"
            className="ml-2 inline-flex h-10 items-center rounded-full bg-[var(--terra)] px-5 text-[14px] font-semibold text-white shadow-[0_3px_0_var(--terra-hondo)] transition-[background-color,transform,box-shadow] hover:bg-[#bd7252] active:translate-y-[3px] active:shadow-none"
          >
            Anotalo
          </a>
        </nav>
      </div>
    </header>
  )
}
