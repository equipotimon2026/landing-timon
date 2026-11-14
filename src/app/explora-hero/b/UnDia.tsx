'use client'

import Image from 'next/image'
import { CodeXml, PenTool, Stethoscope, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const SUAVE = [0.22, 1, 0.36, 1] as const

type Dia = {
  nombre: string
  rol: string
  icono: LucideIcon
  tono: { fondo: string; tinta: string }
  horas: [string, string][]
  nota: string
}

/** Personas y lugares ficticios. */
const DIAS: Dia[] = [
  {
    nombre: 'Julián Paz',
    rol: 'Ingeniero en sistemas, en una fintech',
    icono: CodeXml,
    tono: { fondo: 'var(--cielo)', tinta: 'var(--ocean)' },
    horas: [
      ['9:00', 'Reunión de quince minutos con su equipo.'],
      ['10:00', 'Programa una función nueva de la app.'],
      ['15:00', 'Revisa el código de una compañera.'],
      ['17:30', 'Arregla un error que apareció en la app.'],
    ],
    nota: 'Es más resolver acertijos en equipo que estar solo con la compu.',
  },
  {
    nombre: 'Carolina Vidal',
    rol: 'Médica clínica, en un hospital',
    icono: Stethoscope,
    tono: { fondo: 'var(--durazno)', tinta: 'var(--terra-hondo)' },
    horas: [
      ['7:30', 'Pasa por la sala con los residentes.'],
      ['10:00', 'Consultorio: doce pacientes en la mañana.'],
      ['14:00', 'Discute un caso difícil con otros médicos.'],
      ['17:00', 'Estudia: la medicina cambia todo el tiempo.'],
    ],
    nota: 'Lo mejor es cuando alguien vuelve a contarte que está bien.',
  },
  {
    nombre: 'Matías Rey',
    rol: 'Diseñador industrial, en un estudio',
    icono: PenTool,
    tono: { fondo: 'var(--crema)', tinta: 'var(--navy)' },
    horas: [
      ['9:30', 'Bocetos a mano de una silla nueva.'],
      ['11:00', 'La modela en 3D y calcula materiales.'],
      ['14:30', 'Va al taller a probar el prototipo.'],
      ['17:00', 'Corrige el diseño con lo que vio.'],
    ],
    nota: 'Ver algo que dibujaste convertido en objeto no tiene precio.',
  },
]

/**
 * La sección que responde la pregunta del hero: el tronco baja y se abre en
 * tres vías, una por persona, cada una con su día contado hora por hora.
 */
export function UnDia() {
  const quieto = useReducedMotion()
  // El estado inicial es el mismo en el servidor y en el cliente; con menos movimiento, la transición dura 0.
  const dibujar = (delay: number) => ({
    initial: { strokeDashoffset: 1 },
    whileInView: { strokeDashoffset: 0 },
    viewport: { once: true, margin: '0px 0px -15% 0px' },
    transition: quieto ? { duration: 0 } : { duration: 1.1, ease: SUAVE, delay },
  })

  return (
    <section id="un-dia" className="relative scroll-mt-14 bg-[var(--arena)] px-5 pb-24 pt-44 sm:pb-32 sm:pt-36">
      {/* El tronco del hero sigue por debajo de la tarjeta de la pregunta. */}
      <span aria-hidden className="absolute left-1/2 top-0 h-[156px] w-[2px] -translate-x-1/2 bg-[linear-gradient(var(--terra)_50%,transparent)] opacity-60 sm:h-[120px]" />
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--navy)] [text-wrap:balance]">
            En Timon se lo cuenta{' '}
            <span className="bg-[linear-gradient(90deg,var(--ocean),var(--terra))] bg-clip-text text-transparent">quien lo vive</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[17px] leading-[1.6] text-[var(--texto2)]">
            Charla con profesionales de cada área que le cuentan su día real: qué hacen, qué les cuesta y qué los entusiasma. Así una
            carrera deja de ser solo un nombre.
          </p>
        </div>

        {/* El tronco que llega del hero y se abre en tres. */}
        <svg aria-hidden viewBox="0 0 1100 90" preserveAspectRatio="none" className="mt-10 hidden h-[90px] w-full md:block">
          {[
            'M550 0 V40 Q550 50 540 50 H193 Q183 50 183 60 V90',
            'M550 0 V90',
            'M550 0 V40 Q550 50 560 50 H907 Q917 50 917 60 V90',
          ].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke={i === 1 ? 'var(--terra)' : 'var(--ocean)'}
              strokeOpacity={0.5}
              strokeWidth={1.5}
              pathLength={1}
              strokeDasharray="1 2"
              {...dibujar(i * 0.12)}
            />
          ))}
        </svg>

        <div className="mt-10 grid gap-5 md:mt-0 md:grid-cols-3">
          {DIAS.map((dia, i) => {
            const Icono = dia.icono
            return (
              <motion.article
                key={dia.nombre}
                className="flex flex-col rounded-[18px] border border-[var(--borde)] bg-white p-6 shadow-[0_1px_2px_rgba(15,31,54,0.04),0_18px_40px_-24px_rgba(15,31,54,0.22)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={quieto ? { duration: 0 } : { duration: 0.7, ease: SUAVE, delay: 0.25 + i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-[11px]" style={{ background: dia.tono.fondo, color: dia.tono.tinta }}>
                    <Icono size={19} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.02em] text-[var(--navy)]">{dia.nombre}</h3>
                    <p className="text-[14px] leading-snug text-[var(--tenue)]">{dia.rol}</p>
                  </div>
                </div>
                <ol className="mt-5 space-y-0 border-t border-[var(--borde)]">
                  {dia.horas.map(([hora, texto]) => (
                    <li key={hora} className="flex gap-4 border-b border-[var(--borde)] py-3 text-[15px] leading-snug text-[var(--texto2)]">
                      <span className="w-11 shrink-0 font-semibold tabular-nums text-[var(--ocean)]">{hora}</span>
                      {texto}
                    </li>
                  ))}
                </ol>
                <p className="mt-5 font-[family-name:var(--font-mano)] text-[19px] leading-[1.3] text-[var(--terra-hondo)]">“{dia.nota}”</p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-[1fr_1.25fr]">
          <div>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[var(--navy)] [text-wrap:balance]">
              Elige sus áreas y charla con alguien de cada una.
            </h3>
            <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.6] text-[var(--texto2)]">
              Hay 16 áreas de trabajo, 300 carreras y 50 universidades para recorrer. Él marca las que le dan curiosidad y empieza por ahí.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[18px] border border-[var(--borde)] bg-white shadow-[0_1px_2px_rgba(15,31,54,0.04),0_24px_50px_-28px_rgba(15,31,54,0.3)]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/app/mac-investigacion.webp"
                alt="Pantalla de Timon donde el chico elige áreas de trabajo y charla con un profesional de cada una"
                fill
                sizes="(min-width: 768px) 600px, 92vw"
                className="scale-[1.3] object-cover object-[50%_42%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
