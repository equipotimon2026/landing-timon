import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO = 'info@timonear.com'
const FROM = 'Timon <noreply@timonear.com>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * POST /api/contact
 *
 * Dos remitentes distintos caen acá:
 *  - el chat flotante ({ message, email })
 *  - el formulario de colegios ({ tipo: 'colegio', nombre, institucion,
 *    cargo, email, interes })
 *
 * Ambos terminan en un mail a info@ con reply-to a quien escribió. Si falta
 * la clave de Resend el error es explícito (503), no un 500 mudo: la persona
 * ve un aviso con el mail para escribirnos directo.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Cuerpo inválido' }, { status: 400 })
  }

  const email = String(body.email ?? '').trim()
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'El mail no parece válido' }, { status: 400 })
  }

  let subject: string
  let text: string

  if (body.tipo === 'colegio') {
    const nombre = String(body.nombre ?? '').trim()
    const institucion = String(body.institucion ?? '').trim()
    const cargo = String(body.cargo ?? '').trim()
    const interes = String(body.interes ?? '').trim()
    if (!nombre || !institucion) {
      return NextResponse.json({ ok: false, error: 'Faltan campos' }, { status: 400 })
    }
    subject = `Colegio: ${institucion} pide reunión (${nombre})`
    text = [
      `Institución: ${institucion}`,
      `Nombre: ${nombre}`,
      `Cargo: ${cargo || '—'}`,
      `Email: ${email}`,
      '',
      'Qué quieren tratar:',
      interes || '—',
    ].join('\n')
  } else {
    const message = String(body.message ?? '').trim()
    if (!message) {
      return NextResponse.json({ ok: false, error: 'Faltan campos' }, { status: 400 })
    }
    if (message.length > 4000) {
      return NextResponse.json({ ok: false, error: 'El mensaje es muy largo' }, { status: 400 })
    }
    subject = `Consulta de ${email}`
    text = `De: ${email}\n\n${message}`
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] falta RESEND_API_KEY: el mensaje no se pudo mandar')
    return NextResponse.json(
      { ok: false, error: 'El envío no está configurado', fallbackEmail: TO },
      { status: 503 }
    )
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject,
    text,
  })

  if (error) {
    console.error('[contact] resend:', error.message)
    return NextResponse.json(
      { ok: false, error: 'No pudimos mandar el mensaje', fallbackEmail: TO },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
