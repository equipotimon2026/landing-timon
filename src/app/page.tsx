import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import './home.css'
import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { Dolor } from '@/components/home/Dolor'
import { Recorrido } from '@/components/home/Recorrido'
import { Red } from '@/components/home/Red'
import { ParaVos } from '@/components/home/ParaVos'
import { Cta, CtaFija } from '@/components/home/Cta'
import { ScrollSuave } from '@/components/home/ScrollSuave'
import { Aparece } from '@/components/home/Aparece'
import { Dibujo, Nota, Trazo } from '@/components/home/Dibujo'
import { Areas } from '@/components/home/Areas'
import { Contador } from '@/components/home/Contador'
import { Anotalo } from '@/components/home/Anotalo'
import { Isologo } from '@/components/home/Isotipo'
import { LO_QUE_DICEN, URL_EMPEZAR } from '@/lib/landing'
import { CONTACT_EMAIL } from '@/lib/programa'

/**
 * Home · Programa Timon (14/11/2026). Vende el programa al padre o la madre:
 * dolor → resultado (la red) → cómo funciona → qué recibís → prueba →
 * formulario → objeciones. Poco texto: cada sección se entiende por el
 * visual. El CTA se repite en cuatro momentos y siempre lleva al formulario
 * (/api/padres). No se muestra precio. Textos y fuentes: docs/wording-v2.md.
 */

