import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, CalendarDays, GraduationCap, RefreshCw, Users, type LucideIcon } from 'lucide-react'
import { SiteNav, Wordmark } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { FundadoresFotos } from '@/components/acq/Fundadores'
import { PadresForm } from '@/components/acq/PadresForm'
import { CONTACT_EMAIL } from '@/lib/programa'
import { TOTAL_STOPS } from '@/lib/pricing'

const TITULO = 'Timon para padres: que tu hijo no pierda un año eligiendo mal'
const DESCRIPCION = `Casi 4 de cada 10 ingresantes dejan la carrera en el primer año. Timon conecta a tu hijo con profesionales, universidades y empresas para que elija con información real. ${TOTAL_STOPS} paradas en 2 semanas, desde casa.`

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  openGraph: { title: TITULO, description: DESCRIPCION, locale: 'es_AR', type: 'website' },
}

/**
 * Página para padres (plan con Facu del 11/11/2026). Dos caras:
 *  - el gancho es el miedo: no perder un año (y una cuota) eligiendo mal;
 *  - el valor es la red: Timon no es un test, conecta al chico con gente,
 *    universidades, eventos y empresas.
 *
 *   hero con dato → la red → cómo funciona → formulario → preguntas →
 *   fundadores → cierre
 *
 * Un solo llamado en toda la página: "Quiero que mi hijo lo haga", que lleva
 * al formulario. Sin precio, sin testimonios y sin números de la red que
 * todavía no tenemos.
 */

const FORM_ID = 'anotalo'

function Boton({ className = '', claro = false }: { className?: string; claro?: boolean }) {
  return (
    <a
      href={`#${FORM_ID}`}
      className={`inline-flex w-full max-w-[420px] items-center justify-center rounded-full px-6 py-4 text-center text-[17px] font-bold uppercase leading-tight transition-colors sm:text-[19px] ${
        claro
          ? 'bg-white text-[var(--navy)] hover:bg-white/90'
          : 'bg-[var(--ocean)] text-white hover:bg-[var(--ocean-deep)]'
      } ${className}`}
    >
      Quiero que mi hijo lo haga
    </a>
  )
}

const RED: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: Users,
    titulo: 'Profesionales',
    texto: 'Gente que trabaja de lo que a tu hijo le interesa y le cuenta cómo es su día, sin filtro.',
  },
  {
    icono: GraduationCap,
    titulo: 'Universidades',
    texto: 'El contacto de cada una, visitas, fechas de inscripción y becas, para que no se le pase nada.',
  },
  {
    icono: CalendarDays,
    titulo: 'Eventos',
    texto: 'Charlas y encuentros por área para escuchar a quienes ya están del otro lado.',
  },
  {
    icono: Building2,
    titulo: 'Empresas',
    texto: 'Qué perfiles buscan hoy, para elegir mirando también hacia dónde va el trabajo.',
  },
  {
    icono: RefreshCw,
    titulo: 'Al día',
    texto: 'Lo mantenemos al tanto de lo que va apareciendo: carreras nuevas, fechas y oportunidades.',
  },
]

const PASOS = [
  {
    titulo: 'Lo anotás',
    texto: 'Dejás tus datos y los de tu hijo. Lleva un minuto.',
  },
  {
    titulo: 'Él hace el recorrido',
    texto: `Dos semanas, ${TOTAL_STOPS} paradas de menos de 10 minutos cada una, desde casa y desde el celular. No hay respuestas correctas.`,
  },
  {
    titulo: 'Vos lo acompañás',
    texto: 'Te llega un resumen para acompañarlo, y Timon lo conecta con la red para que siga investigando.',
  },
]

const FAQS: FaqItem[] = [
  {
    q: '¿Es un test vocacional?',
    a: (
      <p>
        No. El recorrido es el punto de partida: ordena sus intereses y su forma de pensar. Lo que
        suma Timon es lo que viene después: la gente, las universidades y las empresas con las que
        lo conecta para que elija con información real.
      </p>
    ),
  },
  {
    q: '¿Qué vas a ver vos?',
    a: (
      <p>
        Te llega un resumen para acompañarlo en la decisión. Sus respuestas quedan entre él y
        Timon: vos ves el resultado, no lo que contestó.
      </p>
    ),
  },
  {
    q: '¿Cuánto cuesta?',
    a: (
      <>
        <p>Puede empezar gratis. Si después quieren el informe completo, hay un pago único: no es una suscripción.</p>
        <p>Si preferís, también podés pagar de entrada y que arranque con todo desbloqueado.</p>
      </>
    ),
  },
  {
    q: '¿Reemplaza a un psicólogo o a una psicopedagoga?',
    a: (
      <p>
        No. Timon es una guía para explorar carreras, no un diagnóstico. Las preguntas pasaron por
        la revisión de psicopedagogas, y la decisión siempre es de tu hijo.
      </p>
    ),
  },
  {
    q: '¿Y si ya terminó el colegio o empezó una carrera?',
    a: (
      <p>
        También le sirve. Si terminó y no sabe qué seguir, o si ya empezó y tiene dudas, el
        recorrido lo ayuda a ver qué va con él antes de perder más tiempo.
      </p>
    ),
  },
]

