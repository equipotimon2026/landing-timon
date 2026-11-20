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
 */

export type Pregunta = { q: string; a: string }

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
}

export const COPY_BASE: CopyHome = {
  metaTitulo: 'Programa Timon: para que tu hijo elija carrera con claridad',
  metaDescripcion:
    'Elegir carrera es difícil. Con profesionales, universidades y empresas, tu hijo o hija entiende sus opciones y decide con claridad. Dos semanas, desde casa.',
  heroTitular: 'Antes de elegir, que vea hacia dónde va **el\u00a0mundo**.',
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
