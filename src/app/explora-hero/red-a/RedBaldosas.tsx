'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useQuieto } from './useQuieto'
import { C, EMPRESAS, EVENTOS, HIJO, PROFESIONALES, UNIVERSIDADES, type Empresa, type Evento, type Profesional, type Universidad } from '../red-datos'
import { Escenario } from './Escenario'
import { Avatar, Escudo, Fecha, MarcaEmpresa } from './Figuras'
import { ruta, type Punto } from './ruta'

/**
 * Red A · la grilla de baldosas. Tu hijo en el centro, dentro del timón de la
 * marca; alrededor, una grilla tenue donde algunas baldosas ya tienen gente,
 * facultades, empresas y fechas, y el resto se desvanece hacia los bordes
 * (lo que todavía no conoce). Los beams salen del centro y viajan por las
 * juntas de la grilla hasta cada baldosa.
 */

type Item =
  | { k: 'persona'; v: Profesional }
  | { k: 'uni'; v: Universidad }
  | { k: 'empresa'; v: Empresa }
  | { k: 'evento'; v: Evento }

type Via = 'izq' | 'der' | 'arriba' | 'abajo'
type Baldosa = { r: number; c: number; w: 1 | 3; item: Item; via?: Via; tono?: 'ocean' | 'terra' }

type Plano = {
  T: number
  G: number
  cols: number
  filas: number
  centro: { r: number; c: number }
  baldosas: Baldosa[]
  /** Nota a mano: posición del texto y la flecha que baja hasta el hijo. */
  nota: { x: number; y: number; flecha: string }
}

const per = (id: string) => ({ k: 'persona', v: PROFESIONALES.find((p) => p.id === id)! }) as const
const uni = (id: string) => ({ k: 'uni', v: UNIVERSIDADES.find((u) => u.id === id)! }) as const
const emp = (id: string) => ({ k: 'empresa', v: EMPRESAS.find((e) => e.id === id)! }) as const
const evt = (id: string) => ({ k: 'evento', v: EVENTOS.find((e) => e.id === id)! }) as const

/**
 * Camino de la luz desde el borde del centro hasta la baldosa, siempre por
 * las juntas: sale por el medio de un lado del centro, corre por la junta
 * vertical más cercana a la baldosa y entra por su borde.
 */
function camino(b: Baldosa, { T, G, centro }: Plano): Punto[] {
  const P = T + G
  const cL = centro.c * P
  const cR = cL + 2 * T + G
  const cT = centro.r * P
  const cB = cT + 2 * T + G
  const midX = cL + T + G / 2
  const midY = cT + T + G / 2
  const x0 = b.c * P
  const x1 = x0 + b.w * P - G
  const ym = b.r * P + T / 2
  switch (b.via) {
    case 'izq': {
      const junta = x1 < cL ? x1 + G / 2 : cL - G / 2
      return [[cL, midY], [junta, midY], [junta, ym], [x1 < cL ? x1 : x0, ym]]
    }
    case 'der': {
      const junta = x0 > cR ? x0 - G / 2 : cR + G / 2
      return [[cR, midY], [junta, midY], [junta, ym], [x0 > cR ? x0 : x1, ym]]
    }
    case 'arriba':
    case 'abajo':
      return [[midX, b.via === 'arriba' ? cT : cB], [midX, ym], [x0 > midX ? x0 : x1, ym]]
    default:
      return []
  }
}

/* Escritorio: 12 × 6 baldosas de 80 px, juntas de 20. Centro 2×2 en (2, 5). */
const ESCRITORIO: Plano = {
  T: 80,
  G: 20,
  cols: 12,
  filas: 6,
  centro: { r: 2, c: 5 },
  baldosas: [
    { r: 1, c: 1, w: 3, item: per('lucia'), via: 'izq', tono: 'ocean' },
    { r: 2, c: 3, w: 1, item: per('sofia'), via: 'izq', tono: 'terra' },
    { r: 3, c: 3, w: 1, item: emp('bodega'), via: 'izq', tono: 'ocean' },
    { r: 4, c: 1, w: 3, item: evt('feria'), via: 'izq', tono: 'terra' },
    { r: 5, c: 2, w: 3, item: emp('estudio'), via: 'abajo', tono: 'terra' },
    { r: 0, c: 6, w: 3, item: uni('publica'), via: 'arriba', tono: 'ocean' },
    { r: 1, c: 8, w: 3, item: emp('fintech'), via: 'der', tono: 'ocean' },
    { r: 2, c: 8, w: 1, item: uni('privada'), via: 'der', tono: 'terra' },
    { r: 3, c: 8, w: 1, item: per('joaquin'), via: 'der', tono: 'ocean' },
    { r: 4, c: 8, w: 3, item: per('martin'), via: 'der', tono: 'terra' },
    { r: 0, c: 2, w: 1, item: per('valentina') },
    { r: 0, c: 10, w: 1, item: evt('charla') },
    { r: 5, c: 0, w: 1, item: evt('hospital') },
    { r: 5, c: 9, w: 1, item: uni('litoral') },
  ],
  nota: { x: 418, y: 118, flecha: 'M528 158c16 4 30 14 38 34' },
}

