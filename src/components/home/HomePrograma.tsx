import Link from 'next/link'
import { Plus } from 'lucide-react'
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
import { LO_QUE_DICEN } from '@/lib/landing'
import { CONTACT_EMAIL } from '@/lib/programa'
import type { CopyHome, Publico } from '@/lib/variantes'
import { Resaltado } from '@/components/home/Resaltado'

/**
 * Home · Programa Timon (14/11/2026). La usan / y las variantes por video
 * (/video1, /video2: ver src/lib/variantes.ts, de donde salen los textos). Vende el programa al padre o la madre.
 * Hilo: elegir es difícil → Timon lo acompaña con el mundo real → elige con
 * claridad. Dolor → la red → cómo funciona → qué recibís → prueba →
 * formulario → objeciones. Poco texto: cada sección se entiende por el
 * visual. El CTA se repite en cuatro momentos y siempre lleva al formulario
 * (/api/padres). No se muestra precio. Textos y fuentes: docs/wording-v2.md.
 *
 * Con `publico="chicos"` la misma página le habla al chico (/chicos): mismo
 * visual y mismos componentes, con el copy de COPY_CHICOS y un botón que lleva
 * a crear la cuenta en la app en vez de al formulario de padres.
 */

const NUMEROS = [
  { valor: 16, texto: 'áreas de trabajo' },
  { valor: 300, texto: 'carreras' },
  { valor: 50, texto: 'universidades' },
  { valor: 10000, texto: 'combinaciones analizadas', prefijo: '+' },
]

const h2 = 'display text-[clamp(2.5rem,5.4vw,4.6rem)]'

const TONOS_CITA = [
  { caja: 'bg-[var(--crema)]', comilla: 'text-[var(--terra)]' },
  { caja: 'bg-[var(--cielo)]', comilla: 'text-[var(--ocean)]' },
  { caja: 'bg-[var(--durazno)]', comilla: 'text-[var(--terra-hondo)]' },
]

export function HomePrograma({
  copy,
  origen,
  publico = 'padres',
}: {
  copy: CopyHome
  origen?: string
  publico?: Publico
}) {
  const esChico = publico === 'chicos'
  return (
    <div className="home min-h-screen overflow-x-clip">
      <ScrollSuave />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <Header accion={copy.accion} />

      <main id="contenido">
        <Hero titular={copy.heroTitular} bajada={copy.heroBajada} accion={copy.accion} publico={publico} />

        {/* ── 1. Dolor (crema) ─────────────────────────────────────────── */}
        <section className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[40px] bg-[var(--crema)] px-4 py-16 sm:px-10 sm:py-24">
            <span aria-hidden className="blob blob-vivo -right-16 -top-24 h-72 w-72 bg-[var(--durazno)]" />
            <div className="relative">
              <Aparece className="px-2 text-center">
                <h2 className={`${h2} mx-auto max-w-[15ch]`}>
                  <Resaltado texto={copy.dolorTitular} clase="text-[var(--terra-hondo)]" />
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
            <h2 className={`${h2} mx-auto max-w-[15ch]`}>
              <Resaltado texto={copy.redTitular} clase="text-[var(--crema)]" />
            </h2>
            <p className="mx-auto mt-5 max-w-[38ch] text-[19px] text-white/70">
              {copy.redBajada}
            </p>
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
            <Cta accion={copy.accion} tono="terra" claro />
          </div>
        </section>

        {/* ── 3. Cómo funciona: escena fija con GSAP ───────────────────── */}
        <section id="app" className="scroll-mt-16 pt-24 sm:pt-32 lg:pt-28">
          <Aparece className="mx-auto max-w-[1240px] px-5 text-center">
            <h2 className={`${h2} mx-auto max-w-[16ch]`}>
              <Resaltado texto={copy.appTitular} />
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
            <h2 className={`${h2} max-w-[16ch]`}>
              <Resaltado texto={copy.paraVosTitular} />
            </h2>
          </Aparece>
          <Aparece className="mt-12">
            <ParaVos publico={publico} />
          </Aparece>
          <div className="mt-12">
            <Cta accion={copy.accion} />
          </div>
        </section>

        {/* ── 5. Prueba: lo revisaron (citas reales de src/lib/landing.ts) ─ */}
        <section className="mx-auto max-w-[1180px] px-5 pb-24 sm:pb-32">
          <Aparece>
            <h2 className={`${h2} max-w-[14ch]`}>
              <Resaltado texto={copy.pruebaTitular} />
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
                  <Resaltado texto={copy.formTitular} />
                </h2>
                <p className="mx-auto mt-5 max-w-[34ch] text-[19px] text-white/80">
                  {copy.formBajada}
                </p>
                <Dibujo retraso={0.6} className="relative mx-auto mt-2 hidden h-[60px] w-[220px] sm:block">
                  <Nota className="left-0 top-1 text-[var(--crema)] [--giro:-4deg]">
                    {esChico ? 'arrancás ahora' : 'te lleva 1 minuto'}
                  </Nota>
                  <svg viewBox="0 0 220 60" className="absolute inset-0 h-full w-full overflow-visible">
                    <Trazo d="M150 18 C 176 22, 190 34, 186 54" color="crema" ancho={2.2} />
                    <Trazo d="M176 46 L186 56 L196 45" color="crema" ancho={2.2} orden={1.6} />
                  </svg>
                </Dibujo>
              </Aparece>
              <div className="mt-8 sm:mt-4">
                {esChico ? (
                  <div className="mt-6 sm:mt-10">
                    <Cta accion={copy.accion} tono="terra" claro />
                  </div>
                ) : (
                  <Anotalo origen={origen} />
                )}
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
              <Resaltado texto={copy.preguntasTitular} />
            </h2>
            <div className="mt-8">
              <Cta accion={copy.accion} tono="terra" alineado="izquierda" />
            </div>
          </div>
          <div className="border-b border-[var(--borde)]">
            {copy.preguntas.map((f) => (
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
              {esChico ? (
                <Link href="/" className="hover:text-white">Soy padre o madre</Link>
              ) : (
                <Link href="/chicos" className="hover:text-white">Soy estudiante</Link>
              )}
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

      <CtaFija accion={copy.accion} />
    </div>
  )
}
