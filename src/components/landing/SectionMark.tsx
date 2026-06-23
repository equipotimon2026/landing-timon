'use client'

type Props = {
  /** Digits or short string. Typically "01" — "05". */
  label: string
  /** Where to anchor inside the section. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Outline stroke tone. */
  tone?: 'terra' | 'ocean' | 'cream' | 'navy'
  /** Override opacity. Default depends on tone. */
  opacity?: number
}

const TONES: Record<NonNullable<Props['tone']>, string> = {
  terra: 'rgba(201, 127, 94, 0.20)',
  ocean: 'rgba(30, 91, 160, 0.16)',
  cream: 'rgba(245, 237, 224, 0.16)',
  navy: 'rgba(15, 31, 54, 0.10)',
}

/**
 * Massive italic outlined Fraunces glyph used as decorative background mark.
 * Hidden on small screens (below sm). Pointer-events disabled so it never blocks interaction.
 */
export function SectionMark({
  label,
  position = 'top-right',
  tone = 'terra',
  opacity,
}: Props) {
  const pos = {
    'top-right': { top: '-3rem', right: '-2rem' },
    'top-left': { top: '-3rem', left: '-2rem' },
    'bottom-right': { bottom: '-4rem', right: '-2rem' },
    'bottom-left': { bottom: '-4rem', left: '-2rem' },
  }[position]

  return (
    <span
      aria-hidden
      className="absolute pointer-events-none select-none font-display italic font-light hidden sm:block"
      style={{
        ...pos,
        fontSize: 'clamp(14rem, 28vw, 32rem)',
        lineHeight: 0.85,
        letterSpacing: '-0.06em',
        color: 'transparent',
        WebkitTextStroke: `1.5px ${TONES[tone]}`,
        opacity: opacity ?? 1,
        zIndex: 0,
      }}
    >
      {label}
    </span>
  )
}
