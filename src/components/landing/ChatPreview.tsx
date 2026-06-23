'use client'

import { WheelMark } from './Logo'

export function ChatPreview() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Soft ocean halo */}
      <div
        className="absolute -inset-8 rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30, 91, 160, 0.18) 0%, transparent 65%)' }}
      />

      <div
        className="relative rounded-[28px] bg-[var(--cream-elev)] border border-[var(--border-cream)] overflow-hidden"
        style={{ boxShadow: '0 24px 60px rgba(15, 31, 54, 0.12)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-cream)]">
          <WheelMark tone="ocean" size={28} />
          <div className="flex-1">
            <p className="font-sans font-semibold text-[var(--navy)] text-[14px] leading-tight">Timon</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--hueso)] mt-1">
              Recorrido pausable en cualquier momento
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="px-5 py-6 flex flex-col gap-3 min-h-[320px] bg-[var(--cream)]">
          <div className="flex justify-start animate-fade-in-up">
            <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-md bg-[var(--cream-elev)] border border-[var(--border-cream)] text-[var(--navy)] text-[14px] leading-[1.55]">
              Imaginate que tenés que tomar una decisión difícil en grupo. ¿Te da más seguridad basarte en números fríos o hablar con las personas para entender el contexto?
            </div>
          </div>

          <div className="flex justify-end animate-fade-in-up animate-delay-200">
            <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tr-md bg-[var(--ocean)] text-[var(--cream-elev)] text-[14px] leading-[1.55]">
              Números fríos, 100%. La gente te dice cualquier cosa, el dato no miente.
            </div>
          </div>

          <div className="flex justify-start animate-fade-in-up animate-delay-300">
            <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-md bg-[var(--cream-elev)] border border-[var(--border-cream)] text-[var(--navy)] text-[14px] leading-[1.55]">
              Anotado. Lo agrego a tu <span className="text-[var(--ocean)] font-medium">modo de resolución</span>.
            </div>
          </div>
        </div>

        {/* Footer mono caption */}
        <div className="px-5 py-3 border-t border-[var(--border-cream)] bg-[var(--cream-elev)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--hueso)] text-center">
            Vos marcás el ritmo · Vos elegís qué contás
          </p>
        </div>
      </div>
    </div>
  )
}
