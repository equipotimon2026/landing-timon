'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Recorte } from '../app-a/Recorte'
import type { Corte } from '../app-datos'
import { Cifras } from './Cifras'
import { CORTES } from './datos'

const SALIDA = [0.16, 1, 0.3, 1] as const

type Escena = 'A' | 'B'
/** 0 vacío · 1 sube · 2 suelta el soporte · 3 marca esquinas · 4 abre piezas · 5 trabaja · 6 cierra */
type Estado = { escena: Escena; paso: number; k: number }

/**
 * La coreografía de ramp.com (docs/referencias-hero/ramp.md), en tiempos.
 * Escena A: el informe sube dentro de un soporte blanco, el soporte se va, se
 * marcan sus esquinas y salen cuatro piezas reales de la app que se van
 * "completando" una por una. Escena B: el comparador de universidades.
 */
const GUION: [number, Partial<Estado>][] = [
  [350, { escena: 'A', paso: 1, k: 0 }],
  [700, { paso: 2 }],
  [300, { paso: 3 }],
  [300, { paso: 4 }],
  [850, { paso: 5, k: 1 }],
  [420, { k: 2 }],
  [420, { k: 3 }],
  [420, { k: 4 }],
  [3000, { paso: 6 }],
  [500, { escena: 'B', paso: 1, k: 0 }],
  [800, { paso: 3 }],
  [300, { paso: 4 }],
  [800, { paso: 5, k: 1 }],
  [500, { k: 2 }],
  [3400, { paso: 6 }],
]

function useGuion(quieto: boolean | null) {
  const [estado, setEstado] = useState<Estado>({ escena: 'A', paso: 0, k: 0 })
  useEffect(() => {
    if (quieto) return
    let i = 0
    let id: ReturnType<typeof setTimeout>
    const avanzar = () => {
      const [espera, cambio] = GUION[i]
      id = setTimeout(() => {
        setEstado((e) => ({ ...e, ...cambio }))
        i = (i + 1) % GUION.length
        avanzar()
      }, espera)
    }
    avanzar()
    return () => clearTimeout(id)
  }, [quieto])
  return quieto ? { escena: 'A' as Escena, paso: 5, k: 4 } : estado
}

const TARJETA = 'overflow-hidden rounded-[10px] bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_18px_40px_-24px_rgba(15,31,54,0.35)]'

/** Cuatro marcas en las esquinas, como una selección. */
function Esquinas({ visible, abiertas = true }: { visible: boolean; abiertas?: boolean }) {
  const d = abiertas ? -7 : -2
  return (
    <>
      {[
        { left: d, top: d },
        { right: d, top: d },
        { left: d, bottom: d },
        { right: d, bottom: d },
      ].map((pos, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute z-10 h-[5px] w-[5px] bg-[var(--primario)]"
          style={pos}
          initial={false}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.4 }}
          transition={{ duration: 0.35, delay: visible ? i * 0.04 : 0, ease: SALIDA }}
        />
      ))}
    </>
  )
}

function Pieza({
  corte,
  etiqueta,
  lista,
  visible,
  desde,
  retraso,
  className,
  sizes,
}: {
  corte: Corte
  etiqueta: string
  lista: boolean
  visible: boolean
  desde: { x: number; y: number }
  retraso: number
  className: string
  sizes: string
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={false}
      animate={
        visible
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: desde.x, y: desde.y, scale: 0.9 }
      }
      transition={{ duration: visible ? 0.8 : 0.45, delay: visible ? retraso : 0, ease: SALIDA }}
    >
      <p className="mb-2 inline-flex items-center gap-2 whitespace-nowrap rounded-[6px] bg-white px-2.5 py-1 text-[12px] font-semibold tracking-[-0.005em] text-[var(--navy)] ring-1 ring-[rgba(15,31,54,0.08)]">
        <span
          aria-hidden
          className={`h-[6px] w-[6px] rounded-full transition-colors duration-500 ${lista ? 'bg-[var(--primario)]' : 'bg-[var(--borde)]'}`}
        />
        {etiqueta}
      </p>
      <div className="relative">
        <Esquinas visible={visible} />
        <div className={TARJETA}>
          <Recorte corte={corte} alt="" sizes={sizes} />
        </div>
      </div>
    </motion.div>
  )
}

/**
 * El escenario del hero: un panel crema ancho como la página donde se arma
 * una escena con pantallas reales de Timon. Con menos movimiento queda la
 * escena A completa, quieta.
 */
