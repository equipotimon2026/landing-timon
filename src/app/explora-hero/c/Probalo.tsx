'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { CTA_TEXTO } from '@/components/home/Cta'
import { INTERESES, datosArea, type Interes } from './intereses'
import { IconoEstudia, IconoTrabaja, Retrato, Timon } from './Retrato'
import s from './probalo.module.css'

const SUAVE = [0.22, 1, 0.36, 1] as const
/** Cada tarjeta sale del mazo con su propio giro: el abanico. */
const GIROS = [-6, -2, 3, 7]

/**
 * Hero C, "probalo". Bloque navy con el titular y el botón; abajo, un panel
 * blanco que se corta en el borde de la pantalla: el padre toca algo que le
 * gusta a su hijo y ve, en vivo, la persona, las carreras, dónde se estudia y
 * dónde se trabaja. Arranca solo (rota cada 5 s) hasta que alguien toca.
 */
export function Probalo() {
  const quieto = useReducedMotion()
  const [activo, setActivo] = useState(0)
  const [tocado, setTocado] = useState(false)
  const [encima, setEncima] = useState(false)
  const [aLaVista, setALaVista] = useState(true)
  const panel = useRef<HTMLDivElement>(null)
  const fila = useRef<HTMLDivElement>(null)
  const auto = !tocado && !quieto

  useEffect(() => {
    const el = panel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setALaVista(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // En celular la fila se desliza: el interés activo siempre queda a la vista.
  useEffect(() => {
    const f = fila.current
    const b = f?.children[activo] as HTMLElement | undefined
    if (!f || !b || f.scrollWidth <= f.clientWidth) return
    f.scrollTo({ left: b.offsetLeft - (f.clientWidth - b.offsetWidth) / 2 })
  }, [activo])

  const elegir = (i: number) => {
    setTocado(true)
    setActivo(i)
  }
  const interes = INTERESES[activo]

  return (
    <section className="relative isolate">
      {/* El bloque navy llega hasta la mitad del panel; el resto del panel pisa la sección blanca. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[calc(100%-300px)] overflow-hidden bg-[var(--navy)] md:h-[calc(100%-210px)]">
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(223,234,246,0.16)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,#000_20%,transparent_80%)]" />
        <div className="absolute left-1/2 top-[-30%] h-[70%] w-[min(1100px,140%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(79,132,194,0.35),transparent)]" />
        {/* El timón de la marca, enorme y tenue: gira un rayo cada vez que cambia el interés. */}
        <motion.div
          className="absolute right-0 top-[58%] size-[520px] -translate-y-1/2 translate-x-[58%] text-white/[0.065] md:top-[46%] md:size-[860px] md:translate-x-1/2"
          animate={{ rotate: activo * 45 }}
          transition={quieto ? { duration: 0 } : { type: 'spring', stiffness: 40, damping: 14 }}
        >
          <Timon className="size-full" />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1120px] px-4 pt-11 text-center sm:px-5 md:pt-16">
        <motion.h1
          className="mx-auto max-w-[18ch] text-[clamp(2.05rem,5vw,3.65rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-white [text-wrap:balance]"
          initial={quieto ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: SUAVE }}
        >
          Tu hijo va a conocer{' '}
          <span className="bg-[linear-gradient(95deg,#f2b896_0%,#e9a383_35%,#9fc3ec_100%)] bg-clip-text text-transparent">el mundo real</span>{' '}
          antes de elegir qué estudiar.
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-[46ch] text-[16px] leading-[1.5] text-white/70 md:mt-5 md:text-[18.5px]"
          initial={quieto ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: SUAVE, delay: 0.15 }}
        >
          Dos semanas, desde casa, con profesionales, carreras, universidades y empresas de verdad.
        </motion.p>
        <motion.div
          className="mt-6 md:mt-8"
          initial={quieto ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: SUAVE, delay: 0.25 }}
        >
          <Link
            href="/#anotalo"
            className="group inline-flex min-h-[54px] items-center gap-2 rounded-full bg-[linear-gradient(95deg,#f2b896,#e39a77_45%,#c97f5e)] px-7 text-[16.5px] font-semibold tracking-[-0.01em] text-[var(--navy)] shadow-[0_10px_30px_-10px_rgba(233,163,131,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] transition-[transform,filter] duration-200 hover:-translate-y-px hover:brightness-105 active:translate-y-px"
          >
            {CTA_TEXTO}
            <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        ref={panel}
        className="relative mx-auto mt-9 w-[calc(100%-24px)] max-w-[1120px] rounded-[26px] bg-white p-3 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_30px_80px_-30px_rgba(15,31,54,0.55),0_0_0_1px_rgba(15,31,54,0.06)] md:mt-12 md:w-[calc(100%-40px)] md:rounded-[30px] md:p-5"
        initial={quieto ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: SUAVE, delay: 0.35 }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setEncima(true)}
        onPointerLeave={() => setEncima(false)}
      >
        <p
          aria-hidden
          className="pointer-events-none absolute -top-[34px] right-5 flex rotate-[-3deg] items-end gap-1 font-[family-name:var(--font-mano)] text-[17px] leading-none text-[#f2b896] md:-top-[44px] md:left-8 md:right-auto md:text-[21px]"
        >
          tocá uno y mirá qué hay detrás
          <svg viewBox="0 0 40 34" className="mb-[-14px] h-[30px] w-[34px] md:h-[36px] md:w-[40px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 4 C20 2 32 10 31 28" />
            <path d="M24 22 L31 29 L36 21" />
          </svg>
        </p>
        <div className="flex flex-col gap-3 px-1 pb-3 pt-1 md:px-2 md:pb-5 md:pt-2">
          <p className="shrink-0 text-left text-[15px] font-semibold tracking-[-0.01em] text-[var(--navy)] md:text-[16px]">
            ¿Qué le gusta a tu hijo?
          </p>
          <div
            role="radiogroup"
            aria-label="Intereses de tu hijo"
            ref={fila}
            className={`${s.fila} -mx-3 flex gap-2 overflow-x-auto scroll-smooth px-3 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0`}
          >
            {INTERESES.map((it, i) => {
              const elegido = i === activo
              return (
                <button
                  key={it.id}
                  type="button"
                  role="radio"
                  aria-checked={elegido}
                  onClick={() => elegir(i)}
                  className={`relative shrink-0 overflow-hidden rounded-[14px] border px-3.5 py-2.5 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 md:px-[18px] md:text-[16px] ${
                    elegido
                      ? 'border-[var(--navy)] bg-[var(--navy)] text-white'
                      : 'border-[#e3e8ef] bg-white text-[var(--texto2)] hover:border-[#c9d4e3] hover:text-[var(--navy)]'
                  }`}
                >
                  {it.etiqueta}
                  {elegido && auto && (
                    <span
                      key={activo}
                      aria-hidden
                      onAnimationEnd={() => setActivo((a) => (a + 1) % INTERESES.length)}
                      className={`${s.barra} ${encima || !aLaVista ? s.pausada : ''} absolute inset-x-0 bottom-0 h-[3px] bg-[var(--terra)]`}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div aria-live="polite" className="relative min-h-[640px] md:min-h-[332px]">
          <AnimatePresence mode="wait">
            <Despliegue key={interes.id} interes={interes} quieto={Boolean(quieto)} />
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}

function variantes(quieto: boolean): Variants {
  if (quieto) return { oculto: { opacity: 1 }, visible: { opacity: 1 }, fuera: { opacity: 1 } }
  return {
    oculto: (i: number) => ({ opacity: 0, y: 46, rotate: GIROS[i], scale: 0.93 }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 150, damping: 20, mass: 0.9, delay: 0.06 + i * 0.09 },
    }),
    fuera: (i: number) => ({ opacity: 0, y: -14, scale: 0.98, transition: { duration: 0.2, delay: i * 0.025, ease: 'easeIn' } }),
  }
}

function filaDia(quieto: boolean): Variants {
  if (quieto) return { oculto: { opacity: 1 }, visible: { opacity: 1 } }
  return {
    oculto: { opacity: 0, x: -10 },
    visible: (j: number) => ({ opacity: 1, x: 0, transition: { duration: 0.5, ease: SUAVE, delay: 0.35 + j * 0.12 } }),
  }
}

const tarjeta = 'rounded-[20px] border border-[#e6ebf1] bg-white origin-bottom'

function Despliegue({ interes, quieto }: { interes: Interes; quieto: boolean }) {
  const v = variantes(quieto)
  const fila = filaDia(quieto)
  const { area, mas } = datosArea(interes.mundo, interes.carreras.length)
  const p = interes.persona
  const props = (i: number) => ({ custom: i, variants: v, initial: 'oculto', animate: 'visible', exit: 'fuera' }) as const

  return (
    <div className="grid gap-3 md:grid-cols-12 md:gap-4">
      {/* La persona y su día: el centro del abanico. */}
      <motion.article {...props(0)} className={`${tarjeta} bg-[var(--arena)] p-5 md:col-span-5 md:p-6`}>
        <div className="flex items-center gap-4">
          <Retrato tipo={p.retrato} className="size-[64px] shrink-0 md:size-[76px]" />
          <div className="text-left">
            <p className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[var(--navy)] md:text-[25px]">{p.nombre}</p>
            <p className="text-[15px] leading-snug text-[var(--texto2)] md:text-[16px]">
              {p.oficio[0].toUpperCase() + p.oficio.slice(1)} en {p.lugar}
            </p>
          </div>
        </div>
        <ol className="relative mt-5 space-y-3 text-left md:mt-6 md:space-y-3.5">
          <span aria-hidden className="absolute bottom-2 left-[4px] top-2 w-px bg-[#e2d6c3]" />
          {p.dia.map((d, j) => (
            <motion.li key={d.hora} custom={j} variants={fila} initial="oculto" animate="visible" className="relative flex gap-3 pl-5">
              <span aria-hidden className="absolute left-0 top-[8px] size-[9px] rounded-full border-2 border-[var(--terra)] bg-[var(--arena)]" />
              <span className="w-[46px] shrink-0 text-[15px] font-semibold tabular-nums text-[var(--terra-hondo)]">{d.hora}</span>
              <span className="text-[15px] leading-[1.45] text-[var(--navy)] md:text-[15.5px]">{d.que}</span>
            </motion.li>
          ))}
        </ol>
      </motion.article>

      {/* Carreras del catálogo real. */}
      <motion.article {...props(1)} className={`${tarjeta} flex flex-col p-5 text-left md:col-span-4 md:p-6`}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[10px] bg-[var(--cielo)] text-[var(--ocean)]">
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" aria-hidden>
              <path d="M3 6.5 C6 5 9 5 12 6.8 C15 5 18 5 21 6.5 V19 C18 17.6 15 17.6 12 19.2 C9 17.6 6 17.6 3 19 Z" />
              <path d="M12 6.8 V19.2" />
            </svg>
          </span>
          <p className="text-[15px] font-semibold text-[var(--navy)]">Carreras para estudiar</p>
        </div>
        <ul className="mt-3 divide-y divide-[#eef1f5]">
          {interes.carreras.map((c) => (
            <li key={c} className="py-2.5 text-[17px] font-medium leading-snug tracking-[-0.015em] text-[var(--navy)] md:py-3 md:text-[18px]">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-2 text-[14px] leading-snug text-[var(--tenue)]">
          y {mas} más en {area}
        </p>
      </motion.article>

      <div className="grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-1 md:gap-4">
        <motion.article {...props(2)} className={`${tarjeta} p-4 text-left md:p-5`}>
          <span className="grid size-8 place-items-center rounded-[10px] bg-[var(--cielo)] text-[var(--ocean)]">
            <IconoEstudia className="size-[19px]" />
          </span>
          <p className="mt-3 text-[13.5px] text-[var(--tenue)]">Dónde se estudia</p>
          <p className="mt-0.5 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-[var(--navy)]">{interes.estudia.donde}</p>
          <p className="mt-1 text-[13.5px] leading-snug text-[var(--texto2)]">{interes.estudia.detalle}</p>
        </motion.article>
        <motion.article {...props(3)} className={`${tarjeta} p-4 text-left md:p-5`}>
          <span className="grid size-8 place-items-center rounded-[10px] bg-[var(--durazno)] text-[var(--terra-hondo)]">
            <IconoTrabaja interes={interes.id} className="size-[19px]" />
          </span>
          <p className="mt-3 text-[13.5px] text-[var(--tenue)]">Dónde se trabaja</p>
          <p className="mt-0.5 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-[var(--navy)]">{interes.trabaja}</p>
        </motion.article>
      </div>
    </div>
  )
}