/* Celular: 4 columnas; el centro arriba y las tarjetas anchas en fila,
 * colgadas de una junta vertical que baja desde el hijo. */
const CELULAR: Plano = {
  T: 76,
  G: 18,
  cols: 4,
  filas: 8,
  centro: { r: 1, c: 1 },
  baldosas: [
    { r: 1, c: 0, w: 1, item: per('sofia'), via: 'izq', tono: 'terra' },
    { r: 1, c: 3, w: 1, item: evt('charla'), via: 'der', tono: 'ocean' },
    { r: 2, c: 3, w: 1, item: per('joaquin'), via: 'der', tono: 'terra' },
    { r: 3, c: 1, w: 3, item: per('lucia'), via: 'izq', tono: 'ocean' },
    { r: 4, c: 1, w: 3, item: emp('fintech'), via: 'izq', tono: 'terra' },
    { r: 5, c: 1, w: 3, item: uni('publica'), via: 'izq', tono: 'ocean' },
    { r: 6, c: 1, w: 3, item: per('martin'), via: 'izq', tono: 'terra' },
    { r: 7, c: 1, w: 3, item: evt('feria'), via: 'izq', tono: 'ocean' },
    { r: 0, c: 0, w: 1, item: per('valentina') },
    { r: 0, c: 3, w: 1, item: uni('privada') },
    { r: 3, c: 0, w: 1, item: emp('bodega') },
    { r: 5, c: 0, w: 1, item: uni('litoral') },
    { r: 7, c: 0, w: 1, item: evt('hospital') },
  ],
  nota: { x: 100, y: 16, flecha: 'M214 50c10 8 14 20 12 36' },
}

const SOMBRA = '0 1px 2px rgba(15,31,54,0.05), 0 14px 30px -16px rgba(15,31,54,0.22)'

function Visual({ item, size }: { item: Item; size: number }) {
  switch (item.k) {
    case 'persona':
      return <Avatar r={item.v.rasgos} size={size} />
    case 'uni':
      return <Escudo emblema={item.v.emblema} color={item.v.color} size={size * 0.86} />
    case 'empresa':
      return <MarcaEmpresa marca={item.v.marca} color={item.v.color} fondo={item.v.fondo} size={size} />
    case 'evento':
      return <Fecha mes={item.v.mes} numero={item.v.numero} dia={item.v.dia} size={size * 0.9} />
  }
}

function textos(item: Item, corto = false): { titulo: React.ReactNode; linea: string; nombre: string } {
  switch (item.k) {
    case 'persona':
      return {
        titulo: (
          <>
            {item.v.nombre} <span className="font-normal text-[var(--tenue)]">· {corto ? item.v.oficio.split(' ')[0].toLowerCase() : item.v.oficio.toLowerCase()}</span>
          </>
        ),
        linea: item.v.linea,
        nombre: `${item.v.nombre}, ${item.v.oficio}`,
      }
    case 'evento':
      return {
        titulo: (
          <>
            {item.v.titulo} <span className="font-normal text-[var(--terra-hondo)]">· {item.v.dia} {item.v.fecha}</span>
          </>
        ),
        linea: item.v.lugar,
        nombre: `${item.v.titulo}, ${item.v.dia} ${item.v.fecha}`,
      }
    default:
      return { titulo: item.v.titulo, linea: item.v.linea, nombre: item.v.titulo }
  }
}

