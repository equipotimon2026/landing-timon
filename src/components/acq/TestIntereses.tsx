'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ACTIVIDADES, ESCALA, TIPOS, calcularTest } from '@/lib/test'
import { OFERTA, urlRegistro } from '@/lib/programa'
import { FREE_STOPS } from '@/lib/pricing'

/**
 * El test: 18 actividades de a una, los datos y el resultado. Como el roadmap
 * de acquisition.com, el resultado se muestra después de dejar el mail; si el
 * envío falla, se muestra igual.
 */
export function TestIntereses() {
  const [paso, setPaso] = useState<number | 'datos' | 'resultado'>(0)
  const [respuestas, setRespuestas] = useState<number[]>([])
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [enviando, setEnviando] = useState(false)

  const total = ACTIVIDADES.length
  const hechas = typeof paso === 'number' ? paso : total

  const responder = (puntos: number) => {
    if (typeof paso !== 'number') return
    const next = [...respuestas]
    next[paso] = puntos
    setRespuestas(next)
    setPaso(paso + 1 < total ? paso + 1 : 'datos')
  }

  const enviar = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setEnviando(true)
    const r = calcularTest(respuestas)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'test',
        nombre,
        email,
        perfil: r.top.map((t) => TIPOS[t].nombre).join(', '),
        mundos: r.mundos.map((m) => m.nombre).join(', '),
      }),
    }).catch(() => null)
    setPaso('resultado')
  }

  if (paso === 'resultado') return <Resultado nombre={nombre} respuestas={respuestas} />

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(15,31,54,0.10)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        {paso !== 0 ? (
          <button
            onClick={() => setPaso(paso === 'datos' ? total - 1 : (paso as number) - 1)}
            className="inline-flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-[var(--hueso)]"
          >
            <ArrowLeft size={14} /> Atrás
          </button>
        ) : (
          <span className="text-[13px] font-semibold text-[var(--hueso)]">¿Cuánto te gusta…?</span>
        )}
        <span className="text-[12px] font-semibold text-[var(--hueso)]">
          {Math.min(hechas + 1, total)} de {total}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border-cream)]">
        <div
          className="h-full rounded-full bg-[var(--ocean)] transition-all"
          style={{ width: `${Math.max((hechas / total) * 100, 4)}%` }}
        />
      </div>

      {typeof paso === 'number' ? (
        <div className="mt-6">
          <p className="text-[22px] font-bold leading-snug sm:text-[26px]">{ACTIVIDADES[paso].texto}</p>
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {ESCALA.map((o) => (
              <button
                key={o.label}
                onClick={() => responder(o.puntos)}
                className={`cursor-pointer rounded-xl border-2 px-4 py-4 text-[15px] font-semibold transition-colors hover:border-[var(--ocean)] hover:bg-[var(--ocean-wash)] sm:text-[16px] ${
                  respuestas[paso] === o.puntos ? 'border-[var(--ocean)] bg-[var(--ocean-wash)]' : 'border-[var(--border-cream-strong)]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={enviar} className="mt-6 space-y-3">
          <p className="text-[22px] font-bold leading-snug sm:text-[26px]">¡Listo! ¿A dónde te mandamos tu resultado?</p>
          <p className="text-[15px] text-[var(--hueso)]">Lo ves acá mismo, y te queda en el mail.</p>
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            autoComplete="given-name"
            className="h-12 w-full rounded-md border border-[var(--border-cream-strong)] px-4 text-[15px] outline-none focus:border-[var(--ocean)]"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu mail"
            autoComplete="email"
            className="h-12 w-full rounded-md border border-[var(--border-cream-strong)] px-4 text-[15px] outline-none focus:border-[var(--ocean)]"
          />
          <button
            type="submit"
            disabled={enviando}
            className="h-14 w-full cursor-pointer rounded-full bg-[var(--ocean)] text-[15px] font-bold uppercase text-white hover:bg-[var(--ocean-deep)] disabled:opacity-60 sm:text-[16px]"
          >
            {enviando ? 'Calculando…' : 'Ver mi resultado'}
          </button>
        </form>
      )}
    </div>
  )
}

function Resultado({ nombre, respuestas }: { nombre: string; respuestas: number[] }) {
  const r = calcularTest(respuestas)
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-[var(--navy)] p-6 text-white sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ocean-light)]">
          Tu resultado{nombre ? `, ${nombre}` : ''}
        </p>
        <p className="mt-3 text-[26px] font-extrabold leading-tight sm:text-[32px]">
          Lo tuyo es {r.top.slice(0, 2).map((t) => TIPOS[t].nombre.toLowerCase()).join(' y ')}
        </p>
        <div className="mt-6 space-y-4">
          {r.top.map((t, i) => (
            <div key={t}>
              <div className="flex justify-between text-[14px] font-semibold">
                <span>
                  {i + 1}. {TIPOS[t].nombre}
                </span>
                <span className="text-white/70">{r.porTipo[t]}%</span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[var(--ocean)]" style={{ width: `${Math.max(r.porTipo[t], 3)}%` }} />
              </div>
              <p className="mt-1.5 text-[14px] leading-[1.5] text-white/75">{TIPOS[t].texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(15,31,54,0.08)] sm:p-8">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[var(--ocean-deep)]">
          Tus mundos de carreras
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {r.mundos.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-xl border border-[var(--border-cream)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/mapa/${m.id}.jpg`} alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="p-3">
                <p className="text-[14px] font-bold leading-tight">{m.nombre}</p>
                <p className="mt-1 text-[12px] leading-snug text-[var(--hueso)]">
                  {m.submundos.flatMap((s) => s.carreras).slice(0, 3).join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--ocean-wash)] p-6 text-center sm:p-8">
        <p className="text-[20px] font-bold leading-snug sm:text-[24px]">Esto es una primera pista. Falta lo más importante.</p>
        <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">
          Tus intereses son una parte. En &ldquo;{OFERTA.nombre}&rdquo; sumamos cómo pensás, tus
          inteligencias, tu personalidad y la mirada de tu familia, para llegar a tu carrera, tu
          universidad y de qué vas a trabajar.
        </p>
        <Link
          href="/programa"
          className="mt-5 inline-block w-full max-w-[380px] rounded-lg bg-[var(--ocean)] px-6 py-4 text-[16px] font-bold uppercase text-white hover:bg-[var(--ocean-deep)]"
        >
          Quiero elegir bien
        </Link>
        <a href={urlRegistro()} className="mt-3 block text-[14px] font-semibold text-[var(--ocean-deep)] underline">
          O empezá gratis con las {FREE_STOPS} primeras paradas
        </a>
      </div>

      <p className="text-center text-[12px] text-[var(--hueso-soft)]">
        Es una versión corta y orientativa del modelo de intereses de Holland. No es un diagnóstico ni
        reemplaza a un profesional.
      </p>
    </div>
  )
}
