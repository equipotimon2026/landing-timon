'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Dibujo, Trazo } from './Dibujo'

/**
 * La entrada para el chico, debajo del botón del hero.
 *
 * La home le habla al padre, que es quien paga, pero el chico también cae acá
 * (de un video, de un link que le mandaron). Facundo, 20/11/2026: "si soy un
 * pibe y entro acá, no sabría qué hacer". Entonces: un circulito dibujado a
 * mano, con su flechita, que lo lleva a /chicos — la misma página, contada
 * para él. Es a propósito un garabato y no un segundo botón: el CTA del padre
 * sigue siendo el único botón sólido de la pantalla.
 */

const SUAVE = [0.22, 1, 0.36, 1] as const

export function EntradaChicos() {
  const quieto = useReducedMotion()

  return (
    <motion.div
      className="mt-4 flex items-center justify-center sm:mt-5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={quieto ? { duration: 0 } : { duration: 0.9, ease: SUAVE, delay: 0.75 }}
    >
      {/* La flechita: del botón de arriba al circulito. */}
      <Dibujo retraso={1.1} className="h-[58px] w-[76px] shrink-0 sm:h-[66px] sm:w-[88px]">
        <svg viewBox="0 0 88 66" className="h-full w-full overflow-visible" aria-hidden>
          <Trazo d="M8 6 C 36 9, 57 25, 64 50" ancho={2.2} />
          <Trazo d="M51 41 L65 54 L75 39" ancho={2.2} orden={1.4} />
        </svg>
      </Dibujo>

      <Link
        href="/chicos"
        aria-label="Si sos un chico, tocá acá"
        className="group relative grid h-[104px] w-[104px] shrink-0 -rotate-[5deg] place-items-center rounded-full bg-white/70 text-[var(--terra-hondo)] backdrop-blur-sm transition-transform duration-300 hover:rotate-0 hover:scale-[1.06] focus-visible:rotate-0 focus-visible:scale-[1.06] motion-reduce:transition-none sm:h-[118px] sm:w-[118px]"
      >
        {/* El circulito, trazado como con marcador (se cierra de más, a mano). */}
        <Dibujo retraso={1.45} className="absolute inset-0">
          <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden>
            <Trazo
              d="M60 7 C 91 7, 113 29, 113 60 C 113 91, 91 113, 60 113 C 29 113, 7 91, 7 60 C 7 30, 28 8, 61 7 C 72 7, 83 10, 92 16"
              ancho={2.4}
            />
          </svg>
        </Dibujo>
        <span className="relative text-center font-[family-name:var(--font-mano)] text-[15px] font-bold leading-[1.15] sm:text-[17px]">
          si sos
          <br />
          un chico,
          <br />
          tocá acá
        </span>
      </Link>
    </motion.div>
  )
}
