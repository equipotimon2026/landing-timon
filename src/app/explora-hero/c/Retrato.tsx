/**
 * Retratos e íconos dibujados a mano en SVG, con los colores de la marca.
 * Personas ficticias: formas simples, sin rasgos, para que se lean como
 * ilustración y no como foto de alguien real.
 */

export type RetratoTipo = 'lucia' | 'bruno' | 'valentina' | 'sol' | 'carolina' | 'nahuel'

const NAVY = '#0f1f36'
const OCEAN = '#1e5ba0'
const TERRA = '#c97f5e'
const TERRA_HONDO = '#a8603f'
const CIELO = '#dfeaf6'
const DURAZNO = '#f7e3d7'
const CREMA = '#f5ede0'

type Look = { fondo: string; ropa: string; piel: string; pelo: string }

const LOOKS: Record<RetratoTipo, Look> = {
  lucia: { fondo: CIELO, ropa: TERRA, piel: '#e2a77f', pelo: '#3a2418' },
  bruno: { fondo: DURAZNO, ropa: OCEAN, piel: '#c48a62', pelo: '#1f1a1c' },
  valentina: { fondo: CIELO, ropa: NAVY, piel: '#f0c3a0', pelo: '#6b3a22' },
  sol: { fondo: DURAZNO, ropa: OCEAN, piel: '#9a6343', pelo: '#1f1712' },
  carolina: { fondo: CIELO, ropa: NAVY, piel: '#eab792', pelo: '#8a4527' },
  nahuel: { fondo: DURAZNO, ropa: TERRA, piel: '#b97c55', pelo: '#231b17' },
}

function PeloAtras({ tipo, color }: { tipo: RetratoTipo; color: string }) {
  switch (tipo) {
    case 'lucia':
      return <path d="M38 50 C36 27 50 20 61 20 C73 20 85 28 82 50 L83 92 C72 97 48 97 37 92 Z" fill={color} />
    case 'carolina':
      return <path d="M37 52 C35 28 49 21 60 21 C72 21 85 28 83 52 L84 74 C76 79 44 79 36 74 Z" fill={color} />
    case 'sol':
      return <ellipse cx="80" cy="34" rx="9" ry="12" transform="rotate(30 80 34)" fill={color} />
    default:
      return null
  }
}

