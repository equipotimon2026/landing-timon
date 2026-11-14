'use client'

import { Cifras } from './Cifras'
import { Escenario } from './Escenario'

/**
 * Hero con la estructura de ramp.com: eyebrow con un dato, titular de una
 * línea, bajada gris, campo + botón dentro de un mismo borde y, abajo, el
 * escenario con el producto. El campo lleva el mail al formulario de padres.
 */
export function Hero({ alEnviar }: { alEnviar: (email: string) => void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-12 sm:pt-16 lg:px-16 lg:pt-[72px]">
      <h1 className="text-[clamp(2.3rem,4.2vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.045em] text-[var(--navy)]">
        {/* Opciones de titular en docs/referencias-hero/ramp.md. */}
        El mundo cambia rápido. <br className="hidden md:block" />
        <span className="text-[var(--primario)]">Que tu hijo esté conectado con quienes lo viven.</span>
      </h1>
      <p className="mt-4 max-w-[62ch] text-[18px] leading-snug text-[var(--tenue)] sm:text-[19.5px]">
        {/* [CONFIRMAR] "empresas" y "mientras estudia": no existen todavía en la app. */}
        Timon lo conecta con profesionales, universidades y empresas para que elija su carrera y siga conectado mientras estudia.
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
      {/* [PSICÓLOGOS: nombres/matrícula] Lo documentado: tres psicopedagogas evaluaron el producto y un equipo de la UBA revisó la metodología. */}
      <p className="mt-4 text-[14px] text-[var(--tenue)]">Evaluado por psicopedagogas y revisado por un equipo profesional de la UBA.</p>
      <div className="mt-11">
        <Escenario />
      </div>
      <div className="mt-3 overflow-hidden rounded-[12px] border border-[var(--borde)] [&>div]:border-t-0">
        <Cifras />
      </div>
    </section>
  )
}
