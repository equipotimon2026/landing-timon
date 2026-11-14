'use client'

import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import type { MotionValue } from 'motion/react'
import { MacBook3D } from './Dispositivos3D'

/**
 * El hero en 3D: una sola MacBook en un estudio de luz suave. Entra con la
 * tapa entornada y, a medida que se baja por el hero, se abre y sube hasta
 * mostrar el informe de frente. Sigue al mouse apenas. Hero.tsx la carga en
 * diferido y solo si el equipo la banca; si no, queda la MacBook en DOM.
 */

type Props = {
  mx: MotionValue<number>
  my: MotionValue<number>
  /** Scroll del hero, de 0 a 1. */
  progreso: MotionValue<number>
  activo: boolean
  onListo: () => void
}

const NAVY = '#0f1f36'
const damp = THREE.MathUtils.damp
const lerp = THREE.MathUtils.lerp
const suave = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b)
const salida = (t: number) => 1 - Math.pow(1 - THREE.MathUtils.clamp(t, 0, 1), 3)

/** Tapa casi cerrada al llegar (π/2 es cerrada) y abierta a unos 105° al final. */
const TAPA_ENTORNADA = 1.08
const TAPA_ABIERTA = -0.24

function Protagonista({ mx, my, progreso, onListo }: Omit<Props, 'activo'>) {
  const mac = useRef<THREE.Group>(null)
  const tapa = useRef<THREE.Group>(null)
  const inicio = useRef<number | null>(null)
  const viewport = useThree((s) => s.viewport)

  useFrame((state, dt) => {
    const m = mac.current
    if (!m || !tapa.current) return
    if (inicio.current === null) {
      inicio.current = state.clock.elapsedTime
      onListo()
    }
    const t = state.clock.elapsedTime - inicio.current
    const p = progreso.get()
    const e = salida((t - 0.1) / 1.5)
    const abre = suave(0.04, 0.72, p)

    // Escala por el lado que más aprieta: en celular manda el ancho.
    const s = Math.min(viewport.width / 3.5, viewport.height / 3.3, 1.45) * (1 + abre * 0.18)
    const abajo = -viewport.height / 2 + viewport.height * 0.06
    const centrada = -1.02 * s

    m.scale.setScalar(damp(m.scale.x, s, 6, dt))
    m.position.y = damp(m.position.y, lerp(abajo, centrada, abre) - (1 - e) * 1.4 * s, 6, dt)
    m.rotation.x = damp(m.rotation.x, lerp(0.42, 0.16, abre) + my.get() * 0.05, 5, dt)
    m.rotation.y = damp(m.rotation.y, lerp(-0.2, 0, abre) + mx.get() * 0.12, 5, dt)
    tapa.current.rotation.x = damp(
      tapa.current.rotation.x,
      lerp(Math.PI / 2, lerp(TAPA_ENTORNADA, TAPA_ABIERTA, abre), salida((t - 0.5) / 1.4)),
      7,
      dt,
    )
  })

  return (
    <group ref={mac} position-y={-6} rotation-x={0.42}>
      <MacBook3D tapaRef={tapa} pantalla="/app/mac-informe.webp" />
      <ContactShadows position={[0, -0.005, 0]} scale={[4.2, 3.2]} blur={2.2} far={0.8} opacity={0.38} color={NAVY} resolution={512} />
    </group>
  )
}

/** Estudio: softboxes armados con Lightformers, sin bajar HDRs de afuera. */
function Estudio() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 5]} intensity={1.2} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.8} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[6, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[0, 1, 9]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#dfeaf6" position={[0, -3, 4]} rotation-x={-Math.PI / 2} scale={[10, 4, 1]} />
      </Environment>
    </>
  )
}

export default function Escena({ activo, ...props }: Props) {
  return (
    <Canvas
      aria-hidden
      frameloop={activo ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 26 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Estudio />
      <Suspense fallback={null}>
        <Protagonista {...props} />
      </Suspense>
    </Canvas>
  )
}
