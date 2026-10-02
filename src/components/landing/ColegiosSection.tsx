'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

type Props = { onBack: () => void }

const CONTACT_EMAIL = 'info@timonear.com'

/**
 * Para colegios: una promesa y un formulario para pedir reunión.
 *
 * El formulario manda de verdad: va a /api/contact con tipo 'colegio' y
 * termina en un mail a info@. Antes solo mostraba "recibimos tu solicitud"
 * sin enviar nada.
 */
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
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEstado('enviando')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'colegio', ...form }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(
          data.fallbackEmail
            ? `No pudimos mandar la solicitud. Escribinos directo a ${data.fallbackEmail}.`
            : data.error || 'No pudimos mandar la solicitud. Probá de nuevo.'
        )
        setEstado('error')
        return
      }
      setEstado('ok')
    } catch {
      setError(`No pudimos mandar la solicitud. Escribinos directo a ${CONTACT_EMAIL}.`)
      setEstado('error')
    }
  }

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <div className="timon-wash animate-fade-in">
      <section className="relative overflow-hidden" style={{ marginTop: '-4rem', paddingTop: '4rem' }}>
        <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">

          <div ref={heroBlock.ref} className={`reveal ${heroBlock.inView ? 'is-visible' : ''}`}>
            <p className="eyebrow eyebrow--with-rule mb-6">Instituciones educativas</p>
            <h1
              className="mb-4 max-w-[22ch] font-display font-extrabold text-[var(--navy)]"
              style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)', lineHeight: 1.04, letterSpacing: '-0.04em' }}
            >
              Que tus estudiantes decidan su futuro{' '}
              <span className="serif-accent text-[var(--ocean)]">con seguridad.</span>
            </h1>
            <p className="mb-12 max-w-[56ch] text-[16px] leading-relaxed text-[var(--hueso)] sm:mb-16 sm:text-[17px]">
              Un recorrido de orientación vocacional armado con psicólogas y
              psicopedagogas, con un código propio para tu colegio y un informe por
              cada estudiante. Contanos cómo trabajan y coordinamos una reunión.
            </p>
          </div>

          <div
            ref={formBlock.ref}
            className={`reveal reveal-delay-2 ${formBlock.inView ? 'is-visible' : ''} glass glass-strong glass-xl mx-auto max-w-[680px] p-6 sm:p-9`}
          >
            {estado === 'ok' ? (
              <div className="py-8 text-center">
                <p
                  className="mb-3 font-display font-extrabold text-[var(--navy)]"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em' }}
                >
                  Recibimos tu solicitud.
                </p>
                <p className="text-[15px] text-[var(--hueso)]">Te escribimos a {form.email} para coordinar.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {(
                    [
                      { id: 'nombre', label: 'Nombre y apellido', type: 'text', auto: 'name' },
                      { id: 'institucion', label: 'Institución educativa', type: 'text', auto: 'organization' },
                      { id: 'cargo', label: 'Cargo o rol', type: 'text', auto: 'organization-title' },
                      { id: 'email', label: 'Email institucional', type: 'email', auto: 'email' },
                    ] as const
                  ).map(({ id, label, type, auto }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label htmlFor={id} className="mono-label">{label}</label>
                      <input
                        id={id}
                        type={type}
                        autoComplete={auto}
                        required={id !== 'cargo'}
                        value={form[id]}
                        onChange={handleChange(id)}
                        className="input-timon"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="interes" className="mono-label">
                    ¿Qué les gustaría que tratemos en la reunión?
                  </label>
                  <textarea
                    id="interes"
                    rows={3}
                    value={form.interes}
                    onChange={handleChange('interes')}
                    className="input-timon h-auto resize-none py-3"
                  />
                </div>

                {error && (
                  <p className="rounded-[var(--r-sm)] border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    disabled={estado === 'enviando'}
                    className="btn-timon btn-timon--primary group h-[52px] w-full px-8 text-[16px] sm:w-auto"
                  >
                    {estado === 'enviando' ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Solicitar reunión
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
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
