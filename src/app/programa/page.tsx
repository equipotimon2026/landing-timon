import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Brain,
  Briefcase,
  Check,
  GraduationCap,
  House,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react'
import { SiteFooter, Wordmark } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { ReservaForm } from '@/components/acq/ReservaForm'
import { WheelMark } from '@/components/landing/Logo'
import { COHORTE_CUPO, GARANTIA, LUGARES_RESTANTES, MOMENTOS } from '@/lib/programa'
import { FREE_STOPS, TOTAL_STOPS } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Programa Timon · Sabé qué estudiar en 2 semanas, desde tu casa',
  description: `${TOTAL_STOPS} paradas de menos de 10 minutos y un informe con tus carreras, dónde estudiarlas y de qué vas a trabajar. Cohorte fundadora: ${COHORTE_CUPO} lugares.`,
}

/**
 * Página del programa, calcada de acquisition.com/workshop (reunión con Feli
 * del 23/10/2026). La oferta sigue a Hormozi ($100M Offers):
 *
 * - Resultado soñado: carrera compatible + universidad + salida laboral.
 * - Probabilidad percibida: modelos profesionales, psicopedagogas, garantía.
 * - Tiempo: 2 semanas (13 paradas, una por día).
 * - Esfuerzo: menos de 10 minutos por parada, desde casa, sin presencialidad.
 * - Escasez real: los fundadores llaman a cada familia → 100 lugares.
 *
 * Sin precio en la página: el precio se habla con la familia en la llamada.
 * Sin testimonios hasta que haya reales (regla del equipo: nada inventado).
 */

const SINTOMAS = [
  'Te preguntan qué vas a estudiar y contestás lo primero que se te ocurre.',
  'Hiciste un test online y te devolvió una lista que no te dice nada.',
  'Te gustan varias cosas y no sabés cuál sostendrías cinco años.',
  'Sabés qué te gusta, pero no de qué se trabaja ni cuánto se gana.',
  'No sabés qué universidades la dictan, cuánto cuestan ni si hay becas.',
  'Tu familia opina, tus amigos opinan, y la decisión sigue siendo tuya.',
]

const RESPUESTAS = [
  {
    n: '01',
    title: 'Quién sos',
    body: 'Cómo pensás, qué te mueve y qué te frena. Con los modelos que usan los profesionales: Holland, inteligencias múltiples de Gardner y dominancia cerebral de Herrmann.',
    icon: Brain,
  },
  {
    n: '02',
    title: 'Qué estudiar',
    body: 'Las carreras más compatibles con vos, por qué conectan con tu forma de ser y lo que nadie te cuenta de cada una.',
    icon: BookOpen,
  },
  {
    n: '03',
    title: 'Dónde estudiarla',
    body: 'Universidades argentinas con match para vos: dónde quedan, cuánto cuestan y qué becas tienen.',
    icon: GraduationCap,
  },
  {
    n: '04',
    title: 'De qué vas a trabajar',
    body: 'Las tres salidas principales de cada carrera, cuánto gana alguien senior y qué tan expuesta está a la automatización.',
    icon: Briefcase,
  },
]

const INCLUYE = [
  `Las ${TOTAL_STOPS} paradas, de menos de 10 minutos cada una, desde el celular o la compu. Se guardan solas.`,
  'Cinco formatos de pregunta (La Charla, El Deck, El Espectro, Las Palabras y Los Dos Mundos), así que no es un formulario.',
  'Conversaciones con profesionales de distintas áreas, para saber cómo es su día a día antes de elegir.',
  '"Otras miradas": tu familia responde sobre vos por un link y suma su punto de vista.',
  'Tu análisis: 15 agentes de inteligencia artificial cruzan todas tus respuestas.',
  'Tu informe en tres actos: entenderte, tus caminos y dónde construirlos.',
  'Acceso de tu familia al informe. Nunca a tus respuestas.',
]

const PASOS = [
  { n: 'Paso 1', title: 'Creás tu cuenta', estado: 'Hoy' },
  { n: 'Paso 2', title: `Hacés las ${FREE_STOPS} primeras paradas`, estado: 'Gratis' },
  { n: 'Paso 3', title: 'Hablamos con tu familia', estado: 'Te llamamos' },
  { n: 'Paso 4', title: 'Terminás y recibís tu informe', estado: 'En 2 semanas' },
]

