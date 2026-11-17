'use client'

import { motion, useReducedMotion } from 'motion/react'

/** Persona simple (cabeza + torso), en SVG. */
function Persona() {
  return (
    <svg viewBox="0 0 24 40" className="h-full w-full" aria-hidden>
      <circle cx="12" cy="7" r="6" fill="currentColor" />
      <path d="M2 38 V24 a10 10 0 0 1 20 0 V38 Z" fill="currentColor" />
    </svg>
  )
}

/**
 * El dolor en tres datos grandes, sin párrafos: los que abandonan, lo que
 * cuesta una cuota privada y lo que se pierde al elegir mal. Cuatro de
 * los diez chicos se encienden en terra, de a uno, cuando el bloque entra en pantalla.
 */
export function Dolor() {
  const quieto = useReducedMotion()
  return (
    <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
      <div className="tesela flex flex-col justify-between gap-8 rounded-[30px] bg-white p-7 sm:p-10">
        <p className="display text-[clamp(3.6rem,8vw,6.5rem)] leading-none">
          <strong className="text-[var(--terra)]">4</strong> de cada 10
        </p>
        <ol aria-hidden className="grid grid-cols-10 gap-1.5 sm:gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <motion.li
              key={i}
              className="aspect-[24/40]"
              initial={{ color: '#d9dee6', y: 0 }}
              whileInView={i < 4 ? { color: '#c97f5e', y: [0, -8, 0] } : undefined}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={quieto ? { duration: 0 } : { duration: 0.5, delay: 0.3 + i * 0.18 }}
            >
              <Persona />
            </motion.li>
          ))}
        </ol>
        <p className="text-[18px] text-[var(--texto2)]">
          ingresantes deja la carrera en el primer año.
          <span className="mt-1 block text-[12.5px] text-[var(--tenue)]">SPU, cohorte 2019 · vía iProfesional</span>
        </p>
      </div>

      <div className="grid gap-4">
        <div className="tesela flex flex-col justify-between gap-6 rounded-[30px] bg-[var(--terra)] p-7 text-white sm:p-9">
          <p className="text-[17px] text-white/85">Una universidad privada cuesta</p>
          <p className="display text-[clamp(2.2rem,4.2vw,3.4rem)] leading-none">
            <strong>$300 mil</strong> a <strong>$1,3 M</strong>
          </p>
          <p className="text-[17px] text-white/85">por mes.</p>
        </div>
        <div className="tesela flex items-center justify-between gap-6 rounded-[30px] bg-[var(--navy)] p-7 text-white sm:p-9">
          <div>
            <p className="display text-[clamp(2.6rem,5vw,4rem)] leading-none">
              <strong>1 año</strong>
            </p>
            <p className="mt-2 text-[17px] text-white/75">más esas cuotas, si después se cambia de carrera.</p>
          </div>
          <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0" aria-hidden>
            <rect x="8" y="12" width="48" height="44" rx="8" fill="none" stroke="#f5ede0" strokeWidth="4" />
            <line x1="8" y1="26" x2="56" y2="26" stroke="#f5ede0" strokeWidth="4" />
            <line x1="20" y1="6" x2="20" y2="16" stroke="#f5ede0" strokeWidth="4" strokeLinecap="round" />
            <line x1="44" y1="6" x2="44" y2="16" stroke="#f5ede0" strokeWidth="4" strokeLinecap="round" />
            <path d="M22 36 l20 14 M42 36 l-20 14" stroke="#c97f5e" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
