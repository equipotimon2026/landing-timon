import type { Metadata } from 'next'
import './home.css'
import { HomePrograma } from '@/components/home/HomePrograma'
import { COPY_BASE } from '@/lib/variantes'

/** La home. Sus textos están en src/lib/variantes.ts (COPY_BASE). */

export const metadata: Metadata = {
  title: COPY_BASE.metaTitulo,
  description: COPY_BASE.metaDescripcion,
  openGraph: {
    title: COPY_BASE.metaTitulo,
    description: '16 áreas de trabajo, 300 carreras y 50 universidades para que tu hijo o hija decida sabiendo qué elige.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function Home() {
  return <HomePrograma copy={COPY_BASE} />
}