export function Escenario() {
  const quieto = useReducedMotion()
  const { escena, paso, k } = useGuion(quieto)
  const a = escena === 'A'
  const b = escena === 'B'
  const abierto = paso >= 4 && paso < 6

  return (
    <div className="relative h-[clamp(380px,96vw,540px)] overflow-hidden rounded-[18px] border border-[var(--borde)] bg-[var(--escenario)] md:h-[clamp(420px,62vw,560px)] lg:h-[max(420px,calc(100svh-512px))]">
      <div className="absolute inset-x-0 bottom-0 z-20">
        <Cifras />
      </div>
      {/* Escena A · el soporte blanco que trae el informe y se va */}
      <motion.div
        aria-hidden
        className="absolute left-[18%] top-[6%] h-[110%] w-[64%] rounded-[16px] bg-white/80 ring-1 ring-[rgba(15,31,54,0.06)] md:left-[29%] md:w-[42%]"
        initial={false}
        animate={
          a && paso === 1
            ? { opacity: 1, y: 0 }
            : a && paso === 0
              ? { opacity: 0, y: 160 }
              : { opacity: 0, y: 70 }
        }
        transition={{ duration: paso === 1 ? 0.9 : 0.5, ease: SALIDA }}
      />

      {/* Escena A · el informe en el centro */}
      <motion.div
        className="absolute left-[21%] top-[12%] w-[58%] md:left-[32%] md:w-[36%]"
        initial={false}
        animate={
          a && paso >= 1 && paso < 6
            ? { opacity: 1, y: 0, scale: 1, rotateY: 0 }
            : a && paso === 6
              ? { opacity: 0, y: 10, scale: 0.94, rotateY: 50 }
              : { opacity: 0, y: 160, scale: 1, rotateY: 0 }
        }
        transition={{ duration: paso === 6 ? 0.45 : 0.9, ease: SALIDA }}
        style={{ transformPerspective: 900 }}
      >
        <Esquinas visible={a && paso >= 3 && paso < 6} abiertas={paso >= 4} />
        <div className={TARJETA}>
          <Recorte corte={CORTES.esencia} alt="El informe de Timon: los rasgos de un alumno, del más fuerte al más suave" sizes="520px" />
        </div>
      </motion.div>

      {/* Escena A · las piezas que salen alrededor */}
      <Pieza
        corte={CORTES.perfil}
        etiqueta="Se conoce"
        lista={a && k >= 1}
        visible={a && abierto}
        desde={{ x: 120, y: 40 }}
        retraso={0}
        className="left-[3%] top-[9%] hidden w-[30%] md:block"
        sizes="420px"
      />
      <Pieza
        corte={CORTES.valentina}
        etiqueta="Charla con una psicóloga"
        lista={a && k >= 2}
        visible={a && abierto}
        desde={{ x: -110, y: 40 }}
        retraso={0.12}
        className="right-[4%] top-[7%] w-[34%] md:w-[19%]"
        sizes="300px"
      />
      <Pieza
        corte={CORTES.vosColegio}
        etiqueta="Su historia en el colegio"
        lista={a && k >= 3}
        visible={a && abierto}
        desde={{ x: 120, y: -40 }}
        retraso={0.24}
        className="left-[4%] top-[55%] hidden w-[27%] md:block"
        sizes="380px"
      />
      <Pieza
        corte={CORTES.uba}
        etiqueta="Una universidad que va con él"
        lista={a && k >= 4}
        visible={a && abierto}
        desde={{ x: -120, y: -40 }}
        retraso={0.36}
        className="bottom-[8%] left-[6%] w-[88%] md:bottom-auto md:left-auto md:right-[3%] md:top-[57%] md:w-[33%]"
        sizes="480px"
      />

      {/* Escena B · el comparador */}
      <motion.div
        className="absolute left-[6%] top-[12%] w-[88%] md:left-[20%] md:w-[52%]"
        initial={false}
        animate={
          b && paso >= 1 && paso < 6
            ? { opacity: 1, y: 0, scale: 1 }
            : b && paso === 6
              ? { opacity: 0, y: -20, scale: 0.97 }
              : { opacity: 0, y: 160, scale: 1 }
        }
        transition={{ duration: paso === 6 ? 0.45 : 0.9, ease: SALIDA }}
      >
        <Esquinas visible={b && paso >= 3 && paso < 6} abiertas={paso >= 4} />
        <div className={TARJETA}>
          <Recorte corte={CORTES.comparador} alt="El comparador de universidades de Timon, con filtros de cuota, modalidad y ubicación" sizes="760px" />
        </div>
      </motion.div>
      <Pieza
        corte={CORTES.alineada}
        etiqueta="Qué tan alineada está"
        lista={b && k >= 1}
        visible={b && abierto}
        desde={{ x: -90, y: -20 }}
        retraso={0}
        className="right-[4%] top-[60%] w-[46%] md:right-[8%] md:top-[44%] md:w-[19%]"
        sizes="300px"
      />
    </div>
  )
}
