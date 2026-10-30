import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { AnnouncementBar, SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { MapaCover } from '@/components/acq/MapaCover'
import { MapaForm } from '@/components/acq/MapaForm'
import { TOTAL_CARRERAS } from '@/lib/mundos'

export const metadata: Metadata = {
  title: 'El Mapa de los 16 Mundos, gratis | Timon',
  description: `Las ${TOTAL_CARRERAS} carreras del catálogo de Timon en 16 mundos: cómo es un día de trabajo, dónde se trabaja, lo que nadie te cuenta y las preguntas para saber cuál es el tuyo.`,
}

/**
 * Lead magnet, calcado de acquisition.com/roadmap: titular con la promesa y el
 * tiempo, el formulario, dos líneas de refuerzo y la letra chica.
 *
 * Reemplaza al "Reporte de carreras nuevas por industria" (pedido de Nico,
 * 26/10/2026). Sigue $100M Leads: resuelve un problema chico ("no sé qué
 * carreras existen ni cómo son por dentro") y deja a la vista el siguiente
 * ("¿cuál es la mía?"), que es lo que resuelve el programa.
 */
export default function MapaPage() {
  return (
    <div className="acq flex min-h-full flex-col bg-white">
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1 px-4 py-14 sm:px-6">
        <h1 className="mx-auto max-w-[860px] text-center text-[27px] font-bold leading-[1.2] sm:text-[40px]">
          Llevate gratis El Mapa de los 16 Mundos: las {TOTAL_CARRERAS} carreras, por dentro… en
          10 minutos.
        </h1>

        <div className="mx-auto mt-12 grid max-w-[900px] items-center gap-10 md:grid-cols-[280px_1fr]">
          <MapaCover className="mx-auto w-[230px] md:w-full" />
          <MapaForm />
        </div>

        <ul className="mx-auto mt-10 max-w-[560px] space-y-3 text-[15px] font-semibold sm:text-[17px]">
          <li className="flex items-center justify-center gap-2 text-center">
            <Sparkles size={16} className="shrink-0 text-[var(--ocean)]" />
            Cómo es un día de trabajo en cada mundo
          </li>
          <li className="flex items-center justify-center gap-2 text-center">
            <Sparkles size={16} className="shrink-0 text-[var(--ocean)]" />
            Las preguntas para saber cuál es el tuyo
          </li>
        </ul>

        <p className="mx-auto mt-10 max-w-[900px] text-[12px] leading-[1.45] text-[var(--hueso)]">
          Al dejar tus datos aceptás que Timon te escriba por mail con información sobre el
          programa. No compartimos ni vendemos tus datos. Podés darte de baja cuando quieras. Al
          continuar aceptás nuestros{' '}
          <a href="/terminos" className="underline">
            términos y condiciones
          </a>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  )
}
