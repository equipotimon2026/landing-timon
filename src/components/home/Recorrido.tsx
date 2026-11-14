'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MacBook, IPhone } from './Dispositivos'
import { IconoBrujula, IconoInforme, IconoTest, IconoUniversidad } from './Iconos'

/**
 * Las cuatro etapas del Programa, en el orden en que las vive el chico. Las
 * pantallas son de la demo real (datos ficticios de "Sofía"), capturadas de
 * /demo-nuevo-timon el 14/11/2026. Una frase por etapa: el resto lo cuenta
 * la pantalla.
 */
const PASOS = [
  {
    id: 'paso-test',
    etiqueta: 'Se conoce',
    titulo: '13 paradas cortas para conocerse.',
    linea: 'Menos de 10 minutos cada una.',
    Icono: IconoTest,
    mac: '/app/mac-test.webp',
    tel: '/app/iphone-test.webp',
    alt: 'El mapa de tests de Timon: módulos completados y el que sigue',
    callouts: [
      { texto: 'parada por parada', donde: 'left-[2%] top-[34%]', giro: -4, color: 'bg-[var(--terra)] text-white' },
      { texto: 'se guarda solo ✓', donde: 'right-[6%] top-[6%]', giro: 3, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#f5ede0',
    acento: '#c97f5e',
  },
  {
    id: 'paso-investigacion',
    etiqueta: 'Investiga',
    titulo: 'Pregunta cómo es el trabajo real.',
    linea: 'Charla con profesionales virtuales de 16 áreas.',
    Icono: IconoBrujula,
    mac: '/app/mac-investigacion.webp',
    tel: '/app/iphone-investigacion.webp',
    alt: 'Las áreas de trabajo con fotos, para elegir y charlar con profesionales',
    callouts: [
      { texto: '16 áreas para recorrer', donde: 'left-[4%] top-[10%]', giro: -3, color: 'bg-[var(--ocean)] text-white' },
      { texto: 'elige lo que le atrae', donde: 'right-[4%] bottom-[30%]', giro: 4, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#dfeaf6',
    acento: '#1e5ba0',
  },
  {
    id: 'paso-informe',
    etiqueta: 'Se descubre',
    titulo: 'Un informe que habla de quién es.',
    linea: 'Sus rasgos y las carreras que van con su perfil.',
    Icono: IconoInforme,
    mac: '/app/mac-informe.webp',
    tel: '/app/iphone-informe.webp',
    alt: 'La esencia en el informe: rasgos de Análisis a Expresión, con su puntaje',
    callouts: [
      { texto: 'del rasgo más fuerte al más suave', donde: 'right-[2%] top-[16%]', giro: 3, color: 'bg-[var(--terra)] text-white' },
      { texto: 'en sus palabras', donde: 'left-[6%] bottom-[30%]', giro: -4, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#f7e3d7',
    acento: '#a8603f',
  },
  {
    id: 'paso-comparador',
    etiqueta: 'Compara',
    titulo: 'Universidades, comparadas en serio.',
    linea: 'Por cuota, modalidad y zona.',
    Icono: IconoUniversidad,
    mac: '/app/mac-comparador.webp',
    tel: '/app/iphone-comparador.webp',
    alt: 'El comparador de universidades con filtros de cuota, modalidad y ubicación',
    callouts: [
      { texto: 'cuota · modalidad · zona', donde: 'right-[4%] top-[28%]', giro: -3, color: 'bg-[var(--ocean)] text-white' },
      { texto: 'qué tan alineada está', donde: 'left-[3%] bottom-[22%]', giro: 4, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#0f1f36',
    acento: '#4f84c2',
  },
]

function Pantallas({ activa, tipo, sizes }: { activa: number; tipo: 'mac' | 'tel'; sizes: string }) {
  return (
    <>
      {PASOS.map((p, i) => (
        <div key={p.id} className="pantalla" data-activa={i === activa ? '' : undefined} aria-hidden={i !== activa}>
          <Image src={tipo === 'mac' ? p.mac : p.tel} alt={i === activa ? p.alt : ''} fill sizes={sizes} className="object-cover object-top" />
        </div>
      ))}
    </>
  )
}

/**
 * "Cómo funciona": en escritorio, una escena fija (GSAP ScrollTrigger, pin +
 * scrub) que avanza por las cuatro etapas mientras se scrollea: cambia la
 * pantalla, el color, la ilustración y la frase. GSAP se carga en diferido.
 * En celular y tablet, una tarjeta por etapa con su iPhone, sin pin. Con
 * menos movimiento, la escena se fija igual pero los cambios son
 * instantáneos (home.css) y no hay giros de los dispositivos.
 */
export function Recorrido() {
  const [activa, setActiva] = useState(0)
  const escena = useRef<HTMLDivElement>(null)
  const barra = useRef<HTMLSpanElement>(null)
  const mac = useRef<HTMLDivElement>(null)
  const tel = useRef<HTMLDivElement>(null)
  const st = useRef<{ start: number; end: number } | null>(null)

  useEffect(() => {
    let limpiar: (() => void) | undefined
    let cancelado = false
    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelado || !escena.current) return
      gsap.registerPlugin(ScrollTrigger)
      const mm = gsap.matchMedia()
      mm.add({ escritorio: '(min-width: 1024px)', quieto: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        const { escritorio, quieto } = ctx.conditions as { escritorio: boolean; quieto: boolean }
        if (!escritorio) return
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: escena.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: quieto ? true : 0.6,
            onUpdate: (self) => setActiva(Math.min(PASOS.length - 1, Math.floor(self.progress * PASOS.length))),
            onRefresh: (self) => {
              st.current = { start: self.start, end: self.end }
            },
          },
        })
        tl.fromTo(barra.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
        if (!quieto) {
          tl.fromTo(mac.current, { rotateY: -8, rotateX: 4 }, { rotateY: 6, rotateX: 0, ease: 'none' }, 0)
          tl.fromTo(tel.current, { y: 40, rotate: 6 }, { y: -30, rotate: -2, ease: 'none' }, 0)
        }
      })
      limpiar = () => mm.revert()
    })()
    return () => {
      cancelado = true
      limpiar?.()
    }
  }, [])

  /** Lleva el scroll al medio de la etapa i dentro de la escena fija. */
  const irA = (i: number) => {
    const r = st.current
    const destino = r ? r.start + ((i + 0.5) / PASOS.length) * (r.end - r.start) : 0
    window.scrollTo({ top: destino, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const paso = PASOS[activa]
  const oscuro = activa === PASOS.length - 1

  return (
    <>
      {/* ── Escritorio: escena fija ──────────────────────────────────── */}
      <div ref={escena} className="relative hidden h-screen lg:block">
        <div
          className="escenario-fondo absolute inset-x-5 bottom-6 top-20 overflow-hidden rounded-[44px]"
          style={{ backgroundColor: paso.fondo }}
        >
          <span aria-hidden className="blob blob-vivo -right-[8%] -top-[18%] h-[60%] w-[40%] bg-white/25" />
          <span aria-hidden className="blob blob-vivo -bottom-[22%] left-[30%] h-[50%] w-[34%] bg-white/15 [animation-delay:-6s]" />
        </div>

        <div className="relative mx-auto grid h-full max-w-[1320px] grid-cols-[minmax(0,5fr)_minmax(0,8fr)] items-center gap-10 px-16 pb-6 pt-20">
          {/* Frase de la etapa */}
          <div className={`relative h-[340px] transition-colors duration-500 ${oscuro ? 'text-white' : 'text-[var(--navy)]'}`}>
            {PASOS.map((p, i) => (
              <div key={p.id} id={p.id} className="pantalla flex flex-col justify-center" data-activa={i === activa ? '' : undefined} aria-hidden={i !== activa}>
                <p.Icono activo={i === activa} className="h-20 w-20" />
                <p className="etiqueta mt-6" style={{ color: p.acento }}>
                  {String(i + 1).padStart(2, '0')} · {p.etiqueta}
                </p>
                <h3 className="titulo mt-3 max-w-[14ch] text-[clamp(2.2rem,3.4vw,3.2rem)]">{p.titulo}</h3>
                <p className={`mt-4 text-[18px] ${oscuro ? 'text-white/70' : 'text-[var(--texto2)]'}`}>{p.linea}</p>
              </div>
            ))}
          </div>

          {/* Dispositivos */}
          <div className="relative" style={{ perspective: 1600 }}>
            <div ref={mac} style={{ transformStyle: 'preserve-3d' }}>
              <MacBook className="w-[90%] drop-shadow-[0_40px_50px_rgba(15,31,54,0.3)]">
                <Pantallas activa={activa} tipo="mac" sizes="760px" />
              </MacBook>
            </div>
            <div ref={tel} className="absolute -bottom-[8%] right-0 w-[23%]">
              <IPhone>
                <Pantallas activa={activa} tipo="tel" sizes="200px" />
              </IPhone>
            </div>
            {PASOS.map((p, i) =>
              p.callouts.map((c) => (
                <span
                  key={c.texto}
                  aria-hidden={i !== activa}
                  data-activa={i === activa ? '' : undefined}
                  className={`callout sticker absolute z-10 ${c.donde} ${c.color}`}
                  style={{ '--giro': `${c.giro}deg` } as React.CSSProperties}
                >
                  {c.texto}
                </span>
              )),
            )}
          </div>
        </div>

        {/* Progreso: barra que se llena con el scroll y botones para saltar de etapa */}
        <nav aria-label="Etapas del programa" className="absolute bottom-12 left-1/2 w-[min(560px,80%)] -translate-x-1/2">
          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/60">
            <span ref={barra} className="absolute inset-0 origin-left rounded-full" style={{ background: paso.acento, transform: 'scaleX(0)' }} />
          </div>
          <div className="mt-3 flex justify-between">
            {PASOS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => irA(i)}
                aria-current={i === activa ? 'step' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-semibold transition-colors ${
                  i === activa ? 'text-white' : oscuro ? 'text-white/60 hover:text-white' : 'text-[var(--texto2)] hover:text-[var(--navy)]'
                }`}
                style={i === activa ? { background: p.acento } : undefined}
              >
                {p.etiqueta}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* ── Celular y tablet: una tarjeta por etapa ──────────────────── */}
      <ol className="mx-auto mt-10 grid max-w-[720px] gap-5 px-5 lg:hidden">
        {PASOS.map((p, i) => (
          <li
            key={p.id}
            className={`relative overflow-hidden rounded-[32px] px-6 pt-7 ${i === PASOS.length - 1 ? 'text-white' : ''}`}
            style={{ background: p.fondo }}
          >
            <div className="flex items-center gap-4">
              <p.Icono activo className="h-14 w-14 shrink-0" />
              <div>
                <p className="etiqueta" style={{ color: p.acento }}>
                  {String(i + 1).padStart(2, '0')} · {p.etiqueta}
                </p>
                <h3 className="titulo mt-1 text-[24px]">{p.titulo}</h3>
              </div>
            </div>
            <div className="relative mt-6">
              <IPhone className="mx-auto w-[60%] max-w-[240px] translate-y-[12%]">
                <Image src={p.tel} alt={p.alt} fill sizes="240px" className="object-cover object-top" />
              </IPhone>
              <span
                className={`sticker absolute right-0 top-[18%] ${p.callouts[0].color}`}
                style={{ '--giro': `${p.callouts[0].giro}deg` } as React.CSSProperties}
              >
                {p.callouts[0].texto}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
