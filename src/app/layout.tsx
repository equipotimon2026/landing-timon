import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Crimson_Pro, Poppins, Homemade_Apple } from 'next/font/google'
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

// La landing y /programa copian la tipografía de acquisition.com (reunión con
// Feli del 23/10/2026): Poppins para todo y Homemade Apple para la firma de la
// carta. DM Sans queda para las vistas viejas (colegios, términos).
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const firma = Homemade_Apple({
  subsets: ['latin'],
  variable: '--font-firma',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Timon — ¿Ya sabés qué vas a estudiar?',
  description:
    'Saber qué estudiar en 2 semanas, desde tu casa. 13 paradas cortas para entenderte y un informe con tus carreras, dónde estudiarlas y de qué vas a trabajar.',
  openGraph: {
    title: 'Timon — ¿Ya sabés qué vas a estudiar?',
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
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${poppins.variable} ${firma.variable} h-full antialiased`}
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
