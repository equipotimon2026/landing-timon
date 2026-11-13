import type { Metadata } from 'next'
import Image from 'next/image'
import { Isotipo } from '@/components/v2/Isotipo'
import { Pila } from './Pila'

/**
 * Exploración B · Producto tech (Apple iPhone, Framer, Linear en claro).
 * El informe como objeto: tres pantallas apiladas en 3D que siguen al mouse,
 * sombras realistas. Abajo, un bento de bloques grises con el producto.
 */
export const metadata: Metadata = { title: 'Timon · Exploración B', robots: { index: false } }

export default function ExploraB() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#0f1f36]" style={{ fontFamily: 'var(--font-jakarta), system-ui' }}>
      <header className="sticky top-0 z-30 border-b border-[#eef0f4] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-[1100px] items-center justify-between px-5 text-[13px]">
          <span className="inline-flex items-center gap-1.5 font-semibold"><Isotipo size={16} /> Timon</span>
          <nav className="flex items-center gap-6 text-[#45536b]">
            <span className="hidden sm:inline">El informe</span>
            <span className="hidden sm:inline">La red</span>
            <a href="#anotalo" className="rounded-full bg-[#1e5ba0] px-3.5 py-1.5 font-semibold text-white">Anotalo</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-5 pb-16 pt-14 text-center sm:pt-16">
          <p className="text-[17px] font-semibold text-[#1e5ba0]">Para madres y padres</p>
          <h1 className="mx-auto mt-4 max-w-[14ch] text-[clamp(3rem,6.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Que elija su camino conociendo el mundo.
          </h1>
          <p className="mx-auto mt-6 max-w-[40ch] text-[20px] text-[#45536b]">
            Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa.
          </p>
          <div className="mt-9 flex items-center justify-center gap-6">
            <a href="#anotalo" className="inline-flex h-12 items-center rounded-full bg-[#1e5ba0] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[#1b5390]">
              Quiero que mi hijo lo haga
            </a>
          </div>
          <div className="-mt-6 sm:-mt-16">
            <Pila />
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-24">
          <h2 className="max-w-[16ch] text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Un informe en tres actos.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            <div className="overflow-hidden rounded-[28px] bg-[#f5f6f8] p-8 md:col-span-4">
              <p className="text-[15px] font-semibold text-[#1e5ba0]">Acto 1</p>
              <p className="mt-1 text-[32px] font-semibold tracking-[-0.03em]">Quién es.</p>
              <div className="mt-8 translate-y-6 overflow-hidden rounded-[14px] shadow-[0_0_0_1px_rgba(15,31,54,.06),0_30px_60px_-30px_rgba(15,31,54,.35)]">
                <Image src="/producto/esencia-card.webp" alt="La esencia" width={1380} height={1110} sizes="700px" className="h-auto w-full" />
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[28px] bg-[#0f1f36] p-8 text-white md:col-span-2">
              <p className="text-[15px] font-semibold text-[#4f84c2]">Tiempo</p>
              <p>
                <span className="block text-[88px] font-semibold leading-none tracking-[-0.05em]">13</span>
                <span className="mt-2 block text-[20px] text-white/70">paradas de menos de 10 minutos</span>
              </p>
            </div>
            <div className="overflow-hidden rounded-[28px] bg-[#f5f6f8] p-8 md:col-span-3">
              <p className="text-[15px] font-semibold text-[#1e5ba0]">Acto 2</p>
              <p className="mt-1 text-[32px] font-semibold tracking-[-0.03em]">Sus caminos.</p>
              <div className="mt-8 translate-y-6 overflow-hidden rounded-[14px] shadow-[0_0_0_1px_rgba(15,31,54,.06),0_30px_60px_-30px_rgba(15,31,54,.35)]">
                <Image src="/producto/caminos-card.webp" alt="Los caminos" width={1620} height={1020} sizes="540px" className="h-auto w-full" />
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] bg-[#f5f6f8] p-8 md:col-span-3">
              <p className="text-[15px] font-semibold text-[#1e5ba0]">Acto 3</p>
              <p className="mt-1 text-[32px] font-semibold tracking-[-0.03em]">Dónde estudiarlos.</p>
              <div className="mt-8 translate-y-6 overflow-hidden rounded-[14px] shadow-[0_0_0_1px_rgba(15,31,54,.06),0_30px_60px_-30px_rgba(15,31,54,.35)]">
                <Image src="/producto/universidades.jpg" alt="Dónde estudiar" width={1100} height={721} sizes="540px" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
