'use client'

import { Logo } from './Logo'

export function ReportPreview() {
  const careers = [
    { name: 'Negocios Digitales', match: 94 },
    { name: 'Ingeniería Informática', match: 88 },
    { name: 'Data Analytics', match: 81 },
  ]

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="absolute -inset-8 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30, 91, 160, 0.16) 0%, transparent 65%)' }}
      />

      <div
        className="relative rounded-[28px] bg-[var(--cream-elev)] border border-[var(--border-cream)] overflow-hidden"
        style={{ boxShadow: '0 24px 60px rgba(15, 31, 54, 0.12)' }}
      >
        {/* Header — mimics the bento "Informe descargable" card */}
        <div className="px-6 pt-6 pb-5 border-b border-[var(--border-cream)] flex items-start justify-between gap-4">
          <Logo tone="navy" size={22} />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--hueso)] mt-1">
            Tu mapa · Mayo 2026
          </span>
        </div>

        {/* Title */}
        <div className="px-6 pt-5 pb-4 bg-[var(--cream)]">
          <p
            className="font-display text-[var(--navy)] leading-[1.1]"
            style={{
              fontWeight: 400,
              fontSize: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Tu perfil <span className="text-[var(--ocean)] font-medium">personal</span><br />
            + 5 carreras compatibles.
          </p>
        </div>

        {/* Career rows */}
        <div className="px-6 py-5 flex flex-col gap-4 bg-[var(--cream)]">
          {careers.map((c, idx) => (
            <div key={c.name} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[var(--navy)] text-[15px] font-medium" style={{ letterSpacing: '-0.01em' }}>
                  {c.name}
                </span>
                <span className="font-mono text-[12px] text-[var(--ocean)] font-medium">{c.match}%</span>
              </div>
              <div className="h-[3px] rounded-full bg-[var(--border-cream)] overflow-hidden">
                <div
                  className="h-full bg-[var(--ocean)] rounded-full transition-all"
                  style={{ width: `${c.match}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mini stats footer */}
        <div className="grid grid-cols-3 border-t border-[var(--border-cream)] bg-[var(--cream-elev)]">
          <div className="px-4 py-4 border-r border-[var(--border-cream)]">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--hueso)] mb-1">Universidades</p>
            <p className="font-display text-[var(--navy)] text-[1.125rem] font-medium" style={{ letterSpacing: '-0.02em' }}>120+</p>
          </div>
          <div className="px-4 py-4 border-r border-[var(--border-cream)]">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--hueso)] mb-1">Provincias</p>
            <p className="font-display text-[var(--navy)] text-[1.125rem] font-medium" style={{ letterSpacing: '-0.02em' }}>24</p>
          </div>
          <div className="px-4 py-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--hueso)] mb-1">Carreras</p>
            <p className="font-display text-[var(--navy)] text-[1.125rem] font-medium" style={{ letterSpacing: '-0.02em' }}>847</p>
          </div>
        </div>

        {/* Mono footer */}
        <div className="px-6 py-3 border-t border-[var(--border-cream)]">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--hueso)] text-center">
            Recorrido completado · 4 días
          </p>
        </div>
      </div>
    </div>
  )
}
