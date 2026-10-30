import { APP_URL } from '@/lib/programa'

/**
 * Todo lo que es promesa o dato de la home vive acá, para poder cambiarlo sin
 * tocar la página.
 *
 * De dónde sale (29/10/2026): el brief de Feli ("Timon: brief para la landing",
 * 27/10) más las prioridades de Nico del 29/10:
 *  - Freemium: el recorrido completo es gratis. Al final ves la mitad de tu
 *    perfil y para ver el resto (perfil completo, carreras, universidades) se
 *    paga. La landing no muestra precio ni plazo, y no ofrece garantía.
 *  - Un solo objetivo: que el adolescente empiece. Todos los botones dicen
 *    "Empezá gratis" y llevan a crear la cuenta.
 *  - Quien ya lo decidió puede pagar de entrada, y suma una devolución 1 a 1
 *    del resultado. Es un link chico debajo del botón, no un segundo botón.
 *  - Una sola comunicación para el padre que paga y el chico que usa.
 *  - Palabras: Timon sin tilde. Nada de "orientación vocacional",
 *    "diagnóstico", "test psicológico" ni "carrera ideal".
 */

export const URL_EMPEZAR = `${APP_URL}/entrar?modo=crear`

/** Crear la cuenta y caer directo en el pago con el bonus (lo lee /entrar en la app). */
export const URL_PAGAR_AHORA = `${APP_URL}/entrar?modo=crear&pago=ahora`

export const URL_ENTRAR = `${APP_URL}/entrar?modo=entrar`

/** Lo que se lleva quien paga antes de empezar. */
export const BONO_PAGO_ANTICIPADO = {
  corto: 'una devolución 1 a 1 de tu resultado',
  largo:
    'Si pagás antes de empezar, sumás una videollamada de 30 minutos con alguien del equipo para repasar tu resultado juntos.',
}

/**
 * El mensaje que un padre o una madre le manda al hijo por WhatsApp. Es texto
 * fijo: no lleva datos de nadie.
 */
export const MENSAJE_PARA_HIJO =
  'Mirá esto: Timon te ayuda a saber qué carreras van con vos, dónde estudiarlas y de qué vas a trabajar. Empezás gratis y lo hacés a tu ritmo: https://timonear.com'

export const URL_WHATSAPP_PADRE = `https://wa.me/?text=${encodeURIComponent(MENSAJE_PARA_HIJO)}`

/**
 * Bloque de confianza, después del hero: tres piezas iguales con cara o logo,
 * una frase corta, nombre y rol.
 *
 * La del María Guadalupe y la de la UBA resumen lo que contaron (Nico,
 * 30/10/2026), no son citas textuales: por eso `textual: false` y van sin
 * comillas. Del brief sigue pendiente el OK de Legal sobre avales y
 * testimonios, y sumar nombre y matrícula de la psicopedagoga.
 *
 * `ejemplo: true` = texto provisorio: se ve solo en desarrollo, con la
 * etiqueta EJEMPLO, y nunca llega a producción.
 */
export type Aval = {
  quien: string
  rol: string
  frase: string
  /** true = cita textual, va entre comillas. */
  textual: boolean
  /** Logo o foto en /public. `null` muestra la inicial. */
  imagen: string | null
  ejemplo: boolean
}

export const AVALES: Aval[] = [
  {
    // Cita textual (ya se usaba en /programa). Falta sumar nombre y matrícula.
    quien: 'Psicopedagoga',
    rol: 'Evaluó la metodología de Timon',
    frase: 'Es una visión integral, no un simple test.',
    textual: true,
    imagen: null,
    ejemplo: false,
  },
  {
    quien: 'Colegio María Guadalupe',
    rol: 'Lo probaron sus alumnos de 5° y 6° año',
    frase: 'Los alumnos lo probaron, les gustó y dijeron que está muy bueno.',
    textual: false,
    imagen: null,
    ejemplo: false,
  },
  {
    quien: 'Universidad de Buenos Aires',
    rol: 'Equipo profesional que revisó la metodología',
    frase: 'Su equipo profesional revisó la metodología de Timon y dijo que está muy buena.',
    textual: false,
    imagen: '/logos/universities/uba.svg',
    ejemplo: false,
  },
]

/** Los números que acompañan al bloque de confianza (brief de Feli). */
export const CATALOGO = { carreras: 300, universidades: 50 }

