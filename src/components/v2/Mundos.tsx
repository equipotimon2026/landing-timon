'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MUNDOS } from '@/lib/mundos'

/**
 * Las 16 áreas por dentro: el mismo contenido que recorre el chico en la app
 * (src/lib/mundos.ts sale del catálogo). Se elige un área y se ve cómo es un
 * día, dónde se trabaja y cuántas carreras hay detrás.
 */
export function Mundos() {
  const [actual, setActual] = useState(MUNDOS[0].id)
  const m = MUNDOS.find((x) => x.id === actual) ?? MUNDOS[0]
  const carreras = new Set(m.submundos.flatMap((s) => s.carreras)).size

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="min-w-0">
        <p id="mundos-ayuda" className="text-[15px] text-[var(--grafito)]">
          Tocá un área para ver cómo es por dentro.
        </p>
        <ul
          className="-mx-4 mt-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          aria-describedby="mundos-ayuda"
        >
          {MUNDOS.map((x) => {
            const activo = x.id === actual
            return (
              <li key={x.id} className="snap-start">
                <button
                  type="button"
                  aria-pressed={activo}
                  onClick={() => setActual(x.id)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[14.5px] font-semibold transition-colors ${
                    activo
                      ? 'border-[var(--tinta)] bg-[var(--tinta)] text-white'
                      : 'border-[var(--linea)] bg-white hover:border-[var(--tinta)]'
                  }`}
                >
                  {x.nombre}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <article aria-live="polite" className="overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_-40px_rgba(20,32,58,0.45)]">
        <div className="relative aspect-[16/9] bg-[var(--mar)]">
          <Image
            key={m.id}
            src={`/mapa/${m.id}.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,32,58,0.8)] via-transparent to-transparent" />
          <h3 className="titulo absolute bottom-4 left-5 right-5 text-[26px] text-white sm:bottom-6 sm:left-7 sm:text-[34px]">
            {m.nombre}
          </h3>
        </div>
        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <p className="text-[14px] font-bold text-[var(--rumbo)]">Un día de trabajo</p>
            <p className="mt-2 text-[17px] leading-[1.6]">{m.dia}</p>
          </div>
          <div className="space-y-5 border-t border-[var(--linea)] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <div>
              <p className="text-[14px] font-bold text-[var(--rumbo)]">Dónde se trabaja</p>
              <p className="mt-2 text-[15px] leading-[1.55] text-[var(--grafito)]">{m.donde}</p>
            </div>
            <p className="text-[15px] text-[var(--grafito)]">
              <strong className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--tinta)]">{carreras}</strong>{' '}
              carreras en esta área
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
