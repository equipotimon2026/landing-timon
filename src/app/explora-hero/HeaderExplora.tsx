'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/home/Header'

/** Las páginas que abren en claro (hero D y cómo funciona A) llevan la cabecera blanca. */
const CLARAS = ['/explora-hero/d', '/explora-hero/app-a']

export function HeaderExplora() {
  const ruta = usePathname()
  return <Header oscuro={!CLARAS.includes(ruta)} />
}
