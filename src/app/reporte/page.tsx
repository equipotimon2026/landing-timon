import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { AnnouncementBar, SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { ReportCover } from '@/components/acq/ReportCover'
import { ReporteForm } from '@/components/acq/ReporteForm'

export const metadata: Metadata = {
  title: 'Reporte gratis · Carreras nuevas por industria | Timon',
  description:
    'Recibí gratis el reporte de carreras nuevas por industria: qué se estudia hoy para los trabajos que están apareciendo.',
}

/**
 * Lead magnet, calcado de acquisition.com/roadmap: un titular con la promesa
 * y el tiempo, el formulario, dos líneas de refuerzo y la letra chica.
 * Uno solo y bien hecho (reunión 23/10/2026): el mismo CTA en landing,
 * Instagram, YouTube y TikTok.
 */
export default function ReportePage() {
  return (
    <div className="acq flex min-h-full flex-col bg-white">
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1 px-4 py-14 sm:px-6">
        <h1 className="mx-auto max-w-[820px] text-center text-[28px] font-bold leading-[1.2] sm:text-[40px]">
          Recibí gratis el Reporte de Carreras Nuevas por Industria… en menos de 30 segundos.
        </h1>

        <div className="mx-auto mt-12 grid max-w-[900px] items-center gap-10 md:grid-cols-[260px_1fr]">
          <ReportCover className="mx-auto w-[220px] md:w-full" />
          <ReporteForm />
        </div>

        <ul className="mx-auto mt-10 max-w-[520px] space-y-3 text-[15px] font-semibold sm:text-[17px]">
          <li className="flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-[var(--ocean)]" />
            Qué carreras nuevas aparecen en cada industria
          </li>
          <li className="flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-[var(--ocean)]" />
            Para alumnos, familias y colegios
          </li>
        </ul>

        <p className="mx-auto mt-10 max-w-[900px] text-[12px] leading-[1.45] text-[var(--hueso)]">
          Al dejar tus datos aceptás que Timon te escriba por mail con el reporte y con
          información sobre el programa. No compartimos ni vendemos tus datos. Podés darte de
          baja cuando quieras. Al continuar aceptás nuestros{' '}
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
