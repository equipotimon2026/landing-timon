'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Check, House, LockKeyhole } from 'lucide-react'
import { FUNDADORES } from '@/lib/programa'

/**
 * Tarjeta con "spotlight" (patrón de Aceternity UI): un brillo suave sigue al
 * mouse. Solo CSS vars; en táctil no hace nada.
 */
function Tarjeta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`tesela spotlight relative overflow-hidden rounded-[30px] ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </div>
  )
}

const ETAPAS = ['Se conoce', 'Investiga', 'Se descubre', 'Compara']

/**
 * Lo que recibe el padre o la madre, mostrado y no explicado: el avance de su
 * hijo, el tiempo, desde dónde, quién acompaña y cuánto cuesta empezar.
 */
export function ParaVos() {
  const quieto = useReducedMotion()
  const t = (d: number, delay = 0) => (quieto ? { duration: 0 } : { duration: d, delay, ease: [0.22, 1, 0.36, 1] as const })
  const vista = { once: true, margin: '-15% 0px' }

  return (
    <div className="grid gap-4 md:grid-cols-6">
      {/* Avance: cómo lo ve el padre (ilustración) */}
      <Tarjeta className="bg-[var(--ocean)] p-7 text-white sm:p-9 md:col-span-4">
        <p className="titulo text-[clamp(1.7rem,2.8vw,2.3rem)]">Así ves su avance.</p>
        <div className="mt-7 rounded-[22px] bg-white p-5 text-[var(--navy)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--durazno)] font-semibold text-[var(--terra-hondo)]">S</span>
              <div className="leading-tight">
                <p className="font-semibold">Sofía</p>
                <p className="text-[13px] text-[var(--tenue)]">9 de 13 paradas</p>
              </div>
            </div>
            <span className="text-[14px] font-medium text-[var(--ocean)]">En camino</span>
          </div>
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[var(--arena)]">
            <motion.div
              className="h-full origin-left rounded-full bg-[linear-gradient(90deg,var(--ocean),var(--terra))]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 9 / 13 }}
              viewport={vista}
              transition={t(1.4, 0.2)}
            />
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
            {ETAPAS.map((e, i) => (
              <motion.li
                key={e}
                className="flex items-center gap-1.5 text-[14px] font-medium"
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: i < 2 ? 1 : 0.5 }}
                viewport={vista}
                transition={t(0.4, 0.5 + i * 0.2)}
              >
                {i < 2 && <Check size={15} strokeWidth={2.6} className="text-[#2fa36b]" aria-label="hecho" />}
                {e}
              </motion.li>
            ))}
          </ul>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[14px] text-white/75">
          <LockKeyhole size={14} aria-hidden /> Lo que responde es suyo. Vos ves el avance y el informe final.
        </p>
      </Tarjeta>

      {/* Dos semanas */}
      <Tarjeta className="flex flex-col justify-between gap-6 bg-[var(--terra)] p-7 text-white sm:p-9 md:col-span-2">
        <p className="display text-[clamp(3.2rem,5.4vw,4.6rem)] leading-none">
          <strong>2</strong> semanas
        </p>
        <ol aria-hidden className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 14 }, (_, i) => (
            <motion.li
              key={i}
              className="aspect-square rounded-md"
              initial={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
              whileInView={{ backgroundColor: i % 3 === 2 ? 'rgba(255,255,255,0.18)' : '#f5ede0' }}
              viewport={vista}
              transition={t(0.25, 0.2 + i * 0.07)}
            />
          ))}
        </ol>
        <p className="text-[16px] text-white/85">Un rato por día, cuando le quede cómodo.</p>
      </Tarjeta>

      {/* Desde casa */}
      <Tarjeta className="flex flex-col justify-between gap-6 bg-[var(--crema)] p-7 sm:p-9 md:col-span-2">
        <House size={40} className="text-[var(--terra)]" aria-hidden />
        <div>
          <p className="titulo text-[clamp(1.7rem,2.6vw,2.1rem)]">Desde casa.</p>
          <p className="mt-1 text-[16px] text-[var(--texto2)]">Con el celular o la compu, sin moverse.</p>
        </div>
      </Tarjeta>

      {/* Personas que acompañan */}
      <Tarjeta className="flex flex-col justify-between gap-6 bg-[var(--cielo)] p-7 sm:p-9 md:col-span-2">
        <div className="flex -space-x-3">
          {FUNDADORES.map((f, i) => (
            <span
              key={f.nombre}
              className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[var(--cielo)] text-[20px] font-semibold text-white"
              style={{ background: ['#1e5ba0', '#c97f5e', '#0f1f36'][i % 3] }}
              title={`${f.nombre} · ${f.rol}`}
            >
              {f.nombre[0]}
            </span>
          ))}
        </div>
        <div>
          <p className="titulo text-[clamp(1.7rem,2.6vw,2.1rem)]">Del otro lado hay personas.</p>
          <p className="mt-1 text-[16px] text-[var(--texto2)]">El equipo de Timon los acompaña.</p>
        </div>
      </Tarjeta>

      {/* Empezar es gratis */}
      <Tarjeta className="flex flex-col justify-between gap-6 bg-[var(--navy)] p-7 text-white sm:p-9 md:col-span-2">
        <div className="mt-auto">
          <p className="titulo text-[clamp(1.7rem,2.6vw,2.1rem)]">Empezar es gratis.</p>
          <p className="mt-1 text-[16px] text-white/70">No pide tarjeta. Después deciden juntos si sigue.</p>
        </div>
      </Tarjeta>
    </div>
  )
}
