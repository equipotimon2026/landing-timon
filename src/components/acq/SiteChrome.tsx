import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WheelMark } from '@/components/landing/Logo'
import { APP_URL, CONTACT_EMAIL } from '@/lib/programa'

/**
 * Barra de anuncio + navbar + footer, copiados de acquisition.com: franja de
 * color con la novedad, navbar oscura con un único botón pill, y footer del
 * color de marca con cuatro columnas y el descargo legal.
 */

export function Wordmark({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span className="inline-flex items-center gap-2">
      <WheelMark tone={tone === 'light' ? 'cream' : 'navy'} size={26} />
      <span
        className={`text-[17px] font-extrabold uppercase tracking-[0.08em] ${
          tone === 'light' ? 'text-white' : 'text-[var(--navy)]'
        }`}
      >
        Timon
      </span>
    </span>
  )
}

export function AnnouncementBar() {
  return (
    <Link
      href="/programa"
      className="group block bg-[var(--ocean)] px-4 py-3 text-center text-[13px] text-white sm:text-[15px]"
    >
      <span className="mr-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase text-[var(--navy)] sm:text-[11px]">
        Nuevo
      </span>
      <span className="font-bold">Programa Timon, cohorte fundadora:</span>{' '}
      <span>conocé el programa</span>
      <ArrowRight size={16} className="ml-2 inline transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

const NAV = [
  { href: '/programa', label: 'Programa' },
  { href: '/reporte', label: 'Reporte gratis' },
  { href: '/colegios', label: 'Para colegios' },
  { href: '/#nosotros', label: 'Nosotros' },
]

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--navy)]">
      <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Timon, inicio">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hidden text-[14px] font-medium text-white/90 transition-colors hover:text-white md:inline"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={`${APP_URL}/entrar?modo=entrar`}
            className="hidden text-[14px] font-medium text-white/90 transition-colors hover:text-white sm:inline"
          >
            Entrar
          </a>
          <Link
            href="/programa#reservar"
            className="rounded-full bg-[var(--ocean)] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--ocean-deep)]"
          >
            Quiero empezar
          </Link>
        </nav>
      </div>
    </header>
  )
}

const FOOTER_COLS = [
  {
    title: 'Programa',
    links: [
      { href: '/programa', label: 'Programa Timon' },
      { href: '/programa#incluye', label: 'Qué incluye' },
      { href: '/programa#preguntas', label: 'Preguntas' },
    ],
  },
  {
    title: 'Gratis',
    links: [
      { href: '/reporte', label: 'Reporte de carreras nuevas' },
      { href: `${APP_URL}/entrar?modo=crear`, label: 'Las 3 primeras paradas' },
    ],
  },
  {
    title: 'Sobre Timon',
    links: [
      { href: '/#nosotros', label: 'Nosotros' },
      { href: '/colegios', label: 'Para colegios' },
      { href: `mailto:${CONTACT_EMAIL}`, label: 'Contacto' },
    ],
  },
  {
    title: 'Cuenta',
    links: [
      { href: `${APP_URL}/entrar?modo=entrar`, label: 'Entrar' },
      { href: `${APP_URL}/entrar?modo=crear`, label: 'Crear cuenta' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-[var(--ocean)] text-white">
      <div className="mx-auto max-w-[1140px] px-4 pb-10 pt-12 sm:px-6">
        <Wordmark />
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="text-[13px] font-bold uppercase tracking-[0.06em]">{c.title}</p>
              <ul className="mt-3 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13px] text-white/85 hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] font-semibold">
          <Link href="/terminos">Términos y condiciones</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <p className="mt-4 text-[12px] leading-[1.45] text-white/80">
          Timon es una herramienta de exploración vocacional. Sus respuestas las genera
          inteligencia artificial a partir de lo que respondés. No es un diagnóstico
          psicológico ni una evaluación psicométrica, y no reemplaza a un profesional
          matriculado. Las carreras que aparecen en tu informe son caminos para investigar,
          no una indicación de qué estudiar: la decisión es tuya. Los resultados dependen
          de tus respuestas y de cuánto te comprometas con el proceso. Copyright ©{' '}
          {new Date().getFullYear()} Timon. Hecho en Argentina.
        </p>
      </div>
    </footer>
  )
}
