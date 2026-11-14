/**
 * La geometría del mapa del hero B: un nudo (el timón) debajo del botón y de
 * él salen dos haces de vías, a izquierda y derecha, que se abren una por una
 * hacia su destino, como un plano de subte. Las de arriba suben por el
 * costado del titular y las de abajo bajan; nunca se cruzan porque la que
 * dobla primero es la que llega más lejos. Del centro del nudo baja el
 * tronco hasta la pieza grande que se corta en el borde de la pantalla.
 *
 * Todo se calcula en píxeles reales del contenedor, así el trazo y el texto
 * tienen el mismo grosor en cualquier pantalla.
 */

export type Icono =
  | 'codigo'
  | 'salud'
  | 'edificio'
  | 'mente'
  | 'economia'
  | 'huella'
  | 'libro'
  | 'cocina'
  | 'diseno'
  | 'balanza'
  | 'datos'
  | 'comunicacion'
  | 'ciencia'
  | 'kine'
  | 'avion'
  | 'agro'

export type Destino = { texto: string; corto?: string; icono: Icono }

/** Un destino por cada una de las 16 áreas de trabajo; ocho por lado. */
const AMPLIA: Record<'izquierda' | 'derecha', { arriba: Destino[]; abajo: Destino[] }> = {
  izquierda: {
    arriba: [
      { texto: 'Ingeniería en sistemas', icono: 'codigo' },
      { texto: 'Medicina', icono: 'salud' },
      { texto: 'Arquitectura', icono: 'edificio' },
      { texto: 'Psicología', icono: 'mente' },
      { texto: 'Economía', icono: 'economia' },
    ],
    abajo: [
      { texto: 'Veterinaria', icono: 'huella' },
      { texto: 'Profesorado de historia', icono: 'libro' },
      { texto: 'Cocina profesional', icono: 'cocina' },
    ],
  },
  derecha: {
    arriba: [
      { texto: 'Diseño industrial', icono: 'diseno' },
      { texto: 'Abogacía', icono: 'balanza' },
      { texto: 'Ciencia de datos', icono: 'datos' },
      { texto: 'Comunicación', icono: 'comunicacion' },
      { texto: 'Biotecnología', icono: 'ciencia' },
    ],
    abajo: [
      { texto: 'Kinesiología', icono: 'kine' },
      { texto: 'Piloto de avión', icono: 'avion' },
      { texto: 'Agronomía', icono: 'agro' },
    ],
  },
}

const COMPACTA: Record<'izquierda' | 'derecha', Destino[]> = {
  izquierda: [
    { texto: 'Medicina', icono: 'salud' },
    { texto: 'Arquitectura', icono: 'edificio' },
    { texto: 'Psicología', icono: 'mente' },
  ],
  derecha: [
    { texto: 'Abogacía', icono: 'balanza' },
    { texto: 'Sistemas', icono: 'codigo' },
    { texto: 'Diseño', icono: 'diseno' },
  ],
}

export type Punto = { x: number; y: number }

export type Via = {
  id: string
  d: string
  /** Donde la vía toca la tarjeta del destino (su borde interno). */
  llegada: Punto
  lado: -1 | 1
  destino: Destino
  /** Orden de dibujo: las de adentro salen primero. */
  orden: number
}

export type Red = {
  compacta: boolean
  nudo: Punto
  radioNudo: number
  vias: Via[]
  tronco: string
  /** Borde superior de la pieza grande que asoma abajo. */
  pieza: number
}

/** Polilínea con esquinas redondeadas (radio acotado por cada tramo). */
function redondear(pts: Punto[], radio: number) {
  const f = (n: number) => n.toFixed(1)
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]]
    const l1 = Math.hypot(b.x - a.x, b.y - a.y)
    const l2 = Math.hypot(c.x - b.x, c.y - b.y)
    if (l1 < 0.5 || l2 < 0.5) continue
    const r = Math.min(radio, l1 / 2, l2 / 2)
    const p1 = { x: b.x + ((a.x - b.x) / l1) * r, y: b.y + ((a.y - b.y) / l1) * r }
    const p2 = { x: b.x + ((c.x - b.x) / l2) * r, y: b.y + ((c.y - b.y) / l2) * r }
    d += ` L${f(p1.x)} ${f(p1.y)} Q${f(b.x)} ${f(b.y)} ${f(p2.x)} ${f(p2.y)}`
  }
  const z = pts[pts.length - 1]
  return `${d} L${f(z.x)} ${f(z.y)}`
}