function PeloAdelante({ tipo, color }: { tipo: RetratoTipo; color: string }) {
  switch (tipo) {
    case 'lucia':
      return <path d="M40 46 C40 31 50 25 61 25 C72 25 81 31 80 46 C73 38 62 35 54 36 C48 37 43 41 40 46 Z" fill={color} />
    case 'carolina':
      return <path d="M39 50 C38 32 49 25 60 25 C72 25 82 32 81 50 C79 40 70 33 58 34 C50 35 44 41 39 50 Z" fill={color} />
    case 'bruno':
      return (
        <g fill={color}>
          {[
            [44, 34, 7],
            [52, 28, 7.5],
            [61, 26, 8],
            [70, 28, 7.5],
            [77, 35, 7],
            [41, 42, 5.5],
            [79, 43, 5.5],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      )
    case 'valentina':
      return null
    case 'sol':
      return <path d="M40 47 C39 31 50 25 60 25 C71 25 81 31 80 47 C76 38 68 33 59 33 C51 33 44 38 40 47 Z" fill={color} />
    case 'nahuel':
      return <path d="M39 47 C38 30 50 24 61 24 C73 24 83 31 81 47 C78 40 74 35 66 34 C59 33 54 36 49 36 C45 37 41 41 39 47 Z" fill={color} />
  }
}

function Detalle({ tipo, look }: { tipo: RetratoTipo; look: Look }) {
  switch (tipo) {
    case 'lucia':
      // Estetoscopio colgado.
      return (
        <g fill="none" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round">
          <path d="M50 84 C50 100 56 104 60 104 C64 104 70 100 70 84" />
          <circle cx="60" cy="108" r="3.4" fill={CREMA} />
        </g>
      )
    case 'bruno':
      return (
        <g>
          {/* Barba y anteojos. */}
          <path d="M42 54 C44 70 52 76 60 76 C68 76 76 70 78 54 C74 62 68 66 60 66 C52 66 46 62 42 54 Z" fill={look.pelo} />
          <g fill="none" stroke={NAVY} strokeWidth="2.2">
            <circle cx="52" cy="50" r="6" />
            <circle cx="68" cy="50" r="6" />
            <path d="M58 50 H62" />
          </g>
          {/* Lápiz en la oreja. */}
          <g transform="rotate(-38 84 44)">
            <rect x="80" y="30" width="5" height="24" rx="1.5" fill={TERRA} />
            <path d="M80 54 L82.5 60 L85 54 Z" fill={CREMA} />
          </g>
        </g>
      )
    case 'valentina':
      // Casco de planta.
      return (
        <g>
          <path d="M36 42 C36 24 48 16 60 16 C72 16 84 24 84 42 Z" fill={TERRA} />
          <rect x="31" y="40" width="58" height="6" rx="3" fill={TERRA_HONDO} />
          <rect x="57" y="17" width="6" height="24" rx="3" fill={TERRA_HONDO} opacity="0.55" />
        </g>
      )
    case 'sol':
      // Silbato.
      return (
        <g>
          <path d="M50 84 L60 100 L70 84" fill="none" stroke={CREMA} strokeWidth="2" />
          <rect x="55" y="98" width="12" height="7" rx="3.5" fill={TERRA} />
        </g>
      )
    case 'carolina':
      return (
        <g>
          <path d="M48 84 L60 96 L72 84" fill="none" stroke={CREMA} strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="39.5" cy="58" r="2.6" fill={TERRA} />
          <circle cx="80.5" cy="58" r="2.6" fill={TERRA} />
        </g>
      )
    case 'nahuel':
      // Auriculares al cuello.
      return (
        <g fill="none" stroke={NAVY} strokeWidth="4" strokeLinecap="round">
          <path d="M42 80 C44 92 76 92 78 80" />
          <rect x="36" y="74" width="10" height="12" rx="4" fill={NAVY} stroke="none" />
          <rect x="74" y="74" width="10" height="12" rx="4" fill={NAVY} stroke="none" />
        </g>
      )
  }
}

/** Ojos, sonrisa y un poco de color en las mejillas: lo justo para que caigan simpáticos. */
function Cara() {
  return (
    <g>
      <ellipse cx="52.5" cy="51" rx="1.9" ry="2.3" fill={NAVY} />
      <ellipse cx="67.5" cy="51" rx="1.9" ry="2.3" fill={NAVY} />
      <circle cx="47" cy="59" r="3.6" fill={TERRA} opacity="0.28" />
      <circle cx="73" cy="59" r="3.6" fill={TERRA} opacity="0.28" />
      <path d="M55 60.5 C57.5 63.5 62.5 63.5 65 60.5" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  )
}

export function Retrato({ tipo, className }: { tipo: RetratoTipo; className?: string }) {
  const look = LOOKS[tipo]
  const id = `retrato-${tipo}`
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="120" height="120" fill={look.fondo} />
        <PeloAtras tipo={tipo} color={look.pelo} />
        <path d="M12 124 C12 94 34 82 60 82 C86 82 108 94 108 124 Z" fill={look.ropa} />
        <rect x="52" y="64" width="16" height="22" rx="7" fill={look.piel} />
        <path d="M52 78 C56 82 64 82 68 78 L68 84 C64 87 56 87 52 84 Z" fill="#000" opacity="0.08" />
        {tipo === 'valentina' && <circle cx="60" cy="27" r="9" fill={look.pelo} />}
        <ellipse cx="60" cy="50" rx="20" ry="23" fill={look.piel} />
        <Cara />
        <PeloAdelante tipo={tipo} color={look.pelo} />
        <Detalle tipo={tipo} look={look} />
      </g>
    </svg>
  )
}

/** Íconos de línea para "dónde se estudia" y "dónde se trabaja". */
export function IconoEstudia({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M6 18 L24 8 L42 18 Z" />
      <path d="M10 18 V36 M18 18 V36 M30 18 V36 M38 18 V36" strokeLinecap="round" />
      <path d="M5 40 H43" strokeLinecap="round" />
      <circle cx="24" cy="14" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconoTrabaja({ interes, className }: { interes: string; className?: string }) {
  const comun = { className, 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const, viewBox: '0 0 48 48' }
  switch (interes) {
    case 'animales':
      // Galpón de campo.
      return (
        <svg {...comun}>
          <path d="M6 40 V20 L24 8 L42 20 V40 Z" />
          <path d="M17 40 V27 H31 V40 M17 27 L31 40 M31 27 L17 40" />
        </svg>
      )
    case 'dibujar':
      // Atril.
      return (
        <svg {...comun}>
          <rect x="10" y="8" width="28" height="22" rx="2" />
          <path d="M16 24 L22 17 L27 21 L32 15" />
          <path d="M18 30 L13 42 M30 30 L35 42 M24 30 V40" />
        </svg>
      )
    case 'problemas':
      // Fábrica.
      return (
        <svg {...comun}>
          <path d="M6 40 V22 L16 28 V22 L26 28 V22 L36 28 V10 H42 V40 Z" />
          <path d="M14 34 H18 M24 34 H28 M32 34 H36" />
        </svg>
      )
    case 'ayudar':
      // Cruz de salud.
      return (
        <svg {...comun}>
          <path d="M19 8 H29 V19 H40 V29 H29 V40 H19 V29 H8 V19 H19 Z" />
        </svg>
      )
    case 'plata':
      // Gráfico de barras.
      return (
        <svg {...comun}>
          <path d="M6 40 H42" />
          <path d="M11 40 V28 H17 V40 M21 40 V20 H27 V40 M31 40 V12 H37 V40" />
        </svg>
      )
    default:
      // Casa con señal: trabajo remoto.
      return (
        <svg {...comun}>
          <path d="M8 40 V22 L24 10 L40 22 V40 Z" />
          <path d="M18 32 C21 29 27 29 30 32 M15 28 C20 23 28 23 33 28" />
          <circle cx="24" cy="35.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}

/** El timón de fondo: aro, maza y ocho rayos con sus manijas, en trazo fino. */
export function Timon({ className }: { className?: string }) {
  const rayos = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4)
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden fill="none" stroke="currentColor" strokeLinecap="round">
      <circle r="31" strokeWidth="1.4" />
      <circle r="27" strokeWidth="0.5" />
      <circle r="6.5" strokeWidth="1.4" />
      {rayos.map((a) => {
        const c = Math.cos(a)
        const sn = Math.sin(a)
        return (
          <g key={a}>
            <line x1={c * 6.5} y1={sn * 6.5} x2={c * 31} y2={sn * 31} strokeWidth="1.1" />
            <line x1={c * 33} y1={sn * 33} x2={c * 45} y2={sn * 45} strokeWidth="3.2" />
          </g>
        )
      })}
    </svg>
  )
}
