'use client'

type Tone = 'ocean' | 'navy' | 'terra' | 'cream'

type Props = {
  tone?: Tone
  size?: number
  showWordmark?: boolean
  spin?: boolean
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

const TONE: Record<Tone, string> = {
  ocean: '#1E5BA0',
  navy: '#0F1F36',
  terra: '#C97F5E',
  cream: '#F5EDE0',
}

/**
 * Timon wheel mark — 8-spoke rueda de timón.
 * Geometry follows the brand reference: rim r=22, hub r=5,
 * 8 spokes with rounded caps extending past the rim, circle handles.
 * viewBox 96 — stroke ratio 1:32 → legible from 16px favicon to hero.
 */
export function WheelMark({
  tone = 'ocean',
  size = 32,
  spin = false,
  className = '',
}: {
  tone?: Tone
  size?: number
  spin?: boolean
  className?: string
}) {
  const c = TONE[tone]
  // Stroke scales with size for proportional weight at every dimension
  const stroke = size <= 24 ? 1.5 : size <= 48 ? 2 : 3
  const tinyVB = size <= 32
  const vb = tinyVB ? '0 0 32 32' : '0 0 96 96'

  if (tinyVB) {
    return (
      <svg
        viewBox={vb}
        fill="none"
        width={size}
        height={size}
        className={`${spin ? 'spin-helm' : ''} ${className}`}
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="7.3" stroke={c} strokeWidth={stroke} fill="none" />
        <circle cx="16" cy="16" r="1.7" fill={c} />
        <line x1="16" y1="2.5" x2="16" y2="29.5" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
        <line x1="2.5" y1="16" x2="29.5" y2="16" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
        <line x1="25.55" y1="6.45" x2="6.45" y2="25.55" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
        <line x1="25.55" y1="25.55" x2="6.45" y2="6.45" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
        <circle cx="16" cy="2.5" r="1.5" fill={c} />
        <circle cx="16" cy="29.5" r="1.5" fill={c} />
        <circle cx="2.5" cy="16" r="1.5" fill={c} />
        <circle cx="29.5" cy="16" r="1.5" fill={c} />
        <circle cx="25.55" cy="6.45" r="1.5" fill={c} />
        <circle cx="6.45" cy="25.55" r="1.5" fill={c} />
        <circle cx="25.55" cy="25.55" r="1.5" fill={c} />
        <circle cx="6.45" cy="6.45" r="1.5" fill={c} />
      </svg>
    )
  }

  return (
    <svg
      viewBox={vb}
      fill="none"
      width={size}
      height={size}
      className={`${spin ? 'spin-helm' : ''} ${className}`}
      aria-hidden="true"
    >
      <circle cx="48" cy="48" r="22" stroke={c} strokeWidth={stroke} fill="none" />
      <circle cx="48" cy="48" r="5" fill={c} />
      <line x1="48" y1="10" x2="48" y2="86" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
      <line x1="10" y1="48" x2="86" y2="48" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
      <line x1="74.87" y1="21.13" x2="21.13" y2="74.87" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
      <line x1="74.87" y1="74.87" x2="21.13" y2="21.13" stroke={c} strokeWidth={stroke} strokeLinecap="round" />
      <circle cx="48" cy="10" r="4" fill={c} />
      <circle cx="48" cy="86" r="4" fill={c} />
      <circle cx="10" cy="48" r="4" fill={c} />
      <circle cx="86" cy="48" r="4" fill={c} />
      <circle cx="74.87" cy="21.13" r="4" fill={c} />
      <circle cx="21.13" cy="74.87" r="4" fill={c} />
      <circle cx="74.87" cy="74.87" r="4" fill={c} />
      <circle cx="21.13" cy="21.13" r="4" fill={c} />
    </svg>
  )
}

export function Logo({
  tone = 'ocean',
  size = 26,
  showWordmark = true,
  onClick,
  className = '',
  ariaLabel = 'Timon — volver al inicio',
}: Props) {
  const wordColor = tone === 'cream' ? TONE.cream : TONE.navy

  const inner = (
    <span className="inline-flex items-center gap-2.5">
      <WheelMark tone={tone} size={size} />
      {showWordmark && (
        <span
          className="font-sans font-bold text-[1.125rem] tracking-[-0.025em] leading-none"
          style={{ color: wordColor }}
        >
          Timon
        </span>
      )}
    </span>
  )

  if (!onClick) return <span className={className}>{inner}</span>

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`cursor-pointer transition-opacity hover:opacity-80 ${className}`}
    >
      {inner}
    </button>
  )
}
