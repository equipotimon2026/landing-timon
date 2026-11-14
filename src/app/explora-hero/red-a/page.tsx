import './red-a.css'
import { RedBaldosas } from './RedBaldosas'

export default function RedA() {
  return (
    <>
      <div className="flex h-[60vh] items-end justify-center pb-10 text-[15px] text-[var(--tenue)]">↓ la red</div>
      <section id="red" className="overflow-x-clip bg-white pb-24 pt-10 sm:pb-32">
        <div className="px-5 text-center">
          <h2 className="display mx-auto max-w-[17ch] text-[clamp(2.3rem,5.2vw,4rem)] text-[var(--navy)]">
            Timon le presenta a tu hijo <strong>a quienes ya viven de eso</strong>.
          </h2>
          <p className="mx-auto mt-5 max-w-[42ch] text-[18px] text-[var(--texto2)]">
            Gente que trabaja, facultades que abren la puerta, empresas y fechas para verlo en persona.
          </p>
        </div>
        <div className="mt-14 sm:mt-20">
          <RedBaldosas />
        </div>
      </section>
    </>
  )
}
