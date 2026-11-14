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
}

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

/** Los módulos que existen hoy en la app. Comunidad no existe: no se muestra. */
export const MODULOS = [
  {
    id: 'test',
    titulo: 'Se conoce',
    gris: 'en 13 paradas cortas, desde el celular.',
    corte: CORTES.camino,
    grande: true,
  },
  {
    id: 'profesionales',
    titulo: 'Charla con profesionales',
    gris: 'de 16 áreas y ve cómo es el trabajo por dentro.',
    corte: CORTES.areas,
    grande: true,
  },
  {
    id: 'informe',
    titulo: 'Su informe',
    gris: 'con quién es, sus carreras y dónde estudiarlas.',
    corte: CORTES.esencia,
  },
  {
    id: 'comparador',
    titulo: 'Compara universidades',
    gris: 'por cuota, modalidad y zona.',
    corte: CORTES.filtros,
  },
  {
    id: 'mirada',
    titulo: 'Otra mirada',
    gris: 'de alguien que lo conoce bien, sumada a su perfil.',
    corte: CORTES.otraMirada,
  },
]
