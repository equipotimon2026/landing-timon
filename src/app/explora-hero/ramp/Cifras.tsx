'use client'

import { useEffect, useState } from 'react'
import { Isotipo } from '@/components/home/Isotipo'
import { NUMEROS } from './datos'

const formato = (v: string) => Number(v).toLocaleString('es-AR')

/** Un dígito que rueda hasta su valor, como un odómetro. */
function Digito({ d, listo, retraso }: { d: number; listo: boolean; retraso: number }) {
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <span
        className="flex flex-col transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(-${(listo ? d : 0) * 1.15}em)`, transitionDelay: `${retraso}ms` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="h-[1.15em] leading-[1.15em]">
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

function Numero({ valor, prefijo = '', listo }: { valor: string; prefijo?: string; listo: boolean }) {
  const texto = formato(valor)
  let i = 0
  return (
    <span className="inline-flex rounded-[5px] bg-[var(--primario-tinte)] px-1.5 py-[1px] text-[13px] font-semibold tabular-nums text-[var(--primario-hondo)]">
      <span className="sr-only">
        {prefijo}
        {texto}
      </span>
      <span aria-hidden className="inline-flex">
        {prefijo}
        {[...texto].map((c, j) =>
          /\d/.test(c) ? <Digito key={j} d={Number(c)} listo={listo} retraso={120 * i++} /> : <span key={j}>{c}</span>,
        )}
      </span>
    </span>
  )
}

/**
 * La tira de cifras bajo el escenario: etiqueta fija a la izquierda y las
 * cifras reales de Timon pasando despacio, con los dígitos que ruedan al entrar.
 */
export function Cifras() {
  const [listo, setListo] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setListo(true), 1900)
    return () => clearTimeout(id)
  }, [])

  const fila = (copia: boolean) => (
    <ul aria-hidden={copia} className="flex shrink-0 items-center">
      {NUMEROS.map((n) => (
        <li key={n.etiqueta} className="flex items-center gap-2.5 border-l border-[var(--borde)] px-5 text-[13px] text-[var(--tenue)]">
          {n.etiqueta}
          <Numero valor={n.valor} prefijo={n.prefijo} listo={listo} />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className="cifras flex h-12 items-center border-t border-[var(--borde)] bg-white transition-opacity duration-700"
      style={{ opacity: listo ? 1 : 0 }}
    >
      <p className="flex shrink-0 items-center gap-2 pl-4 pr-5 text-[13px] font-semibold text-[var(--navy)] sm:pl-5">
        <Isotipo size={15} className="text-[var(--primario)]" />
        Timon, en números
      </p>
      <div className="relative flex min-w-0 flex-1 overflow-hidden">
        <div className="cifras-pista flex">
          {fila(false)}
          {fila(true)}
        </div>
      </div>
    </div>
  )
}
