'use client'

import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import type { MotionValue } from 'motion/react'
import { MacBook3D } from './Dispositivos3D'

/**
 * El hero en 3D: una sola MacBook en un estudio de luz suave. Al cargar sube,
 * gira y abre la tapa sola, y queda mostrando el informe en la primera
 * pantalla. El scroll solo la acerca un poco. Sigue al mouse apenas. Hero.tsx la carga en
 * diferido y solo si el equipo la banca; si no, queda la MacBook en DOM.
 */

type Props = {
  mx: MotionValue<number>
  my: MotionValue<number>
  /** Scroll del hero, de 0 a 1. */
  progreso: MotionValue<number>
  /** Dónde termina el texto, en fracción del alto del canvas: ahí arranca la pantalla. */
  tope: React.RefObject<number>
  activo: boolean
  onListo: () => void
}

const NAVY = '#0f1f36'
const damp = THREE.MathUtils.damp
const lerp = THREE.MathUtils.lerp
const suave = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b)
const salida = (t: number) => 1 - Math.pow(1 - THREE.MathUtils.clamp(t, 0, 1), 3)

/** π/2 es la tapa cerrada; abierta queda a unos 105°. */
const TAPA_ABIERTA = -0.24
/** Alto de la pantalla abierta sobre la base, en unidades del modelo. */
const ALTO_PANTALLA = 1.98

function Protagonista({ mx, my, progreso, tope, onListo }: Omit<Props, 'activo'>) {
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
    const p = suave(0, 1, progreso.get())
    const sube = salida((t - 0.05) / 1.2)
    const abre = salida((t - 0.3) / 1.3)
    const { width: vw, height: vh } = viewport

    // La pantalla arranca justo debajo del texto (tope, en fracción del alto)
    // y llena lo que queda: puede cortarse la base, nunca la pantalla.
    const arriba = vh / 2 - vh * tope.current
    const s0 = Math.min(vw / 3.25, (vh * (1 - tope.current) * 0.97) / ALTO_PANTALLA, 1.6)
    // Con el scroll, un acercamiento suave hasta centrar la pantalla.
    const s = s0 * (1 + p * 0.22)
    const y0 = arriba - ALTO_PANTALLA * s0
    const y1 = -1.05 * s

    m.scale.setScalar(damp(m.scale.x, s, 6, dt))
    m.position.y = damp(m.position.y, lerp(y0, y1, p) - (1 - sube) * 1.2 * s0, 6, dt)
    m.rotation.x = damp(m.rotation.x, lerp(0.14, 0.04, p) + (1 - sube) * 0.3 + my.get() * 0.04, 5, dt)
    m.rotation.y = damp(m.rotation.y, (1 - sube) * -0.45 + mx.get() * 0.1, 5, dt)
    tapa.current.rotation.x = damp(tapa.current.rotation.x, lerp(Math.PI / 2, TAPA_ABIERTA, abre), 8, dt)
  })

  return (
    <group ref={mac} position-y={-6} rotation-x={0.44}>
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
