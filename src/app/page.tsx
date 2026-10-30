import { ArrowRight, MessageCircle } from 'lucide-react'
import { SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { FundadoresFotos } from '@/components/acq/Fundadores'
import { WheelMark } from '@/components/landing/Logo'
import {
  AVALES,
  BONO_PAGO_ANTICIPADO,
  CATALOGO,
  PASOS,
  RESULTADO,
  URL_EMPEZAR,
  URL_PAGAR_AHORA,
  URL_WHATSAPP_PADRE,
  VIDEO,
  type Aval,
} from '@/lib/landing'

/**
 * Home para familias (29/10/2026). Brief de Feli del 27/10 + prioridades de
 * Nico: freemium, "cómo funciona Timon" y testimonios que den validez.
 *
 *   hero con un botón → video → bloque de confianza → cómo funciona →
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
    <a
      href={URL_EMPEZAR}
      className={`inline-flex w-full max-w-[400px] items-center justify-center rounded-full bg-[var(--ocean)] px-6 py-4 text-[18px] font-bold uppercase text-white transition-colors hover:bg-[var(--ocean-deep)] sm:text-[20px] ${className}`}
    >
      Empezá gratis
    </a>
  )
}

function LinkPagarAhora({ tono = 'oscuro' }: { tono?: 'oscuro' | 'claro' }) {
  return (
    <a
      href={URL_PAGAR_AHORA}
      className={`group mt-4 inline-flex items-center gap-1.5 text-[14px] underline-offset-4 hover:underline ${
        tono === 'oscuro' ? 'text-[var(--hueso)]' : 'text-white/80'
      }`}
    >
      ¿Ya lo decidieron? Pagá ahora y sumá {BONO_PAGO_ANTICIPADO.corto}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

function TarjetaAval({ a }: { a: Aval }) {
  return (
    <figure className="relative flex flex-col rounded-sm bg-white px-6 py-7 shadow-[0_12px_40px_rgba(15,31,54,0.06)]">
      {a.ejemplo && (
        <span className="absolute -right-2 -top-2 rounded bg-[#E11D48] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
          Ejemplo
        </span>
      )}
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[var(--ocean-wash)]">
        {a.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.imagen} alt="" className="h-10 w-10 object-contain" />
        ) : (
          <span className="text-[22px] font-extrabold text-[var(--ocean)]">{a.quien[0]}</span>
        )}
      </div>
      <blockquote className="mt-5 flex-1 text-[17px] font-semibold leading-snug">
        &ldquo;{a.frase}&rdquo;
      </blockquote>
      <figcaption className="mt-5">
        <span className="block text-[14px] font-bold">{a.quien}</span>
        <span className="block text-[13px] text-[var(--hueso)]">{a.rol}</span>
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
    <div className="acq flex min-h-full flex-col bg-white">
      <SiteNav />

      <main className="flex-1">
        {/* Hero: la promesa base, una línea para los dos y un solo botón */}
        <section className="relative overflow-hidden bg-[#EFEFEF]">
          <div className="pointer-events-none absolute -left-24 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
            <WheelMark tone="navy" size={420} />
          </div>
          <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
            <WheelMark tone="navy" size={420} />
          </div>
          <div className="relative mx-auto flex max-w-[820px] flex-col items-center px-4 pb-28 pt-14 text-center sm:pb-56 sm:pt-20">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--ocean)]">
              Hay {CATALOGO.carreras} carreras que podrías estudiar. ¿Cuántas conocés?
            </p>
            <h1 className="mt-5 text-[32px] font-extrabold uppercase leading-[1.1] sm:text-[44px]">
              Sabé qué carreras van con vos, dónde estudiarlas y de qué vas a trabajar
            </h1>
            <p className="mt-6 max-w-[580px] text-[16px] leading-[1.55] sm:text-[18px]">
              Timon es un recorrido que hacés desde tu casa, a tu ritmo. Al final te devuelve tu
              perfil, las 6 carreras que más van con vos y las universidades donde estudiarlas.
            </p>
            <BotonEmpezar className="mt-9" />
            <LinkPagarAhora />
          </div>
        </section>

        {/* Video montado sobre el borde del hero */}
        <section id="video" className="bg-white px-4 sm:px-6">
          <div className="mx-auto -mt-20 max-w-[960px] sm:-mt-44">
            <video
              src={VIDEO.src}
              poster={VIDEO.poster}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-md bg-[var(--navy)] shadow-[0_24px_60px_rgba(15,31,54,0.18)]"
            >
              Tu navegador no puede reproducir el video.
            </video>
          </div>
        </section>

        {/* Bloque de confianza, justo después del video */}
        <section className="bg-white px-4 pb-16 pt-14 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="text-center text-[24px] font-extrabold uppercase leading-tight sm:text-[30px]">
              Detrás de Timon hay profesionales, <span className="text-[var(--ocean)]">no solo tecnología</span>
            </h2>
            {avales.length > 0 && (
              <div
                className={`mx-auto mt-10 grid gap-6 ${
                  avales.length >= 3 ? 'md:grid-cols-3' : avales.length === 2 ? 'max-w-[720px] md:grid-cols-2' : 'max-w-[380px]'
                }`}
              >
                {avales.map((a) => (
                  <TarjetaAval key={a.quien} a={a} />
                ))}
              </div>
            )}

            <div className="mt-14 text-center">
              <p className="text-[30px] font-extrabold leading-none sm:text-[38px]">
                {CATALOGO.carreras} carreras en {CATALOGO.universidades} universidades
              </p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--hueso)]">
                Públicas y privadas, de todo el país
              </p>
              <ul className="mx-auto mt-8 flex max-w-[860px] flex-wrap items-center justify-center gap-x-8 gap-y-5">
                {LOGOS_UNIVERSIDADES.map((l) => (
                  <li key={l.alt}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={l.alt} className="h-9 w-auto opacity-70 grayscale sm:h-10" />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12px] text-[var(--hueso)]">
                Algunas de las universidades que vas a encontrar en tu informe.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="scroll-mt-20 bg-[#EFEFEF] px-4 py-16 sm:px-6">
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
            <div className="mt-10 flex flex-col items-center text-center">
              <BotonEmpezar />
            </div>
          </div>
        </section>

        {/* Qué te llevás: el resultado, con capturas de la app real */}
        <section id="resultado" className="scroll-mt-20 bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="text-center text-[28px] font-extrabold uppercase leading-tight sm:text-[36px]">
              Lo que te devuelve <span className="text-[var(--ocean)]">Timon</span>
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
                    className="w-full rounded-md border border-[var(--border-cream)] shadow-[0_12px_40px_rgba(15,31,54,0.08)] md:w-[56%]"
                  />
                  <div className="md:flex-1">
                    <h3 className="text-[22px] font-extrabold leading-tight sm:text-[26px]">{r.titulo}</h3>
                    <p className="mt-3 text-[16px] leading-[1.6] text-[var(--hueso)] sm:text-[17px]">{r.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-[560px] text-center text-[13px] text-[var(--hueso)]">
              Capturas de la app con datos de ejemplo.
            </p>
          </div>
        </section>

        {/* Para vos y tu familia: una sola comunicación, sin bloques separados */}
        <section className="bg-[var(--navy)] px-4 py-16 text-white sm:px-6">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <h2 className="text-[26px] font-extrabold uppercase leading-tight sm:text-[32px]">
              Elegir sin conocer las opciones es elegir a ciegas
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-white/85 sm:text-[18px]">
              El mundo cambia rápido y aparecen carreras que hace diez años no existían. Timon te
              saca de encima la presión de no saber qué hay ni cuál va con tus intereses de
              verdad, para que elijas por vos y no por lo que eligen tus amigos.
            </p>
            <BotonEmpezar className="mt-9 bg-white !text-[var(--navy)] hover:bg-white/90" />
            <LinkPagarAhora tono="claro" />
            <a
              href={URL_WHATSAPP_PADRE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle size={16} />
              ¿Sos padre o madre? Mandáselo a tu hijo por WhatsApp
            </a>
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className="scroll-mt-20 bg-[var(--cream)] px-4 py-16 sm:px-6">
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
              <FundadoresFotos className="w-full max-w-[420px] shrink-0" />
              <div className="space-y-5 text-[16px] leading-[1.6] sm:text-[17px] md:pt-2">
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
        <section className="bg-[#EFEFEF] px-4 py-20 sm:px-6">
          <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
            <h2 className="text-[28px] font-extrabold uppercase leading-tight sm:text-[36px]">
              ¿Qué te devolvería Timon a vos?
            </h2>
            <p className="mt-4 text-[16px] text-[var(--hueso)] sm:text-[18px]">
              Hay una sola forma de saberlo. Empezás hoy y lo hacés a tu ritmo.
            </p>
            <BotonEmpezar className="mt-8" />
            <LinkPagarAhora />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