const FAQS: FaqItem[] = [
  {
    q: '¿Para quién es?',
    a: 'Para alumnos de 4º, 5º y 6º año, para quienes terminaron el colegio y no saben qué seguir, y para quienes ya empezaron una carrera y se quieren cambiar. Si ya sabés qué estudiar y dónde, todavía no es para vos.',
  },
  {
    q: '¿Timon me va a decir qué estudiar?',
    a: 'No. Nadie puede decidir eso por vos. Lo que hace Timon es ordenarte las preguntas: primero quién sos, después qué carreras van con eso, dónde estudiarlas y de qué vas a trabajar. La decisión es tuya, pero la tomás con información.',
  },
  {
    q: 'No tengo tiempo, estoy con el colegio.',
    a: `Por eso cada parada dura menos de 10 minutos. Hacés una cuando tenés un rato, desde el celular, y se guarda sola. A una por día, en dos semanas terminaste. Si vas más lento, también está bien: no hay límite de tiempo.`,
  },
  {
    q: '¿Qué hago en las paradas?',
    a: 'Respondés en cinco formatos distintos: una charla, situaciones, posiciones en un espectro, palabras que te representan y elecciones entre dos mundos. No hay respuestas correctas. Además hablás con profesionales de distintas áreas y tu familia puede sumar su mirada.',
  },
  {
    q: '¿Con qué me quedo al final?',
    a: 'Con tu informe en tres actos. Uno: cómo pensás, qué te mueve y qué probablemente no va con vos. Dos: tus carreras más compatibles, con lo que nadie te dice, sus tres salidas principales y cuánto se gana. Tres: universidades argentinas con match, costos, ubicación y becas.',
  },
  {
    q: '¿En qué se diferencia de un test vocacional online?',
    a: 'Un test te devuelve una lista. Timon cruza intereses, inteligencias, forma de pensar, estilo de vida y lo que dice tu familia, y te explica por qué cada carrera conecta con vos. Las preguntas pasaron por la revisión de psicopedagogas.',
  },
  {
    q: '¿Mi colegio o mi familia ven mis respuestas?',
    a: 'No. Tus respuestas son tuyas. Si compartís el informe con tu familia, ven el informe, no lo que respondiste. Tu colegio nunca ve tus respuestas, ni siquiera si entraste con un código del colegio.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: `Las ${FREE_STOPS} primeras paradas son gratis y no te pedimos ningún dato de pago para hacerlas. El programa completo es un pago único, sin suscripción. El precio lo hablamos con tu familia en la llamada.`,
  },
  {
    q: '¿Y si no me sirve?',
    a: GARANTIA.larga,
  },
  {
    q: '¿Reemplaza a un psicopedagogo?',
    a: 'No. Timon es una herramienta de exploración: no es un diagnóstico ni una evaluación psicométrica. Es un complemento. Si querés, podés sumar una reunión con un psicopedagogo dentro del proceso.',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--terra-ink)] sm:text-[13px]">
      {children}
    </p>
  )
}

function GoldCta({ className = '' }: { className?: string }) {
  return (
    <a
      href="#reservar"
      className={`acq-gold-btn inline-block rounded-lg px-12 py-[18px] text-[17px] font-semibold transition ${className}`}
    >
      Reservá tu lugar
    </a>
  )
}

