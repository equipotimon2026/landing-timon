import './red-b.css'
import { RedSistema } from './RedSistema'

export default function RedB() {
  return (
    <>
      <div className="flex h-[60vh] items-end justify-center pb-10 text-[15px] text-[var(--tenue)]">↓ la red</div>
      <section id="red" className="rb-fondo overflow-x-clip pb-24 pt-20 text-white sm:pb-32 sm:pt-28">
        <div className="px-5 text-center">
          <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.3rem,5.2vw,4rem)]">
            Del aula al mundo real, <strong className="text-[var(--crema)]">con alguien que abre la puerta</strong>.
          </h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-[18px] text-white/65">
            Timon le arma a tu hija un recorrido con gente, facultades, empresas y fechas reales. Vos ves cómo va.
          </p>
        </div>
        <div className="mt-16 sm:mt-20">
          <RedSistema />
        </div>
      </section>
    </>
  )
}
