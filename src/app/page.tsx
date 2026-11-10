import { ArrowRight, BadgeCheck, MessageCircle } from 'lucide-react'
import { SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { Faq, type FaqItem } from '@/components/acq/Faq'
import { FundadoresFotos } from '@/components/acq/Fundadores'
import { Rueda } from '@/components/landing/Marca'
import { Anotado, Flecha, MapaHero, Nota, Resaltado } from '@/components/landing/Lapiz'
import {
  BONO_PAGO_ANTICIPADO,
  LO_QUE_DICEN,
  NUMEROS_PRUEBA,
  PASOS,
  PROGRAMA,
  URL_EMPEZAR,
  URL_PAGAR_AHORA,
  URL_WHATSAPP_PADRE,
} from '@/lib/landing'

/**
 * Home para familias (29/10/2026). Brief de Feli del 27/10 + prioridades de
 * Nico: freemium, "cómo funciona Timon" y testimonios que den validez. Desde
 * el 30/10 con la marca de la presentación (clase `.marca` en globals.css) y
 * sin video.
 *
 *   hero → lo que dicen → lo que te llevás del programa (#1/#2/#3) + botón →
 *   cómo funciona → para vos y tu familia → preguntas → fundadores → CTA final
 *
 * Todo lleva a una sola acción: empezar el recorrido gratis. Sin precio, sin
 * plazo y sin otras propuestas (test, programa, comunidad). El detalle de qué
 * se promete y qué falta confirmar está en `lib/landing.ts`.
 */

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
  return (
    <div className="marca flex min-h-full flex-col bg-white">
      <SiteNav />

      <main className="flex-1">
        {/* Hero: la promesa y el mapa. Timon "te muestra el mapa": de no saber
            qué estudiar a tu decisión, pasando por lo que te devuelve. */}
        <section className="marca-fondo relative overflow-hidden">
          <div className="relative mx-auto flex max-w-[1100px] flex-col items-center px-4 pb-10 pt-16 text-center sm:pb-14 sm:pt-20">
            <h1 className="titulo max-w-[820px] text-[44px] sm:text-[72px]">
              Sabé qué carreras <Anotado tipo="underline" demora={300}>van con vos</Anotado>
            </h1>
            <p className="mt-7 text-[17px] sm:text-[20px]">
              Dónde estudiarlas y de qué vas a trabajar. A tu ritmo.
            </p>
            <BotonEmpezar className="mt-9" />
            <LinkPagarAhora />
            <MapaHero className="mt-10 w-full sm:mt-12" />
          </div>
        </section>

        {/* Como el workshop de acquisition.com/o-vegas: lo que dicen → lo que te
            llevás del programa #1/#2/#3 → un botón. Vende el programa, no la app. */}
        <section className="marca-claro px-4 pb-16 pt-20 sm:px-6">
          <div className="mx-auto max-w-[1140px]">
            <div className="relative">
              <h2 className="titulo text-center text-[34px] sm:text-[44px]">Lo que dicen de Timon:</h2>
              <div className="pointer-events-none absolute -bottom-12 right-[4%] hidden w-[220px] -rotate-3 lg:block">
                <Nota>lo dicen ellos, no nosotros</Nota>
                <Flecha direccion="baja-izquierda" className="ml-6 mt-1 w-[86px]" demora={0.2} />
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-[1080px] items-stretch justify-items-center gap-5 md:grid-cols-3 md:gap-4">
              {LO_QUE_DICEN.map((c) => (
                <figure
                  key={c.quien}
                  className="tarjeta flex h-full w-full max-w-[360px] flex-col p-6 shadow-[0_12px_32px_rgba(26,38,64,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--m-borde)] bg-white">
                      {c.imagen ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.imagen} alt="" className="h-10 w-10 object-contain" />
                      ) : (
                        <span className="text-[18px] font-medium text-[var(--m-azul)]">
                          {c.quien
                            .split(' ')
                            .filter((w) => w.length > 2)
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join('')}
                        </span>
                      )}
                    </span>
                    <figcaption className="min-w-0">
                      <span className="flex items-center gap-1 text-[14px] font-semibold text-[var(--m-navy)]">
                        {c.quien}
                        <BadgeCheck size={15} className="shrink-0 text-[var(--m-azul)]" aria-label="Verificado" />
                      </span>
                      <span className="block text-[13px] leading-snug text-[var(--m-suave)]">{c.rol}</span>
                    </figcaption>
                  </div>
                  <blockquote className="mt-5 flex-1 text-[16px] leading-[1.6] text-[var(--m-navy)]">
                    <Resaltado texto={c.texto} />
                  </blockquote>
                  <p className="etiqueta mt-5 border-t border-[var(--m-borde)] pt-4 !text-[10.5px] !text-[var(--m-suave)]">
                    {c.fuente} · Oct 2026
                  </p>
                </figure>
              ))}
            </div>

            <div className="tarjeta mx-auto mt-14 grid max-w-[1080px] grid-cols-2 gap-y-8 px-6 py-8 md:grid-cols-4">
              {NUMEROS_PRUEBA.map((n) => (
                <div key={n.texto} className="text-center">
                  <p className="text-[40px] font-medium leading-none tracking-[-0.03em] text-[var(--m-azul)] sm:text-[48px]">
                    {n.valor}
                  </p>
                  <p className="mt-2 text-[14px]">{n.texto}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-[640px] text-center text-[15px]">
              Lo armamos junto a psicopedagogos y psicólogos, <strong className="font-semibold text-[var(--m-navy)]">lo
              validaron especialistas con matrícula activa</strong> y lo probamos con estudiantes reales.
            </p>
            <ul className="mx-auto mt-10 flex max-w-[860px] flex-wrap items-center justify-center gap-x-8 gap-y-5">
              {LOGOS_UNIVERSIDADES.map((l) => (
                <li key={l.alt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={l.alt} className="h-8 w-auto opacity-55 grayscale sm:h-9" />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center text-[13px] text-[var(--m-suave)]">
              Algunas de las universidades que vas a encontrar en tu informe.
            </p>
          </div>
        </section>

        <section id="resultado" className="marca-navy scroll-mt-16 px-4 py-10 text-center sm:px-6">
          <h2 className="titulo text-[30px] sm:text-[42px]">Lo que te llevás del programa Timon:</h2>
        </section>

        <section className="bg-white px-4 pb-20 pt-16 sm:px-6">
          <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-3 md:gap-6">
            {PROGRAMA.map((o, i) => (
              <div key={o.n} className="relative text-center">

                <h3 className="mx-auto max-w-[280px] text-[20px] font-semibold leading-[1.5] text-[var(--m-navy)] md:min-h-[60px]">
                  {o.n}
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={o.foto}
                  alt={`Captura de Timon: ${o.n}`}
                  loading="lazy"
                  className="mt-5 aspect-[3/2] w-full rounded-[14px] border border-[var(--m-borde)] object-cover object-top shadow-[0_12px_32px_rgba(26,38,64,0.08)]"
                />
                <p className="mx-auto mt-5 max-w-[360px] text-[16px] leading-[1.6]">
                  <Resaltado texto={o.texto} />
                </p>
                {i === 0 && (
                  <div className="mt-1 flex items-start justify-center gap-1">
                    <Flecha direccion="sube" className="w-[24px] shrink-0" demora={0.3} />
                    <Nota className="mt-6 -rotate-2 !text-[19px]">la primera parte la ves gratis</Nota>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-[var(--m-suave)]">Capturas de la app con datos de ejemplo.</p>
          <div className="mt-10 flex flex-col items-center text-center">
            <BotonEmpezar />
            <LinkPagarAhora />
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="marca-fondo scroll-mt-16 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="titulo text-center text-[34px] sm:text-[44px]">Cómo funciona</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-14">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="tarjeta relative px-6 py-7">
                  {i > 0 && (
                    <Flecha
                      direccion="derecha"
                      color="var(--m-azul)"
                      demora={0.35 * i}
                      className="pointer-events-none absolute -left-[58px] top-6 hidden w-[54px] md:block"
                    />
                  )}
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

        {/* CTA final: un bloque propio, como la tapa de la presentación, para
            que no se lea como parte del footer. */}
        <section className="bg-white px-4 pb-24 sm:px-6">
          <div className="marca-fondo relative mx-auto max-w-[1140px] overflow-hidden rounded-[28px] border border-[var(--m-borde)] px-6 py-16 text-center shadow-[0_30px_80px_rgba(26,38,64,0.12)] sm:px-12 sm:py-24">
            <Rueda
              size={520}
              color="var(--m-rueda)"
              className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 opacity-70 md:block"
            />
            <Rueda
              size={360}
              color="var(--m-rueda)"
              className="pointer-events-none absolute -left-32 -top-24 hidden opacity-50 md:block"
            />
            <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
              <p className="etiqueta">Empezá hoy</p>
              <h2 className="titulo mt-5 text-[40px] sm:text-[60px]">
                ¿Qué te devolvería Timon <Anotado tipo="circle" className="whitespace-nowrap">a vos</Anotado>?
              </h2>
              <p className="mt-6 text-[17px] sm:text-[20px]">
                Hay una sola forma de saberlo. Empezás hoy y lo hacés a tu ritmo.
              </p>
              <BotonEmpezar className="mt-10 w-full max-w-[420px] !py-5 !text-[20px] shadow-[0_14px_34px_rgba(59,95,212,0.35)]" />
              <div className="mt-3 flex items-start gap-2 self-center sm:translate-x-24">
                <Flecha direccion="sube" className="w-[30px] shrink-0" demora={0.2} />
                <Nota className="mt-7 -rotate-3 text-left">empezar es gratis y sin tarjeta</Nota>
              </div>
              <LinkPagarAhora />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
