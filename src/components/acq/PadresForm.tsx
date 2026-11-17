'use client'

import { useRef, useState } from 'react'
import { CalendarClock, Check, ChevronRight, Copy, CreditCard, MessageCircle } from 'lucide-react'
import {
  AGENDA_URL,
  ANIOS_HIJO,
  LIMITES,
  urlHijoFamilia,
  urlPagarFamilia,
  urlWhatsappHijo,
  validarLead,
} from '@/lib/padres'
import { CONTACT_EMAIL } from '@/lib/programa'

type Estado =
  | { paso: 'form'; enviando: boolean; error: string | null; fallbackEmail?: string }
  | { paso: 'listo'; token: string | null }

const VACIO = { parentName: '', parentWhatsapp: '', parentEmail: '', childName: '', childYear: '' }

/**
 * Formulario de /padres y la pantalla que lo reemplaza al enviarlo. Con token
 * de la app: pagar ahora o mandarle al hijo el link para empezar gratis. Sin
 * token (la app no respondió): avisamos que escribimos por WhatsApp.
 */
export function PadresForm() {
  const [datos, setDatos] = useState(VACIO)
  const [estado, setEstado] = useState<Estado>({ paso: 'form', enviando: false, error: null })
  const caja = useRef<HTMLDivElement>(null)

  const set = (k: keyof typeof VACIO) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDatos((d) => ({ ...d, [k]: e.target.value }))

  const enviar = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (estado.paso !== 'form' || estado.enviando) return
    const lead = Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, v.trim()])) as typeof VACIO
    const problema = validarLead(lead)
    if (problema) {
      setEstado({ paso: 'form', enviando: false, error: problema })
      return
    }
    setEstado({ paso: 'form', enviando: true, error: null })
    try {
      const res = await fetch('/api/padres', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(lead),
      })
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; token?: string; error?: string; fallbackEmail?: string }
        | null
      if (!res.ok || !data?.ok) {
        setEstado({
          paso: 'form',
          enviando: false,
          error: data?.error ?? 'No pudimos mandar tus datos',
          fallbackEmail: data?.fallbackEmail ?? CONTACT_EMAIL,
        })
        return
      }
      setEstado({ paso: 'listo', token: typeof data.token === 'string' && data.token ? data.token : null })
      requestAnimationFrame(() => caja.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    } catch {
      setEstado({ paso: 'form', enviando: false, error: 'No pudimos mandar tus datos', fallbackEmail: CONTACT_EMAIL })
    }
  }

  const input =
    'h-12 w-full rounded-md border border-[var(--border-cream-strong)] bg-white px-3 text-[15px] outline-none focus:border-[var(--ocean)] focus:ring-2 focus:ring-[var(--ocean-wash)]'
  const label = 'mb-1 block text-[13px] font-semibold'

  return (
    <div ref={caja} className="scroll-mt-24 rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(15,31,54,0.10)] sm:p-9">
      {estado.paso === 'listo' ? (
        <Listo token={estado.token} />
      ) : (
        <>
          <p className="text-[24px] font-extrabold leading-tight">Anotalo en Timon</p>
          <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">
            Te pedimos lo justo para armar la cuenta de tu familia. Lleva un minuto.
          </p>
          <form onSubmit={enviar} noValidate className="mt-6 space-y-4">
            <fieldset className="space-y-3">
              <legend className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.1em] text-[var(--ocean-deep)]">
                Tus datos
              </legend>
              <div>
                <label htmlFor="p-nombre" className={label}>Tu nombre</label>
                <input id="p-nombre" required maxLength={LIMITES.nombre} autoComplete="name" value={datos.parentName} onChange={set('parentName')} className={input} />
              </div>
              <div>
                <label htmlFor="p-wa" className={label}>Tu WhatsApp</label>
                <input id="p-wa" required type="tel" inputMode="tel" maxLength={LIMITES.whatsapp} autoComplete="tel" placeholder="11 2345 6789" value={datos.parentWhatsapp} onChange={set('parentWhatsapp')} className={input} />
              </div>
              <div>
                <label htmlFor="p-mail" className={label}>Tu mail</label>
                <input id="p-mail" required type="email" maxLength={LIMITES.email} autoComplete="email" value={datos.parentEmail} onChange={set('parentEmail')} className={input} />
              </div>
            </fieldset>
            <fieldset className="space-y-3 pt-2">
              <legend className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.1em] text-[var(--ocean-deep)]">
                Tu hijo o hija
              </legend>
              <div>
                <label htmlFor="p-hijo" className={label}>Su nombre</label>
                <input id="p-hijo" required maxLength={LIMITES.nombre} autoComplete="off" value={datos.childName} onChange={set('childName')} className={input} />
              </div>
              <div>
                <label htmlFor="p-anio" className={label}>Qué año cursa</label>
                <select id="p-anio" required value={datos.childYear} onChange={set('childYear')} className={`${input} ${datos.childYear ? '' : 'text-[var(--hueso-soft)]'}`}>
                  <option value="" disabled>Elegí una opción</option>
                  {ANIOS_HIJO.map((a) => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>
            </fieldset>

            {estado.error && (
              <p role="alert" className="rounded-md bg-[#FEF2F2] px-3 py-2 text-[14px] text-[#B91C1C]">
                {estado.error}
                {estado.fallbackEmail && (
                  <>
                    . Escribinos a{' '}
                    <a href={`mailto:${estado.fallbackEmail}`} className="font-semibold underline">
                      {estado.fallbackEmail}
                    </a>{' '}
                    y lo resolvemos.
                  </>
                )}
              </p>
            )}

            <p className="text-[12px] leading-snug text-[var(--hueso)]">
              Al continuar aceptás los{' '}
              <a href="/terminos" className="underline">términos</a>. Usamos tus datos solo para
              armar la cuenta y escribirte.
            </p>
            <button
              type="submit"
              disabled={estado.enviando}
              className="flex h-14 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-[var(--ocean)] text-[16px] font-bold text-white transition-colors hover:bg-[var(--ocean-deep)] disabled:cursor-wait disabled:opacity-70"
            >
              {estado.enviando ? 'Enviando…' : <>Quiero que mi hijo lo haga <ChevronRight size={18} /></>}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

function Agenda() {
  const externo = AGENDA_URL.startsWith('http')
  return (
    <a
      href={AGENDA_URL}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="mt-8 block border-t border-[var(--border-cream)] pt-6 text-center text-[15px] text-[var(--hueso)] underline-offset-4 hover:underline"
    >
      ¿Preferís hablarlo antes?{' '}
      <strong className="whitespace-nowrap text-[var(--navy)]">
        <CalendarClock size={17} className="-mt-0.5 mr-1 inline text-[var(--ocean)]" aria-hidden />
        Agendá 15 minutos
      </strong>
    </a>
  )
}

function Listo({ token }: { token: string | null }) {
  const [copiado, setCopiado] = useState(false)

  if (!token) {
    return (
      <div role="status" className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ocean-wash)]">
          <Check size={24} className="text-[var(--ocean)]" />
        </span>
        <p className="mt-4 text-[24px] font-extrabold leading-tight">Recibimos tus datos</p>
        <p className="mt-2 text-[16px] leading-[1.55] text-[var(--hueso)]">
          Te escribimos por WhatsApp para contarte cómo sigue.
        </p>
        <Agenda />
      </div>
    )
  }

  const linkHijo = urlHijoFamilia(token)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(linkHijo)
    } catch {
      const t = document.createElement('textarea')
      t.value = linkHijo
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2500)
  }

  return (
    <div role="status">
      <p className="text-[24px] font-extrabold leading-tight">Listo, ya está la cuenta de tu familia</p>
      <p className="mt-2 text-[15px] leading-[1.55] text-[var(--hueso)]">Elegí cómo seguir:</p>

      <div className="mt-6 rounded-xl border-2 border-[var(--ocean)] p-5">
        <p className="text-[18px] font-bold">Pagar ahora</p>
        <p className="mt-1 text-[14px] leading-[1.5] text-[var(--hueso)]">
          Pagando ahora, tu hijo entra con la cuenta ya desbloqueada.
        </p>
        <a
          href={urlPagarFamilia(token)}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--ocean)] text-[15px] font-bold text-white transition-colors hover:bg-[var(--ocean-deep)]"
        >
          <CreditCard size={18} /> Pagar ahora
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border-cream-strong)] p-5">
        <p className="text-[18px] font-bold">Empezar gratis: le mandamos el link a tu hijo</p>
        <p className="mt-1 text-[14px] leading-[1.5] text-[var(--hueso)]">
          Reenviale este link. Con él crea su cuenta, ya unida a la tuya.
        </p>
        <p className="mt-3 break-all rounded-md bg-[var(--ocean-wash)] px-3 py-2 font-mono text-[12px] text-[var(--navy)]">
          {linkHijo}
        </p>
        <div className="mt-3 grid gap-2">
          <a
            href={urlWhatsappHijo(linkHijo)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] text-[15px] font-bold text-[#0B3D20] transition-colors hover:bg-[#1FBF5B]"
          >
            <MessageCircle size={18} /> Mandárselo por WhatsApp
          </a>
          <button
            type="button"
            onClick={copiar}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--border-cream-strong)] text-[15px] font-semibold transition-colors hover:bg-[var(--ocean-wash)]"
          >
            {copiado ? <><Check size={18} /> Copiado</> : <><Copy size={18} /> Copiar link</>}
          </button>
        </div>
        <span className="sr-only" aria-live="polite">{copiado ? 'Link copiado' : ''}</span>
      </div>

      <Agenda />
    </div>
  )
}
