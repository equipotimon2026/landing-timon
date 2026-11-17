/**
 * El timón y el wordmark de la presentación (timon_presentacion_v2_1): aro,
 * centro hueco y 8 rayos, sin las bolitas del logo viejo. El wordmark es
 * "Timon" en Jakarta liviana con una línea azul corta debajo.
 */
export function Rueda({ size = 32, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) {
  const rayos = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4)
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="3.4" />
      <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="3.4" />
      {rayos.map((a) => (
        <line
          key={a}
          x1={50 + 10 * Math.cos(a)}
          y1={50 + 10 * Math.sin(a)}
          x2={50 + 45 * Math.cos(a)}
          y2={50 + 45 * Math.sin(a)}
          stroke={color}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

export function MarcaTimon({ tono = 'navy', linea = false, className = '' }: { tono?: 'navy' | 'blanco'; linea?: boolean; className?: string }) {
  const color = tono === 'navy' ? '#1a2640' : '#ffffff'
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="inline-flex items-center gap-2">
        <Rueda size={22} color={color} />
        <span className="text-[22px] font-medium leading-none tracking-[-0.02em]" style={{ color, fontFamily: 'var(--font-jakarta)' }}>
          Timon
        </span>
      </span>
      {linea && <span className="mt-2 h-[2px] w-8 bg-[#3b5fd4]" />}
    </span>
  )
}
