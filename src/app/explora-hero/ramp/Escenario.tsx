'use client'

import { useEffect, useState } from 'react'
import { Check, MousePointer2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Recorte } from '../app-a/Recorte'
import { CORTES, DONDE_SALUD, PASOS_HERO } from './datos'

const SALIDA = [0.16, 1, 0.3, 1] as const
const DURACION = 5200

const PANTALLA =
  'relative overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_30px_60px_-36px_rgba(15,31,54,0.45)]'

type Caja = { left: string; top: string; width: string; height: string }

/** Un cursor que recorre puntos de la pantalla (en % de la pantalla). */
function Cursor({ x, y, times, delay = 0 }: { x: string[]; y: string[]; times: number[]; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute z-20 -ml-[3px] -mt-[2px] text-[var(--navy)] drop-shadow-[0_2px_3px_rgba(15,31,54,0.25)]"
      initial={{ left: x[0], top: y[0], opacity: 0 }}
      animate={{ left: x, top: y, opacity: 1 }}
      transition={{ duration: 3.4, times, delay, ease: 'easeInOut', opacity: { duration: 0.3, delay } }}
    >
      <MousePointer2 size={22} fill="white" strokeWidth={1.6} />
    </motion.span>
  )
}

/** Marca de selección sobre una tarjeta de la captura. */
function Elegida({ caja, delay }: { caja: Caja; delay: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute z-10 rounded-[10px] ring-[3px] ring-[var(--primario)]"
      style={caja}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: SALIDA }}
    >
      <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primario)] text-white">
        <Check size={14} strokeWidth={3} />
      </span>
    </motion.span>
  )
}

/** 1 · Elige las áreas que le atraen: dos toques sobre la grilla real de áreas. */
function EscenaAreas() {
  // Posiciones de las tarjetas dentro del recorte CORTES.areas (920 × 600 px).
  const salud = { left: '67.4%', top: '21.8%', width: '32%', height: '36.7%' }
  const ingenieria = { left: '0.5%', top: '21.8%', width: '32%', height: '36.7%' }
  return (
    <div className={PANTALLA}>
      <Recorte corte={CORTES.areas} alt="Las 16 áreas de trabajo de Timon, cada una con su profesional" sizes="(min-width: 1024px) 760px, 92vw" />
      <Elegida caja={salud} delay={1.45} />
      <Elegida caja={ingenieria} delay={3.0} />
      <Cursor x={['46%', '83%', '83%', '17%', '17%']} y={['96%', '42%', '42%', '42%', '42%']} times={[0, 0.38, 0.5, 0.86, 1]} delay={0.2} />
    </div>
  )
}

/** 2 · Charla con un profesional: la tarjeta real del área y la charla que se escribe. */
function EscenaCharla() {
  const respuesta = PASOS_HERO.charla
  const [letras, setLetras] = useState(0)
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined
    const arranque = setTimeout(() => {
      id = setInterval(() => setLetras((n) => Math.min(respuesta.length, n + 3)), 28)
    }, 1500)
    return () => {
      clearTimeout(arranque)
      clearInterval(id)
    }
  }, [respuesta.length])

  return (
    <div className={`${PANTALLA} grid gap-4 bg-[#fbfaf7] p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:p-5`}>
      <div className="hidden overflow-hidden rounded-[10px] sm:block">
        <Recorte corte={CORTES.diego} alt="La tarjeta del área Salud con su profesional, médico clínico" sizes="300px" />
      </div>
      <div className="flex min-h-[260px] flex-col gap-3 text-[14.5px] leading-snug">
        <p className="text-[12px] font-semibold text-[var(--tenue)]">Salud · charla con un médico clínico</p>
        <motion.p
          className="self-end rounded-[14px] rounded-br-[4px] bg-[var(--primario)] px-3.5 py-2.5 text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: SALIDA }}
        >
          ¿Cómo es un día de trabajo para vos?
        </motion.p>
        <motion.div
          className="max-w-[94%] self-start rounded-[14px] rounded-bl-[4px] bg-white px-3.5 py-2.5 text-[var(--navy)] ring-1 ring-[var(--borde)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0, ease: SALIDA }}
        >
          {letras === 0 ? (
            <span className="inline-flex gap-1 py-1" aria-label="Escribiendo">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[var(--tenue)]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          ) : (
            respuesta.slice(0, letras)
          )}
        </motion.div>
      </div>
    </div>
  )
}

