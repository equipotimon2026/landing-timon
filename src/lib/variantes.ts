/**
 * Textos de la home y de sus variantes por video de Instagram.
 *
 * Cada variante es la misma home, con el mismo formulario y el mismo flujo,
 * en su propia ruta: timonear.com/video1, timonear.com/video2, y así.
 * Para cambiar el copy de una variante, editá solo su bloque en VARIANTES:
 * lo que no pongas ahí sale igual que en la home (COPY_BASE).
 *
 * Para resaltar una parte de un titular, ponela entre **dobles asteriscos**.
 *
 * Para sumar una variante nueva alcanza con agregar su bloque acá: la ruta
 * /<nombre> aparece sola.
 *
 * Acá vive también el copy de /chicos (COPY_CHICOS): la misma home y los
 * mismos componentes, hablándole al chico en vez de al padre.
 */

import { URL_EMPEZAR } from '@/lib/landing'

export type Pregunta = { q: string; a: string }

/** A quién le habla la página. Define el botón y un par de textos. */
export type Publico = 'padres' | 'chicos'

/**
 * El botón principal: qué dice, a dónde lleva y qué aclara abajo. `corto` es
 * la versión que entra en la barra de arriba; si no está, usa `texto`.
 */
export type Accion = { texto: string; corto?: string; destino: string; micro: string }

export type CopyHome = {
  /** Título y descripción para Google y para cuando se comparte el link. */
  metaTitulo: string
  metaDescripcion: string
  heroTitular: string
  heroBajada: string
  dolorTitular: string
  redTitular: string
  redBajada: string
  appTitular: string
  paraVosTitular: string
  pruebaTitular: string
  formTitular: string
  formBajada: string
  preguntasTitular: string
  preguntas: Pregunta[]
  /** El botón que se repite en toda la página. */
  accion: Accion
}

export const COPY_BASE: CopyHome = {
  metaTitulo: 'Programa Timon: para que tu hijo elija carrera con claridad',
  metaDescripcion:
    'Elegir carrera es difícil. Con profesionales, universidades y empresas, tu hijo o hija entiende sus opciones y decide con claridad. Dos semanas, desde casa.',
  heroTitular: 'Ayudá a tu hijo a elegir su carrera, **sin elegir por\u00a0él**.',
  heroBajada: 'Profesionales, universidades y empresas lo ayudan a entender qué hay ahí afuera y a elegir con criterio.',
  dolorTitular: 'A los 17, elegir carrera es **difícil de verdad**.',
  redTitular: 'Que sepa cómo es trabajar de eso **antes de anotarse**.',
  redBajada: 'Así no decide por un folleto o por lo que le contó un amigo.',
  appTitular: 'Esto es lo que hace **tu hijo en Timon**.',
  paraVosTitular: 'Vos sabés en qué anda **sin tener que preguntarle**.',
  pruebaTitular: 'Se lo mostramos a gente **que sabe del tema**.',
  formTitular: 'Contanos de **tu hijo o hija**.',
  formBajada: 'Te escribimos por WhatsApp en menos de 24 h. Sin compromiso.',
  preguntasTitular: 'Lo que **suelen preguntarnos**.',
  preguntas: [
    {
      q: '¿Es otro test vocacional?',
      a: 'Arranca con unas paradas para conocerse, pero eso es solo el principio. Después investiga cómo se trabaja en cada área, recibe su informe y compara universidades.',
    },
    {
      q: '¿Mi hijo lo va a usar?',
      a: 'Cada parada dura menos de 10 minutos y se hace desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Además, vos ves si avanza.',
    },
    { q: '¿Cuánto cuesta?', a: 'Empezar es gratis. El precio depende del plan, y te lo contamos cuando te escribimos.' },
    {
      q: '¿Quién está detrás?',
      a: 'Somos Facu, Feli y Nico, de Argentina. Una psicopedagoga evaluó la metodología y un equipo profesional de la UBA la revisó.',
    },
    { q: '¿Puedo ver sus respuestas?', a: 'No. Lo que responde es suyo. Vos ves cómo avanza y el informe final.' },
  ],
  accion: {
    texto: 'Quiero anotar a mi hijo',
    corto: 'Anotalo',
    destino: '#anotalo',
    micro: 'Te escribimos en menos de 24 h. Sin compromiso.',
  },
}

