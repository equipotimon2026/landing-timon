/**
 * Datos compartidos por las dos variantes de la red (red-a y red-b): la gente,
 * los lugares y las fechas que Timon le acerca a tu hijo. Todo es ficticio: no
 * hay logos ni nombres de instituciones reales, solo descripciones ("una
 * fintech de Córdoba") y escudos y marcas inventados.
 *
 * La geometría de los avatares también vive acá, como datos: cada variante
 * tiene su propio renderer pero dibuja las mismas personas.
 */

export const C = {
  navy: '#0f1f36',
  ocean: '#1e5ba0',
  oceanClaro: '#4f84c2',
  terra: '#c97f5e',
  terraHondo: '#a8603f',
  crema: '#f5ede0',
  cielo: '#dfeaf6',
  durazno: '#f7e3d7',
  arena: '#fbf7f0',
} as const

/* ── Avatares ──────────────────────────────────────────────────────────── */

export type Pelo = 'corto' | 'largo' | 'rodete' | 'rulos' | 'rapado' | 'melena'

export type Rasgos = {
  piel: string
  pelo: Pelo
  colorPelo: string
  ropa: string
  fondo: string
  anteojos?: boolean
}

/** Trazos de un avatar plano en un viewBox de 64: hombros, cuello, cabeza y pelo. */
export const AVATAR = {
  hombros: 'M7 68c0-14 11-22 25-22s25 8 25 22z',
  cuello: 'M27.6 36h8.8v10.2c-2.2 2.1-6.6 2.1-8.8 0z',
  cabeza: { cx: 32, cy: 28.5, rx: 10.4, ry: 12 },
  orejas: [
    { cx: 21.8, cy: 30 },
    { cx: 42.2, cy: 30 },
  ],
  /** Capa de atrás (va antes de la cabeza) y capa de adelante, por peinado. */
  pelo: {
    corto: { atras: '', adelante: 'M21.3 29.5c-1.4-9.6 4-15.3 10.9-15.3 7.2 0 12.4 5.4 11 15.3-1.3-4.4-3.2-6.9-6-8.1-3.6 1.9-9 2.2-12.6.9-1.8 1.4-2.8 3.9-3.3 7.2z' },
    rapado: { atras: '', adelante: 'M21.7 27.6c.5-7.6 4.9-11.6 10.3-11.6s9.8 4 10.3 11.6c-2.6-3.1-6.1-4.5-10.3-4.5s-7.7 1.4-10.3 4.5z' },
    largo: {
      atras: 'M19.4 32c-.8-11.6 4.6-17.6 12.6-17.6S45.4 20.4 44.6 32l1.4 15.5c-4.6 2.4-23.4 2.4-28 0z',
      adelante: 'M21.4 28.8c-.3-8.4 4.4-13 10.6-13s10.9 4.6 10.6 13c-3.4-3.8-7.2-6.4-12-7-2.6 3-5.6 5.4-9.2 7z',
    },
    melena: {
      atras: 'M19.8 31.5c-.9-11.2 4.6-17 12.2-17s13.1 5.8 12.2 17l.6 6.8c-2.8 1.9-5.4 2.5-8.4 2.2V30.7H27.6v9.8c-3 .3-5.6-.3-8.4-2.2z',
      adelante: 'M21.4 29c-.2-8.2 4.6-12.9 10.6-12.9S42.8 20.8 42.6 29c-4.4-1.6-9-4.4-11.4-7.6-1.8 3.4-5.4 6.2-9.8 7.6z',
    },
    rodete: {
      atras: 'M26.8 13.4a5.2 5.2 0 1 0 10.4 0 5.2 5.2 0 1 0-10.4 0',
      adelante: 'M21.4 28.6c0-8.4 4.6-12.8 10.6-12.8s10.6 4.4 10.6 12.8c-2.2-4.3-6.1-6.4-10.6-6.4s-8.4 2.1-10.6 6.4z',
    },
    rulos: { atras: '', adelante: '' },
  } satisfies Record<Pelo, { atras: string; adelante: string }>,
  /** Rulos: círculos superpuestos en vez de un trazo. */
  rulos: [
    [22.6, 23.4, 4.6],
    [26.4, 18.2, 5],
    [32, 16, 5.4],
    [37.6, 18.2, 5],
    [41.4, 23.4, 4.6],
    [21.4, 28.4, 3.2],
    [42.6, 28.4, 3.2],
  ] as [number, number, number][],
}

