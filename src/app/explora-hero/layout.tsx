import type { Metadata } from 'next'
import '../home.css'
import { HeaderExplora } from './HeaderExplora'

/**
 * Exploración de conceptos de hero y de la sección de la red (rama
 * explora-hero). Cada concepto vive en /explora-hero/<id> con la misma
 * cabecera y estilos de la home, para compararlos en igualdad de condiciones.
 */
export const metadata: Metadata = {
  title: 'Timon · exploración de hero',
  robots: { index: false, follow: false },
}

export default function ExploraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="home min-h-screen overflow-x-clip bg-white">
      <HeaderExplora />
      <main>{children}</main>
    </div>
  )
}
