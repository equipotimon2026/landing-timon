import * as THREE from 'three'

/** Rectángulo de esquinas redondeadas centrado en el origen. */
export function rectRedondeado(ancho: number, alto: number, radio: number) {
  const x = -ancho / 2
  const y = -alto / 2
  const r = Math.min(radio, ancho / 2, alto / 2)
  const s = new THREE.Shape()
  s.moveTo(x + r, y)
  s.lineTo(x + ancho - r, y)
  s.quadraticCurveTo(x + ancho, y, x + ancho, y + r)
  s.lineTo(x + ancho, y + alto - r)
  s.quadraticCurveTo(x + ancho, y + alto, x + ancho - r, y + alto)
  s.lineTo(x + r, y + alto)
  s.quadraticCurveTo(x, y + alto, x, y + alto - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

/**
 * Plano redondeado con las UV de 0 a 1 sobre su caja, para que una captura
 * de pantalla entre entera y con las esquinas recortadas.
 */
export function planoRedondeado(ancho: number, alto: number, radio: number) {
  const g = new THREE.ShapeGeometry(rectRedondeado(ancho, alto, radio), 16)
  const pos = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / ancho + 0.5, pos.getY(i) / alto + 0.5)
  }
  return g
}

/**
 * Placa con canto redondeado: el rectángulo extruido en +z con bisel, con la
 * cara de atrás en z = 0 y la de adelante en z = espesor.
 */
export function placa(ancho: number, alto: number, radio: number, espesor: number, bisel: number) {
  const g = new THREE.ExtrudeGeometry(rectRedondeado(ancho - bisel * 2, alto - bisel * 2, radio - bisel), {
    depth: espesor - bisel * 2,
    bevelEnabled: true,
    bevelThickness: bisel,
    bevelSize: bisel,
    bevelSegments: 5,
    curveSegments: 20,
  })
  g.translate(0, 0, bisel)
  g.computeVertexNormals()
  return g
}
