import type { Metadata } from 'next'
import Link from 'next/link'
import { CapturasCollage, type Captura } from '@/components/acq/Prueba'
import { FaqBarras, type Barra } from '@/components/acq/FaqBarras'
import { ReservaForm } from '@/components/acq/ReservaForm'
import { Wordmark } from '@/components/acq/SiteChrome'
import { BONOS, COHORTE_CUPO, CONTACT_EMAIL, GARANTIA, OFERTA } from '@/lib/programa'
import { MapaCover } from '@/components/acq/MapaCover'
import { fmtArs } from '@/lib/pricing'
import { FREE_STOPS, TOTAL_STOPS } from '@/lib/pricing'
import { ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: `${OFERTA.nombre} · Programa Timon`,
  description: `Un programa de 14 días, desde tu casa: ${TOTAL_STOPS} paradas y un informe personalizado con tus carreras, dónde estudiarlas y de qué vas a trabajar.`,
}

/**
 * Calco de acquisition.com/o-vegas (la página del workshop que ve Nico,
 * 26/10/2026), bloque por bloque y con el mismo largo:
 *
 *   franja · hero con pregunta + video · una línea + botón · "lo que dicen"
 *   (video de alumno + capturas resaltadas) · banda rasgada "lo que te llevás"
 *   · 3 columnas · botón · más capturas · formulario · 4 preguntas en barras
 *   · botón · footer mínimo
 *
 * Colores de Timon: su violeta es el océano, su azul noche es el navy.
 */

const PRUEBA_1: Captura[] = [
  {
    estilo: 'whatsapp',
    autor: 'Mamá de un alumno de 5º',
    detalle: 'en línea',
    texto: 'Hola! Les quería agradecer. Mi hijo arrancó sin tener idea de qué estudiar y ==ahora tiene clarísimo para dónde ir==. Gracias!!',
    ejemplo: true,
  },
  {
    estilo: 'resena',
    autor: 'Alumna de 6º año',
    detalle: 'Hizo el recorrido completo',
    texto: 'Tenía mil dudas y ==por primera vez siento que sé qué quiero estudiar==. Lo de hablar con profesionales me re sirvió para ver cómo es de verdad cada carrera.',
    ejemplo: true,
  },
  {
    estilo: 'whatsapp',
    autor: 'Alumno de 5º año',
    detalle: 'en línea',
    texto: '==Lo mejor fue hablar con profesionales== de las carreras que me gustaban. Me ayudó un montón a decidir',
    ejemplo: true,
  },
]

const PRUEBA_2: Captura[] = [
  {
    estilo: 'resena',
    autor: 'Alumno de 6º año',
    detalle: 'Hizo el recorrido completo',
    texto: 'No sabía nada de carreras. ==Ahora sé qué estudiar y dónde==, y entiendo por qué va conmigo.',
    ejemplo: true,
  },
  {
    estilo: 'nota',
    autor: 'Psicopedagoga',
    detalle: 'Evaluó Timon antes del lanzamiento',
    texto: '==Es una visión integral, no un simple test.==',
    ejemplo: false,
  },
  {
    estilo: 'whatsapp',
    autor: 'Papá de una alumna de 6º',
    detalle: 'en línea',
    texto: 'Ella llegó con muchas dudas. ==Le ayudó muchísimo==, ahora está entusiasmada con la carrera que eligió',
    ejemplo: true,
  },
]

