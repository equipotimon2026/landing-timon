'use client'

import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { CTA_TEXTO } from '@/components/home/Cta'
import { Dibujo, Nota, Trazo } from '@/components/home/Dibujo'
import { Avatar } from './Avatar'
import { ABANICO, type Persona } from './futuros'

const SUAVE = [0.16, 1, 0.3, 1] as const
const RESORTE = { stiffness: 50, damping: 20, mass: 0.8 }
/** Ángulo entre tarjeta y tarjeta del abanico. */
const PASO = 17

function Tarjeta({ p, i, quieto, mx }: { p: Persona; i: number; quieto: boolean; mx: MotionValue<number> }) {
  const lado = i - (ABANICO.length - 1) / 2
  const distancia = Math.abs(lado)
  // Con el mouse, las tarjetas de los costados se abren un poco más.
  const giro = useTransform(mx, (v) => lado * PASO + v * lado * 1.2)
  return (
    <motion.div
      className="absolute left-1/2 top-0 -ml-[105px] w-[210px] md:-ml-[130px] md:w-[260px]"
      style={{ transformOrigin: '50% var(--r)', zIndex: 10 - distancia, rotate: giro }}
      initial={{ opacity: 0, y: 160 }}
      animate={{ opacity: 1, y: 0 }}
      transition={quieto ? { duration: 0 } : { duration: 1.3, ease: SUAVE, delay: 0.15 + distancia * 0.12 }}
    >
      <motion.article
        className="overflow-hidden rounded-[24px] bg-white transition-[translate] duration-500 ease-out hover:-translate-y-2 text-[var(--navy)] shadow-[0_24px_50px_-22px_rgba(4,10,22,0.5),0_0_0_1px_rgba(15,31,54,0.06)]"
        initial={{ rotate: -lado * PASO }}
        animate={{ rotate: 0 }}
        transition={quieto ? { duration: 0 } : { duration: 1.3, ease: SUAVE, delay: 0.15 + distancia * 0.12 }}
      >
        <div className="relative flex h-[118px] items-end justify-center md:h-[150px]" style={{ background: p.rasgos.fondo }}>
          <Avatar rasgos={{ ...p.rasgos, fondo: 'transparent' }} size={118} className="translate-y-[1px] md:size-[150px]" />
        </div>
        <div className={`px-4 pb-5 pt-3.5 md:px-5 md:pt-4 ${lado > 0 ? "text-right" : ""}`}>
          <p className="text-[16px] font-semibold leading-tight tracking-[-0.015em] md:text-[18px]">
            {p.nombre}, {p.edad}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-[var(--texto2)] md:text-[14.5px]">{p.rol}</p>
          <p className="mt-3 border-t border-[var(--borde)] pt-3 text-[12.5px] leading-snug text-[var(--tenue)] md:text-[13.5px]">
            Estudió <span className="text-[var(--navy)]">{p.estudio}</span>
          </p>
        </div>
      </motion.article>
    </motion.div>
  )
}

/**
 * El timón de la marca (aro, rayos y manijas con un punto en la punta), tan
 * grande que su centro queda debajo del abanico: las tarjetas se abren
 * siguiendo sus rayos y asoman dos manijas a los costados. Entra girando.
 */
function Timon({ quieto }: { quieto: boolean }) {
  const angulos = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => k * 45 + 22.5)
  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      className="absolute left-1/2 top-[calc(1200px+var(--r))] size-[var(--timon)] -translate-x-1/2 -translate-y-1/2 text-[var(--cielo)]"
      initial={{ rotate: -40, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={quieto ? { duration: 0 } : { duration: 2.4, ease: SUAVE }}
      aria-hidden
    >
      <circle r="58" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="0.12" />
      {angulos.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="6" x2="58" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.1" strokeDasharray="0.35 0.7" />
          <line x1="58" x2="62.8" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.12" strokeLinecap="round" />
          <circle cx="63.2" r="0.42" fill="currentColor" fillOpacity="0.45" />
        </g>
      ))}
    </motion.svg>
  )
}

