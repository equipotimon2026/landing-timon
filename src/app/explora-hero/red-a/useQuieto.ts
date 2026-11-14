import { useSyncExternalStore } from 'react'
import { useReducedMotion } from 'motion/react'

const nada = () => () => {}

/**
 * Menos movimiento, pero recién después de hidratar: en el servidor no se sabe
 * la preferencia, así que el primer render del cliente tiene que coincidir.
 */
export function useQuieto() {
  const montado = useSyncExternalStore(nada, () => true, () => false)
  const reducir = useReducedMotion()
  return montado && !!reducir
}
