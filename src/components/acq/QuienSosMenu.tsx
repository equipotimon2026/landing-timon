'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/programa'

/**
 * "¿Quién sos?" del header: un botón que abre la lista de puertas por público.
 * Patrón disclosure (botón + lista de links): Tab recorre los links, Escape
 * cierra y devuelve el foco, y se cierra al tocar afuera o al salir con Tab.
 *
 * Psicólogos no tiene página todavía (11/11/2026): cae en un mail a info@.
 */
const OPCIONES = [
  { href: '/padres', label: 'Padres', detalle: 'Para que tu hijo elija bien' },
  {
    href: `mailto:${CONTACT_EMAIL}?subject=Soy%20psic%C3%B3logo`,
    label: 'Psicólogos',
    detalle: 'Sumate a la red de Timon',
  },
  { href: '/colegios', label: 'Colegios', detalle: 'Timon para tus alumnos' },
]

export function QuienSosMenu() {
  const [abierto, setAbierto] = useState(false)
  const raiz = useRef<HTMLDivElement>(null)
  const boton = useRef<HTMLButtonElement>(null)
  const id = useId()

  useEffect(() => {
    if (!abierto) return
    const fuera = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false)
    }
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false)
        boton.current?.focus()
      }
    }
    document.addEventListener('pointerdown', fuera)
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('pointerdown', fuera)
      document.removeEventListener('keydown', tecla)
    }
  }, [abierto])

  return (
    <div
      ref={raiz}
      className="relative"
      onBlur={(e) => {
        if (!raiz.current?.contains(e.relatedTarget as Node | null)) setAbierto(false)
      }}
    >
      <button
        ref={boton}
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((a) => !a)}
        className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap text-[14px] font-medium text-white/90 transition-colors hover:text-white"
      >
        ¿Quién sos?
        <ChevronDown size={16} className={`transition-transform ${abierto ? 'rotate-180' : ''}`} />
      </button>
      <ul
        id={id}
        hidden={!abierto}
        className="absolute right-0 top-full z-50 mt-3 w-[min(260px,calc(100vw-32px))] overflow-hidden rounded-lg bg-white py-1.5 shadow-[0_16px_40px_rgba(15,31,54,0.22)] sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
      >
        {OPCIONES.map((o) => (
          <li key={o.label}>
            <a
              href={o.href}
              onClick={() => setAbierto(false)}
              className="block px-4 py-2.5 text-[var(--navy)] outline-none hover:bg-[var(--ocean-wash)] focus-visible:bg-[var(--ocean-wash)]"
            >
              <span className="block text-[15px] font-semibold">{o.label}</span>
              <span className="block text-[12px] text-[var(--hueso)]">{o.detalle}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
