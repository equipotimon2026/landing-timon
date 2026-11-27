import { NextRequest, NextResponse } from 'next/server'
import { APP_URL } from '@/lib/programa'
import { tokenValido } from '@/lib/padres'

/**
 * POST /api/padres/llamada  { token }
 *
 * El padre tocó "Agendá 15 minutos" en la pantalla "Listo" y se le abrió el
 * Calendly. Acá le avisamos a la app (POST /api/familias/<token>/llamada, el
 * mismo que usa "Quiero que me llamen") para que /admin/familias lo muestre
 * como llamada pedida y el equipo reciba el WhatsApp del padre. Se hace del
 * lado del servidor para no depender de CORS. Si la app no responde, no pasa
 * nada: el padre ya está en la agenda.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { token?: unknown } | null
  const token = body?.token
  if (!tokenValido(token)) return NextResponse.json({ ok: true })

  // Todos los padres salen por la IP de Vercel de la landing: con el secreto
  // compartido, la app limita por la IP REAL del padre (este header) en vez de
  // por la nuestra. Sin secreto, la app aplica su límite por IP de siempre.
  const secret = process.env.LANDING_LEADS_SECRET
  const ip =
    req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  try {
    await fetch(`${APP_URL}/api/familias/${encodeURIComponent(token)}/llamada`, {
      method: 'POST',
      headers: secret ? { 'x-landing-secret': secret, 'x-landing-client-ip': ip } : undefined,
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
  } catch {
    // El aviso es opcional: el padre ya está en la agenda.
  }
  // Siempre la misma respuesta: que no sirva para probar si un token existe.
  return NextResponse.json({ ok: true })
}
