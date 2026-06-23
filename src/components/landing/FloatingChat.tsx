'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { WheelMark } from './Logo'

type Step = 'idle' | 'open' | 'done'

export function FloatingChat() {
  const [step, setStep] = useState<Step>('idle')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const open = () => setStep('open')
  const close = () => setStep('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('done')
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">

      {/* Chat panel */}
      {(step === 'open' || step === 'done') && (
        <div
          className="bg-[var(--cream-elev)] border border-[var(--border-cream)] rounded-2xl overflow-hidden animate-fade-in-up w-[320px]"
          style={{ boxShadow: '0 16px 48px rgba(15,31,54,0.15)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-cream)] bg-[var(--cream)]">
            <div className="flex items-center gap-2.5">
              <WheelMark tone="ocean" size={22} spin />
              <div>
                <p className="font-sans font-semibold text-[var(--navy)] text-[13px] leading-tight">Timon</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--hueso)] mt-0.5">
                  Te respondemos a la brevedad
                </p>
              </div>
            </div>
            <button
              onClick={close}
              aria-label="Cerrar"
              className="text-[var(--hueso)] hover:text-[var(--navy)] transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="flex justify-start">
              <div className="bg-[var(--cream)] border border-[var(--border-cream)] rounded-2xl rounded-tl-sm px-3 py-2.5 max-w-[88%]">
                <p className="text-[var(--navy)] text-[13px] leading-[1.5]">
                  {step === 'done'
                    ? `Recibido. Te escribimos a ${email}.`
                    : '¿Tenés alguna pregunta? Escribila y te respondemos a la brevedad.'}
                </p>
              </div>
            </div>

            {step === 'open' && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-1">
                <textarea
                  rows={3}
                  required
                  placeholder="Tu pregunta…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-[var(--cream)] border border-[var(--border-cream)] focus:border-[var(--ocean)] text-[var(--navy)] text-[13px] rounded-xl px-3 py-2.5 outline-none transition-colors resize-none placeholder:text-[var(--hueso)]"
                />
                <input
                  type="email"
                  required
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[var(--cream)] border border-[var(--border-cream)] focus:border-[var(--ocean)] text-[var(--navy)] text-[13px] rounded-xl px-3 py-2.5 outline-none transition-colors placeholder:text-[var(--hueso)]"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] font-medium text-[13px] hover:bg-[var(--ocean-deep)] transition-all cursor-pointer"
                >
                  Enviar
                  <Send size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Trigger — burbuja siempre visible + timón girando */}
      <div className="flex items-end gap-3">
        {step !== 'open' && step !== 'done' && (
          <button
            onClick={open}
            className="relative bg-[var(--cream-elev)] border border-[var(--border-cream)] rounded-2xl rounded-br-sm px-4 py-3 cursor-pointer text-left animate-float"
            style={{ boxShadow: '0 8px 28px rgba(15,31,54,0.14)', maxWidth: 220 }}
          >
            <p className="text-[var(--navy)] text-[13px] font-medium leading-[1.45]">
              ¿Tenés alguna pregunta?
            </p>
            <span
              className="absolute -bottom-[7px] right-5 w-3 h-3 rotate-45"
              style={{
                background: 'var(--cream-elev)',
                borderRight: '1px solid var(--border-cream)',
                borderBottom: '1px solid var(--border-cream)',
              }}
            />
          </button>
        )}

        <div className="relative shrink-0">
          {step === 'idle' && (
            <span className="absolute inset-0 rounded-full bg-[var(--ocean)] chat-ring-pulse pointer-events-none" />
          )}
          <button
            onClick={() => step === 'open' ? close() : open()}
            aria-label="Chat con Timon"
            className="relative w-16 h-16 rounded-full bg-[var(--ocean)] flex items-center justify-center hover:bg-[var(--ocean-deep)] transition-colors cursor-pointer"
            style={{ boxShadow: '0 8px 32px rgba(30,91,160,0.42)' }}
          >
            <WheelMark tone="cream" size={32} spin />
          </button>
        </div>
      </div>

    </div>
  )
}
