'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export const CTA_TEXTO = 'Quiero que mi hijo elija bien'
export const CTA_MICRO = 'Te escribimos en menos de 24 h. Sin compromiso.'

/** El botón principal con su microcopia. Siempre lleva al formulario. */
export function Cta({
  tono = 'ocean',
  alineado = 'centro',
  micro = true,
  claro = false,
}: {
  tono?: 'ocean' | 'terra'
  alineado?: 'centro' | 'izquierda'
  micro?: boolean
  claro?: boolean
}) {
  return (
    <div className={`flex flex-col gap-3 ${alineado === 'centro' ? 'items-center text-center' : 'items-start'}`}>
      <a href="#anotalo" className={`btn group ${tono === 'terra' ? 'btn-terra' : ''}`}>
        {CTA_TEXTO}
        <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
      {micro && <p className={`text-[14px] ${claro ? 'text-white/70' : 'text-[var(--tenue)]'}`}>{CTA_MICRO}</p>}
    </div>
  )
}

/**
 * Barra fija abajo, solo en celular: aparece cuando el hero sale de pantalla
 * y se esconde cuando el formulario está a la vista.
 */
export function CtaFija() {
  const [ver, setVer] = useState(false)
  useEffect(() => {
    const form = document.getElementById('anotalo')
    let enForm = false
    const obs = new IntersectionObserver(([e]) => {
      enForm = e.isIntersecting
      actualizar()
    })
    const actualizar = () => setVer(window.scrollY > window.innerHeight * 0.9 && !enForm)
    if (form) obs.observe(form)
    window.addEventListener('scroll', actualizar, { passive: true })
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', actualizar)
    }
  }, [])
  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-300 motion-reduce:transition-none md:hidden ${
        ver ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[130%] opacity-0'
      }`}
      aria-hidden={!ver}
    >
      <a
        href="#anotalo"
        tabIndex={ver ? 0 : -1}
        className="btn btn-terra w-full shadow-[0_4px_0_var(--terra-hondo),0_18px_40px_-12px_rgba(15,31,54,0.5)]"
      >
        {CTA_TEXTO}
        <ArrowRight size={18} aria-hidden />
      </a>
    </div>
  )
}
