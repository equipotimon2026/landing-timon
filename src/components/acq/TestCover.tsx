/**
 * Tapa del lead magnet: una vista chica de cómo se ve el resultado del test
 * (tus fuertes en barras). Escala con su ancho (cqw).
 */
const BARRAS = [
  { label: 'Investigar', v: 89 },
  { label: 'Ayudar', v: 78 },
  { label: 'Crear', v: 56 },
  { label: 'Organizar', v: 33 },
]

export function TestCover({ className = '' }: { className?: string }) {
  return (
    <div
      style={{ containerType: 'inline-size' }}
      className={`flex aspect-[3/4] flex-col justify-between rounded-md bg-[var(--navy)] p-[9%] text-white shadow-[0_18px_40px_rgba(15,31,54,0.28)] ${className}`}
    >
      <p className="text-[6cqw] font-bold uppercase tracking-[0.12em] text-[var(--ocean-light)]">
        Test de intereses
      </p>
      <div>
        <p className="text-[11cqw] font-extrabold uppercase leading-[1.02]">Tus fuertes</p>
        <p className="mt-[1.5cqw] text-[6cqw] font-semibold text-white/75">Salud · Exactas · Educación</p>
      </div>
      <div className="space-y-[3cqw]">
        {BARRAS.map((b) => (
          <div key={b.label}>
            <p className="text-[5cqw] text-white/70">{b.label}</p>
            <div className="mt-[1cqw] h-[2.6cqw] rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--ocean)]"
                style={{ width: `${b.v}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
