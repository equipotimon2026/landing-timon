'use client'

import { motion } from 'motion/react'
import { CAMBIO, CITA_PSICOPEDAGOGA } from './datos'
import { CharlaMini, OportunidadMini, PerfilMini } from './Piezas'

const SALIDA = [0.16, 1, 0.3, 1] as const
const H2 = 'text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.022em] text-[var(--navy)]'

const aparece = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 0.8, delay: i * 0.08, ease: SALIDA },
})

/**
 * El problema: el mundo del trabajo cambia rápido. Titular grande y tres
 * cifras con su fuente; la tercera queda marcada para completar.
 */
export function Cambio() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-28">
      <motion.h2 {...aparece()} className={`max-w-[22ch] ${H2}`}>
        Las carreras que tu hijo va a elegir están cambiando ahora.{' '}
        <span className="text-[var(--tenue)]">Lo que hoy se estudia no es lo que mañana se va a pedir.</span>
      </motion.h2>
      <ul className="mt-14 grid gap-px overflow-hidden rounded-[14px] bg-[var(--borde)] md:grid-cols-2">
        {CAMBIO.map((c, i) => (
          <motion.li key={c.texto} {...aparece(i)} className="flex flex-col bg-white p-7">
            <p className="text-[clamp(2.6rem,4.4vw,3.8rem)] font-light leading-none tracking-[-0.018em] text-[var(--primario)]">{c.cifra}</p>
            <p className="mt-4 max-w-[30ch] text-[16.5px] text-[var(--texto2)]">{c.texto}</p>
            <p className="mt-auto pt-6 text-[12.5px] text-[var(--tenue)]">Fuente: {c.fuente}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

/**
 * Confianza: quién está detrás del método. Solo lo documentado (repo y
 * timon-brain, 14/11/2026): tres psicopedagogas evaluaron el producto, un
 * equipo profesional de la UBA revisó la metodología, el recorrido tiene 13
 * paradas y 10 dimensiones, y existe la revisión con un profesional como
 * adicional. [PSICÓLOGOS: nombres/matrícula] No hay nombres ni matrículas
 * publicables; "diseñado por psicólogos" queda sin confirmar.
 */
const PILARES = [
  {
    titulo: 'Un método, no un cuestionario.',
    texto: '13 paradas y 10 dimensiones de análisis: qué le atrae, su historia en el colegio, su familia y la mirada de alguien que lo conoce.',
  },
  {
    titulo: 'Evaluado por psicopedagogas.',
    texto: 'Tres psicopedagogas evaluaron el producto y un equipo profesional de la UBA revisó la metodología.',
  },
  {
    titulo: 'Un profesional para revisarlo.',
    texto: 'Si quieren, repasan el informe con un profesional en una reunión aparte.',
  },
]

export function Confianza() {
  return (
    <section className="bg-[var(--primario-tinte)] px-5 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1312px] gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <motion.h2 {...aparece()} className={`max-w-[20ch] ${H2}`}>
          {/* [CONFIRMAR] La frase pedida era "Diseñado por psicólogos y psicopedagogos": lo documentado es que lo evaluaron. */}
          Pensado con psicopedagogas, <span className="text-[var(--primario)]">no armado por un algoritmo.</span>
        </motion.h2>
        <motion.figure {...aparece(1)} className="rounded-[14px] bg-[var(--primario)] p-7 text-white">
          <blockquote className="text-[clamp(1.5rem,2.2vw,1.9rem)] font-light leading-[1.2] tracking-[-0.018em]">“{CITA_PSICOPEDAGOGA.texto}”</blockquote>
          <figcaption className="mt-6 text-[14px] text-white/75">
            <span className="block font-semibold text-white">{CITA_PSICOPEDAGOGA.quien}</span>
            {CITA_PSICOPEDAGOGA.rol}
          </figcaption>
        </motion.figure>
      </div>
      <ul className="mx-auto mt-12 grid max-w-[1312px] gap-3 md:grid-cols-3">
        {PILARES.map((p, i) => (
          <motion.li key={p.titulo} {...aparece(i)} className="rounded-[14px] bg-white p-7">
            <p className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--navy)]">{p.titulo}</p>
            <p className="mt-2 text-[16px] text-[var(--texto2)]">{p.texto}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

/**
 * El camino en el tiempo: hoy decide, durante la carrera sigue conectado y
 * después se le abren oportunidades. Solo la primera etapa existe hoy en la
 * app; las otras dos van marcadas [CONFIRMAR].
 */
const ETAPAS = [
  {
    cuando: 'Hoy',
    titulo: 'Decide qué estudiar.',
    texto: 'Se conoce en 13 paradas, charla con profesionales de 16 áreas, recibe su informe y compara universidades.',
    Pieza: PerfilMini,
    existe: true,
  },
  {
    // [CONFIRMAR] No existe en la app: seguir hablando con profesionales durante la carrera.
    cuando: 'Durante la carrera',
    titulo: 'Sigue conectado.',
    texto: 'Habla con profesionales mientras cursa y se mantiene al día con hacia dónde va su área.',
    Pieza: CharlaMini,
    existe: false,
  },
  {
    // [CONFIRMAR] No existe en la app: oportunidades laborales a través de la red.
    cuando: 'Después',
    titulo: 'Se le abren puertas.',
    texto: 'La misma red de profesionales y empresas le acerca oportunidades de trabajo.',
    Pieza: OportunidadMini,
    existe: false,
  },
]

export function Camino() {
  return (
    <section id="como-funciona" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-20 lg:px-16 lg:py-28">
      <motion.h2 {...aparece()} className={`max-w-[24ch] ${H2}`}>
        No es un test de una vez. <span className="text-[var(--tenue)]">La conexión lo acompaña en el camino.</span>
      </motion.h2>
      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-[11px] hidden h-[2px] origin-left bg-[var(--primario)] md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.6, ease: SALIDA }}
        />
        {ETAPAS.map((e, i) => (
          <motion.li key={e.cuando} {...aparece(i + 1)} className="relative">
            <span className={`relative z-10 block h-6 w-6 rounded-full border-[3px] border-[var(--primario)] ${i === 0 ? 'bg-[var(--primario)]' : 'bg-white'}`} />
            <p className="mt-5 text-[14px] font-semibold text-[var(--primario)]">{e.cuando}</p>
            <h3 className="mt-1 text-[22px] font-medium tracking-[-0.018em] text-[var(--navy)]">{e.titulo}</h3>
            <p className="mt-2 max-w-[34ch] text-[16px] text-[var(--texto2)]">{e.texto}</p>
            <div className="mt-6 h-[200px] overflow-hidden rounded-[14px] ring-1 ring-[var(--borde)]">
              <e.Pieza />
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
