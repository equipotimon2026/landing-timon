import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { AnnouncementBar, SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { TestIntereses } from '@/components/acq/TestIntereses'

export const metadata: Metadata = {
  title: 'Test de Intereses gratis: tus mundos de carreras | Timon',
  description:
    'En menos de 2 minutos: en qué áreas están tus intereses y tus fuertes, y qué mundos de carreras van con vos.',
}

/**
 * Lead magnet, calcado de acquisition.com/roadmap ("Get your free personalized
 * roadmap… in under 30 seconds"): titular con promesa y tiempo, el cuestionario,
 * dos líneas de refuerzo y la letra chica. Reemplaza al Mapa de los 16 Mundos
 * como lead magnet (el mapa pasa a ser un bono del programa).
 */
export default function TestPage() {
  return (
    <div className="acq flex min-h-full flex-col bg-[var(--cream)]">
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1 px-4 py-12 sm:px-6 sm:py-14">
        <h1 className="mx-auto max-w-[860px] text-center text-[27px] font-bold leading-[1.2] sm:text-[40px]">
          Descubrí gratis en qué áreas están tus intereses y tus fuertes… en menos de 2 minutos.
        </h1>

        <div className="mx-auto mt-10 max-w-[620px]">
          <TestIntereses />
        </div>

        <ul className="mx-auto mt-10 max-w-[560px] space-y-3 text-[15px] font-semibold sm:text-[17px]">
          <li className="flex items-center justify-center gap-2 text-center">
            <Sparkles size={16} className="shrink-0 text-[var(--ocean)]" />
            Tus 3 fuertes, de 6 posibles
          </li>
          <li className="flex items-center justify-center gap-2 text-center">
            <Sparkles size={16} className="shrink-0 text-[var(--ocean)]" />
            Los mundos de carreras que van con vos
          </li>
        </ul>

        <p className="mx-auto mt-10 max-w-[900px] text-[12px] leading-[1.45] text-[var(--hueso)]">
          Al dejar tus datos aceptás que Timon te escriba por mail con tu resultado e información sobre el
          programa. No compartimos ni vendemos tus datos. Podés darte de baja cuando quieras.
          Al continuar aceptás nuestros{' '}
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
