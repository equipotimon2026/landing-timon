'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CTA_MICRO, CTA_TEXTO } from '@/components/home/Cta'
import type { AreaHero } from './areas'

const LINEAS = [
  <>Que conozca</>,
  <>
    <strong>el mundo real</strong>
  </>,
  <>antes de elegir</>,
  <>su futuro.</>,
]

/**
 * Respaldo, con lo que ya dice la home: 16 áreas del catálogo, "300 carreras
 * en 50 universidades" (lib/landing.ts) y la revisión de la metodología
 * (docs/wording-v2.md, FAQ "¿Quién está detrás?").
 */
const RESPALDO = [
  { cifra: '16', texto: 'áreas de trabajo, vistas por dentro' },
  { cifra: '300', texto: 'carreras en 50 universidades' },
  { cifra: 'UBA', texto: 'un equipo profesional revisó la metodología' },
]

const FILAS:{ etiqueta: string; valor: (a: AreaHero) => React.ReactNode }[] = [
  {
    etiqueta: 'Lo que se pregunta',
    valor: (a) => (
      <>
        {a.pregunta}.{' '}
        <span className="whitespace-nowrap text-[var(--terra-hondo)]">Me encanta.</span>
      </>
    ),
  },
  {
    etiqueta: 'Lo que le cuenta un profesional',
    valor: (a) => <q className="hd-cita">{a.verdad}</q>,
  },
  { etiqueta: 'Dónde se trabaja', valor: (a) => a.donde },
  {
    etiqueta: 'Dónde se estudia',
    valor: (a) => (
      <>
        <span className="font-semibold">{a.carrera}</span>
        <br />
        {a.universidad}
      </>
    ),
  },
]

/**
 * Hero D: titular editorial a la izquierda y, a la derecha, una ficha con
 * material real de Timon. La ficha recorre cuatro áreas: qué se pregunta el
 * chico, qué le cuenta alguien que trabaja de eso, dónde se trabaja y dónde se
 * estudia. Cambia sola cada pocos segundos (la raya bajo el área activa marca
 * el tiempo); se frena al pasar el mouse o enfocarla, y con menos movimiento
 * no avanza sola. Todas las variantes ocupan la misma celda de la grilla, así
 * la ficha no cambia de alto al pasar de un área a otra.
 */
export function HeroD({ areas }: { areas: AreaHero[] }) {
  const [activa, setActiva] = useState(0)
  const [frenada, setFrenada] = useState(false)
  const siguiente = () => setActiva((i) => (i + 1) % areas.length)

  return (
    <section className="hero-d border-b border-[var(--borde)] bg-[var(--arena)]">
      <div className="mx-auto grid max-w-[1240px] gap-x-16 gap-y-14 px-5 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100svh-56px)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:px-10 lg:py-14">
        <div>
          <h1 className="display whitespace-nowrap text-[clamp(2.5rem,9.4vw,4.75rem)] lg:text-[clamp(3.5rem,5.9vw,5.25rem)] text-[var(--navy)]">
            {LINEAS.map((l, i) => (
              <span key={i} className="hd-linea">
                <span style={{ animationDelay: `${120 + i * 90}ms` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hd-sube mt-8 max-w-[44ch] text-[18px] text-[var(--texto2)] sm:text-[19px]" style={{ animationDelay: '560ms' }}>
            En Timon tu hijo charla con profesionales de 16 áreas, ve dónde se trabaja de verdad y compara universidades.
            Dos semanas, desde casa, para que elija sabiendo qué elige.
          </p>
          <div className="hd-sube mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6" style={{ animationDelay: '660ms' }}>
            <a href="#anotalo" className="btn group shrink-0">
              {CTA_TEXTO}
              <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="max-w-[22ch] text-[14px] leading-snug text-[var(--tenue)]">{CTA_MICRO}</p>
          </div>

          <dl className="hd-sube mt-12 grid max-w-[640px] gap-y-3 border-t border-[var(--borde)] pt-5 sm:grid-cols-3 sm:gap-x-6" style={{ animationDelay: '760ms' }}>
            {RESPALDO.map((r) => (
              <div key={r.cifra} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-3 sm:flex sm:flex-col sm:gap-1.5">
                <dt className="order-2 text-[13.5px] leading-snug text-[var(--tenue)]">{r.texto}</dt>
                <dd className="order-1 text-[clamp(1.6rem,2.4vw,2.1rem)] font-light leading-none tracking-[-0.04em] text-[var(--navy)]">
                  {r.cifra}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="hd-sube"
          style={{ animationDelay: '420ms' }}
          onMouseEnter={() => setFrenada(true)}
          onMouseLeave={() => setFrenada(false)}
          onFocus={() => setFrenada(true)}
          onBlur={() => setFrenada(false)}
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-[var(--navy)] pb-3">
            <p className="text-[15px] text-[var(--tenue)]">Si le atrae</p>
            <p className="text-[15px] text-[var(--tenue)]">4 de las 16 áreas</p>
          </div>

          <div className="relative">
            <p className="hd-pila pt-5">
              {areas.map((a, i) => (
                <span
                  key={a.id}
                  data-activa={i === activa}
                  aria-hidden={i !== activa}
                  className="hd-capa text-[clamp(2rem,3.4vw,2.9rem)] font-light leading-none tracking-[-0.04em] text-[var(--navy)]"
                >
                  {a.nombre}
                </span>
              ))}
            </p>
          </div>

          <dl className="mt-6">
            {FILAS.map((f, fila) => (
              <div key={f.etiqueta} className="grid gap-1.5 border-t border-[var(--borde)] py-4 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-5 lg:grid-cols-1 lg:gap-1 lg:py-3.5 xl:grid-cols-[10.5rem_minmax(0,1fr)] xl:gap-5 xl:py-4">
                <dt className="pt-[3px] text-[14px] leading-snug text-[var(--tenue)]">{f.etiqueta}</dt>
                <dd className="hd-pila text-[16.5px] leading-[1.45] text-[var(--navy)]">
                  {areas.map((a, i) => (
                    <span
                      key={a.id}
                      data-activa={i === activa}
                      aria-hidden={i !== activa}
                      className="hd-capa"
                      style={{ transitionDelay: i === activa ? `${80 + fila * 70}ms` : '0ms' }}
                    >
                      {f.valor(a)}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div role="group" aria-label="Elegir área" className="flex flex-wrap gap-x-6 gap-y-2 lg:gap-x-4 xl:gap-x-6 border-t border-[var(--navy)] pt-4">
            {areas.map((a, i) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={i === activa}
                onClick={() => setActiva(i)}
                className={`relative pb-2 text-[15px] transition-colors ${
                  i === activa ? 'font-semibold text-[var(--navy)]' : 'text-[var(--tenue)] hover:text-[var(--navy)]'
                }`}
              >
                {a.nombre}
                {i === activa && (
                  <span
                    key={activa}
                    aria-hidden
                    className="hd-tiempo absolute bottom-0 left-0 h-[2px] w-full bg-[var(--terra)]"
                    style={{ animationPlayState: frenada ? 'paused' : 'running' }}
                    onAnimationEnd={siguiente}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
