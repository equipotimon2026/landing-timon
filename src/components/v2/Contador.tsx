'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/**
 * Número que sube hasta su valor la primera vez que entra en pantalla
 * (patrón NumberTicker de Magic UI, reescrito con motion). Sin movimiento
 * si el sistema lo pide. El valor final está en el HTML desde el servidor.
 */
export function Contador({ valor, prefijo = '' }: { valor: number; prefijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visto = useInView(ref, { once: true, margin: '-15% 0px' })
  const quieto = useReducedMotion()
  const fmt = (n: number) => prefijo + Math.round(n).toLocaleString('es-AR')

  useEffect(() => {
    if (!visto || quieto || !ref.current) return
    const el = ref.current
    const c = animate(0, valor, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = fmt(v)
      },
    })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visto, quieto, valor])

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(valor)}
    </span>
  )
}
