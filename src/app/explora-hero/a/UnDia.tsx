'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Avatar } from './Avatar'
import { ABANICO } from './futuros'

type Dia = { id: string; titulo: string; horas: [string, string][]; sorpresa: string }

/** Un día común de tres de las personas del abanico, contado por ellas. */
const DIAS: Dia[] = [
  {
    id: 'sofi',
    titulo: 'Un martes de Sofi',
    horas: [
      ['9:00', 'Reunión corta con su equipo: cada uno cuenta en qué está y dónde se trabó.'],
      ['10:30', 'Programa la parte de la app que calcula las cuotas de un préstamo.'],
      ['13:00', 'Almuerza con la gente de diseño y de atención al cliente.'],
      ['15:00', 'Mira cómo usan la app personas reales y anota qué les cuesta.'],
      ['17:30', 'Revisa el código de un compañero antes de que salga.'],
    ],
    sorpresa: 'Que iba a hablar con personas más que con la compu.',
  },
  {
    id: 'caro',
    titulo: 'Una guardia de Caro',
    horas: [
      ['7:00', 'Pase de sala: repasa con su equipo cómo pasó la noche cada paciente.'],
      ['9:30', 'Atiende consultas en la guardia y pide estudios.'],
      ['13:00', 'Ateneo: un caso difícil se discute entre todos los residentes.'],
      ['16:00', 'Les explica a una familia, con palabras simples, qué va a pasar.'],
      ['19:00', 'Estudia una hora. En medicina no se deja nunca de estudiar.'],
    ],
    sorpresa: 'Que explicar le iba a costar más que saber.',
  },
  {
    id: 'martin',
    titulo: 'Un jueves de Martín',
    horas: [
      ['9:30', 'Café y bocetos a mano de una silla para un cliente de Rosario.'],
      ['11:00', 'Pasa el boceto a 3D en la computadora y prueba medidas.'],
      ['14:00', 'Visita el taller que la va a fabricar y discute materiales.'],
      ['16:30', 'Corrige el diseño: el prototipo se movía al sentarse.'],
      ['18:00', 'Presenta tres opciones y defiende la que más le gusta.'],
    ],
    sorpresa: 'Que diseñar es tanto hablar con el taller como dibujar.',
  },
]

const NUMEROS = [
  { valor: '16', texto: 'áreas de trabajo' },
  { valor: '300', texto: 'carreras' },
  { valor: '50', texto: 'universidades' },
]

/**
 * Responde la pregunta que deja abierta el hero: ¿cómo es un día de verdad?
 * Tres días contados por las personas del abanico, y cómo lo vive tu hijo en
 * la app.
 */
export function UnDia() {
  const [activo, setActivo] = useState(DIAS[0].id)
  const quieto = useReducedMotion()
  const dia = DIAS.find((d) => d.id === activo) ?? DIAS[0]

  return (
    <>
      <div className="bg-[var(--arena)] px-5 pb-6 pt-2">
        <dl className="mx-auto flex max-w-[760px] items-baseline justify-center gap-6 text-center sm:gap-14">
          {NUMEROS.map((n) => (
            <div key={n.texto}>
              <dt className="sr-only">{n.texto}</dt>
              <dd>
                <span className="block text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-none tracking-[-0.04em] text-[var(--navy)]">
                  {n.valor}
                </span>
                <span className="mt-1.5 block text-[13.5px] text-[var(--tenue)] sm:text-[15px]">{n.texto}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section id="como" aria-labelledby="como-titulo" className="scroll-mt-16 bg-[var(--arena)] px-5 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-[1120px]">
          <h2 id="como-titulo" className="display max-w-[20ch] text-[clamp(2.1rem,4.6vw,4rem)]">
            ¿Sabe tu hijo cómo es un día de un ingeniero, una médica o un&nbsp;diseñador?
          </h2>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--texto2)] md:text-[19px]">
            Casi nadie lo sabe a los 17. En Timon se lo cuentan quienes lo viven todos los días, con lo lindo y con lo que cuesta.
          </p>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10">
            <div role="tablist" aria-label="Elegí un día" className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:gap-3">
              {DIAS.map((d) => {
                const p = ABANICO.find((a) => a.id === d.id)
                if (!p) return null
                const sel = d.id === activo
                return (
                  <button
                    key={d.id}
                    role="tab"
                    aria-selected={sel}
                    onClick={() => setActivo(d.id)}
                    className={`flex shrink-0 items-center gap-3 rounded-[20px] border p-2.5 pr-5 text-left transition-colors md:p-3 ${
                      sel ? 'border-[var(--ocean)] bg-white shadow-[0_14px_30px_-20px_rgba(15,31,54,0.5)]' : 'border-[var(--borde)] bg-transparent hover:bg-white/60'
                    }`}
                  >
                    <Avatar rasgos={p.rasgos} size={48} className="shrink-0" />
                    <span>
                      <span className="block text-[15px] font-semibold leading-tight">{p.nombre}</span>
                      <span className="hidden text-[14px] leading-snug text-[var(--texto2)] md:block">{p.rol}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div role="tabpanel" className="relative min-h-[460px] rounded-[28px] border border-[var(--borde)] bg-white p-6 md:p-9">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={dia.id}
                  initial={{ opacity: 0, y: quieto ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: quieto ? 0 : -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-[22px] font-medium tracking-[-0.02em] md:text-[26px]">{dia.titulo}</h3>
                  <ol className="mt-6 space-y-4">
                    {dia.horas.map(([h, t]) => (
                      <li key={h} className="grid grid-cols-[3.5rem_1fr] gap-3 text-[15.5px] leading-snug md:text-[16.5px]">
                        <span className="tabular-nums text-[var(--terra)]">{h}</span>
                        <span className="text-[var(--texto2)]">{t}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-7 rounded-[18px] bg-[var(--crema)] px-5 py-4 text-[15.5px] leading-snug">
                    <span className="text-[var(--tenue)]">Lo que no sabía a los 17: </span>
                    {dia.sorpresa}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
            <p className="titulo text-[clamp(1.5rem,2.6vw,2.1rem)]">
              En la app, tu hijo elige las áreas que le dan curiosidad y charla con un profesional de cada una.
            </p>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-[var(--borde)] bg-white shadow-[0_30px_60px_-30px_rgba(15,31,54,0.35)]">
              <Image
                src="/app/mac-investigacion.webp"
                alt="La pantalla de Timon donde tu hijo elige áreas de trabajo y charla con un profesional de cada una"
                fill
                sizes="(min-width: 768px) 640px, 92vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
