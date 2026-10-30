'use client'

import { useState } from 'react'

export type Barra = { q: string; lineas: React.ReactNode[] }

/**
 * Preguntas de acquisition.com/o-vegas: barra oscura con el título centrado y
 * una cruz, abiertas de entrada, y la respuesta en renglones cortos.
 */
export function FaqBarras({ items }: { items: Barra[] }) {
  const [cerradas, setCerradas] = useState<number[]>([])
  const toggle = (i: number) =>
    setCerradas((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))

  return (
    <div className="space-y-10">
      {items.map((it, i) => {
        const abierta = !cerradas.includes(i)
        return (
          <div key={it.q}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={abierta}
              className="relative w-full cursor-pointer rounded-md bg-[var(--navy)] px-12 py-5 text-center text-[18px] font-bold text-white sm:text-[24px]"
            >
              {it.q}
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[18px]">{abierta ? '×' : '+'}</span>
            </button>
            {abierta && (
              <div className="mt-5 space-y-4 px-3 text-[16px] leading-[1.5] text-[#333] sm:text-[20px]">
                {it.lineas.map((l, k) => (
                  <p key={k}>{l}</p>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
