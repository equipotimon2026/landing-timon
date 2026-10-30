import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Wordmark } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { ReservaForm } from '@/components/acq/ReservaForm'
import { FundadoresFotos } from '@/components/acq/Fundadores'
import { WheelMark } from '@/components/landing/Logo'
import { COHORTE_CUPO, GARANTIA, LUGARES_RESTANTES } from '@/lib/programa'
import { FREE_STOPS, TOTAL_STOPS } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Programa Timon · Elegí tu carrera sabiendo quién sos',
  description: `${TOTAL_STOPS} paradas desde tu casa y un informe con tus carreras, dónde estudiarlas y de qué vas a trabajar. Cohorte fundadora: ${COHORTE_CUPO} lugares.`,
}

/**
 * Calco de acquisition.com/workshop (estudiado sección por sección el
 * 26/10/2026): mismos bloques, en el mismo orden y con el mismo largo de texto.
 *
 *   franja · hero con video · el problema y sus síntomas · las cuatro (dolores)
 *   · qué cubre · el dato · la objeción · fundadores + carta · cohortes · para
 *   quién + reserva · dónde sucede · preguntas · cierre
 *
 * Lo único del workshop que no está: las reseñas, porque todavía no hay
 * testimonios reales (regla del equipo: nada inventado). La oferta sigue la
 * ecuación de valor de Hormozi: resultado (carrera + universidad + trabajo),
 * probabilidad (modelos profesionales, psicopedagogas, garantía), tiempo
 * (2 semanas) y esfuerzo (<10 min por parada, desde casa). Precio: en la
 * llamada con la familia.
 */

const SINTOMAS = [
  'Te preguntan qué vas a estudiar y contestás lo primero que se te ocurre.',
  'Hiciste un test online y te tiró una lista de carreras que no te dice nada.',
  'Te va bien en varias materias, y por eso mismo no sabés por cuál ir.',
  'Sabés qué te gusta, pero no de qué se trabaja ni cuánto se gana.',
  'Tenés una carrera en mente, pero la elegiste por un amigo, una serie o tu familia.',
  'Faltan meses para anotarte y la decisión sigue igual que hace un año.',
]

const CUATRO = [
  {
    n: '01',
    title: 'Quién sos',
    body: 'Sabés qué materias te van bien, pero no qué te mueve. Sin eso, cualquier carrera parece posible y ninguna parece tuya.',
    foto: 'humanidades',
  },
  {
    n: '02',
    title: 'Qué estudiar',
    body: 'Tenés una lista de carreras que "podrían ser". Salieron de lo que viste o escuchaste, no de cómo sos vos.',
    foto: 'tecnologia',
  },
  {
    n: '03',
    title: 'Dónde estudiarla',
    body: 'La misma carrera cambia mucho según la universidad: el plan, el costo, la distancia, las becas. Y eso se mira antes de anotarte, no después.',
    foto: 'arquitectura',
  },
  {
    n: '04',
    title: 'De qué vas a trabajar',
    body: 'Sabés el nombre de la carrera, pero no cómo es un día de trabajo, cuánto se gana ni qué parte de ese trabajo puede automatizarse.',
    foto: 'salud',
  },
]

const CUBRE = [
  'Cómo pensás, qué te mueve y qué te frena, con los modelos que usan los profesionales (Holland, Gardner y Herrmann).',
  'Las carreras más compatibles con vos, y por qué cada una conecta con tu forma de ser.',
  'Lo que nadie te cuenta de cada carrera: lo lindo, lo duro y cuánto se gana con experiencia.',
  'Charlas con profesionales de distintas áreas, para saber cómo es su día a día antes de elegir.',
  'La mirada de tu familia, que responde por un link sin ver nunca tus respuestas.',
  'Las universidades argentinas con match para vos, con costos, ubicación y becas.',
  `Al final, 15 agentes de inteligencia artificial cruzan todo y te dan tu informe en tres actos.`,
]

const MUNDOS_CHIPS = ['Salud', 'Tecnología', 'Negocios', 'Diseño y Arte', 'Ingeniería', 'Derecho']

