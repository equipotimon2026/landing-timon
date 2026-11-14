import { useId } from 'react'
import { AVATAR, C, oscurecer, type Emblema, type Marca, type Rasgos } from '../red-datos'

/** Avatar plano, sin cara: fondo de marca, hombros, cabeza y peinado. */
export function Avatar({ r, size = 44, className = '' }: { r: Rasgos; size?: number; className?: string }) {
  const id = useId()
  const pelo = AVATAR.pelo[r.pelo]
  const sombra = oscurecer(r.piel, 0.14)
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="64" height="64" fill={r.fondo} />
        {pelo.atras && <path d={pelo.atras} fill={r.colorPelo} />}
        <path d={AVATAR.hombros} fill={r.ropa} />
        <path d="M25 46.5c2.2 3 4.4 4.3 7 4.3s4.8-1.3 7-4.3" fill="none" stroke={oscurecer(r.ropa, 0.18)} strokeWidth="1.4" strokeLinecap="round" />
        <path d={AVATAR.cuello} fill={sombra} />
        {AVATAR.orejas.map((o) => (
          <ellipse key={o.cx} cx={o.cx} cy={o.cy} rx="2.2" ry="3" fill={sombra} />
        ))}
        <ellipse {...AVATAR.cabeza} fill={r.piel} />
        {r.pelo === 'rulos'
          ? AVATAR.rulos.map(([cx, cy, rr]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={rr} fill={r.colorPelo} />)
          : <path d={pelo.adelante} fill={r.colorPelo} />}
        {r.anteojos && (
          <g fill="none" stroke={C.navy} strokeWidth="1.3" opacity="0.85">
            <circle cx="27.6" cy="30.4" r="3.1" />
            <circle cx="36.4" cy="30.4" r="3.1" />
            <path d="M30.7 30.2h2.6" />
          </g>
        )}
      </g>
    </svg>
  )
}

const ESCUDO = 'M24 3 43 9.4v15.4C43 37 34.6 44.6 24 49 13.4 44.6 5 37 5 24.8V9.4z'

function Emblema({ tipo }: { tipo: Emblema }) {
  const t = { fill: 'none', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (tipo) {
    case 'columnas':
      return (
        <g {...t}>
          <path d="M14 20.5 24 14l10 6.5z" fill="#fff" />
          <path d="M16.5 23.5v10M21.5 23.5v10M26.5 23.5v10M31.5 23.5v10M14 36.5h20" />
        </g>
      )
    case 'estrella':
      return <path d="m24 14 2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z" fill="#fff" />
    case 'olas':
      return (
        <g {...t}>
          <path d="M14 21.5c3.3-2.6 6.7-2.6 10 0s6.7 2.6 10 0M14 27.5c3.3-2.6 6.7-2.6 10 0s6.7 2.6 10 0M14 33.5c3.3-2.6 6.7-2.6 10 0s6.7 2.6 10 0" />
        </g>
      )
    case 'libro':
      return (
        <g {...t}>
          <path d="M24 19.5c-3-2-6.5-2.6-10-1.8v15c3.5-.8 7-.2 10 1.8 3-2 6.5-2.6 10-1.8v-15c-3.5-.8-7-.2-10 1.8zM24 19.5v15" />
        </g>
      )
  }
}

/** Escudo universitario inventado: forma clásica, un color de marca y un emblema blanco. */
export function Escudo({ emblema, color, size = 44 }: { emblema: Emblema; color: string; size?: number }) {
  return (
    <svg viewBox="0 0 48 52" width={size} height={size * (52 / 48)} aria-hidden>
      <path d={ESCUDO} fill={color} />
      <path d={ESCUDO} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.2" transform="translate(24 26) scale(0.86) translate(-24 -26)" />
      <Emblema tipo={emblema} />
    </svg>
  )
}

/** Marca geométrica de una empresa ficticia, en un cuadrado redondeado. */
export function MarcaEmpresa({ marca, color, fondo, size = 44 }: { marca: Marca; color: string; fondo: string; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <rect width="48" height="48" rx="13" fill={fondo} />
      {marca === 'circulos' && (
        <g>
          <circle cx="19.5" cy="24" r="8.5" fill={color} />
          <circle cx="28.5" cy="24" r="8.5" fill={color} fillOpacity="0.45" />
        </g>
      )}
      {marca === 'arco' && (
        <g fill={color}>
          <path d="M13 35V23a11 11 0 0 1 22 0v12h-6V23a5 5 0 0 0-10 0v12z" />
        </g>
      )}
      {marca === 'hoja' && <path d="M16 33c0-10 6-17 17-18 0 11-6 18-15 18zM16 33l9-9" fill={color} stroke={fondo} strokeWidth="1.6" strokeLinecap="round" />}
      {marca === 'triangulo' && (
        <g>
          <path d="m14 33 10-18 10 18z" fill={color} />
          <circle cx="31" cy="31" r="5" fill={C.terra} />
        </g>
      )}
    </svg>
  )
}

/** Hoja de almanaque: mes arriba, número grande, día de la semana. */
export function Fecha({ mes, numero, dia, size = 44 }: { mes: string; numero: string; dia: string; size?: number }) {
  const k = size / 44
  return (
    <span
      className="flex shrink-0 flex-col items-center overflow-hidden rounded-[11px] bg-white text-[var(--navy)] ring-1 ring-[var(--borde)]"
      style={{ width: size, height: size * 1.12 }}
      aria-hidden
    >
      <span className="w-full bg-[var(--terra)] text-center font-semibold text-white" style={{ fontSize: 10 * k, lineHeight: `${14 * k}px` }}>
        {mes}
      </span>
      <span className="font-semibold tracking-[-0.03em]" style={{ fontSize: 18 * k, lineHeight: `${21 * k}px`, marginTop: 1 * k }}>
        {numero}
      </span>
      <span className="text-[var(--tenue)]" style={{ fontSize: 9 * k, lineHeight: `${10 * k}px` }}>
        {dia}
      </span>
    </span>
  )
}
