import { useId } from 'react'

export type Peinado = 'corto' | 'largo' | 'rodete' | 'rulos' | 'melena' | 'rapado'

export type Rasgos = {
  fondo: string
  piel: string
  pelo: string
  ropa: string
  peinado: Peinado
  anteojos?: boolean
  barba?: boolean
}

/**
 * Retrato ilustrado en formas planas: sin cara dibujada, solo silueta, pelo y
 * ropa en los colores de la marca. Así se lee como persona sin parecer una
 * foto de stock ni un emoji.
 */
export function Avatar({ rasgos, size = 48, className = '' }: { rasgos: Rasgos; size?: number; className?: string }) {
  const id = useId()
  const { fondo, piel, pelo, ropa, peinado, anteojos, barba } = rasgos
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="64" height="64" fill={fondo} />
        {/* Pelo de atrás (largo, melena) */}
        {peinado === 'largo' && <path d="M18 27c0-9 6-15 14-15s14 6 14 15v20H18z" fill={pelo} />}
        {peinado === 'melena' && <path d="M19 28c0-9 6-15 13-15s13 6 13 15v9c0 2-2 3-4 3H23c-2 0-4-1-4-3z" fill={pelo} />}
        {/* Cuerpo */}
        <path d="M10 64c0-12 9.8-20 22-20s22 8 22 20z" fill={ropa} />
        <path d="M27.5 37h9v8.5c0 2.5-2 4-4.5 4s-4.5-1.5-4.5-4z" fill={piel} />
        <path d="M27.5 41.5c2.8 1.6 6.2 1.6 9 0V45c-2.8 1.2-6.2 1.2-9 0z" fill="#0f1f36" opacity=".08" />
        {/* Cabeza */}
        <ellipse cx="32" cy="28.5" rx="10.5" ry="11.5" fill={piel} />
        {/* Pelo de arriba */}
        {peinado === 'corto' && <path d="M21.4 27c-.6-8 4.4-13 10.8-13 6.6 0 11 4.6 10.4 12.4-2.6-3.6-6.8-5.4-12-5.2-3.6.2-6.8 2.2-9.2 5.8z" fill={pelo} />}
        {peinado === 'rapado' && <path d="M21.6 25c.6-6.4 5-10.4 10.4-10.4s9.8 4 10.4 10.4c-3-2.6-6.4-3.6-10.4-3.6s-7.4 1-10.4 3.6z" fill={pelo} />}
        {(peinado === 'largo' || peinado === 'melena') && (
          <path d="M21.2 29c-.4-9 4.6-14.6 11-14.6 6.8 0 11.4 5.4 10.6 14-3.8-1.6-7-4.4-8.6-8.2-2.6 4.4-7.4 7.4-13 8.8z" fill={pelo} />
        )}
        {peinado === 'rodete' && (
          <>
            <circle cx="32" cy="12.5" r="5.5" fill={pelo} />
            <path d="M21.3 27.5c-.3-8.4 4.4-13.6 10.7-13.6s11 5.2 10.7 13.6c-2.8-4.2-6.4-6.2-10.7-6.2s-7.9 2-10.7 6.2z" fill={pelo} />
          </>
        )}
        {peinado === 'rulos' && (
          <g fill={pelo}>
            <circle cx="24" cy="21" r="5" />
            <circle cx="29" cy="16.5" r="5" />
            <circle cx="35.5" cy="16.5" r="5" />
            <circle cx="40.5" cy="21" r="5" />
            <circle cx="21.8" cy="27" r="3.6" />
            <circle cx="42.2" cy="27" r="3.6" />
          </g>
        )}
        {barba && <path d="M22 31c1 6.4 4.8 9.6 10 9.6s9-3.2 10-9.6c-1.6 2-3.4 2.8-5 2.8-1.6-1.4-3.2-1.8-5-1.8s-3.4.4-5 1.8c-1.6 0-3.4-.8-5-2.8z" fill={pelo} />}
        {anteojos && (
          <g fill="none" stroke="#0f1f36" strokeWidth="1.4">
            <circle cx="27.4" cy="29" r="3.3" />
            <circle cx="36.6" cy="29" r="3.3" />
            <path d="M30.7 29h2.6" />
          </g>
        )}
      </g>
    </svg>
  )
}
