'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, CodeXml, PenTool, Stethoscope, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion, type Transition } from 'motion/react'
import { CTA_TEXTO } from '@/components/home/Cta'
import { Isotipo } from '@/components/home/Isotipo'
import { trazarRed, type Red, type Via } from './red'
import { IconoDestino } from './iconos'

const SUAVE = [0.22, 1, 0.36, 1] as const

/** Los tres profesionales de la pregunta, con el tono de su tarjeta en la sección siguiente. */
const PROFESIONES: [LucideIcon, string, string][] = [
  [CodeXml, 'var(--cielo)', 'var(--ocean)'],
  [Stethoscope, 'var(--durazno)', 'var(--terra-hondo)'],
  [PenTool, 'var(--crema)', 'var(--navy)'],
]

type Medidas ={ ancho: number; alto: number; textoAbajo: number; textoMitad: number }

/** Mide el hero y el bloque de texto para que el mapa lo rodee sin tocarlo. */
function useMedidas() {
  const seccion = useRef<HTMLElement>(null)
  const titular = useRef<HTMLHeadingElement>(null)
  const boton = useRef<HTMLDivElement>(null)
  const [medidas, setMedidas] = useState<Medidas | null>(null)
  useLayoutEffect(() => {
    const s = seccion.current
    const t = titular.current
    const b = boton.current
    if (!s || !t || !b) return
    const medir = () => {
      // offset* y no getBoundingClientRect: el texto todavía puede estar subiendo con su animación.
      const bloque = b.offsetParent as HTMLElement | null
      setMedidas({
        ancho: s.clientWidth,
        alto: s.clientHeight,
        textoAbajo: (bloque?.offsetTop ?? 0) + b.offsetTop + b.offsetHeight,
        textoMitad: t.offsetWidth / 2,
      })
    }
    medir()
    // Las fuentes cambian el alto del bloque de texto sin cambiar el ancho del titular.
    let vivo = true
    document.fonts?.ready.then(() => vivo && medir())
    const ro = new ResizeObserver(medir)
    ro.observe(s)
    ro.observe(t)
    ro.observe(b)
    return () => {
      vivo = false
      ro.disconnect()
    }
  }, [])
  return { seccion, titular, boton, medidas }
}

/**
 * La vía resaltada: la más cercana al mouse o, si nadie lo mueve, una que va
 * rotando sola cada tanto para que el mapa no quede quieto.
 */
function useViaActiva(red: Red | null, caminos: React.RefObject<Map<string, SVGPathElement>>, quieto: boolean | null) {
  const [activa, setActiva] = useState<string | null>(null)
  const muestras = useRef<{ id: string; x: number; y: number }[]>([])
  const ultimoMovimiento = useRef(0)

  useEffect(() => {
    if (!red) return
    const pts: { id: string; x: number; y: number }[] = []
    for (const via of red.vias) {
      const p = caminos.current.get(via.id)
      if (!p) continue
      const largo = p.getTotalLength()
      // Desde el tramo en que la vía ya se separó del haz.
      for (let l = largo * 0.35; l <= largo; l += 10) {
        const q = p.getPointAtLength(l)
        pts.push({ id: via.id, x: q.x, y: q.y })
      }
    }
    muestras.current = pts
  }, [red, caminos])

  useEffect(() => {
    if (!red || quieto) return
    const ids = red.vias.map((v) => v.id)
    let i = 0
    const t = setInterval(() => {
      if (performance.now() - ultimoMovimiento.current < 3500) return
      i = (i + 5) % ids.length
      setActiva(ids[i])
    }, 2600)
    return () => clearInterval(t)
  }, [red, quieto])

  const mover = useCallback((x: number, y: number) => {
    ultimoMovimiento.current = performance.now()
    let mejor: string | null = null
    let dist = 90 * 90
    for (const m of muestras.current) {
      const d = (m.x - x) ** 2 + (m.y - y) ** 2
      if (d < dist) {
        dist = d
        mejor = m.id
      }
    }
    setActiva(mejor)
  }, [])

  return { activa, mover }
}

/**
 * Hero B · El camino. Sobre navy con una trama de puntos, el titular y un
 * mapa de vías que nace del timón y se abre hacia 16 destinos (uno por área
 * de trabajo). El tronco baja hasta una tarjeta que se corta en el borde y
 * deja la pregunta que responde la sección siguiente.
 */
