import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Las fuentes viven en src/fonts (subset latin, de Fontsource; licencia OFL).
// Con next/font/google el build bajaba cada familia de Google Fonts, y esa
// descarga fallaba de forma intermitente en Vercel (deploy de main, 30/10/2026).

// Las mismas tres fuentes que la app: DM Sans para todo, Crimson Pro itálica
// para las líneas de acento y JetBrains Mono para las micro-etiquetas.
const sans = localFont({
  src: '../fonts/dm-sans-latin-wght-normal.woff2',
  variable: '--font-sans',
  weight: '100 1000',
  display: 'swap',
})

const serif = localFont({
  src: [
    { path: '../fonts/crimson-pro-latin-wght-normal.woff2', weight: '200 900', style: 'normal' },
    { path: '../fonts/crimson-pro-latin-wght-italic.woff2', weight: '200 900', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
})

const mono = localFont({
  src: '../fonts/jetbrains-mono-latin-wght-normal.woff2',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap',
})

// /programa, /test y /mapa copian la tipografía de acquisition.com: Poppins.
const poppins = localFont({
  src: [
    { path: '../fonts/poppins-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/poppins-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/poppins-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/poppins-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/poppins-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
})

// Marca de Timon (presentación timon_presentacion_v2_1): Plus Jakarta Sans para
// todo y Space Mono en mayúsculas espaciadas para las etiquetas. La usa la home
// (clase `.marca` en globals.css).
const jakarta = localFont({
  src: '../fonts/plus-jakarta-sans-latin-wght-normal.woff2',
  variable: '--font-jakarta',
  weight: '200 800',
  display: 'swap',
})

const spaceMono = localFont({
  src: [
    { path: '../fonts/space-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/space-mono-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-spacemono',
  display: 'swap',
})

// Las notas a mano de la home (flechas, mapa del hero): Kalam.
const mano = localFont({
  src: [
    { path: '../fonts/kalam-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/kalam-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mano',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Timon — ¿Ya sabés qué vas a estudiar?',
  description:
    'Sabé qué carreras van con vos, dónde estudiarlas y de qué vas a trabajar. Un recorrido que hacés desde tu casa, a tu ritmo. Empezás gratis.',
  openGraph: {
    title: 'Timon — ¿Ya sabés qué vas a estudiar?',
    description:
      'Tu perfil, las 6 carreras que más van con vos y dónde estudiarlas. Empezás gratis y lo hacés a tu ritmo.',
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
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${poppins.variable} ${jakarta.variable} ${spaceMono.variable} ${mano.variable} h-full antialiased`}
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
