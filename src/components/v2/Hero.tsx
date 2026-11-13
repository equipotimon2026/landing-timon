'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Isotipo } from './Isotipo'
import { URL_EMPEZAR } from '@/lib/landing'

const TITULAR = 'Que elija su camino conociendo el mundo.'

/**
 * El hero. Una sola entrada orquestada (el titular palabra por palabra y la
 * foto) y el timón del logo que gira mientras se baja: es el objeto de la
 * marca, no un 3D genérico, y pesa unos bytes.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const giro = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : 140])
  const subeFoto = useTransform(scrollYProgress, [0, 1], [0, quieto ? 0 : -60])

  const palabras = TITULAR.split(' ')

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <p className="etiqueta text-[var(--grafito)]">Para madres y padres</p>
          <h1 className="display mt-6 text-[clamp(3rem,7.4vw,6.2rem)]">
            {palabras.map((p, i) => (
              <motion.span
                key={i}
                className="mr-[0.22em] inline-block"
                initial={quieto ? false : { opacity: 0, y: '0.35em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {p}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-7 max-w-[30ch] text-[19px] leading-[1.55] text-[var(--tinta2)] sm:text-[20px]"
            initial={quieto ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
            initial={quieto ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a href="#anotalo" className="btn">
              Quiero que mi hijo lo haga
            </a>
            <a
              href={URL_EMPEZAR}
              className="text-[15px] font-medium text-[var(--tinta2)] underline decoration-[var(--linea-fuerte)] underline-offset-[6px] transition-colors hover:decoration-[var(--rumbo)]"
            >
              ¿Sos estudiante? Empezá gratis
            </a>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            style={{ y: subeFoto }}
            initial={quieto ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_40px_90px_-40px_rgba(15,31,54,0.55)] sm:aspect-[5/5] lg:aspect-[4/5]"
          >
            <Image
              src="/marca/familia.jpg"
              alt="Una madre y su hijo miran juntos el recorrido de Timon en una tablet, en la cocina de su casa"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-[60%_50%]"
            />
          </motion.div>
          <motion.div
            style={{ rotate: giro }}
            className="absolute -bottom-7 -left-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--papel)] text-[var(--rumbo)] shadow-[0_18px_40px_-18px_rgba(15,31,54,0.5)] sm:-left-8 sm:h-28 sm:w-28"
            aria-hidden
          >
            <Isotipo size={64} trazo={3.4} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
