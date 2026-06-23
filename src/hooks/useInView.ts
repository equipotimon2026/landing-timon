'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * Returns a ref + boolean indicating whether the element is in view.
 * Once=true: only triggers the first time it enters viewport (most reveals).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -80px 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
