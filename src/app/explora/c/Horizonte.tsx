'use client'

import { motion, useReducedMotion } from 'motion/react'

/**
 * Arte propio de la exploración C: un horizonte con el sol saliendo y un
 * camino punteado que se dibuja desde el chico hasta el sol. Colores del
 * Brand Kit: ocean de fondo, cream el sol, terra y ocean light las colinas.
 */
const AREAS = ['Salud', 'Diseño', 'Derecho', 'Tecnología', 'Negocios', 'Ingeniería']

export function Horizonte() {
  const quieto = useReducedMotion()
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] bg-[#1e5ba0] sm:aspect-[5/5]">
      <svg viewBox="0 0 500 560" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* sol */}
        <motion.g
          initial={quieto ? false : { y: 70 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="330" cy="230" r="120" fill="#f5ede0" />
          <circle cx="330" cy="230" r="150" fill="none" stroke="#f5ede0" strokeOpacity=".25" strokeWidth="2" />
          <circle cx="330" cy="230" r="185" fill="none" stroke="#f5ede0" strokeOpacity=".12" strokeWidth="2" />
        </motion.g>
        {/* colinas */}
        <path d="M0 360 C 120 300, 220 330, 320 300 S 460 280, 500 300 L 500 560 L 0 560 Z" fill="#4f84c2" />
        <path d="M0 420 C 140 380, 260 430, 380 390 S 480 380, 500 390 L 500 560 L 0 560 Z" fill="#c97f5e" />
        <path d="M0 480 C 120 460, 280 500, 500 460 L 500 560 L 0 560 Z" fill="#0f1f36" />
        {/* el camino */}
        <motion.path
          d="M110 540 C 140 480, 90 450, 160 420 S 260 380, 240 340 S 300 300, 320 250"
          fill="none"
          stroke="#f5ede0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 14"
          initial={quieto ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
        <circle cx="110" cy="540" r="10" fill="#f5ede0" />
      </svg>
      {/* las áreas, flotando */}
      <ul className="absolute inset-x-6 top-6 flex flex-wrap gap-2 sm:inset-x-8 sm:top-8">
        {AREAS.map((a, i) => (
          <motion.li
            key={a}
            initial={quieto ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
            className="rounded-full bg-[rgba(245,237,224,0.16)] px-3.5 py-1.5 text-[14px] font-bold text-[#f5ede0] backdrop-blur-sm"
          >
            {a}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