function Cometa({ d, largo, tono, retraso }: { d: string; largo: number; tono: 'ocean' | 'terra'; retraso: number }) {
  const color = tono === 'ocean' ? C.ocean : C.terra
  const capas = [
    { L: 120, w: 2, o: 0.22 },
    { L: 60, w: 2, o: 0.55 },
    { L: 16, w: 2.6, o: 1 },
  ]
  const Lmax = capas[0].L
  const dur = 1.1 + largo / 260
  return (
    <>
      {capas.map((k) => (
        <path
          key={k.L}
          d={d}
          pathLength={largo}
          fill="none"
          stroke={color}
          strokeOpacity={k.o}
          strokeWidth={k.w}
          strokeLinecap="round"
          strokeDasharray={`${k.L} ${largo + Lmax + 40}`}
          className="ra-cometa"
          style={
            {
              '--desde': `${k.L}`,
              '--hasta': `${k.L - largo - Lmax}`,
              '--dur': `${dur * 1.6}s`,
              '--delay': `${retraso}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}

function Centro({ T, G, chico }: { T: number; G: number; chico: boolean }) {
  const lado = T * 2 + G
  const timon = chico ? 116 : 128
  return (
    <div className="relative" style={{ width: lado, height: lado }}>
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full opacity-80 blur-2xl"
        style={{ background: `radial-gradient(closest-side, ${C.cielo}, rgba(223,234,246,0) 75%)` }}
      />
      <div
        className="relative h-full w-full rounded-[26px] p-[1.5px]"
        style={{
          background: `linear-gradient(155deg, ${C.ocean}, ${C.cielo} 52%, ${C.terra})`,
          boxShadow: '0 30px 60px -30px rgba(30,91,160,0.6), 0 8px 18px -10px rgba(15,31,54,0.18)',
        }}
      >
        <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[24.5px] bg-white">
          <div className="relative mt-[8px]" style={{ width: timon, height: timon }}>
            <svg viewBox="0 0 96 96" className="ra-giro absolute inset-0 h-full w-full text-[var(--ocean)]" aria-hidden>
              <circle cx="48" cy="48" r="43" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="1.2 3.2" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <g key={a} transform={`rotate(${a} 48 48)`}>
                  <line x1="48" y1="25" x2="48" y2="12.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  <circle cx="48" cy="10.4" r="2.3" fill={a === 0 ? C.terra : 'currentColor'} />
                </g>
              ))}
              <circle cx="48" cy="48" r="23" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Avatar r={HIJO} size={timon * 0.44} />
            </div>
          </div>
          <p className="display text-[24px] leading-none text-[var(--navy)]">
            Tu <strong>hijo</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

function Red({ plano, chico }: { plano: Plano; chico: boolean }) {
  const { T, G, cols, filas, centro } = plano
  const P = T + G
  const ancho = cols * P - G
  const alto = filas * P - G
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.35 })
  const quieto = useQuieto()
  const on = visto || quieto

  const ocupadas = new Set<string>()
  for (let r = centro.r; r < centro.r + 2; r++) for (let c = centro.c; c < centro.c + 2; c++) ocupadas.add(`${r}-${c}`)
  for (const b of plano.baldosas) for (let c = b.c; c < b.c + b.w; c++) ocupadas.add(`${b.r}-${c}`)

  const cx = centro.c + 0.5
  const cy = centro.r + 0.5
  const distancia = (r: number, c: number) => Math.hypot(c - cx, (r - cy) * (chico ? 1 : 1.35))

  const vacias: { r: number; c: number; d: number }[] = []
  for (let r = 0; r < filas; r++) for (let c = 0; c < cols; c++) if (!ocupadas.has(`${r}-${c}`)) vacias.push({ r, c, d: distancia(r, c) })

  const rutas = plano.baldosas.filter((b) => b.via).map((b) => ({ b, puntos: camino(b, plano), ...ruta(camino(b, plano), 9) }))

  const t = (retraso: number) => (quieto ? { duration: 0 } : { duration: 0.6, delay: retraso, ease: [0.2, 0.8, 0.2, 1] as const })

  return (
    <div ref={ref}>
      <Escenario ancho={ancho} alto={alto}>
        {/* Capa 1: baldosas vacías, cada vez más tenues hacia los bordes. */}
        {vacias.map(({ r, c, d }) => {
          const opacidad = Math.max(0, 1 - d / (chico ? 5.2 : 6.6))
          return (
            <motion.div
              key={`${r}-${c}`}
              aria-hidden
              className="absolute rounded-[18px] border border-[#ece4d6] bg-[#faf6ef]"
              style={{ left: c * P, top: r * P, width: T, height: T }}
              initial={{ opacity: quieto ? opacidad : 0 }}
              animate={{ opacity: on ? opacidad : 0 }}
              transition={t(0.05 + d * 0.06)}
            />
          )
        })}

        {/* Capa 2: las juntas por donde viaja la luz. */}
        <svg width={ancho} height={alto} className="absolute inset-0 overflow-visible" aria-hidden>
          {rutas.map(({ b, d, largo }) => (
            <motion.path
              key={`l-${b.r}-${b.c}`}
              d={d}
              fill="none"
              stroke={C.navy}
              strokeOpacity={0.16}
              strokeWidth={1.3}
              initial={{ pathLength: quieto ? 1 : 0 }}
              animate={{ pathLength: on ? 1 : 0 }}
              transition={quieto ? { duration: 0 } : { duration: 0.5 + largo / 900, delay: 0.55, ease: 'easeOut' }}
            />
          ))}
          {on &&
            rutas.map(({ b, d, largo }, i) => <Cometa key={`c-${b.r}-${b.c}`} d={d} largo={largo} tono={b.tono ?? 'ocean'} retraso={1.3 + i * 0.55} />)}
        </svg>

        {/* Capa 3: baldosas con contenido. */}
        <ul>
          {plano.baldosas.map((b) => {
            const ancha = b.w > 1
            const { titulo, linea, nombre } = textos(b.item, chico)
            const d = distancia(b.r, b.c + (b.w - 1) / 2)
            return (
              <motion.li
                key={`${b.r}-${b.c}`}
                className="absolute"
                style={{ left: b.c * P, top: b.r * P, width: b.w * P - G, height: T }}
                initial={quieto ? false : { opacity: 0, y: 12, scale: 0.96 }}
                animate={on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
                transition={t(0.3 + d * 0.08)}
              >
                <div
                  className={`ra-baldosa flex h-full items-center rounded-[18px] border border-[#ece6dc] bg-white ${ancha ? 'gap-3 pl-[13px] pr-3' : 'justify-center'} ${b.via ? '' : 'opacity-70'}`}
                  style={{ boxShadow: SOMBRA }}
                  title={ancha ? undefined : nombre}
                >
                  <span className="shrink-0">
                    <Visual item={b.item} size={ancha ? (chico ? 46 : 50) : chico ? 46 : 50} />
                  </span>
                  {ancha ? (
                    <span className="min-w-0 leading-tight">
                      <span className="line-clamp-2 block text-[14px] font-semibold tracking-[-0.01em] text-[var(--navy)]">{titulo}</span>
                      <span className="mt-[3px] line-clamp-2 block text-[12.5px] leading-[1.35] text-[var(--texto2)]">{linea}</span>
                    </span>
                  ) : (
                    <span className="sr-only">{nombre}</span>
                  )}
                </div>
              </motion.li>
            )
          })}
        </ul>

        {/* Puntos de llegada, encima del borde de cada baldosa. */}
        <svg width={ancho} height={alto} className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
          {rutas.map(({ b, puntos }) => {
            const [x, y] = puntos[puntos.length - 1]
            return (
              <motion.circle
                key={`p-${b.r}-${b.c}`}
                cx={x}
                cy={y}
                r={3}
                fill="#fff"
                stroke={b.tono === 'terra' ? C.terra : C.ocean}
                strokeWidth={1.6}
                initial={{ opacity: quieto ? 1 : 0 }}
                animate={{ opacity: on ? 1 : 0 }}
                transition={t(1.1)}
              />
            )
          })}
        </svg>

        {/* Capa 4: el hijo, en el centro del timón. */}
        <motion.div
          className="absolute"
          style={{ left: centro.c * P, top: centro.r * P }}
          initial={quieto ? false : { opacity: 0, scale: 0.88 }}
          animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={quieto ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 18, delay: 0.05 }}
        >
          <Centro T={T} G={G} chico={chico} />
        </motion.div>

        {/* Una nota a mano, como las de la home. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: 0, top: 0, width: ancho, height: alto }}
          initial={quieto ? false : { opacity: 0 }}
          animate={{ opacity: on ? 1 : 0 }}
          transition={t(1.6)}
        >
          <p
            className="absolute -rotate-[4deg] whitespace-nowrap text-[19px] leading-none text-[var(--terra-hondo)]"
            style={{ left: plano.nota.x, top: plano.nota.y, fontFamily: 'var(--font-mano)' }}
          >
            17 años y mil preguntas
          </p>
          <svg width={ancho} height={alto} className="absolute inset-0 overflow-visible">
            <path d={plano.nota.flecha} fill="none" stroke={C.terraHondo} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </Escenario>
    </div>
  )
}

export function RedBaldosas() {
  return (
    <>
      <div className="mx-auto hidden max-w-[1240px] px-5 md:block">
        <Red plano={ESCRITORIO} chico={false} />
      </div>
      <div className="mx-auto max-w-[420px] px-4 md:hidden">
        <Red plano={CELULAR} chico />
      </div>
    </>
  )
}
