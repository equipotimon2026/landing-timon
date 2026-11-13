import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import './v2.css'
import { Header } from '@/components/v2/Header'
import { Carta } from '@/components/v2/Carta'
import { Mundos } from '@/components/v2/Mundos'
import { Anotalo } from '@/components/v2/Anotalo'
import { MarcaTimon, Rueda } from '@/components/landing/Marca'
import { LO_QUE_DICEN, URL_EMPEZAR } from '@/lib/landing'
import { CONTACT_EMAIL } from '@/lib/programa'

/**
 * Landing v2 (13/11/2026), hecha desde cero a pedido de Nico.
 *
 * Le habla al padre o la madre, que es quien decide y paga (plan del 11/11
 * con Facundo). El hilo: el miedo como entrada (perder un año eligiendo a
 * ciegas), la red como valor (no es un test: el trabajo real, las
 * universidades, la gente) y un solo botón al formulario del padre.
 *
 * Reglas que siguen valiendo: sin precios, nada inventado (los números y las
 * citas son los de la presentación y las pruebas reales), "Timon" sin tilde,
 * nada de "orientación vocacional", "diagnóstico" ni "carrera ideal". Los
 * profesionales del módulo de áreas son virtuales: no se promete hablar con
 * gente real salvo en la revisión con un profesional.
 */

export const metadata: Metadata = {
  title: 'Timon: que tu hijo no elija carrera a ciegas',
  description:
    'Timon le muestra a tu hijo cómo es el trabajo real en 16 áreas, cruza lo que le gusta con 300 carreras y lo deja elegir con fundamento. Desde casa, en dos semanas.',
  openGraph: {
    title: 'Timon: que tu hijo no elija carrera a ciegas',
    description:
      'No es un test: es una red de áreas de trabajo, universidades y profesionales para elegir con fundamento, sin perder un año.',
    locale: 'es_AR',
    type: 'website',
  },
}

const RED = [
  {
    titulo: 'Las universidades',
    texto: '300 carreras en 50 universidades del país, filtradas por dónde vive y el presupuesto de la familia.',
  },
  {
    titulo: 'El trabajo y los sueldos',
    texto: 'A qué trabajo lleva cada carrera, con rangos de sueldo actuales, para que no elija solo por la materia que le gusta.',
  },
  {
    titulo: 'Las charlas',
    texto: 'Charlas y novedades de profesionales y universidades dentro de la app, para seguir al día después de elegir.',
  },
  {
    titulo: 'Una persona de verdad',
    texto: 'Si quieren, repasan el resultado con un profesional y salen con los próximos pasos claros.',
  },
]

const PASOS = [
  { cuando: 'Hoy', titulo: 'Lo anotás', texto: 'Un minuto, acá abajo. Le mandás el link y crea su cuenta.' },
  {
    cuando: 'Días 1 a 14',
    titulo: 'Hace 13 paradas cortas',
    texto: 'Menos de 10 minutos cada una, desde el celular. Intereses, forma de pensar, su historia. No hay respuestas correctas.',
  },
  {
    cuando: 'A mitad de camino',
    titulo: 'Te llega un resumen',
    texto: 'Qué se va descubriendo y cómo acompañarlo, sin sus respuestas.',
  },
  {
    cuando: 'Al terminar',
    titulo: 'Ve su informe',
    texto: 'Su perfil, las carreras que mejor le van, por qué, y dónde estudiarlas.',
  },
]

const FAQS = [
  {
    q: '¿Es un test vocacional?',
    a: 'No. El recorrido ordena sus intereses y su forma de pensar, pero lo que viene después es lo importante: cómo es por dentro cada área de trabajo, dónde se estudia y de qué se vive, para elegir con información real.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Puede empezar gratis y hacer el recorrido completo. Al terminar ve la primera parte de su perfil. El informe completo, con sus carreras y dónde estudiarlas, es un pago único. No es una suscripción.',
  },
  {
    q: '¿Cuánto tiempo lleva?',
    a: 'Son 13 paradas de menos de 10 minutos. Lo ideal es hacerlas en dos semanas, a su ritmo: de corrido cansa y las respuestas salen peor.',
  },
  {
    q: '¿Vas a ver sus respuestas?',
    a: 'No. Te avisamos cómo avanza y cuándo está listo el informe, pero lo que responde es suyo. Sin esa garantía nadie contesta con sinceridad.',
  },
  {
    q: '¿Reemplaza a un psicólogo o una psicopedagoga?',
    a: 'No. Timon es una guía: ordena lo que responde y le muestra caminos para investigar. La decisión es de ustedes. Si quieren, repasan el resultado con un profesional.',
  },
  {
    q: '¿Y si ya terminó el colegio o empezó una carrera?',
    a: 'También le sirve. Muchos llegan después de un primer año que no les cerró: el recorrido es el mismo y el informe le muestra qué otros caminos tiene.',
  },
]

