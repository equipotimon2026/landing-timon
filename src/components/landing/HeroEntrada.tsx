'use client'

import Image from 'next/image'
import { FREE_STOPS } from '@/lib/pricing'

const APP_URL = 'https://app.timonear.com'

/**
 * Hero estilo Duolingo.
 *
 * Decisión de la reunión del 07/09/2026: el que cae acá casi siempre ya sabe
 * qué es Timon y viene a entrar. Duolingo resuelve eso con lo mínimo — una
 * frase, la mascota, y DOS botones: empezar o entrar si ya tenés cuenta. Sin
 * formulario en el hero: el campo de email aparece del otro lado, en
 * app.timonear.com/entrar, que es la única puerta real.
 *
 * La fila de momentos de abajo es el equivalente del selector de idiomas de
 * Duolingo: dejar que la persona se reconozca antes de hacer click. El momento
 * elegido viaja en la query y llega preseleccionado a la primera pregunta.
 */
const MOMENTOS = [
  { id: 'colegio', label: 'Estoy en el colegio' },
  { id: 'termine', label: 'Terminé y no sé qué seguir' },
  { id: 'cambio', label: 'Me quiero cambiar de carrera' },
  { id: 'adulto_referente', label: 'Soy padre, madre o del colegio' },
]

export function HeroEntrada() {
  return (
    <section
      className="relative flex flex-col overflow-hidden timon-wash"
      style={{ minHeight: '100dvh', marginTop: '-4rem', paddingTop: '4rem' }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center px-5 py-8 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">

          {/* Mascota, con un halo de color detrás para que no flote sola */}
          <div className="relative flex justify-center lg:order-1">
            <div
              className="absolute h-[62%] w-[62%] rounded-full blur-3xl"
              style={{ background: 'rgba(37, 99, 235, 0.14)' }}
              aria-hidden
            />
            <Image
              src="/timon/mascota.png"
              alt="Timon, la brújula que te acompaña en el recorrido"
              width={480}
              height={521}
              priority
              className="relative w-[190px] sm:w-[260px] lg:w-[330px]"
            />
          </div>

          {/* Frase y los dos botones */}
          <div className="text-center lg:order-2 lg:text-left">
            <h1
              className="mx-auto max-w-[16ch] font-display font-extrabold tracking-[-0.04em] text-[var(--navy)] lg:mx-0 lg:max-w-[18ch]"
              style={{ fontSize: 'clamp(1.85rem, 4.6vw, 3.1rem)', lineHeight: 1.06 }}
            >
              La forma clara, honesta y a tu ritmo de{' '}
              <span className="serif-accent font-normal text-[var(--ocean)]">
                elegir qué estudiar.
              </span>
            </h1>

            <div className="mx-auto mt-8 flex max-w-[340px] flex-col gap-3 lg:mx-0">
              <a href={`${APP_URL}/entrar`} className="btn-chunky btn-chunky--primary">
                Empezar
              </a>
              <a href={`${APP_URL}/entrar`} className="btn-chunky btn-chunky--ghost">
                Ya tengo cuenta
              </a>
            </div>

            <p className="mt-5 text-[13.5px] text-[var(--hueso)]">
              Las primeras {FREE_STOPS} paradas son gratis. Solo necesitás tu mail.
            </p>
          </div>
        </div>
      </div>

      {/* Fila de momentos — el "selector de idiomas" de Duolingo, adaptado */}
      <div className="relative z-10 border-t border-[var(--border-cream)] bg-[var(--cream-elev)]/60 backdrop-blur-sm">
        <div className="thin-scroll mx-auto flex w-full max-w-[1120px] items-center gap-2 overflow-x-auto px-5 pb-24 pt-4 pr-20 sm:px-8 sm:pb-4 lg:flex-wrap lg:justify-center lg:overflow-visible lg:pr-[240px]">
          <span className="mono-label mr-1 hidden shrink-0 lg:inline">¿Dónde estás hoy?</span>
          {MOMENTOS.map((m) => (
            <a
              key={m.id}
              href={`${APP_URL}/entrar?momento=${m.id}`}
              className="shrink-0 whitespace-nowrap rounded-[var(--r-pill)] border border-[var(--border-cream-strong)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--navy)] transition-colors hover:border-[var(--ocean)] hover:text-[var(--ocean)]"
            >
              {m.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
