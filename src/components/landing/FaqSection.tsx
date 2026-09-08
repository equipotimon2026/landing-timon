'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import {
  FREE_STOPS,
  GROUP_SIZE_THRESHOLD,
  GROUP_DISCOUNT_PCT,
  TOTAL_STOPS,
} from '@/lib/pricing'

/**
 * FAQ pedida en la reunión del 07/09/2026.
 *
 * Criterio de Feli para las preguntas: si una pregunta no baja una duda que
 * frena la compra, no va. Por eso están las de plata, las de "¿pierdo lo que
 * hice?" y las de privacidad, y no hay relleno.
 *
 * Sin número de teléfono: quien necesita ayuda escribe por el chat de abajo.
 */
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: '¿Timon es gratis o se paga?',
    a: (
      <>
        Las primeras {FREE_STOPS} paradas son gratis y no te pedimos ningún dato de
        pago para hacerlas. Recién cuando querés seguir con el resto del recorrido
        y el informe final aparece el pago, una sola vez. No es una suscripción:
        no se renueva ni hay que cancelar nada.
      </>
    ),
  },
  {
    q: '¿Hay forma de que me salga más barato?',
    a: (
      <>
        Sí. Cada persona tiene un código para compartir. Cuando el grupo llega a{' '}
        {GROUP_SIZE_THRESHOLD} personas, todos los que todavía no pagaron pasan a
        tener {GROUP_DISCOUNT_PCT}% de descuento. Si tu colegio ya trabaja con
        nosotros, además vas a tener un código propio.
      </>
    ),
  },
  {
    q: 'Dejé una parada por la mitad. ¿Pierdo lo que respondí?',
    a: (
      <>
        No. Se guarda solo, a medida que respondés. Cuando volvés, Timon te deja
        justo donde estabas y te recuerda de qué venían hablando. Podés hacer el
        recorrido en una tarde o en tres semanas: da lo mismo.
      </>
    ),
  },
  {
    q: '¿Quién ve mis respuestas?',
    a: (
      <>
        Vos. Tu colegio nunca ve lo que respondiste, ni siquiera cuando entraste
        con un código del colegio. Si compartís el informe con tu familia, ven el
        informe — no las respuestas.
      </>
    ),
  },
  {
    q: '¿Puede pagarlo mi mamá o mi papá?',
    a: (
      <>
        Sí, y es lo más común. Desde adentro de la app armás un mensaje con el
        link y se lo mandás por WhatsApp. Quien lo abre ve primero para qué sirve
        y qué te va a devolver, y recién después el pago. También podés pagarlo
        vos: la opción no se cierra.
      </>
    ),
  },
  {
    q: 'Ya estoy estudiando y me quiero cambiar. ¿Me sirve?',
    a: (
      <>
        Sí. Al empezar te preguntamos en qué momento estás, y el recorrido se
        arma distinto si estás en el colegio, si terminaste y no sabés qué seguir,
        o si ya empezaste algo y querés cambiar.
      </>
    ),
  },
  {
    q: 'Me olvidé la contraseña.',
    a: (
      <>
        En la pantalla de entrada, poné tu mail y elegí &ldquo;olvidé mi
        contraseña&rdquo;. Te llega un enlace al correo para poner una nueva. Si
        el mail no llega, escribinos por el chat y te la cambiamos a mano.
      </>
    ),
  },
  {
    q: '¿Cuánto lleva hacerlo?',
    a: (
      <>
        Son {TOTAL_STOPS} paradas de entre 4 y 10 minutos. Casi nadie lo hace de
        una sentada y está bien: la idea es que vuelvas. Al ritmo de una parada
        cada dos días, son unas tres semanas.
      </>
    ),
  },
]

export function FaqSection() {
  const head = useInView<HTMLDivElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-[900px]">
        <div ref={head.ref} className={`reveal ${head.inView ? 'is-visible' : ''}`}>
          <span className="eyebrow eyebrow--with-rule">Preguntas</span>
          <h2
            className="mt-4 font-display font-extrabold tracking-[-0.04em] text-[var(--navy)]"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.9rem)', lineHeight: 1.06 }}
          >
            Lo que todos preguntan
            <br />
            <span className="serif-accent font-normal text-[var(--ocean)]">
              antes de empezar.
            </span>
          </h2>
        </div>

        <div className="mt-10 divide-y divide-[var(--border-cream)] border-y border-[var(--border-cream)]">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--ocean)]"
                >
                  <span className="text-[16px] font-semibold text-[var(--navy)] sm:text-[17px]">
                    {f.q}
                  </span>
                  <Plus
                    size={18}
                    className={`mt-0.5 shrink-0 text-[var(--hueso)] transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-[var(--hueso)]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-[14px] text-[var(--hueso)]">
          ¿Te quedó otra duda? Escribinos por el chat de acá abajo y te
          contestamos nosotros.
        </p>
      </div>
    </section>
  )
}
