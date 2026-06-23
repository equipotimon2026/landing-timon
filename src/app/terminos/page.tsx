import Link from 'next/link'

export const metadata = {
  title: 'Términos y Condiciones — Timon',
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--navy)] paper-grain">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center text-[13px] text-[var(--hueso)] hover:text-[var(--navy)] transition-colors mb-12"
        >
          ← Volver
        </Link>
        <p className="eyebrow eyebrow--with-rule mb-7">Documento legal</p>
        <h1
          className="font-display font-light text-[var(--navy)] mb-4"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            fontVariationSettings: "'opsz' 144, 'SOFT' 80",
          }}
        >
          Términos <em className="italic-emphasis">y</em> condiciones
        </h1>
        <p className="text-[var(--hueso)] mb-12 font-mono text-[11px] uppercase tracking-[0.14em]">
          Próximamente · borrador en revisión legal
        </p>
        <div className="space-y-5 text-[var(--navy)]/85 text-[1.0625rem] leading-[1.7]">
          <p>
            Timon es una herramienta tecnológica de exploración vocacional. Sus respuestas son
            generadas por inteligencia artificial con fines informativos y de autoconocimiento.
            No constituye un diagnóstico psicológico ni una evaluación psicométrica, y no
            reemplaza la consulta con un profesional matriculado (Ley N° 23.277).
          </p>
          <p>
            Cumple con la Ley N° 25.326 de Protección de Datos Personales. Las decisiones
            tomadas a partir de la información provista por la plataforma son de exclusiva
            responsabilidad del usuario.
          </p>
        </div>
      </div>
    </main>
  )
}
