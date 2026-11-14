'use client'

import { useState } from 'react'
import { Anotalo } from '@/components/home/Anotalo'
import { Cabecera } from './Cabecera'
import { Desorden } from './Desorden'
import { Hero } from './Hero'
import { Modulos } from './Modulos'
import { Camino, Cambio, Confianza } from './Narrativa'
import { Prueba } from './Prueba'
import { Banner, Cierre, Historia, Momento, Preguntas, Testimonios } from './Secciones'

/**
 * /explora-hero/ramp: la home de Timon con el formato de ramp.com
 * (docs/referencias-hero/ramp.md). Relato (pedido de Nicolas, 14/11): el
 * mundo cambia rápido → solo es difícil seguirle el ritmo → Timon está
 * conectado con quienes lo viven y tu hijo entra a esa red → la conexión lo
 * acompaña en el tiempo. Orden: hero → prueba → el cambio → el desorden que
 * se ordena → la red (módulos) → confianza → el camino → momento → banner →
 * equipo → testimonios → preguntas → cierre sobre el footer.
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
        <Cambio />
        <Desorden />
        <Modulos />
        <Confianza />
        <Camino />
        <Momento />
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
