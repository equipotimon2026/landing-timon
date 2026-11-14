'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/home/Header'

/** Las páginas que abren en claro (hero D y cómo funciona A) llevan la cabecera blanca. */
const CLARAS = ['/explora-hero/d', '/explora-hero/app-a']

export function HeaderExplora() {
  const ruta = usePathname()
  /** La página con formato Ramp trae su propia barra de anuncio y cabecera. */
  if (ruta === '/explora-hero/ramp') return null
  return <Header oscuro={!CLARAS.includes(ruta)} />
}