/** 3 · Universidades y empresas: el comparador real, un filtro que cambia y dónde se trabaja. */
function EscenaComparar() {
  // El selector "Modalidad" dentro de CORTES.comparador (960 × 520 px).
  const modalidad = { left: '35.4%', top: '24.6%', width: '29.4%', height: '9.4%' }
  return (
    <div className="relative">
      <div className={PANTALLA}>
        <Recorte
          corte={CORTES.comparador}
          alt="El comparador de universidades de Timon, con filtros y qué tan alineada está cada una"
          sizes="(min-width: 1024px) 760px, 92vw"
        />
        <motion.span
          aria-hidden
          className="absolute z-10 flex items-center rounded-[999px] bg-white pl-[2.6%] text-[clamp(9px,1.1vw,15px)] text-[var(--navy)] ring-2 ring-[var(--primario)]"
          style={modalidad}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.5 }}
        >
          Presencial
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute left-[0.5%] top-[57%] z-10 h-[42%] w-[99%] rounded-[12px] ring-[3px] ring-[var(--primario)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.4 }}
        />
        <Cursor x={['70%', '50%', '50%', '60%', '60%']} y={['92%', '29%', '29%', '70%', '70%']} times={[0, 0.34, 0.5, 0.8, 1]} delay={0.1} />
      </div>
      {/* [CONFIRMAR] "empresas": hoy la app muestra dónde se trabaja en cada área, sin empresas con nombre. */}
      <motion.div
        className="absolute -bottom-3 right-3 z-20 w-[min(300px,70%)] rounded-[12px] bg-white p-4 ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_24px_50px_-28px_rgba(15,31,54,0.5)] sm:-right-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.1, ease: SALIDA }}
      >
        <p className="text-[11.5px] font-semibold text-[var(--tenue)]">Dónde se trabaja · {DONDE_SALUD.area}</p>
        <p className="mt-1 text-[13.5px] leading-snug text-[var(--navy)]">{DONDE_SALUD.lugares}</p>
      </motion.div>
    </div>
  )
}

