'use client'

import Image from 'next/image'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { MotionConfig, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { MacBook, IPhone } from './Dispositivos'
import { Dibujo, Nota, Trazo } from './Dibujo'

const SUAVE = [0.22, 1, 0.36, 1] as const
const RESORTE = { stiffness: 60, damping: 18, mass: 0.7 }

const TITULO_ANTES = ['Antes', 'de', 'elegir', 'carrera,', 'que', 'conozca']

/** Sticker de color que entra con un rebote. */
function Sticker({
  children,
  className,
  donde,
  giro,
  retraso,
}: {
  children: React.ReactNode
  className: string
  donde: string
  giro: number
  retraso: number
}) {
  return (
    <motion.span
      className={`absolute z-20 ${donde}`}
      initial={{ opacity: 0, scale: 0.4, rotate: giro * 3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 16, delay: retraso }}
    >
      <span className={`sticker ${className}`} style={{ '--giro': `${giro}deg` } as React.CSSProperties}>
        {children}
      </span>
    </motion.span>
  )
}

/**
 * El hero: titular grande a la izquierda y el producto real en escena a la
 * derecha (MacBook con el informe, iPhone con las áreas para investigar),
 * sobre formas orgánicas de la marca. Entrada coreografiada: palabras,
 * fondo, MacBook, iPhone, stickers y el dibujo a mano, en ese orden. Con el
 * mouse, cada capa se mueve un poco distinto (profundidad). Con menos
 * movimiento, MotionConfig apaga los desplazamientos.
 */
export function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, RESORTE)
  const sy = useSpring(my, RESORTE)
  const fondoX = useTransform(sx, (v) => v * -14)
  const fondoY = useTransform(sy, (v) => v * -10)
  const macX = useTransform(sx, (v) => v * 10)
  const macRotY = useTransform(sx, (v) => -9 + v * 4)
  const macRotX = useTransform(sy, (v) => 5 - v * 3)
  const telX = useTransform(sx, (v) => v * 22)
  const telY = useTransform(sy, (v) => v * 16)

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden px-5 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-14"
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
          my.set(((e.clientY - r.top) / r.height) * 2 - 1)
        }}
        onPointerLeave={() => {
          mx.set(0)
          my.set(0)
        }}
      >
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6">
          {/* ── Texto ─────────────────────────────────────────────────── */}
          <div className="relative z-10 text-center lg:text-left">
            <motion.p
              className="etiqueta inline-flex items-center gap-2 rounded-full bg-[var(--crema)] px-3.5 py-2 text-[var(--terra-hondo)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SUAVE }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--terra)]" aria-hidden />
              Para madres y padres
            </motion.p>

            <h1 className="display mx-auto mt-6 max-w-[13ch] text-[clamp(2.9rem,6.3vw,6rem)] lg:mx-0">
              {TITULO_ANTES.map((p, i) => (
                <motion.span
                  key={p}
                  className="inline-block"
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: SUAVE, delay: 0.08 + i * 0.06 }}
                >
                  {p}&nbsp;
                </motion.span>
              ))}
              <motion.span
                className="relative inline-block whitespace-nowrap font-semibold text-[var(--ocean)]"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: SUAVE, delay: 0.08 + TITULO_ANTES.length * 0.06 }}
              >
                el mundo.
                <Dibujo retraso={1.05} className="absolute -bottom-[0.16em] left-[-2%] h-[0.3em] w-[96%]">
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    <Trazo d="M4 15 C 70 6, 150 4, 214 8 S 284 15, 296 10" ancho={5} />
                    <Trazo d="M40 20 C 110 15, 200 14, 262 18" ancho={3} orden={1} />
                  </svg>
                </Dibujo>
              </motion.span>
            </h1>

            <motion.p
              className="mx-auto mt-7 max-w-[36ch] text-[18px] leading-[1.55] text-[var(--texto2)] sm:text-[20px] lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: SUAVE, delay: 0.6 }}
            >
              Timon le muestra a tu hijo o hija cómo es el trabajo de verdad, con una red de profesionales,
              universidades, empresas y eventos. Y lo acompaña a elegir.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: SUAVE, delay: 0.75 }}
            >
              <a href="#anotalo" className="btn group">
                Quiero que lo haga
                <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#app" className="link-flecha group text-[16px] text-[var(--ocean)]">
                Mirá la app por dentro
                <ArrowDown size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>

            <motion.p
              className="mt-6 text-[14px] text-[var(--tenue)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Empieza gratis · Desde casa · A su ritmo
            </motion.p>
          </div>

          {/* ── Escena del producto ───────────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none" style={{ perspective: 1800 }}>
            <motion.div aria-hidden className="absolute inset-0" style={{ x: fondoX, y: fondoY }}>
              <motion.span
                className="blob blob-vivo left-[8%] top-[2%] h-[86%] w-[84%] bg-[var(--cielo)]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: SUAVE, delay: 0.15 }}
              />
              <motion.span
                className="blob blob-vivo right-[-4%] top-[-6%] h-[42%] w-[38%] bg-[var(--durazno)] [animation-delay:-5s]"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: SUAVE, delay: 0.3 }}
              />
              <motion.span
                className="absolute bottom-[4%] left-[-3%] h-[22%] w-[22%] rounded-full bg-[var(--crema)]"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: SUAVE, delay: 0.4 }}
              />
              {/* Constelación de la red: puntos y líneas de la marca. */}
              <svg viewBox="0 0 100 100" className="absolute right-[2%] bottom-[6%] h-[26%] w-[26%] text-[var(--ocean)] opacity-40">
                <g stroke="currentColor" strokeWidth="0.8" fill="none">
                  <line x1="20" y1="70" x2="50" y2="40" />
                  <line x1="50" y1="40" x2="82" y2="58" />
                  <line x1="50" y1="40" x2="62" y2="12" />
                </g>
                <g fill="currentColor">
                  <circle cx="20" cy="70" r="3.5" />
                  <circle cx="50" cy="40" r="5" />
                  <circle cx="82" cy="58" r="3.5" />
                  <circle cx="62" cy="12" r="3" />
                </g>
              </svg>
            </motion.div>

            <div className="relative px-[4%] pb-[16%] pt-[10%] sm:pb-[12%]">
              <motion.div
                className="relative ml-auto w-[92%]"
                style={{ x: macX, rotateY: macRotY, rotateX: macRotX, transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 90, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: SUAVE, delay: 0.35 }}
              >
                <MacBook className="drop-shadow-[0_50px_60px_rgba(15,31,54,0.28)]">
                  <Image
                    src="/app/mac-informe.webp"
                    alt="El informe de Timon en una MacBook: la esencia de Sofía, con sus rasgos de Análisis a Expresión"
                    fill
                    priority
                    sizes="(min-width: 1024px) 640px, 90vw"
                    className="object-cover object-top"
                  />
                </MacBook>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-[1%] z-10 w-[29%]"
                style={{ x: telX, y: telY }}
                initial={{ opacity: 0, x: -50, y: 80, rotate: -14 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: -5 }}
                transition={{ duration: 1.1, ease: SUAVE, delay: 0.6 }}
              >
                <IPhone>
                  <Image
                    src="/app/iphone-investigacion.webp"
                    alt="En el celular: las áreas de trabajo para elegir y charlar con profesionales"
                    fill
                    sizes="(min-width: 1024px) 200px, 30vw"
                    className="object-cover object-top"
                  />
                </IPhone>
              </motion.div>

              <Sticker donde="left-[6%] top-[4%]" className="bg-[var(--terra)] text-white" giro={-6} retraso={1.0}>
                <span aria-hidden>✦</span> 300 carreras
              </Sticker>
              <Sticker donde="right-[-1%] top-[50%]" className="bg-[var(--ocean)] text-white" giro={5} retraso={1.12}>
                16 áreas de trabajo
              </Sticker>
              <Sticker donde="bottom-[3%] right-[16%]" className="bg-white text-[var(--navy)]" giro={-3} retraso={1.24}>
                <span className="h-2 w-2 rounded-full bg-[#2fa36b]" aria-hidden /> 50 universidades
              </Sticker>
            </div>

            <Dibujo retraso={1.7} className="absolute right-[-1%] top-[-3%] z-20 hidden h-[110px] w-[200px] xl:block">
              <Nota className="right-2 top-0 [--giro:5deg]">su informe, tal cual lo ve</Nota>
              <svg viewBox="0 0 200 110" className="absolute inset-0 h-full w-full overflow-visible">
                <Trazo d="M120 30 C 112 62, 92 82, 52 96" color="ocean" ancho={2.2} />
                <Trazo d="M66 84 L50 97 L69 104" color="ocean" ancho={2.2} orden={1.6} />
              </svg>
            </Dibujo>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
