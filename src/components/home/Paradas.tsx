'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const N = 13

/** Las 13 paradas como puntos que se encienden en orden al entrar en pantalla. La última es el informe. */
export function Paradas() {
  const ref = useRef<HTMLOListElement>(null)
  const visto = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const quieto = useReducedMotion()
  const encendido = visto || quieto

  return (
    <ol ref={ref} aria-label="13 paradas" className="flex items-center gap-[6px]">
      {Array.from({ length: N }, (_, i) => {
        const ultima = i === N - 1
        return (
          <li
            key={i}
            className={`rounded-full transition-[background-color,transform] duration-500 ${ultima ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'}`}
            style={{
              backgroundColor: encendido ? (ultima ? '#c97f5e' : '#4f84c2') : 'rgba(255,255,255,0.14)',
              transitionDelay: quieto ? '0ms' : `${200 + i * 90}ms`,
            }}
          />
        )
      })}
    </ol>
  )
}