/**
 * Hero A · el abanico de futuros. Bloque navy con una trama de puntos, titular
 * centrado y, como gran pieza, un abanico de profesionales ficticios que se
 * abre sobre el timón de la marca y cruza el borde hacia la sección clara.
 */
export function HeroAbanico() {
  const quieto = useReducedMotion() ?? false
  const mx = useMotionValue(0)
  const sx = useSpring(mx, RESORTE)

  return (
    <section
      aria-labelledby="hero-a-titulo"
      className="relative overflow-x-clip bg-[var(--arena)] [--fondo:190px] [--r:640px] [--timon:2400px] md:[--fondo:250px] md:[--r:900px] md:[--timon:3310px]"
      onPointerMove={(e) => {
        if (quieto || e.pointerType !== 'mouse') return
        mx.set((e.clientX / window.innerWidth) * 2 - 1)
      }}
      onPointerLeave={() => mx.set(0)}
    >
      {/* El bloque navy termina a mitad del abanico. */}
      <div aria-hidden className="absolute inset-x-0 top-0 bottom-[var(--fondo)] bg-[#0c1a2e]">
        <div className="abanico-trama absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-[70%] w-[min(1100px,120%)] rounded-t-[50%] bg-[radial-gradient(closest-side,rgba(30,91,160,0.45),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-5 pt-12 text-center md:pt-[clamp(3.5rem,8svh,6rem)]">
        <h1
          id="hero-a-titulo"
          className="abanico-entra mx-auto max-w-[14ch] text-[clamp(2.5rem,6vw,5.4rem)] font-normal leading-[1.02] tracking-[-0.05em] text-white [text-wrap:balance] md:max-w-[17ch]"
          style={{ '--retraso': '0.05s' } as React.CSSProperties}
        >
          Antes de elegir carrera, que conozca el <span className="abanico-palabra font-semibold">mundo real</span>.
        </h1>
        <p
          className="abanico-entra mx-auto mt-5 max-w-[46ch] text-[16px] leading-[1.55] text-[#c5d2e3] md:mt-6 md:text-[18.5px]"
          style={{ '--retraso': '0.2s' } as React.CSSProperties}
        >
          En dos semanas y desde casa, tu hijo charla con profesionales y recorre carreras y universidades para elegir
          sabiendo de qué se trata.
        </p>
        <div
          className="abanico-entra mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9"
          style={{ '--retraso': '0.32s' } as React.CSSProperties}
        >
          <Link href="/#anotalo" className="btn btn-terra group">
            {CTA_TEXTO}
            <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="#como"
            className="inline-flex min-h-[54px] items-center gap-2 rounded-full px-6 text-[16px] font-semibold text-[#dfe7f1] transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            Ver cómo funciona
            <ArrowDown size={17} aria-hidden />
          </a>
        </div>
      </div>

      <div aria-hidden className="relative mx-auto mt-10 [&_article]:pointer-events-auto h-[400px] max-w-[1400px] md:mt-[clamp(3.5rem,8svh,5.5rem)] md:h-[510px]">
        {/* El timón se recorta donde termina el navy. */}
        <div className="pointer-events-none absolute inset-x-0 -top-[1200px] bottom-[var(--fondo)] overflow-hidden">
          <Timon quieto={quieto} />
        </div>
        {ABANICO.map((p, i) => (
          <Tarjeta key={p.id} p={p} i={i} quieto={quieto} mx={sx} />
        ))}
        <Dibujo className="absolute left-[calc(50%+200px)] top-[-150px] hidden h-[170px] w-[240px] lg:block" retraso={1.4}>
          <svg viewBox="0 0 240 170" className="absolute inset-0 size-full overflow-visible">
            <Trazo d="M62 44 C 30 60, 22 100, 34 128 C 38 138, 40 146, 38 158" ancho={2.5} />
            <Trazo d="M28 148 L 38 160 L 48 149" ancho={2.5} orden={1} />
          </svg>
          <Nota className="left-[70px] top-[18px] !text-[24px] !text-[#f0b494] [--giro:-5deg]">¿Y si es por acá?</Nota>
        </Dibujo>
      </div>
    </section>
  )
}
