import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { message, email } = await req.json()

  if (!message || !email) {
    return NextResponse.json({ ok: false, error: 'Faltan campos' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Timon <noreply@timonear.com>',
    to: 'info@timonear.com',
    replyTo: email,
    subject: `Consulta de ${email}`,
    text: `De: ${email}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
