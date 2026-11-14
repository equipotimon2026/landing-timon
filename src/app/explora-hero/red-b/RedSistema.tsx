'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useQuieto } from './useQuieto'
import { CalendarCheck, MessageCircleHeart, Route } from 'lucide-react'
import { Isotipo } from '@/components/home/Isotipo'
import { C, EMPRESAS, EVENTOS, HIJA, PROFESIONALES, UNIVERSIDADES } from '../red-datos'
import { Escenario } from './Escenario'
import { Avatar, Escudo, Fecha, MarcaEmpresa } from './Figuras'
import { ruta, type Punto } from './ruta'

/**
 * Red B · el diagrama de sistema sobre navy. Tu hija arriba, Timon en el
 * medio como la pieza que arma el recorrido, y abajo cuatro columnas: la
 * gente, las facultades, las empresas y las fechas. Conectores finos con una
 * etiqueta corta (qué pasa en cada conexión) y beams que bajan por ellos.
 */

type Fila = { id: string; visual: React.ReactNode; titulo: React.ReactNode; linea: string }
type Columna = { titulo: string; etiqueta: string; tono: 'cielo' | 'terra'; filas: Fila[] }

const caja = (hijo: React.ReactNode) => (
  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[var(--crema)]">{hijo}</span>
)

const COLUMNAS: Columna[] = [
  {
    titulo: 'Profesionales',
    etiqueta: 'charlas de media hora',
    tono: 'cielo',
    filas: PROFESIONALES.filter((p) => ['lucia', 'martin', 'sofia'].includes(p.id)).map((p) => ({
      id: p.id,
      visual: <Avatar r={p.rasgos} size={44} />,
      titulo: (
        <>
          {p.nombre} <span className="font-normal text-white/50">· {p.oficio.split(' ')[0].toLowerCase()}</span>
        </>
      ),
      linea: p.linea,
    })),
  },
  {
    titulo: 'Universidades',
    etiqueta: 'clases abiertas',
    tono: 'terra',
    filas: UNIVERSIDADES.map((u) => ({ id: u.id, visual: caja(<Escudo emblema={u.emblema} color={u.color} size={30} />), titulo: u.titulo, linea: u.linea })),
  },
  {
    titulo: 'Empresas',
    etiqueta: 'una semana adentro',
    tono: 'cielo',
    filas: EMPRESAS.map((e) => ({ id: e.id, visual: <MarcaEmpresa marca={e.marca} color={e.color} fondo={e.fondo} size={44} />, titulo: e.titulo, linea: e.linea })),
  },
  {
    titulo: 'Eventos',
    etiqueta: 'fechas cerca de casa',
    tono: 'terra',
    filas: EVENTOS.map((e) => ({
      id: e.id,
      visual: <Fecha mes={e.mes} numero={e.numero} dia={e.dia} size={40} />,
      titulo: e.titulo,
      linea: e.lugar,
    })),
  },
]