/**
 * /chicos — la misma home, hablándole al chico que entró de casualidad
 * (pedido de Facundo, 20/11/2026: "si soy un pibe y entro acá, no sabría qué
 * hacer"). Mismo visual y mismos componentes: lo único que cambia son los
 * textos y el botón, que no manda al formulario de padres sino a crear la
 * cuenta en la app.
 */
export const COPY_CHICOS: CopyHome = {
  metaTitulo: 'Timon: mirá cómo se trabaja de cada carrera antes de elegir',
  metaDescripcion:
    'Elegir carrera a los 17 es difícil. Profesionales, universidades y empresas te muestran cómo es trabajar de eso. Lo hacés desde el celular, a tu ritmo, y empezás gratis.',
  heroTitular: 'Antes de elegir, mirá hacia dónde va **el\u00a0mundo**.',
  heroBajada:
    'Profesionales, universidades y empresas te ayudan a entender qué hay ahí afuera y a elegir con criterio.',
  dolorTitular: 'A los 17, elegir carrera es **difícil de verdad**.',
  redTitular: 'Enterate cómo es trabajar de eso **antes de anotarte**.',
  redBajada: 'Así no decidís por un folleto o por lo que te contó un amigo.',
  appTitular: 'Esto es lo que vas a hacer **en Timon**.',
  paraVosTitular: 'Lo hacés a tu ritmo y **lo que respondés es tuyo**.',
  pruebaTitular: 'Se lo mostramos a gente **que sabe del tema**.',
  formTitular: 'Arrancá cuando quieras. **Es gratis**.',
  formBajada: 'Creás la cuenta en un minuto, sin tarjeta, y seguís desde el celular.',
  preguntasTitular: 'Lo que **suelen preguntarnos**.',
  preguntas: [
    {
      q: '¿Es otro test vocacional?',
      a: 'Arranca con unas paradas para conocerte, pero eso es solo el principio. Después investigás cómo se trabaja en cada área, recibís tu informe y comparás universidades.',
    },
    {
      q: '¿Cuánto tiempo me lleva?',
      a: 'Cada parada dura menos de 10 minutos y la hacés desde el celular. Lo cortás y lo seguís cuando quieras.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Empezar es gratis y no pide tarjeta. Para el informe completo hay un plan, y eso lo deciden en tu casa.',
    },
    {
      q: '¿Mis viejos van a ver lo que respondo?',
      a: 'No. Lo que respondés es tuyo. Ellos ven cómo vas avanzando y el informe final.',
    },
    {
      q: '¿Quién está detrás?',
      a: 'Somos Facu, Feli y Nico, de Argentina. Una psicopedagoga evaluó la metodología y un equipo profesional de la UBA la revisó.',
    },
  ],
  accion: {
    texto: 'Empezá gratis',
    destino: URL_EMPEZAR,
    micro: 'No pide tarjeta. Lo hacés a tu ritmo.',
  },
}

/**
 * Una entrada por video. Por ahora las dos son iguales a la home: cambiá acá
 * los textos según lo que cuenta cada video.
 */
export const VARIANTES: Record<string, Partial<CopyHome>> = {
  video1: {
    // heroTitular: '...',
    // heroBajada: '...',
  },
  video2: {
    // heroTitular: '...',
    // heroBajada: '...',
  },
}

export const NOMBRES_VARIANTES = Object.keys(VARIANTES)

export function esVariante(nombre: string): boolean {
  return Object.prototype.hasOwnProperty.call(VARIANTES, nombre)
}

export function copyDe(variante?: string): CopyHome {
  if (!variante || !esVariante(variante)) return COPY_BASE
  return { ...COPY_BASE, ...VARIANTES[variante] }
}
