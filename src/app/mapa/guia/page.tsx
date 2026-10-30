import type { Metadata } from 'next'
import { SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { MapaGuia } from '@/components/acq/MapaGuia'

export const metadata: Metadata = {
  title: 'Tu Mapa de los 16 Mundos | Timon',
  robots: { index: false },
}

/**
 * El mapa en sí, al que llega la persona después de dejar sus datos en /mapa.
 * No está cerrado con login a propósito: Hormozi recomienda regalar lo mejor;
 * el formulario es para tener el contacto, no para esconder el contenido.
 */
export default async function MapaGuiaPage({
  searchParams,
}: {
  searchParams: Promise<{ nombre?: string }>
}) {
  const { nombre = '' } = await searchParams
  return (
    <div className="acq flex min-h-full flex-col bg-white">
      <div className="print:hidden">
        <SiteNav />
      </div>
      <MapaGuia nombre={nombre.trim().slice(0, 40)} />
      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  )
}
