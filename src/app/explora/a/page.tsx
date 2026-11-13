import type { Metadata } from 'next'
import Image from 'next/image'
import { Isotipo } from '@/components/v2/Isotipo'

/**
 * Exploración A · Editorial de lujo (Aesop, Apple Vision Pro, Kinfolk).
 * Serif enorme, mucho aire, casi sin elementos: la tipografía es el visual.
 * El producto aparece una sola vez, chico y con epígrafe, como una figura
 * de revista. Solo hero + el informe, para elegir dirección.
 */
export const metadata: Metadata = { title: 'Timon · Exploración A', robots: { index: false } }

const serif = { fontFamily: 'var(--font-serif), Georgia, serif' }

export default function ExploraA() {
  return (
    <div className="min-h-screen bg-white text-[#0f1f36]" style={{ fontFamily: 'var(--font-jakarta), system-ui' }}>
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-7 sm:px-12">
        <span className="inline-flex items-center gap-2 text-[17px] font-medium tracking-[-0.01em]">
          <Isotipo size={20} /> Timon
        </span>
        <nav className="flex items-center gap-8 text-[14px] text-[#45536b]">
          <span className="hidden sm:inline">El informe</span>
          <span className="hidden sm:inline">La red</span>
          <a href="#anotalo" className="border-b border-[#0f1f36] pb-0.5 text-[#0f1f36]">Anotalo</a>
        </nav>
      </header>

      <main>
        {/* Hero: la tipografía es el visual */}
        <section className="mx-auto max-w-[1360px] px-6 pb-24 pt-20 sm:px-12 sm:pt-32 lg:pb-40">
          <p className="text-[14px] text-[#8591a6]">Para madres y padres</p>
          <h1
            className="mt-10 text-[clamp(3.6rem,11.5vw,11.5rem)] font-normal leading-[0.92] tracking-[-0.035em]"
            style={serif}
          >
            Que elija su camino
            <br />
            conociendo el mundo.
          </h1>
          <div className="mt-16 grid gap-10 border-t border-[#0f1f36] pt-8 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-24">
            <p className="max-w-[34ch] text-[19px] leading-[1.55] text-[#45536b]">
              Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa.
            </p>
            <a
              href="#anotalo"
              className="inline-flex h-14 items-center justify-center bg-[#0f1f36] px-9 text-[15px] tracking-[0.01em] text-white transition-colors hover:bg-[#1e5ba0]"
            >
              Quiero que mi hijo lo haga
            </a>
          </div>
        </section>

        {/* El informe, como una nota de revista */}
        <section className="bg-[#fafaf8]">
          <div className="mx-auto max-w-[1360px] px-6 py-28 sm:px-12 lg:py-44">
            <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
              <div>
                <h2 className="text-[clamp(2.8rem,6vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.03em]" style={serif}>
                  Un informe en tres actos.
                </h2>
                <ol className="mt-16 space-y-10">
                  {[
                    ['I', 'Quién es.'],
                    ['II', 'Sus caminos.'],
                    ['III', 'Dónde estudiarlos.'],
                  ].map(([n, t]) => (
                    <li key={n} className="grid grid-cols-[64px_1fr] items-baseline border-t border-[#d9dde4] pt-6">
                      <span className="text-[22px] italic text-[#8591a6]" style={serif}>{n}</span>
                      <span className="text-[30px] leading-tight" style={serif}>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <figure className="self-end">
                <div className="overflow-hidden bg-white shadow-[0_1px_0_#e8ebf0,0_40px_80px_-50px_rgba(15,31,54,0.35)]">
                  <Image
                    src="/producto/esencia-card.webp"
                    alt="La esencia del perfil, en el informe"
                    width={1380}
                    height={1110}
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-5 text-[14px] italic text-[#8591a6]" style={serif}>
                  Fig. 1. La esencia, primera página del informe. Datos de ejemplo.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
