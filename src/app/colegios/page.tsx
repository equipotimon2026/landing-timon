'use client'

import { useRouter } from 'next/navigation'
import { AnnouncementBar, SiteFooter, SiteNav } from '@/components/acq/SiteChrome'
import { ColegiosSection } from '@/components/landing/ColegiosSection'

/**
 * "Para colegios" deja de ser un estado de la home y pasa a ser una ruta, con
 * la navbar y el footer nuevos. El contenido de la sección no cambia.
 */
export default function ColegiosPage() {
  const router = useRouter()
  return (
    <div className="flex min-h-full flex-col bg-[var(--cream)]">
      <div className="acq">
        <AnnouncementBar />
        <SiteNav />
      </div>
      <main className="flex-1">
        <ColegiosSection onBack={() => router.push('/')} />
      </main>
      <div className="acq">
        <SiteFooter />
      </div>
    </div>
  )
}