/** 4 · Su informe: los rasgos aparecen de arriba abajo y queda su red. */
function EscenaInforme() {
  return (
    <div className="relative mx-auto max-w-[620px]">
      <div className={PANTALLA}>
        <Recorte corte={CORTES.esencia} alt="El informe de Timon: los rasgos del alumno, del más fuerte al más suave" sizes="(min-width: 1024px) 620px, 92vw" />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 bg-white"
          initial={{ top: '14%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 2.2, delay: 0.4, ease: [0.45, 0, 0.2, 1] }}
        />
      </div>
      {/* [CONFIRMAR] "queda conectado": qué parte de la red sigue disponible después del informe. */}
      <motion.p
        className="absolute -bottom-3 left-1/2 z-20 flex w-max max-w-[92%] -translate-x-1/2 items-center gap-2 rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-[13.5px] text-white shadow-[0_20px_40px_-24px_rgba(15,31,54,0.6)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.9, ease: SALIDA }}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primario)]">
          <Check size={12} strokeWidth={3} />
        </span>
        Su informe y su red: profesionales, universidades y lugares de trabajo
      </motion.p>
    </div>
  )
}

const ESCENAS = [EscenaAreas, EscenaCharla, EscenaComparar, EscenaInforme]

/** La raya que marca el tiempo del paso activo; al terminar pasa al siguiente. */
function Tiempo({ frenado, alTerminar }: { frenado: boolean; alTerminar: () => void }) {
  return (
    <span
      className="esc-tiempo absolute inset-0 origin-left bg-[var(--primario)]"
      style={{ animationDuration: `${DURACION}ms`, animationPlayState: frenado ? 'paused' : 'running' }}
      onAnimationEnd={alTerminar}
    />
  )
}

/**
 * El hero como recorrido guiado: cuatro pasos, uno por vez, cada uno con su
 * leyenda y una sola pantalla real de la app donde pasa algo (dos toques, una
 * charla que se escribe, un filtro, el informe que aparece). El indicador
 * 1-2-3-4 marca el tiempo, se puede tocar y se frena al pasar el mouse. Con
 * menos movimiento no avanza solo.
 */
export function Escenario() {
  const quieto = useReducedMotion()
  const [activo, setActivo] = useState(0)
  const [frenado, setFrenado] = useState(false)
  const Escena = ESCENAS[activo]
  const paso = PASOS_HERO.pasos[activo]
  const siguiente = () => setActivo((n) => (n + 1) % ESCENAS.length)
  const pausa = frenado || Boolean(quieto)

  return (
    <div
      className="rounded-[18px] border border-[var(--borde)] bg-[var(--escenario)] p-4 sm:p-6 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12 lg:p-10"
      onMouseEnter={() => setFrenado(true)}
      onMouseLeave={() => setFrenado(false)}
    >
      <div className="flex flex-col">
        {/* Leyenda del paso activo: arriba de la pantalla en celular */}
        <div className="min-h-[118px] sm:min-h-[100px] lg:min-h-[170px]" aria-live="polite">
          <motion.div key={activo} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: SALIDA }}>
            <p className="text-[14px] font-semibold text-[var(--primario)]">Paso {activo + 1} de 4</p>
            <p className="mt-1.5 text-[clamp(1.35rem,2.3vw,2rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--navy)]">{paso.titulo}</p>
            <p className="mt-2 text-[15.5px] text-[var(--tenue)]">{paso.bajada}</p>
          </motion.div>
        </div>

        {/* Indicador 1 2 3 4 con su tiempo */}
        <ol aria-label="Pasos" className="mt-3 grid grid-cols-4 gap-2 lg:mt-auto lg:grid-cols-1 lg:gap-0">
          {PASOS_HERO.pasos.map((p, i) => (
            <li key={p.titulo}>
              <button
                type="button"
                onClick={() => setActivo(i)}
                aria-current={i === activo ? 'step' : undefined}
                aria-label={`Paso ${i + 1}: ${p.corto}`}
                className={`w-full text-left lg:border-t lg:border-[var(--borde)] lg:pt-3 ${
                  i === activo ? 'text-[var(--navy)]' : 'text-[var(--tenue)] hover:text-[var(--navy)]'
                }`}
              >
                <span className="flex items-center gap-3 text-[15px] font-medium">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${
                      i === activo ? 'bg-[var(--primario)] text-white' : 'bg-white text-[var(--tenue)] ring-1 ring-[var(--borde)]'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="hidden lg:inline">{p.corto}</span>
                </span>
                <span className="relative mt-3 block h-[3px] overflow-hidden rounded-full bg-[var(--primario-suave)] lg:h-[2px] lg:bg-transparent">
                  {i === activo && <Tiempo key={activo} frenado={pausa} alTerminar={siguiente} />}
                  {i < activo && <span className="absolute inset-0 bg-[var(--primario)] lg:hidden" />}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* La pantalla del paso */}
      <div className="relative mt-6 flex min-h-[260px] items-center pb-4 sm:min-h-[340px] lg:mt-0 lg:min-h-[480px]">
        <motion.div
          key={activo}
          className="w-full"
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: SALIDA }}
        >
          <Escena />
        </motion.div>
      </div>
    </div>
  )
}
