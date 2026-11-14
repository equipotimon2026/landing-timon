'use client'

import { useState } from 'react'
import { Anotalo } from '@/components/home/Anotalo'
import { PasosA } from '../app-a/PasosA'
import { Cabecera } from './Cabecera'
import { Desorden } from './Desorden'
import { Hero } from './Hero'
import { Modulos } from './Modulos'
import { Prueba } from './Prueba'
import { Banner, Cierre, Historia, Momento, Preguntas, Testimonios } from './Secciones'

/**
 * /explora-hero/ramp: la home de Timon con el formato de ramp.com
 * (docs/referencias-hero/ramp.md). Orden de Ramp: hero → prueba → bento →
 * banda interactiva → el problema contado con scroll → cómo funciona (App A)
 * → banner → equipo → testimonios → preguntas → cierre sobre el footer.
 * El mail del hero viaja al formulario de padres, que se monta de nuevo con
 * ese mail ya cargado.
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
        <Momento />
        <Desorden />
        <div id="como-funciona" className="pasos-primario scroll-mt-16">
          <PasosA />
        </div>
        <Banner />
        <Historia />
        <Testimonios />
        <Preguntas />
        <Cierre>
          <Anotalo key={email} emailInicial={email} />
        </Cierre>
      </main>
    </div>
  )
}
