import { ArrowRight, MessageCircle } from 'lucide-react'
import { SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { FundadoresFotos } from '@/components/acq/Fundadores'
import { Rueda } from '@/components/landing/Marca'
import {
  AVALES,
  BONO_PAGO_ANTICIPADO,
  CATALOGO,
  LO_QUE_DICEN,
  NUMEROS_PRUEBA,
  PASOS,
  PROGRAMA,
  RESULTADO,
  URL_EMPEZAR,
  URL_PAGAR_AHORA,
  URL_WHATSAPP_PADRE,
  type Aval,
} from '@/lib/landing'

/**
 * Home para familias (29/10/2026). Brief de Feli del 27/10 + prioridades de
 * Nico: freemium, "cómo funciona Timon" y testimonios que den validez. Desde
 * el 30/10 con la marca de la presentación (clase `.marca` en globals.css) y
 * sin video.
 *
 *   hero con un botón → bloque de confianza → cómo funciona →
 *   qué te llevás → para vos y tu familia → preguntas → fundadores → cierre
 *
 * Todo lleva a una sola acción: empezar el recorrido gratis. Sin precio, sin
 * plazo y sin otras propuestas (test, programa, comunidad). El detalle de qué
 * se promete y qué falta confirmar está en `lib/landing.ts`.
 */

const MOSTRAR_EJEMPLOS = process.env.NODE_ENV !== 'production'

const FAQS: FaqItem[] = [
  {
    q: '¿Es gratis?',
    a: (
      <>
        <p>
          Empezás gratis y hacés el recorrido completo sin pagar. Al terminar ves la primera
          parte de tu perfil.
        </p>
        <p>
          Para ver el resto (tu perfil completo, tus 6 carreras y dónde estudiarlas) hay un
          pago único. No es una suscripción.
        </p>
      </>
    ),
  },
  {
    q: '¿Cuánto tiempo lleva?',
    a: (
      <p>
        Hecho de corrido son unas 3 horas, pero no te lo recomendamos: lo que importa es que
        respondas bien, y de corrido cansa. Lo ideal es hacerlo en 3 o 4 etapas, a tu ritmo.
      </p>
    ),
  },
  {
    q: '¿Para quién es?',
    a: (
      <p>
        Para chicos y chicas de 5° y 6° año que todavía no saben qué estudiar, que dudan entre
        varias opciones o que quieren conocer carreras que no tenían en cuenta.
      </p>
    ),
  },
  {
    q: '¿Timon reemplaza a un profesional?',
    a: (
      <p>
        No. Timon es una guía: ordena lo que respondés y te muestra qué carreras van con vos,
        pero la decisión es tuya. Si querés, repasás tu resultado con un profesional.
      </p>
    ),
  },
  {
    q: '¿Qué ve mi familia?',
    a: (
      <p>
        Tu familia puede ver tu informe, pero nunca tus respuestas. Lo que contestás en el
        recorrido queda entre vos y Timon.
      </p>
    ),
  },
]

function BotonEmpezar({ className = '' }: { className?: string }) {
  return (
    <a href={URL_EMPEZAR} className={`boton px-8 py-4 text-[17px] ${className}`}>
      Empezá gratis
    </a>
  )
}

function LinkPagarAhora({ tono = 'oscuro' }: { tono?: 'oscuro' | 'claro' }) {
  return (
    <a
      href={URL_PAGAR_AHORA}
      className={`group mt-4 inline-flex items-center gap-1.5 text-[14px] underline-offset-4 hover:underline ${
        tono === 'oscuro' ? 'text-[var(--m-suave)]' : 'text-white/75'
      }`}
    >
      ¿Ya lo decidieron? Pagá ahora y sumá {BONO_PAGO_ANTICIPADO.corto}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

function TarjetaAval({ a }: { a: Aval }) {
  return (
    <figure className="tarjeta relative flex flex-col px-6 py-7">
      {a.ejemplo && (
        <span className="absolute -right-2 -top-2 rounded bg-[#E11D48] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
          Ejemplo
        </span>
      )}
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[var(--m-azul)]">
        {a.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.imagen} alt="" className="h-9 w-9 rounded-full bg-white object-contain p-0.5" />
        ) : (
          <span className="text-[18px] font-medium text-white">{a.quien[0]}</span>
        )}
      </div>
      <blockquote className="mt-5 flex-1 text-[18px] font-light leading-snug text-[var(--m-navy)]">
        {a.textual ? <>&ldquo;{a.frase}&rdquo;</> : a.frase}
      </blockquote>
      <figcaption className="mt-5">
        <span className="block text-[14px] font-semibold text-[var(--m-navy)]">{a.quien}</span>
        <span className="block text-[13px] text-[var(--m-suave)]">{a.rol}</span>
      </figcaption>
    </figure>
  )
}

/** Texto con las partes entre ==dobles iguales== en negrita con resaltador. */
function Resaltado({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(==[^=]+==)/g).map((parte, i) =>
        parte.startsWith('==') ? (
          <mark key={i} className="rounded-[2px] bg-[#fdf3a3] px-0.5 font-medium text-inherit [box-decoration-break:clone]">
            {parte.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </>
  )
}

const ROTACIONES = ['md:-rotate-2', 'md:rotate-1 md:-translate-y-3', 'md:rotate-2 md:translate-y-2']

const LOGOS_UNIVERSIDADES = [
  { src: '/logos/universities/uba.svg', alt: 'UBA' },
  { src: '/logos/universities/utn.png', alt: 'UTN' },
  { src: '/logos/universities/unlp.png', alt: 'UNLP' },
  { src: '/logos/universities/unc.svg', alt: 'UNC' },
  { src: '/logos/universities/itba.png', alt: 'ITBA' },
  { src: '/logos/universities/uade.svg', alt: 'UADE' },
  { src: '/logos/universities/uca.png', alt: 'UCA' },
  { src: '/logos/universities/siglo21.svg', alt: 'Siglo 21' },
]

export default function Home() {
  const avales = AVALES.filter((a) => MOSTRAR_EJEMPLOS || !a.ejemplo)

  return (
    <div className="marca flex min-h-full flex-col bg-white">
      <SiteNav />

      <main className="flex-1">
        {/* Hero: la promesa base, una línea para los dos y un solo botón */}
        <section className="marca-fondo relative overflow-hidden">
          <Rueda
            size={420}
            color="var(--m-rueda)"
            className="pointer-events-none absolute -left-24 top-1/2 hidden -translate-y-1/2 opacity-60 lg:block"
          />
          <Rueda
            size={420}
            color="var(--m-rueda)"
            className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-60 lg:block"
          />
          <div className="relative mx-auto flex max-w-[820px] flex-col items-center px-4 py-16 text-center sm:py-24">
            <p className="etiqueta">
              Hay {CATALOGO.carreras} carreras que podrías estudiar. ¿Cuántas conocés?
            </p>
            <h1 className="titulo mt-6 text-[38px] sm:text-[56px]">
              Sabé qué carreras van con vos, dónde estudiarlas y de qué vas a trabajar
            </h1>
            <span className="mt-7 block h-[2px] w-16 bg-[var(--m-azul)]" />
            <p className="mt-6 max-w-[580px] text-[16px] leading-[1.6] sm:text-[18px]">
              Timon es un recorrido que hacés desde tu casa, a tu ritmo. Al final te devuelve tu
              perfil, las 6 carreras que más van con vos y las universidades donde estudiarlas.
            </p>
            <BotonEmpezar className="mt-9" />
            <LinkPagarAhora />
          </div>
        </section>

        {/* Bloque de confianza */}
        <section className="marca-claro px-4 pb-16 pt-16 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="titulo text-center text-[30px] sm:text-[40px]">
              Detrás de Timon hay profesionales, <span className="text-[var(--m-azul)]">no solo tecnología</span>
            </h2>
            {avales.length > 0 && (
              <div
                className={`mx-auto mt-10 grid gap-4 ${
                  avales.length >= 3 ? 'md:grid-cols-3' : avales.length === 2 ? 'max-w-[720px] md:grid-cols-2' : 'max-w-[380px]'
                }`}
              >
                {avales.map((a) => (
                  <TarjetaAval key={a.quien} a={a} />
                ))}
              </div>
            )}

            <div className="mt-14 text-center">
              <p className="text-[38px] font-extralight leading-none tracking-[-0.03em] text-[var(--m-azul)] sm:text-[52px]">
                {CATALOGO.carreras} carreras en {CATALOGO.universidades} universidades
              </p>
              <p className="etiqueta mt-3 !text-[var(--m-suave)]">Públicas y privadas, de todo el país</p>
              <ul className="mx-auto mt-8 flex max-w-[860px] flex-wrap items-center justify-center gap-x-8 gap-y-5">
                {LOGOS_UNIVERSIDADES.map((l) => (
                  <li key={l.alt}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={l.alt} className="h-9 w-auto opacity-60 grayscale sm:h-10" />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12px] text-[var(--m-suave)]">
                Algunas de las universidades que vas a encontrar en tu informe.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="marca-fondo scroll-mt-16 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="titulo text-center text-[34px] sm:text-[44px]">Cómo funciona</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="tarjeta relative overflow-hidden px-6 py-7">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-5 text-[110px] font-extralight leading-none text-[var(--m-azul)] opacity-[0.08]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--m-azul)] text-[15px] font-medium text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold leading-tight text-[var(--m-navy)]">{p.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6]">{p.texto}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col items-center text-center">
              <BotonEmpezar />
            </div>
          </div>
        </section>

        {/* Qué te llevás: el resultado, con capturas de la app real */}
        <section id="resultado" className="scroll-mt-16 bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="titulo text-center text-[34px] sm:text-[44px]">
              Lo que te devuelve <span className="text-[var(--m-azul)]">Timon</span>
            </h2>
            <div className="mt-12 space-y-14">
              {RESULTADO.map((r, i) => (
                <div
                  key={r.titulo}
                  className={`flex flex-col items-center gap-6 md:gap-12 ${i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.imagen}
                    alt={`Captura de Timon: ${r.titulo}`}
                    loading="lazy"
                    className="w-full rounded-[14px] border border-[var(--m-borde)] shadow-[0_12px_40px_rgba(26,38,64,0.08)] md:w-[56%]"
                  />
                  <div className="md:flex-1">
                    <h3 className="text-[22px] font-semibold leading-tight text-[var(--m-navy)] sm:text-[26px]">{r.titulo}</h3>
                    <p className="mt-3 text-[16px] leading-[1.65] sm:text-[17px]">{r.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-[560px] text-center text-[13px] text-[var(--m-suave)]">
              Capturas de la app con datos de ejemplo.
            </p>
          </div>
        </section>

        {/* Para vos y tu familia: una sola comunicación, sin bloques separados */}
        <section className="marca-navy relative overflow-hidden px-4 py-20 sm:px-6">
          <Rueda
            size={520}
            color="#26324d"
            className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 lg:block"
          />
          <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
            <h2 className="titulo text-[32px] sm:text-[42px]">
              Elegir sin conocer las opciones es elegir a ciegas
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-white/80 sm:text-[18px]">
              El mundo cambia rápido y aparecen carreras que hace diez años no existían. Timon te
              saca de encima la presión de no saber qué hay ni cuál va con tus intereses de
              verdad, para que elijas por vos y no por lo que eligen tus amigos.
            </p>
            <BotonEmpezar className="mt-9" />
            <LinkPagarAhora tono="claro" />
            <a
              href={URL_WHATSAPP_PADRE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[14px] text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle size={16} />
              ¿Sos padre o madre? Mandáselo a tu hijo por WhatsApp
            </a>
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className="marca-claro scroll-mt-16 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[860px]">
            <h2 className="titulo text-center text-[34px] sm:text-[40px]">Preguntas</h2>
            <div className="tarjeta mt-8 px-6 sm:px-8 [&_button]:font-medium [&_button]:text-[var(--m-navy)]">
              <Faq items={FAQS} variant="home" />
            </div>
          </div>
        </section>

        {/* Fundadores */}
        <section id="nosotros" className="scroll-mt-16 bg-white px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="titulo text-center text-[32px] sm:text-[40px]">Sobre los fundadores</h2>
            <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start">
              <FundadoresFotos className="w-full max-w-[420px] shrink-0" />
              <div className="space-y-5 text-[16px] leading-[1.65] sm:text-[17px] md:pt-2">
                <p>
                  Facu, Feli y Nico son los fundadores de Timon. Lo armaron sobre una idea que está
                  en todo el producto: el primer paso no es elegir, es entenderte.
                </p>
                <p>
                  Timon usa los modelos que conocen los profesionales (intereses, inteligencias
                  múltiples y forma de pensar), y las preguntas pasaron por la revisión de
                  psicopedagogas.
                </p>
                <p>
                  Timon es el timón que dirige el barco a donde querés ir: no decide por vos, te
                  muestra el mapa para que la decisión sea tuya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cierre al estilo del workshop de acquisition.com/o-vegas: lo que dicen →
            lo que te llevás #1/#2/#3 → un botón. Vende el programa, no la app. */}
        <section className="marca-fondo px-4 pb-6 pt-20 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <h2 className="titulo text-center text-[34px] sm:text-[44px]">Lo que dicen de Timon:</h2>
            <div className="mx-auto mt-12 grid max-w-[1080px] items-start justify-items-center gap-5 md:grid-cols-3 md:gap-4">
              {LO_QUE_DICEN.map((c, i) => (
                <figure key={c.quien} className={`tarjeta w-full max-w-[360px] p-5 shadow-[0_12px_32px_rgba(26,38,64,0.10)] ${ROTACIONES[i]}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--m-azul)] text-[13px] font-medium text-white">
                      {c.quien[0]}
                    </span>
                    <figcaption>
                      <span className="block text-[13px] font-semibold text-[var(--m-navy)]">{c.quien}</span>
                      <span className="block text-[11px] text-[var(--m-suave)]">{c.rol}</span>
                    </figcaption>
                  </div>
                  <blockquote className="mt-3 text-[15px] leading-[1.55] text-[var(--m-navy)]">
                    <Resaltado texto={c.texto} />
                  </blockquote>
                </figure>
              ))}
            </div>

            <div className="tarjeta mx-auto mt-14 grid max-w-[1080px] grid-cols-2 gap-y-8 px-6 py-8 md:grid-cols-4">
              {NUMEROS_PRUEBA.map((n) => (
                <div key={n.texto} className="text-center">
                  <p className="text-[40px] font-extralight leading-none tracking-[-0.03em] text-[var(--m-azul)] sm:text-[48px]">
                    {n.valor}
                  </p>
                  <p className="mt-2 text-[13px]">{n.texto}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-[640px] text-center text-[15px]">
              Lo armamos junto a psicopedagogos y psicólogos, <strong className="font-semibold text-[var(--m-navy)]">lo
              validaron especialistas con matrícula activa</strong> y lo probamos con estudiantes reales.
            </p>
          </div>
        </section>

        <section className="marca-navy px-4 py-10 text-center sm:px-6">
          <h2 className="titulo text-[30px] sm:text-[42px]">Lo que te llevás del programa Timon:</h2>
        </section>

        <section className="bg-white px-4 pb-20 pt-16 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-3 md:gap-6">
            {PROGRAMA.map((o) => (
              <div key={o.n} className="text-center">
                <h3 className="mx-auto max-w-[280px] text-[20px] font-semibold leading-[1.5] text-[var(--m-navy)] md:min-h-[60px]">
                  {o.n}
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.foto} alt="" loading="lazy" className="mt-5 aspect-[3/2] w-full rounded-[14px] object-cover" />
                <p className="mx-auto mt-5 max-w-[360px] text-[16px] leading-[1.6]">
                  <Resaltado texto={o.texto} />
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 flex max-w-[700px] flex-col items-center text-center">
            <h2 className="titulo text-[34px] sm:text-[44px]">¿Qué te devolvería Timon a vos?</h2>
            <p className="mt-4 text-[16px] sm:text-[18px]">
              Hay una sola forma de saberlo. Empezás hoy y lo hacés a tu ritmo.
            </p>
            <BotonEmpezar className="mt-8 w-full max-w-[400px] !py-5 !text-[19px]" />
            <LinkPagarAhora />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
