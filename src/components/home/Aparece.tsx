'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'

/**
 * Sube y aparece la primera vez que entra en pantalla. El estado inicial vive
 * en CSS (home.css) detrás de prefers-reduced-motion: no-preference, así quien
 * pide menos movimiento ve todo quieto y visible desde el primer render.
 */
export function Aparece({
  children,
  className = '',
  retraso = 0,
}: {
  children: React.ReactNode
  className?: string
  retraso?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  return (
    <div
      ref={ref}
      data-visto={visto ? '' : undefined}
      className={`aparece ${className}`}
      style={retraso ? { transitionDelay: `${retraso}s` } : undefined}
    >
      {children}
    </div>
  )
}
