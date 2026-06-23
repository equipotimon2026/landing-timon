'use client'

type Variant = 'careers' | 'universities' | 'cities'

type Item = {
  name: string
  /** Path to monochrome SVG in /public/logos/universities. Optional — when missing the marquee falls back to italic text only. */
  logo?: string
}

const CAREERS: Item[] = [
  { name: 'Políticas Públicas' },
  { name: 'Biomedicina' },
  { name: 'Diseño de Producto' },
  { name: 'Ciberseguridad' },
  { name: 'Comunicación Digital' },
  { name: 'Economía' },
  { name: 'Inteligencia Artificial' },
  { name: 'Negocios Globales' },
  { name: 'Producción Musical' },
  { name: 'Artes Audiovisuales' },
  { name: 'Tecnología Educativa' },
  { name: 'Energías Renovables' },
  { name: 'Ciencias Políticas' },
  { name: 'Medicina' },
  { name: 'Arquitectura' },
  { name: 'Diseño Industrial' },
  { name: 'Filosofía' },
  { name: 'Ciencias de la Computación' },
  { name: 'Psicología' },
  { name: 'Comunicación' },
  { name: 'Derecho' },
  { name: 'Bioquímica' },
  { name: 'Biotecnología' },
  { name: 'Antropología' },
  { name: 'Ingeniería Industrial' },
  { name: 'Sociología' },
  { name: 'Derecho Digital' },
  { name: 'Biociencias' },
  { name: 'Bioingeniería' },
  { name: 'Edición Digital' },
  { name: 'Diseño Multimedia' },
  { name: 'Letras' },
  { name: 'Veterinaria' },
  { name: 'Diseño Gráfico' },
  { name: 'Ciencia de Datos' },
  { name: 'Relaciones Internacionales' },
  { name: 'Música' },
  { name: 'Cine' },
  { name: 'Educación' },
  { name: 'Ingeniería Ambiental' },
]

// Universities — order intentionally: logo-ed first (visual impact), then text-only fallback.
const UNIVERSITIES: Item[] = [
  { name: 'UBA', logo: '/logos/universities/uba.svg' },
  { name: 'UCA', logo: '/logos/universities/uca.png' },
  { name: 'ITBA', logo: '/logos/universities/itba.png' },
  { name: 'UADE', logo: '/logos/universities/uade.svg' },
  { name: 'UTN', logo: '/logos/universities/utn.png' },
  { name: 'UNLP', logo: '/logos/universities/unlp.png' },
  { name: 'Universidad Nacional de Córdoba', logo: '/logos/universities/unc.svg' },
  { name: 'UNRN', logo: '/logos/universities/unrn.svg' },
  { name: 'Siglo 21', logo: '/logos/universities/siglo21.svg' },
  { name: 'UNTREF', logo: '/logos/universities/untref.svg' },
  // text-only fallbacks (SVG/PNG no disponible)
  { name: 'UTDT' },
  { name: 'Universidad Austral' },
  { name: 'San Andrés' },
  { name: 'UCEMA' },
  { name: 'Favaloro' },
  { name: 'UNL' },
  { name: 'UNS' },
  { name: 'UNCuyo' },
  { name: 'UNR' },
  { name: 'Universidad Maimónides' },
]

const CITIES: Item[] = [
  { name: 'CABA' },
  { name: 'La Plata' },
  { name: 'Córdoba' },
  { name: 'Rosario' },
  { name: 'Mendoza' },
  { name: 'Mar del Plata' },
  { name: 'Bariloche' },
  { name: 'Tucumán' },
  { name: 'Bahía Blanca' },
  { name: 'Salta' },
  { name: 'Santa Fe' },
  { name: 'Neuquén' },
]

const SOURCES: Record<Variant, Item[]> = {
  careers: CAREERS,
  universities: UNIVERSITIES,
  cities: CITIES,
}

type Props = {
  variant: Variant
  surface?: 'cream' | 'navy'
  speedSec?: number
}

export function Marquee({ variant, surface = 'cream', speedSec = 70 }: Props) {
  const items = SOURCES[variant]
  // Duplicate items to enable seamless -50% translate loop
  const sequence = [...items, ...items]

  const isNavy = surface === 'navy'
  const fadeColor = isNavy ? 'rgb(15,31,54)' : 'rgb(237,226,207)'
  const textColor = isNavy ? 'rgba(245,237,224,0.78)' : 'rgba(15,31,54,0.72)'
  const sepColor = isNavy ? 'var(--terra-soft)' : 'var(--terra)'
  // CSS filter chain — converts any SVG color to monochrome target.
  // For cream surface: aim for navy #0F1F36. For navy surface: aim for cream #F5EDE0.
  const logoFilter = isNavy
    ? 'brightness(0) invert(96%) sepia(8%) saturate(560%) hue-rotate(2deg) brightness(99%) contrast(94%)'
    : 'brightness(0) invert(8%) sepia(28%) saturate(1880%) hue-rotate(192deg) brightness(96%) contrast(94%)'

  return (
    <div
      className={`relative w-full overflow-hidden border-y ${
        isNavy ? 'border-[var(--navy-mid)] bg-[var(--navy)]' : 'border-[var(--border-cream)] bg-[var(--cream-deep)]'
      }`}
    >
      {/* fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${fadeColor} 0%, transparent 100%)` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${fadeColor} 0%, transparent 100%)` }}
      />

      <div className="py-3 sm:py-4">
        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: `timon-marquee ${speedSec}s linear infinite`, willChange: 'transform' }}
        >
          {sequence.map((item, idx) => {
            // Apply monochrome filter only to SVG silhouettes; let PNG color logos render natively.
            const isSvg = item.logo?.endsWith('.svg')
            return (
            <span key={`${item.name}-${idx}`} className="inline-flex items-center" style={{ marginInline: '1rem' }}>
              {item.logo && (
                <img
                  aria-hidden
                  src={item.logo}
                  alt=""
                  className="shrink-0 align-middle"
                  style={{
                    height: '1.5rem',
                    width: 'auto',
                    maxWidth: '4.5rem',
                    filter: isSvg ? logoFilter : undefined,
                    opacity: isSvg ? 1 : 0.85,
                    marginRight: '0.625rem',
                  }}
                />
              )}
              <span
                className="font-display font-normal"
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: textColor,
                }}
              >
                {item.name}
              </span>
              <span
                className="font-display not-italic"
                style={{
                  color: sepColor,
                  fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)',
                  marginLeft: '1rem',
                }}
              >
                ⌖
              </span>
            </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
