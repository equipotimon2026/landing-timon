'use client'

import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Lienzo de coordenadas fijas (ancho × alto de diseño) que se escala para
 * entrar en el ancho disponible. Así las líneas y las tarjetas comparten un
 * mismo sistema de coordenadas sin depender del tamaño de la pantalla.
 */
export function Escenario({
  ancho,
  alto,
  max = 1,
  className = '',
  children,
}: {
  ancho: number
  alto: number
  max?: number
  className?: string
  children: React.ReactNode
}) {
  const caja = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(0)

  useLayoutEffect(() => {
    const el = caja.current
    if (!el) return
    const medir = () => {
      const w = el.clientWidth
      if (w > 0) setEscala(Math.min(max, w / ancho))
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ancho, max])

  return (
    <div ref={caja} className={className} style={{ height: escala ? alto * escala : undefined, aspectRatio: escala ? undefined : `${ancho} / ${alto}` }}>
      <div
        className="relative origin-top-left"
        style={{ width: ancho, height: alto, transform: `scale(${escala || 1})`, marginLeft: escala ? `calc((100% - ${ancho * escala}px) / 2)` : 0, visibility: escala ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </div>
  )
}
