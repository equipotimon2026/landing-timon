'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { placa, planoRedondeado } from './geometria'

/**
 * MacBook modelada acá mismo (sin GLB de terceros): placas con canto
 * redondeado, teclado con teclas instanciadas y la captura real de la app como
 * pantalla. Medidas en unidades de escena, proporciones de una MacBook Air de
 * 13".
 */

const ALUMINIO = { color: '#c8ccd2', metalness: 0.75, roughness: 0.32, clearcoat: 0.3, clearcoatRoughness: 0.4 }

function usePantalla(src: string) {
  return useTexture(src, (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
  })
}

/* ── MacBook ─────────────────────────────────────────────────────────── */

const MAC = { ancho: 3, fondo: 2.06, base: 0.085, tapa: 2.02, tapaEsp: 0.04 }
const TECLAS = { cols: 14, filas: 6, paso: 0.178, tam: 0.152 }

function Teclado() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const n = TECLAS.cols * TECLAS.filas
  useLayoutEffect(() => {
    const m = ref.current
    if (!m) return
    const o = new THREE.Object3D()
    let i = 0
    for (let f = 0; f < TECLAS.filas; f++) {
      for (let c = 0; c < TECLAS.cols; c++) {
        // La fila de abajo lleva la barra espaciadora: una tecla ancha en el medio.
        const espacio = f === TECLAS.filas - 1 && c >= 4 && c <= 9
        o.position.set((c - (TECLAS.cols - 1) / 2) * TECLAS.paso, 0, (f - (TECLAS.filas - 1) / 2) * TECLAS.paso * 0.9)
        o.scale.set(1, 1, f === 0 ? 0.55 : 1)
        if (espacio) {
          o.scale.set(c === 4 ? 6.85 : 0, 1, 1)
          o.position.x = (6.5 - (TECLAS.cols - 1) / 2) * TECLAS.paso
        }
        o.updateMatrix()
        m.setMatrixAt(i++, o.matrix)
      }
    }
    m.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, n]}>
      <boxGeometry args={[TECLAS.tam, 0.012, TECLAS.tam * 0.9]} />
      <meshStandardMaterial color="#2b2f37" roughness={0.55} />
    </instancedMesh>
  )
}

/** La tapa se abre girando sobre la bisagra: 0 es vertical, positivo la cierra. */
export function MacBook3D({ pantalla, tapaRef }: { pantalla: string; tapaRef: React.Ref<THREE.Group> }) {
    const tex = usePantalla(pantalla)
    const geo = useMemo(
      () => ({
        base: placa(MAC.ancho, MAC.fondo, 0.14, MAC.base, 0.03),
        pozo: planoRedondeado(2.62, 1.06, 0.04),
        pad: planoRedondeado(1.16, 0.72, 0.06),
        tapa: placa(MAC.ancho, MAC.tapa, 0.14, MAC.tapaEsp, 0.016),
        bisel: planoRedondeado(MAC.ancho - 0.05, MAC.tapa - 0.05, 0.12),
        display: planoRedondeado(2.84, 1.775, 0.02),
      }),
      [],
    )
    const arriba = MAC.base
    const atras = -MAC.fondo / 2 + 0.05
    return (
      <group>
        {/* Base: la placa acostada, con la cara superior en y = arriba. */}
        <mesh geometry={geo.base} rotation-x={-Math.PI / 2} castShadow>
          <meshPhysicalMaterial {...ALUMINIO} />
        </mesh>
        <mesh geometry={geo.pozo} rotation-x={-Math.PI / 2} position={[0, arriba + 0.001, -0.3]}>
          <meshStandardMaterial color="#8d939c" metalness={0.6} roughness={0.5} />
        </mesh>
        <group position={[0, arriba + 0.007, -0.3]}>
          <Teclado />
        </group>
        <mesh geometry={geo.pad} rotation-x={-Math.PI / 2} position={[0, arriba + 0.001, 0.58]}>
          <meshPhysicalMaterial color="#bfc3c9" metalness={0.6} roughness={0.22} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, arriba - 0.01, atras]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.032, 0.032, 2.3, 24]} />
          <meshStandardMaterial color="#2a2e35" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Tapa: crece hacia +y desde la bisagra, con la pantalla mirando a +z. */}
        <group ref={tapaRef} position={[0, arriba, atras]}>
          <group position={[0, MAC.tapa / 2, -MAC.tapaEsp]}>
            <mesh geometry={geo.tapa} castShadow>
              <meshPhysicalMaterial {...ALUMINIO} />
            </mesh>
            <mesh geometry={geo.bisel} position={[0, 0, MAC.tapaEsp + 0.001]}>
              <meshPhysicalMaterial color="#07090c" roughness={0.12} clearcoat={1} />
            </mesh>
            <mesh geometry={geo.display} position={[0, 0.045, MAC.tapaEsp + 0.002]}>
              <meshBasicMaterial map={tex} toneMapped={false} />
            </mesh>
            <mesh position={[0, MAC.tapa / 2 - 0.05, MAC.tapaEsp + 0.003]}>
              <circleGeometry args={[0.012, 16]} />
              <meshBasicMaterial color="#1d2430" />
            </mesh>
          </group>
        </group>
      </group>
    )
}
