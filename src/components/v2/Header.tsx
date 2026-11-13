'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { MarcaTimon } from '@/components/landing/Marca'
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
    <header className="sticky top-0 z-40 border-b border-[var(--linea)] bg-[rgba(242,245,249,0.86)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 sm:h-[72px] sm:px-8">
        <Link href="/" aria-label="Timon, inicio" className="shrink-0">
          <MarcaTimon />
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-[15px] font-medium sm:gap-2" aria-label="Principal">
          <a href="#red" className="hidden rounded-full px-3 py-2 hover:bg-[var(--mar)] lg:block">
            La red
          </a>
          <a href="#recorrido" className="hidden rounded-full px-3 py-2 hover:bg-[var(--mar)] lg:block">
            Cómo funciona
          </a>
          <div ref={caja} className="relative">
            <button
              ref={boton}
              type="button"
              aria-expanded={abierto}
              aria-controls="quien-sos"
              onClick={() => setAbierto((v) => !v)}
              className="flex items-center gap-1 rounded-full px-3 py-2 hover:bg-[var(--mar)]"
            >
              ¿Quién sos?
              <ChevronDown size={16} className={`transition-transform ${abierto ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {abierto && (
              <ul
                id="quien-sos"
                className="absolute right-0 top-[calc(100%+8px)] w-[min(86vw,300px)] rounded-2xl border border-[var(--linea)] bg-white p-2 shadow-[0_24px_60px_-20px_rgba(20,32,58,0.35)]"
              >
                {QUIEN.map((q) => (
                  <li key={q.titulo}>
                    <a
                      href={q.href}
                      onClick={() => setAbierto(false)}
                      className="block rounded-xl px-4 py-3 hover:bg-[var(--papel)]"
                    >
                      <span className="block text-[15.5px] font-bold">{q.titulo}</span>
                      <span className="block text-[13.5px] text-[var(--grafito)]">{q.texto}</span>
                    </a>
                  </li>
                ))}
                <li className="mt-1 border-t border-[var(--linea)] px-4 pb-2 pt-3 text-[13.5px] text-[var(--grafito)]">
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
            className="ml-1 inline-flex h-11 items-center rounded-full bg-[var(--rumbo)] px-4 text-[14.5px] font-bold text-white transition-colors hover:bg-[var(--rumbo-hondo)] sm:px-5"
          >
            <span className="sm:hidden">Anotalo</span>
            <span className="hidden sm:inline">Quiero que mi hijo lo haga</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
