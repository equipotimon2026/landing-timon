import type { Corte } from '../app-datos'

/**
 * Contenido de /explora-hero/ramp: la página con el formato de ramp.com
 * (docs/referencias-hero/ramp.md) y el sistema de diseño de Timon.
 *
 * Solo datos reales: los números salen de lib/landing.ts (presentación
 * timon_presentacion_v2_1) y de la home, las citas de LO_QUE_DICEN, los módulos
 * de lo que existe en la app (repo timon, revisado el 14/11/2026). Las
 * pantallas son recortes de las capturas de /public/app (datos de demo).
 */

const mac = (nombre: string, x: number, y: number, w: number, h: number): Corte => ({
  src: `/app/mac-${nombre}.webp`,
  ancho: 1800,
  alto: 1125,
  x,
  y,
  w,
  h,
})

export const CORTES = {
  esencia: mac('informe', 680, 400, 800, 600),
  camino: mac('test', 330, 320, 1140, 580),
  perfil: mac('test', 340, 132, 1122, 92),
  vosColegio: mac('test', 850, 568, 620, 110),
  otraMirada: mac('test', 850, 988, 630, 128),
  valentina: mac('investigacion', 1056, 561, 304, 232),
  areas: mac('investigacion', 440, 200, 920, 600),
  uba: mac('comparador', 600, 740, 960, 200),
  alineada: mac('comparador', 1340, 770, 200, 60),
  comparador: mac('comparador', 600, 430, 960, 520),
  filtros: mac('comparador', 600, 440, 960, 200),
  indice: mac('informe', 180, 100, 340, 480),
  diego: mac('investigacion', 1061, 331, 294, 220),
  ramiro: mac('investigacion', 445, 331, 294, 220),
}

/**
 * Lugares de trabajo de un área, tal como los cuenta el módulo de
 * profesionales de la app (lib/mundos.ts, campo "donde"). Es lo más cerca de
 * "empresas" que hoy muestra el producto: no hay empresas con nombre.
 * [CONFIRMAR] si "empresas" de la red existe como tal.
 */
export const DONDE_SALUD = {
  area: 'Salud',
  lugares: 'Hospitales públicos y privados, clínicas y sanatorios, laboratorios.',
}

/**
 * El mundo que cambia. Dos cifras del World Economic Forum, Future of Jobs
 * Report 2025 (enero de 2025): verificar la cita textual antes de publicar.
 * La tercera queda para completar con un dato argentino con fuente.
 */
export const CAMBIO = [
  {
    cifra: '39 %',
    texto: 'de las habilidades que hoy pide el trabajo va a cambiar o quedar vieja de acá a 2030.',
    fuente: 'World Economic Forum, Future of Jobs Report 2025',
  },
  {
    cifra: '170 M',
    texto: 'de puestos nuevos se van a crear en el mundo hasta 2030, y 92 millones van a desaparecer.',
    fuente: 'World Economic Forum, Future of Jobs Report 2025',
  },
  {
    cifra: '[DATO]',
    texto: '[DATO: fuente] Cuántos chicos en Argentina abandonan o cambian la carrera que eligieron.',
    fuente: '[DATO: fuente]',
  },
]

/** La tira de números bajo el escenario (lib/landing.ts y la home). */
export const NUMEROS = [
  { etiqueta: 'Áreas de trabajo', valor: '16' },
  { etiqueta: 'Carreras', valor: '300' },
  { etiqueta: 'Universidades', valor: '50' },
  { etiqueta: 'Paradas para conocerse', valor: '13' },
  { etiqueta: 'Dimensiones de análisis', valor: '10' },
  { etiqueta: 'Combinaciones analizadas', valor: '10000', prefijo: '+' },
]

/** Las 16 áreas del catálogo (lib/mundos.ts), en corto, para la grilla de prueba. */
export const AREAS_CORTAS = [
  'Salud',
  'Ingeniería',
  'Tecnología',
  'Negocios',
  'Derecho',
  'Arquitectura',
  'Comunicación',
  'Arte y diseño',
  'Educación',
  'Ciencias exactas',
  'Ambiente y agro',
  'Deporte',
]

export const CITA_PSICOPEDAGOGA = {
  texto: 'Es una visión integral, no un simple test.',
  quien: 'Psicopedagoga',
  rol: 'Evaluó la metodología de Timon',
}

/**
 * La red y cómo entra tu hijo: los módulos que existen hoy en la app, contados
 * como el medio para llegar a la red. Comunidad no existe: no se muestra.
 */
export const MODULOS = [
  {
    id: 'profesionales',
    titulo: 'Profesionales de 16 áreas.',
    gris: 'Les pregunta lo que quiera y ve cómo es el trabajo por dentro.',
    corte: CORTES.areas,
    grande: true,
  },
  {
    id: 'universidades',
    titulo: 'Universidades.',
    gris: 'Las compara por cuota, modalidad y zona, y ve cuáles van con su perfil.',
    corte: CORTES.comparador,
    grande: true,
  },
  {
    id: 'test',
    titulo: 'Su perfil.',
    gris: 'Trece paradas cortas para saber por dónde entrar a la red.',
    corte: CORTES.camino,
  },
  {
    id: 'informe',
    titulo: 'Su informe.',
    gris: 'Quién es, qué carreras van con él y dónde estudiarlas.',
    corte: CORTES.esencia,
  },
  {
    id: 'mirada',
    titulo: 'Otra mirada.',
    gris: 'Alguien que lo conoce bien suma lo que ve de él.',
    corte: CORTES.otraMirada,
  },
]

/**
 * El recorrido guiado del hero. La charla usa el relato real del profesional
 * virtual de Salud en la app (lib/mundos.ts, campo "dia").
 */
export const PASOS_HERO = {
  charla:
    'Consultorio a la mañana: pacientes de a uno, escuchar, revisar, pedir estudios, ajustar tratamientos. Algunos días hago guardia en el hospital, donde todo es más impredecible y se trabaja contra reloj.',
  pasos: [
    { corto: 'Cuenta qué le gusta', titulo: 'Tu hijo cuenta qué le gusta.', bajada: 'Elige las áreas que le atraen entre 16.' },
    {
      corto: 'Habla con profesionales',
      titulo: 'Habla con profesionales que viven esa carrera.',
      bajada: 'Les pregunta lo que quiera, como en una charla.',
    },
    {
      corto: 'Conoce universidades y empresas',
      titulo: 'Conoce universidades y empresas.',
      bajada: 'Compara dónde estudiar y ve dónde se trabaja.',
    },
    {
      corto: 'Se lleva su informe',
      titulo: 'Se lleva su informe y queda conectado.',
      bajada: 'Quién es, qué carreras van con él y su red.',
    },
  ],
}
