'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FaqItem = { q: string; a: React.ReactNode }

/**
 * Acordeón de preguntas. Dos variantes, las dos de acquisition.com:
 * - `home`: pregunta grande en negrita y respuesta en párrafos, sin cajas.
 * - `workshop`: cada pregunta en su tarjeta blanca con chevron.
 */
export function Faq({ items, variant }: { items: FaqItem[]; variant: 'home' | 'workshop' }) {
  const [open, setOpen] = useState<number | null>(variant === 'home' ? 0 : null)

  if (variant === 'home') {
    return (
      <div className="divide-y divide-[var(--border-cream)]">
        {items.map((it, i) => (
          <div key={it.q} className="py-5">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-[18px] font-bold leading-snug sm:text-[22px]"
            >
              {it.q}
              <ChevronDown
                size={20}
                className={`shrink-0 text-[var(--hueso)] transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="mt-4 space-y-3 text-[16px] leading-[1.55] sm:text-[18px]">{it.a}</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.q} className="rounded-lg border border-[#ECECEC] bg-[#FAFAFA]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-[18px] text-left text-[15px] font-semibold sm:text-[16px]"
          >
            {it.q}
            <ChevronDown
              size={18}
              className={`shrink-0 text-[var(--ocean)] transition-transform ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-[15px] leading-[1.65] text-[var(--hueso)]">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}
