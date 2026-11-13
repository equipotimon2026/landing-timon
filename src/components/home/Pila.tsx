'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

/**
 * Las tres pantallas del informe apiladas en 3D (CSS, sin WebGL). La pila se
 * va asentando con el scroll y se inclina siguiendo al mouse con un resorte.
 * Quieta si el sistema pide menos movimiento. Los corrimientos van en % de la
 * tarjeta y se achican en celular (--k) para no salirse de la pantalla.
 */
const CAPAS = [
  { src: '/producto/universidades.jpg', w: 1100, h: 721, z: -280, x: 20, y: -26, rotulo: 'Acto 3 · Dónde estudiarlo' },
  { src: '/producto/caminos-card.webp', w: 1620, h: 1020, z: -80, x: 3, y: -6, rotulo: 'Acto 2 · Sus caminos' },
  { src: '/producto/esencia-card.webp', w: 1380, h: 1110, z: 120, x: -14, y: 16, rotulo: 'Acto 1 · Quién es' },
]

const RESORTE = { stiffness: 70, damping: 20, mass: 0.6 }

export function Pila() {
  const quieto = useReducedMotion()
  const caja = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: caja, offset: ['start end', 'end start'] })

  const base = useTransform(scrollYProgress, [0.35, 0.85], [28, 8], { clamp: true })
  const rx = useSpring(useTransform(() => base.get() + my.get() * 5), RESORTE)
  const rz = useSpring(useTransform(() => -10 + mx.get() * 4), RESORTE)
  const sube = useTransform(scrollYProgress, [0.35, 0.85], [0, -40], { clamp: true })

  return (
    <div
      ref={caja}
      className="relative mx-auto h-[330px] w-full max-w-[1100px] [--k:0.7] sm:h-[620px] sm:[--k:1]"
      style={{ perspective: 2200 }}
      onPointerMove={(e) => {
        if (quieto || e.pointerType !== 'mouse') return
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
        style={{
          rotateX: quieto ? 22 : rx,
          rotateZ: quieto ? -10 : rz,
          y: quieto ? 0 : sube,
          transformStyle: 'preserve-3d',
        }}
        initial={quieto ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={quieto ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {CAPAS.map((c, i) => (
          <div
            key={c.src}
            className="absolute left-1/2 top-1/2 w-[70%] sm:w-[52%]"
            style={{
              transform: `translate3d(calc(-50% + ${c.x}% * var(--k)), calc(-50% + ${c.y}% * var(--k)), calc(${c.z}px * var(--k)))`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="overflow-hidden rounded-[14px] bg-white"
              style={{
                boxShadow: `0 0 0 1px rgba(15,31,54,.07), 0 ${24 + i * 22}px ${70 + i * 34}px -28px rgba(15,31,54,${0.26 + i * 0.09})`,
              }}
            >
              <Image
                src={c.src}
                alt=""
                width={c.w}
                height={c.h}
                sizes="(min-width: 640px) 620px, 80vw"
                priority={i === 2}
                className="h-auto w-full"
              />
            </div>
            <span className="absolute -top-9 left-1 hidden whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[12.5px] font-semibold text-[var(--texto2)] shadow-[0_0_0_1px_rgba(15,31,54,.08),0_8px_20px_-10px_rgba(15,31,54,.3)] lg:block">
              {c.rotulo}
            </span>
          </div>
        ))}
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-x-[12%] bottom-2 h-14 rounded-[50%] bg-[radial-gradient(closest-side,rgba(15,31,54,0.16),transparent)] blur-xl"
      />
    </div>
  )
}