const FAQS: FaqItem[] = [
  {
    q: '¿Para quién es?',
    a: 'Para alumnos de 4º, 5º y 6º año, y para quienes terminaron el colegio sin saber qué seguir. Si ya sabés qué estudiar y dónde, todavía no es para vos.',
  },
  {
    q: 'Ya sé más o menos qué me gusta. ¿Dos semanas me cambian algo?',
    a: 'Dos semanas no eligen por vos. Lo que hacen es mostrarte por qué te gusta lo que te gusta, qué carreras van con eso y cuáles no, y dónde estudiarlas. Terminás con tu informe, tus carreras más compatibles y las universidades donde se dictan.',
  },
  {
    q: 'No tengo tiempo, estoy con el colegio.',
    a: `Es lo más común, y es justo para lo que está armado: ${TOTAL_STOPS} paradas de menos de 10 minutos, desde el celular, que se guardan solas. Si no tenés diez minutos hoy, el año que viene vas a tener menos.`,
  },
  {
    q: '¿Qué pasa en las 13 paradas?',
    a: 'Respondés en cinco formatos (una charla, situaciones, un espectro, palabras y elecciones entre dos mundos), charlás con profesionales de distintas áreas y tu familia suma su mirada. No hay respuestas correctas. Al final, 15 agentes de inteligencia artificial cruzan todo y arman tu informe.',
  },
  {
    q: '¿Con qué me quedo al final?',
    a: 'Con tu informe en tres actos: cómo pensás y qué te mueve; tus carreras más compatibles, con lo que nadie te dice, sus salidas laborales y cuánto se gana; y las universidades argentinas con match para vos, con costos, ubicación y becas.',
  },
  {
    q: '¿En qué se diferencia de un test vocacional online o de una charla en el colegio?',
    a: 'Un test te da una lista. Una charla te da información general. Timon cruza tus intereses, tu forma de pensar, tu estilo de vida y lo que dice tu familia, y te explica por qué cada carrera conecta con vos. Las preguntas pasaron por la revisión de psicopedagogas.',
  },
  {
    q: '¿Sirve para lo que me gusta a mí?',
    a: 'Sí. El catálogo cubre 16 mundos, de Salud y Tecnología a Arte, Deporte, Derecho o Gastronomía. Si te gusta algo, hay un mundo para eso.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: `Las ${FREE_STOPS} primeras paradas son gratis y no te pedimos datos de pago. El programa completo es un pago único, sin suscripción, y el precio lo hablamos con tu familia en la llamada.`,
  },
  {
    q: '¿Y si no me sirve?',
    a: GARANTIA.larga,
  },
  {
    q: '¿Dónde y cuándo?',
    a: 'Desde tu casa, en el celular o la compu, cuando tengas un rato. Empezás hoy con las paradas gratis y la llamada con tu familia la coordinamos después.',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--ocean-deep)]">{children}</p>
  )
}

function CtaButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#reservar"
      className={`acq-cta-btn inline-block rounded-lg px-12 py-[18px] text-[17px] font-semibold transition ${className}`}
    >
      Reservá tu lugar
    </a>
  )
}

