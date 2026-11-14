'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Transition } from 'motion/react'
import { MacBook } from './Dispositivos'
import { CTA_TEXTO } from './Cta'

/** El hero 3D (three.js) baja en su propio chunk y solo en el cliente. */
const Escena3D = dynamic(() => import('./hero3d/Escena'), { ssr: false })

const SUAVE = [0.22, 1, 0.36, 1] as const
const RESORTE = { stiffness: 60, damping: 18, mass: 0.7 }

/**
 * ¿Este equipo banca el hero 3D? No en celulares de gama baja, ni con ahorro
 * de datos, ni sin WebGL. Safari no informa la memoria: se asume suficiente.
 */
function equipoBanca3D() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return false
  const tactil = window.matchMedia('(pointer: coarse)').matches
  const nucleos = nav.hardwareConcurrency ?? 4
  const memoria = nav.deviceMemory ?? 8
  if (tactil ? nucleos < 6 || memoria < 4 : nucleos < 4) return false
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Decide si se monta el canvas 3D (cuando la página quedó libre) y si tiene
 * que dibujar (solo con el hero a la vista).
 */
function useHero3D(seccion: React.RefObject<HTMLElement | null>, quieto: boolean | null) {
  const [montar, setMontar] = useState(false)
  const [activo, setActivo] = useState(true)
  useEffect(() => {
    if (quieto || !equipoBanca3D()) return
    const listo = () => setMontar(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(listo, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(listo, 900)
    return () => clearTimeout(id)
  }, [quieto])
  useEffect(() => {
    const el = seccion.current
    if (!el || !montar) return
    const io = new IntersectionObserver(([e]) => setActivo(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [seccion, montar])
  return { montar, activo }
}

/**
 * El hero: un titular, una línea, un botón y un solo protagonista, la MacBook
 * con el informe real. La sección mide casi dos pantallas y la escena queda
 * fija: al bajar, el texto se va y la MacBook se abre hasta mostrar el informe
 * de frente. Con WebGL la MacBook es 3D (hero3d/Escena); si el equipo no lo
 * banca o el usuario pidió menos movimiento, queda la versión en DOM.
 */
export function Hero() {
  const quieto = useReducedMotion()
  const T = (t: Transition): Transition => (quieto ? { duration: 0 } : t)
  const seccion = useRef<HTMLElement>(null)
  const { montar, activo } = useHero3D(seccion, quieto)
  const [listo, setListo] = useState(false)
  const onListo = useCallback(() => setListo(true), [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, RESORTE)
  const sy = useSpring(my, RESORTE)

  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end end'] })
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.3], [1, quieto ? 1 : 0])
  const textoY = useTransform(scrollYProgress, [0, 0.3], [0, quieto ? 0 : -60])
  const macEscala = useTransform(scrollYProgress, [0, 0.8], [1, quieto ? 1 : 1.06])
  const macY = useTransform(scrollYProgress, [0, 0.8], ['0%', quieto ? '0%' : '-52%'])

  return (
    <section
      ref={seccion}
      className={quieto ? 'relative' : 'relative h-[185svh]'}
      onPointerMove={(e) => {
        if (quieto || e.pointerType !== 'mouse') return
        mx.set((e.clientX / window.innerWidth) * 2 - 1)
        my.set((e.clientY / window.innerHeight) * 2 - 1)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] min-h-[600px] flex-col overflow-hidden">
        {/* Una sola luz detrás del producto; el resto es blanco. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-25%] mx-auto h-[80%] w-[min(1200px,140%)] rounded-[50%] bg-[radial-gradient(closest-side,var(--cielo),transparent)]"
        />

        {montar && (
          <div
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-700 ${listo ? 'opacity-100' : 'opacity-0'}`}
          >
            <Escena3D mx={sx} my={sy} progreso={scrollYProgress} activo={activo} onListo={onListo} />
          </div>
        )}

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pt-[7svh] text-center sm:pt-[8svh]"
          style={{ opacity: textoOpacidad, y: textoY }}
        >
          <motion.h1
            className="display mx-auto max-w-[18ch] text-[clamp(2.4rem,5.6vw,5.2rem)]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T({ duration: 1, ease: SUAVE })}
          >
            Antes de elegir, que vea hacia dónde va <span className="font-semibold text-[var(--ocean)]">el&nbsp;mundo</span>.
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-[42ch] text-[17px] leading-[1.5] text-[var(--texto2)] sm:mt-6 sm:text-[20px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T({ duration: 0.9, ease: SUAVE, delay: 0.25 })}
          >
            Profesionales, universidades y empresas lo ayudan a entender qué hay ahí afuera y a elegir con criterio.
          </motion.p>
          <motion.div
            className="mt-7 sm:mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T({ duration: 0.9, ease: SUAVE, delay: 0.4 })}
          >
            <a href="#anotalo" className="btn group">
              {CTA_TEXTO}
              <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* El protagonista. */}
        <div className="relative flex-1 pointer-events-none">
          <motion.div
            className="absolute inset-x-0 top-[5svh] mx-auto w-[min(90vw,860px)] origin-top"
            style={{ scale: macEscala, y: macY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: listo ? 0 : 1 }}
            transition={T({ duration: listo ? 0.5 : 1.2, ease: SUAVE, delay: listo ? 0 : 0.2 })}
          >
            <MacBook className="drop-shadow-[0_50px_60px_rgba(15,31,54,0.22)]">
              <Image
                src="/app/mac-informe.webp"
                alt="El informe de Timon en una MacBook: la esencia de Sofía, con sus rasgos de Análisis a Expresión"
                fill
                preload
                sizes="(min-width: 1024px) 860px, 92vw"
                className="object-cover object-top"
              />
            </MacBook>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
