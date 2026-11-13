'use client'

import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'

/**
 * Scroll suave con Lenis, solo para esta página. Quien pidió menos
 * movimiento en el sistema (prefers-reduced-motion) recibe el scroll nativo.
 */
export function Suave({ children }: { children: React.ReactNode }) {
  const [activo, setActivo] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setActivo(!mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  // Lenis va al lado de la página, no envolviéndola: así prenderlo después de
  // hidratar no vuelve a montar todo el árbol.
  return (
    <>
      {activo && <ReactLenis root options={{ lerp: 0.11, smoothWheel: true, anchors: { offset: -80 } }} />}
      {children}
    </>
  )
}
