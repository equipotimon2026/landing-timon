/**
 * El isotipo de Timon tal como lo define el Brand Kit (timon-logo.svg): aro
 * r=22, núcleo r=5 relleno y 8 rayos con un punto en cada extremo, viewBox 96.
 * Sin sombras, degradados ni 3D (regla de la marca).
 */
const RAYOS: [number, number, number, number][] = [
  [48, 10, 48, 86],
  [10, 48, 86, 48],
  [74.87, 21.13, 21.13, 74.87],
  [74.87, 74.87, 21.13, 21.13],
]
const PUNTOS: [number, number][] = [
  [48, 10], [48, 86], [10, 48], [86, 48],
  [74.87, 21.13], [21.13, 74.87], [74.87, 74.87], [21.13, 21.13],
]

export function Isotipo({ size = 28, className = '', trazo = 3 }: { size?: number; className?: string; trazo?: number }) {
  return (
    <svg viewBox="0 0 96 96" width={size} height={size} fill="none" className={className} aria-hidden="true">
      <circle cx="48" cy="48" r="22" stroke="currentColor" strokeWidth={trazo} />
      <circle cx="48" cy="48" r="5" fill="currentColor" />
      {RAYOS.map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={trazo} strokeLinecap="round" />
      ))}
      {PUNTOS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
      ))}
    </svg>
  )
}

/** Isologo: isotipo + wordmark "Timon" en Jakarta, como en la navbar del producto. */
export function Isologo({ tono = 'tinta' }: { tono?: 'tinta' | 'crema' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${tono === 'tinta' ? 'text-[#0f1f36]' : 'text-[#f5ede0]'}`}>
      <Isotipo size={26} />
      <span className="text-[21px] font-medium tracking-[-0.02em]">Timon</span>
    </span>
  )
}
