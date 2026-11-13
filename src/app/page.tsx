import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import './v2.css'
import { Suave } from '@/components/v2/Suave'
import { Header } from '@/components/v2/Header'
import { Hero } from '@/components/v2/Hero'
import { Areas } from '@/components/v2/Areas'
import { Contador } from '@/components/v2/Contador'
import { Informe } from '@/components/v2/Informe'
import { Anotalo } from '@/components/v2/Anotalo'
import { Isologo } from '@/components/v2/Isotipo'
import { LO_QUE_DICEN, URL_EMPEZAR } from '@/lib/landing'
import { CONTACT_EMAIL } from '@/lib/programa'

/**
 * Landing v2, versión premium (13/11/2026). Fuente de verdad visual: el Brand
 * Kit y el Brand Playbook de Timon (Descargas de Nico). Paleta Crema + Navy,
 * Plus Jakarta 300 en titulares, JetBrains Mono en etiquetas, fotografía de
 * campaña de la marca y capturas reales de la app (demo con datos ficticios).
 *
 * Pedido de Nico: poco texto, una idea por pantalla, el hilo se lee solo con
 * los titulares: problema → la red → el informe → desde casa → confianza →
 * anotalo. Tono del playbook: "acompaña, no impone", "más confianza que
 * presión". Sin precios, nada inventado, un solo botón.
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

function Cita({ texto }: { texto: string }) {
  return <>{texto.replace(/==/g, '')}</>
}

export default function Home() {
  return (
    <div className="v2 min-h-screen overflow-x-clip">
      <Suave>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Saltar al contenido
        </a>
        <Header />

        <main id="contenido">
          <Hero />

          {/* ── El problema ─────────────────────────────────────────────── */}
          <section className="px-3 sm:px-6">
            <div className="relative mx-auto min-h-[78vh] max-w-[1400px] overflow-hidden rounded-[32px] bg-[var(--tinta)]">
              <Image
                src="/marca/que-estudiar.jpg"
                alt=""
                fill
                sizes="(min-width: 1400px) 1400px, 100vw"
                className="object-cover object-[50%_35%] opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,31,54,0.92)] via-[rgba(15,31,54,0.55)] to-transparent" />
              <div className="relative flex min-h-[78vh] max-w-[760px] flex-col justify-end p-7 sm:p-14 lg:p-20">
                <h2 className="display text-[clamp(2.6rem,6vw,5.2rem)] text-[var(--papel)]">
                  Nadie conoce todas las opciones a los 17.
                </h2>
                <p className="mt-6 text-[18px] text-[rgba(245,237,224,0.75)]">
                  4 de cada 10 ingresantes deja la carrera en el primer año.
                  <span className="etiqueta mt-3 block text-[10.5px] text-[rgba(245,237,224,0.45)]">
                    SPU, cohorte 2019 · vía iProfesional
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ── La red ──────────────────────────────────────────────────── */}
          <section id="red" className="scroll-mt-24 py-28 lg:py-40">
            <div className="mx-auto max-w-[1280px] px-5 text-center sm:px-8">
              <p className="etiqueta text-[var(--rumbo)]">La red</p>
              <h2 className="display mx-auto mt-5 max-w-[14ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">No es un test. Es una red.</h2>
              <p className="mx-auto mt-6 max-w-[40ch] text-[19px] text-[var(--tinta2)]">El trabajo real detrás de cada carrera.</p>
            </div>
            <div className="mt-16">
              <Areas />
            </div>
            <dl className="mx-auto mt-20 grid max-w-[1180px] grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
              {NUMEROS.map((n) => (
                <div key={n.texto} className="border-l border-[var(--linea-fuerte)] pl-5">
                  <dd className="display text-[clamp(2.6rem,5vw,4.2rem)] text-[var(--tinta)]">
                    <Contador valor={n.valor} prefijo={n.prefijo} />
                  </dd>
                  <dt className="etiqueta mt-2 text-[var(--grafito)]">{n.texto}</dt>
                </div>
              ))}
            </dl>
          </section>

          {/* ── El informe ──────────────────────────────────────────────── */}
          <section id="informe" className="scroll-mt-24 bg-[var(--elev)] pb-24 pt-28 lg:pb-10 lg:pt-36">
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
              <p className="etiqueta text-[var(--rumbo)]">El informe</p>
              <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">Un informe en tres actos.</h2>
            </div>
            <div className="mt-16 lg:mt-0">
              <Informe />
            </div>
            <p className="etiqueta mx-auto mt-16 max-w-[1280px] px-5 text-[10.5px] text-[var(--grafito)] sm:px-8 lg:mt-0 lg:pb-16">
              Capturas de la app con datos de ejemplo
            </p>
          </section>

          {/* ── Desde casa ──────────────────────────────────────────────── */}
          <section className="px-3 py-28 sm:px-6 lg:py-40">
            <div className="relative mx-auto min-h-[82vh] max-w-[1400px] overflow-hidden rounded-[32px]">
              <Image src="/marca/en-casa.jpg" alt="Un chico hace una parada del recorrido desde el celular, en el sillón de su casa" fill sizes="(min-width: 1400px) 1400px, 100vw" className="object-cover object-[45%_40%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,31,54,0.85)] via-[rgba(15,31,54,0.15)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-14 lg:p-20">
                <h2 className="display text-[clamp(2.6rem,6vw,5.2rem)] text-[var(--papel)]">Dos semanas, desde casa.</h2>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {['13 paradas', 'Menos de 10 minutos cada una', 'Te llega un resumen'].map((t) => (
                    <li key={t} className="rounded-full border border-[rgba(245,237,224,0.3)] bg-[rgba(245,237,224,0.12)] px-4 py-2 text-[15px] text-[var(--papel)] backdrop-blur-md">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Confianza ───────────────────────────────────────────────── */}
          <section className="mx-auto max-w-[1280px] px-5 pb-28 sm:px-8 lg:pb-40">
            <p className="etiqueta text-[var(--rumbo)]">Confianza</p>
            <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.6rem,6vw,5.2rem)]">Lo revisaron quienes saben.</h2>
            <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {LO_QUE_DICEN.map((c) => (
                <li key={c.quien} className="border-t border-[var(--linea-fuerte)] pt-7">
                  <blockquote className="text-[23px] font-light leading-[1.35] tracking-[-0.015em]">
                    <Cita texto={c.texto} />
                  </blockquote>
                  <p className="etiqueta mt-6 text-[var(--tinta2)]">{c.quien}</p>
                </li>
              ))}
            </ul>
            <p className="mt-20 text-center text-[clamp(1.4rem,2.6vw,2rem)] font-light tracking-[-0.02em] text-[var(--tinta2)]">
              Vos ves cómo avanza. Sus respuestas son suyas.
            </p>
          </section>

          {/* ── Anotalo ─────────────────────────────────────────────────── */}
          <section id="anotalo" className="scroll-mt-24 px-3 sm:px-6">
            <div className="mx-auto max-w-[1400px] rounded-[32px] bg-[var(--tinta)] px-5 py-20 text-[var(--papel)] sm:px-10 lg:px-20 lg:py-28">
              <div className="mx-auto max-w-[980px]">
                <h2 className="display text-[clamp(2.8rem,7vw,5.8rem)]">Anotalo hoy.</h2>
                <p className="mt-5 text-[19px] text-[rgba(245,237,224,0.7)]">Después elegís: pagar ahora o que empiece gratis.</p>
                <div className="mt-12">
                  <Anotalo />
                </div>
              </div>
            </div>
          </section>

          {/* ── Preguntas ───────────────────────────────────────────────── */}
          <section className="mx-auto max-w-[880px] px-5 py-28 sm:px-8 lg:py-36">
            <h2 className="titulo text-center text-[clamp(2rem,4vw,3rem)]">Preguntas</h2>
            <div className="mt-12 border-b border-[var(--linea-fuerte)]">
              {FAQS.map((f) => (
                <details key={f.q} className="border-t border-[var(--linea-fuerte)]">
                  <summary className="flex items-center justify-between gap-6 py-6 text-[18px] font-medium">
                    {f.q}
                    <Plus size={20} className="faq-signo shrink-0 text-[var(--rumbo)] transition-transform duration-300" aria-hidden />
                  </summary>
                  <p className="max-w-[60ch] pb-7 text-[16.5px] text-[var(--tinta2)]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-[var(--linea)]">
          <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <Isologo />
              <nav aria-label="Pie" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-[var(--tinta2)]">
                <a href={URL_EMPEZAR} className="hover:text-[var(--rumbo)]">Soy estudiante</a>
                <Link href="/colegios" className="hover:text-[var(--rumbo)]">Colegios</Link>
                <Link href="/terminos" className="hover:text-[var(--rumbo)]">Términos</Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--rumbo)]">{CONTACT_EMAIL}</a>
              </nav>
            </div>
            <p className="mt-10 max-w-[90ch] text-[12.5px] leading-[1.6] text-[var(--grafito)]">
              Timon es una guía para explorar carreras. Su informe lo genera inteligencia artificial a partir de lo que se
              responde. No es una evaluación psicológica ni psicométrica, y no reemplaza a un profesional matriculado. La
              decisión es de cada uno. Hecho por Facu, Feli y Nico en Argentina. © {new Date().getFullYear()} Timon.
            </p>
          </div>
        </footer>
      </Suave>
    </div>
  )
}
