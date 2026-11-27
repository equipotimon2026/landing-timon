import { NextRequest, NextResponse } from 'next/server'
import { APP_URL } from '@/lib/programa'
import { tokenValido } from '@/lib/padres'

/**
 * GET /api/padres/precio?token=…  → { precio: number | null }
 *
 * El precio de esta familia, para el paywall que ve el padre apenas le manda
 * el link al hijo (26/11/2026). Lo calcula la app (precio de padre); acá solo
 * se pide del lado del servidor (sin CORS), con el secreto y la IP real del
 * padre. Si no se puede, `null` y la landing muestra "Ver precio y pagar".
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!tokenValido(token)) return NextResponse.json({ precio: null })
  const secret = process.env.LANDING_LEADS_SECRET
  const ip =
    req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  try {
    const res = await fetch(`${APP_URL}/api/familias/${encodeURIComponent(token)}/precio`, {
      headers: secret ? { 'x-landing-secret': secret, 'x-landing-client-ip': ip } : undefined,
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    })
    const data = (await res.json().catch(() => null)) as { precio?: unknown } | null
    const precio = typeof data?.precio === 'number' && data.precio > 0 ? data.precio : null
    return NextResponse.json({ precio })
  } catch {
    return NextResponse.json({ precio: null })
  }
}
