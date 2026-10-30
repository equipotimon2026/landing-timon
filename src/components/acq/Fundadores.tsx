import { FUNDADORES } from '@/lib/programa'

/**
 * Los tres lugares para las fotos de Facu, Feli y Nico. Mientras no haya foto
 * (`foto: null` en lib/programa) se ve un recuadro con la inicial.
 */
export function FundadorFoto({
  nombre,
  rol,
  foto,
  tone = 'light',
  className = '',
}: (typeof FUNDADORES)[number] & { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <figure className={className}>
      <div
        className={`flex aspect-[4/5] items-center justify-center overflow-hidden ${
          tone === 'light'
            ? 'border-[5px] border-[var(--navy)] bg-[var(--ocean-wash)]'
            : 'rounded-xl bg-gradient-to-b from-[#1E2F4D] to-[#1D4ED8]'
        }`}
      >
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto} alt={nombre} className="h-full w-full object-cover" />
        ) : (
          <span
            className={`text-[56px] font-extrabold ${tone === 'light' ? 'text-[var(--ocean)]' : 'text-white/80'}`}
            aria-label={`Foto de ${nombre} (pendiente)`}
          >
            {nombre[0]}
          </span>
        )}
      </div>
      <figcaption className="mt-3 text-center">
        <span className={`block text-[15px] font-bold ${tone === 'light' ? '' : 'text-white'}`}>{nombre}</span>
        <span className={`block text-[12px] ${tone === 'light' ? 'text-[var(--hueso)]' : 'text-white/60'}`}>
          {rol}
        </span>
      </figcaption>
    </figure>
  )
}

export function FundadoresFotos({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${className}`}>
      {FUNDADORES.map((f) => (
        <FundadorFoto key={f.nombre} {...f} tone={tone} />
      ))}
    </div>
  )
}
