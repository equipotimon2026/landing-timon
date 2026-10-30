import { WheelMark } from '@/components/landing/Logo'

/**
 * Tapa del lead magnet, dibujada en CSS hasta que exista el PDF real. Ocupa el
 * lugar de la imagen del "$100M Scaling Roadmap" en acquisition.com.
 */
export function ReportCover({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-md bg-[var(--navy)] p-5 text-white shadow-[0_18px_40px_rgba(15,31,54,0.28)] ${className}`}
    >
      <div className="absolute -right-10 -top-10 opacity-15">
        <WheelMark tone="terra" size={160} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--terra)]">
        Reporte gratis · Timon
      </p>
      <div>
        <p className="text-[22px] font-extrabold uppercase leading-[1.05]">
          Carreras
          <br />
          nuevas
        </p>
        <p className="mt-1 text-[13px] font-semibold uppercase leading-tight text-white/75">
          por industria
        </p>
      </div>
      <div className="h-1 w-10 rounded-full bg-[var(--terra)]" />
    </div>
  )
}
