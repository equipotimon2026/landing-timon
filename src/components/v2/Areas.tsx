import Image from 'next/image'

/** Las 16 áreas del catálogo de la app (ids de src/lib/mundos.ts y public/mapa). */
const AREAS: [string, string][] = [
  ['negocios', 'Negocios'],
  ['salud', 'Salud'],
  ['ingenieria', 'Ingeniería'],
  ['tecnologia', 'Tecnología'],
  ['arte', 'Diseño y arte'],
  ['juridicas', 'Derecho'],
  ['comunicacion', 'Comunicación'],
  ['ecologia', 'Ambiente y agro'],
  ['exactas', 'Ciencias exactas'],
  ['turismo', 'Turismo y gastronomía'],
  ['humanidades', 'Educación'],
  ['audiovisual', 'Audiovisual'],
  ['arquitectura', 'Arquitectura'],
  ['deporte', 'Deporte'],
  ['artes', 'Música y espectáculo'],
  ['defensa', 'Seguridad y emergencias'],
]

function Fila({ items, reverse }: { items: [string, string][]; reverse?: boolean }) {
  const doble = [...items, ...items]
  return (
    <div className="marquesina-caja overflow-hidden">
      <ul className="marquesina" data-reverse={reverse ? '' : undefined} style={{ '--dur': '70s' } as React.CSSProperties}>
        {doble.map(([id, nombre], i) => (
          <li
            key={`${id}-${i}`}
            aria-hidden={i >= items.length}
            className="relative h-[200px] w-[160px] shrink-0 overflow-hidden rounded-[20px] sm:h-[280px] sm:w-[230px]"
          >
            <Image src={`/mapa/${id}.jpg`} alt="" fill sizes="230px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,31,54,0.75)] via-[rgba(15,31,54,0.05)] to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 text-[15px] font-medium leading-tight text-[var(--papel)] sm:text-[17px]">
              {nombre}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Dos filas que se cruzan despacio. Se frenan con el mouse encima. */
export function Areas() {
  return (
    <div className="space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <Fila items={AREAS.slice(0, 8)} />
      <Fila items={AREAS.slice(8)} reverse />
      <p className="sr-only">Las 16 áreas: {AREAS.map(([, n]) => n).join(', ')}.</p>
    </div>
  )
}
