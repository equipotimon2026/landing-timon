import { ArrowRight, MessageCircle } from 'lucide-react'
import { SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { FundadoresFotos } from '@/components/acq/Fundadores'
import { Rueda } from '@/components/landing/Marca'
import {
  AVALES,
  BONO_PAGO_ANTICIPADO,
  CATALOGO,
  PASOS,
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

function Encabezado({ etiqueta, children, centrado = false }: { etiqueta: string; children: React.ReactNode; centrado?: boolean }) {
  return (
    <div className={centrado ? 'text-center' : ''}>
      <p className="etiqueta">{etiqueta}</p>
      <h2 className="titulo mt-4 text-[34px] sm:text-[46px]">{children}</h2>
    </div>
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
        {/* Hero: como la tapa de la presentación, a la izquierda y con el timón de fondo */}
        <section className="marca-fondo relative overflow-hidden">
          <Rueda
            size={620}
            color="var(--m-rueda)"
            className="pointer-events-none absolute -right-48 top-1/2 hidden -translate-y-1/2 opacity-70 lg:block"
          />
          <div className="relative mx-auto max-w-[1140px] px-4 py-20 sm:px-6 sm:py-28">
            <div className="max-w-[660px]">
              <p className="etiqueta">Hay {CATALOGO.carreras} carreras que podrías estudiar. ¿Cuántas conocés?</p>
              <h1 className="titulo mt-6 text-[40px] sm:text-[60px]">
                Sabé qué carreras van con vos, dónde estudiarlas y de qué vas a trabajar.
              </h1>
              <span className="mt-8 block h-[2px] w-16 bg-[var(--m-azul)]" />
              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] sm:text-[19px]">
                Timon es un recorrido que hacés desde tu casa, a tu ritmo. Al final te devuelve tu
                perfil, las 6 carreras que más van con vos y las universidades donde estudiarlas.
              </p>
              <div className="mt-9 flex flex-col items-start">
                <BotonEmpezar />
                <LinkPagarAhora />
              </div>
            </div>
          </div>
        </section>

        {/* Bloque de confianza */}
        <section className="marca-claro px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <Encabezado etiqueta="Quién está detrás">
              Detrás de Timon hay profesionales,
              <br className="hidden sm:block" /> no solo tecnología.
            </Encabezado>
            {avales.length > 0 && (
              <div className={`mt-12 grid gap-4 ${avales.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {avales.map((a) => (
                  <TarjetaAval key={a.quien} a={a} />
                ))}
              </div>
            )}

            <div className="tarjeta mt-4 flex flex-col items-start gap-6 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[48px] font-extralight leading-none tracking-[-0.03em] text-[var(--m-azul)] sm:text-[60px]">
                  {CATALOGO.carreras} carreras
                </p>
                <p className="mt-2 text-[15px]">
                  en {CATALOGO.universidades} universidades públicas y privadas de todo el país.
                </p>
              </div>
              <ul className="flex max-w-[560px] flex-wrap items-center gap-x-6 gap-y-4">
                {LOGOS_UNIVERSIDADES.map((l) => (
                  <li key={l.alt}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={l.alt} className="h-8 w-auto opacity-60 grayscale sm:h-9" />
                  </li>
                ))}
              </ul>
            </div>
            <p className="etiqueta mt-4 !text-[10px] !text-[var(--m-suave)]">
              Algunas de las universidades que vas a encontrar en tu informe
            </p>
          </div>
        </section>

        {/* Cómo funciona: tarjetas con el número grande de fondo, como en la presentación */}
        <section id="como-funciona" className="marca-fondo scroll-mt-16 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <Encabezado etiqueta="Cómo funciona">Tres pasos, a tu ritmo.</Encabezado>
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="tarjeta relative overflow-hidden px-6 py-8">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-5 text-[110px] font-extralight leading-none text-[var(--m-azul)] opacity-[0.08]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--m-azul)] text-[15px] font-medium text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold text-[var(--m-navy)]">{p.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6]">{p.texto}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <BotonEmpezar />
            </div>
          </div>
        </section>

        {/* Lo que te devuelve Timon, con capturas de la app real */}
        <section id="resultado" className="marca-claro scroll-mt-16 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <Encabezado etiqueta="El resultado">Lo que te devuelve Timon.</Encabezado>
            <div className="mt-12 space-y-6">
              {RESULTADO.map((r, i) => (
                <div
                  key={r.titulo}
                  className={`tarjeta flex flex-col gap-6 overflow-hidden p-4 sm:p-6 md:gap-10 ${i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.imagen}
                    alt={`Captura de Timon: ${r.titulo}`}
                    loading="lazy"
                    className="w-full rounded-lg border border-[var(--m-borde)] md:w-[55%]"
                  />
                  <div className="px-2 pb-2 md:flex-1 md:px-0 md:pb-0">
                    <p className="etiqueta">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-[24px] font-semibold leading-tight text-[var(--m-navy)] sm:text-[28px]">
                      {r.titulo}
                    </h3>
                    <p className="mt-3 text-[16px] leading-[1.65]">{r.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-[var(--m-suave)]">Capturas de la app con datos de ejemplo.</p>
          </div>
        </section>

        {/* Para vos y tu familia: el cierre navy de la presentación */}
        <section className="marca-navy relative overflow-hidden px-4 py-24 sm:px-6">
          <Rueda
            size={560}
            color="#26324d"
            className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 lg:block"
          />
          <div className="relative mx-auto max-w-[1140px]">
            <div className="max-w-[640px]">
              <p className="etiqueta !text-[#8ea2e8]">Para vos y tu familia</p>
              <h2 className="titulo mt-4 text-[34px] sm:text-[48px]">
                Elegir sin conocer las opciones es elegir a ciegas.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-white/80">
                El mundo cambia rápido y aparecen carreras que hace diez años no existían. Timon te
                saca de encima la presión de no saber qué hay ni cuál va con tus intereses de verdad,
                para que elijas por vos y no por lo que eligen tus amigos.
              </p>
              <div className="mt-9 flex flex-col items-start">
                <BotonEmpezar />
                <LinkPagarAhora tono="claro" />
              </div>
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
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className="marca-claro scroll-mt-16 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[860px]">
            <Encabezado etiqueta="Preguntas">Lo que nos preguntan.</Encabezado>
            <div className="tarjeta mt-10 px-6 sm:px-8 [&_button]:font-medium [&_button]:text-[var(--m-navy)]">
              <Faq items={FAQS} variant="home" />
            </div>
          </div>
        </section>

        {/* Fundadores */}
        <section id="nosotros" className="marca-fondo scroll-mt-16 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <Encabezado etiqueta="Quiénes somos">Sobre los fundadores.</Encabezado>
            <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start">
              <FundadoresFotos className="w-full max-w-[420px] shrink-0" />
              <div className="space-y-5 text-[17px] leading-[1.65] md:pt-2">
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

        {/* Cierre */}
        <section className="marca-claro px-4 py-24 sm:px-6">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <Encabezado etiqueta="Empezá hoy" centrado>
              ¿Qué te devolvería Timon a vos?
            </Encabezado>
            <p className="mt-5 text-[17px]">Hay una sola forma de saberlo. Empezás hoy y lo hacés a tu ritmo.</p>
            <BotonEmpezar className="mt-9" />
            <LinkPagarAhora />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