const LOGOS = [
  { src: '/logos/universities/uba.svg', alt: 'UBA' },
  { src: '/logos/universities/utn.png', alt: 'UTN' },
  { src: '/logos/universities/unlp.png', alt: 'UNLP' },
  { src: '/logos/universities/itba.png', alt: 'ITBA' },
  { src: '/logos/universities/uade.svg', alt: 'UADE' },
  { src: '/logos/universities/uca.png', alt: 'UCA' },
  { src: '/logos/universities/siglo21.svg', alt: 'Siglo 21' },
  { src: '/logos/universities/unc.svg', alt: 'UNC' },
]

/** Las partes entre ==dobles iguales== van marcadas con el lápiz amarillo. */
function Marcado({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(==[^=]+==)/g).map((t, i) =>
        t.startsWith('==') ? (
          <mark key={i} className="bg-[linear-gradient(transparent_55%,var(--faro)_55%)] px-0.5 text-inherit">
            {t.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
    </>
  )
}

export default function Home() {
  return (
    <div className="v2 min-h-screen">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="carta-fondo pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-6 px-4 pb-16 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14 lg:pb-24 lg:pt-20">
            <div>
              <h1 className="display text-[clamp(2.9rem,8.4vw,6.4rem)]">
                Que no elija su carrera a ciegas.
              </h1>
              <p className="mt-7 max-w-[34ch] text-[19px] leading-[1.55] text-[var(--grafito)] sm:text-[21px]">
                A los 17 nadie conoce todas las opciones. Timon le muestra a tu hijo cómo es el
                trabajo real, cruza lo que le gusta con 300 carreras y lo deja elegir con
                fundamento. Desde casa, en dos semanas.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <a href="#anotalo" className="btn">
                  Quiero que mi hijo lo haga
                </a>
                <a href={URL_EMPEZAR} className="text-[15.5px] font-semibold underline decoration-[var(--linea)] decoration-2 underline-offset-[6px] hover:decoration-[var(--rumbo)]">
                  ¿Sos estudiante? Empezá gratis
                </a>
              </div>
            </div>
            <Carta />
          </div>
        </section>

        {/* ── El costo de adivinar ─────────────────────────────────────── */}
        <section className="border-y border-[var(--linea)] bg-white">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-28">
            <h2 className="titulo text-[clamp(2.2rem,5vw,3.8rem)]">Un año perdido no se recupera.</h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <figure>
                <div className="flex flex-wrap gap-2" role="img" aria-label="4 de cada 10">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        i < 4 ? 'bg-[var(--faro)]' : 'bg-[var(--mar)]'
                      }`}
                    >
                      <Rueda size={20} color={i < 4 ? '#14203a' : '#7b8aa8'} />
                    </span>
                  ))}
                </div>
                <figcaption className="mt-5 text-[19px] leading-[1.5]">
                  <strong className="font-extrabold">4 de cada 10 ingresantes</strong> abandonan la
                  carrera en el primer año.
                  <span className="mt-2 block text-[13px] text-[var(--grafito)]">
                    38,1% de la cohorte 2019. Secretaría de Políticas Universitarias, vía iProfesional.
                  </span>
                </figcaption>
              </figure>
              <div className="border-t border-[var(--linea)] pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
                <p className="text-[19px] leading-[1.5]">
                  Y en una universidad privada, cada mes de esa prueba cuesta entre{' '}
                  <strong className="font-extrabold">$304.000 y $1.300.000</strong>.
                </p>
                <span className="mt-2 block text-[13px] text-[var(--grafito)]">
                  Cuotas de octubre de 2024, El Cronista.
                </span>
                <p className="mano mt-8 rotate-[-1.5deg] text-[21px] text-[var(--rumbo)]">
                  elegir bien sale mucho más barato
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── La red ───────────────────────────────────────────────────── */}
        <section id="red" className="scroll-mt-20">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <div className="max-w-[860px]">
              <h2 className="titulo text-[clamp(2.4rem,6vw,4.6rem)]">
                Timon no es un test. Es una red.
              </h2>
              <p className="mt-6 max-w-[56ch] text-[19px] leading-[1.6] text-[var(--grafito)]">
                Un test le devuelve una palabra. Timon le abre lo que hay detrás de cada carrera: cómo
                es el trabajo, dónde se estudia, de qué se vive. Y lo mantiene al día cuando ya eligió.
              </p>
            </div>

            <div className="mt-14">
              <Mundos />
            </div>

            <ul className="mt-20 grid gap-x-12 sm:grid-cols-2">
              {RED.map((r) => (
                <li key={r.titulo} className="border-t border-[var(--tinta)] py-7">
                  <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{r.titulo}</h3>
                  <p className="mt-2 max-w-[46ch] text-[16.5px] leading-[1.6] text-[var(--grafito)]">{r.texto}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-[var(--linea)] pt-8">
              <p className="text-[14px] text-[var(--grafito)]">Algunas de las universidades que aparecen en el informe</p>
              <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6">
                {LOGOS.map((l) => (
                  <li key={l.alt} className="relative h-9 w-[84px] opacity-55 grayscale">
                    <Image src={l.src} alt={l.alt} fill sizes="84px" className="object-contain object-left" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── El recorrido ─────────────────────────────────────────────── */}
        <section id="recorrido" className="scroll-mt-20 bg-[var(--tinta)] text-white">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:py-28">
            <div>
              <h2 className="titulo text-[clamp(2.3rem,5.4vw,4.2rem)]">Dos semanas, de no saber a elegir.</h2>
              <ol className="mt-12 space-y-0">
                {PASOS.map((p, i) => (
                  <li key={p.titulo} className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 pb-9 last:pb-0">
                    {i < PASOS.length - 1 && (
                      <span className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-white/20" aria-hidden />
                    )}
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-[16px] font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-[#9FB4F2]">{p.cuando}</p>
                      <h3 className="mt-0.5 text-[22px] font-extrabold tracking-[-0.02em]">{p.titulo}</h3>
                      <p className="mt-1.5 max-w-[42ch] text-[16px] leading-[1.6] text-white/70">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="self-center">
              <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <Image
                  src="/resultado/carreras.jpg"
                  alt="El informe en la app: los caminos principales, ordenados por compatibilidad con el perfil"
                  width={1100}
                  height={721}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mano mt-5 rotate-[-1deg] text-[19px] text-white/70">
                así se ve su informe (con datos de ejemplo)
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Respaldo ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
          <h2 className="titulo max-w-[16ch] text-[clamp(2.2rem,5vw,3.8rem)]">Lo revisaron quienes saben.</h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {LO_QUE_DICEN.map((c) => (
              <li key={c.quien} className="flex flex-col border-t-2 border-[var(--tinta)] pt-6">
                <blockquote className="flex-1 text-[22px] font-semibold leading-[1.35] tracking-[-0.015em]">
                  <Marcado texto={c.texto} />
                </blockquote>
                <p className="mt-6 text-[15px] font-bold">{c.quien}</p>
                <p className="text-[14px] text-[var(--grafito)]">{c.rol}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 grid gap-6 rounded-[22px] bg-[var(--mar)] p-7 sm:p-10 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-10">
            <p className="titulo text-[26px] sm:text-[30px]">Lo que no vas a ver: sus respuestas.</p>
            <p className="max-w-[58ch] text-[17px] leading-[1.6] text-[var(--grafito)]">
              Te contamos cómo avanza y cuándo está listo el informe. Lo que responde es suyo: sin esa
              garantía nadie contesta con sinceridad, y un informe hecho con respuestas de compromiso no
              le sirve a nadie.
            </p>
          </div>
        </section>

        {/* ── El formulario ────────────────────────────────────────────── */}
        <section id="anotalo" className="relative scroll-mt-16 overflow-hidden bg-[var(--tinta)] text-white">
          <div className="carta-fondo pointer-events-none absolute inset-0 opacity-40 [--linea:rgba(255,255,255,0.08)]" aria-hidden />
          <div className="relative mx-auto max-w-[1040px] px-4 py-20 sm:px-8 lg:py-28">
            <h2 className="display text-[clamp(2.6rem,7vw,5.2rem)]">Anotalo hoy.</h2>
            <p className="mt-5 max-w-[52ch] text-[19px] leading-[1.55] text-white/70">
              Dejanos tus datos y los de tu hijo. Después elegís: pagar ahora y que entre con todo
              desbloqueado, o que empiece gratis.
            </p>
            <div className="mt-10">
              <Anotalo />
            </div>
          </div>
        </section>

        {/* ── Preguntas ────────────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:py-28">
          <h2 className="titulo text-[clamp(2rem,4.4vw,3.2rem)]">Lo que preguntan los padres</h2>
          <div className="border-b border-[var(--linea)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[var(--linea)]">
                <summary className="flex items-center justify-between gap-6 py-6 text-[19px] font-bold tracking-[-0.01em]">
                  {f.q}
                  <Plus size={22} className="faq-signo shrink-0 text-[var(--rumbo)] transition-transform" aria-hidden />
                </summary>
                <p className="max-w-[62ch] pb-7 text-[17px] leading-[1.65] text-[var(--grafito)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[var(--tinta)] text-white">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <MarcaTimon tono="blanco" linea />
              <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.6] text-white/70">
                Facu, Feli y Nico armamos Timon porque elegir carrera a los 17 sin conocer las opciones
                es elegir a ciegas.
              </p>
            </div>
            <nav aria-label="Pie" className="flex flex-wrap content-start gap-x-8 gap-y-3 text-[15px] font-semibold md:justify-end">
              <a href={URL_EMPEZAR}>Soy estudiante</a>
              <Link href="/colegios">Colegios</Link>
              <Link href="/terminos">Términos y condiciones</Link>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </nav>
          </div>
          <p className="mt-12 border-t border-white/15 pt-6 text-[12.5px] leading-[1.55] text-white/55">
            Timon es una guía para explorar carreras. Su informe lo genera inteligencia artificial a partir
            de lo que se responde. No es una evaluación psicológica ni psicométrica, y no reemplaza a un
            profesional matriculado. Las carreras que aparecen en el informe son caminos para investigar, no
            una indicación de qué estudiar: la decisión es de cada uno. Copyright © {new Date().getFullYear()}{' '}
            Timon. Hecho en Argentina.
          </p>
        </div>
      </footer>
    </div>
  )
}
