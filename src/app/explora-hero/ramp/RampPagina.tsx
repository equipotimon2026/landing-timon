'use client'

import { useState } from 'react'
import { Anotalo } from '@/components/home/Anotalo'
import { Cabecera } from './Cabecera'
import { Hero } from './Hero'
import { Modulos } from './Modulos'
import { Prueba } from './Prueba'

/**
 * /explora-hero/ramp: la home de Timon con el formato de ramp.com. El mail
 * del hero viaja al formulario de padres (#anotalo), que se monta de nuevo
 * con ese mail ya cargado.
 */
export function RampPagina() {
  const [email, setEmail] = useState('')
  const alEnviar = (m: string) => {
    setEmail(m)
    requestAnimationFrame(() => document.getElementById('anotalo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className="ramp">
      <Cabecera />
      <main>
        <Hero alEnviar={alEnviar} />
        <Prueba />
        <Modulos />
        <section className="bg-[var(--arena)] px-5 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-[920px]">
            <h2 className="mb-10 text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[var(--navy)]">
              Anotalo. <span className="text-[var(--tenue)]">Te escribimos para contarte cómo sigue.</span>
            </h2>
            <Anotalo key={email} emailInicial={email} />
          </div>
        </section>
      </main>
    </div>
  )
}
