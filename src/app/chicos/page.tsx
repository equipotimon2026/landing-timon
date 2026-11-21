import type { Metadata } from 'next'
import '../home.css'
import { HomePrograma } from '@/components/home/HomePrograma'
import { COPY_CHICOS } from '@/lib/variantes'

/**
 * /chicos — la home contada para el chico.
 *
 * Es la misma página y los mismos componentes que /: lo único que cambia son
 * los textos (COPY_CHICOS, en src/lib/variantes.ts) y el botón, que lo manda a
 * crear su cuenta en la app y no al formulario de padres. Se llega desde el
 * circulito del hero de la home (components/home/EntradaChicos.tsx).
 */

export const metadata: Metadata = {
  title: COPY_CHICOS.metaTitulo,
  description: COPY_CHICOS.metaDescripcion,
  openGraph: {
    title: COPY_CHICOS.metaTitulo,
    description: COPY_CHICOS.metaDescripcion,
    locale: 'es_AR',
    type: 'website',
  },
}

export default function Chicos() {
  return <HomePrograma copy={COPY_CHICOS} publico="chicos" />
}
