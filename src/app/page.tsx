import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, LockKeyhole, Plus } from 'lucide-react'
import './home.css'
import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { Recorrido } from '@/components/home/Recorrido'
import { Red } from '@/components/home/Red'
import { Aparece } from '@/components/home/Aparece'
import { Paradas } from '@/components/home/Paradas'
import { Dibujo, Nota, Trazo } from '@/components/home/Dibujo'
import { Areas } from '@/components/home/Areas'
import { Contador } from '@/components/home/Contador'
import { Anotalo } from '@/components/home/Anotalo'
import { Isologo } from '@/components/home/Isotipo'
import { LO_QUE_DICEN, URL_EMPEZAR } from '@/lib/landing'
import { CONTACT_EMAIL } from '@/lib/programa'

/**
 * Home · dirección B con la marca de Timon (14/11/2026). Blanco de base en el
 * hero; después bloques de color de la marca, alternados. El producto real
 * (capturas de la demo) en marcos de MacBook y de iPhone. La red es el valor
 * central. Textos en rioplatense, para el padre o la madre: ver
 * docs/wording-v2.md.
 * Hilo: la promesa → el problema → la app por dentro → la red → lo que tenés
 * que saber → quienes lo revisaron → anotalo → preguntas.
 */

export const metadata: Metadata = {
  title: 'Timon: antes de elegir carrera, que conozca el mundo',
  description:
    'Timon le muestra a tu hijo o hija cómo es el trabajo de verdad, con una red de profesionales, universidades, empresas y eventos. Empieza gratis, desde casa.',
  openGraph: {
    title: 'Timon: antes de elegir carrera, que conozca el mundo',
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
  {
    q: '¿Es un test vocacional?',
    a: 'No. Arranca con unos tests cortos para que se conozca, y después le muestra el trabajo real, las carreras y dónde estudiarlas.',
  },
  { q: '¿Cuánto cuesta?', a: 'Empieza gratis. El informe completo es un pago único, no una suscripción.' },
  { q: '¿Cuánto tiempo lleva?', a: '13 paradas de menos de 10 minutos. Lo ideal es hacerlas en dos semanas, a su ritmo.' },
  { q: '¿Vas a ver sus respuestas?', a: 'No. Ves cómo avanza y su informe final. Lo que responde es suyo.' },
  {
    q: '¿Reemplaza a un profesional?',
    a: 'No. Es una guía para elegir con fundamento. Si quieren, después repasan el resultado con un profesional.',
  },
]

const h2 = 'display text-[clamp(2.5rem,5.4vw,4.6rem)]'

/** Colores de las tarjetas de "Lo revisaron", en el orden de LO_QUE_DICEN. */
const TONOS_CITA = [
  { caja: 'bg-[var(--crema)]', comilla: 'text-[var(--terra)]' },
  { caja: 'bg-[var(--cielo)]', comilla: 'text-[var(--ocean)]' },
  { caja: 'bg-[var(--durazno)]', comilla: 'text-[var(--terra-hondo)]' },
]

export default function Home() {
  return (
    <div className="home min-h-screen overflow-x-clip">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        <Hero />

        {/* ── El problema (crema) ──────────────────────────────────────── */}
        <section className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[40px] bg-[var(--crema)] px-6 py-20 text-center sm:py-28">
            <span aria-hidden className="blob blob-vivo -left-16 -top-20 h-56 w-56 bg-[var(--durazno)]" />
            <span aria-hidden className="blob blob-vivo -bottom-24 -right-10 h-64 w-64 bg-white/60 [animation-delay:-7s]" />
            <Aparece className="relative">
              <p className="etiqueta text-[var(--terra-hondo)]">El problema</p>
              <p className="display mx-auto mt-5 max-w-[16ch] text-[clamp(2.3rem,4.8vw,4rem)]">
                A los 17, nadie conoce <strong>todas las opciones</strong>.
              </p>
              <p className="mx-auto mt-7 max-w-[34ch] text-[19px] text-[var(--texto2)]">
                <strong className="relative mr-2 inline-block whitespace-nowrap font-semibold text-[var(--texto)]">
                  4 de cada 10
                  <Dibujo retraso={0.5} className="absolute -inset-x-4 -inset-y-2.5">
                    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                      <Trazo d="M152 7 C 104 0, 34 4, 12 24 C -4 42, 52 58, 118 56 C 172 54, 199 40, 190 22 C 182 8, 146 3, 112 6" ancho={2.5} />
                    </svg>
                  </Dibujo>
                </strong>
                ingresantes deja la carrera en el primer año.
              </p>
              <p className="mt-3 text-[12.5px] text-[var(--tenue)]">SPU, cohorte 2019 · vía iProfesional</p>
            </Aparece>
          </div>
        </section>

        {/* ── La app por dentro ────────────────────────────────────────── */}
        <section id="app" className="scroll-mt-16 pb-16 pt-24 sm:pb-24 sm:pt-32">
          <Aparece className="mx-auto max-w-[1240px] px-5">
            <p className="etiqueta text-[var(--ocean)]">La app por dentro</p>
            <h2 className={`${h2} mt-4 max-w-[15ch]`}>
              Así lo vive, <strong>paso a paso</strong>.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[18px] text-[var(--texto2)]">
              Cuatro partes, desde el celular o la compu. Estas son las pantallas reales.
            </p>
          </Aparece>
          <Recorrido />
          <p className="mx-auto mt-6 max-w-[1240px] px-5 text-[12.5px] text-[var(--tenue)]">
            Capturas de la app con datos de ejemplo.
          </p>
        </section>

        {/* ── La red (navy) ────────────────────────────────────────────── */}
        <section id="red" className="scroll-mt-16 bg-[var(--navy)] py-24 text-white sm:py-32">
          <Aparece className="px-5 text-center">
            <p className="etiqueta text-[var(--terra)]">La red</p>
            <h2 className={`${h2} mx-auto mt-4 max-w-[14ch]`}>
              No es un test. <strong className="text-[var(--crema)]">Es una red.</strong>
            </h2>
            <p className="mx-auto mt-6 max-w-[40ch] text-[19px] text-white/70">
              Detrás de cada carrera hay gente que la trabaja. Timon acerca a tu hijo o hija a ese mundo.
            </p>
          </Aparece>
          <div className="mt-16">
            <Red />
          </div>
          <div className="mt-20">
            <Areas />
          </div>
          <dl className="mx-auto mt-16 grid max-w-[1080px] grid-cols-2 gap-y-12 px-5 lg:grid-cols-4">
            {NUMEROS.map((n) => (
              <div key={n.texto} className="flex flex-col-reverse border-l-2 border-[var(--terra)] pl-5">
                <dt className="mt-2 text-[14px] text-white/60">{n.texto}</dt>
                <dd className="display text-[clamp(2.6rem,5vw,4.2rem)]">
                  <Contador valor={n.valor} prefijo={n.prefijo} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Lo que tenés que saber: bento de colores ─────────────────── */}
        <section id="saber" className="mx-auto max-w-[1180px] scroll-mt-16 px-5 py-24 sm:py-32">
          <Aparece>
            <p className="etiqueta text-[var(--terra-hondo)]">Lo que tenés que saber</p>
            <h2 className={`${h2} mt-4 max-w-[13ch]`}>
              Fácil de hacer. <strong>Tranquilo para vos.</strong>
            </h2>
          </Aparece>

          <div className="mt-12 grid gap-4 md:grid-cols-6">
            <Aparece className="tesela relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[30px] bg-[var(--ocean)] p-8 text-white sm:p-10 md:col-span-3">
              <p className="etiqueta text-white/70">Tiempo</p>
              <div>
                <p className="display text-[clamp(5rem,9vw,7.5rem)] leading-none">
                  <strong>13</strong>
                </p>
                <p className="mt-3 max-w-[18ch] text-[19px] leading-snug text-white/80">paradas de menos de 10 minutos.</p>
                <div className="mt-7">
                  <Paradas />
                </div>
              </div>
            </Aparece>

            <Aparece
              retraso={0.08}
              className="tesela relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[30px] bg-[var(--terra)] p-8 text-white sm:p-10 md:col-span-3"
            >
              <p className="etiqueta text-white/75">Desde casa</p>
              <p className="titulo max-w-[14ch] text-[clamp(2rem,3.4vw,2.8rem)]">Dos semanas, a su ritmo.</p>
              <span aria-hidden className="blob blob-vivo -bottom-16 -right-10 h-48 w-48 bg-white/15" />
            </Aparece>

            <Aparece className="tesela relative flex flex-col overflow-hidden rounded-[30px] bg-[var(--crema)] px-8 pt-8 sm:px-10 sm:pt-10 md:col-span-4">
              <p className="etiqueta text-[var(--terra-hondo)]">Su informe</p>
              <p className="titulo mt-3 max-w-[20ch] text-[clamp(1.7rem,2.6vw,2.2rem)]">
                Quién es, qué carreras van con su perfil y dónde estudiarlas.
              </p>
              <div className="captura -mb-10 mt-8 sm:mr-[12%]">
                <Image
                  src="/producto/caminos-card.webp"
                  alt="Pantalla de los caminos: sus 5 carreras principales, ordenadas por compatibilidad"
                  width={1620}
                  height={1020}
                  sizes="(min-width: 768px) 640px, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </Aparece>

            <Aparece
              retraso={0.08}
              className="tesela flex min-h-[260px] flex-col justify-between rounded-[30px] bg-[var(--cielo)] p-8 sm:p-10 md:col-span-2"
            >
              <p className="etiqueta text-[var(--ocean)]">Precio</p>
              <div>
                <p className="titulo text-[clamp(1.8rem,3vw,2.4rem)]">Empieza gratis.</p>
                <p className="mt-3 text-[16px] text-[var(--texto2)]">El informe completo es un pago único, no una suscripción.</p>
              </div>
            </Aparece>

            <Aparece className="tesela flex flex-col items-start gap-6 rounded-[30px] bg-[var(--navy)] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10 md:col-span-6">
              <p className="titulo max-w-[26ch] text-[clamp(1.6rem,3vw,2.3rem)]">
                Vos ves cómo avanza. <span className="text-white/55">Sus respuestas son suyas.</span>
              </p>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--terra)]">
                <LockKeyhole size={22} className="text-white" aria-hidden />
              </span>
            </Aparece>
          </div>
        </section>

        {/* ── Quienes lo revisaron ─────────────────────────────────────── */}
        <section className="mx-auto max-w-[1180px] px-5 pb-24 sm:pb-32">
          <Aparece>
            <h2 className={`${h2} max-w-[14ch]`}>
              Lo revisaron <strong>quienes saben</strong>.
            </h2>
          </Aparece>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {LO_QUE_DICEN.map((c, i) => {
              const tono = TONOS_CITA[i % TONOS_CITA.length]
              return (
                <li key={c.quien} className={`tesela flex flex-col justify-between rounded-[30px] p-8 ${tono.caja}`}>
                  <div>
                    <span aria-hidden className={`block h-7 font-[family-name:var(--font-serif)] text-[64px] leading-[0.9] ${tono.comilla}`}>
                      “
                    </span>
                    <blockquote className="mt-3 text-[21px] font-medium leading-[1.4] tracking-[-0.02em]">
                      {c.texto.replace(/==/g, '').replace(/[“”]/g, '')}
                    </blockquote>
                  </div>
                  <p className="mt-10 text-[14px] leading-snug">
                    <span className="block font-semibold">{c.quien}</span>
                    <span className="text-[var(--texto2)]">{c.rol}</span>
                  </p>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ── Anotalo (ocean) ──────────────────────────────────────────── */}
        <section id="anotalo" className="scroll-mt-16 px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[40px] bg-[var(--ocean)] px-3 py-16 sm:px-10 sm:py-24">
            <span aria-hidden className="blob blob-vivo -left-24 -top-24 h-80 w-80 bg-white/10" />
            <span aria-hidden className="blob blob-vivo -bottom-28 -right-16 h-96 w-96 bg-[var(--terra)] [animation-delay:-4s]" />
            <div className="relative mx-auto max-w-[940px]">
              <Aparece className="px-2 text-center text-white">
                <p className="etiqueta text-[var(--crema)]">Anotalo</p>
                <h2 className={`${h2} mt-4`}>
                  Que empiece <strong>hoy</strong>.
                </h2>
                <p className="mx-auto mt-5 max-w-[36ch] text-[19px] text-white/80">
                  Dejás tus datos y elegís: que arranque gratis o pagar ahora.
                </p>
                <Dibujo retraso={0.6} className="relative mx-auto mt-2 hidden h-[60px] w-[220px] sm:block">
                  <Nota className="left-0 top-1 text-[var(--crema)] [--giro:-4deg]">te lleva 1 minuto</Nota>
                  <svg viewBox="0 0 220 60" className="absolute inset-0 h-full w-full overflow-visible">
                    <Trazo d="M150 18 C 176 22, 190 34, 186 54" color="crema" ancho={2.2} />
                    <Trazo d="M176 46 L186 56 L196 45" color="crema" ancho={2.2} orden={1.6} />
                  </svg>
                </Dibujo>
              </Aparece>
              <div className="mt-8 sm:mt-4">
                <Anotalo />
              </div>
            </div>
          </div>
        </section>

        {/* ── Preguntas ────────────────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto grid max-w-[1180px] scroll-mt-16 gap-10 px-5 py-24 sm:py-32 md:grid-cols-[1fr_1.6fr]"
        >
          <div>
            <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">
              <strong>Preguntas</strong> de madres y padres.
            </h2>
            <a href="#anotalo" className="btn btn-terra group mt-8">
              Quiero que lo haga
              <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="border-b border-[var(--borde)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[var(--borde)]">
                <summary className="flex items-center justify-between gap-6 py-6 text-[18px] font-medium tracking-[-0.01em]">
                  {f.q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--crema)] text-[var(--terra-hondo)] transition-colors group-hover:bg-[var(--terra)] group-hover:text-white">
                    <Plus size={16} className="faq-signo transition-transform duration-300" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-[56ch] pb-7 text-[16.5px] text-[var(--texto2)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Isologo tono="crema" />
            <nav aria-label="Pie" className="flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-white/70">
              <a href={URL_EMPEZAR} className="hover:text-white">Soy estudiante</a>
              <Link href="/colegios" className="hover:text-white">Colegios</Link>
              <Link href="/terminos" className="hover:text-white">Términos</Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
            </nav>
          </div>
          <p className="mt-10 max-w-[90ch] text-[12.5px] leading-[1.6] text-white/50">
            Timon es una guía para explorar carreras. Su informe lo genera inteligencia artificial a partir de lo que se
            responde. No es una evaluación psicológica ni psicométrica, y no reemplaza a un profesional matriculado. La
            decisión es de cada uno. Hecho por Facu, Feli y Nico en Argentina. © {new Date().getFullYear()} Timon.
          </p>
        </div>
      </footer>
    </div>
  )
}
