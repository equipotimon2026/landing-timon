'use client'

import { motion, useReducedMotion, type Transition } from 'motion/react'

/**
 * Ilustraciones animadas de cada etapa, en SVG + motion (no hay Lottie de la
 * marca). Trazo grueso redondeado, colores de la marca. Se animan cuando la
 * etapa está activa; con menos movimiento aparecen ya en su estado final.
 */
type Props = { activo: boolean; className?: string }

/** Con menos movimiento, cada ilustración salta a su estado final. */
function useT() {
  const quieto = useReducedMotion()
  return (t: Transition): Transition => (quieto ? { duration: 0 } : t)
}

const trazo = { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 5 } as const

/** Test: una lista que se va tildando. */
export function IconoTest({ activo, className = '' }: Props) {
  const T = useT()
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      <rect x="18" y="12" width="60" height="74" rx="12" fill="#f5ede0" stroke="#0f1f36" {...trazo} />
      {[32, 50, 68].map((y, i) => (
        <g key={y}>
          <motion.path
            d={`M30 ${y} l5 5 l9 -10`}
            fill="none"
            stroke="#c97f5e"
            {...trazo}
            initial={false}
            animate={{ pathLength: activo ? 1 : 0 }}
            transition={T({ duration: 0.35, delay: activo ? 0.25 + i * 0.3 : 0 })}
          />
          <line x1="52" y1={y} x2="66" y2={y} stroke="#0f1f36" opacity={0.35} {...trazo} />
        </g>
      ))}
    </svg>
  )
}

/** Investigación: una brújula con la aguja buscando. */
export function IconoBrujula({ activo, className = '' }: Props) {
  const T = useT()
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      <circle cx="48" cy="48" r="34" fill="#dfeaf6" stroke="#0f1f36" {...trazo} />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="48" y1="18" x2="48" y2="23" stroke="#0f1f36" {...trazo} strokeWidth={4} transform={`rotate(${a} 48 48)`} />
      ))}
      <motion.g
        style={{ originX: '48px', originY: '48px' }}
        initial={false}
        animate={activo ? { rotate: [0, 70, -40, 25, 40] } : { rotate: 0 }}
        transition={T({ duration: 2.2, ease: 'easeInOut' })}
      >
        <path d="M48 24 L56 48 L48 52 Z" fill="#c97f5e" />
        <path d="M48 72 L40 48 L48 44 Z" fill="#1e5ba0" />
      </motion.g>
      <circle cx="48" cy="48" r="4" fill="#0f1f36" />
    </svg>
  )
}

/** Informe: una hoja que se escribe sola. */
export function IconoInforme({ activo, className = '' }: Props) {
  const T = useT()
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      <path d="M24 12 h34 l16 16 v56 h-50 z" fill="#ffffff" stroke="#0f1f36" {...trazo} />
      <path d="M58 12 v16 h16" fill="none" stroke="#0f1f36" {...trazo} />
      {[
        [34, 44, 64, '#1e5ba0'],
        [34, 56, 58, '#c97f5e'],
        [34, 68, 52, '#0f1f36'],
      ].map(([x1, y, x2, c], i) => (
        <motion.line
          key={y}
          x1={x1}
          y1={y}
          x2={x2}
          y2={y}
          stroke={c as string}
          {...trazo}
          initial={false}
          animate={{ pathLength: activo ? 1 : 0.15 }}
          transition={T({ duration: 0.5, delay: activo ? 0.2 + i * 0.25 : 0 })}
        />
      ))}
    </svg>
  )
}

/** Universidades: un edificio con columnas que suben. */
export function IconoUniversidad({ activo, className = '' }: Props) {
  const T = useT()
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      <path d="M14 34 L48 14 L82 34 Z" fill="#f7e3d7" stroke="#0f1f36" {...trazo} />
      {[26, 42, 58, 70].map((x, i) => (
        <motion.rect
          key={x}
          x={x - 3}
          width="6"
          rx="3"
          fill={i % 2 ? '#1e5ba0' : '#c97f5e'}
          initial={false}
          animate={{ y: activo ? 40 : 66, height: activo ? 30 : 4 }}
          transition={T({ type: 'spring', stiffness: 220, damping: 16, delay: activo ? 0.15 + i * 0.1 : 0 })}
        />
      ))}
      <line x1="14" y1="78" x2="82" y2="78" stroke="#0f1f36" {...trazo} />
    </svg>
  )
}
