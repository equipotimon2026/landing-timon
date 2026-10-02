'use client'

import { WheelMark } from './Logo'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { FREE_STOPS } from '@/lib/pricing'

const APP_URL = 'https://app.timonear.com'

/** El cierre: Timon y una sola llamada, a crear la cuenta. */
export function CierreSection() {
  const title = useInView<HTMLDivElement>()

  return (
    <section className="timon-wash relative overflow-hidden border-t border-[var(--border-cream)]">
      <div className="shell prose-shell flex flex-col items-center py-20 text-center sm:py-28">
        <span aria-hidden className="timon-bob">
          <WheelMark tone="ocean" size={150} />
        </span>
        <p className="mono-label mt-6">Cierre</p>
        <h2
          ref={title.ref}
          className={`reveal ${title.inView ? 'is-visible' : ''} mt-3 font-display font-extrabold tracking-[-0.04em] text-[var(--navy)]`}
          style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', lineHeight: 1.02 }}
        >
          El primer paso no es elegir.
          <br />
          <span className="serif-accent text-[var(--ocean)]">Es entenderte.</span>
        </h2>
        <p className="mt-4 max-w-[36rem] text-[16px] leading-relaxed text-[var(--hueso)] sm:text-[17px]">
          Las primeras {FREE_STOPS} paradas son gratis y solo necesitás tu mail. Cuando
          quieras seguir, el resto del recorrido te espera donde lo dejaste.
        </p>
        <a
          href={`${APP_URL}/entrar?modo=crear`}
          className="btn-timon btn-timon--primary group mt-8 h-14 px-8 text-[16px]"
        >
          Empezar mi recorrido
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="mono-label mt-5">Privado · sin límite de tiempo · sin suscripción</p>
      </div>
    </section>
  )
}
