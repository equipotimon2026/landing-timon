export type Punto = [number, number]

/**
 * Polilínea ortogonal con esquinas redondeadas. Devuelve el `d` del path y su
 * largo real en px, para que los beams viajen a la misma velocidad y con el
 * mismo largo de cola en todas las conexiones.
 */
export function ruta(puntos: Punto[], radio = 10) {
  let d = `M${puntos[0][0]} ${puntos[0][1]}`
  let largo = 0
  for (let i = 1; i < puntos.length; i++) {
    const [x0, y0] = puntos[i - 1]
    const [x1, y1] = puntos[i]
    largo += Math.hypot(x1 - x0, y1 - y0)
    const sig = puntos[i + 1]
    if (!sig) {
      d += ` L${x1} ${y1}`
      continue
    }
    const r = Math.min(radio, Math.hypot(x1 - x0, y1 - y0) / 2, Math.hypot(sig[0] - x1, sig[1] - y1) / 2)
    const ux = Math.sign(x1 - x0)
    const uy = Math.sign(y1 - y0)
    const vx = Math.sign(sig[0] - x1)
    const vy = Math.sign(sig[1] - y1)
    d += ` L${x1 - ux * r} ${y1 - uy * r} Q${x1} ${y1} ${x1 + vx * r} ${y1 + vy * r}`
    largo -= (2 - Math.PI / 2) * r
  }
  return { d, largo }
}
