import {
  Inter,
  Manrope,
  DM_Sans,
  Plus_Jakarta_Sans,
  Figtree,
  Outfit,
  Public_Sans,
  Be_Vietnam_Pro,
  Source_Serif_4,
  Newsreader,
  Lora,
} from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const figtree = Figtree({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const publicSans = Public_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const beVietnam = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const newsreader = Newsreader({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '700'] })

type FontOption = {
  id: string
  name: string
  category: 'Sans moderna' | 'Sans humanista' | 'Serif editorial'
  className: string
  note: string
}

const FONTS: FontOption[] = [
  { id: 'inter', name: 'Inter', category: 'Sans moderna', className: inter.className, note: 'Estándar de industria — Vercel, GitHub, Figma. Máxima legibilidad de pantalla.' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', category: 'Sans moderna', className: jakarta.className, note: 'Moderna y profesional con carácter sutil. Balance limpieza/personalidad.' },
  { id: 'manrope', name: 'Manrope', category: 'Sans moderna', className: manrope.className, note: 'Geométrica semi-moderna con redondeces sutiles. Usada por startups.' },
  { id: 'dm-sans', name: 'DM Sans', category: 'Sans moderna', className: dmSans.className, note: 'Geométrica limpia. Optimizada para titulares + body.' },
  { id: 'outfit', name: 'Outfit', category: 'Sans moderna', className: outfit.className, note: 'Geométrica con formas uniformes. Pensada para accesibilidad.' },
  { id: 'figtree', name: 'Figtree', category: 'Sans humanista', className: figtree.className, note: 'Abierta, redonda, friendly pero disciplinada. Muy moderna.' },
  { id: 'public-sans', name: 'Public Sans', category: 'Sans humanista', className: publicSans.className, note: 'Diseñada por US Web Design System. Foco WCAG AA.' },
  { id: 'be-vietnam', name: 'Be Vietnam Pro', category: 'Sans humanista', className: beVietnam.className, note: 'Humanista cálida sin perder limpieza.' },
  { id: 'newsreader', name: 'Newsreader', category: 'Serif editorial', className: newsreader.className, note: 'Variable serif diseñada para lectura digital. Editorial moderno.' },
  { id: 'source-serif', name: 'Source Serif', category: 'Serif editorial', className: sourceSerif.className, note: 'Serif open-source de Adobe optimizado para pantalla.' },
  { id: 'lora', name: 'Lora', category: 'Serif editorial', className: lora.className, note: 'Serif contemporáneo balanceado. Una de las más legibles del catálogo.' },
]

const HEADLINE_PRE = 'Para definir qué'
const HEADLINE_EM = 'Carrera y Universidad'
const HEADLINE_POST = ' elegir.'
const SUBTITLE = 'El escenario real: opciones compatibles detalladas, características de cursada, costos y el estado actual de cada profesión.'
const BODY = 'Timon te muestra qué carreras tienen sentido con quién sos — y cómo es cada una en Argentina: universidades, costos y salidas laborales reales.'

function FontCard({ font }: { font: FontOption }) {
  return (
    <article className={`${font.className} relative bg-[var(--cream-elev)] border border-[var(--border-cream)] rounded-2xl p-10 sm:p-14`}>
      {/* Header */}
      <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-[var(--border-cream)] font-sans">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] mb-2">
            {font.category}
          </p>
          <h2 className="text-[1.625rem] font-semibold text-[var(--navy)]" style={{ letterSpacing: '-0.02em' }}>
            {font.name}
          </h2>
        </div>
        <p className="text-[13px] text-[var(--navy)]/70 max-w-[420px] text-right hidden sm:block">
          {font.note}
        </p>
      </div>

      {/* Headline sample */}
      <h1
        className="font-light text-[var(--navy)] mb-8"
        style={{
          fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.035em',
        }}
      >
        {HEADLINE_PRE}{' '}
        <span className="text-[var(--ocean)] font-normal">{HEADLINE_EM}</span>
        {HEADLINE_POST}
      </h1>

      {/* Subtitle sample */}
      <p
        className="text-[var(--navy)]/70 mb-8 max-w-[680px]"
        style={{
          fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
          lineHeight: 1.55,
        }}
      >
        {SUBTITLE}
      </p>

      {/* Body sample */}
      <p
        className="text-[var(--navy)]/85 mb-6 max-w-[680px]"
        style={{
          fontSize: '1rem',
          lineHeight: 1.65,
        }}
      >
        {BODY}
      </p>

      {/* Weight ladder */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 pt-6 border-t border-[var(--border-cream)]">
        <span className="font-light text-[18px] text-[var(--navy)]">Light 300</span>
        <span className="font-normal text-[18px] text-[var(--navy)]">Regular 400</span>
        <span className="font-medium text-[18px] text-[var(--navy)]">Medium 500</span>
        <span className="font-bold text-[18px] text-[var(--navy)]">Bold 700</span>
      </div>

      {/* CTA + Eyebrow sample */}
      <div className="mt-8 flex items-center gap-4">
        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] font-medium text-[14px]">
          Empezar el recorrido
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--hueso)]">
          Privado · sin límite de tiempo
        </span>
      </div>
    </article>
  )
}

export default function FontsPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] paper-grain">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] py-16 sm:py-24">
        {/* Page header */}
        <div className="max-w-[860px] mb-16 sm:mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] mb-5">
            Tipografías · prueba visual
          </p>
          <h1
            className="font-display font-light text-[var(--navy)] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
            }}
          >
            Elegí la tipografía que matchee con Timon.
          </h1>
          <p className="text-[1.0625rem] sm:text-[1.25rem] text-[var(--navy)]/70 leading-[1.55] max-w-[640px]">
            Cada tarjeta muestra el mismo título, subtítulo y body real de la landing, aplicados en la font. Decime el número o el nombre de la que querés que use.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-10 sm:gap-12 max-w-[1280px]">
          {FONTS.map((font, idx) => (
            <div key={font.id} className="relative">
              <span className="absolute -left-2 sm:-left-12 top-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <FontCard font={font} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
