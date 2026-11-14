import { ArrowRight } from 'lucide-react'
import { AREAS_CORTAS, CITA_PSICOPEDAGOGA } from './datos'

/**
 * Prueba social con el formato de Ramp: una frase con dato a la izquierda y,
 * a la derecha, una grilla separada por cruces finas más una tarjeta de caso.
 * Timon no muestra logos: la grilla son las áreas que recorre tu hijo y la
 * tarjeta es la cita real de la psicopedagoga que evaluó la metodología.
 */
export function Prueba() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-16 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:pt-2">
          <p className="max-w-[24ch] text-[clamp(1.35rem,2vw,1.6rem)] font-medium leading-[1.25] tracking-[-0.025em] text-[var(--navy)]">
            Lo probaron alumnos de 5° y 6° año{' '}
            <span className="text-[var(--tenue)]">del Colegio María Guadalupe, y les gustó.</span>
          </p>
          <a href="#testimonios" className="mt-6 inline-flex items-center gap-1.5 text-[15px] text-[var(--navy)] hover:text-[var(--ocean)]">
            Qué dijeron de Timon <ArrowRight size={15} aria-hidden />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_270px]">
          <div className="relative">
            <p className="sr-only">Algunas de las 16 áreas de trabajo que recorre:</p>
            <ul className="grid grid-cols-2 gap-px bg-[var(--borde)] sm:grid-cols-3 lg:grid-cols-4">
              {AREAS_CORTAS.map((a) => (
                <li
                  key={a}
                  className="flex h-[86px] items-center justify-center bg-white px-3 text-center text-[16px] font-semibold tracking-[-0.02em] text-[var(--navy)]/75 lg:h-[96px]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <figure className="flex min-h-[220px] flex-col justify-between rounded-[14px] bg-[var(--navy)] p-6 text-white">
            <blockquote className="text-[22px] font-light leading-[1.2] tracking-[-0.03em]">“{CITA_PSICOPEDAGOGA.texto}”</blockquote>
            <figcaption className="mt-6 text-[13.5px] text-white/70">
              <span className="block font-semibold text-white">{CITA_PSICOPEDAGOGA.quien}</span>
              {CITA_PSICOPEDAGOGA.rol}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