/** Oscurece un color hex un porcentaje (para el cuello y las sombras de piel). */
export function oscurecer(hex: string, cuanto = 0.12) {
  const n = parseInt(hex.slice(1), 16)
  const f = (v: number) => Math.max(0, Math.round(v * (1 - cuanto)))
  const r = f((n >> 16) & 255)
  const g = f((n >> 8) & 255)
  const b = f(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

const PIEL = ['#f3d2b3', '#e5b48e', '#c98d64', '#9c6644', '#f0c6a0'] as const

/* ── La red ────────────────────────────────────────────────────────────── */

export type Profesional = { id: string; nombre: string; oficio: string; linea: string; rasgos: Rasgos }
export type Emblema = 'libro' | 'columnas' | 'estrella' | 'olas'
export type Universidad = { id: string; titulo: string; linea: string; emblema: Emblema; color: string }
export type Marca = 'circulos' | 'arco' | 'hoja' | 'triangulo'
export type Empresa = { id: string; titulo: string; linea: string; marca: Marca; color: string; fondo: string }
export type Evento = { id: string; titulo: string; dia: string; fecha: string; mes: string; numero: string; lugar: string }

export const HIJO: Rasgos = { piel: PIEL[1], pelo: 'corto', colorPelo: '#3b2a20', ropa: C.ocean, fondo: C.cielo }
export const HIJA: Rasgos = { piel: PIEL[0], pelo: 'largo', colorPelo: '#5a3a26', ropa: C.terra, fondo: C.durazno }

export const PROFESIONALES: Profesional[] = [
  {
    id: 'lucia',
    nombre: 'Lucía',
    oficio: 'Ingeniera en sistemas',
    linea: '«Te cuento cómo es un martes de verdad»',
    rasgos: { piel: PIEL[0], pelo: 'rodete', colorPelo: '#2a1d17', ropa: C.ocean, fondo: C.cielo, anteojos: true },
  },
  {
    id: 'martin',
    nombre: 'Martín',
    oficio: 'Arquitecto',
    linea: '«Vení el jueves, te muestro la obra»',
    rasgos: { piel: PIEL[2], pelo: 'corto', colorPelo: '#1f1a17', ropa: C.terra, fondo: C.durazno },
  },
  {
    id: 'sofia',
    nombre: 'Sofía',
    oficio: 'Médica pediatra',
    linea: '«Una guardia, sin filtro de serie»',
    rasgos: { piel: PIEL[3], pelo: 'rulos', colorPelo: '#1b1512', ropa: C.navy, fondo: C.crema },
  },
  {
    id: 'joaquin',
    nombre: 'Joaquín',
    oficio: 'Contador',
    linea: '«No es solo impuestos, te juro»',
    rasgos: { piel: PIEL[4], pelo: 'rapado', colorPelo: '#6b4a32', ropa: C.oceanClaro, fondo: C.cielo, anteojos: true },
  },
  {
    id: 'valentina',
    nombre: 'Valentina',
    oficio: 'Diseñadora de producto',
    linea: '«Te muestro un proyecto de punta a punta»',
    rasgos: { piel: PIEL[1], pelo: 'melena', colorPelo: '#8a5a33', ropa: C.terraHondo, fondo: C.durazno },
  },
]

export const UNIVERSIDADES: Universidad[] = [
  { id: 'publica', titulo: 'Ingeniería en una pública', linea: 'Córdoba · te abren el laboratorio', emblema: 'columnas', color: C.ocean },
  { id: 'privada', titulo: 'Diseño en una privada', linea: 'CABA · una clase de taller abierta', emblema: 'estrella', color: C.terra },
  { id: 'litoral', titulo: 'Medicina en el Litoral', linea: 'Santa Fe · charla con estudiantes', emblema: 'olas', color: C.navy },
]

export const EMPRESAS: Empresa[] = [
  { id: 'fintech', titulo: 'Una fintech de Córdoba', linea: 'Una semana con el equipo de producto', marca: 'circulos', color: C.ocean, fondo: C.cielo },
  { id: 'estudio', titulo: 'Un estudio de arquitectura en Rosario', linea: 'Maquetas, obra y mate', marca: 'arco', color: C.terra, fondo: C.durazno },
  { id: 'bodega', titulo: 'Una bodega en Luján de Cuyo', linea: 'La cosecha, desde adentro', marca: 'hoja', color: C.navy, fondo: C.crema },
]

/* Fechas reales del calendario 2026: el 21/11 es sábado, el 26/11 jueves y el 4/12 viernes. */
export const EVENTOS: Evento[] = [
  { id: 'feria', titulo: 'Feria de carreras', dia: 'sáb', fecha: '21/11', mes: 'nov', numero: '21', lugar: '40 facultades en un mismo lugar' },
  { id: 'charla', titulo: 'Charla con ingenieras', dia: 'jue', fecha: '26/11', mes: 'nov', numero: '26', lugar: 'Online, a la vuelta del colegio' },
  { id: 'hospital', titulo: 'Un día en un hospital', dia: 'vie', fecha: '4/12', mes: 'dic', numero: '4', lugar: 'Rosario, de la mano de una residente' },
]
