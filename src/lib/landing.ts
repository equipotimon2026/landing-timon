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
export const LO_QUE_DICEN: { quien: string; rol: string; texto: string; imagen: string | null; fuente: string }[] = [
  {
    quien: 'Psicopedagoga',
    rol: 'Evaluó la metodología de Timon',
    texto: '==“Es una visión integral, no un simple test.”==',
    imagen: null,
    fuente: 'Evaluación de la metodología',
  },
  {
    quien: 'Colegio María Guadalupe',
    rol: 'Lo probaron sus alumnos de 5° y 6° año',
    texto: 'Los alumnos lo probaron, ==les gustó== y dijeron que ==está muy bueno==.',
    imagen: null,
    fuente: 'Prueba con alumnos',
  },
  {
    quien: 'Universidad de Buenos Aires',
    rol: 'Equipo profesional',
    texto: 'Su equipo revisó la metodología de Timon y dijo que ==está muy buena==.',
    imagen: '/logos/universities/uba.svg',
    fuente: 'Revisión de la metodología',
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
    foto: '/resultado/carreras.jpg',
    texto: 'Tu perfil y tus 6 carreras más compatibles, ==por qué van con vos==, dónde estudiarlas y de qué vas a trabajar.',
  },
  {
    n: '#2: Las Profesiones por Dentro',
    foto: '/resultado/profesiones.jpg',
    texto: 'Recorrés 16 áreas de trabajo para ver ==cómo es un día real== en cada profesión antes de elegir.',
  },
  {
    n: '#3: Tus Próximos Pasos',
    foto: '/resultado/profesional.jpg',
    texto: 'Si querés, repasás tu resultado con un profesional y salís con ==pasos concretos== para decidir.',
  },
]