function Cometa({ d, largo, tono, retraso }: { d: string; largo: number; tono: 'cielo' | 'terra'; retraso: number }) {
  const color = tono === 'cielo' ? C.cielo : '#e9a585'
  const capas = [
    { L: 120, w: 2, o: 0.18 },
    { L: 60, w: 2, o: 0.5 },
    { L: 14, w: 2.6, o: 1 },
  ]
  const Lmax = capas[0].L
  return (
    <>
      {capas.map((k) => (
        <path
          key={k.L}
          d={d}
          pathLength={largo}
          fill="none"
          stroke={k.o === 1 ? '#fff' : color}
          strokeOpacity={k.o}
          strokeWidth={k.w}
          strokeLinecap="round"
          strokeDasharray={`${k.L} ${largo + Lmax + 40}`}
          className="rb-cometa"
          style={
            {
              '--desde': `${k.L}`,
              '--hasta': `${k.L - largo - Lmax}`,
              '--dur': `${(1 + largo / 240) * 1.7}s`,
              '--delay': `${retraso}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}

function Linea({ d, largo, on, quieto, retraso }: { d: string; largo: number; on: boolean; quieto: boolean; retraso: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={C.cielo}
      strokeOpacity={0.28}
      strokeWidth={1.2}
      initial={{ pathLength: quieto ? 1 : 0 }}
      animate={{ pathLength: on ? 1 : 0 }}
      transition={quieto ? { duration: 0 } : { duration: 0.35 + largo / 700, delay: retraso, ease: 'easeInOut' }}
    />
  )
}

function Etiqueta({ x, y, texto, visible, quieto, retraso }: { x: number; y: number; texto: string; visible: boolean; quieto: boolean; retraso: number }) {
  return (
    <motion.span
      className="absolute -translate-y-1/2 whitespace-nowrap pl-3 text-[12.5px] leading-[18px] text-[var(--cielo)]/70"
      style={{ left: x, top: y }}
      initial={{ opacity: quieto ? 1 : 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={quieto ? { duration: 0 } : { duration: 0.5, delay: retraso }}
    >
      {texto}
    </motion.span>
  )
}

function Hija({ ancho }: { ancho: number }) {
  return (
    <div
      className="flex items-center gap-4 rounded-[20px] bg-white px-4 py-3 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]"
      style={{ width: ancho }}
    >
      <span className="rounded-full ring-2 ring-[var(--terra)] ring-offset-2">
        <Avatar r={HIJA} size={56} />
      </span>
      <span className="leading-tight">
        <span className="display block text-[25px] text-[var(--navy)]">
          Tu <strong>hija</strong>
        </span>
        <span className="mt-1 block text-[13.5px] text-[var(--texto2)]">17 años, entre Arquitectura y Diseño</span>
      </span>
    </div>
  )
}

const PASOS = [
  { Icono: Route, texto: 'Arma su recorrido' },
  { Icono: CalendarCheck, texto: 'Coordina cada visita' },
  { Icono: MessageCircleHeart, texto: 'Te cuenta cómo va' },
]

function Timon({ ancho, apilado }: { ancho: number; apilado: boolean }) {
  return (
    <div
      className="rounded-[20px] p-px shadow-[0_30px_70px_-30px_rgba(30,91,160,0.8)]"
      style={{ width: ancho, background: `linear-gradient(120deg, ${C.oceanClaro}, rgba(223,234,246,0.25) 45%, ${C.terra})` }}
    >
      <div className="rounded-[19px] bg-[#112443] px-5 py-4">
        <div className="flex items-center gap-3">
          <Isotipo size={30} trazo={3.4} className="text-[var(--crema)]" />
          <span className="text-[21px] font-medium tracking-[-0.02em] text-white">Timon</span>
          <span className="ml-auto text-[13px] text-white/50">el que abre las puertas</span>
        </div>
        <ul className={`mt-4 border-t border-white/10 pt-3 text-[13.5px] text-white/80 ${apilado ? 'space-y-2' : 'flex justify-between'}`}>
          {PASOS.map(({ Icono, texto }) => (
            <li key={texto} className="flex items-center gap-2">
              <Icono size={16} strokeWidth={1.8} className="text-[var(--cielo)]/70" aria-hidden />
              {texto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ColumnaCaja({ col, filas, ancho }: { col: Columna; filas: Fila[]; ancho: number }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/[0.11] bg-[#10213b]/80 backdrop-blur-[2px]" style={{ width: ancho }}>
      <div className="flex items-baseline justify-between px-4 pb-2 pt-3.5">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white">{col.titulo}</h3>
        <span className="text-[12px] text-white/40">{col.filas.length} de muchos</span>
      </div>
      <ul>
        {filas.map((f) => (
          <li key={f.id} className="rb-fila flex min-h-[80px] items-center gap-3 border-t border-white/[0.07] px-4 py-3">
            <span className="shrink-0">{f.visual}</span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[14px] font-semibold text-white">{f.titulo}</span>
              <span className="mt-1 block text-[12.5px] leading-[1.35] text-white/60">{f.linea}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Escritorio ───────────────────────────────────────────────────────── */

const D = { W: 1140, colW: 270, colGap: 20, hijaY: 0, hijaH: 84, timonY: 160, timonH: 118, busY: 336, colY: 410 }

function Escritorio() {
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.3 })
  const quieto = useQuieto()
  const on = visto || quieto
  const mid = D.W / 2
  const colX = (i: number) => i * (D.colW + D.colGap) + D.colW / 2
  const subida = ruta([[mid, D.hijaY + D.hijaH], [mid, D.timonY]])
  const bajadas = COLUMNAS.map((_, i) => ruta([[mid, D.timonY + D.timonH], [mid, D.busY], [colX(i), D.busY], [colX(i), D.colY]], 14))
  const t = (retraso: number, y = 14) => ({
    initial: quieto ? false : ({ opacity: 0, y } as const),
    animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: quieto ? { duration: 0 } : { duration: 0.6, delay: retraso, ease: [0.2, 0.8, 0.2, 1] as const },
  })

  return (
    <div ref={ref}>
      <Escenario ancho={D.W} alto={740}>
        <svg width={D.W} height={740} className="absolute inset-0 overflow-visible" aria-hidden>
          <Linea {...subida} on={on} quieto={quieto} retraso={0.35} />
          {bajadas.map((b, i) => (
            <Linea key={i} {...b} on={on} quieto={quieto} retraso={0.9} />
          ))}
          {on && <Cometa {...subida} tono="terra" retraso={1.4} />}
          {on && bajadas.map((b, i) => <Cometa key={i} {...b} tono={COLUMNAS[i].tono} retraso={2 + i * 0.5} />)}
          {COLUMNAS.map((_, i) => (
            <motion.circle
              key={i}
              cx={colX(i)}
              cy={D.colY}
              r={3.2}
              fill="#0b1729"
              stroke={C.cielo}
              strokeOpacity={0.7}
              strokeWidth={1.4}
              initial={{ opacity: quieto ? 1 : 0 }}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: quieto ? 0 : 0.3, delay: quieto ? 0 : 1.5 }}
            />
          ))}
        </svg>

        <motion.div className="absolute" style={{ left: mid - 190, top: D.hijaY }} {...t(0)}>
          <Hija ancho={380} />
        </motion.div>

        <motion.p
          aria-hidden
          className="absolute -rotate-[5deg] whitespace-nowrap text-[19px] leading-none text-[var(--durazno)]"
          style={{ left: mid + 214, top: 14, fontFamily: 'var(--font-mano)' }}
          {...t(1.7, 0)}
        >
          ← dibuja desde los seis
        </motion.p>

        <Etiqueta x={mid} y={(D.hijaH + D.timonY) / 2} texto="lo que le da curiosidad" visible={on} quieto={quieto} retraso={0.7} />

        <motion.div className="absolute" style={{ left: mid - 250, top: D.timonY }} {...t(0.55)}>
          <Timon ancho={500} apilado={false} />
        </motion.div>

        {COLUMNAS.map((col, i) => (
          <Etiqueta key={col.titulo} x={colX(i)} y={(D.busY + D.colY) / 2 + 2} texto={col.etiqueta} visible={on} quieto={quieto} retraso={1.3 + i * 0.08} />
        ))}

        {COLUMNAS.map((col, i) => (
          <motion.div key={col.titulo} className="absolute" style={{ left: i * (D.colW + D.colGap), top: D.colY }} {...t(1.2 + i * 0.1)}>
            <ColumnaCaja col={col} filas={col.filas} ancho={D.colW} />
          </motion.div>
        ))}
      </Escenario>
    </div>
  )
}

/* ── Celular: una columna vertebral que baja por la izquierda ─────────── */

const M = { W: 358, hijaH: 84, timonY: 150, timonH: 150, grupoY: 350, grupoH: 236, grupoGap: 24, espina: 18, cajaX: 40 }

function GrupoCelular({ col, i }: { col: Columna; i: number }) {
  const quieto = useQuieto()
  const y0 = M.grupoY + i * (M.grupoH + M.grupoGap)
  return (
    <motion.div
      className="absolute"
      style={{ left: M.cajaX, top: y0 }}
      initial={quieto ? false : { opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: quieto ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <p className="mb-2 pl-1 text-[13px] text-[var(--cielo)]/70">{col.etiqueta}</p>
      <ColumnaCaja col={col} filas={col.filas.slice(0, 2)} ancho={M.W - M.cajaX} />
    </motion.div>
  )
}

function Celular() {
  const ref = useRef<HTMLDivElement>(null)
  const visto = useInView(ref, { once: true, amount: 0.15 })
  const quieto = useQuieto()
  const on = visto || quieto
  const mid = M.W / 2
  const alto = M.grupoY + COLUMNAS.length * (M.grupoH + M.grupoGap) - M.grupoGap
  const subida = ruta([[mid, M.hijaH], [mid, M.timonY]])
  const ramas = COLUMNAS.map((_, i) => {
    const y = M.grupoY + i * (M.grupoH + M.grupoGap) + 50
    return ruta([[M.espina, M.timonY + M.timonH], [M.espina, y], [M.cajaX, y]] as Punto[], 12)
  })
  return (
    <div ref={ref}>
      <Escenario ancho={M.W} alto={alto}>
        <svg width={M.W} height={alto} className="absolute inset-0 overflow-visible" aria-hidden>
          <Linea {...subida} on={on} quieto={quieto} retraso={0.3} />
          <Linea {...ramas[ramas.length - 1]} on={on} quieto={quieto} retraso={0.8} />
          {ramas.slice(0, -1).map((r, i) => (
            <path key={i} d={r.d} fill="none" stroke={C.cielo} strokeOpacity={on ? 0.28 : 0} strokeWidth={1.2} />
          ))}
          {on && <Cometa {...subida} tono="terra" retraso={1.2} />}
          {on && ramas.map((r, i) => <Cometa key={i} {...r} tono={COLUMNAS[i].tono} retraso={1.8 + i * 0.6} />)}
        </svg>
        <motion.div
          className="absolute left-0 top-0"
          initial={quieto ? false : { opacity: 0, y: 12 }}
          animate={on ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: quieto ? 0 : 0.6 }}
        >
          <Hija ancho={M.W} />
        </motion.div>
        <motion.p
          aria-hidden
          className="absolute right-1 -top-[30px] -rotate-[4deg] whitespace-nowrap text-[18px] leading-none text-[var(--durazno)]"
          style={{ fontFamily: 'var(--font-mano)' }}
          initial={quieto ? false : { opacity: 0 }}
          animate={on ? { opacity: 1 } : undefined}
          transition={{ duration: quieto ? 0 : 0.6, delay: quieto ? 0 : 1.4 }}
        >
          dibuja desde los seis ↓
        </motion.p>
        <Etiqueta x={mid} y={(M.hijaH + M.timonY) / 2} texto="lo que le da curiosidad" visible={on} quieto={quieto} retraso={0.6} />
        <motion.div
          className="absolute left-0"
          style={{ top: M.timonY }}
          initial={quieto ? false : { opacity: 0, y: 12 }}
          animate={on ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: quieto ? 0 : 0.6, delay: quieto ? 0 : 0.5 }}
        >
          <Timon ancho={M.W} apilado />
        </motion.div>
        {COLUMNAS.map((col, i) => (
          <GrupoCelular key={col.titulo} col={col} i={i} />
        ))}
      </Escenario>
    </div>
  )
}

export function RedSistema() {
  return (
    <>
      <div className="mx-auto hidden max-w-[1200px] px-5 md:block">
        <Escritorio />
      </div>
      <div className="mx-auto max-w-[420px] px-4 md:hidden">
        <Celular />
      </div>
    </>
  )
}
