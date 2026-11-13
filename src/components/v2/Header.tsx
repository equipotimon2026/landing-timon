'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Isologo } from './Isotipo'
import { URL_EMPEZAR, URL_ENTRAR } from '@/lib/landing'

const QUIEN = [
  { titulo: 'Padres y madres', texto: 'Para que tu hijo elija bien', href: '/#anotalo' },
  { titulo: 'Estudiantes', texto: 'Empezá gratis tu recorrido', href: URL_EMPEZAR },
  { titulo: 'Psicólogos', texto: 'Sumate a la red de Timon', href: 'mailto:info@timonear.com?subject=Soy%20psic%C3%B3logo' },
  { titulo: 'Colegios', texto: 'Timon para tus alumnos', href: '/colegios' },
]

export function Header() {
  const [abierto, setAbierto] = useState(false)
  const caja = useRef<HTMLDivElement>(null)
  const boton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!abierto) return
    const fuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false)
    }
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false)
        boton.current?.focus()
      }
    }
    document.addEventListener('pointerdown', fuera)
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('pointerdown', fuera)
      document.removeEventListener('keydown', tecla)
    }
  }, [abierto])

  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-4 rounded-full border border-[var(--borde)] bg-[rgba(255,255,255,0.8)] pl-5 pr-2 shadow-[0_12px_32px_-18px_rgba(15,31,54,0.25)] backdrop-blur-xl sm:h-16 sm:pl-6">
        <Link href="/" aria-label="Timon, inicio" className="shrink-0">
          <Isologo />
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-[15px] font-medium sm:gap-2" aria-label="Principal">
          <a href="#red" className="hidden rounded-full px-3 py-2 text-[var(--texto2)] transition-colors hover:bg-[#f3f5f8] hover:text-[var(--texto)] lg:block">
            La red
          </a>
          <a href="#informe" className="hidden rounded-full px-3 py-2 text-[var(--texto2)] transition-colors hover:bg-[#f3f5f8] hover:text-[var(--texto)] lg:block">
            El informe
          </a>
          <div ref={caja} className="relative">
            <button
              ref={boton}
              type="button"
              aria-expanded={abierto}
              aria-controls="quien-sos"
              onClick={() => setAbierto((v) => !v)}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-[var(--texto2)] hover:bg-[#f3f5f8] hover:text-[var(--texto)]"
            >
              ¿Quién sos?
              <ChevronDown size={16} className={`transition-transform ${abierto ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {abierto && (
              <ul
                id="quien-sos"
                className="absolute right-0 top-[calc(100%+8px)] w-[min(86vw,300px)] rounded-2xl border border-[var(--borde)] bg-white p-2 shadow-[0_30px_70px_-24px_rgba(15,31,54,0.3)]"
              >
                {QUIEN.map((q) => (
                  <li key={q.titulo}>
                    <a
                      href={q.href}
                      onClick={() => setAbierto(false)}
                      className="block rounded-xl px-4 py-3 hover:bg-[#f5f7fa]"
                    >
                      <span className="block text-[15.5px] font-medium text-[var(--texto)]">{q.titulo}</span>
                      <span className="block text-[13.5px] text-[var(--tenue)]">{q.texto}</span>
                    </a>
                  </li>
                ))}
                <li className="mt-1 border-t border-[var(--borde)] px-4 pb-2 pt-3 text-[13.5px] text-[var(--tenue)]">
                  ¿Ya tenés cuenta?{' '}
                  <a href={URL_ENTRAR} className="font-semibold text-[var(--rumbo)] underline-offset-4 hover:underline">
                    Entrá
                  </a>
                </li>
              </ul>
            )}
          </div>
          <a
            href="#anotalo"
            className="ml-1 inline-flex h-10 items-center rounded-full bg-[var(--texto)] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[var(--rumbo)] sm:h-11 sm:px-5"
          >
            <span className="sm:hidden">Anotalo</span>
            <span className="hidden sm:inline">Quiero que mi hijo lo haga</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
