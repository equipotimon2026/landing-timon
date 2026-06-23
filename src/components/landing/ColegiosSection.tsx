'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

type Props = { onBack: () => void }

export function ColegiosSection({ onBack: _onBack }: Props) {
  const heroBlock = useInView<HTMLDivElement>()
  const formBlock = useInView<HTMLDivElement>()

  const [form, setForm] = useState({
    nombre: '',
    institucion: '',
    cargo: '',
    email: '',
    interes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <div className="animate-fade-in bg-[var(--cream)]">
      <section className="relative overflow-hidden" style={{ marginTop: '-4rem', paddingTop: '4rem' }}>
        {/* Mesh blobs — inside relative section, same as EstudianteLanding */}
        <div className="mesh-stage" aria-hidden>
          <div className="mesh-blob mesh-blob--ocean-a" />
          <div className="mesh-blob mesh-blob--terra" />
          <div className="mesh-blob mesh-blob--ocean-b" />
        </div>
        <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-[5vw] 2xl:px-[6vw] pt-24 pb-28 sm:pt-32 sm:pb-36 z-10">

          {/* Hero text — full width */}
          <div ref={heroBlock.ref} className={`reveal ${heroBlock.inView ? 'is-visible' : ''}`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--hueso)] mb-10 inline-flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--terra)]/60" />
              Instituciones educativas
            </p>

            <h1
              className="font-display font-light text-[var(--navy)] mb-20 sm:mb-24"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 4rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
              }}
            >
              Que los estudiantes tengan la herramienta para descubrir su vocación y{' '}
              <span className="text-[var(--ocean)] font-normal not-italic">
                decidir su futuro con seguridad.
              </span>
            </h1>
          </div>

          {/* Form — centered */}
          <div
            ref={formBlock.ref}
            className={`reveal reveal-delay-2 ${formBlock.inView ? 'is-visible' : ''} max-w-[640px] mx-auto`}
          >
            {submitted ? (
              <div className="py-12 text-center">
                <p
                  className="font-display font-light text-[var(--navy)] mb-3"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em' }}
                >
                  Recibimos tu solicitud.
                </p>
                <p className="text-[var(--navy)]/55 text-[15px]">Te contactamos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(
                    [
                      { id: 'nombre', label: 'Nombre y Apellido', type: 'text' },
                      { id: 'institucion', label: 'Institución Educativa', type: 'text' },
                      { id: 'cargo', label: 'Cargo o Rol', type: 'text' },
                      { id: 'email', label: 'Email institucional', type: 'email' },
                    ] as const
                  ).map(({ id, label, type }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={id}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--navy)]/70"
                      >
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        required
                        value={form[id]}
                        onChange={handleChange(id)}
                        className="bg-[var(--cream-elev)] border border-[var(--border-cream)] focus:border-[var(--ocean)] text-[var(--navy)] text-[15px] rounded-xl px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="interes"
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--navy)]/70"
                  >
                    ¿Qué le gustaría que tratemos en la reunión?
                  </label>
                  <textarea
                    id="interes"
                    rows={3}
                    value={form.interes}
                    onChange={handleChange('interes')}
                    className="bg-[var(--cream-elev)] border border-[var(--border-cream)] focus:border-[var(--ocean)] text-[var(--navy)] text-[15px] rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-8 py-[18px] rounded-full bg-[var(--ocean)] text-[var(--cream-elev)] font-medium text-[15px] hover:bg-[var(--ocean-deep)] transition-all cursor-pointer"
                    style={{ boxShadow: '0 12px 32px rgba(30,91,160,0.20)' }}
                  >
                    Solicitar reunión
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}
