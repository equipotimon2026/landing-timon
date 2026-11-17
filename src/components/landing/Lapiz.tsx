'use client'

/**
 * La capa "de lápiz" de la home: subrayados y resaltados a mano
 * (rough-notation), flechas dibujadas con notas manuscritas y el mapa del hero
 * (motion). Todo se dibuja una sola vez, cuando entra en pantalla, y queda
 * quieto si el sistema pide menos movimiento.
 */

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { annotate } from 'rough-notation'

const NAVY = '#1a2640'
const AZUL = '#3b5fd4'
const RESALTADOR = '#fdf0a0'

type TipoAnotacion = 'underline' | 'highlight' | 'circle' | 'box'

/** Envuelve un texto y le dibuja encima un trazo a mano cuando se ve. */
export function Anotado({
  children,
  tipo = 'underline',
  color,
  demora = 0,
  className = '',
}: {
  children: ReactNode
  tipo?: TipoAnotacion
  color?: string
  demora?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const visto = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const quieto = useReducedMotion()

  useEffect(() => {
    if (!visto || !ref.current) return
    const a = annotate(ref.current, {
      type: tipo,
      color: color ?? (tipo === 'highlight' ? RESALTADOR : AZUL),
      strokeWidth: tipo === 'underline' ? 3 : 2,
      padding: tipo === 'highlight' ? [2, 3] : tipo === 'underline' ? [0, 2] : 8,
      iterations: tipo === 'highlight' ? 1 : 2,
      multiline: true,
      animate: !quieto,
      animationDuration: tipo === 'highlight' ? 700 : 900,
    })
    const t = window.setTimeout(() => a.show(), quieto ? 0 : demora)
    return () => {
      window.clearTimeout(t)
      a.remove()
    }
  }, [visto, tipo, color, demora, quieto])

  return (
    <span ref={ref} className={`relative z-[1] ${className}`}>
      {children}
    </span>
  )
}

/** Texto con las partes entre ==dobles iguales== resaltadas a mano. */
export function Resaltado({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(==[^=]+==)/g).map((parte, i) =>
        parte.startsWith('==') ? (
          <Anotado key={i} tipo="highlight" demora={150 * i} className="font-medium">
            {parte.slice(2, -2)}
          </Anotado>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Flechas                                                             */
/* ------------------------------------------------------------------ */

const FLECHAS = {
  /** De arriba a la derecha hacia abajo a la izquierda. */
  'baja-izquierda': { viewBox: '0 0 110 80', cuerpo: 'M100 10 C 78 2, 34 8, 22 62', punta: 'M10 50 L22 66 L35 54' },
  /** De la izquierda hacia la derecha, con una panza hacia arriba. */
  derecha: { viewBox: '0 0 120 50', cuerpo: 'M6 34 C 34 8, 78 6, 110 26', punta: 'M96 14 L111 27 L94 35' },
  /** De abajo hacia arriba, levemente curva. */
  sube: { viewBox: '0 0 60 90', cuerpo: 'M40 84 C 18 62, 18 34, 28 10', punta: 'M16 20 L28 7 L38 22' },
  /** De la izquierda hacia abajo a la derecha. */
  'baja-derecha': { viewBox: '0 0 110 80', cuerpo: 'M10 10 C 32 2, 76 8, 88 62', punta: 'M75 54 L88 66 L100 50' },
} as const

export type DireccionFlecha = keyof typeof FLECHAS

export function Flecha({
  direccion,
  className = '',
  color = NAVY,
  demora = 0,
}: {
  direccion: DireccionFlecha
  className?: string
  color?: string
  demora?: number
}) {
  const ref = useRef<SVGSVGElement>(null)
  const visto = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const quieto = useReducedMotion()
  const f = FLECHAS[direccion]
  const trazo = {
    stroke: color,
    strokeWidth: 2.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }
  const dibujado = quieto || visto

  return (
    <svg ref={ref} viewBox={f.viewBox} className={className} aria-hidden="true">
      <motion.path
        d={f.cuerpo}
        {...trazo}
        initial={{ pathLength: quieto ? 1 : 0 }}
        animate={{ pathLength: dibujado ? 1 : 0 }}
        transition={{ duration: 0.7, delay: demora, ease: 'easeInOut' }}
      />
      <motion.path
        d={f.punta}
        {...trazo}
        initial={{ pathLength: quieto ? 1 : 0 }}
        animate={{ pathLength: dibujado ? 1 : 0 }}
        transition={{ duration: 0.25, delay: demora + 0.65, ease: 'easeOut' }}
      />
    </svg>
  )
}

/** Una nota manuscrita al margen. */
export function Nota({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`block text-[21px] leading-[1.15] tracking-normal text-[var(--m-navy)] ${className}`}
      style={{ fontFamily: 'var(--font-mano), cursive' }}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* El mapa del hero                                                    */
/* ------------------------------------------------------------------ */

type Parada = { x: number; y: number; texto: string; tx: number; ty: number; ancla: 'start' | 'middle' | 'end'; en: number }

type Plano = {
  viewBox: string
  garabato: string
  ruta: string
  inicio: { x: number; y: number; ancla: 'start' | 'middle' | 'end' }
  dudas: { x: number; y: number; giro: number }[]
  paradas: Parada[]
  rueda: { x: number; y: number; r: number }
  fin: { x: number; y: number; ancla: 'start' | 'middle' | 'end' }
  letra: number
}

/** Escritorio: de izquierda a derecha. */
const ANCHO: Plano = {
  viewBox: '0 0 1000 270',
  garabato:
    'M74 150 C 62 108, 132 98, 138 136 C 144 176, 80 184, 84 144 C 88 106, 154 116, 148 158 C 142 196, 94 182, 104 132 C 112 100, 162 120, 154 150',
  ruta: 'M154 150 C 222 168, 258 112, 320 116 C 392 120, 432 190, 520 182 C 602 174, 640 102, 720 106 C 790 110, 818 138, 856 138',
  inicio: { x: 112, y: 226, ancla: 'middle' },
  dudas: [
    { x: 44, y: 104, giro: -14 },
    { x: 168, y: 92, giro: 12 },
  ],
  paradas: [
    { x: 320, y: 116, texto: 'Tu perfil', tx: 320, ty: 84, ancla: 'middle', en: 0.22 },
    { x: 520, y: 182, texto: 'Tus carreras', tx: 520, ty: 226, ancla: 'middle', en: 0.52 },
    { x: 720, y: 106, texto: 'Dónde estudiarlas', tx: 720, ty: 74, ancla: 'middle', en: 0.8 },
  ],
  rueda: { x: 898, y: 138, r: 40 },
  fin: { x: 898, y: 214, ancla: 'middle' },
  letra: 27,
}

/** Mobile: de arriba hacia abajo, con las etiquetas siempre a la derecha. */
const ALTO: Plano = {
  viewBox: '0 0 340 440',
  garabato:
    'M52 58 C 44 28, 96 22, 100 50 C 104 78, 58 84, 60 56 C 62 30, 110 38, 106 66 C 102 92, 66 84, 72 50 C 76 30, 112 42, 104 70',
  ruta: 'M104 70 C 100 100, 80 125, 90 150 C 100 185, 140 195, 130 230 C 120 265, 80 275, 90 310 C 100 345, 160 368, 204 368',
  inicio: { x: 128, y: 58, ancla: 'start' },
  dudas: [{ x: 22, y: 30, giro: -14 }],
  paradas: [
    { x: 90, y: 150, texto: 'Tu perfil', tx: 114, ty: 158, ancla: 'start', en: 0.2 },
    { x: 130, y: 230, texto: 'Tus carreras', tx: 154, ty: 238, ancla: 'start', en: 0.5 },
    { x: 90, y: 310, texto: 'Dónde estudiarlas', tx: 114, ty: 318, ancla: 'start', en: 0.78 },
  ],
  rueda: { x: 240, y: 368, r: 34 },
  fin: { x: 240, y: 430, ancla: 'middle' },
  letra: 22,
}

const T_GARABATO = 0.9
const T_RUTA = 1.9

function Plano({ p, className }: { p: Plano; className: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const visto = useInView(ref, { once: true })
  const quieto = useReducedMotion()
  const on = quieto || visto
  const d = (s: number) => (quieto ? 0 : s)
  const finRuta = T_GARABATO + T_RUTA
  const mascara = `ruta-${p.viewBox.replace(/\s/g, '-')}`
  const rayos = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4)
  const texto = { fontFamily: 'var(--font-mano)', fill: NAVY, fontSize: p.letra }

  return (
    <svg ref={ref} viewBox={p.viewBox} className={className} role="img" aria-label="De no saber qué estudiar a tu decisión: tu perfil, tus carreras y dónde estudiarlas.">
      <defs>
        {/* La ruta es punteada: la dibuja una máscara sólida que avanza. */}
        <mask id={mascara} maskUnits="userSpaceOnUse">
          <motion.path
            d={p.ruta}
            stroke="#fff"
            strokeWidth={14}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: quieto ? 1 : 0 }}
            animate={{ pathLength: on ? 1 : 0 }}
            transition={{ duration: d(T_RUTA), delay: d(T_GARABATO), ease: 'easeInOut' }}
          />
        </mask>
      </defs>

      {/* El punto de partida: un garabato y un par de signos de pregunta */}
      <motion.path
        d={p.garabato}
        stroke={NAVY}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        opacity={0.75}
        initial={{ pathLength: quieto ? 1 : 0 }}
        animate={{ pathLength: on ? 1 : 0 }}
        transition={{ duration: d(T_GARABATO), ease: 'easeInOut' }}
      />
      {p.dudas.map((q) => (
        <motion.text
          key={`${q.x}-${q.y}`}
          x={q.x}
          y={q.y}
          {...texto}
          fontSize={p.letra * 1.15}
          fill={AZUL}
          transform={`rotate(${q.giro} ${q.x} ${q.y})`}
          initial={{ opacity: quieto ? 1 : 0 }}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.3, delay: d(0.45) }}
        >
          ?
        </motion.text>
      ))}
      <motion.text
        x={p.inicio.x}
        y={p.inicio.y}
        textAnchor={p.inicio.ancla}
        {...texto}
        initial={{ opacity: quieto ? 1 : 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.4, delay: d(0.5) }}
      >
        No sé qué estudiar
      </motion.text>

      {/* La ruta */}
      <path
        d={p.ruta}
        mask={`url(#${mascara})`}
        stroke={NAVY}
        strokeWidth={2.6}
        strokeDasharray="2 11"
        strokeLinecap="round"
        fill="none"
      />

      {/* Las paradas aparecen cuando la ruta llega a cada una */}
      {p.paradas.map((s) => (
        <motion.g
          key={s.texto}
          initial={{ opacity: quieto ? 1 : 0, scale: quieto ? 1 : 0.4 }}
          animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18, delay: d(T_GARABATO + T_RUTA * s.en) }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        >
          <circle cx={s.x} cy={s.y} r={9} fill="#fff" stroke={AZUL} strokeWidth={3} />
          <circle cx={s.x} cy={s.y} r={3.2} fill={AZUL} />
          <text x={s.tx} y={s.ty} textAnchor={s.ancla} {...texto}>
            {s.texto}
          </text>
        </motion.g>
      ))}

      {/* El destino: el timón de la marca, que gira hasta quedar en su lugar */}
      <motion.g
        initial={{ opacity: quieto ? 1 : 0, rotate: quieto ? 0 : -120 }}
        animate={{ opacity: on ? 1 : 0, rotate: on ? 0 : -120 }}
        transition={{ duration: 1.1, delay: d(finRuta - 0.15), ease: [0.2, 0.8, 0.2, 1] }}
        style={{ transformOrigin: `${p.rueda.x}px ${p.rueda.y}px` }}
      >
        <circle cx={p.rueda.x} cy={p.rueda.y} r={p.rueda.r} fill="#fff" fillOpacity={0.55} stroke={AZUL} strokeWidth={3.4} />
        <circle cx={p.rueda.x} cy={p.rueda.y} r={p.rueda.r * 0.22} fill="none" stroke={AZUL} strokeWidth={3.4} />
        {rayos.map((a) => (
          <line
            key={a}
            x1={p.rueda.x + p.rueda.r * 0.22 * Math.cos(a)}
            y1={p.rueda.y + p.rueda.r * 0.22 * Math.sin(a)}
            x2={p.rueda.x + p.rueda.r * Math.cos(a)}
            y2={p.rueda.y + p.rueda.r * Math.sin(a)}
            stroke={AZUL}
            strokeWidth={3.4}
            strokeLinecap="round"
          />
        ))}
      </motion.g>
      <motion.text
        x={p.fin.x}
        y={p.fin.y}
        textAnchor={p.fin.ancla}
        {...texto}
        fontWeight={700}
        initial={{ opacity: quieto ? 1 : 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.4, delay: d(finRuta + 0.5) }}
      >
        Tu decisión
      </motion.text>
    </svg>
  )
}

export function MapaHero({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Plano p={ANCHO} className="hidden h-auto w-full sm:block" />
      <Plano p={ALTO} className="mx-auto block h-auto w-full max-w-[340px] sm:hidden" />
    </div>
  )
}
