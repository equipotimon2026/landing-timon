import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import './v2.css'
import { Suave } from '@/components/v2/Suave'
import { Header } from '@/components/v2/Header'
import { Hero } from '@/components/v2/Hero'
import { Revela } from '@/components/v2/Revela'
import { Areas } from '@/components/v2/Areas'
import { Contador } from '@/components/v2/Contador'
import { Informe } from '@/components/v2/Informe'
import { Paradas } from '@/components/v2/Paradas'
import { Anotalo } from '@/components/v2/Anotalo'
import { Isologo } from '@/components/v2/Isotipo'
import { LO_QUE_DICEN, URL_EMPEZAR } from '@/lib/landing'
import { CONTACT_EMAIL } from '@/lib/programa'

/**
 * Landing v2 (13/11/2026). Pedidos de Nico: fondo blanco puro, fotos solo en
 * la cinta de la red, poco texto, y la sección "No es un test. Es una red"
 * (la única que le gustó) como ADN de toda la página.
 *
 * Patrones tomados de las referencias:
 *  - Vercel: estructura de líneas finas (carriles y cruces en los cortes).
 *  - Apple: el producto en grande sobre bloques suaves, una frase por vez.
 *  - Stripe: un objeto vivo en el hero (la red generativa).
 *  - La sección de la red, tal cual: cinta de las 16 áreas + contadores.
 *
 * El hilo se lee con los titulares: problema → la red → el informe → desde
 * casa → confianza → anotalo. Sin precios, nada inventado, un solo botón.
 */

export const metadata: Metadata = {
  title: 'Timon: que elija su camino conociendo el mundo',
  description:
    'Tu hijo se conoce, conoce el trabajo real y elige su carrera con fundamento. En dos semanas, desde casa.',
  openGraph: {
    title: 'Timon: que elija su camino conociendo el mundo',
    description: 'No es un test. Es una red: 16 áreas de trabajo, 300 carreras y 50 universidades.',
    locale: 'es_AR',
    type: 'website',
  },
}

const NUMEROS = [
  { valor: 16, texto: 'áreas de trabajo' },
  { valor: 300, texto: 'carreras' },
  { valor: 50, texto: 'universidades' },
  { valor: 10000, texto: 'combinaciones analizadas', prefijo: '+' },
]

const FAQS = [
  { q: '¿Es un test vocacional?', a: 'No. El recorrido lo ayuda a conocerse, y después le muestra el trabajo real, las carreras y dónde estudiarlas.' },
  { q: '¿Cuánto cuesta?', a: 'Puede empezar gratis. El informe completo es un pago único, no una suscripción.' },
  { q: '¿Cuánto tiempo lleva?', a: '13 paradas de menos de 10 minutos. Lo ideal es hacerlas en dos semanas, a su ritmo.' },
  { q: '¿Vas a ver sus respuestas?', a: 'No. Ves cómo avanza y su informe final. Lo que responde es suyo.' },
  { q: '¿Reemplaza a un profesional?', a: 'No. Es una guía para decidir con fundamento. Si quieren, repasan el resultado con un profesional.' },
]

