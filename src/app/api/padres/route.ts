import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { APP_URL } from '@/lib/programa'
import { labelAnio, validarLead, type LeadPadre } from '@/lib/padres'

const TO = 'info@timonear.com'
const FROM = 'Timon <noreply@timonear.com>'
const APP_TIMEOUT_MS = 8000

type Resultado = { ok: true; token?: string } | { ok: false; sinConfig: boolean }

/**
 * Freno contra bots, sin infraestructura: 5 envíos cada 10 minutos por IP.
 * Por mail no: con un mail ajeno, cualquiera podría bloquearle el envío al
 * padre real. Vive en la memoria de cada instancia, así que es best-effort (en
 * serverless se reparte entre instancias); alcanza contra un script tonto que
 * dispara en bucle. Lo de verdad (Turnstile o un límite compartido) queda
 * para cuando haya tráfico de pauta.
 */
const VENTANA_MS = 10 * 60 * 1000
const MAX_POR_VENTANA = 5
const golpes = new Map<string, number[]>()

function limitado(clave: string, ahora = Date.now()): boolean {
  const recientes = (golpes.get(clave) ?? []).filter((t) => ahora - t < VENTANA_MS)
  recientes.push(ahora)
  golpes.set(clave, recientes)
  if (golpes.size > 5000) golpes.clear()
  return recientes.length > MAX_POR_VENTANA
}

/**
 * POST /api/padres
 *
 * El formulario de /padres cae acá. Hace dos cosas en paralelo:
 *  - le pasa el lead a la app (POST /api/familias), que crea la familia y
 *    devuelve un token para pagar o mandarle el link al hijo;
 *  - le manda un mail al equipo con el contacto del padre. El nombre del hijo
 *    NO va en el mail: es dato de un menor y se queda en la app.
 *
 * Con que salga una de las dos, el padre ve el éxito (sin token si falló la
 * app). Si fallan las dos: 503 si es porque faltan las env, 502 si no.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Cuerpo inválido' }, { status: 400 })
  }

  const campo = (k: string) => String((body as Record<string, unknown>)[k] ?? '').trim()

  // Campo trampa: invisible para personas, los bots lo llenan. Se responde
  // OK sin hacer nada, para no enseñarle al bot qué lo delató.
  if (campo('empresa')) {
    return NextResponse.json({ ok: true })
  }

  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'sin-ip'
  if (limitado(`ip:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: 'Recibimos varios envíos seguidos. Probá de nuevo en unos minutos', fallbackEmail: TO },
      { status: 429 }
    )
  }
  const crudo = {
    parentName: campo('parentName'),
    parentWhatsapp: campo('parentWhatsapp'),
    parentEmail: campo('parentEmail'),
    childName: campo('childName'),
    childYear: campo('childYear'),
  }
  const problema = validarLead(crudo)
  if (problema) {
    return NextResponse.json({ ok: false, error: problema }, { status: 400 })
  }
  const lead = crudo as LeadPadre

  const [app, mail] = await Promise.all([crearFamilia(lead), avisarEquipo(lead)])

  if (app.ok || mail.ok) {
    return NextResponse.json({ ok: true, ...(app.ok && app.token ? { token: app.token } : {}) })
  }

  const sinConfig = !app.ok && app.sinConfig && !mail.ok && mail.sinConfig
  return NextResponse.json(
    {
      ok: false,
      error: sinConfig ? 'El envío no está configurado' : 'No pudimos guardar tus datos',
      fallbackEmail: TO,
    },
    { status: sinConfig ? 503 : 502 }
  )
}

async function crearFamilia(lead: LeadPadre): Promise<Resultado> {
  const secret = process.env.LANDING_LEADS_SECRET
  if (!secret) {
    console.error('[padres] falta LANDING_LEADS_SECRET: el lead no se pasó a la app')
    return { ok: false, sinConfig: true }
  }
  try {
    const res = await fetch(`${APP_URL}/api/familias`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-landing-secret': secret },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(APP_TIMEOUT_MS),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`[padres] la app respondió ${res.status}`)
      return { ok: false, sinConfig: false }
    }
    const data = (await res.json().catch(() => null)) as { token?: unknown } | null
    const token = typeof data?.token === 'string' && data.token.length <= 200 ? data.token : undefined
    if (!token) console.error('[padres] la app no devolvió token')
    return { ok: true, token }
  } catch (e) {
    console.error('[padres] app:', e instanceof Error ? e.name : 'error')
    return { ok: false, sinConfig: false }
  }
}

async function avisarEquipo(lead: LeadPadre): Promise<Resultado> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[padres] falta RESEND_API_KEY: el mail al equipo no se mandó')
    return { ok: false, sinConfig: true }
  }
  const anio = labelAnio(lead.childYear)
  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: TO,
    replyTo: lead.parentEmail,
    subject: `Padre: ${lead.parentName} (${/^\d$/.test(lead.childYear) ? `hijo en ${anio}` : `hijo: ${anio.toLowerCase()}`})`,
    text: [
      `Nombre: ${lead.parentName}`,
      `WhatsApp: ${lead.parentWhatsapp}`,
      `Email: ${lead.parentEmail}`,
      `Año del hijo/a: ${anio}`,
    ].join('\n'),
  })
  if (error) {
    console.error('[padres] resend:', error.message)
    return { ok: false, sinConfig: false }
  }
  return { ok: true }
}
