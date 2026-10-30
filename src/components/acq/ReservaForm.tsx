'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { MOMENTOS, urlRegistro } from '@/lib/programa'

/**
 * Tarjeta "Pick a time below" del workshop. Acá no hay agenda: la reserva es
 * crear la cuenta en la app (la única puerta real) con nombre, mail y momento
 * ya cargados. La llamada con la familia la hacen los fundadores después.
 */
export function ReservaForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [momento, setMomento] = useState('')

  const reservar = (e: React.SyntheticEvent) => {
    e.preventDefault()
    window.location.href = urlRegistro({ email, nombre, momento })
  }

  const input =
    'h-11 w-full rounded-md border border-[var(--border-cream-strong)] bg-white px-3 text-[14px] outline-none focus:border-[var(--ocean)]'

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-9">
      <div className="rounded-xl bg-white p-6 shadow-[0_12px_40px_rgba(15,31,54,0.10)]">
        <p className="text-[24px] font-extrabold leading-tight">Reservá tu lugar abajo</p>
        <p className="mt-2 text-[15px] leading-[1.55] text-[#3A3B4D]">
          Creá tu cuenta, hacé gratis las 3 primeras paradas y coordinamos una llamada corta con tu
          familia para confirmar tu lugar.
        </p>
      </div>
      <form onSubmit={reservar} className="mt-6 space-y-3 px-1">
        <input
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre *"
          autoComplete="given-name"
          className={input}
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu mail *"
          autoComplete="email"
          className={input}
        />
        <select
          required
          value={momento}
          onChange={(e) => setMomento(e.target.value)}
          className={`${input} ${momento ? '' : 'text-[var(--hueso-soft)]'}`}
        >
          <option value="" disabled>
            ¿En qué momento estás? *
          </option>
          {MOMENTOS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
        <p className="text-[12px] leading-snug text-[var(--hueso)]">
          Al continuar aceptás los{' '}
          <a href="/terminos" className="underline">
            términos y condiciones
          </a>
          . Usamos tu mail solo para tu cuenta y para contactar a tu familia.
        </p>
        <button
          type="submit"
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-[var(--ocean)] text-[15px] font-semibold text-white transition-colors hover:bg-[var(--ocean-deep)]"
        >
          Continuar <ChevronRight size={18} />
        </button>
      </form>
    </div>
  )
}
