'use client'

import { useState } from 'react'
import { CONTACT_EMAIL } from '@/lib/programa'

type Estado = 'idle' | 'enviando' | 'ok' | 'error'

const PERFILES = [
  { id: 'alumno', label: 'Soy alumno/a' },
  { id: 'familia', label: 'Soy padre o madre' },
  { id: 'colegio', label: 'Trabajo en un colegio' },
]

/**
 * Captura del lead magnet. Manda el pedido a /api/contact (tipo 'reporte'),
 * que lo reenvía a info@ con el mail como reply-to.
 */
export function ReporteForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [perfil, setPerfil] = useState('alumno')
  const [estado, setEstado] = useState<Estado>('idle')
  const [fallback, setFallback] = useState<string | null>(null)

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setEstado('enviando')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'reporte', nombre, email, perfil }),
    }).catch(() => null)
    const data = res ? await res.json().catch(() => ({})) : {}
    if (res?.ok) {
      setEstado('ok')
    } else {
      setFallback(data.fallbackEmail ?? CONTACT_EMAIL)
      setEstado('error')
    }
  }

  if (estado === 'ok') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,31,54,0.10)]">
        <p className="text-[22px] font-extrabold">¡Listo, {nombre || 'gracias'}!</p>
        <p className="mt-2 text-[15px] text-[var(--hueso)]">
          Te mandamos el reporte a <span className="font-semibold">{email}</span>.
        </p>
      </div>
    )
  }

  const input =
    'h-12 w-full rounded-md border border-[var(--border-cream-strong)] bg-white px-4 text-[15px] outline-none focus:border-[var(--ocean)]'

  return (
    <form
      onSubmit={enviar}
      className="space-y-3 rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(15,31,54,0.10)] sm:p-8"
    >
      <input
        required
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        autoComplete="given-name"
        className={input}
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu mail"
        autoComplete="email"
        className={input}
      />
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="¿Quién sos?">
        {PERFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={perfil === p.id}
            onClick={() => setPerfil(p.id)}
            className={`cursor-pointer rounded-md border px-2 py-2.5 text-[12px] font-semibold leading-tight sm:text-[13px] ${
              perfil === p.id
                ? 'border-[var(--ocean)] bg-[var(--ocean-wash)] text-[var(--ocean-deep)]'
                : 'border-[var(--border-cream-strong)] text-[var(--hueso)]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="h-14 w-full cursor-pointer rounded-full bg-[var(--ocean)] text-[16px] font-bold uppercase text-white transition-colors hover:bg-[var(--ocean-deep)] disabled:opacity-60"
      >
        {estado === 'enviando' ? 'Enviando…' : 'Quiero mi reporte gratis'}
      </button>
      {estado === 'error' && (
        <p className="text-center text-[13px] text-[var(--rosa)]">
          No pudimos registrar tu pedido. Escribinos a{' '}
          <a href={`mailto:${fallback}`} className="font-semibold underline">
            {fallback}
          </a>{' '}
          y te lo mandamos.
        </p>
      )}
    </form>
  )
}
