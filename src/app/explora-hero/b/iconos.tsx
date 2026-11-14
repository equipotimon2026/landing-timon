import {
  Activity,
  BookOpen,
  Brain,
  Building2,
  ChartColumn,
  ChefHat,
  CodeXml,
  FlaskConical,
  Megaphone,
  PawPrint,
  PenTool,
  Plane,
  Scale,
  Sprout,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { Icono } from './red'

/** Ícono y tono de cada destino: celestes y terras alternados, sobre navy. */
const ICONOS: Record<Icono, [LucideIcon, string]> = {
  codigo: [CodeXml, '#8fbcf0'],
  salud: [Stethoscope, '#e8a283'],
  edificio: [Building2, '#f5ede0'],
  mente: [Brain, '#8fbcf0'],
  economia: [TrendingUp, '#e8a283'],
  huella: [PawPrint, '#e8a283'],
  libro: [BookOpen, '#8fbcf0'],
  cocina: [ChefHat, '#f5ede0'],
  diseno: [PenTool, '#e8a283'],
  balanza: [Scale, '#f5ede0'],
  datos: [ChartColumn, '#8fbcf0'],
  comunicacion: [Megaphone, '#e8a283'],
  ciencia: [FlaskConical, '#8fbcf0'],
  kine: [Activity, '#8fbcf0'],
  avion: [Plane, '#f5ede0'],
  agro: [Sprout, '#e8a283'],
}

export function IconoDestino({ icono }: { icono: Icono }) {
  const [Componente, color] = ICONOS[icono]
  return <Componente size={16} strokeWidth={2} color={color} aria-hidden className="shrink-0" />
}
