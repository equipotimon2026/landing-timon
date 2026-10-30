import Link from 'next/link'
import { Compass, Footprints, School } from 'lucide-react'
import { AnnouncementBar, SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { ReportCover } from '@/components/acq/ReportCover'
import { WheelMark } from '@/components/landing/Logo'
import { COHORTE_CUPO, urlRegistro } from '@/lib/programa'
import { FREE_STOPS, TOTAL_STOPS } from '@/lib/pricing'

/**
 * Home calcada de acquisition.com (reunión con Feli del 23/10/2026): mismas
 * secciones, en el mismo orden y con la misma cantidad de texto.
 *
 *   anuncio → navbar → pregunta gigante + un botón → 4 números →
 *   lead magnet → recursos gratis (4 tarjetas) → preguntas → fundadores → footer
 *
 * Sin precios (el precio asusta al chico, no al padre) y sin "orientación
 * vocacional". Todos los números salen del producto, no de métricas de uso.
 */

const STATS = [
  { value: String(TOTAL_STOPS), label: 'Paradas cortas' },
  { value: '<10', label: 'Minutos por parada' },
  { value: '15', label: 'Agentes de IA te analizan' },
  { value: String(COHORTE_CUPO), label: 'Lugares en la cohorte' },
]

const RECURSOS = [
  {
    tag: 'Nuevo',
    title: 'Reporte de carreras nuevas',
    href: '/reporte',
    cta: 'Quiero el reporte',
    visual: <ReportCover className="w-[120px]" />,
  },
  {
    tag: 'Es gratis',
    title: `Las ${FREE_STOPS} primeras paradas`,
    href: urlRegistro(),
    cta: 'Empezar gratis',
    visual: <Footprints size={64} strokeWidth={1.6} className="text-[var(--terra)]" />,
  },
  {
    tag: 'Instituciones',
    title: 'Timon en tu colegio',
    href: '/colegios',
    cta: 'Conocer más',
    visual: <School size={64} strokeWidth={1.6} className="text-[var(--ocean-light)]" />,
  },
  {
    tag: 'Cupo limitado',
    title: 'Programa Timon',
    href: '/programa',
    cta: 'Ver el programa',
    visual: <Compass size={64} strokeWidth={1.6} className="text-white" />,
  },
]

const FAQS: FaqItem[] = [
  {
    q: '¿Qué es el Programa Timon?',
    a: (
      <>
        <p>No es un test. Es un recorrido. Desde tu casa.</p>
        <p>Cero respuestas correctas. Lo que importa es cómo pensás, qué te mueve y qué te frena.</p>
        <p>
          Primero hacés {TOTAL_STOPS} paradas cortas, de menos de 10 minutos cada una, desde el
          celular o la compu.
        </p>
        <p>Es lo mismo que miran los profesionales: intereses, inteligencias y forma de pensar.</p>
        <p>Después, 15 agentes de inteligencia artificial leen tus respuestas y arman tu informe.</p>
        <p>
          Te quedás con tus carreras más compatibles, las universidades argentinas donde
          estudiarlas y de qué vas a trabajar.
        </p>
      </>
    ),
  },
  {
    q: '¿Cómo me anoto?',
    a: (
      <p>
        Creás tu cuenta y hacés las {FREE_STOPS} primeras paradas gratis. Para seguir, uno de los
        fundadores habla con tu familia. Como esa llamada la hacemos nosotros, la cohorte
        fundadora tiene {COHORTE_CUPO} lugares.{' '}
        <Link href="/programa#reservar" className="font-semibold text-[var(--ocean)] underline">
          Reservá el tuyo acá.
        </Link>
      </p>
    ),
  },
  {
    q: '¿Para quién es?',
    a: (
      <p>
        Para alumnos de 4º, 5º y 6º año, para quienes terminaron el colegio y no saben qué
        seguir, y para quienes ya empezaron una carrera y se quieren cambiar. El recorrido se
        arma distinto según el momento en el que estás.
      </p>
    ),
  },
  {
    q: '¿Quién está detrás?',
    a: (
      <p>
        Los fundadores de Timon. Las preguntas pasaron por la revisión de psicopedagogas, y
        el análisis lo hace un equipo de agentes de inteligencia artificial que cruza todo lo
        que respondiste. Timon no decide por vos ni reemplaza a un profesional: te ordena las
        preguntas para que la decisión sea tuya.
      </p>
    ),
  },
]

export default function Home() {
  return (
    <div className="acq flex min-h-full flex-col bg-white">
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* Hero: una pregunta gigante, una línea de prueba y un solo botón */}
        <section className="relative overflow-hidden bg-[#EFEFEF]">
          <div className="pointer-events-none absolute -left-24 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
            <WheelMark tone="navy" size={420} />
          </div>
          <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
            <WheelMark tone="navy" size={420} />
          </div>
          <div className="relative mx-auto flex max-w-[760px] flex-col items-center px-4 py-20 text-center sm:py-24">
            <h1 className="text-[34px] font-extrabold uppercase leading-[1.12] sm:text-[40px]">
              ¿Ya sabés qué vas a estudiar?
            </h1>
            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.5] sm:text-[18px]">
              Entendete primero: {TOTAL_STOPS} paradas cortas desde tu casa y un informe con tus
              carreras, dónde estudiarlas y de qué vas a trabajar.
            </p>
            <Link
              href="/programa"
              className="mt-9 w-full max-w-[400px] rounded-full bg-[var(--ocean)] px-6 py-4 text-[18px] font-bold uppercase text-white transition-colors hover:bg-[var(--ocean-deep)] sm:text-[20px]"
            >
              Quiero elegir bien
            </Link>
          </div>
        </section>

        {/* Cuatro números con filete a la izquierda */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-[3px] border-[var(--ocean)] pl-4">
                <p className="text-[30px] font-extrabold leading-none sm:text-[38px]">{s.value}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--hueso)] sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lead magnet: la tarjeta del "Scaling Roadmap" */}
        <section className="bg-[#EFEFEF] px-4 py-14 sm:px-6">
          <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-8 rounded-sm bg-white px-6 py-10 shadow-[0_12px_40px_rgba(15,31,54,0.06)] md:flex-row md:justify-center md:gap-14">
            <span className="absolute -top-3 right-6 rounded-sm bg-[var(--rosa)] px-3 py-1 text-[11px] font-bold uppercase italic text-white sm:right-10">
              Recién salido
            </span>
            <div className="flex items-end gap-3">
              <ReportCover className="w-[86px] -rotate-6 opacity-80 sm:w-[110px]" />
              <ReportCover className="w-[120px] sm:w-[150px]" />
              <ReportCover className="w-[86px] rotate-6 opacity-80 sm:w-[110px]" />
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h2 className="text-[20px] font-extrabold uppercase leading-tight sm:text-[24px]">
                Reporte de carreras nuevas por industria
              </h2>
              <Link
                href="/reporte"
                className="mt-5 whitespace-nowrap rounded-full bg-[var(--ocean)] px-6 py-4 text-[14px] font-bold uppercase text-white transition-colors hover:bg-[var(--ocean-deep)] sm:text-[16px]"
              >
                Quiero mi reporte gratis
              </Link>
            </div>
          </div>
        </section>

        {/* Recursos gratis: cuatro tarjetas con etiqueta, tapa y botón */}
        <section className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <div className="mx-auto max-w-[520px] text-center">
              <h2 className="text-[28px] font-extrabold uppercase leading-tight sm:text-[36px]">
                <span className="text-[var(--ocean)]">Gratis</span> para empezar hoy
              </h2>
              <p className="mt-3 text-[14px] text-[var(--hueso)]">
                Reportes, paradas y herramientas para que llegues a la decisión con
                información:
              </p>
              <hr className="mx-auto mt-8 w-full border-[var(--border-cream-strong)]" />
            </div>
            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {RECURSOS.map((r) => (
                <div key={r.title} className="relative flex flex-col items-center text-center">
                  <span className="absolute -top-7 right-6 rounded-sm bg-[var(--rosa)] px-2.5 py-0.5 text-[12px] font-bold text-white">
                    {r.tag}
                  </span>
                  <h3 className="min-h-[52px] text-[18px] font-extrabold uppercase leading-tight sm:text-[20px]">
                    {r.title}
                  </h3>
                  <div className="mt-4 flex h-[210px] w-[210px] items-center justify-center rounded-full bg-[var(--navy)]">
                    {r.visual}
                  </div>
                  <Link
                    href={r.href}
                    className="mt-6 w-full max-w-[250px] rounded-full bg-[var(--ocean)] px-5 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[var(--ocean-deep)]"
                  >
                    {r.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preguntas */}
        <section className="bg-[var(--cream)] px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[860px]">
            <h2 className="text-center text-[26px] font-bold">Preguntas</h2>
            <div className="mt-6">
              <Faq items={FAQS} variant="home" />
            </div>
          </div>
        </section>

        {/* Fundadores */}
        <section id="nosotros" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-center text-[24px] font-extrabold uppercase sm:text-[26px]">
              Sobre los fundadores
            </h2>
            <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start">
              {/* TODO: foto de Facu, Feli y Nico. Hasta tenerla va el timón. */}
              <div className="flex h-[306px] w-[306px] shrink-0 items-center justify-center border-[6px] border-[var(--navy)] bg-[var(--navy)]">
                <WheelMark tone="terra" size={150} />
              </div>
              <div className="space-y-5 text-[16px] leading-[1.6] sm:text-[17px]">
                <p>
                  Facu, Feli y Nico son los fundadores de Timon. Lo armaron sobre una idea
                  que está en todo el producto: el primer paso no es elegir, es entenderte.
                  Antes de decidir qué estudiar, tenés que saber quién sos.
                </p>
                <p>
                  Timon es un recorrido de {TOTAL_STOPS} paradas que pasó por la revisión de
                  psicopedagogas. Usa los modelos que conocen los profesionales (Holland,
                  inteligencias múltiples y dominancia cerebral) y un equipo de 15 agentes de
                  inteligencia artificial que cruza todo lo que respondés.
                </p>
                <p>
                  La misión es simple: que nadie elija qué estudiar sin haberse entendido
                  primero. Por eso, a las familias de la cohorte fundadora las llaman ellos
                  mismos, una por una.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
