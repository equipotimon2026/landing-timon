'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Isotipo } from '@/components/home/Isotipo'
import { URL_ENTRAR } from '@/lib/landing'

const LINKS = [
  { href: '#modulos', texto: 'El programa' },
  { href: '#como-funciona', texto: 'Cómo funciona' },
  { href: '#historia', texto: 'Quiénes somos' },
  { href: '#preguntas', texto: 'Preguntas' },
]

/** Barra de anuncio navy de una línea (se puede cerrar) y cabecera blanca fija. */
export function Cabecera() {
  const [anuncio, setAnuncio] = useState(true)
  return (
    <>
      {anuncio && (
        <div className="relative bg-[var(--primario)] px-12 py-2.5 text-center text-[13.5px] text-white/90">
          Programa Timon: dos semanas, desde casa, para que tu hijo elija carrera conociendo el mundo real.{' '}
          <a href="#como-funciona" className="font-semibold text-white underline underline-offset-4">
            Ver cómo funciona
          </a>
          <button
            type="button"
            onClick={() => setAnuncio(false)}
            aria-label="Cerrar el anuncio"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-[var(--borde)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-5 lg:px-16">
          <Link href="/" aria-label="Timon, inicio" className="inline-flex items-center gap-2 text-[19px] font-semibold tracking-[-0.03em] text-[var(--navy)]">
            <Isotipo size={22} className="text-[var(--primario)]" />
            Timon
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-7 whitespace-nowrap text-[15px] text-[var(--navy)] xl:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--primario)]">
                {l.texto}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 whitespace-nowrap">
            <a href={URL_ENTRAR} className="hidden px-3 text-[15px] text-[var(--navy)] hover:text-[var(--primario)] sm:block">
              Entrar
            </a>
            <a
              href="/test"
              className="hidden h-10 items-center rounded-[6px] bg-[var(--primario-tinte)] px-4 text-[15px] font-semibold text-[var(--primario-hondo)] transition-colors hover:bg-[var(--primario-suave)] md:inline-flex"
            >
              Probar el test gratis
            </a>
            <a
              href="#anotalo"
              className="inline-flex h-10 items-center rounded-[6px] bg-[var(--primario)] px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--primario-hondo)]"
            >
              Anotar a mi hijo
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
