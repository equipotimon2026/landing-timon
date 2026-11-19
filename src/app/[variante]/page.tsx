import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../home.css'
import { HomePrograma } from '@/components/home/HomePrograma'
import { NOMBRES_VARIANTES, copyDe, esVariante } from '@/lib/variantes'

/**
 * Variantes de la home, una por video de Instagram: timonear.com/video1,
 * timonear.com/video2...
 * Los textos se editan en src/lib/variantes.ts.
 */

type Props = { params: Promise<{ variante: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return NOMBRES_VARIANTES.map((variante) => ({ variante }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variante } = await params
  const copy = copyDe(variante)
  return {
    title: copy.metaTitulo,
    description: copy.metaDescripcion,
    // Es la misma home con otro copy: que Google indexe solo timonear.com.
    robots: { index: false, follow: true },
    openGraph: { title: copy.metaTitulo, description: copy.metaDescripcion, locale: 'es_AR', type: 'website' },
  }
}

export default async function Variante({ params }: Props) {
  const { variante } = await params
  if (!esVariante(variante)) notFound()
  return <HomePrograma copy={copyDe(variante)} origen={variante} />
}
