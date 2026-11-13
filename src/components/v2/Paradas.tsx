'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'

const N = 13

/**
 * Las 13 paradas del recorrido como una línea que se enciende con el scroll:
 * "dos semanas" dicho sin palabras. Sin movimiento, se ve completa.
 */
export function Paradas() {
  const ref = useRef<HTMLDivElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 45%'] })
  const largo = useTransform(scrollYProgress, [0, 1], [quieto ? 1 : 0, 1])
  const [encendidas, setEncendidas] = useState(quieto ? N : 0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!quieto) setEncendidas(Math.round(p * (N - 1)) + (p > 0.02 ? 1 : 0))
  })

  return (
    <div ref={ref} className="relative mx-auto max-w-[1080px]">
      <svg viewBox="0 0 1000 60" className="h-auto w-full overflow-visible" aria-hidden>
        <line x1="20" y1="30" x2="980" y2="30" stroke="rgba(15,31,54,0.1)" strokeWidth="2" />
        <motion.line
          x1="20" y1="30" x2="980" y2="30"
          stroke="url(#paradas-g)" strokeWidth="2" strokeLinecap="round"
          style={{ pathLength: largo }}
        />
        <defs>
          <linearGradient id="paradas-g" x1="0" x2="1">
            <stop offset="0" stopColor="#1e5ba0" />
            <stop offset="1" stopColor="#c97f5e" />
          </linearGradient>
        </defs>
        {Array.from({ length: N }, (_, i) => {
          const x = 20 + (960 / (N - 1)) * i
          const on = i < encendidas
          return (
            <g key={i}>
              {on && <circle cx={x} cy="30" r="14" fill={i === N - 1 ? 'rgba(201,127,94,0.22)' : 'rgba(30,91,160,0.14)'} />}
              <circle
                cx={x} cy="30" r={i === N - 1 ? 8 : 6}
                fill={on ? (i === N - 1 ? '#c97f5e' : '#1e5ba0') : '#ffffff'}
                stroke={on ? 'transparent' : 'rgba(15,31,54,0.25)'} strokeWidth="1.5"
                style={{ transition: 'fill .3s' }}
              />
            </g>
          )
        })}
      </svg>
      <div className="mt-5 flex justify-between text-[13px] text-[var(--tenue)]">
        <span className="etiqueta">Parada 1</span>
        <span className="etiqueta">Su informe</span>
      </div>
    </div>
  )
}
