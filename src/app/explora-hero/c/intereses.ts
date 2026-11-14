import { MUNDOS } from '@/lib/mundos'
import type { RetratoTipo } from './Retrato'

/**
 * Lo que se despliega en el hero C al tocar un interés. Las carreras salen del
 * catálogo real (src/lib/mundos.ts); las personas, sus días y los lugares son
 * ficticios y genéricos, a modo de ejemplo.
 */
export type Interes = {
  id: string
  /** Cómo se lee en el botón, en minúscula. */
  etiqueta: string
  mundo: string
  carreras: string[]
  persona: {
    nombre: string
    oficio: string
    lugar: string
    retrato: RetratoTipo
    dia: { hora: string; que: string }[]
  }
  estudia: { donde: string; detalle: string }
  trabaja: string
}

export const INTERESES: Interes[] = [
  {
    id: 'animales',
    etiqueta: 'los animales',
    mundo: 'ecologia',
    carreras: ['Veterinaria y Zootecnia', 'Producción Agropecuaria', 'Biología'],
    persona: {
      nombre: 'Lucía',
      oficio: 'veterinaria rural',
      lugar: 'Tandil',
      retrato: 'lucia',
      dia: [
        { hora: '6:00', que: 'Mate y a la ruta: hoy toca recorrer tambos' },
        { hora: '11:30', que: 'Vacuna 300 terneros (ninguno colabora)' },
        { hora: '18:00', que: 'Cierra el día con los perros y gatos del pueblo' },
      ],
    },
    estudia: { donde: 'Facultad de Ciencias Veterinarias', detalle: 'Universidad pública, 5 años con prácticas en el campo' },
    trabaja: 'Un tambo, una clínica rural o un laboratorio de vacunas',
  },
  {
    id: 'tecnologia',
    etiqueta: 'la compu',
    mundo: 'tecnologia',
    carreras: ['Desarrollo de Software y Programación', 'Ciencia de Datos y Analítica', 'Ciberseguridad e Informática'],
    persona: {
      nombre: 'Nahuel',
      oficio: 'programador',
      lugar: 'Bariloche',
      retrato: 'nahuel',
      dia: [
        { hora: '9:00', que: 'Reunión con su equipo de tres países (él, en ojotas)' },
        { hora: '11:00', que: 'Programa la app que usan 2.000 camioneros' },
        { hora: '16:00', que: 'Revisa el código de una compañera y aprende un truco' },
      ],
    },
    estudia: { donde: 'Universidad tecnológica', detalle: 'Pública o privada, 5 años, o una tecnicatura de 3' },
    trabaja: 'Una empresa de software o una startup, muchas veces desde casa',
  },
  {
    id: 'plata',
    etiqueta: 'los números',
    mundo: 'negocios',
    carreras: ['Contabilidad y Contador Público', 'Economía', 'Finanzas y Mercados'],
    persona: {
      nombre: 'Carolina',
      oficio: 'contadora',
      lugar: 'Mendoza',
      retrato: 'carolina',
      dia: [
        { hora: '8:00', que: 'Revisa los números de una bodega familiar' },
        { hora: '12:30', que: 'Almuerza con un cliente que quiere vender vino a Brasil' },
        { hora: '16:00', que: 'Arma el plan para que una pyme crezca sin endeudarse' },
      ],
    },
    estudia: { donde: 'Facultad de Ciencias Económicas', detalle: 'Pública o privada, 5 años' },
    trabaja: 'Un estudio contable, un banco o el área de finanzas de una empresa',
  },
  {
    id: 'problemas',
    etiqueta: 'desarmar cosas',
    mundo: 'ingenieria',
    carreras: ['Ingeniería Industrial y Producción', 'Ingeniería Mecánica y Mecatrónica', 'Ingeniería en Alimentos'],
    persona: {
      nombre: 'Valentina',
      oficio: 'ingeniera industrial',
      lugar: 'Rafaela',
      retrato: 'valentina',
      dia: [
        { hora: '7:30', que: 'Casco puesto, recorre una planta de lácteos' },
        { hora: '11:00', que: 'Descubre por qué se frena una máquina (era un tornillo)' },
        { hora: '15:00', que: 'Rearma los turnos y la planta produce un 20 % más' },
      ],
    },
    estudia: { donde: 'Facultad de Ingeniería', detalle: 'Pública o privada, 5 años' },
    trabaja: 'Una fábrica, una petrolera o una empresa de logística',
  },
  {
    id: 'ayudar',
    etiqueta: 'ayudar a los demás',
    mundo: 'salud',
    carreras: ['Kinesiología y Fisioterapia', 'Terapia Ocupacional', 'Enfermería'],
    persona: {
      nombre: 'Sol',
      oficio: 'kinesióloga',
      lugar: 'Córdoba',
      retrato: 'sol',
      dia: [
        { hora: '7:00', que: 'Entrena al vóley de un club de barrio' },
        { hora: '10:00', que: 'Un abuelo operado de cadera da sus primeros pasos' },
        { hora: '15:00', que: 'Consultorio en un centro de salud del barrio' },
      ],
    },
    estudia: { donde: 'Facultad de Ciencias Médicas', detalle: 'Universidad pública, 5 años con prácticas en hospitales' },
    trabaja: 'Un club, un hospital o su propio consultorio',
  },
  {
    id: 'dibujar',
    etiqueta: 'dibujar en los márgenes',
    mundo: 'arte',
    carreras: ['Diseño Gráfico y Comunicación Visual', 'Diseño Industrial', 'Animación y Arte Digital'],
    persona: {
      nombre: 'Bruno',
      oficio: 'diseñador de packaging',
      lugar: 'Rosario',
      retrato: 'bruno',
      dia: [
        { hora: '9:30', que: 'Llena hojas de bocetos para una marca de yerba' },
        { hora: '14:00', que: 'Pelea un tono de verde en la imprenta' },
        { hora: '17:00', que: 'Presenta tres ideas; eligen la que menos le gustaba' },
      ],
    },
    estudia: { donde: 'Escuela de diseño', detalle: 'Pública o privada, 4 años de taller' },
    trabaja: 'Un estudio de diseño, una agencia o una editorial',
  },
]

/** Nombre del área y cuántas carreras más tiene, del catálogo real. */
export function datosArea(mundo: string, mostradas: number) {
  const m = MUNDOS.find((x) => x.id === mundo)
  const total = m ? m.submundos.reduce((n, s) => n + s.carreras.length, 0) : mostradas
  return { area: m?.nombre ?? '', mas: Math.max(total - mostradas, 0) }
}
