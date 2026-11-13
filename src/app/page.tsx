import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, LockKeyhole, Plus } from 'lucide-react'
import './home.css'
import { Header } from '@/components/home/Header'
import { Pila } from '@/components/home/Pila'
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
 * Home · dirección B, "producto tech" (elegida por Nico el 13/11/2026 entre
 * las tres de /explora). Fondo blanco, el informe real como objeto en 3D y un
 * bento de bloques grises. Las fotos aparecen solo en la cinta de la red.
 * Hilo: la promesa → el problema → el informe → la red → confianza → anotalo.
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

const ojo = 'text-[15px] font-semibold tracking-[-0.01em] text-[var(--rumbo)] sm:text-[17px]'
const h2 = 'display text-[clamp(2.5rem,5.6vw,4.6rem)]'
const tesela = 'tesela overflow-hidden rounded-[28px] bg-[var(--gris)]'

function Acto({ n, titulo }: { n: number; titulo: string }) {
  return (
    <>
      <p className="etiqueta text-[var(--rumbo)]">Acto {n}</p>
      <p className="titulo mt-1 text-[clamp(1.6rem,2.6vw,2.1rem)]">{titulo}</p>
    </>
  )
}

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
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="px-5 pt-9 text-center sm:pt-20">
          <Aparece>
            <p className={ojo}>Para madres y padres</p>
            <h1 className="display mx-auto mt-4 max-w-[14ch] text-[clamp(2.75rem,6.2vw,5.4rem)]">
              Que elija su camino conociendo{' '}
              <span className="relative inline-block whitespace-nowrap">
                el mundo
                <Dibujo retraso={0.9} className="absolute -bottom-[0.2em] left-[-3%] h-[0.3em] w-[106%]">
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    <Trazo d="M4 15 C 70 6, 150 4, 214 8 S 284 15, 296 10" ancho={4} />
                    <Trazo d="M40 20 C 110 15, 200 14, 262 18" ancho={2.5} orden={1} />
                  </svg>
                </Dibujo>
              </span>
              .
            </h1>
            <p className="mx-auto mt-5 max-w-[34ch] text-[17px] leading-[1.5] sm:mt-6 text-[var(--texto2)] sm:text-[21px]">
              Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:mt-9 sm:flex-row sm:gap-7">
              <span className="relative">
                <Dibujo retraso={1.6} className="absolute right-[calc(100%+10px)] top-1/2 hidden h-[86px] w-[230px] -translate-y-[62%] lg:block">
                  <Nota className="left-0 top-0 [--giro:-4deg]">puede empezar gratis</Nota>
                  <svg viewBox="0 0 230 86" className="absolute inset-0 h-full w-full overflow-visible">
                    <Trazo d="M92 32 C 120 70, 170 76, 214 58" color="ocean" ancho={2.2} />
                    <Trazo d="M199 50 L216 57 L204 71" color="ocean" ancho={2.2} orden={1.6} />
                  </svg>
                </Dibujo>
                <a href="#anotalo" className="btn group">
                  Quiero que mi hijo lo haga
                  <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </span>
              <a
                href="#informe"
                className="group inline-flex items-center gap-1.5 text-[16px] font-semibold text-[var(--rumbo)] underline-offset-[6px] hover:underline"
              >
                Ver el informe <ArrowDown size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </Aparece>
          <div className="relative -mt-6 sm:-mt-10">
            <Dibujo retraso={2.2} className="absolute right-[7%] top-[6%] z-10 hidden h-[130px] w-[220px] md:block xl:right-[12%]">
              <Nota className="right-0 top-0 [--giro:4deg]">su informe, tal cual lo ve</Nota>
              <svg viewBox="0 0 220 130" className="absolute inset-0 h-full w-full overflow-visible">
                <Trazo d="M150 34 C 136 78, 98 104, 30 112" color="ocean" ancho={2.2} />
                <Trazo d="M46 99 L28 112 L47 124" color="ocean" ancho={2.2} orden={1.6} />
              </svg>
            </Dibujo>
            <Pila />
          </div>
        </section>

        {/* ── El problema ──────────────────────────────────────────────── */}
        <section className="px-5 pb-24 pt-16 text-center sm:pb-36 sm:pt-20">
          <Aparece>
            <p className="display mx-auto max-w-[17ch] text-[clamp(2.2rem,4.8vw,3.9rem)]">
              Nadie conoce todas las opciones a los 17.
            </p>
            <p className="mx-auto mt-6 max-w-[36ch] text-[18px] text-[var(--texto2)]">
              <strong className="relative mr-2 inline-block whitespace-nowrap font-semibold text-[var(--texto)]">
                4 de cada 10
                <Dibujo retraso={0.5} className="absolute -inset-x-4 -inset-y-2.5">
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    <Trazo d="M152 7 C 104 0, 34 4, 12 24 C -4 42, 52 58, 118 56 C 172 54, 199 40, 190 22 C 182 8, 146 3, 112 6" ancho={2.5} />
                  </svg>
                </Dibujo>
              </strong> ingresantes deja la carrera en el
              primer año.
            </p>
            <p className="mt-2 text-[12.5px] text-[var(--tenue)]">SPU, cohorte 2019 · vía iProfesional</p>
          </Aparece>
        </section>

        {/* ── El informe: bento ────────────────────────────────────────── */}
        <section id="informe" className="mx-auto max-w-[1120px] scroll-mt-20 px-5 pb-24 sm:pb-36">
          <Aparece>
            <p className={ojo}>El informe</p>
            <h2 className={`${h2} mt-3 max-w-[14ch]`}>Un informe en tres actos.</h2>
          </Aparece>

          <div className="mt-12 grid gap-4 md:grid-cols-6">
            <Aparece className={`${tesela} px-7 pt-8 sm:px-10 sm:pt-10 md:col-span-4`}>
              <Acto n={1} titulo="Quién es." />
              <div className="captura -mb-10 mt-8 sm:mr-[16%]">
                <Image
                  src="/producto/esencia-card.webp"
                  alt="Pantalla de la esencia: los rasgos de Sofía, de Análisis a Expresión"
                  width={1380}
                  height={1110}
                  sizes="(min-width: 768px) 560px, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </Aparece>

            <Aparece
              retraso={0.08}
              className="flex min-h-[300px] flex-col justify-between rounded-[28px] bg-[var(--texto)] p-8 text-white sm:p-10 md:col-span-2"
            >
              <p className="etiqueta text-[var(--cielo)]">Tiempo</p>
              <div>
                <p className="text-[clamp(5rem,9vw,7.5rem)] font-semibold leading-none tracking-[-0.06em]">13</p>
                <p className="mt-3 max-w-[16ch] text-[19px] leading-snug text-white/70">paradas de menos de 10 minutos.</p>
                <div className="mt-7">
                  <Paradas />
                </div>
              </div>
            </Aparece>

            <Aparece className={`${tesela} px-7 pt-8 sm:px-10 sm:pt-10 md:col-span-3`}>
              <Acto n={2} titulo="Sus caminos." />
              <div className="captura -mb-6 mt-8">
                <Image
                  src="/producto/caminos-card.webp"
                  alt="Pantalla de los caminos: sus 5 carreras principales, ordenadas por compatibilidad"
                  width={1620}
                  height={1020}
                  sizes="(min-width: 768px) 460px, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </Aparece>

            <Aparece retraso={0.08} className={`${tesela} px-7 pt-8 sm:px-10 sm:pt-10 md:col-span-3`}>
              <Acto n={3} titulo="Dónde estudiarlos." />
              <div className="captura -mb-6 mt-8">
                <Image
                  src="/producto/universidades.jpg"
                  alt="Pantalla de universidades, filtradas por cuota, modalidad y ubicación"
                  width={1100}
                  height={721}
                  sizes="(min-width: 768px) 460px, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </Aparece>

            <Aparece className="flex min-h-[220px] flex-col justify-between rounded-[28px] bg-[var(--gris)] p-8 sm:p-10 md:col-span-2">
              <p className="etiqueta text-[var(--rumbo)]">Desde casa</p>
              <p className="titulo text-[clamp(1.8rem,3vw,2.4rem)]">Dos semanas, a su ritmo.</p>
            </Aparece>

            <Aparece retraso={0.08} className={`${tesela} p-5 sm:p-8 md:col-span-4`}>
              <div className="captura">
                <Image
                  src="/producto/esencia-frase.webp"
                  alt="Frase del informe que resume quién es, en sus palabras"
                  width={1380}
                  height={710}
                  sizes="(min-width: 768px) 700px, 90vw"
                  className="h-auto w-full"
                />
              </div>
            </Aparece>

            <Aparece className="flex flex-col items-start gap-6 rounded-[28px] bg-[var(--gris)] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 md:col-span-6">
              <p className="titulo max-w-[24ch] text-[clamp(1.6rem,3vw,2.3rem)]">
                Vos ves cómo avanza. <span className="text-[var(--tenue)]">Sus respuestas son suyas.</span>
              </p>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,31,54,.06)]">
                <LockKeyhole size={22} className="text-[var(--rumbo)]" aria-hidden />
              </span>
            </Aparece>
          </div>
          <p className="mt-5 text-[12.5px] text-[var(--tenue)]">Capturas de la app con datos de ejemplo.</p>
        </section>

        {/* ── La red (va tal cual: cinta de las 16 áreas y contadores) ──── */}
        <section id="red" className="scroll-mt-20 border-t border-[var(--borde)] py-24 sm:py-36">
          <Aparece className="px-5 text-center">
            <p className={ojo}>La red</p>
            <h2 className={`${h2} mx-auto mt-3 max-w-[14ch]`}>No es un test. Es una red.</h2>
            <p className="mx-auto mt-6 max-w-[40ch] text-[19px] text-[var(--texto2)]">El trabajo real detrás de cada carrera.</p>
          </Aparece>
          <div className="mt-16">
            <Areas />
          </div>
          <dl className="mx-auto mt-20 grid max-w-[1080px] grid-cols-2 gap-y-12 px-5 lg:grid-cols-4">
            {NUMEROS.map((n) => (
              <div key={n.texto} className="flex flex-col-reverse border-l border-[var(--gris2)] pl-5">
                <dt className="mt-2 text-[14px] text-[var(--tenue)]">{n.texto}</dt>
                <dd className="display text-[clamp(2.6rem,5vw,4.2rem)]">
                  <Contador valor={n.valor} prefijo={n.prefijo} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Confianza ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-5 pb-24 sm:pb-36">
          <Aparece>
            <h2 className={`${h2} max-w-[14ch]`}>Lo revisaron quienes saben.</h2>
          </Aparece>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {LO_QUE_DICEN.map((c) => (
              <li key={c.quien} className="flex flex-col justify-between rounded-[28px] bg-[var(--gris)] p-8">
                <div>
                  <span aria-hidden className="block h-7 font-[family-name:var(--font-serif)] text-[64px] leading-[0.9] text-[#c97f5e]">“</span>
                  <blockquote className="mt-3 text-[21px] font-medium leading-[1.4] tracking-[-0.02em]">
                    {c.texto.replace(/==/g, '').replace(/[“”]/g, '')}
                  </blockquote>
                </div>
                <p className="mt-10 text-[14px] leading-snug">
                  <span className="block font-semibold">{c.quien}</span>
                  <span className="text-[var(--tenue)]">{c.rol}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Anotalo ──────────────────────────────────────────────────── */}
        <section id="anotalo" className="scroll-mt-16 px-3 sm:px-5">
          <div className="mx-auto max-w-[1200px] rounded-[36px] bg-[var(--gris)] px-3 py-16 sm:px-10 sm:py-24">
            <div className="mx-auto max-w-[940px]">
              <Aparece className="px-2 text-center">
                <h2 className={h2}>Anotalo hoy.</h2>
                <p className="mx-auto mt-5 max-w-[36ch] text-[19px] text-[var(--texto2)]">
                  Después elegís: pagar ahora o que empiece gratis.
                </p>
              </Aparece>
              <div className="mt-12">
                <Anotalo />
              </div>
            </div>
          </div>
        </section>

        {/* ── Preguntas ────────────────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto grid max-w-[1120px] scroll-mt-20 gap-10 px-5 py-24 sm:py-36 md:grid-cols-[1fr_1.6fr]"
        >
          <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Preguntas.</h2>
          <div className="border-b border-[var(--borde)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[var(--borde)]">
                <summary className="flex items-center justify-between gap-6 py-6 text-[18px] font-medium tracking-[-0.01em]">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gris)] transition-colors group-hover:bg-[var(--gris2)]">
                    <Plus size={16} className="faq-signo transition-transform duration-300" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-[56ch] pb-7 text-[16.5px] text-[var(--texto2)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--borde)]">
        <div className="mx-auto max-w-[1120px] px-5 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Isologo />
            <nav aria-label="Pie" className="flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-[var(--texto2)]">
              <a href={URL_EMPEZAR} className="hover:text-[var(--texto)]">Soy estudiante</a>
              <Link href="/colegios" className="hover:text-[var(--texto)]">Colegios</Link>
              <Link href="/terminos" className="hover:text-[var(--texto)]">Términos</Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--texto)]">{CONTACT_EMAIL}</a>
            </nav>
          </div>
          <p className="mt-10 max-w-[90ch] text-[12.5px] leading-[1.6] text-[var(--tenue)]">
            Timon es una guía para explorar carreras. Su informe lo genera inteligencia artificial a partir de lo que se
            responde. No es una evaluación psicológica ni psicométrica, y no reemplaza a un profesional matriculado. La
            decisión es de cada uno. Hecho por Facu, Feli y Nico en Argentina. © {new Date().getFullYear()} Timon.
          </p>
        </div>
      </footer>
    </div>
  )
}
