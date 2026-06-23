'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

type Props = {
  to: number
  /** ms */
  duration?: number
  /** Renders this string while idle (before the counter triggers) */
  children?: React.ReactNode
}

// cubic-out easing
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 → `to` when first scrolled into view.
 * Integer output; the surrounding span styles the typography.
 */
export function AnimatedCounter({ to, duration = 1400, children }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 })
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return

    const tick = (now: number) => {
      if (startTime.current === null) startTime.current = now
      const elapsed = now - startTime.current
      const t = Math.min(elapsed / duration, 1)
      const v = Math.round(easeOutCubic(t) * to)
      setValue(v)
      if (t < 1) rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [inView, to, duration])

  return (
    <span ref={ref} aria-label={children ? undefined : String(to)}>
      {inView ? value : children ?? 0}
    </span>
  )
}
