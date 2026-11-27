import Link from 'next/link'
import { Isotipo } from './Isotipo'
import { URL_ENTRAR } from '@/lib/landing'
import type { Accion } from '@/lib/variantes'

const LINKS = [
  { href: '#app', texto: 'Cómo funciona' },
  { href: '#red', texto: 'La red' },
  { href: '#preguntas', texto: 'Preguntas' },
]

/** Barra fina y translúcida: marca, tres anclas, "Ya tengo cuenta" y un solo botón (terra). */
export function Header({ accion }: { accion: Accion }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--borde)]/70 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center gap-3 px-4 sm:gap-6 sm:px-5">
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
          {/* Feedback de Facu (26/11): el que ya tiene cuenta no encontraba por
              dónde entrar. Botón con borde y color propio, visible también en el celu. */}
          <a
            href={URL_ENTRAR}
            className="ml-1 inline-flex h-9 items-center whitespace-nowrap rounded-full border border-[var(--ocean)] px-3 text-[13px] font-semibold text-[var(--ocean)] transition-colors hover:bg-[var(--ocean)] hover:text-white sm:h-10 sm:px-4 sm:text-[14px]"
          >
            <span className="sm:hidden">Ingresar</span>
            <span className="hidden sm:inline">Ya tengo cuenta · Ingresar</span>
          </a>
          <a
            href={accion.destino}
            className="ml-1.5 inline-flex h-9 items-center whitespace-nowrap rounded-full bg-[var(--terra)] px-3.5 text-[13px] font-semibold text-white sm:ml-2 sm:h-10 sm:px-5 sm:text-[14px] shadow-[0_3px_0_var(--terra-hondo)] transition-[background-color,transform,box-shadow] hover:bg-[#bd7252] active:translate-y-[3px] active:shadow-none"
          >
            {accion.corto ?? accion.texto}
          </a>
        </nav>
      </div>
    </header>
  )
}
