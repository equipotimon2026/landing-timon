import type { Rasgos } from './Avatar'

export type Persona = {
  id: string
  nombre: string
  edad: number
  rol: string
  estudio: string
  rasgos: Rasgos
}

const C = { cielo: '#dfeaf6', durazno: '#f7e3d7', crema: '#f5ede0', hielo: '#e6eef6', salvia: '#e4ece4' }
const PIEL = ['#f3d2b5', '#e4b28c', '#c98f66', '#9a6444', '#f6dcc6'] as const
const PELO = { negro: '#22170f', castano: '#5b3a23', navy: '#0f1f36', cobre: '#a8603f', rubio: '#d4ac7c' }

/**
 * El abanico, de izquierda a derecha: profesionales ficticios. La del medio
 * queda adelante. Sofi, Caro y Martín son los que retoma la sección siguiente.
 */
export const ABANICO: Persona[] = [
  {
    id: 'valen',
    nombre: 'Valen',
    edad: 33,
    rol: 'Psicóloga en una escuela de Neuquén',
    estudio: 'Psicología, 5 años',
    rasgos: { fondo: C.hielo, piel: PIEL[3], pelo: PELO.negro, ropa: '#4f84c2', peinado: 'rulos' },
  },
  {
    id: 'caro',
    nombre: 'Caro',
    edad: 31,
    rol: 'Médica residente en un hospital público',
    estudio: 'Medicina, 6 años y residencia',
    rasgos: { fondo: C.durazno, piel: PIEL[2], pelo: PELO.negro, ropa: '#ffffff', peinado: 'rodete' },
  },
  {
    id: 'sofi',
    nombre: 'Sofi',
    edad: 29,
    rol: 'Ingeniera en una fintech de Córdoba',
    estudio: 'Ingeniería en sistemas, 5 años',
    rasgos: { fondo: C.cielo, piel: PIEL[0], pelo: PELO.castano, ropa: '#1e5ba0', peinado: 'largo' },
  },
  {
    id: 'martin',
    nombre: 'Martín',
    edad: 35,
    rol: 'Diseñador en un estudio de Rosario',
    estudio: 'Diseño industrial, 5 años',
    rasgos: { fondo: C.crema, piel: PIEL[1], pelo: PELO.navy, ropa: '#c97f5e', peinado: 'corto', anteojos: true, barba: true },
  },
  {
    id: 'tomas',
    nombre: 'Tomás',
    edad: 27,
    rol: 'Agrónomo en una cooperativa de Pergamino',
    estudio: 'Agronomía, 5 años',
    rasgos: { fondo: C.salvia, piel: PIEL[4], pelo: PELO.rubio, ropa: '#0f1f36', peinado: 'rapado' },
  },
]
