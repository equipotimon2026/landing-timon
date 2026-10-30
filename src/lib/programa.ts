/**
 * La oferta del Programa Timon en un solo lugar (reunión con Feli del
 * 23/10/2026, armada con la ecuación de valor de Hormozi).
 *
 * Todo lo que es una promesa comercial vive acá para que se pueda cambiar sin
 * tocar las páginas: el cupo, los lugares que quedan y la garantía.
 */

export const APP_URL = 'https://app.timonear.com'
export const CONTACT_EMAIL = 'info@timonear.com'

/**
 * Cohorte fundadora: Facu y Feli llaman a cada familia para cerrar la venta.
 * No escala, por eso el cupo es real: los primeros 100 alumnos.
 */
export const COHORTE_CUPO = 100

/**
 * Lugares que quedan en la cohorte. `null` esconde el contador: preferimos no
 * mostrar un número antes que mostrar uno inventado. Actualizar a mano.
 */
export const LUGARES_RESTANTES: number | null = null

/**
 * Garantía. PROPUESTA pendiente de aprobar con Feli: en la reunión quedó "a
 * definir". Es condicional (terminar las 13 paradas) para que la promesa
 * dependa de que el alumno haga su parte, como recomienda Hormozi.
 */
export const GARANTIA = {
  nombre: 'Garantía "Tu mapa o tu plata"',
  corta: 'Si terminás las 13 paradas y tu informe no te sirve, te devolvemos el 100%.',
  larga:
    'Hacé las 13 paradas. Si cuando leés tu informe no tenés al menos una carrera que quieras investigar en serio, nos escribís y te devolvemos el 100% de lo que pagaste. Sin formularios ni vueltas.',
}

/** Momentos de entrada: los mismos que entiende app.timonear.com/entrar. */
export const MOMENTOS = [
  { id: 'colegio', label: 'Estoy en el colegio' },
  { id: 'termine', label: 'Terminé y no sé qué seguir' },
  { id: 'cambio', label: 'Me quiero cambiar de carrera' },
  { id: 'adulto_referente', label: 'Soy padre, madre o del colegio' },
] as const

/** Arma el link a la única puerta real de registro, la de la app. */
export function urlRegistro(params: Record<string, string> = {}) {
  const q = new URLSearchParams(
    Object.entries({ modo: 'crear', ...params }).filter(([, v]) => v.trim() !== '')
  )
  return `${APP_URL}/entrar?${q}`
}