export default function PadresPage() {
  return (
    <div className="acq flex min-h-full flex-col bg-white">
      <SiteNav cta={{ href: `#${FORM_ID}`, label: 'Quiero que mi hijo lo haga', corto: 'Anotalo' }} />

      <main className="flex-1">
        {/* Hero: el miedo como gancho */}
        <section className="bg-[var(--navy)] px-4 pb-16 pt-14 text-white sm:pb-24 sm:pt-20">
          <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--ocean-light)]">
              Para madres y padres
            </p>
            <h1 className="mt-5 text-[30px] font-extrabold uppercase leading-[1.1] sm:text-[50px]">
              Que tu hijo no pierda un año <span className="whitespace-nowrap">(y una cuota)</span> eligiendo mal
            </h1>
            <p className="mt-6 max-w-[640px] text-[16px] leading-[1.6] text-white/85 sm:text-[19px]">
              Timon lo ayuda a elegir con información real: un programa de 2 semanas, desde casa,
              con {TOTAL_STOPS} paradas de menos de 10 minutos. Y a vos te llega un resumen para
              acompañarlo.
            </p>
            <Boton className="mt-9" />

            <figure className="mt-14 w-full max-w-[640px] rounded-xl border border-white/15 bg-white/[0.04] px-6 py-7">
              <p className="text-[56px] font-extrabold leading-none text-white sm:text-[72px]">38,1%</p>
              <p className="mt-3 text-[17px] font-semibold leading-snug sm:text-[19px]">
                Casi 4 de cada 10 ingresantes abandonan la carrera en el primer año.
              </p>
              <figcaption className="mt-4 text-[12px] leading-snug text-white/60">
                Abandono en el primer año, cohorte 2019. Fuente: Secretaría de Políticas
                Universitarias (SPU), publicado por iProfesional.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* La red como valor central */}
        <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-[26px] font-extrabold uppercase leading-tight sm:text-[36px]">
                Timon no es un test. <span className="text-[var(--ocean)]">Es una comunidad.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.6] text-[var(--hueso)] sm:text-[18px]">
                Nadie conoce todas las opciones a los 17 años. Por eso Timon no termina en un
                resultado: conecta a tu hijo con una red de psicólogos, colegios y profesionales
                para que elija mirando el mundo real.
              </p>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RED.map((r) => (
                <li key={r.titulo} className="rounded-sm bg-[#EFEFEF] px-6 py-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy)]">
                    <r.icono size={20} className="text-white" />
                  </span>
                  <h3 className="mt-5 text-[19px] font-extrabold leading-tight">{r.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">{r.texto}</p>
                </li>
              ))}
              <li className="rounded-sm border-2 border-dashed border-[var(--ocean)] bg-[var(--ocean-wash)] px-6 py-7">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[var(--ocean-deep)]">
                  Con respaldo
                </p>
                <h3 className="mt-3 text-[19px] font-extrabold leading-tight">Psicopedagogas y colegios</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">
                  Las preguntas del recorrido pasaron por la revisión de psicopedagogas, y trabajamos
                  junto a los colegios.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="bg-[#EFEFEF] px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="text-center text-[28px] font-extrabold uppercase leading-tight sm:text-[36px]">
              Cómo funciona
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="rounded-sm bg-white px-6 py-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--navy)] text-[16px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[19px] font-extrabold leading-tight">{p.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Formulario: el único destino de todos los botones */}
        <section id={FORM_ID} className="scroll-mt-16 bg-[var(--navy)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[560px]">
            <h2 className="text-center text-[26px] font-extrabold uppercase leading-tight text-white sm:text-[32px]">
              Elegir bien empieza hoy
            </h2>
            <p className="mx-auto mt-3 max-w-[460px] text-center text-[16px] leading-[1.55] text-white/80">
              Dejanos tus datos y te mostramos cómo sigue: pagar ahora o que empiece gratis.
            </p>
            <div className="mt-8">
              <PadresForm />
            </div>
          </div>
        </section>

        {/* Preguntas */}
        <section className="bg-[var(--cream)] px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[860px]">
            <h2 className="text-center text-[26px] font-bold">Preguntas de padres</h2>
            <div className="mt-6">
              <Faq items={FAQS} variant="home" />
            </div>
          </div>
        </section>

        {/* Fundadores */}
        <section className="bg-white px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-center text-[24px] font-extrabold uppercase sm:text-[26px]">
              Quiénes estamos detrás
            </h2>
            <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start">
              <FundadoresFotos className="w-full max-w-[420px] shrink-0" />
              <div className="space-y-5 text-[16px] leading-[1.6] sm:text-[17px] md:pt-2">
                <p>
                  Facu, Feli y Nico son los fundadores de Timon. Armamos Timon porque elegir carrera
                  a los 17 sin conocer las opciones es elegir a ciegas.
                </p>
                <p>
                  Timon usa los modelos que conocen los profesionales (intereses, inteligencias
                  múltiples y forma de pensar), y la decisión siempre es de tu hijo: nosotros le
                  mostramos el mapa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="bg-[#EFEFEF] px-4 py-20 sm:px-6">
          <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
            <h2 className="text-[28px] font-extrabold uppercase leading-tight sm:text-[36px]">
              Un año perdido cuesta caro. Mejor elegir bien.
            </h2>
            <p className="mt-4 text-[16px] text-[var(--hueso)] sm:text-[18px]">
              Dos semanas, desde casa, y tu hijo elige con información real.
            </p>
            <Boton className="mt-8" />
          </div>
        </section>
      </main>

      {/* Footer mínimo, sin otros llamados */}
      <footer className="bg-[var(--ocean)] px-4 py-12 text-center text-white">
        <div className="flex justify-center">
          <Wordmark />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px]">
          <Link href="/terminos">Términos y condiciones</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <p className="mx-auto mt-6 max-w-[1100px] text-[11px] leading-[1.35] text-white/85">
          Timon es una guía para explorar carreras. Su informe lo genera inteligencia artificial a
          partir de lo que se responde. No es una evaluación psicológica ni psicométrica, y no
          reemplaza a un profesional matriculado. Las carreras del informe son caminos para
          investigar: la decisión es de quien hace el recorrido. Copyright © {new Date().getFullYear()} Timon.
        </p>
      </footer>
    </div>
  )
}
