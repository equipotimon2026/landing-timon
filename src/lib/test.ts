import { MUNDOS } from './mundos'

/**
 * El lead magnet: "Test de Intereses" (pedido de Nico, 26/10/2026: algo gratis
 * que te ayude a ver en qué áreas están tus fuertes o intereses).
 *
 * Una versión corta del modelo de Holland (RIASEC), que es público y es uno de
 * los que usa el recorrido completo. 18 actividades, 3 por tipo, de 0 a 3. El
 * resultado son tus tres tipos más fuertes y los mundos del catálogo que suelen
 * ir con ellos. PENDIENTE: que una psicopedagoga revise las preguntas y el
 * cruce tipo → mundo antes de publicar.
 */

export type Tipo = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

export const TIPOS: Record<Tipo, { nombre: string; texto: string }> = {
  R: { nombre: 'Hacer', texto: 'Te gusta lo concreto: armar, arreglar, moverte y ver el resultado con tus manos.' },
  I: { nombre: 'Investigar', texto: 'Te gusta entender cómo funcionan las cosas hasta el fondo y resolver problemas difíciles.' },
  A: { nombre: 'Crear', texto: 'Te gusta inventar, diseñar y expresarte, mejor si es sin reglas fijas.' },
  S: { nombre: 'Ayudar', texto: 'Te gusta estar con gente: acompañar, explicar, cuidar y trabajar en equipo.' },
  E: { nombre: 'Liderar', texto: 'Te gusta convencer, organizar y llevar adelante proyectos propios.' },
  C: { nombre: 'Organizar', texto: 'Te gusta el orden, los números que cierran y los planes prolijos.' },
}

export const ACTIVIDADES: { tipo: Tipo; texto: string }[] = [
  { tipo: 'R', texto: 'Armar o arreglar cosas con las manos' },
  { tipo: 'I', texto: 'Entender cómo funciona algo hasta el fondo' },
  { tipo: 'A', texto: 'Dibujar, diseñar o crear algo visual' },
  { tipo: 'S', texto: 'Ayudar a alguien con un problema' },
  { tipo: 'E', texto: 'Convencer a otros de una idea' },
  { tipo: 'C', texto: 'Ordenar información en planillas o listas' },
  { tipo: 'R', texto: 'Trabajar al aire libre, en el campo o en una obra' },
  { tipo: 'I', texto: 'Hacer experimentos o resolver problemas de lógica' },
  { tipo: 'A', texto: 'Escribir, actuar, hacer música o videos' },
  { tipo: 'S', texto: 'Explicarle algo a otra persona hasta que lo entienda' },
  { tipo: 'E', texto: 'Organizar un evento o liderar un grupo' },
  { tipo: 'C', texto: 'Seguir un plan prolijo y detallado' },
  { tipo: 'R', texto: 'Usar herramientas, máquinas o tecnología física' },
  { tipo: 'I', texto: 'Investigar por qué pasan las cosas: el cuerpo, la naturaleza, el universo' },
  { tipo: 'A', texto: 'Inventar ideas nuevas para algo que ya existe' },
  { tipo: 'S', texto: 'Cuidar a otros o acompañar a alguien que lo necesita' },
  { tipo: 'E', texto: 'Vender algo o armar un emprendimiento propio' },
  { tipo: 'C', texto: 'Trabajar con números y que todo cierre' },
]

export const ESCALA = [
  { label: 'Me encanta', puntos: 3 },
  { label: 'Me gusta', puntos: 2 },
  { label: 'Me da igual', puntos: 1 },
  { label: 'No me gusta', puntos: 0 },
]

/** Qué tipos suelen ir con cada mundo del catálogo (cruce propio, a revisar). */
const MUNDO_TIPOS: Record<string, Tipo[]> = {
  negocios: ['E', 'C'],
  turismo: ['S', 'E'],
  exactas: ['I', 'C'],
  ingenieria: ['R', 'I'],
  tecnologia: ['I', 'C', 'R'],
  salud: ['I', 'S'],
  deporte: ['R', 'S'],
  ecologia: ['I', 'R'],
  humanidades: ['S', 'A'],
  juridicas: ['E', 'S', 'C'],
  defensa: ['R', 'S'],
  comunicacion: ['A', 'E'],
  audiovisual: ['A', 'R'],
  arte: ['A', 'R'],
  artes: ['A', 'S'],
  arquitectura: ['A', 'R', 'I'],
}

export type ResultadoTest = {
  porTipo: Record<Tipo, number>
  top: Tipo[]
  mundos: (typeof MUNDOS)[number][]
}

export function calcularTest(respuestas: number[]): ResultadoTest {
  const tipos = Object.keys(TIPOS) as Tipo[]
  const porTipo = Object.fromEntries(
    tipos.map((t) => {
      const idx = ACTIVIDADES.map((a, i) => (a.tipo === t ? i : -1)).filter((i) => i >= 0)
      const sum = idx.reduce((n, i) => n + (respuestas[i] ?? 0), 0)
      return [t, Math.round((sum / (idx.length * 3)) * 100)]
    }),
  ) as Record<Tipo, number>
  const top = [...tipos].sort((a, b) => porTipo[b] - porTipo[a]).slice(0, 3)
  const puntaje = (id: string) =>
    (MUNDO_TIPOS[id] ?? []).reduce((n, t, i) => n + porTipo[t] * (i === 0 ? 1 : 0.6), 0) /
    (MUNDO_TIPOS[id]?.length ?? 1)
  const mundos = [...MUNDOS].sort((a, b) => puntaje(b.id) - puntaje(a.id)).slice(0, 4)
  return { porTipo, top, mundos }
}
