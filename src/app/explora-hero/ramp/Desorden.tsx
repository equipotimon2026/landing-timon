'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { CharlaMini, LugaresMini, UniversidadMini } from './Piezas'

const TITULO = 'mx-auto max-w-[24ch] text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--navy)]'
const BAJADA = 'mt-3 text-[16.5px] text-[var(--tenue)]'

/** Lo que hoy junta una familia para decidir, desparramado. */
const PIEZAS = [
  { texto: 'Folletos de diez universidades', x: -34, y: -14, r: -6 },
  { texto: 'Un test online de diez minutos', x: 30, y: -16, r: 5 },
  { texto: 'Lo que le dijo un amigo', x: -38, y: 10, r: 4 },
  { texto: 'Una charla en el colegio', x: 34, y: 12, r: -5 },
  { texto: 'Videos sueltos en redes', x: -4, y: -2, r: 2 },
  { texto: 'Lo que estudió un primo', x: 6, y: 18, r: -3 },
]

function Pieza({ p, avance, i, escala }: { p: (typeof PIEZAS)[number]; avance: MotionValue<number>; i: number; escala: number }) {
  const fin = 0.55 + i * 0.03
  const x = useTransform(avance, [0.1, fin], [`${p.x * escala}vw`, '0vw'])
  const y = useTransform(avance, [0.1, fin], [`${p.y}vh`, '0vh'])
  const rotate = useTransform(avance, [0.1, fin], [p.r, 0])
  const opacity = useTransform(avance, [fin - 0.08, fin + 0.04], [1, 0])
  return (
    <motion.li
      style={{ x, y, rotate, opacity }}
      className="absolute left-1/2 top-[45%] -ml-[95px] -mt-[30px] flex h-[60px] w-[190px] text-[14px] sm:-ml-[130px] sm:w-[260px] items-center justify-center rounded-[10px] bg-white px-4 text-center font-medium sm:text-[15px] text-[var(--navy)] ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_18px_40px_-26px_rgba(15,31,54,0.4)]"
    >
      {p.texto}
    </motion.li>
  )
}

/** La red: tres piezas del mismo tamaño, cada una con algo legible de la app. */
const RED = [
  { titulo: 'Profesionales', texto: 'De 16 áreas, para preguntarles lo que quiera.', Pieza: CharlaMini },
  { titulo: 'Universidades', texto: 'Comparadas por cuota, modalidad y zona.', Pieza: UniversidadMini },
  // [CONFIRMAR] empresas: hoy es "dónde se trabaja" por área, sin empresas con nombre.
  { titulo: 'Empresas', texto: 'Los lugares donde se trabaja en cada área.', Pieza: LugaresMini },
]

function Red() {
  return (
    <>
      {RED.map(({ titulo, texto, Pieza }) => (
        <figure key={titulo} className="flex h-[300px] flex-col overflow-hidden rounded-[14px] bg-white text-left ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_30px_60px_-36px_rgba(15,31,54,0.4)]">
          <div className="min-h-0 flex-1 overflow-hidden">
            <Pieza />
          </div>
          <figcaption className="border-t border-[var(--borde)] px-4 py-3">
            <span className="block text-[15px] font-semibold text-[var(--primario)]">{titulo}</span>
            <span className="block text-[13.5px] text-[var(--tenue)]">{texto}</span>
          </figcaption>
        </figure>
      ))}
    </>
  )
}

/**
 * La sección de Ramp "sistemas que nunca se hablaron → ahora cantan juntos":
 * queda fija mientras se hace scroll y las piezas sueltas se juntan en una
 * sola: la red de Timon. Con menos movimiento se ve directo el final.
 */
export function Desorden() {
  const caja = useRef<HTMLElement>(null)
  const quieto = useReducedMotion()
  const [escala, setEscala] = useState(1)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const leer = () => setEscala(mq.matches ? 0.55 : 1)
    leer()
    mq.addEventListener('change', leer)
    return () => mq.removeEventListener('change', leer)
  }, [])
  const { scrollYProgress } = useScroll({ target: caja, offset: ['start start', 'end end'] })
  const antes = useTransform(scrollYProgress, [0.3, 0.42], [1, 0])
  const despues = useTransform(scrollYProgress, [0.5, 0.62], [0, 1])
  const redY = useTransform(scrollYProgress, [0.5, 0.7], [50, 0])

  if (quieto) {
    return (
      <section className="mx-auto max-w-[1100px] px-5 py-24 text-center lg:px-16">
        <h2 className={TITULO}>Con Timon, conectado con quienes lo viven.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Red />
        </div>
      </section>
    )
  }

  return (
    <section ref={caja} className="relative h-[220vh]">
      <div className="sticky top-16 flex h-[calc(100svh-64px)] flex-col items-center justify-center overflow-hidden px-5 py-10 text-center">
        <div className="relative h-[150px] w-full max-w-[1000px] shrink-0 sm:h-[130px]">
          <motion.div style={{ opacity: antes }} className="absolute inset-0">
            <h2 className={TITULO}>Solo, es muy difícil seguirle el ritmo.</h2>
            <p className={BAJADA}>Así se ve elegir carrera con lo que hay a mano.</p>
          </motion.div>
          <motion.div style={{ opacity: despues }} className="absolute inset-0">
            <h2 className={TITULO}>Con Timon, conectado con quienes lo viven.</h2>
            <p className={BAJADA}>Profesionales, universidades y los lugares donde se trabaja, en un solo recorrido.</p>
          </motion.div>
        </div>
        <div className="relative mt-6 h-[min(440px,56svh)] w-full max-w-[1100px] sm:h-[min(340px,52svh)]">
          <ul className="absolute inset-0">
            {PIEZAS.map((p, i) => (
              <Pieza key={p.texto} p={p} avance={scrollYProgress} i={i} escala={escala} />
            ))}
          </ul>
          <motion.div style={{ opacity: despues, y: redY }} className="absolute inset-x-0 top-0 grid gap-4 max-sm:[&>figure:nth-child(n+2)]:hidden sm:grid-cols-3">
            <Red />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
