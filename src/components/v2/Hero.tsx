'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { URL_EMPEZAR } from '@/lib/landing'

// La red se carga después del primer pintado: el titular (el LCP) no la espera.
const Red = dynamic(() => import('./Red').then((m) => m.Red), { ssr: false })

const TITULAR = 'Que elija su camino conociendo el mundo.'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const apaga = useTransform(scrollYProgress, [0, 0.9], [1, quieto ? 1 : 0.15])
  const baja = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : 120])

  return (
    <section ref={ref} className="relative isolate min-h-[1060px] overflow-hidden sm:min-h-[980px] lg:min-h-[100svh]">
      {/* Un lavado de ocean apenas visible detrás de la red */}
      <div aria-hidden className="pointer-events-none absolute -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(30,91,160,0.10),transparent)] [right:2%] [top:14%] max-lg:[left:calc(50%-310px)] max-lg:[top:46%]" />

      <motion.div style={{ opacity: apaga, y: baja }} className="absolute inset-0 -z-10">
        <Red className="h-full w-full" />
      </motion.div>
      {/* Que el texto siempre se lea sobre la red */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.88)_34%,transparent_62%)] max-lg:bg-[linear-gradient(180deg,#fff_0%,rgba(255,255,255,0.86)_44%,transparent_64%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent" />

      <div className="mx-auto flex max-w-[1280px] flex-col px-5 pt-36 sm:px-8 lg:min-h-[100svh] lg:justify-center lg:pt-24">
        <p className="etiqueta text-[var(--rumbo)]">Para madres y padres</p>
        <h1 className="display mt-6 max-w-[11ch] text-[clamp(3.1rem,7.6vw,6.6rem)]">
          {TITULAR.split(' ').map((p, i) => (
            <motion.span
              key={i}
              className="mr-[0.22em] inline-block pb-[0.08em]"
              initial={quieto ? false : { opacity: 0, y: '0.3em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {p}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="mt-7 max-w-[30ch] text-[19px] leading-[1.55] text-[var(--texto2)]"
          initial={quieto ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
          initial={quieto ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          <a href="#anotalo" className="btn">
            Quiero que mi hijo lo haga
          </a>
          <a
            href={URL_EMPEZAR}
            className="text-[15px] text-[var(--texto2)] underline decoration-[var(--borde2)] underline-offset-[6px] transition-colors hover:text-[var(--rumbo)] hover:decoration-[var(--rumbo)]"
          >
            ¿Sos estudiante? Empezá gratis
          </a>
        </motion.div>
      </div>
    </section>
  )
}
