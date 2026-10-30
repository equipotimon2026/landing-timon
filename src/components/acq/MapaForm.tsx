'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PERFILES = [
  { id: 'alumno', label: 'Soy alumno/a' },
  { id: 'familia', label: 'Soy padre o madre' },
  { id: 'colegio', label: 'Trabajo en un colegio' },
]

/**
 * Captura del mapa. Manda el contacto a /api/contact (tipo 'mapa') y entrega
 * el mapa al instante en /mapa/guia: aunque falle el envío, la persona se
 * lleva lo que vino a buscar (el lead se pierde, el mapa no).
 */
export function MapaForm() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [perfil, setPerfil] = useState('alumno')
  const [enviando, setEnviando] = useState(false)

  const enviar = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setEnviando(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'mapa', nombre, email, perfil }),
    }).catch(() => null)
    router.push(`/mapa/guia?nombre=${encodeURIComponent(nombre)}`)
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
        disabled={enviando}
        className="h-14 w-full cursor-pointer rounded-full bg-[var(--ocean)] text-[15px] font-bold uppercase text-white transition-colors hover:bg-[var(--ocean-deep)] disabled:opacity-60 sm:text-[16px]"
      >
        {enviando ? 'Abriendo tu mapa…' : 'Quiero mi mapa gratis'}
      </button>
    </form>
  )
}
