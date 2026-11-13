import Image from 'next/image'
import { Rueda } from '@/components/landing/Marca'

/**
 * La carta del hero: las 16 áreas de trabajo del catálogo (las mismas fotos
 * que usa la app) apagadas, y una ruta de lápiz que se dibuja entre algunas
 * hasta llegar a una carrera. Es la idea de Timon en una imagen: no elegir
 * por descarte, recorrer y decidir. La ruta es ilustrativa, no el resultado
 * de nadie.
 *
 * Solo CSS: se dibuja una vez al cargar y respeta prefers-reduced-motion.
 */

// 4×4, fila por fila. Los ids son los de src/lib/mundos.ts (y public/mapa).
const GRILLA: { id: string; nombre: string }[] = [
  { id: 'arquitectura', nombre: 'Arquitectura' },
  { id: 'salud', nombre: 'Salud' },
  { id: 'ingenieria', nombre: 'Ingeniería' },
  { id: 'tecnologia', nombre: 'Tecnología' },
  { id: 'comunicacion', nombre: 'Comunicación' },
  { id: 'exactas', nombre: 'Ciencias exactas' },
  { id: 'negocios', nombre: 'Negocios' },
  { id: 'audiovisual', nombre: 'Audiovisual' },
  { id: 'deporte', nombre: 'Deporte' },
  { id: 'arte', nombre: 'Diseño y arte' },
  { id: 'juridicas', nombre: 'Derecho' },
  { id: 'turismo', nombre: 'Turismo' },
  { id: 'humanidades', nombre: 'Educación' },
  { id: 'ecologia', nombre: 'Ambiente' },
  { id: 'defensa', nombre: 'Emergencias' },
  { id: 'artes', nombre: 'Música' },
]

// La ruta: índice de la grilla → segundo en que se enciende (acompasado con
// el trazo de 2,6 s que arranca a los 0,35 s).
// El destino es la celda 3 (arriba a la derecha), donde va el timón.
const RUTA: Record<number, number> = { 12: 0.35, 9: 1.0, 4: 1.65, 6: 2.3, 3: 2.95 }

export function Carta() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] pb-14 pt-12 sm:pb-16 sm:pt-14">
      <p
        className="mano aparece absolute right-0 top-0 rotate-[-3deg] text-[19px] text-[var(--rumbo)] sm:text-[22px]"
        style={{ '--d': '3.2s' } as React.CSSProperties}
      >
        elige con fundamento
      </p>

      <div className="relative">
        <ul className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Las 16 áreas de trabajo que recorre Timon">
          {GRILLA.map((a, i) => {
            const enRuta = i in RUTA
            return (
              <li
                key={a.id}
                className="relative aspect-square overflow-hidden rounded-[10px] bg-[var(--mar)] sm:rounded-[14px]"
              >
                <Image
                  src={`/mapa/${a.id}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 140px, 25vw"
                  className={`tile object-cover ${enRuta ? 'tile-on' : ''}`}
                  style={enRuta ? ({ '--d': `${RUTA[i]}s` } as React.CSSProperties) : undefined}
                  priority={i < 8}
                />
                <span className="sr-only">{a.nombre}</span>
                {enRuta && (
                  <span
                    className="aparece absolute left-1 top-1 z-10 max-w-[calc(100%-8px)] truncate rounded-full bg-white/92 px-2 py-0.5 text-[9.5px] font-bold leading-tight text-[var(--tinta)] shadow-sm sm:left-2 sm:top-2 sm:text-[11.5px]"
                    style={{ '--d': `${RUTA[i] + 0.2}s` } as React.CSSProperties}
                    aria-hidden
                  >
                    {a.nombre}
                  </span>
                )}
              </li>
            )
          })}
        </ul>

        {/* La ruta, encima de la grilla. Centros de celda: 50 + 100·col. */}
        <svg
          viewBox="0 0 400 400"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <path
            d="M50 350 C 75 300, 120 295, 150 250 S 40 205, 50 150 S 195 115, 250 150 S 335 115, 350 50"
            pathLength={1}
            fill="none"
            stroke="#fff"
            strokeWidth="9"
            strokeLinecap="round"
            className="ruta-trazo"
            opacity="0.9"
          />
          <path
            d="M50 350 C 75 300, 120 295, 150 250 S 40 205, 50 150 S 195 115, 250 150 S 335 115, 350 50"
            pathLength={1}
            fill="none"
            stroke="var(--rumbo)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="ruta-trazo"
          />
          {[
            [50, 350, 0.35],
            [150, 250, 1.0],
            [50, 150, 1.65],
            [250, 150, 2.3],
          ].map(([x, y, d]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="7"
              fill="var(--rumbo)"
              stroke="#fff"
              strokeWidth="3"
              className="aparece"
              style={{ '--d': `${d}s` } as React.CSSProperties}
            />
          ))}
        </svg>

        {/* El destino: el timón. */}
        <span
          className="aparece absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--rumbo)] shadow-[0_0_0_5px_#fff] sm:h-14 sm:w-14"
          style={{ left: `${87.5}%`, top: `${12.5}%`, '--d': '2.95s' } as React.CSSProperties}
          aria-hidden
        >
          <Rueda size={26} color="#fff" />
        </span>
      </div>

      <p
        className="mano aparece absolute bottom-0 left-0 rotate-[2deg] text-[19px] text-[var(--grafito)] sm:text-[22px]"
        style={{ '--d': '0.2s' } as React.CSSProperties}
      >
        hoy: no sabe qué estudiar
      </p>
      <span className="sr-only">
        Una ruta que arranca en no saber qué estudiar, recorre varias áreas de trabajo y termina en
        una elección con fundamento.
      </span>
    </div>
  )
}
