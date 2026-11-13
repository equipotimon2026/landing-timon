'use client'

import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

/**
 * Las tres pantallas del informe apiladas en 3D (CSS, sin WebGL). Siguen al
 * mouse con un resorte suave; quietas si el sistema pide menos movimiento.
 */
const CAPAS = [
  { src: '/producto/universidades.jpg', w: 1100, h: 721, z: -140, x: 70, y: -70 },
  { src: '/producto/caminos-card.webp', w: 1620, h: 1020, z: -20, x: -30, y: 10 },
  { src: '/producto/esencia-card.webp', w: 1380, h: 1110, z: 120, x: -150, y: 90 },
]

export function Pila() {
  const quieto = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [30, 18]), { stiffness: 80, damping: 18 })
  const rz = useSpring(useTransform(mx, [-1, 1], [-14, -6]), { stiffness: 80, damping: 18 })

  return (
    <div
      className="relative mx-auto h-[420px] w-full max-w-[1000px] sm:h-[620px]"
      style={{ perspective: 2200 }}
      onPointerMove={(e) => {
        if (quieto) return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
        my.set(((e.clientY - r.top) / r.height) * 2 - 1)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: quieto ? 24 : rx, rotateZ: quieto ? -10 : rz, transformStyle: 'preserve-3d' }}
        initial={quieto ? false : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {CAPAS.map((c, i) => (
          <div
            key={c.src}
            className="absolute left-1/2 top-1/2 w-[64%] overflow-hidden rounded-[14px] bg-white"
            style={{
              transform: `translate3d(calc(-50% + ${c.x}px), calc(-50% + ${c.y}px), ${c.z}px)`,
              boxShadow: `0 0 0 1px rgba(15,31,54,.07), 0 ${30 + i * 20}px ${80 + i * 30}px -30px rgba(15,31,54,${0.28 + i * 0.08})`,
            }}
          >
            <Image src={c.src} alt="" width={c.w} height={c.h} sizes="640px" priority={i === 2} className="h-auto w-full" />
          </div>
        ))}
      </motion.div>
      <div aria-hidden className="absolute inset-x-[10%] bottom-0 h-16 rounded-[50%] bg-[radial-gradient(closest-side,rgba(15,31,54,0.18),transparent)] blur-xl" />
    </div>
  )
}
