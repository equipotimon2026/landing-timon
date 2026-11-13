'use client'

import { useEffect, useRef } from 'react'

/**
 * La red, generativa: el chico en el centro y, alrededor, lo que Timon le
 * acerca (profesionales, universidades, empresas, eventos, carreras,
 * colegios). Partículas que derivan y se conectan cuando están cerca, pulsos
 * de luz que viajan del centro a cada nodo, y el mouse que tira de la red.
 *
 * Canvas 2D (sin WebGL): pesa unos pocos KB, corre a 60 fps en un celular y
 * se frena cuando sale de pantalla o la pestaña no se ve. Con
 * prefers-reduced-motion dibuja un solo cuadro quieto.
 */

const NODOS = ['Profesionales', 'Universidades', 'Empresas', 'Eventos', 'Carreras', 'Colegios']

type P = { x: number; y: number; vx: number; vy: number; r: number }

export function Red({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fuente = getComputedStyle(document.documentElement).getPropertyValue('--font-jakarta').trim() || 'system-ui'
    let w = 0
    let h = 0
    let dpr = 1
    let parts: P[] = []
    let raf = 0
    let visible = true
    let t0 = performance.now()
    const mouse = { x: -9999, y: -9999 }

    const medir = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cant = w < 640 ? 38 : 80
      parts = Array.from({ length: cant }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    // En desktop la red vive a la derecha del titular; en el celular, abajo.
    const hubs = (t: number) => {
      const cx = w * (w < 1024 ? 0.5 : 0.7)
      const cy = h * (w < 640 ? 0.79 : w < 1024 ? 0.76 : 0.52)
      const R = Math.min(w, h) * (w < 640 ? 0.36 : 0.32)
      return {
        cx,
        cy,
        pts: NODOS.map((n, i) => {
          const a = (i / NODOS.length) * Math.PI * 2 - Math.PI / 2 + t * 0.00004
          const rr = R * (1 + 0.06 * Math.sin(t * 0.0006 + i * 1.7))
          // en el celular la red es más angosta, para que las etiquetas no se corten
          const ex = w < 640 ? 0.74 : 1
          return { n, x: cx + Math.cos(a) * rr * ex, y: cy + Math.sin(a) * rr * 0.82 }
        }),
      }
    }

    const dibujar = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const LIM = w < 640 ? 90 : 130

      // Partículas y sus conexiones
      for (const p of parts) {
        if (!quieto) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 140 * 140) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.06
            p.vx += (dx / 140) * f
            p.vy += (dy / 140) * f
          }
          p.vx *= 0.99
          p.vy *= 0.99
          p.x += p.vx + Math.sign(p.vx) * 0.05
          p.y += p.vy + Math.sign(p.vy) * 0.05
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i]
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LIM) {
            ctx.strokeStyle = `rgba(30,91,160,${(1 - d / LIM) * 0.16})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = 'rgba(15,31,54,0.28)'
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // El centro y los nodos
      const { cx, cy, pts } = hubs(t)
      pts.forEach((p, i) => {
        const g = ctx.createLinearGradient(cx, cy, p.x, p.y)
        g.addColorStop(0, 'rgba(15,31,54,0.45)')
        g.addColorStop(1, 'rgba(30,91,160,0.28)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        // pulso que viaja del centro al nodo
        const k = quieto ? 0.6 : ((t * 0.00035 + i / pts.length) % 1)
        const px = cx + (p.x - cx) * k
        const py = cy + (p.y - cy) * k
        const halo = ctx.createRadialGradient(px, py, 0, px, py, 10)
        halo.addColorStop(0, i % 3 === 2 ? 'rgba(201,127,94,0.95)' : 'rgba(30,91,160,0.9)')
        halo.addColorStop(1, 'rgba(30,91,160,0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(px, py, 10, 0, Math.PI * 2)
        ctx.fill()

        // nodo
        ctx.fillStyle = '#ffffff'
        ctx.strokeStyle = 'rgba(15,31,54,0.55)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.font = `400 ${w < 640 ? 11 : 13}px ${fuente}`
        ctx.fillStyle = 'rgba(15,31,54,0.75)'
        ctx.textAlign = p.x < cx - 4 ? 'right' : p.x > cx + 4 ? 'left' : 'center'
        ctx.textBaseline = 'middle'
        const off = ctx.textAlign === 'center' ? 0 : ctx.textAlign === 'left' ? 12 : -12
        ctx.fillText(p.n, p.x + off, p.y + (ctx.textAlign === 'center' ? (p.y < cy ? -16 : 16) : 0))
      })

      // el chico
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60)
      aura.addColorStop(0, 'rgba(30,91,160,0.28)')
      aura.addColorStop(1, 'rgba(30,91,160,0)')
      ctx.fillStyle = aura
      ctx.beginPath()
      ctx.arc(cx, cy, 60, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#0f1f36'
      ctx.beginPath()
      ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.font = `500 ${w < 640 ? 12 : 14}px ${fuente}`
      ctx.textAlign = 'center'
      ctx.fillStyle = '#0f1f36'
      ctx.fillText('Tu hijo', cx, cy + 26)
    }

    const loop = (t: number) => {
      if (visible && !document.hidden) dibujar(t - t0)
      raf = requestAnimationFrame(loop)
    }

    medir()
    const ro = new ResizeObserver(() => {
      medir()
      if (quieto) dibujar(0)
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)
    const mover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const salir = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    if (quieto) {
      dibujar(0)
    } else {
      t0 = performance.now()
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', mover, { passive: true })
      document.addEventListener('pointerleave', salir)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', mover)
      document.removeEventListener('pointerleave', salir)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label="Una red: tu hijo en el centro, conectado con profesionales, universidades, empresas, eventos, carreras y colegios"
    />
  )
}
