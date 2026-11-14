'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Recorte } from '../app-a/Recorte'
import { CORTES } from './datos'

/** Lo que hoy junta una familia para decidir, desparramado. */
const PIEZAS = [
  { texto: 'Folletos de diez universidades', x: -36, y: -18, r: -6 },
  { texto: 'Un test online de diez minutos', x: 30, y: -22, r: 5 },
  { texto: 'Lo que le dijo un amigo', x: -40, y: 14, r: 4 },
  { texto: 'Una charla en el colegio', x: 34, y: 16, r: -5 },
  { texto: 'Videos sueltos en redes', x: -6, y: -6, r: 2 },
  { texto: 'Lo que estudió un primo', x: 6, y: 28, r: -3 },
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
      className="absolute left-1/2 top-1/2 -ml-[95px] -mt-[30px] flex h-[60px] w-[190px] text-[14px] sm:-ml-[130px] sm:w-[260px] items-center justify-center rounded-[10px] bg-white px-4 text-center font-medium sm:text-[15px] text-[var(--navy)] ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_18px_40px_-26px_rgba(15,31,54,0.4)]"
    >
      {p.texto}
    </motion.li>
  )
}

/**
 * La sección de Ramp "sistemas que nunca se hablaron → ahora cantan juntos":
 * queda fija mientras se hace scroll y las piezas sueltas se juntan en una
 * sola, el informe de Timon. Con menos movimiento se ve directo el final.
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
  const informeY = useTransform(scrollYProgress, [0.55, 0.75], [60, 0])

  if (quieto) {
    return (
      <section className="mx-auto max-w-[1440px] px-5 py-24 text-center lg:px-16">
        <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-medium tracking-[-0.04em] text-[var(--navy)]">Con Timon, en un solo lugar.</h2>
        <div className="mx-auto mt-10 max-w-[560px] overflow-hidden rounded-[12px] ring-1 ring-[var(--borde)]">
          <Recorte corte={CORTES.esencia} alt="El informe de Timon" sizes="560px" />
        </div>
      </section>
    )
  }

  return (
    <section ref={caja} className="relative h-[260vh]">
      <div className="sticky top-16 flex h-[calc(100svh-64px)] flex-col items-center overflow-hidden px-5 pt-14 text-center">
        <div className="relative h-[110px] w-full max-w-[900px]">
          <motion.div style={{ opacity: antes }} className="absolute inset-0">
            <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-medium tracking-[-0.04em] text-[var(--navy)]">Hoy, todo está desparramado.</h2>
            <p className="mt-3 text-[16px] text-[var(--tenue)]">Así se ve elegir carrera con lo que hay a mano.</p>
          </motion.div>
          <motion.div style={{ opacity: despues }} className="absolute inset-0">
            <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-medium tracking-[-0.04em] text-[var(--navy)]">Con Timon, en un solo lugar.</h2>
            <p className="mt-3 text-[16px] text-[var(--tenue)]">Quién es, qué carreras van con él y dónde estudiarlas, en su informe.</p>
          </motion.div>
        </div>
        <ul className="relative w-full flex-1">
          {PIEZAS.map((p, i) => (
            <Pieza key={p.texto} p={p} avance={scrollYProgress} i={i} escala={escala} />
          ))}
          <motion.li
            style={{ opacity: despues, y: informeY }}
            className="absolute left-1/2 top-[8%] w-[min(560px,88vw)] -translate-x-1/2 overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_30px_60px_-34px_rgba(15,31,54,0.45)]"
          >
            <Recorte corte={CORTES.esencia} alt="El informe de Timon: los rasgos de un alumno" sizes="560px" />
          </motion.li>
        </ul>
      </div>
    </section>
  )
}
