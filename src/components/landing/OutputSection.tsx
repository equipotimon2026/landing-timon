'use client'

import { BeforeAfter } from './BeforeAfter'
import { ReportCarousel } from './ReportCarousel'
import { useInView } from '@/hooks/useInView'

/**
 * Qué devuelve Timon: el antes/después y un ejemplo tangible del informe.
 *
 * Fede (06/09/2026): "en la landing tengamos algo tangible para mostrar" y
 * "no hablamos de que lo hicimos con psicólogos". Las dos cosas van acá.
 */
export function OutputSection() {
  const titleReveal = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <>
      <BeforeAfter
        eyebrow="El antes y el después"
        title="De la incertidumbre"
        titleEm="a tener el mapa en tus manos."
        beforeLabel="Tu realidad hoy"
        afterLabel="Tu realidad con Timon"
        pairs={[
          {
            before: '"No sé qué carreras van conmigo."',
            after: 'Entendés qué opciones encajan con tu perfil, y exactamente por qué.',
          },
          {
            before: '"No sé bien de qué se trata cada una."',
            after: 'Tenés el detalle real y los planes de estudio de cada carrera.',
          },
          {
            before: '"No sé dónde se estudia ni qué me conviene."',
            after: 'Conocés las universidades argentinas reales según tus posibilidades.',
          },
          {
            before: '"No sé a qué laburo te lleva cada carrera."',
            after: 'Accedés a las salidas laborales y los rangos salariales actuales.',
          },
        ]}
      />

      <section className="relative overflow-hidden border-t border-[var(--border-cream)] bg-[var(--cream-elev)]">
        <div className="relative mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24">
          <div
            ref={titleReveal.ref}
            className={`reveal ${titleReveal.inView ? 'is-visible' : ''} mb-10 sm:mb-14`}
          >
            <p className="eyebrow eyebrow--with-rule mb-6">Lo que te llevás</p>
            <h2
              className="max-w-[760px] font-display font-extrabold tracking-[-0.04em] text-[var(--navy)]"
              style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)', lineHeight: 1.02 }}
            >
              ¿Qué devuelve Timon?
            </h2>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-[var(--hueso)] sm:text-[17px]">
              Un informe con quién sos, las carreras que te pegan y por qué, las
              universidades argentinas donde podés estudiarlas y a qué trabajo lleva
              cada una. Las preguntas y la forma de leerlas las armamos con
              psicólogas y psicopedagogas: no es un test de internet.
            </p>
          </div>
          <ReportCarousel />
        </div>
      </section>
    </>
  )
}
