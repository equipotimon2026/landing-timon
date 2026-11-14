'use client'

import { useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { Isotipo } from '@/components/home/Isotipo'
import { CONTACT_EMAIL, FUNDADORES } from '@/lib/programa'
import { URL_ENTRAR } from '@/lib/landing'

const SALIDA = [0.16, 1, 0.3, 1] as const
const H2 = 'text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[var(--navy)]'

const aparece = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 0.8, delay: i * 0.08, ease: SALIDA },
})

/** Respuestas por momento: salen de lo que ya dice la home, sin promesas nuevas. */
const MOMENTOS = [
  {
    id: 'colegio',
    label: 'Está en 4°, 5° o 6° año',
    texto: 'Lo hace en dos semanas, un rato por día y desde el celular, antes de tener que anotarse en una carrera.',
  },
  {
    id: 'termine',
    label: 'Terminó y no sabe qué seguir',
    texto: 'Ordena sus opciones: ve qué áreas le atraen, qué carreras van con él y dónde estudiarlas.',
  },
  {
    id: 'cambio',
    label: 'Se quiere cambiar de carrera',
    texto: 'Antes de cambiar, ve cómo es el trabajo por dentro y compara carreras y universidades con su perfil.',
  },
]

/** La banda gris de Ramp ("recomendaciones para tu negocio"), con el momento de tu hijo. */
export function Momento() {
  const [elegido, setElegido] = useState<string>('colegio')
  const actual = MOMENTOS.find((m) => m.id === elegido) ?? MOMENTOS[0]
  return (
    <section className="bg-[var(--primario-tinte)] px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-[640px] text-center">
        <h2 className={H2}>
          ¿En qué momento está tu hijo? <span className="text-[var(--tenue)]">Te contamos cómo lo ayuda Timon.</span>
        </h2>
        <div role="radiogroup" aria-label="Momento de tu hijo" className="mt-9 grid gap-2 sm:grid-cols-3">
          {MOMENTOS.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={m.id === elegido}
              onClick={() => setElegido(m.id)}
              className={`min-h-[52px] rounded-[8px] border px-3 py-2 text-[14.5px] font-medium leading-snug transition-colors ${
                m.id === elegido
                  ? 'border-[var(--primario)] bg-white text-[var(--primario-hondo)] ring-1 ring-[var(--primario)]'
                  : 'border-[var(--borde)] bg-white/60 text-[var(--texto2)] hover:border-[var(--tenue)]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mx-auto mt-6 min-h-[3.2em] max-w-[50ch] text-[17px] text-[var(--texto2)]">
          {actual.texto}
        </p>
        <a
          href="#anotalo"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-[8px] bg-[var(--primario)] text-[15.5px] font-semibold text-white hover:bg-[var(--primario-hondo)]"
        >
          Quiero anotar a mi hijo
        </a>
      </div>
    </section>
  )
}

/** Banner horizontal de Ramp ("ver qué pueden automatizar los agentes"). */
export function Banner() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-16">
      <motion.div
        {...aparece()}
        className="flex flex-col gap-5 rounded-[14px] border border-[var(--primario-suave)] bg-[var(--primario-tinte)] px-7 py-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-[17px] font-semibold text-[var(--navy)]">Probá el test de intereses, gratis.</p>
          <p className="mt-1 text-[15px] text-[var(--texto2)]">Dieciocho actividades y en un rato ve en qué áreas están sus intereses.</p>
        </div>
        <a href="/test" className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-[6px] bg-[var(--primario)] px-5 text-[15px] font-semibold text-white hover:bg-[var(--primario-hondo)] sm:self-auto">
          Hacer el test <ArrowRight size={16} aria-hidden />
        </a>
      </motion.div>
    </section>
  )
}

/**
 * "Escalá el equipo", la sección de Ramp con titular centrado y columnas,
 * usada para la historia de Timon. La historia todavía no está escrita en
 * ningún lado: queda marcada para completar, sin inventar nada.
 */
export function Historia() {
  return (
    <section id="historia" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-20 lg:px-16 lg:py-28">
      <motion.div {...aparece()} className="mx-auto max-w-[760px] text-center">
        <h2 className={H2}>
          Hecho en Argentina. <span className="text-[var(--tenue)]">Por Facu, Feli y Nico.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] rounded-[8px] border border-dashed border-[var(--terra)] px-4 py-3 text-[15px] text-[var(--terra-hondo)]">
          [HISTORIA: completar] Por qué empezamos Timon, cuándo y cómo arrancó.
        </p>
      </motion.div>
      <ul className="mx-auto mt-14 grid max-w-[1000px] gap-3 sm:grid-cols-3">
        {FUNDADORES.map((f, i) => (
          <motion.li key={f.nombre} {...aparece(i)} className="rounded-[14px] bg-[var(--escenario)] p-6">
            <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-white text-[24px] font-light text-[var(--primario)] ring-1 ring-[var(--borde)]">
              {f.nombre[0]}
            </span>
            <p className="mt-8 text-[18px] font-semibold tracking-[-0.02em] text-[var(--navy)]">{f.nombre}</p>
            <p className="text-[15px] text-[var(--tenue)]">{f.rol}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

/**
 * El muro de testimonios de Ramp. La única cita textual documentada es la de
 * la psicopedagoga (MEMORY.md: "es textual y sí sale"). Lo del Colegio María
 * Guadalupe y la UBA está contado con nuestras palabras, no son citas: quedan
 * como lugar para una cita real con permiso.
 */
const CITAS = [
  { texto: '“Es una visión integral, no un simple test.”', quien: 'Psicopedagoga', rol: 'Evaluó la metodología de Timon', real: true },
  { texto: '[CITA REAL: completar]', quien: '[CITA REAL: completar]', rol: 'Alumno o familia, con permiso para publicar', real: false },
  { texto: '[CITA REAL: completar]', quien: '[CITA REAL: completar]', rol: 'Profesional o colegio, con permiso para publicar', real: false },
]

export function Testimonios() {
  return (
    <section id="testimonios" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-20 lg:px-16 lg:py-28">
      <motion.div {...aparece()} className="text-center">
        <p className="text-[14px] text-[var(--tenue)]">Lo que dijeron quienes lo revisaron y lo probaron</p>
        <h2 className={`mt-3 ${H2}`}>No es un simple test.</h2>
      </motion.div>
      <ul className="mt-12 grid gap-3 md:grid-cols-3">
        {CITAS.map((c, i) => (
          <motion.li
            key={i}
            {...aparece(i)}
            className={`flex flex-col justify-between rounded-[14px] border bg-white p-6 ${c.real ? 'border-[var(--borde)]' : 'border-dashed border-[var(--terra)]'}`}
          >
            <p className={`text-[17px] leading-[1.5] ${c.real ? 'text-[var(--navy)]' : 'text-[var(--terra-hondo)]'}`}>{c.texto}</p>
            <div className="mt-8 border-t border-[var(--borde)] pt-4">
              <p className="text-[15px] font-semibold text-[var(--navy)]">{c.quien}</p>
              <p className="text-[14px] text-[var(--tenue)]">{c.rol}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

/** Mismas preguntas que la home (src/app/page.tsx). */
const PREGUNTAS = [
  {
    q: '¿Es otro test vocacional?',
    a: 'Arranca con unas paradas para conocerse, pero eso es solo el principio. Después investiga cómo se trabaja en cada área, recibe su informe y compara universidades.',
  },
  {
    q: '¿Mi hijo lo va a usar?',
    a: 'Cada parada dura menos de 10 minutos y se hace desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Además, vos ves si avanza.',
  },
  { q: '¿Cuánto cuesta?', a: 'Empezar es gratis. El precio depende del plan, y te lo contamos cuando te escribimos.' },
  {
    q: '¿Quién está detrás?',
    a: 'Somos Facu, Feli y Nico, de Argentina. Una psicopedagoga evaluó la metodología y un equipo profesional de la UBA la revisó.',
  },
  { q: '¿Puedo ver sus respuestas?', a: 'No. Lo que responde es suyo. Vos ves cómo avanza y el informe final.' },
]

export function Preguntas() {
  return (
    <section id="preguntas" className="mx-auto grid max-w-[1440px] scroll-mt-20 gap-10 px-5 py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-16 lg:py-28">
      <h2 className={H2}>
        Preguntas. <span className="text-[var(--tenue)]">Las que nos hacen siempre.</span>
      </h2>
      <div className="border-t border-[var(--borde)]">
        {PREGUNTAS.map((p) => (
          <details key={p.q} className="group border-b border-[var(--borde)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-medium tracking-[-0.015em] text-[var(--navy)] [&::-webkit-details-marker]:hidden">
              {p.q}
              <Plus size={18} aria-hidden className="shrink-0 text-[var(--tenue)] transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-[60ch] pb-6 text-[16.5px] text-[var(--texto2)]">{p.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** Cierre de Ramp: tarjeta blanca con el CTA que pisa el footer navy. */
export function Cierre({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--primario)]">
      <section id="anotalo" className="scroll-mt-20 rounded-b-[28px] bg-white px-5 pb-20 pt-6 lg:rounded-b-[40px] lg:pb-28">
        <div className="mx-auto max-w-[960px]">
          <h2 className={`text-center ${H2}`}>
            Que tu hijo no elija solo. <span className="text-[var(--primario)]">Que elija conectado.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-center text-[17px] text-[var(--tenue)]">
            Dejanos tus datos y los de tu hijo. Te escribimos para contarte cómo sigue.
          </p>
          <div className="mt-10">{children}</div>
        </div>
      </section>
      <footer className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-12 pt-16 text-[14.5px] text-white/80 sm:grid-cols-2 lg:grid-cols-4 lg:px-16">
        <div>
          <p className="inline-flex items-center gap-2 text-[18px] font-semibold text-white">
            <Isotipo size={20} className="text-white" /> Timon
          </p>
          <p className="mt-3 max-w-[30ch]">Para que tu hijo elija carrera conociendo el mundo real.</p>
        </div>
        <nav aria-label="El programa" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-white">El programa</p>
          <a href="#modulos" className="hover:text-white">Qué incluye</a>
          <a href="#como-funciona" className="hover:text-white">Cómo funciona</a>
          <a href="/test" className="hover:text-white">Test de intereses gratis</a>
        </nav>
        <nav aria-label="Timon" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-white">Timon</p>
          <a href="#historia" className="hover:text-white">Quiénes somos</a>
          <a href="#preguntas" className="hover:text-white">Preguntas</a>
          <a href={URL_ENTRAR} className="hover:text-white">Entrar</a>
        </nav>
        <div className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-white">Contacto</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
          <a href="/terminos" className="hover:text-white">Términos y condiciones</a>
        </div>
        <p className="border-t border-white/20 pt-6 text-[13px] text-white/70 sm:col-span-2 lg:col-span-4">© 2026 Timon. Hecho en Argentina.</p>
      </footer>
    </div>
  )
}
