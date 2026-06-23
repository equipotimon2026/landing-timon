'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? (window.scrollY / max) * 100 : 0
        setProgress(p)
        raf = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      style={{ height: 2 }}
    >
      <div
        className="h-full origin-left bg-[var(--ocean)]"
        style={{ transform: `scaleX(${progress / 100})`, transition: 'transform 80ms linear' }}
      />
    </div>
  )
}