/** Recuadro oscuro con ícono: ocupa el lugar de las fotos del workshop. */
function Tile({
  icon: Icon,
  label,
  className = '',
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl bg-[var(--navy)] p-6 text-center text-white ${className}`}
    >
      <Icon size={40} strokeWidth={1.5} className="text-[var(--terra)]" />
      <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80">
        {label}
      </span>
    </div>
  )
}

/** El saludo real de Timon en la app, en lugar de la foto del salón. */
function ChatMock({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-[var(--navy)] p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
          <WheelMark tone="terra" size={28} />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-white">Timon</p>
          <p className="text-[12px] text-white/60">La Charla · parada 1</p>
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
  const cupo =
    LUGARES_RESTANTES === null
      ? `Cohorte fundadora: ${COHORTE_CUPO} lugares`
      : `Cohorte fundadora: quedan ${LUGARES_RESTANTES} lugares`

  return (
    <div className="acq flex min-h-full flex-col bg-[var(--cream)]">
      {/* Franja superior con la escasez */}
      <div className="bg-black px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white sm:text-[11px]">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--terra)] align-middle" />
        Programa Timon · 100% online · Desde tu casa ·{' '}
        <span className="text-[var(--terra)]">{cupo}</span>
      </div>

      <main className="flex-1">
        {/* Hero oscuro: a quién le hablamos, la promesa, el video y un botón */}
        <section
          className="px-4 pb-20 pt-8 text-center sm:px-6"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.16), transparent 55%), linear-gradient(180deg, #0B1526 0%, #0F1F36 100%)',
          }}
        >
          <Link href="/" className="inline-block" aria-label="Timon, inicio">
            <Wordmark />
          </Link>
          <p className="acq-gradient-text mt-6 text-[40px] font-extrabold leading-[1.05] sm:text-[64px] lg:text-[70px]">
            Alumnos de 4º a 6º año:
          </p>
          <h1 className="mx-auto mt-3 max-w-[760px] text-[24px] font-extrabold leading-tight text-white sm:text-[34px]">
            Sabé qué estudiar en 2 semanas, sin salir de tu casa.
          </h1>

          {/* TODO: video explicativo de Timon (reunión 23/10: elemento central). */}
          <div className="mx-auto mt-8 flex aspect-video w-full max-w-[720px] flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.06]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <div className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
            </div>
            <p className="text-[13px] text-white/60">Qué es Timon, en 2 minutos</p>
          </div>

          <GoldCta className="mt-10" />
          <p className="mt-5 text-[14px] text-[var(--terra)]">
            <ShieldCheck size={15} className="mr-1 inline align-[-2px]" />
            <span className="font-semibold text-white">Revisado por psicopedagogas</span>
          </p>
          <p className="mt-1.5 text-[13px] text-white/60">
            {TOTAL_STOPS} paradas · menos de 10 minutos cada una · {COHORTE_CUPO} lugares
          </p>
          <p className="mx-auto mt-8 max-w-[640px] text-[16px] leading-[1.6] text-white/80 sm:text-[17px]">
            Estás por terminar el colegio y todos te preguntan qué vas a estudiar. Tenés ideas,
            pero ninguna certeza. El Programa Timon te hace entenderte primero: {TOTAL_STOPS}{' '}
            paradas cortas desde tu casa y un informe con tus carreras, dónde estudiarlas y de qué
            vas a trabajar.
          </p>
        </section>

        {/* El problema y sus síntomas */}
        <section className="bg-white px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2">
            <div>
              <ChatMock />
              <h2 className="mt-10 text-[34px] font-semibold leading-[1.1] sm:text-[52px]">
                Te sobran opciones. Te falta saber cuál es tuya.
              </h2>
            </div>
            <div>
              <p className="text-[17px] text-[var(--hueso)]">Síntomas típicos:</p>
              <ul className="mt-5 space-y-4">
                {SINTOMAS.map((s) => (
                  <li
                    key={s}
                    className="border-l-2 border-[var(--border-cream-strong)] pl-4 text-[16px] text-[var(--hueso)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[17px] font-semibold leading-[1.55]">
                No son seis problemas distintos. Es lo que pasa cuando intentás elegir una
                carrera antes de entenderte. Se resuelve en orden: primero quién sos, después qué
                estudiar, dónde y de qué vas a trabajar. Para eso es el programa.
              </p>
            </div>
          </div>
        </section>

        {/* Las cuatro respuestas */}
        <section className="bg-[var(--cream-deep)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>Las cuatro respuestas</Eyebrow>
              <h2 className="mt-3 text-[32px] font-semibold leading-[1.1] sm:text-[46px]">
                Elegir bien depende de cuatro respuestas.
              </h2>
              <p className="mt-5 text-[16px] text-[var(--hueso)]">
                Trabajamos las cuatro con vos y te las dejamos por escrito en tu informe.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Tile icon={Brain} label="Entenderte" className="aspect-[3/4]" />
                <Tile icon={BookOpen} label="Tus caminos" className="aspect-[3/4]" />
                <Tile icon={GraduationCap} label="Dónde" className="aspect-[3/4]" />
                <Tile icon={Briefcase} label="De qué trabajar" className="aspect-[3/4]" />
              </div>
            </div>
            <div className="space-y-4">
              {RESPUESTAS.map((r) => (
                <div key={r.n} className="rounded-2xl bg-white p-7">
                  <p className="text-[28px] font-semibold text-[var(--terra-ink)]">{r.n}</p>
                  <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.06em]">
                    {r.title}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[var(--hueso)]">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué incluye: el stack de la oferta */}
        <section id="incluye" className="scroll-mt-4 bg-[var(--cream)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] items-start gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-[32px] font-semibold leading-[1.1] sm:text-[48px]">
                Qué incluye el programa
              </h2>
              <ul className="mt-8 space-y-5">
                {INCLUYE.map((i) => (
                  <li key={i} className="flex gap-3 text-[16px] text-[var(--hueso)]">
                    <Check size={18} strokeWidth={3} className="mt-1 shrink-0 text-[var(--terra-ink)]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Tile icon={Smartphone} label="Desde el celular" className="aspect-[4/3]" />
              <Tile icon={MessageCircle} label="5 formatos" className="aspect-[4/3]" />
              <Tile icon={Users} label="Otras miradas" className="aspect-[4/3]" />
              <Tile icon={BookOpen} label="Tu informe" className="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* El dato que pone la decisión en perspectiva */}
        <section className="bg-[var(--cream)] px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[24px] font-extrabold leading-tight sm:text-[32px]">
              4 de cada 10 estudiantes deja o cambia de carrera después del primer año.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[var(--hueso)] sm:text-[17px]">
              El programa existe para que te hagas las preguntas difíciles antes de anotarte, no
              después. {TOTAL_STOPS} paradas, una por día, y en dos semanas tenés tu mapa: quién
              sos, qué estudiar, dónde y de qué vas a trabajar.
            </p>
            <p className="mt-3 text-[12px] text-[var(--hueso-soft)]">
              Fuente: UCES (2021) y Secretaría de Políticas Universitarias.
            </p>
          </div>
        </section>

        {/* La objeción principal */}
        <section className="bg-[var(--cream-deep)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1000px] items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>&ldquo;No tengo tiempo, estoy con el colegio&rdquo;</Eyebrow>
              <h2 className="mt-3 text-[26px] font-extrabold leading-tight sm:text-[32px]">
                Por eso cada parada dura menos de diez minutos.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[var(--hueso)] sm:text-[17px]">
                Entre el colegio, las pruebas y todo lo demás, sentarte una hora a pensar tu
                futuro no pasa. Por eso Timon está partido en {TOTAL_STOPS} paradas que hacés
                desde el celular cuando tenés un rato. Se guarda solo: cerrás y la próxima vez
                seguís justo donde estabas.
              </p>
            </div>
            <Tile icon={Smartphone} label="Una parada por día" className="aspect-[4/3]" />
          </div>
        </section>

        {/* Garantía */}
        <section className="bg-white px-4 py-20 sm:px-6">
          <div className="mx-auto flex max-w-[860px] flex-col items-center gap-8 rounded-2xl border-2 border-[var(--terra)] bg-[var(--cream)] p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[var(--navy)]">
              <ShieldCheck size={56} strokeWidth={1.5} className="text-[var(--terra)]" />
            </div>
            <div>
              <Eyebrow>Sin riesgo para tu familia</Eyebrow>
              <h2 className="mt-2 text-[24px] font-extrabold leading-tight sm:text-[30px]">
                {GARANTIA.nombre}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[var(--hueso)]">{GARANTIA.larga}</p>
            </div>
          </div>
        </section>

        {/* Fundadores y carta */}
        <section className="bg-[#0B1526] px-4 pb-24 pt-20 sm:px-6">
          <div className="mx-auto grid max-w-[1000px] items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr]">
            {/* TODO: foto de los fundadores. */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-gradient-to-b from-[#1E2F4D] to-[#9A6206]">
              <WheelMark tone="cream" size={160} />
            </div>
            <div>
              <h2 className="text-[34px] font-semibold text-white sm:text-[44px]">
                Los fundadores
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.65] text-[#BEBEBE]">
                <p>
                  Facu, Feli y Nico fundaron Timon sobre una idea: el primer paso no es elegir,
                  es entenderte. Construyeron un recorrido de {TOTAL_STOPS} paradas que pasó por
                  la revisión de psicopedagogas, con los modelos que usan los profesionales:
                  Holland, inteligencias múltiples y dominancia cerebral.
                </p>
                <p>
                  Detrás de cada informe trabaja un equipo de 15 agentes de inteligencia
                  artificial que cruza todo lo que respondiste: tus intereses, tu forma de pensar,
                  tu estilo de vida y lo que dice tu familia.
                </p>
                <p>
                  La misión es que nadie elija qué estudiar sin haberse entendido primero.
                </p>
              </div>
            </div>
          </div>

          {/* BORRADOR: carta para que Facu y Feli la reescriban con su voz. */}
          <div className="mx-auto mt-14 max-w-[760px] rounded-2xl bg-white p-7 sm:p-10">
            <div className="space-y-5 text-[16px] leading-[1.65] text-[#2A2F3A] sm:text-[17px]">
              <p>
                No te vamos a decir qué estudiar. Nadie puede hacerlo por vos. Lo que sí podemos
                hacer es ordenarte las preguntas: primero quién sos, después qué carreras van
                con eso, dónde estudiarlas y de qué vas a trabajar.
              </p>
              <p>
                A los primeros {COHORTE_CUPO} alumnos los acompañamos nosotros. Cuando terminás
                las paradas gratis, uno de nosotros habla con tu familia. No escala, y lo
                sabemos. Pero queremos escuchar a cada una de las primeras {COHORTE_CUPO}{' '}
                familias.
              </p>
              <p>
                Y si hacés las {TOTAL_STOPS} paradas y tu informe no te sirve, te devolvemos la
                plata. Así de simple. Lo único que te pedimos es que hagas tu parte.
              </p>
            </div>
            <p className="acq-firma mt-6 text-[22px] text-[var(--navy)]">Facu y Feli</p>
          </div>
        </section>

        {/* Escasez: la cohorte fundadora y cómo se entra */}
        <section className="bg-[var(--cream)] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1000px] text-center">
            <h2 className="text-[30px] font-semibold leading-tight sm:text-[44px]">
              Cohorte fundadora: {COHORTE_CUPO} lugares
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[15px] text-[var(--hueso)]">
              Cada familia habla con uno de los fundadores, por eso el cupo es real. Cuando se
              completen los {COHORTE_CUPO} lugares, cerramos la cohorte. Así se entra:
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {PASOS.map((p) => (
                <div
                  key={p.n}
                  className="rounded-2xl border-2 border-[var(--terra)] bg-white px-4 py-6"
                >
                  <span className="rounded-full bg-[var(--terra)] px-3 py-1 text-[10px] font-bold uppercase text-white">
                    {p.n}
                  </span>
                  <p className="mt-4 text-[17px] font-semibold leading-snug sm:text-[20px]">
                    {p.title}
                  </p>
                  <p className="mt-2 text-[12px] font-bold uppercase text-[var(--terra-ink)]">
                    {p.estado}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quién es + formulario de reserva */}
        <section id="reservar" className="scroll-mt-4 bg-[var(--cream-deep)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] items-start gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>El Programa Timon</Eyebrow>
              <h2 className="mt-3 text-[32px] font-semibold leading-[1.1] sm:text-[48px]">
                Para quienes están por elegir, en el momento en que estén
              </h2>
              <p className="mt-6 text-[16px] text-[var(--hueso)]">
                Es para alumnos de 4º, 5º y 6º año, para quienes terminaron y no saben qué
                seguir, y para quienes se quieren cambiar de carrera. Si ya sabés qué estudiar y
                dónde, todavía no es para vos.
              </p>
              <p className="mt-4 text-[16px] text-[var(--hueso)]">
                El recorrido se arma distinto según tu momento, y si sos padre, madre o del
                colegio, también podés empezar desde acá.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {MOMENTOS.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border border-[var(--border-cream-strong)] bg-white px-4 py-4 text-[14px] font-medium"
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            </div>
            <ReservaForm />
          </div>
        </section>

        {/* Dónde sucede */}
        <section className="bg-[var(--cream)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-[1000px] items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-[28px] font-extrabold sm:text-[32px]">Dónde sucede</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[var(--hueso)] sm:text-[17px]">
                En tu casa, o donde estés. Online, desde el celular o la compu. Sin turnos, sin
                traslados y sin sesiones presenciales: lo hacés cuando tenés un rato.
              </p>
            </div>
            <Tile icon={House} label="100% online" className="aspect-[4/3]" />
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className="scroll-mt-4 bg-white px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[760px]">
            <h2 className="text-[30px] font-semibold leading-tight sm:text-[42px]">
              Lo que nos preguntan antes de empezar
            </h2>
            <div className="mt-8">
              <Faq items={FAQS} variant="workshop" />
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="bg-[#0B1526] px-4 py-24 text-center sm:px-6">
          <h2 className="mx-auto max-w-[760px] text-[32px] font-semibold leading-tight text-white sm:text-[46px]">
            ¿Listo para elegir sabiendo quién sos?
          </h2>
          <p className="mt-4 text-[16px] text-[#BEBEBE] sm:text-[17px]">
            {TOTAL_STOPS} paradas desde tu casa. {COHORTE_CUPO} lugares en la cohorte fundadora.
          </p>
          <GoldCta className="mt-10" />
          <p className="mt-4 text-[13px] text-white/60">{GARANTIA.corta}</p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
