import { BriefcaseBusiness, CalendarHeart, GraduationCap, UserRound, UsersRound } from 'lucide-react'
import { Isotipo } from './Isotipo'

/**
 * La red, el corazón del Programa: tu hijo → Timon → profesionales,
 * universidades, empresas y eventos, unidos por "beams" (patrón Animated
 * Beam de Magic UI, reescrito en SVG + CSS): una línea tenue fija y un pulso
 * de luz que la recorre. Dos composiciones: horizontal en escritorio y
 * vertical en celular. Con menos movimiento, el pulso no corre (home.css).
 */
const NODOS = [
  { titulo: 'Profesionales', linea: 'cuentan su día de trabajo', Icono: UsersRound, color: '#1e5ba0', fondo: 'bg-[var(--ocean)] text-white' },
  { titulo: 'Universidades', linea: '50 para comparar', Icono: GraduationCap, color: '#c97f5e', fondo: 'bg-[var(--terra)] text-white' },
  { titulo: 'Empresas', linea: 'donde se trabaja de eso', Icono: BriefcaseBusiness, color: '#f5ede0', fondo: 'bg-[var(--crema)] text-[var(--navy)]' },
  { titulo: 'Eventos', linea: 'para verlo en persona', Icono: CalendarHeart, color: '#dfeaf6', fondo: 'bg-[var(--cielo)] text-[var(--navy)]' },
]

type P = [number, number]
type Plano = { vb: [number, number]; chico: P; hub: P; nodos: P[]; curva: 'h' | 'v' }

const ESCRITORIO: Plano = {
  vb: [1000, 520],
  chico: [90, 260],
  hub: [400, 260],
  nodos: [
    [800, 70],
    [800, 200],
    [800, 330],
    [800, 460],
  ],
  curva: 'h',
}

const CELULAR: Plano = {
  vb: [400, 640],
  chico: [200, 50],
  hub: [200, 230],
  nodos: [
    [100, 420],
    [300, 420],
    [100, 570],
    [300, 570],
  ],
  curva: 'v',
}

function curva([x1, y1]: P, [x2, y2]: P, eje: 'h' | 'v') {
  if (eje === 'h') {
    const m = (x1 + x2) / 2
    return `M${x1} ${y1} C ${m} ${y1}, ${m} ${y2}, ${x2} ${y2}`
  }
  const m = (y1 + y2) / 2
  return `M${x1} ${y1} C ${x1} ${m}, ${x2} ${m}, ${x2} ${y2}`
}

function Beam({ d, color, retraso }: { d: string; color: string; retraso: number }) {
  return (
    <>
      <path d={d} pathLength={1} fill="none" stroke="rgba(245,237,224,0.16)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="beam"
        style={{ animationDelay: `${retraso}s` }}
      />
    </>
  )
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`

function Composicion({ plano, className }: { plano: Plano; className: string }) {
  const [w, h] = plano.vb
  const lugar = ([x, y]: P) => ({ left: pct(x, w), top: pct(y, h) })
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <Beam d={curva(plano.chico, plano.hub, plano.curva)} color="#f5ede0" retraso={0} />
        {plano.nodos.map((n, i) => (
          <Beam key={i} d={curva(plano.hub, n, plano.curva)} color={NODOS[i].color} retraso={0.9 + i * 0.35} />
        ))}
      </svg>

      <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={lugar(plano.chico)}>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--navy)] shadow-[0_0_0_8px_rgba(255,255,255,0.08)] sm:h-20 sm:w-20">
          <UserRound size={30} aria-hidden />
        </span>
        <p className="mt-2 whitespace-nowrap text-[14px] font-semibold">Tu hijo o hija</p>
      </div>

      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={lugar(plano.hub)}>
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--crema)] text-[var(--navy)] shadow-[0_0_0_12px_rgba(245,237,224,0.12),0_0_0_26px_rgba(245,237,224,0.06)] sm:h-32 sm:w-32">
          <Isotipo size={56} trazo={3.4} />
          <span className="sr-only">Timon</span>
        </span>
      </div>

      <ul>
        {plano.nodos.map((n, i) => {
          const nodo = NODOS[i]
          return (
            <li key={nodo.titulo} className="absolute -translate-x-1/2 -translate-y-1/2" style={lugar(n)}>
              <div className={`tesela flex items-center gap-3 rounded-[22px] px-4 py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] ${nodo.fondo}`}>
                <nodo.Icono size={22} aria-hidden className="shrink-0" />
                <div className="leading-tight">
                  <p className="whitespace-nowrap text-[16px] font-semibold sm:text-[18px]">{nodo.titulo}</p>
                  <p className="hidden whitespace-nowrap text-[13px] opacity-75 sm:block">{nodo.linea}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Red() {
  return (
    <div className="mx-auto max-w-[1080px] px-5">
      <Composicion plano={ESCRITORIO} className="hidden md:block" />
      <Composicion plano={CELULAR} className="mx-auto max-w-[400px] md:hidden" />
    </div>
  )
}