function Foto({ id, className = '' }: { id: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/mapa/${id}.jpg`} alt="" className={`rounded-xl object-cover ${className}`} />
}

/** El saludo real de Timon en la app: ocupa el lugar de la foto del salón. */
function ChatMock() {
  return (
    <div className="rounded-xl bg-[var(--navy)] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
          <WheelMark tone="cream" size={26} />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-white">Timon</p>
          <p className="text-[12px] text-white/60">La Charla · parada 1 de {TOTAL_STOPS}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-[15px] leading-snug text-white">
          Hola, soy Timon. No te voy a decir qué estudiar.
        </p>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-[15px] leading-snug text-white">
          Te voy a ayudar a que lo veas vos.
        </p>
        <p className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-[var(--ocean)] px-4 py-3 text-right text-[15px] text-white">
          Dale, arranquemos
        </p>
      </div>
    </div>
  )
}

export default function ProgramaPage() {
  const lugares = LUGARES_RESTANTES === null ? `${COHORTE_CUPO} lugares` : `quedan ${LUGARES_RESTANTES}`

  return (
    <div className="acq flex min-h-full flex-col bg-[var(--cream)]">
      {/* Franja */}
      <div className="bg-[#070D18] px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px]">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--ocean-light)] align-middle" />
        <span className="text-white">Programa Timon de 2 semanas</span>
        <span className="text-white/50"> · 100% online, desde tu casa · </span>
        <span className="text-white">Cohorte fundadora abierta: {lugares}</span>
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section
          className="px-4 pb-24 pt-8 text-center sm:px-6"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.22), transparent 60%), #0A1222',
          }}
        >
          <Link href="/" className="inline-block" aria-label="Timon, inicio">
            <Wordmark />
          </Link>
          <p className="acq-gradient-text mt-4 text-[40px] font-extrabold leading-[1.05] sm:text-[64px] lg:text-[70px]">
            Alumnos de 4º a 6º año:
          </p>
          <h1 className="mx-auto mt-3 max-w-[760px] text-[24px] font-extrabold leading-tight text-white sm:text-[34px]">
            Elegí tu carrera sabiendo quién sos.
          </h1>

          {/* TODO: video explicativo de Timon (reunión 23/10: elemento central). */}
          <div className="mx-auto mt-6 flex aspect-video w-full max-w-[640px] flex-col items-center justify-center gap-3 rounded-xl bg-[#E9ECF2]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--navy)]">
              <div className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
            </div>
            <p className="text-[13px] font-medium text-[var(--hueso)]">Qué es Timon, en 2 minutos</p>
          </div>

          <CtaButton className="mt-8" />
          <p className="mt-6 text-[13px]">
            <ShieldCheck size={15} className="mr-1 inline align-[-3px] text-[var(--ocean-light)]" />
            <span className="font-semibold text-white">Revisado por psicopedagogas</span>
          </p>
          <p className="mt-1.5 text-[13px] text-white/60">
            {TOTAL_STOPS} paradas · {COHORTE_CUPO} lugares por cohorte
          </p>
          <p className="mx-auto mt-8 max-w-[620px] text-[16px] leading-[1.65] text-white/80 sm:text-[17px]">
            Ya hiciste tests, escuchaste charlas y te preguntaron mil veces qué vas a estudiar.
            Tenés gustos, ideas y opiniones de todos lados. El problema es que ninguna te dice cuál
            es tu carrera. Dos semanas, desde tu casa, para entender quién sos y elegir con eso.
          </p>
        </section>

        {/* El problema */}
        <section className="bg-[var(--cream)] px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <ChatMock />
              <h2 className="mt-8 text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[52px]">
                Te gustan muchas cosas. Ese es el problema.
              </h2>
            </div>
            <div className="md:pt-14">
              <p className="text-[17px] text-[var(--hueso)]">Síntomas típicos:</p>
              <ul className="mt-5 space-y-4 border-l-2 border-[var(--border-cream-strong)] pl-5">
                {SINTOMAS.map((s) => (
                  <li key={s} className="text-[16px] leading-[1.6] text-[var(--hueso)]">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[17px] font-semibold leading-[1.6]">
                No son seis problemas distintos. Es lo que pasa cuando intentás elegir una carrera
                antes de entenderte. Se resuelve contestando cuatro preguntas, en orden, y sabiendo
                cuál te falta. Para eso son estas dos semanas.
              </p>
            </div>
          </div>
        </section>

        {/* Las cuatro preguntas */}
        <section className="bg-[var(--cream-deep)] px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>Las cuatro preguntas</Eyebrow>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[46px]">
                Elegir una carrera es contestar cuatro preguntas.
              </h2>
              <p className="mt-5 text-[16px] text-[var(--hueso)]">
                Las trabajamos con vos, una por una, y te decimos cuál te falta contestar.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {CUATRO.map((c) => (
                  <Foto key={c.foto} id={c.foto} className="aspect-[9/16] w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              {CUATRO.map((c) => (
                <div key={c.n} className="rounded-xl border border-[var(--border-cream)] bg-white p-8">
                  <p className="text-[28px] font-semibold leading-none text-[var(--ocean-deep)]">{c.n}</p>
                  <p className="mt-2 text-[14px] font-semibold uppercase tracking-[0.08em]">{c.title}</p>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--hueso)]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué cubre */}
        <section className="bg-[var(--cream)] px-4 pt-24 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[48px]">
                Lo que cubren las {TOTAL_STOPS} paradas
              </h2>
              <ul className="mt-8 space-y-4">
                {CUBRE.map((c) => (
                  <li key={c} className="flex gap-3 text-[16px] leading-[1.6] text-[var(--hueso)]">
                    <span className="font-bold text-[var(--ocean-deep)]">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['negocios', 'comunicacion', 'ecologia', 'ingenieria'].map((id) => (
                <Foto key={id} id={id} className="aspect-[4/3] w-full" />
              ))}
            </div>
          </div>
        </section>

        {/* El dato */}
        <section className="bg-[var(--cream)] px-4 pb-14 pt-20 sm:px-6">
          <div className="mx-auto max-w-[840px] text-center">
            <h2 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[32px]">
              4 de cada 10 estudiantes deja o cambia de carrera después del primer año.
            </h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-[var(--hueso)] sm:text-[17px]">
              Vos todavía no te anotaste. Dos semanas de paradas cortas, desde tu casa, para llegar
              a esa decisión sabiendo quién sos, qué carreras van con vos, dónde estudiarlas y de
              qué vas a trabajar. Antes de anotarte, no después.
            </p>
            <p className="mt-3 text-[11px] text-[var(--hueso-soft)]">
              Fuente: UCES (2021) y Secretaría de Políticas Universitarias.
            </p>
          </div>
        </section>

        {/* La objeción */}
        <section className="bg-[var(--cream-deep)] px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-[1040px] items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>&ldquo;Todavía falta, lo veo el año que viene&rdquo;</Eyebrow>
              <h2 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[32px]">
                El año que viene vas a tener menos tiempo, no más.
              </h2>
              <p className="mt-3 text-[16px] leading-[1.65] text-[var(--hueso)] sm:text-[17px]">
                Sexto se llena de pruebas, viaje de egresados y fechas de inscripción. Es un motivo
                real, y es justo lo que el programa resuelve: diez minutos por día ahora, para no
                decidir apurado después. Si hoy no tenés diez minutos, en sexto vas a tener menos.
              </p>
            </div>
            <Foto id="deporte" className="aspect-[4/3] w-full" />
          </div>
        </section>

        {/* Fundadores y carta */}
        <section
          className="px-4 pb-20 pt-16 sm:px-6"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.18), transparent 55%), #0A1222' }}
        >
          <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2">
            <FundadoresFotos tone="dark" />
            <div>
              <h2 className="text-[34px] font-semibold text-white sm:text-[44px]">Los fundadores</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-[#BEBEBE]">
                <p>
                  Facu, Feli y Nico son los fundadores de Timon. Armaron un recorrido de{' '}
                  {TOTAL_STOPS} paradas que pasó por la revisión de psicopedagogas, sobre los
                  modelos que usan los profesionales: Holland, inteligencias múltiples de Gardner y
                  dominancia cerebral de Herrmann.
                </p>
                <p>
                  Detrás de cada informe trabaja un equipo de 15 agentes de inteligencia artificial
                  que cruza todo lo que respondiste: tus intereses, tu forma de pensar, tu estilo de
                  vida y lo que dice tu familia. El catálogo cubre 16 mundos y las universidades
                  argentinas donde se estudia cada carrera.
                </p>
                <p>La misión es que nadie elija qué estudiar sin haberse entendido primero.</p>
              </div>
            </div>
          </div>

          {/* BORRADOR: carta para que Facu, Feli y Nico la reescriban con su voz. */}
          <div className="mx-auto mt-14 max-w-[760px] rounded-xl bg-white p-8 sm:p-10">
            <div className="space-y-5 text-[16px] leading-[1.7] text-[#2A2F3A] sm:text-[17px]">
              <p>
                Cuando alguien no sabe qué estudiar, casi nunca le falta información. Le sobra. Lo
                que le falta es saber cuál de todas esas opciones va con quien es. Por eso no te
                vamos a dar cincuenta carreras para mirar: te vamos a ayudar a ver cuál es la tuya.
              </p>
              <p>
                Pensá en alguien a quien le gustan la biología y la tecnología. Puede ir a medicina,
                a bioingeniería o a bioinformática. Son tres vidas muy distintas. Lo que define cuál
                no es la materia: es si disfruta más del paciente, del laboratorio o de la pantalla.
              </p>
              <p>
                O alguien a quien &ldquo;le gusta todo&rdquo;. Su problema no es la falta de
                interés: es que nunca se preguntó qué tienen en común las cosas que le gustan. Cuando
                lo ve, la lista se achica sola.
              </p>
              <p>
                Distintos chicos, la misma jugada: primero entenderte, después elegir. Esa es toda
                la idea. Y es la razón por la que existe este programa.
              </p>
            </div>
            <p className="acq-firma mt-6 text-[22px] text-[var(--navy)]">Facu, Feli y Nico</p>
          </div>
        </section>

        {/* Cohortes */}
        <section className="bg-[var(--cream)] px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <h2 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] sm:text-[44px]">
              Cohortes del Programa Timon
            </h2>
            <p className="mx-auto mt-2 max-w-[560px] text-[15px] text-[var(--hueso)]">
              Cada cohorte tiene {COHORTE_CUPO} lugares porque a cada familia la llamamos nosotros.
              El precio lo hablamos en esa llamada. Esto es lo que está abierto ahora:
            </p>
            <div className="mx-auto mt-10 grid max-w-[520px] grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--ocean-deep)] bg-white px-4 py-6">
                <p className="text-[20px] font-semibold sm:text-[22px]">Fundadora</p>
                <span className="mt-3 inline-block rounded-full border border-[var(--ocean-deep)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--ocean-deep)]">
                  {LUGARES_RESTANTES === null ? 'Abierta' : `${LUGARES_RESTANTES} lugares`}
                </span>
              </div>
              <div className="rounded-xl border border-[var(--border-cream)] bg-white/50 px-4 py-6 text-[var(--hueso-soft)]">
                <p className="text-[20px] font-semibold sm:text-[22px]">Cohorte 2</p>
                <span className="mt-3 inline-block rounded-full border border-[var(--border-cream-strong)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em]">
                  Al llenarse la 1
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Para quién + reserva */}
        <section id="reservar" className="scroll-mt-4 bg-[var(--cream-deep)] px-4 py-24 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>El Programa Timon</Eyebrow>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[48px]">
                Chicos en tu momento, con dudas como las tuyas
              </h2>
              <p className="mt-6 text-[16px] leading-[1.7] text-[var(--hueso)]">
                Es para alumnos de 4º, 5º y 6º año y para quienes terminaron sin saber qué seguir. Si
                ya sabés qué estudiar y dónde, todavía no es para vos.
              </p>
              <p className="mt-3 text-[16px] leading-[1.7] text-[var(--hueso)]">
                El recorrido sirve te guste lo que te guste, y se arma distinto según tu momento:
                si estás en el colegio, si terminaste o si te querés cambiar de carrera.
              </p>
              <div className="mt-8 grid max-w-[480px] grid-cols-3 gap-3">
                {MUNDOS_CHIPS.map((m) => (
                  <div
                    key={m}
                    className="flex items-center justify-center rounded-lg border border-[var(--border-cream)] bg-white px-2 py-3.5 text-center text-[13px] font-medium leading-tight sm:text-[14px]"
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
            <ReservaForm />
          </div>
        </section>

        {/* Dónde sucede */}
        <section className="bg-[var(--cream)] px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-[1040px] items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-[28px] font-extrabold tracking-[-0.02em] sm:text-[32px]">Dónde sucede</h2>
              <p className="mt-2 text-[16px] leading-[1.65] text-[var(--hueso)] sm:text-[17px]">
                Dos semanas, desde tu casa, en el celular o la compu. {TOTAL_STOPS} paradas, una por
                día, y una llamada con uno de los fundadores.
              </p>
            </div>
            <ChatMock />
          </div>
        </section>

        {/* Preguntas */}
        <section className="bg-[var(--cream)] px-4 pb-16 pt-10 sm:px-6">
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[42px]">
              Lo que preguntan los chicos antes de empezar
            </h2>
            <div className="mt-8">
              <Faq items={FAQS} variant="workshop" />
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section
          className="px-4 py-24 text-center sm:px-6"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.2), transparent 55%), #0A1222' }}
        >
          <h2 className="mx-auto max-w-[900px] text-[30px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[46px]">
            ¿Listo para elegir tu carrera sabiendo quién sos?
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#BEBEBE] sm:text-[17px]">
            Dos semanas, desde tu casa.
            <br />
            {COHORTE_CUPO} lugares en la cohorte fundadora.
          </p>
          <CtaButton className="mt-10" />
          <p className="mx-auto mt-16 max-w-[760px] text-[11px] leading-[1.5] text-white/40">
            {GARANTIA.corta} Timon es una herramienta de exploración vocacional: no es un
            diagnóstico psicológico ni reemplaza a un profesional matriculado. Los resultados
            dependen de tus respuestas.{' '}
            <Link href="/terminos" className="underline">
              Términos y condiciones
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}
