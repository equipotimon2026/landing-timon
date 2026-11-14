/**
 * Marcos de MacBook y de iPhone en CSS puro (home.css: .mac, .iphone). Escalan
 * con su ancho gracias a las container queries, así que sirven igual en el
 * hero, en el recorrido y en celular. Lo que va adentro es la pantalla.
 */
export function MacBook({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mac ${className}`}>
      <div className="mac-tapa">
        <span className="mac-camara" aria-hidden />
        <div className="mac-pantalla">{children}</div>
      </div>
      <div className="mac-base" aria-hidden />
    </div>
  )
}

export function IPhone({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`iphone ${className}`}>
      <div className="iphone-cuerpo">
        <div className="iphone-pantalla">
          <span className="iphone-isla" aria-hidden />
          {children}
        </div>
      </div>
    </div>
  )
}