export const metadata: Metadata = {
  title: 'Programa Timon: antes de elegir carrera, que conozca el mundo',
  description:
    'Una red de profesionales, universidades, empresas y eventos para que tu hijo o hija elija carrera con los pies en la tierra. Dos semanas, desde casa.',
  openGraph: {
    title: 'Programa Timon: antes de elegir carrera, que conozca el mundo',
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

/** Las objeciones de un padre, en sus palabras. Respuestas cortas y sin promesas que el equipo no definió. */
const FAQS = [
  {
    q: '¿Es otro test vocacional?',
    a: 'No. Los tests son solo el arranque. Después investiga el trabajo real con la red, recibe su informe y compara universidades.',
  },
  {
    q: '¿Mi hijo lo va a usar?',
    a: 'Son paradas de menos de 10 minutos, desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Y vos ves cómo avanza.',
  },
  { q: '¿Cuánto cuesta?', a: 'Depende del plan. Empezar es gratis, y el resto lo vemos juntos en la llamada.' },
  {
    q: '¿Quién está detrás?',
    a: 'Facu, Feli y Nico, un equipo argentino. Una psicopedagoga evaluó la metodología y un equipo profesional de la UBA la revisó.',
  },
  { q: '¿Vas a ver sus respuestas?', a: 'No. Ves cómo avanza y su informe final. Lo que responde es suyo.' },
]

const h2 = 'display text-[clamp(2.5rem,5.4vw,4.6rem)]'

const TONOS_CITA = [
  { caja: 'bg-[var(--crema)]', comilla: 'text-[var(--terra)]' },
  { caja: 'bg-[var(--cielo)]', comilla: 'text-[var(--ocean)]' },
  { caja: 'bg-[var(--durazno)]', comilla: 'text-[var(--terra-hondo)]' },
]

export default function Home() {
  return (
    <div className="home min-h-screen overflow-x-clip">
      <ScrollSuave />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        <Hero />

        {/* ── 1. Dolor (crema) ─────────────────────────────────────────── */}
        <section className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[40px] bg-[var(--crema)] px-4 py-16 sm:px-10 sm:py-24">
            <span aria-hidden className="blob blob-vivo -right-16 -top-24 h-72 w-72 bg-[var(--durazno)]" />
            <div className="relative">
              <Aparece className="px-2 text-center">
                <h2 className={`${h2} mx-auto max-w-[14ch]`}>
                  Elegir a ciegas <strong className="text-[var(--terra-hondo)]">sale caro</strong>.
                </h2>
              </Aparece>
              <Aparece className="mt-10 sm:mt-14">
                <Dolor />
              </Aparece>
            </div>
          </div>
        </section>

        {/* ── 2. Resultado: la red (navy) ──────────────────────────────── */}
        <section id="red" className="scroll-mt-16 bg-[var(--navy)] py-24 text-white sm:py-32 mt-16 sm:mt-24">
          <Aparece className="px-5 text-center">
            <p className="etiqueta text-[var(--terra)]">El Programa Timon</p>
            <h2 className={`${h2} mx-auto mt-4 max-w-[15ch]`}>
              No es un test. <strong className="text-[var(--crema)]">Es una red.</strong>
            </h2>
            <p className="mx-auto mt-5 max-w-[34ch] text-[19px] text-white/70">Para que elija conociendo el mundo real.</p>
          </Aparece>
          <div className="mt-14 sm:mt-16">
            <Red />
          </div>
          <div className="mt-16 sm:mt-20">
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
          <div className="mt-16">
            <Cta tono="terra" claro />
          </div>
        </section>

        {/* ── 3. Cómo funciona: escena fija con GSAP ───────────────────── */}
        <section id="app" className="scroll-mt-16 pt-24 sm:pt-32 lg:pt-28">
          <Aparece className="mx-auto max-w-[1240px] px-5 text-center">
            <p className="etiqueta text-[var(--ocean)]">Cómo funciona</p>
            <h2 className={`${h2} mx-auto mt-4 max-w-[16ch]`}>
              Cuatro pasos. <strong>Pantallas reales.</strong>
            </h2>
          </Aparece>
          <Recorrido />
          <p className="mx-auto mt-8 max-w-[1240px] px-5 text-center text-[12.5px] text-[var(--tenue)] lg:mt-0">
            Capturas de la app con datos de ejemplo.
          </p>
        </section>

        {/* ── 4. Qué recibís vos ───────────────────────────────────────── */}
        <section id="para-vos" className="mx-auto max-w-[1180px] scroll-mt-16 px-5 py-24 sm:py-32">
          <Aparece>
            <p className="etiqueta text-[var(--terra-hondo)]">Para vos</p>
            <h2 className={`${h2} mt-4 max-w-[14ch]`}>
              Fácil para tu hijo. <strong>Tranquilo para vos.</strong>
            </h2>
          </Aparece>
          <Aparece className="mt-12">
            <ParaVos />
          </Aparece>
          <div className="mt-12">
            <Cta />
          </div>
        </section>

        {/* ── 5. Prueba: lo revisaron (citas reales de src/lib/landing.ts) ─ */}
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

        {/* ── 6. Formulario (ocean) ────────────────────────────────────── */}
        <section id="anotalo" className="scroll-mt-16 px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[40px] bg-[var(--ocean)] px-3 py-16 sm:px-10 sm:py-24">
            <span aria-hidden className="blob blob-vivo -left-24 -top-24 h-80 w-80 bg-white/10" />
            <span aria-hidden className="blob blob-vivo -bottom-28 -right-16 h-96 w-96 bg-[var(--terra)] [animation-delay:-4s]" />
            <div className="relative mx-auto max-w-[940px]">
              <Aparece className="px-2 text-center text-white">
                <h2 className={h2}>
                  Que elija <strong>bien</strong>.
                </h2>
                <p className="mx-auto mt-5 max-w-[34ch] text-[19px] text-white/80">
                  Dejanos tus datos. Te escribimos en menos de 24 h, sin compromiso.
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

        {/* ── 7. Objeciones ────────────────────────────────────────────── */}
        <section
          id="preguntas"
          className="mx-auto grid max-w-[1180px] scroll-mt-16 gap-10 px-5 py-24 sm:py-32 md:grid-cols-[1fr_1.6fr]"
        >
          <div>
            <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">
              <strong>Preguntas</strong> de madres y padres.
            </h2>
            <div className="mt-8">
              <Cta tono="terra" alineado="izquierda" />
            </div>
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

      <footer className="bg-[var(--navy)] pb-20 text-white md:pb-0">
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

      <CtaFija />
    </div>
  )
}