const OBTENES = [
  {
    n: '#1: Tu Mapa Personal de Carreras',
    foto: 'oferta-informe',
    texto: (
      <>
        Tus carreras más compatibles, <strong>por qué van con vos</strong>, dónde estudiarlas y cuánto
        se gana con experiencia.
      </>
    ),
  },
  {
    n: '#2: Charlas con Profesionales',
    foto: 'oferta-profesional',
    texto: (
      <>
        Hablás con profesionales de 16 áreas para ver <strong>cómo es un día de trabajo real</strong>{' '}
        antes de elegir.
      </>
    ),
  },
  {
    // Mentoría de pares: un estudiante universitario de la carrera que más te
    // interesa. Requiere que el equipo arme la red de estudiantes antes de abrir.
    n: '#3: Charla 1 a 1 con un Estudiante de tu Carrera',
    foto: 'oferta-estudiante',
    texto: (
      <>
        Te conectamos con alguien que ya la estudia para que te cuente <strong>cómo es cursarla de
        verdad</strong>.
      </>
    ),
  },
]

const PREGUNTAS: Barra[] = [
  {
    q: '¿Qué pasa durante los 14 días?',
    lineas: [
      'No es un test. Es un recorrido. Desde tu casa.',
      'Cero respuestas correctas. Lo que importa es cómo pensás.',
      `Primero hacés ${TOTAL_STOPS} paradas cortas, de menos de 10 minutos, desde el celular.`,
      'Es lo mismo que miran los profesionales: intereses, inteligencias y forma de pensar.',
      'Después hablás con profesionales y tu familia suma su mirada.',
      'Al final, 15 agentes de inteligencia artificial cruzan todo y arman tu informe.',
    ],
  },
  {
    q: '¿Con qué me quedo?',
    lineas: [
      'El objetivo: que termines sabiendo qué estudiar.',
      'Tu informe con tus carreras más compatibles, y por qué cada una va con vos.',
      'Las universidades argentinas donde estudiarlas, con costos, ubicación y becas.',
      'Y de qué se trabaja en cada una, y cuánto se gana con experiencia.',
      'Tu familia también recibe el informe, pero nunca ve tus respuestas.',
    ],
  },
  {
    q: '¿Es para mí?',
    lineas: [
      <span key="ano">
        Año: si estás en 4º, 5º o 6º, o terminaste y no sabés qué seguir, <strong>es para vos</strong>.
      </span>,
      <span key="no">
        Si ya sabés qué estudiar y dónde, <strong>no</strong> es para vos (todavía).
      </span>,
      'Mundos: el recorrido cubre los 16 mundos de carreras. Salud, Tecnología, Negocios, Ingeniería, Diseño y Arte, Derecho, Educación, Comunicación, Deporte, Ambiente y más.',
      'Si te gusta algo, hay un mundo para eso.',
    ],
  },
  {
    q: '¿Cuánto cuesta?',
    lineas: [
      `Las ${FREE_STOPS} primeras paradas son gratis.`,
      'El precio del programa lo hablamos con tu familia en una llamada. Esto nos permite:',
      '1) conocer a cada familia (llamamos nosotros, los fundadores)',
      `2) acompañar de cerca a los primeros ${COHORTE_CUPO} alumnos`,
      `Los bonos son solo para los primeros ${COHORTE_CUPO} alumnos: cuando se llenan los lugares, se terminan.`,
      GARANTIA.corta,
    ],
  },
]

function Boton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#reservar"
      className={`mx-auto block w-full max-w-[440px] rounded-lg bg-[var(--ocean)] px-6 py-6 text-center text-[20px] font-bold uppercase leading-none text-white transition-colors hover:bg-[var(--ocean-deep)] sm:text-[24px] ${className}`}
    >
      Quiero elegir bien
    </a>
  )
}

