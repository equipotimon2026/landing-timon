'use client'

import { Escenario } from './Escenario'

/**
 * Hero con la estructura de ramp.com: eyebrow con un dato, titular de una
 * línea, bajada gris, campo + botón dentro de un mismo borde y, abajo, el
 * escenario con el producto. El campo lleva el mail al formulario de padres.
 */
export function Hero({ alEnviar }: { alEnviar: (email: string) => void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-12 sm:pt-16 lg:px-16 lg:pt-[72px]">
      <p className="text-[13px] text-[var(--tenue)]">
        Revisado por un equipo profesional de la UBA y evaluado por una psicopedagoga
      </p>
      <h1 className="mt-5 text-[clamp(2.6rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[var(--navy)]">
        Que conozca el mundo real. <span className="text-[var(--primario)]">Y elija bien.</span>
      </h1>
      <p className="mt-4 max-w-[60ch] text-[18px] leading-snug text-[var(--tenue)] sm:text-[19.5px]">
        Profesionales, empresas y universidades, para que tu hijo decida su futuro sabiendo qué elige.
      </p>
      <form
        className="mt-8 flex max-w-[500px] flex-col gap-2 rounded-[10px] border border-[var(--borde)] bg-white p-1.5 focus-within:border-[var(--primario)] sm:flex-row sm:items-center"
        onSubmit={(e) => {
          e.preventDefault()
          const email = new FormData(e.currentTarget).get('email')
          alEnviar(typeof email === 'string' ? email.trim() : '')
        }}
      >
        <label htmlFor="hero-mail" className="sr-only">
          Tu mail
        </label>
        <input
          id="hero-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Tu mail"
          className="h-12 min-w-0 flex-1 rounded-[6px] bg-transparent px-4 text-[16.5px] text-[var(--navy)] outline-none placeholder:text-[var(--tenue)] max-sm:text-center"
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-[6px] bg-[var(--primario)] px-5 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--primario-hondo)]"
        >
          Quiero anotar a mi hijo
        </button>
      </form>
      <div className="mt-11">
        <Escenario />
      </div>
    </section>
  )
}
