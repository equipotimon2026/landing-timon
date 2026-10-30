import { MUNDOS, TOTAL_CARRERAS } from '@/lib/mundos'
import { WheelMark } from '@/components/landing/Logo'

/**
 * Tapa del lead magnet: el mosaico de los 16 mundos arriba y el título abajo.
 * Ocupa el lugar de la imagen del "$100M Scaling Roadmap" de acquisition.com.
 * El texto escala con el ancho de la tapa (cqw) para que sirva chica y grande.
 */
export function MapaCover({ className = '' }: { className?: string }) {
  return (
    <div
      style={{ containerType: 'inline-size' }}
      className={`flex aspect-[3/4] flex-col overflow-hidden rounded-md bg-[var(--navy)] text-white shadow-[0_18px_40px_rgba(15,31,54,0.28)] ${className}`}
    >
      <div className="grid grid-cols-4 gap-px bg-[var(--navy)]">
        {MUNDOS.map((m) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={m.id} src={`/mapa/${m.id}.jpg`} alt="" className="aspect-[4/3] w-full object-cover opacity-85" />
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-between px-[9%] py-[7%]">
        <div className="flex items-center gap-[3cqw]">
          <WheelMark tone="cream" size={14} />
          <span className="text-[5.5cqw] font-bold uppercase tracking-[0.14em] text-[var(--ocean-light)]">
            Timon
          </span>
        </div>
        <div>
          <p className="text-[10.5cqw] font-extrabold uppercase leading-[1.02]">
            El mapa de los 16 mundos
          </p>
          <p className="mt-[2cqw] text-[6cqw] font-semibold leading-tight text-white/75">
            {TOTAL_CARRERAS} carreras, por dentro
          </p>
        </div>
      </div>
    </div>
  )
}