/** Borde de papel rasgado, arriba o abajo de la banda oscura. */
function Rasgado({ abajo = false }: { abajo?: boolean }) {
  const puntos = Array.from({ length: 61 }, (_, i) => {
    const x = (i / 60) * 100
    const y = 6 + ((i * 37) % 11) * 0.7 + (i % 3 === 0 ? 3 : 0)
    return `${x.toFixed(2)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className={`block h-5 w-full text-[#222] ${abajo ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <polygon points={`0,20 ${puntos} 100,20`} fill="currentColor" />
    </svg>
  )
}

const PAPEL = {
  backgroundColor: '#F2F2F0',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
}

export default function ProgramaPage() {
  return (
    <div className="acq flex min-h-full flex-col bg-white">
      {/* Franja */}
      <div className="flex justify-center bg-black px-4 py-4">
        <span className="inline-flex items-center gap-1.5 rounded bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[var(--navy)] sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <strong className="font-black">Programa</strong> online de 14 días | desde tu casa
        </span>
      </div>

      <main className="flex-1">
        {/* Hero: pregunta, subtítulo y el video montado sobre el borde */}
        <section className="bg-[var(--navy)] px-4 pt-16 text-center text-white sm:pt-24">
          <h1 className="mx-auto max-w-[1110px] text-[34px] font-extrabold uppercase leading-[1.08] sm:text-[64px]">
            ¿Estás eligiendo tu carrera a ciegas?
          </h1>
          <h2 className="mx-auto mt-6 max-w-[1110px] text-[22px] font-normal leading-[1.3] sm:text-[40px]">
            Sumate a &ldquo;{OFERTA.nombre}&rdquo; - {OFERTA.promesa}
          </h2>
          {/* TODO: video explicativo de Timon. */}
          <div className="relative z-10 mx-auto mt-6 -mb-28 flex aspect-video w-full max-w-[660px] flex-col items-center justify-center gap-3 bg-[#0A1222] shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:-mb-44">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ocean)]">
              <div className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
            </div>
            <p className="text-[14px] font-semibold text-white/80">Qué es Timon, en 2 minutos</p>
          </div>
        </section>

        <section className="px-4 pb-20 pt-36 text-center sm:pt-56">
          <p className="mx-auto max-w-[950px] text-[18px] leading-[1.35] sm:text-[24px]">
            Un programa de 14 días, desde tu casa y con 10 minutos por día, para que termines sabiendo{' '}
            <strong>qué estudiar, dónde y de qué vas a trabajar</strong>. Si no te sirve, te devolvemos
            el 100%.
          </p>
          <Boton className="mt-10" />
        </section>

        {/* Lo que dicen */}
        <section className="px-3 pb-6 sm:px-5">
          <div className="rounded-[28px] px-4 pb-16 pt-12 sm:px-8" style={PAPEL}>
            <h2 className="text-center text-[26px] font-bold sm:text-[32px]">Lo que dicen los que ya lo hicieron:</h2>
            {/* TODO: video vertical de un alumno contando su experiencia. */}
            <div className="mx-auto mt-6 flex aspect-[3/4] w-full max-w-[450px] flex-col items-center justify-center gap-3 bg-black">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
              </div>
              <p className="text-[13px] text-white/70">Video de un alumno</p>
            </div>
            <div className="mt-6">
              <CapturasCollage capturas={PRUEBA_1} />
            </div>
            <p className="mx-auto mt-8 max-w-[560px] -rotate-1 text-center text-[13px] leading-[1.35] text-[#222] sm:text-[15px]">
              Las experiencias individuales presentadas acá pueden no ser típicas. Lo que cada alumno se
              lleva depende de sus respuestas y de cuánto se comprometa con el proceso.
            </p>
          </div>
        </section>

        {/* Lo que te llevás */}
        <section className="px-3 sm:px-5">
          <div className="text-[#222]">
            <Rasgado />
            <div className="bg-[#222] px-4 py-6 text-center">
              <h2 className="text-[26px] font-bold leading-tight text-white sm:text-[41px]">
                Lo que te llevás en <u className="underline-offset-[6px]">14 días</u>:
              </h2>
            </div>
            <Rasgado abajo />
          </div>
        </section>

        <section className="px-4 pb-16 pt-20 sm:px-6">
          <div className="mx-auto grid max-w-[1186px] gap-12 md:grid-cols-3 md:gap-6">
            {OBTENES.map((o) => (
              <div key={o.n} className="text-center">
                <h3 className="mx-auto max-w-[260px] text-[20px] font-bold leading-[1.6] md:min-h-[64px]">{o.n}</h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/programa/${o.foto}.jpg`} alt="" className="mt-6 aspect-[3/2] w-full rounded-xl object-cover" />
                <p className="mx-auto mt-6 max-w-[379px] text-[16px] leading-[1.5] tracking-[0.02em]">{o.texto}</p>
              </div>
            ))}
          </div>

          {/* Bonos: cada uno contra una objeción */}
          <div className="mx-auto mt-20 max-w-[1186px]">
            <h3 className="text-center text-[24px] font-bold sm:text-[32px]">
              Y si estás entre los primeros 100, sumás:
            </h3>
            <div className="mx-auto mt-10 grid max-w-[800px] gap-5 md:grid-cols-2">
              {BONOS.map((b, i) => (
                <div key={b.id} className="overflow-hidden rounded-xl border-2 border-dashed border-[var(--ocean)] bg-[var(--ocean-wash)]">
                  <div className="flex h-[190px] items-center justify-center bg-[var(--navy)]">
                    {b.id === 'mapa' ? (
                      <MapaCover className="w-[118px]" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/programa/bono-${b.id}.jpg`} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[var(--ocean-deep)]">
                      Bono #{i + 1} · {b.objecion}
                    </p>
                    <p className="mt-2 text-[19px] font-bold leading-snug">{b.titulo}</p>
                    <p className="mt-2 text-[15px] leading-[1.5] text-[var(--hueso)]">{b.texto}</p>
                    {b.valor !== null && (
                      <p className="mt-3 text-[14px] font-bold">
                        Valor: <span className="line-through decoration-2">{fmtArs(b.valor)}</span>{' '}
                        <span className="text-[var(--ocean-deep)]">incluido</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[15px] font-semibold">
              Los bonos son solo para los primeros {COHORTE_CUPO} alumnos. Cuando se llenan, se terminan.
            </p>
          </div>

          {/* Garantía */}
          <div className="mx-auto mt-14 flex max-w-[860px] flex-col items-center gap-6 rounded-2xl bg-[var(--navy)] p-8 text-center text-white sm:flex-row sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[var(--ocean-light)]">
              <ShieldCheck size={44} className="text-[var(--ocean-light)]" />
            </div>
            <div>
              <p className="text-[22px] font-bold">{GARANTIA.nombre}</p>
              <p className="mt-2 text-[16px] leading-[1.55] text-white/80">{GARANTIA.larga}</p>
            </div>
          </div>
          <Boton className="mt-14" />
        </section>

        {/* Más prueba */}
        <section className="px-4 py-16 sm:px-6">
          <CapturasCollage capturas={PRUEBA_2} />
        </section>

        {/* Formulario */}
        <section id="reservar" className="scroll-mt-4 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-[540px]">
            <ReservaForm />
          </div>
        </section>

        {/* Preguntas */}
        <section className="px-4 pb-16 pt-12 sm:px-6">
          <div className="mx-auto max-w-[990px]">
            <FaqBarras items={PREGUNTAS} />
          </div>
          <Boton className="mt-14" />
        </section>
      </main>

      {/* Footer mínimo, como el de la página */}
      <footer className="bg-[var(--ocean)] px-4 py-12 text-center text-white">
        <div className="flex justify-center">
          <Wordmark />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px]">
          <Link href="/terminos">Términos y condiciones</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <p className="mx-auto mt-6 max-w-[1100px] text-[11px] leading-[1.35] text-white/85">
          Timon es una herramienta de exploración vocacional. Sus respuestas las genera inteligencia
          artificial a partir de lo que respondés. No es un diagnóstico psicológico ni una evaluación
          psicométrica, y no reemplaza a un profesional matriculado. Las carreras de tu informe son
          caminos para investigar: la decisión es tuya. Copyright © {new Date().getFullYear()} Timon.
        </p>
      </footer>
    </div>
  )
}
