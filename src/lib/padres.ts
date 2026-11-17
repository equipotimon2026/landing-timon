import { APP_URL, CONTACT_EMAIL } from '@/lib/programa'

/**
 * Flujo de venta a padres (plan con Facu del 11/11/2026): el padre deja sus
 * datos y los del hijo en /padres, la landing le pasa el lead a la app
 * (POST /api/familias) y la app devuelve un token de familia. Con ese token el
 * padre paga ahora o le reenvía al hijo el link para empezar gratis.
 *
 * Lo comparten el formulario (cliente) y /api/padres (servidor), así las dos
 * puntas validan igual.
 */

/** El año que cursa el hijo. `id` es lo que viaja a la app como `childYear`. */
export const ANIOS_HIJO = [
  { id: '4', label: '4º año' },
  { id: '5', label: '5º año' },
  { id: '6', label: '6º año' },
  { id: 'egresado', label: 'Ya terminó el colegio' },
  { id: 'carrera', label: 'Ya empezó una carrera' },
] as const

export type AnioHijo = (typeof ANIOS_HIJO)[number]['id']

export function labelAnio(id: string) {
  return ANIOS_HIJO.find((a) => a.id === id)?.label ?? id
}

/** El mismo regex que /api/contact. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LIMITES = { nombre: 80, email: 120, whatsapp: 30 }

export function digitos(s: string) {
  return s.replace(/\D/g, '')
}

export type LeadPadre = {
  parentName: string
  parentWhatsapp: string
  parentEmail: string
  childName: string
  childYear: AnioHijo
}

/** Devuelve el primer problema, o `null` si el lead está bien. */
export function validarLead(l: Record<keyof LeadPadre, string>): string | null {
  if (!l.parentName || !l.parentWhatsapp || !l.parentEmail || !l.childName || !l.childYear) {
    return 'Completá todos los campos'
  }
  if (l.parentName.length > LIMITES.nombre || l.childName.length > LIMITES.nombre) {
    return 'El nombre es muy largo'
  }
  if (l.parentEmail.length > LIMITES.email || !EMAIL_RE.test(l.parentEmail)) {
    return 'El mail no parece válido'
  }
  const d = digitos(l.parentWhatsapp)
  if (l.parentWhatsapp.length > LIMITES.whatsapp || d.length < 8 || d.length > 15) {
    return 'El WhatsApp no parece válido (con código de área, sin el 15)'
  }
  if (!ANIOS_HIJO.some((a) => a.id === l.childYear)) {
    return 'Elegí qué año cursa'
  }
  return null
}

/** La app crea el pago desde esta pantalla. */
export function urlPagarFamilia(token: string) {
  return `${APP_URL}/familia/${encodeURIComponent(token)}?pagar=1`
}

/** El link que el padre le reenvía al hijo: crea su cuenta ya atada a la familia. */
export function urlHijoFamilia(token: string) {
  return `${APP_URL}/entrar?modo=crear&familia=${encodeURIComponent(token)}`
}

/** Texto fijo del WhatsApp del padre al hijo: no lleva datos de nadie. */
export function urlWhatsappHijo(link: string) {
  const texto = `Te anoté en Timon para que veas qué carreras van con vos, dónde estudiarlas y de qué se trabaja. Son paradas cortas que hacés desde el celu. Empezá acá: ${link}`
  return `https://wa.me/?text=${encodeURIComponent(texto)}`
}

/**
 * Agenda para hablar 15 minutos con el equipo.
 * TODO: cargar el link real de agenda en NEXT_PUBLIC_AGENDA_URL. Mientras no
 * esté, cae en un mail a info@.
 */
export const AGENDA_URL =
  process.env.NEXT_PUBLIC_AGENDA_URL ||
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Quiero agendar 15 minutos (padres)')}`
