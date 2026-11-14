'use client'

import { useEffect } from 'react'
import 'lenis/dist/lenis.css'

/**
 * Scroll suave con Lenis, sincronizado con el ScrollTrigger de GSAP (el
 * recorrido fijo de la app lo usa). Se carga en diferido después del primer
 * render y no se activa si el sistema pide menos movimiento ni en pantallas
 * táctiles (ahí el scroll nativo ya es suave y más fluido). Las anclas (#…)
 * las resuelve Lenis, respetando el scroll-margin-top de cada sección.
 */
export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let limpiar: (() => void) | undefined
    let cancelado = false

    ;(async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelado) return
      gsap.registerPlugin(ScrollTrigger)
      document.documentElement.style.scrollBehavior = 'auto'
      const lenis = new Lenis({ anchors: true, lerp: 0.11 })
      lenis.on('scroll', ScrollTrigger.update)
      const tic = (t: number) => lenis.raf(t * 1000)
      gsap.ticker.add(tic)
      gsap.ticker.lagSmoothing(0)
      limpiar = () => {
        gsap.ticker.remove(tic)
        lenis.destroy()
        document.documentElement.style.scrollBehavior = ''
      }
    })()

    return () => {
      cancelado = true
      limpiar?.()
    }
  }, [])

  return null
}
