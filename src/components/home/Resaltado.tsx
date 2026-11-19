import { Fragment } from 'react'

/**
 * Pinta un titular de src/lib/variantes.ts: lo que va entre **dobles
 * asteriscos** sale resaltado (en <strong>, con la clase que se le pase).
 */
export function Resaltado({ texto, clase }: { texto: string; clase?: string }) {
  const partes = texto.split('**')
  return (
    <>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={clase}>
            {p}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  )
}