export default function Home() {
  return (
    <div className="v2 min-h-screen overflow-x-clip">
      <Suave>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Saltar al contenido
        </a>
        <Header />

        <main id="contenido" className="-mt-20">
          <Hero />

          <div className="carril">
            {/* ── El problema ───────────────────────────────────────────── */}
            <section className="corte px-5 py-28 text-center sm:px-10 lg:py-44">
              <Revela texto="Nadie conoce todas las opciones a los 17." className="display mx-auto max-w-[16ch] text-[clamp(2.6rem,6.6vw,5.8rem)]" />
              <p className="mt-10 text-[17px] text-[var(--texto2)]">4 de cada 10 ingresantes deja la carrera en el primer año.</p>
              <p className="etiqueta mt-3 text-[10.5px] text-[var(--tenue)]">SPU, cohorte 2019 · vía iProfesional</p>
            </section>

            {/* ── La red (la sección que gustó, tal cual) ───────────────── */}
            <section id="red" className="corte scroll-mt-24 py-28 lg:py-40">
              <div className="px-5 text-center sm:px-10">
                <p className="etiqueta text-[var(--rumbo)]">La red</p>
                <h2 className="display mx-auto mt-5 max-w-[14ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">No es un test. Es una red.</h2>
                <p className="mx-auto mt-6 max-w-[40ch] text-[19px] text-[var(--texto2)]">El trabajo real detrás de cada carrera.</p>
              </div>
              <div className="mt-16">
                <Areas />
              </div>
              <dl className="mx-auto mt-20 grid max-w-[1080px] grid-cols-2 gap-y-12 px-5 sm:px-10 lg:grid-cols-4">
                {NUMEROS.map((n) => (
                  <div key={n.texto} className="flex flex-col-reverse border-l border-[var(--borde2)] pl-5">
                    <dt className="etiqueta mt-2 text-[var(--tenue)]">{n.texto}</dt>
                    <dd className="display text-[clamp(2.6rem,5vw,4.2rem)]">
                      <Contador valor={n.valor} prefijo={n.prefijo} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* ── El informe ───────────────────────────────────────────── */}
            <section id="informe" className="corte scroll-mt-24 pb-20 pt-28 lg:pb-0 lg:pt-40">
              <div className="px-5 sm:px-10">
                <p className="etiqueta text-[var(--rumbo)]">El informe</p>
                <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">Un informe en tres actos.</h2>
              </div>
              <div className="mt-16 lg:mt-0">
                <Informe />
              </div>
              <p className="etiqueta mt-16 px-5 text-[10.5px] text-[var(--tenue)] sm:px-10 lg:mt-0 lg:pb-16">
                Capturas de la app con datos de ejemplo
              </p>
            </section>

            {/* ── Desde casa ───────────────────────────────────────────── */}
            <section className="corte px-5 py-28 sm:px-10 lg:py-40">
              <div className="text-center">
                <h2 className="display mx-auto max-w-[14ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">Dos semanas, desde casa.</h2>
                <p className="mx-auto mt-6 max-w-[42ch] text-[19px] text-[var(--texto2)]">13 paradas de menos de 10 minutos. Y te llega un resumen.</p>
              </div>
              <div className="bloque mx-auto mt-16 max-w-[1080px] px-6 py-14 sm:px-12">
                <Paradas />
              </div>
            </section>

            {/* ── Confianza ────────────────────────────────────────────── */}
            <section className="corte px-5 py-28 sm:px-10 lg:py-40">
              <h2 className="display max-w-[14ch] text-[clamp(2.6rem,6vw,5.2rem)]">Lo revisaron quienes saben.</h2>
              <ul className="mt-14 grid gap-5 md:grid-cols-3">
                {LO_QUE_DICEN.map((c) => (
                  <li key={c.quien} className="flex flex-col justify-between rounded-[24px] border border-[var(--borde)] p-7 transition-colors hover:border-[var(--borde2)]">
                    <blockquote className="text-[22px] font-light leading-[1.4] tracking-[-0.015em]">
                      {c.texto.replace(/==/g, '')}
                    </blockquote>
                    <p className="etiqueta mt-8 text-[var(--rumbo)]">{c.quien}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-16 text-center text-[clamp(1.3rem,2.4vw,1.9rem)] font-light tracking-[-0.02em] text-[var(--texto2)]">
                Vos ves cómo avanza. Sus respuestas son suyas.
              </p>
            </section>

            {/* ── Anotalo ──────────────────────────────────────────────── */}
            <section id="anotalo" className="corte scroll-mt-24 px-3 py-16 sm:px-6 lg:py-24">
              <div className="bloque px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
                <div className="mx-auto max-w-[940px]">
                  <h2 className="display text-[clamp(2.8rem,7vw,5.8rem)]">Anotalo hoy.</h2>
                  <p className="mt-5 text-[19px] text-[var(--texto2)]">Después elegís: pagar ahora o que empiece gratis.</p>
                  <div className="mt-12">
                    <Anotalo />
                  </div>
                </div>
              </div>
            </section>

            {/* ── Preguntas ────────────────────────────────────────────── */}
            <section className="corte px-5 py-28 sm:px-10 lg:py-36">
              <div className="mx-auto max-w-[820px]">
                <h2 className="titulo text-center text-[clamp(2rem,4vw,3rem)]">Preguntas</h2>
                <div className="mt-12 border-b border-[var(--borde)]">
                  {FAQS.map((f) => (
                    <details key={f.q} className="border-t border-[var(--borde)]">
                      <summary className="flex items-center justify-between gap-6 py-6 text-[18px]">
                        {f.q}
                        <Plus size={20} className="faq-signo shrink-0 text-[var(--rumbo)] transition-transform duration-300" aria-hidden />
                      </summary>
                      <p className="max-w-[60ch] pb-7 text-[16.5px] text-[var(--texto2)]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <footer className="corte px-5 py-14 sm:px-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <Isologo />
                <nav aria-label="Pie" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-[var(--texto2)]">
                  <a href={URL_EMPEZAR} className="hover:text-[var(--rumbo)]">Soy estudiante</a>
                  <Link href="/colegios" className="hover:text-[var(--rumbo)]">Colegios</Link>
                  <Link href="/terminos" className="hover:text-[var(--rumbo)]">Términos</Link>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--rumbo)]">{CONTACT_EMAIL}</a>
                </nav>
              </div>
              <p className="mt-10 max-w-[90ch] text-[12.5px] leading-[1.6] text-[var(--tenue)]">
                Timon es una guía para explorar carreras. Su informe lo genera inteligencia artificial a partir de lo que se
                responde. No es una evaluación psicológica ni psicométrica, y no reemplaza a un profesional matriculado. La
                decisión es de cada uno. Hecho por Facu, Feli y Nico en Argentina. © {new Date().getFullYear()} Timon.
              </p>
            </footer>
          </div>
        </main>
      </Suave>
    </div>
  )
}
