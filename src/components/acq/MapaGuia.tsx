'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, Star } from 'lucide-react'
import { MUNDOS, TOTAL_CARRERAS, type Mundo } from '@/lib/mundos'
import { urlRegistro } from '@/lib/programa'
import { FREE_STOPS } from '@/lib/pricing'

const STORAGE_KEY = 'timon-mapa-favoritos'

/**
 * El mapa que se lleva la persona. Tres pasos: recorrer, marcar los mundos
 * que atraen y hacerse las preguntas de cada uno. Al final, lo que el mapa no
 * puede responder ("¿cuál es el mío?") abre la puerta al programa.
 * Los favoritos viven en localStorage: son una comodidad, no un dato nuestro.
 */
export function MapaGuia({ nombre }: { nombre: string }) {
  const [favs, setFavs] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leer el storage recién después de montar evita el desfase de hidratación
      if (raw) setFavs(JSON.parse(raw))
    } catch {}
  }, [])

  const toggle = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
    setFavs(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }

  const elegidos = MUNDOS.filter((m) => favs.includes(m.id))

  return (
    <main className="flex-1">
      {/* Portada */}
      <section className="bg-[var(--navy)] px-4 pb-16 pt-14 text-white sm:px-6">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ocean-light)]">
            El Mapa de los 16 Mundos · Timon
          </p>
          <h1 className="mt-4 max-w-[760px] text-[32px] font-extrabold leading-[1.08] sm:text-[52px]">
            {nombre ? `${nombre}, acá` : 'Acá'} están las {TOTAL_CARRERAS} carreras, por dentro.
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-[1.6] text-white/75 sm:text-[18px]">
            Cómo es un día de trabajo en cada mundo, dónde se trabaja, lo que nadie te cuenta y las
            preguntas para saber si es el tuyo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <a
              href="#como-usarlo"
              className="rounded-full bg-[var(--ocean)] px-6 py-3.5 text-[15px] font-bold text-white hover:bg-[var(--ocean-deep)]"
            >
              Empezar a recorrer
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[15px] font-bold text-white hover:bg-white/10"
            >
              <Download size={16} /> Descargar en PDF
            </button>
          </div>
        </div>
      </section>

      {/* Cómo usarlo */}
      <section id="como-usarlo" className="scroll-mt-20 bg-[var(--cream)] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[26px] font-extrabold sm:text-[32px]">Cómo usar el mapa</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['01', 'Recorré', 'Mirá los 16 mundos sin apuro. No hace falta leerlos todos de una.'],
              ['02', 'Marcá', 'Tocá la estrella de los mundos que te llaman la atención, aunque no sepas por qué.'],
              ['03', 'Preguntate', 'En cada mundo marcado, respondete las cuatro preguntas. Ahí está la pista.'],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-2xl bg-white p-6">
                <p className="text-[26px] font-semibold text-[var(--ocean)]">{n}</p>
                <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.06em]">{t}</p>
                <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">{d}</p>
              </div>
            ))}
          </div>

          {/* Índice */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {MUNDOS.map((m) => {
              const carreras = m.submundos.reduce((n, s) => n + s.carreras.length, 0)
              return (
                <a
                  key={m.id}
                  href={`#${m.id}`}
                  className="group relative overflow-hidden rounded-xl bg-[var(--navy)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/mapa/${m.id}.jpg`}
                    alt=""
                    className="aspect-[4/3] w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/40 to-transparent p-3">
                    <p className="text-[13px] font-bold leading-tight text-white sm:text-[14px]">{m.nombre}</p>
                    <p className="text-[11px] text-white/70">{carreras} carreras</p>
                  </div>
                  {favs.includes(m.id) && (
                    <Star size={18} className="absolute right-2 top-2 fill-[var(--terra)] text-[var(--terra)]" />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {MUNDOS.map((m, i) => (
        <MundoSeccion
          key={m.id}
          mundo={m}
          numero={i + 1}
          fav={favs.includes(m.id)}
          onToggle={() => toggle(m.id)}
          tono={i % 2 === 0 ? 'white' : 'cream'}
          puente={i === 7}
        />
      ))}

      {/* Cierre: lo que el mapa no puede responder */}
      <section className="bg-[var(--navy)] px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-[760px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ocean-light)]">
            Tus mundos
          </p>
          {elegidos.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {elegidos.map((m) => (
                <span key={m.id} className="rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold">
                  ★ {m.nombre}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[15px] text-white/60">
              Todavía no marcaste ninguno. Volvé arriba y tocá la estrella de los que te atraen.
            </p>
          )}
          <h2 className="mt-10 text-[30px] font-extrabold leading-[1.1] sm:text-[44px]">
            Ya sabés qué existe. Falta lo más difícil: cuál es el tuyo.
          </h2>
          <div className="mt-6 space-y-4 text-[16px] leading-[1.65] text-white/80 sm:text-[17px]">
            <p>
              Si marcaste uno solo, genial: ahora tenés que saber qué sub-mundo y qué carrera, y
              dónde estudiarla. Si marcaste varios, es lo más común: te gustan muchas cosas y el mapa
              no te puede decir cuál sostendrías cinco años.
            </p>
            <p>
              Eso se responde entendiendo quién sos. Es lo que hace el Programa Timon: 13 paradas
              cortas desde tu casa y un informe con tus carreras más compatibles, las universidades
              donde estudiarlas y de qué vas a trabajar.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <Link
              href="/programa"
              className="acq-cta-btn rounded-lg px-8 py-4 text-[16px] font-semibold"
            >
              Conocer el programa
            </Link>
            <a
              href={urlRegistro()}
              className="rounded-lg border border-white/30 px-8 py-4 text-[16px] font-semibold text-white hover:bg-white/10"
            >
              Hacer las {FREE_STOPS} primeras paradas gratis
            </a>
          </div>
          <p className="mt-12 text-[12px] leading-[1.5] text-white/50">
            Los relatos de &ldquo;un día de trabajo&rdquo; son ejemplos escritos por Timon a partir de
            cómo trabaja la gente de cada área; no son testimonios de personas reales. Las carreras
            salen del catálogo de Timon. Fotos con licencia CC0.
          </p>
        </div>
      </section>
    </main>
  )
}

function MundoSeccion({
  mundo: m,
  numero,
  fav,
  onToggle,
  tono,
  puente,
}: {
  mundo: Mundo
  numero: number
  fav: boolean
  onToggle: () => void
  tono: 'white' | 'cream'
  puente: boolean
}) {
  const carreras = m.submundos.reduce((n, s) => n + s.carreras.length, 0)
  return (
    <>
      <section
        id={m.id}
        className={`mapa-mundo scroll-mt-20 px-4 py-16 sm:px-6 ${tono === 'white' ? 'bg-white' : 'bg-[var(--cream)]'}`}
      >
        <div className="mx-auto max-w-[1000px]">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_340px]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ocean-deep)]">
                Mundo {String(numero).padStart(2, '0')} · {carreras} carreras
              </p>
              <h2 className="mt-2 text-[28px] font-extrabold leading-[1.1] sm:text-[40px]">{m.nombre}</h2>
              <button
                onClick={onToggle}
                aria-pressed={fav}
                className={`mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors print:hidden ${
                  fav
                    ? 'border-[var(--terra)] bg-[var(--terra-soft)] text-[var(--terra-ink)]'
                    : 'border-[var(--border-cream-strong)] text-[var(--hueso)] hover:border-[var(--ocean)]'
                }`}
              >
                <Star size={16} className={fav ? 'fill-[var(--terra)] text-[var(--terra)]' : ''} />
                {fav ? 'Me atrae este mundo' : 'Marcar si me atrae'}
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/mapa/${m.id}.jpg`} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em]">Un día de trabajo</h3>
              <blockquote className="mt-3 border-l-2 border-[var(--ocean)] pl-4 text-[16px] italic leading-[1.6] text-[var(--navy-mid)]">
                &ldquo;{m.dia}&rdquo;
              </blockquote>
              <h3 className="mt-8 text-[14px] font-semibold uppercase tracking-[0.06em]">Dónde se trabaja</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[var(--hueso)]">{m.donde}</p>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold uppercase tracking-[0.06em]">Lo que nadie te cuenta</h3>
              <ul className="mt-3 space-y-3">
                {m.verdades.map((v) => (
                  <li key={v} className="border-l-2 border-[var(--border-cream-strong)] pl-4 text-[15px] leading-[1.55] text-[var(--hueso)]">
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mt-12 text-[14px] font-semibold uppercase tracking-[0.06em]">Sub-mundos y carreras</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {m.submundos.map((s) => (
              <div key={s.nombre} className="rounded-2xl border border-[var(--border-cream)] bg-white p-5">
                <p className="text-[16px] font-bold">{s.nombre}</p>
                <p className="mt-1 text-[14px] leading-[1.5] text-[var(--hueso)]">{s.que}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.carreras.map((c) => (
                    <span key={c} className="rounded-full bg-[var(--ocean-wash)] px-3 py-1 text-[12px] font-medium text-[var(--ocean-deep)]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--navy)] p-6 text-white sm:p-8">
            <h3 className="text-[18px] font-extrabold sm:text-[20px]">¿Es tu mundo? Respondete esto</h3>
            <ol className="mt-4 space-y-3">
              {m.preguntas.map((q, i) => (
                <li key={q} className="flex gap-3 text-[15px] leading-[1.55] text-white/85">
                  <span className="font-semibold text-[var(--ocean-light)]">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {puente && (
        <section className="bg-[var(--ocean)] px-4 py-10 text-white sm:px-6 print:hidden">
          <div className="mx-auto flex max-w-[1000px] flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[620px] text-[18px] font-bold leading-snug sm:text-[20px]">
              ¿Ya te atraen varios mundos? Es lo más común. El Programa Timon te ayuda a ver cuál va
              con vos.
            </p>
            <Link
              href="/programa"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-[15px] font-bold text-[var(--ocean-deep)]"
            >
              Ver el programa
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
