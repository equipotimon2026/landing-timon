'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MacBook, IPhone } from './Dispositivos'

type Paso = {
  id: string
  n: string
  etiqueta: string
  titulo: string
  texto: string
  mac: string
  tel: string
  alt: string
  callouts: { texto: string; donde: string; giro: number; color: string }[]
  fondo: string
  acento: string
}

/**
 * Las cuatro partes de la app, en el orden en que las vive el chico. Las
 * pantallas son de la demo real (datos ficticios de "Sofía"), capturadas de
 * /demo-nuevo-timon el 14/11/2026.
 */
const PASOS: Paso[] = [
  {
    id: 'paso-test',
    n: '01',
    etiqueta: 'Se conoce',
    titulo: 'Unos tests cortos para conocerse.',
    texto: '13 paradas de menos de 10 minutos. No hay respuestas buenas ni malas, y el avance se guarda solo.',
    mac: '/app/mac-test.webp',
    tel: '/app/iphone-test.webp',
    alt: 'El mapa de tests de Timon: módulos completados y el que sigue',
    callouts: [
      { texto: 'parada por parada', donde: 'left-[2%] top-[34%]', giro: -4, color: 'bg-[var(--terra)] text-white' },
      { texto: 'se guarda solo ✓', donde: 'right-[6%] top-[8%]', giro: 3, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#f5ede0',
    acento: 'var(--terra)',
  },
  {
    id: 'paso-investigacion',
    n: '02',
    etiqueta: 'Investiga',
    titulo: 'Recorre las áreas y pregunta cómo es el trabajo.',
    texto:
      'Elige las áreas que le llaman la atención y charla con profesionales virtuales de cada una sobre su día a día.',
    mac: '/app/mac-investigacion.webp',
    tel: '/app/iphone-investigacion.webp',
    alt: 'Las áreas de trabajo con fotos, para elegir y charlar con profesionales',
    callouts: [
      { texto: '16 áreas para recorrer', donde: 'left-[4%] top-[12%]', giro: -3, color: 'bg-[var(--ocean)] text-white' },
      { texto: 'elige lo que le atrae', donde: 'right-[4%] bottom-[30%]', giro: 4, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#dfeaf6',
    acento: 'var(--ocean)',
  },
  {
    id: 'paso-informe',
    n: '03',
    etiqueta: 'Se descubre',
    titulo: 'Un informe que habla de quién es.',
    texto: 'Sus rasgos, lo que lo mueve y las carreras que van con su perfil, ordenadas por compatibilidad.',
    mac: '/app/mac-informe.webp',
    tel: '/app/iphone-informe.webp',
    alt: 'La esencia en el informe: rasgos de Análisis a Expresión, con su puntaje',
    callouts: [
      { texto: 'del rasgo más fuerte al más suave', donde: 'right-[2%] top-[18%]', giro: 3, color: 'bg-[var(--terra)] text-white' },
      { texto: 'en sus palabras', donde: 'left-[6%] bottom-[30%]', giro: -4, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#f7e3d7',
    acento: 'var(--terra-hondo)',
  },
  {
    id: 'paso-comparador',
    n: '04',
    etiqueta: 'Compara',
    titulo: 'Dónde estudiar, comparado en serio.',
    texto: 'Universidades para cada carrera, con filtros por cuota, modalidad y zona. Pública o privada, de un vistazo.',
    mac: '/app/mac-comparador.webp',
    tel: '/app/iphone-comparador.webp',
    alt: 'El comparador de universidades con filtros de cuota, modalidad y ubicación',
    callouts: [
      { texto: 'cuota · modalidad · zona', donde: 'right-[4%] top-[30%]', giro: -3, color: 'bg-[var(--ocean)] text-white' },
      { texto: 'qué tan alineada está', donde: 'left-[3%] bottom-[22%]', giro: 4, color: 'bg-white text-[var(--navy)]' },
    ],
    fondo: '#0f1f36',
    acento: 'var(--ocean-claro)',
  },
]

/** Pantalla dentro de un marco, con las cuatro capturas apiladas y un fundido entre ellas. */
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
 * "La app por dentro": a la izquierda los cuatro pasos, a la derecha un
 * escenario fijo (MacBook + iPhone) que cambia de pantalla, de color y de
 * notas según el paso que está en el centro de la pantalla. En celular cada
 * paso trae su propio iPhone. Con menos movimiento, los cambios son
 * instantáneos (home.css).
 */
export function Recorrido() {
  const [activa, setActiva] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActiva(Number((e.target as HTMLElement).dataset.i))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const paso = PASOS[activa]

  return (
    <div className="mx-auto mt-14 grid max-w-[1240px] gap-10 px-5 lg:mt-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
      {/* ── Pasos ──────────────────────────────────────────────────── */}
      <ol className="relative">
        {PASOS.map((p, i) => (
          <li
            key={p.id}
            id={p.id}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="flex scroll-mt-24 flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0"
          >
            <div
              className="transition-opacity duration-500 lg:opacity-[var(--o)]"
              style={{ '--o': i === activa ? 1 : 0.35 } as React.CSSProperties}
            >
              <p className="etiqueta flex items-center gap-3" style={{ color: p.acento }}>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold tracking-normal text-white"
                  style={{ background: p.acento }}
                >
                  {p.n}
                </span>
                {p.etiqueta}
              </p>
              <h3 className="titulo mt-5 max-w-[16ch] text-[clamp(1.9rem,3.2vw,2.7rem)]">{p.titulo}</h3>
              <p className="mt-4 max-w-[38ch] text-[17.5px] text-[var(--texto2)]">{p.texto}</p>
            </div>

            {/* En celular y tablet, cada paso con su iPhone. */}
            <div
              className="relative mt-8 overflow-hidden rounded-[32px] px-6 pb-0 pt-10 lg:hidden"
              style={{ background: p.fondo }}
            >
              <IPhone className="mx-auto w-[64%] max-w-[260px] translate-y-[14%]">
                <Image src={p.tel} alt={p.alt} fill sizes="260px" className="object-cover object-top" />
              </IPhone>
              <span
                className={`sticker absolute left-4 top-4 ${p.callouts[0].color}`}
                style={{ '--giro': `${p.callouts[0].giro}deg` } as React.CSSProperties}
              >
                {p.callouts[0].texto}
              </span>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Escenario fijo (escritorio) ─────────────────────────────── */}
      <div className="relative hidden lg:block">
        <div className="sticky top-[12vh] h-[76vh]">
          <div
            className="escenario-fondo absolute inset-0 overflow-hidden rounded-[40px]"
            style={{ backgroundColor: paso.fondo }}
          >
            <span aria-hidden className="blob blob-vivo -right-[10%] -top-[16%] h-[60%] w-[50%] bg-white/25" />
            <span aria-hidden className="blob blob-vivo -bottom-[20%] -left-[8%] h-[50%] w-[40%] bg-white/20 [animation-delay:-6s]" />
          </div>

          <div className="relative flex h-full items-center justify-center px-[7%]">
            <div className="relative w-full">
              <MacBook className="w-[88%] drop-shadow-[0_40px_50px_rgba(15,31,54,0.25)]">
                <Pantallas activa={activa} tipo="mac" sizes="720px" />
              </MacBook>
              <div className="absolute -bottom-[6%] right-0 w-[24%] rotate-[4deg]">
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

          {/* Índice de pasos: también son anclas a cada paso. */}
          <nav aria-label="Partes de la app" className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/80 p-1.5 shadow-[0_8px_24px_-12px_rgba(15,31,54,0.35)] backdrop-blur">
            {PASOS.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                aria-current={i === activa ? 'step' : undefined}
                className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors"
                style={i === activa ? { background: p.acento, color: '#fff' } : { color: 'var(--texto2)' }}
              >
                {p.etiqueta}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
