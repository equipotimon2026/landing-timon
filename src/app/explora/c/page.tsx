import type { Metadata } from 'next'
import Image from 'next/image'
import { Isotipo } from '@/components/v2/Isotipo'
import { Horizonte } from './Horizonte'

/**
 * Exploración C · Ilustrado y cálido (Headspace, Duolingo for Schools,
 * Stripe Press). Arte propio con los colores de la marca en bloques grandes,
 * Jakarta extra bold, movimiento juguetón pero serio.
 */
export const metadata: Metadata = { title: 'Timon · Exploración C', robots: { index: false } }

const ACTOS = [
  { n: 'Quién es', bg: '#c97f5e', img: '/producto/esencia-card.webp', w: 1380, h: 1110 },
  { n: 'Sus caminos', bg: '#1e5ba0', img: '/producto/caminos-card.webp', w: 1620, h: 1020 },
  { n: 'Dónde estudiar', bg: '#0f1f36', img: '/producto/universidades.jpg', w: 1100, h: 721 },
]

export default function ExploraC() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0f1f36]" style={{ fontFamily: 'var(--font-jakarta), system-ui' }}>
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-6 sm:px-8">
        <span className="inline-flex items-center gap-2 text-[22px] font-extrabold tracking-[-0.03em] text-[#1e5ba0]">
          <Isotipo size={26} /> Timon
        </span>
        <a href="#anotalo" className="rounded-full bg-[#0f1f36] px-5 py-2.5 text-[15px] font-bold text-white">Anotalo</a>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:pt-10">
          <div>
            <p className="inline-block rounded-full bg-[#fbeee6] px-4 py-1.5 text-[14px] font-bold text-[#a55f40]">Para madres y padres</p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">
              Que elija su camino conociendo el mundo.
            </h1>
            <p className="mt-6 max-w-[32ch] text-[20px] font-medium leading-[1.5] text-[#45536b]">
              Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa.
            </p>
            <a href="#anotalo" className="mt-9 inline-flex h-14 items-center rounded-full bg-[#1e5ba0] px-8 text-[17px] font-bold text-white shadow-[0_6px_0_#16467c] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#16467c]">
              Quiero que mi hijo lo haga
            </a>
          </div>
          <Horizonte />
        </section>

        <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
          <h2 className="max-w-[14ch] text-[clamp(2.6rem,5.4vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
            Un informe en tres actos.
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {ACTOS.map((a, i) => (
              <li key={a.n} className="relative flex h-[440px] flex-col overflow-hidden rounded-[32px] p-8 text-white" style={{ background: a.bg }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-[18px] font-extrabold">{i + 1}</span>
                <p className="mt-5 text-[34px] font-extrabold leading-none tracking-[-0.04em]">{a.n}</p>
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 left-8 right-[-20%] rotate-[-4deg] overflow-hidden rounded-[16px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                  <Image src={a.img} alt="" width={a.w} height={a.h} sizes="420px" className="h-auto w-full" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
