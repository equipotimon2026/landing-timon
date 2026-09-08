import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const jakartaDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

// Serif itálica de acento: las líneas emotivas del deck ("Tu email decide
// el resto.", las citas de Timón). Solo se usa en itálica.
const serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Timon — Claridad antes de elegir',
  description:
    'El primer paso no es elegir. Es entenderte. Un recorrido al ritmo que vos vayas — carreras, universidades argentinas y salidas laborales reales.',
  openGraph: {
    title: 'Timon — Claridad antes de elegir',
    description:
      'El primer paso no es elegir. Es entenderte. Un recorrido al ritmo que vos vayas.',
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
      className={`${jakarta.variable} ${jakartaDisplay.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
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
