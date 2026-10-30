/**
 * Las "capturas" de comentarios del bloque "What people are saying" de
 * acquisition.com/o-vegas: tarjetas inclinadas con el resaltador amarillo.
 *
 * `ejemplo: true` marca una captura simulada (pedido de Nico, 26/10/2026: lo
 * que les dijeron alumnos y familias, todavía sin los mensajes textuales). Las
 * simuladas se ven solo en desarrollo, con la etiqueta EJEMPLO, y nunca llegan
 * a producción: publicar mensajes inventados como reales sería publicidad
 * engañosa. Para publicarlas, reemplazar el texto por el mensaje real (con
 * permiso de quien lo mandó) y poner `ejemplo: false`.
 */

export type Captura = {
  estilo: 'whatsapp' | 'resena' | 'nota'
  autor: string
  detalle: string
  /** Texto con las partes resaltadas entre ==dobles iguales==. */
  texto: string
  ejemplo: boolean
}

const MOSTRAR_EJEMPLOS = process.env.NODE_ENV !== 'production'

function Resaltado({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(==[^=]+==)/g).map((parte, i) =>
        parte.startsWith('==') ? (
          <mark key={i} className="rounded-[2px] bg-[#FDF3A3] px-0.5 text-inherit [box-decoration-break:clone]">
            {parte.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </>
  )
}

function Etiqueta() {
  return (
    <span className="absolute -right-2 -top-2 rounded bg-[#E11D48] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
      Ejemplo
    </span>
  )
}

function Tarjeta({ c, rotar }: { c: Captura; rotar: string }) {
  if (c.estilo === 'whatsapp') {
    return (
      <div className={`relative w-full max-w-[380px] overflow-hidden rounded-xl bg-[#EFEAE2] shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${rotar}`}>
        {c.ejemplo && <Etiqueta />}
        <div className="flex items-center gap-2.5 bg-[#F7F5F2] px-4 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CBD5E1] text-[13px] font-bold text-white">
            {c.autor[0]}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#111B21]">{c.autor}</p>
            <p className="text-[11px] text-[#667781]">{c.detalle}</p>
          </div>
        </div>
        <div className="px-3 py-4">
          <div className="max-w-[92%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-[13px] leading-[1.45] text-[#111B21] shadow-sm">
            <Resaltado texto={c.texto} />
            <span className="ml-2 align-bottom text-[10px] text-[#667781]">21:14</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`relative w-full max-w-[380px] rounded-xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${rotar}`}>
      {c.ejemplo && <Etiqueta />}
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white ${
            c.estilo === 'nota' ? 'bg-[var(--ocean)]' : 'bg-[#9333EA]'
          }`}
        >
          {c.autor[0]}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#202124]">{c.autor}</p>
          <p className="text-[11px] text-[#70757A]">{c.detalle}</p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-[1.5] text-[#3C4043]">
        <Resaltado texto={c.texto} />
      </p>
    </div>
  )
}

const ROTACIONES = ['md:-rotate-2', 'md:rotate-1 md:-translate-y-3', 'md:rotate-2 md:translate-y-2']

export function CapturasCollage({ capturas }: { capturas: Captura[] }) {
  const visibles = capturas.filter((c) => !c.ejemplo || MOSTRAR_EJEMPLOS)
  if (visibles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-[1180px] items-start justify-items-center gap-5 md:grid-cols-3 md:gap-3">
      {visibles.map((c, i) => (
        <Tarjeta key={c.texto} c={c} rotar={ROTACIONES[i % ROTACIONES.length]} />
      ))}
    </div>
  )
}