/** Reparte n valores entre a y b, extremos incluidos. */
function repartir(n: number, a: number, b: number) {
  if (n === 1) return [(a + b) / 2]
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1))
}

/** Del nudo sale en abanico corto hasta su carril, corre derecho, dobla y llega. */
function recorrido(cx: number, ny: number, lado: number, radioNudo: number, carril: number, xv: number, ye: number, xe: number) {
  // Cada vía sale del disco del timón ya en su carril, como un cable del haz.
  const disco = radioNudo * 1.5
  const dy = Math.min(Math.abs(carril - ny), disco - 2)
  return [
    { x: cx + lado * Math.sqrt(disco * disco - dy * dy) * 0.92, y: carril },
    { x: xv, y: carril },
    { x: xv, y: ye },
    { x: xe, y: ye },
  ]
}

export function trazarRed({
  ancho: w,
  alto: h,
  textoAbajo,
  textoMitad,
}: {
  ancho: number
  alto: number
  /** Borde inferior del bloque de texto (el botón). */
  textoAbajo: number
  /** Medio ancho del titular. */
  textoMitad: number
}): Red {
  const cx = w / 2
  const compacta = w < 1100
  const vias: Via[] = []

  if (!compacta) {
    const g = 9
    const radioNudo = 30
    const ny = Math.min(textoAbajo + 62, h - 250)
    const x0 = Math.max(textoMitad + 34, 330)
    const xe = x0 + 4 * g + 34
    const pieza = Math.max(ny + 170, h - 128)
    for (const lado of [-1, 1] as const) {
      const grupo = lado < 0 ? AMPLIA.izquierda : AMPLIA.derecha
      const nu = grupo.arriba.length
      const nd = grupo.abajo.length
      const ysArriba = repartir(nu, 44, ny - 64)
      const ysAbajo = repartir(nd, h - 44, ny + 70)
      grupo.arriba.forEach((destino, j) => {
        const carril = ny - 5 - (nu - 1 - j) * g
        const pts = recorrido(cx, ny, lado, radioNudo, carril, cx + lado * (x0 + j * g), ysArriba[j], cx + lado * xe)
        vias.push({ id: `${lado}a${j}`, d: redondear(pts, 22), llegada: pts[3], lado, destino, orden: j })
      })
      grupo.abajo.forEach((destino, k) => {
        const carril = ny + 5 + (nd - 1 - k) * g
        const pts = recorrido(cx, ny, lado, radioNudo, carril, cx + lado * (x0 + k * g), ysAbajo[k], cx + lado * xe)
        vias.push({ id: `${lado}b${k}`, d: redondear(pts, 22), llegada: pts[3], lado, destino, orden: k + 1 })
      })
    }
    return { compacta, nudo: { x: cx, y: ny }, radioNudo, vias, tronco: `M${cx} ${ny + radioNudo} V${pieza}`, pieza }
  }

  // Celular y tablet: solo vías hacia abajo; las tarjetas quedan contra los bordes.
  const g = 7
  const radioNudo = 22
  const ny = textoAbajo + 40
  const x0 = Math.min(46, w * 0.12)
  const xe = x0 + 2 * g + 22
  const pieza = h - 92
  for (const lado of [-1, 1] as const) {
    const destinos = lado < 0 ? COMPACTA.izquierda : COMPACTA.derecha
    const n = destinos.length
    const ys = repartir(n * 2, ny + 52, pieza - 30)
    destinos.forEach((destino, k) => {
      const carril = ny + 4 + (n - 1 - k) * g
      // Las del lado derecho quedan a media altura de las del izquierdo.
      const ye = ys[(n - 1 - k) * 2 + (lado > 0 ? 1 : 0)]
      const pts = recorrido(cx, ny, lado, radioNudo, carril, cx + lado * (x0 + k * g), ye, cx + lado * xe)
      vias.push({ id: `${lado}c${k}`, d: redondear(pts, 14), llegada: pts[3], lado, destino, orden: k })
    })
  }
  return { compacta, nudo: { x: cx, y: ny }, radioNudo, vias, tronco: `M${cx} ${ny + radioNudo} V${pieza}`, pieza }
}
