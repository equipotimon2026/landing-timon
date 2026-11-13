'use client'

import { useRef, useState } from 'react'
import { CalendarClock, Check, Copy, CreditCard, MessageCircle } from 'lucide-react'
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

const VACIO = { parentName: '', parentWhatsapp: '', parentEmail: '', childName: '', childYear: '', empresa: '' }

/**
 * El formulario del padre y la pantalla que lo reemplaza. Mismo contrato que
 * el de padres-flujo-venta: POST /api/padres → { ok, token? }. Con token:
 * pagar ahora (/familia/<token> en la app) o mandarle al hijo el link para
 * empezar gratis. Sin token (la app no respondió): avisamos que escribimos.
 */
export function Anotalo() {
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
    'h-[52px] w-full rounded-xl border border-[var(--linea)] bg-[var(--papel)] px-4 text-[16px] text-[var(--tinta)] outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-[#A9B3C4] hover:border-[var(--linea-fuerte)] focus:border-[var(--rumbo)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,91,160,0.12)]'
  const label = 'mb-1.5 block text-[14px] font-medium text-[var(--tinta2)]'

  return (
    <div
      ref={caja}
      className="scroll-mt-24 rounded-[26px] bg-[var(--elev)] p-5 text-[var(--tinta)] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)] sm:p-9"
    >
      {estado.paso === 'listo' ? (
        <Listo token={estado.token} />
      ) : (
        <form onSubmit={enviar} noValidate>
          {/* Campo trampa para bots: fuera de pantalla y fuera del tab. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="p-empresa">Empresa</label>
            <input id="p-empresa" tabIndex={-1} autoComplete="off" value={datos.empresa} onChange={set('empresa')} />
          </div>
          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
            <fieldset className="space-y-4">
              <legend className="etiqueta mb-4 text-[var(--grafito)]">Tus datos</legend>
              <div>
                <label htmlFor="p-nombre" className={label}>Nombre</label>
                <input id="p-nombre" required maxLength={LIMITES.nombre} autoComplete="name" value={datos.parentName} onChange={set('parentName')} className={input} />
              </div>
              <div>
                <label htmlFor="p-wa" className={label}>WhatsApp</label>
                <input id="p-wa" required type="tel" inputMode="tel" maxLength={LIMITES.whatsapp} autoComplete="tel" placeholder="11 2345 6789" value={datos.parentWhatsapp} onChange={set('parentWhatsapp')} className={input} />
              </div>
              <div>
                <label htmlFor="p-mail" className={label}>Mail</label>
                <input id="p-mail" required type="email" maxLength={LIMITES.email} autoComplete="email" value={datos.parentEmail} onChange={set('parentEmail')} className={input} />
              </div>
            </fieldset>
            <fieldset className="space-y-4 border-t border-[var(--linea)] pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <legend className="etiqueta mb-4 text-[var(--grafito)]">Tu hijo o hija</legend>
              <div>
                <label htmlFor="p-hijo" className={label}>Nombre</label>
                <input id="p-hijo" required maxLength={LIMITES.nombre} autoComplete="off" value={datos.childName} onChange={set('childName')} className={input} />
              </div>
              <div>
                <label htmlFor="p-anio" className={label}>Qué año cursa</label>
                <select id="p-anio" required value={datos.childYear} onChange={set('childYear')} className={`${input} ${datos.childYear ? '' : 'text-[#9AA3B5]'}`}>
                  <option value="" disabled>Elegí una opción</option>
                  {ANIOS_HIJO.map((a) => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>

          {estado.error && (
            <p role="alert" className="mt-6 rounded-xl bg-[#FDECEC] px-4 py-3 text-[15px] text-[#A61B1B]">
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

          <div className="mt-7 flex flex-col-reverse gap-4 border-t border-[var(--linea)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[44ch] text-[13px] leading-snug text-[var(--grafito)]">
              Al continuar aceptás los{' '}
              <a href="/terminos" className="underline">términos</a>. Usamos tus datos solo para armar la
              cuenta y escribirte.
            </p>
            <button type="submit" disabled={estado.enviando} className="btn w-full shrink-0 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
              {estado.enviando ? 'Enviando…' : 'Quiero que mi hijo lo haga'}
            </button>
          </div>
        </form>
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
      className="mt-7 flex items-center justify-center gap-2 border-t border-[var(--linea)] pt-6 text-center text-[15.5px] text-[var(--grafito)] underline-offset-4 hover:underline"
    >
      ¿Preferís hablarlo antes?
      <strong className="inline-flex items-center gap-1.5 whitespace-nowrap text-[var(--tinta)]">
        <CalendarClock size={18} className="text-[var(--rumbo)]" aria-hidden />
        Agendá 15 minutos
      </strong>
    </a>
  )
}

function Listo({ token }: { token: string | null }) {
  const [copiado, setCopiado] = useState(false)

  if (!token) {
    return (
      <div role="status" className="py-4 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mar)]">
          <Check size={26} className="text-[var(--rumbo)]" />
        </span>
        <p className="titulo mt-5 text-[28px]">Recibimos tus datos</p>
        <p className="mt-2 text-[17px] text-[var(--grafito)]">Te escribimos por WhatsApp para contarte cómo sigue.</p>
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
      <p className="titulo text-[30px] sm:text-[38px]">Listo, ya está la cuenta de tu familia</p>
      <p className="mt-2 text-[17px] text-[var(--grafito)]">Elegí cómo sigue.</p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="flex flex-col rounded-[20px] bg-[var(--tinta)] p-6 text-white">
          <p className="text-[21px] font-medium tracking-[-0.01em]">Pagar ahora</p>
          <p className="mt-2 flex-1 text-[15px] leading-[1.55] text-white/75">
            Tu hijo entra con la cuenta ya desbloqueada y ve el informe completo al terminar.
          </p>
          <a href={urlPagarFamilia(token)} className="btn mt-5 w-full">
            <CreditCard size={19} aria-hidden /> Pagar ahora
          </a>
        </div>

        <div className="flex flex-col rounded-[20px] border border-[var(--linea)] p-6">
          <p className="text-[21px] font-medium tracking-[-0.01em]">Empezar gratis</p>
          <p className="mt-2 text-[15px] leading-[1.55] text-[var(--grafito)]">
            Mandale este link a tu hijo. Con él crea su cuenta, ya unida a la tuya.
          </p>
          <p className="mt-3 break-all rounded-lg bg-[var(--papel)] px-3 py-2 text-[13px] text-[var(--tinta)]">{linkHijo}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a
              href={urlWhatsappHijo(linkHijo)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-bold text-[#0B3D20] transition-colors hover:bg-[#1FBF5B]"
            >
              <MessageCircle size={18} aria-hidden /> Por WhatsApp
            </a>
            <button
              type="button"
              onClick={copiar}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--linea)] text-[15px] font-semibold transition-colors hover:bg-[var(--papel)]"
            >
              {copiado ? <><Check size={18} aria-hidden /> Copiado</> : <><Copy size={18} aria-hidden /> Copiar link</>}
            </button>
          </div>
          <span className="sr-only" aria-live="polite">{copiado ? 'Link copiado' : ''}</span>
        </div>
      </div>

      <Agenda />
    </div>
  )
}
