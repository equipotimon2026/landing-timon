import { NextRequest, NextResponse } from 'next/server'
import { APP_URL } from '@/lib/programa'
import { tokenValido } from '@/lib/padres'

const TIPOS = new Set(['shared_child_whatsapp', 'shared_child_copy'])

/**
 * POST /api/padres/evento  { token, tipo }
 *
 * El padre le mandó el link al hijo desde "Listo" (WhatsApp o copiar): se lo
 * contamos a la app (POST /api/familias/<token>/evento) para el panel de
 * familias. Del lado del servidor, con el secreto compartido y la IP real del
 * padre (la app limita por esa IP). Siempre la misma respuesta: no sirve para
 * probar tokens. Si la app no responde, no pasa nada.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { token?: unknown; tipo?: unknown } | null
  const token = body?.token
  const tipo = typeof body?.tipo === 'string' && TIPOS.has(body.tipo) ? body.tipo : null
  if (!tokenValido(token) || !tipo) return NextResponse.json({ ok: true })
  const secret = process.env.LANDING_LEADS_SECRET
  const ip =
    req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  try {
    await fetch(`${APP_URL}/api/familias/${encodeURIComponent(token)}/evento`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(secret ? { 'x-landing-secret': secret, 'x-landing-client-ip': ip } : {}),
      },
      body: JSON.stringify({ tipo, desde: 'landing' }),
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
  } catch {
    // Es solo medición.
  }
  return NextResponse.json({ ok: true })
}
