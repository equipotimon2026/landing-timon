import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Crimson_Pro } from 'next/font/google'
import './globals.css'

// Las mismas tres fuentes que la app (canvas "Rediseño Timón estilo Duolingo"):
// DM Sans para todo, Crimson Pro itálica para las líneas de acento y JetBrains
// Mono para las micro-etiquetas. Los dos deploys tienen que verse iguales.
const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const serif = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Timon — El primer paso no es elegir',
  description:
    'El primer paso no es elegir. Es entenderte. 13 paradas cortas para saber quién sos antes de decidir qué estudiar — carreras, universidades argentinas y salidas laborales reales.',
  openGraph: {
    title: 'Timon — El primer paso no es elegir',
    description:
      'El primer paso no es elegir. Es entenderte. 13 paradas cortas para saber quién sos antes de decidir qué estudiar.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="font-sans min-h-full flex flex-col bg-[var(--cream)] text-[var(--navy)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