/** Lo que te devuelve Timon, cada uno con una captura de la app real. */
export const RESULTADO = [
  {
    titulo: 'Tu perfil personal',
    texto:
      'Una descripción detallada de cómo sos, a partir de tus respuestas: cómo pensás, qué te mueve y qué te da energía.',
    imagen: '/resultado/perfil.jpg',
  },
  {
    titulo: 'Las 6 carreras que van con vos, y de qué vas a trabajar',
    texto:
      'Las de mayor afinidad, con duración, plan de estudios, salida laboral, sueldos y demanda. Y por qué encaja cada una: qué va con vos y qué no.',
    imagen: '/resultado/carreras.jpg',
  },
  {
    titulo: 'Dónde estudiarlas',
    texto:
      'Universidades públicas y privadas de todo el país, con modalidad, costos y posibilidades de beca. Y un buscador con todas las carreras, que podés usar desde el primer día.',
    imagen: '/resultado/universidades.jpg',
  },
  {
    titulo: 'Si querés, lo repasás con un profesional',
    texto: 'Una devolución de tu resultado con un profesional, para pasar del informe a los próximos pasos.',
    imagen: '/resultado/profesional.jpg',
  },
]

/** Los tres pasos. Sin plazo: cada uno lo hace a su ritmo. */
export const PASOS = [
  {
    titulo: 'Creás tu cuenta gratis',
    texto: 'Desde el celular o la compu. No hace falta tarjeta.',
  },
  {
    titulo: 'Hacés el recorrido a tu ritmo',
    texto:
      'Son módulos cortos sobre tus intereses, tu forma de pensar y tu historia. No hay respuestas correctas. Te recomendamos hacerlo en 3 o 4 etapas.',
  },
  {
    titulo: 'Timon te devuelve tu resultado',
    texto:
      'Cruzamos tus respuestas con todas las carreras del país. Ves gratis la primera parte de tu perfil, y con el informe completo, tus carreras y dónde estudiarlas.',
  },
]

/**
 * Cierre al estilo del workshop de acquisition.com/o-vegas (pedido de Nico,
 * 30/10/2026): "lo que dicen" → "lo que te llevás" #1/#2/#3 → un botón. Vende
 * el programa, no la app. Solo lo que existe hoy: el informe, el módulo de
 * profesiones (16 áreas, con profesionales virtuales: por eso no dice
 * "hablás con profesionales") y la revisión con un profesional.
 *
 * Las partes resaltadas van entre ==dobles iguales==.
 */
export const LO_QUE_DICEN: { quien: string; rol: string; texto: string }[] = [
  {
    quien: 'Psicopedagoga',
    rol: 'Evaluó la metodología de Timon',
    texto: '==“Es una visión integral, no un simple test.”==',
  },
  {
    quien: 'Colegio María Guadalupe',
    rol: 'Lo probaron sus alumnos de 5° y 6° año',
    texto: 'Los alumnos lo probaron, ==les gustó== y dijeron que ==está muy bueno==.',
  },
  {
    quien: 'Universidad de Buenos Aires',
    rol: 'Equipo profesional',
    texto: 'Su equipo revisó la metodología de Timon y dijo que ==está muy buena==.',
  },
]

/** Los números de la presentación (timon_presentacion_v2_1). */
export const NUMEROS_PRUEBA = [
  { valor: '13', texto: 'módulos' },
  { valor: '10', texto: 'dimensiones de análisis' },
  { valor: '300', texto: 'carreras en 50 universidades' },
  { valor: '~10.000', texto: 'combinaciones analizadas' },
]

export const PROGRAMA = [
  {
    n: '#1: Tu Informe Personal',
    foto: '/programa/oferta-informe.jpg',
    texto: 'Tu perfil y tus 6 carreras más compatibles, ==por qué van con vos==, dónde estudiarlas y de qué vas a trabajar.',
  },
  {
    n: '#2: Las Profesiones por Dentro',
    foto: '/programa/oferta-profesional.jpg',
    texto: 'Recorrés 16 áreas de trabajo para ver ==cómo es un día real== en cada profesión antes de elegir.',
  },
  {
    n: '#3: Tus Próximos Pasos',
    foto: '/programa/bono-llamada.jpg',
    texto: 'Si querés, repasás tu resultado con un profesional y salís con ==pasos concretos== para decidir.',
  },
]
