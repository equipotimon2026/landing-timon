'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'

/**
 * Detalle dibujado a mano: los trazos del SVG se dibujan solos la primera vez
 * que entran en pantalla y la nota aparece después. La animación vive en
 * home.css detrás de prefers-reduced-motion: no-preference; con menos
 * movimiento se ve ya dibujado. Cada <path> lleva pathLength={1}.
 */
export function Dibujo({
  children,
  className = '',
  retraso = 0,
}: {
  children: React.ReactNode
  className?: string
  retraso?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const visto = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return (
    <span
      ref={ref}
      aria-hidden
      data-visto={visto ? '' : undefined}
      className={`dibujo pointer-events-none block ${className}`}
      style={{ '--d': `${retraso}s` } as React.CSSProperties}
    >
      {children}
    </span>
  )
}

/** Trazo de marcador: redondeado, sin relleno, en terra u ocean. */
export function Trazo({
  d,
  orden = 0,
  ancho = 3,
  color = 'terra',
}: {
  d: string
  orden?: number
  ancho?: number
  color?: 'terra' | 'ocean'
}) {
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={color === 'terra' ? '#c97f5e' : '#1e5ba0'}
      strokeWidth={ancho}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      style={{ '--p': orden } as React.CSSProperties}
    />
  )
}

/** Nota manuscrita corta (Kalam). */
export function Nota({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`nota absolute whitespace-nowrap font-[family-name:var(--font-mano)] text-[19px] leading-none text-[var(--rumbo)] ${className}`}>
      {children}
    </span>
  )
}