export function HeroCamino() {
  const quieto = useReducedMotion()
  const T = (t: Transition): Transition => (quieto ? { duration: 0 } : t)
  const { seccion, titular, boton, medidas } = useMedidas()
  const red = useMemo(() => (medidas ? trazarRed(medidas) : null), [medidas])
  const caminos = useRef(new Map<string, SVGPathElement>())
  const { activa, mover } = useViaActiva(red, caminos, quieto)

  // Las vías empiezan a dibujarse cuando el timón termina de girar.
  const inicio = 0.55
  const retraso = (v: Via) => inicio + v.orden * 0.12 + (v.lado > 0 ? 0.05 : 0)
  const duracion = 1.15

  const viaActiva = red?.vias.find((v) => v.id === activa)
  // Como un volante: hacia la derecha gira en sentido horario, y más cuanto más lejos queda el destino.
  const giro = viaActiva && medidas ? viaActiva.lado * (18 + (24 * Math.abs(viaActiva.llegada.y - (red?.nudo.y ?? 0))) / medidas.alto) : 0

  return (
    <section
      ref={seccion}
      className="relative isolate z-10 h-[calc(100svh-3.5rem)] min-h-[660px] overflow-x-clip bg-[var(--navy)] text-white"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !seccion.current) return
        const r = seccion.current.getBoundingClientRect()
        mover(e.clientX - r.left, e.clientY - r.top)
      }}
    >
      {/* Trama de puntos y una luz ocean detrás del titular. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(223,234,246,0.16)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#000_30%,transparent_85%)]" />
        <div className="absolute left-1/2 top-[-30%] h-[90%] w-[min(1100px,120%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(30,91,160,0.45),transparent)]" />
      </div>

      {red && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" width={medidas?.ancho} height={medidas?.alto}>
          <defs>
            <linearGradient id="b-tronco" x1="0" y1={red.nudo.y} x2="0" y2={red.pieza} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8fbcf0" />
              <stop offset="1" stopColor="#e8a283" />
            </linearGradient>
          </defs>
          {red.vias.map((v) => {
            const on = activa === v.id
            return (
              <motion.path
                key={v.id}
                ref={(el: SVGPathElement | null) => {
                  if (el) caminos.current.set(v.id, el)
                  else caminos.current.delete(v.id)
                }}
                d={v.d}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'stroke 0.35s, stroke-width 0.35s, opacity 0.35s' }}
                stroke={on ? '#e8a283' : '#dfeaf6'}
                strokeWidth={on ? 2 : 1.25}
                opacity={on ? 1 : activa ? 0.22 : 0.34}
                pathLength={1}
                strokeDasharray="1 2"
                initial={quieto ? false : { strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={T({ duration: duracion, ease: SUAVE, delay: retraso(v) })}
              />
            )
          })}
          <motion.path
            d={red.tronco}
            stroke="url(#b-tronco)"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            strokeDasharray="1 2"
            initial={quieto ? false : { strokeDashoffset: 1 }}
            animate={{ strokeDashoffset: 0 }}
            transition={T({ duration: 0.9, ease: SUAVE, delay: inicio + 0.9 })}
          />
          {!quieto && (
            <circle r={3.5} fill="#f5ede0">
              <animateMotion dur="2.8s" begin="2.2s" repeatCount="indefinite" path={red.tronco} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
              <animate attributeName="opacity" dur="2.8s" begin="2.2s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.15;0.8;1" />
            </circle>
          )}
          {red.vias.map((v) => (
            <motion.circle
              key={`e${v.id}`}
              cx={v.llegada.x}
              cy={v.llegada.y}
              r={3}
              fill={activa === v.id ? '#e8a283' : '#9fb8d6'}
              initial={quieto ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={T({ duration: 0.3, delay: retraso(v) + duracion * 0.85 })}
            />
          ))}
        </svg>
      )}

      {/* El timón, en el nudo. Gira de plano, sin 3D. */}
      {red && (
        <motion.div
          aria-hidden
          className="absolute grid place-items-center rounded-full bg-[var(--navy)] text-[var(--crema)]"
          style={{
            left: red.nudo.x - red.radioNudo * 1.5,
            top: red.nudo.y - red.radioNudo * 1.5,
            width: red.radioNudo * 3,
            height: red.radioNudo * 3,
          }}
          initial={quieto ? false : { rotate: -120, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={T({ duration: 1.1, ease: SUAVE })}
        >
          {/* Y después timonea: gira un poco hacia la vía resaltada. */}
          <motion.div animate={{ rotate: quieto ? 0 : giro }} transition={{ type: 'spring', stiffness: 70, damping: 14 }}>
            <Isotipo size={red.radioNudo * 2.3} trazo={3.2} />
          </motion.div>
        </motion.div>
      )}

      {/* Los destinos, como tarjetas-nodo. */}
      {red?.vias.map((v) => {
        const on = activa === v.id
        return (
          <motion.div
            key={`t${v.id}`}
            className={`absolute flex items-center gap-2 whitespace-nowrap rounded-[10px] border font-medium tracking-[-0.01em] backdrop-blur-sm transition-[background-color,border-color,color] duration-300 ${
              red.compacta ? 'h-8 px-2.5 text-[12.5px]' : 'h-10 gap-2.5 px-3 text-[14.5px]'
            } ${on ? 'border-[#e8a283]/70 bg-white/[0.12] text-white' : 'border-white/[0.09] bg-[#12264a]/70 text-white/70'}`}
            style={{
              left: v.llegada.x,
              top: v.llegada.y,
              translate: v.lado < 0 ? '-100% -50%' : '0 -50%',
            }}
            initial={quieto ? false : { opacity: 0, x: v.lado * -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={T({ duration: 0.5, ease: SUAVE, delay: retraso(v) + duracion * 0.8 })}
          >
            {!red.compacta && <IconoDestino icono={v.destino.icono} />}
            {v.destino.texto}
          </motion.div>
        )
      })}

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pt-[34px] text-center sm:pt-[9svh]">
        <motion.h1
          ref={titular}
          className="max-w-[13.5ch] text-[clamp(2.2rem,4.7vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.045em] [text-wrap:balance] sm:max-w-[14ch]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T({ duration: 0.9, ease: SUAVE, delay: 0.1 })}
        >
          Antes de elegir su camino, que conozca{' '}
          <span className="bg-[linear-gradient(90deg,#8fbcf0,#e8a283)] bg-clip-text text-transparent">el&nbsp;mundo&nbsp;real</span>.
        </motion.h1>
        <motion.p
          className="mt-4 max-w-[46ch] text-[16px] leading-[1.5] text-white/70 sm:mt-5 sm:text-[18px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T({ duration: 0.8, ease: SUAVE, delay: 0.3 })}
        >
          En dos semanas y desde casa, tu hijo conoce profesionales, carreras, universidades y empresas. Después elige con criterio.
        </motion.p>
        <motion.div
          ref={boton}
          className="mt-6 sm:mt-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T({ duration: 0.8, ease: SUAVE, delay: 0.45 })}
        >
          <Link href="/#anotalo" className="btn btn-terra group">
            {CTA_TEXTO}
            <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Una nota a mano, en terra: el detalle humano del mapa. */}
      {red && !red.compacta && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-10 text-[#e8a283]"
          style={{ left: red.nudo.x + 34, top: red.nudo.y + 44 }}
          initial={quieto ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={T({ duration: 0.6, delay: inicio + 1.9 })}
        >
          <svg width="64" height="44" viewBox="0 0 64 44" fill="none" className="absolute -left-10 -top-9">
            <motion.path
              d="M58 36 C40 40 22 34 14 14 M14 14 L8 24 M14 14 L23 19"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1 2"
              initial={quieto ? false : { strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={T({ duration: 0.7, ease: 'easeOut', delay: inicio + 1.9 })}
            />
          </svg>
          <p className="ml-7 mt-1 -rotate-3 whitespace-nowrap font-[family-name:var(--font-mano)] text-[19px] leading-[1.15]">
            tu hijo hoy:
            <br />
            17 años y mil caminos
          </p>
        </motion.div>
      )}

      {/* La pieza que asoma: la pregunta que responde la sección siguiente. */}
      {red && (
        <motion.a
          href="#un-dia"
          className="group absolute left-1/2 z-10 block w-[min(640px,calc(100%-32px))] -translate-x-1/2 rounded-[20px] border border-white/20 bg-white px-5 pb-4 pt-5 text-left text-[var(--navy)] shadow-[0_-24px_70px_-24px_rgba(143,188,240,0.5),0_30px_60px_-30px_rgba(15,31,54,0.35)] sm:px-7 sm:pb-5 sm:pt-6"
          style={{ top: red.pieza }}
          initial={quieto ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={T({ duration: 0.9, ease: SUAVE, delay: inicio + 1.5 })}
        >
          <span className="flex items-start gap-4">
            <span className="mt-0.5 flex shrink-0 -space-x-2">
              {PROFESIONES.map(([Icono, fondo, tinta], i) => (
                <span
                  key={i}
                  className="grid size-8 place-items-center rounded-[10px] ring-[3px] ring-white sm:size-9"
                  style={{ background: fondo, color: tinta }}
                >
                  <Icono size={17} aria-hidden />
                </span>
              ))}
            </span>
            <span className="text-[16.5px] font-semibold leading-[1.25] tracking-[-0.025em] [text-wrap:balance] sm:text-[21px]">
              ¿Sabe tu hijo cómo es un día de un ingeniero, una médica o un diseñador?
            </span>
          </span>
          <span className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--borde)] pt-3">
            <span className="font-[family-name:var(--font-mano)] text-[17px] text-[var(--terra-hondo)] sm:text-[18px]">Spoiler: no se parece a las series.</span>
            <span className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--ocean)]">
              Miralo
              <ArrowDown size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
          </span>
        </motion.a>
      )}
    </section>
  )
}
