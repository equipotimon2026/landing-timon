import { MUNDOS } from '@/lib/mundos'

/**
 * Las cuatro áreas que recorre el hero D. Cada una es una cadena real de
 * Timon: la pregunta que el chico se contesta en el test (src/lib/test.ts),
 * una verdad del oficio que cuenta el profesional de esa área y dónde se
 * trabaja (catálogo de la app, src/lib/mundos.ts), y una carrera del catálogo
 * con una universidad argentina que la dicta de verdad.
 */
export type AreaHero = {
  id: string
  nombre: string
  pregunta: string
  verdad: string
  donde: string
  carrera: string
  universidad: string
}

const ELEGIDAS = [
  {
    id: 'tecnologia',
    corto: 'Tecnología',
    pregunta: 'Entender cómo funciona algo hasta el fondo',
    verdad: 0,
    lugares: 4,
    carrera: 'Ingeniería en Sistemas de Información',
    universidad: 'Universidad Tecnológica Nacional',
  },
  {
    id: 'salud',
    corto: 'Salud',
    pregunta: 'Cuidar a otros o acompañar a alguien que lo necesita',
    verdad: 1,
    lugares: 4,
    carrera: 'Medicina',
    universidad: 'Universidad de Buenos Aires',
  },
  {
    id: 'arquitectura',
    corto: 'Arquitectura',
    pregunta: 'Dibujar, diseñar o crear algo visual',
    verdad: 0,
    lugares: 3,
    carrera: 'Arquitectura y Urbanismo',
    universidad: 'Universidad Nacional de La Plata',
  },
  {
    id: 'negocios',
    corto: 'Negocios',
    pregunta: 'Convencer a otros de una idea',
    verdad: 2,
    lugares: 4,
    carrera: 'Economía',
    universidad: 'Universidad Torcuato Di Tella',
  },
] as const

/** Los primeros `n` lugares de la lista del catálogo, cerrados con punto. */
function primeros(texto: string, n: number) {
  return `${texto.split(' — ')[0].split(', ').slice(0, n).join(', ')}.`
}

export const AREAS_HERO: AreaHero[] = ELEGIDAS.map((e) => {
  const mundo = MUNDOS.find((m) => m.id === e.id)
  if (!mundo) throw new Error(`Falta el mundo ${e.id} en el catálogo`)
  return {
    id: e.id,
    nombre: e.corto,
    pregunta: e.pregunta,
    verdad: mundo.verdades[e.verdad],
    donde: primeros(mundo.donde, e.lugares),
    carrera: e.carrera,
    universidad: e.universidad,
  }
})
