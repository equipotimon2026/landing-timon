'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

function Palabra({ p, prog, desde, hasta }: { p: string; prog: MotionValue<number>; desde: number; hasta: number }) {
  const op = useTransform(prog, [desde, hasta], [0.14, 1])
  return (
    <motion.span style={{ opacity: op }} className="mr-[0.24em] inline-block">
      {p}
    </motion.span>
  )
}

/**
 * Una frase que se enciende palabra por palabra a medida que se baja (el
 * recurso de las páginas de producto de Apple). Sin movimiento, se ve entera.
 */
export function Revela({ texto, className = '' }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const palabras = texto.split(' ')
  if (quieto) return <p className={className}>{texto}</p>
  return (
    <p ref={ref} className={className} aria-label={texto}>
      {palabras.map((p, i) => (
        <Palabra key={i} p={p} prog={scrollYProgress} desde={i / palabras.length} hasta={(i + 1) / palabras.length} />
      ))}
    </p>
  )
}
