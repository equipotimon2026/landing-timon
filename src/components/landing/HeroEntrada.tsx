'use client'

import { WheelMark } from './Logo'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { FREE_STOPS, TOTAL_STOPS } from '@/lib/pricing'

const APP_URL = 'https://app.timonear.com'

/**
 * El hero ES la puerta de entrada — pantalla 01 del canvas, tal cual.
 *
 * Decisión de la reunión del 07/09/2026: el que cae acá casi siempre ya sabe
 * qué es Timon y viene a entrar. Chess.com y Duolingo lo resuelven poniendo el
 * formulario de registro como primera pantalla; hacemos lo mismo. La tarjeta
 * tiene dos pestañas (crear cuenta / ya tengo cuenta) y NO autentica acá:
 * manda a app.timonear.com/entrar con el mail y el nombre ya puestos, que es
 * la única puerta real — no queremos dos implementaciones de auth.
 *
 * La fila de momentos de abajo es el equivalente del selector de idiomas de
 * Duolingo: la persona se reconoce antes de hacer click, y el momento elegido
 * viaja en la query y llega preseleccionado a la primera pregunta.
 */
const MOMENTOS = [
  { id: 'colegio', label: 'Estoy en el colegio' },
  { id: 'termine', label: 'Terminé y no sé qué seguir' },
  { id: 'cambio', label: 'Me quiero cambiar de carrera' },
  { id: 'adulto_referente', label: 'Soy padre, madre o del colegio' },
]

type Pestana = 'crear' | 'entrar'

function urlEntrar(params: Record<string, string>) {
  const q = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v.trim() !== '')
  )
  return `${APP_URL}/entrar${q.size ? `?${q}` : ''}`
}

export function HeroEntrada() {
  const [pestana, setPestana] = useState<Pestana>('crear')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [momento, setMomento] = useState('')

  const irALaApp = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = urlEntrar({
      modo: pestana,
      email,
      nombre: pestana === 'crear' ? nombre : '',
      momento,
    })
  }

  return (
    <section
      className="timon-wash relative flex flex-col overflow-hidden"
      style={{ marginTop: '-4rem', paddingTop: '4rem' }}
    >
      {/* En escritorio son dos columnas de ancho fijo, no un flex que se
          abre: el sobrante del monitor queda afuera del par en vez de
          acumularse en la columna izquierda. Y la altura la manda el
          contenido, no el viewport. */}
      <div className="shell relative z-10 flex flex-col pb-8 pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-12 lg:py-20">

        {/* ── Izquierda: la promesa y Timon ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Móvil: globito, mascota grande, frase (M01) */}
          <div className="timon-bubble mb-3 px-4 py-2.5 lg:hidden">
            <p className="text-[14px] font-bold text-[var(--navy)]">Hola, soy Timon.</p>
          </div>
          {/* El timón, no el muñeco brújula de antes (Nico, 02/10/2026). */}
          <span role="img" aria-label="Timon" className="timon-bob lg:hidden">
            <WheelMark tone="ocean" size={168} />
          </span>

          <h1
            className="mt-6 font-display font-extrabold tracking-[-0.04em] text-[var(--navy)] lg:mt-0"
            style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.7rem)', lineHeight: 1.02, textWrap: 'pretty' }}
          >
            El primer paso no
            <br />
            es elegir.
            <br />
            <span className="serif-accent text-[var(--ocean)]">Es entenderte.</span>
          </h1>
          <p className="mt-4 max-w-[32rem] text-[16px] leading-relaxed text-[var(--hueso)] sm:text-[18px]">
            {TOTAL_STOPS} paradas cortas para saber quién sos antes de decidir qué
            estudiar. Sin respuestas correctas, sin apuro, y con alguien que te
            acompaña.
          </p>

          {/* Móvil: los dos botones del canvas van directo a la app */}
          <div className="mt-7 flex w-full max-w-[420px] flex-col gap-3 lg:hidden">
            <a href={urlEntrar({ modo: 'crear', momento })} className="btn-timon btn-timon--primary h-14 text-[16px]">
              Empezar mi recorrido
            </a>
            <a href={urlEntrar({ modo: 'entrar' })} className="btn-timon btn-timon--ghost h-14 text-[16px]">
              Ya tengo cuenta
            </a>
          </div>

          {/* Escritorio: la mascota con su globito */}
          <div className="mt-6 hidden items-end gap-4 lg:flex">
            <span role="img" aria-label="Timon" className="timon-bob shrink-0">
              <WheelMark tone="ocean" size={190} />
            </span>
            <div className="timon-bubble mb-8 max-w-[19rem] px-4 py-3.5">
              <p className="text-[15px] font-semibold leading-snug text-[var(--navy)]">
                Hola, soy Timon. No te voy a decir qué estudiar. Te voy a ayudar a
                que lo veas vos.
              </p>
            </div>
          </div>

          {/* ¿Dónde estás hoy? — el selector de idiomas de Duolingo, adaptado */}
          <div className="mt-8 w-full lg:mt-9">
            <p className="mono-label mb-2.5">¿Dónde estás hoy?</p>
            <div className="thin-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
              {MOMENTOS.map((m) => {
                const sel = momento === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMomento(sel ? '' : m.id)}
                    aria-pressed={sel}
                    className={`shrink-0 whitespace-nowrap rounded-[var(--r-pill)] border px-4 py-2 text-[13px] font-bold transition-colors ${
                      sel
                        ? 'border-[var(--ocean)] bg-[var(--ocean)] text-white'
                        : 'border-[var(--border-cream-strong)] bg-white/80 text-[var(--navy)] hover:border-[var(--ocean)] hover:text-[var(--ocean)]'
                    }`}
                  >
                    {m.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Derecha: la tarjeta (escritorio) ── */}
        <div className="hidden lg:block">
          <div className="glass glass-strong glass-xl p-8">
            <div role="tablist" className="flex rounded-[var(--r-md)] bg-[rgba(15,31,54,0.06)] p-1">
              {(
                [
                  ['crear', 'Crear cuenta'],
                  ['entrar', 'Ya tengo cuenta'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={pestana === id}
                  onClick={() => setPestana(id)}
                  className={`h-11 flex-1 rounded-[12px] text-[14px] font-bold transition-all ${
                    pestana === id
                      ? 'bg-white text-[var(--navy)] shadow-[0_2px_8px_rgba(15,31,54,0.08)]'
                      : 'text-[var(--hueso)] hover:text-[var(--navy)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={irALaApp} className="mt-5 flex flex-col gap-4">
              {pestana === 'crear' && (
                <div>
                  <label htmlFor="hero-nombre" className="mono-label mb-1.5 block">Nombre</label>
                  <input
                    id="hero-nombre"
                    className="input-timon"
                    autoComplete="given-name"
                    placeholder="¿Cómo te llamás?"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <label htmlFor="hero-email" className="mono-label mb-1.5 block">Email</label>
                <input
                  id="hero-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="input-timon"
                  placeholder="vos@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-timon btn-timon--primary group h-[52px] w-full text-[16px]">
                {pestana === 'crear' ? 'Empezar mi recorrido' : 'Entrar'}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-center text-[12.5px] leading-snug text-[var(--hueso)]">
                {pestana === 'crear'
                  ? `Las primeras ${FREE_STOPS} paradas son gratis. Tu colegio nunca ve tus respuestas.`
                  : 'Te dejo justo donde lo dejaste.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
