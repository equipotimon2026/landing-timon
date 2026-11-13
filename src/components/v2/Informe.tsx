'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'

/**
 * El informe en tres actos, mostrado como producto (patrón de las páginas de
 * Apple): en desktop la sección queda fija y, a medida que se baja, cambia el
 * acto y su pantalla. En mobile, los tres actos apilados.
 *
 * Las capturas salen de la demo de la app (perfil ficticio "Sofía", datos de
 * ejemplo). Ningún dato de alumnos.
 */
const ACTOS = [
  { n: 'Acto 1', titulo: 'Quién es.', apoyo: 'Su esencia, en una mirada.' },
  { n: 'Acto 2', titulo: 'Sus caminos.', apoyo: 'Las carreras que mejor le van, y por qué.' },
  { n: 'Acto 3', titulo: 'Dónde estudiarlos.', apoyo: 'Universidades según dónde vive y su presupuesto.' },
]

function Marco({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`objeto ${className}`}>
      <div className="objeto-in">{children}</div>
    </div>
  )
}

function Pantalla({ i }: { i: number }) {
  if (i === 0) {
    return (
      <div className="relative">
        <Marco>
          <Image src="/producto/esencia-card.webp" alt="El informe: la esencia del perfil, con sus rasgos principales" width={1380} height={1110} sizes="(min-width: 1024px) 620px, 100vw" className="h-auto w-full" />
        </Marco>
        <Marco className="absolute -bottom-10 -right-4 w-[72%] sm:-right-10">
          <Image src="/producto/esencia-frase.webp" alt="El informe: quién es en una frase" width={1380} height={710} sizes="(min-width: 1024px) 460px, 70vw" className="h-auto w-full" />
        </Marco>
      </div>
    )
  }
  if (i === 1) {
    return (
      <Marco>
        <Image src="/producto/caminos-card.webp" alt="El informe: los caminos principales, ordenados por compatibilidad" width={1620} height={1020} sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
      </Marco>
    )
  }
  return (
    <Marco>
      <Image src="/producto/universidades.jpg" alt="El informe: dónde estudiar, con universidades filtradas" width={1100} height={721} sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
    </Marco>
  )
}

export function Informe() {
  const ref = useRef<HTMLDivElement>(null)
  const quieto = useReducedMotion()
  const [activo, setActivo] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActivo(Math.min(ACTOS.length - 1, Math.floor(p * ACTOS.length)))
  })

  return (
    <>
      {/* Desktop: fijo + scroll */}
      <div ref={ref} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-16 px-8">
            <ol className="space-y-10">
              {ACTOS.map((a, i) => (
                <li key={a.n} className={`transition-opacity duration-500 ${i === activo ? 'opacity-100' : 'opacity-25'}`}>
                  <p className="etiqueta text-[var(--rumbo)]">{a.n}</p>
                  <h3 className="titulo mt-2 text-[clamp(2.4rem,4.2vw,3.8rem)]">{a.titulo}</h3>
                  <p className={`mt-2 text-[17px] text-[var(--texto2)] transition-all duration-500 ${i === activo ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {a.apoyo}
                  </p>
                </li>
              ))}
            </ol>
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activo}
                  style={{ transformPerspective: 1400 }}
                  initial={quieto ? false : { opacity: 0, y: 50, rotateX: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={quieto ? undefined : { opacity: 0, y: -40, rotateX: -8, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Pantalla i={activo} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: apilado */}
      <div className="mx-auto max-w-[680px] space-y-20 px-5 lg:hidden">
        {ACTOS.map((a, i) => (
          <div key={a.n}>
            <p className="etiqueta text-[var(--rumbo)]">{a.n}</p>
            <h3 className="titulo mt-2 text-[2.4rem]">{a.titulo}</h3>
            <p className="mt-2 text-[16px] text-[var(--texto2)]">{a.apoyo}</p>
            <div className={`mt-7 ${i === 0 ? 'pb-10' : ''}`}>
              <Pantalla i={i} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
