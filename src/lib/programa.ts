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

/**
 * Los tres fundadores. `foto` es la ruta en /public (ej. '/fundadores/facu.jpg');
 * mientras sea `null` se muestra el recuadro con la inicial.
 */
export const FUNDADORES: { nombre: string; rol: string; foto: string | null }[] = [
  { nombre: 'Facu', rol: 'Producto y operaciones', foto: null },
  { nombre: 'Feli', rol: 'Colegios y familias', foto: null },
  { nombre: 'Nico', rol: 'Tecnología', foto: null },
]

/**
 * La oferta, armada con $100M Offers de Hormozi (pedido de Nico, 26/10/2026).
 *
 * Nombre con MAGIC: razón (elegir bien), a quién (alumnos de 4º a 6º), meta
 * (tu carrera), intervalo (14 días: 13 paradas, una por día) y formato
 * (programa). Ecuación de valor: resultado soñado (carrera + universidad +
 * salida laboral) × probabilidad (psicopedagogas, modelos profesionales,
 * garantía) ÷ tiempo (14 días) × esfuerzo (10 minutos por día, desde casa).
 */
export const OFERTA = {
  nombre: 'Tu Carrera en 14 Días',
  promesa: 'Elegí qué estudiar sabiendo quién sos',
}

/**
 * Bonos de la cohorte fundadora: cada uno resuelve una objeción. Escasez real:
 * son para los primeros alumnos porque la llamada y la reunión las damos
 * nosotros y no escalan. La reunión con psicopedagoga se descartó como bono
 * (Nico, 26/10/2026): sigue siendo un adicional pago.
 */
export const BONOS = [
  {
    id: 'llamada',
    titulo: 'Llamada 1 a 1 con un fundador',
    objecion: '"¿Será para mí?"',
    texto: 'Con vos y tu familia: resolvemos dudas y armamos juntos el plan para los 14 días.',
    valor: null as number | null,
  },
  {
    id: 'mapa',
    titulo: 'El Mapa de los 16 Mundos',
    objecion: '"No conozco las carreras"',
    texto: 'Las carreras del catálogo, por dentro: cómo es un día de trabajo y lo que nadie te cuenta.',
    valor: null as number | null,
  },
]

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
