import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CTA_TEXTO } from '@/components/home/Cta'

const PASOS = [
  {
    n: '1',
    titulo: 'Se conoce',
    texto: 'Unas paradas cortas, desde el celular, para entender qué le gusta y en qué es bueno.',
    img: '/app/iphone-test.webp',
    alt: 'Las paradas del recorrido de Timon, una abajo de la otra',
    tono: 'bg-[var(--cielo)]',
  },
  {
    n: '2',
    titulo: 'Conoce el mundo real',
    texto: 'Recorre las 16 áreas y charla con profesionales de cada una: qué hacen, dónde, cómo es su día.',
    img: '/app/iphone-investigacion.webp',
    alt: 'Las áreas de trabajo de Timon, cada una con su profesional',
    tono: 'bg-[var(--durazno)]',
  },
  {
    n: '3',
    titulo: 'Elige con criterio',
    texto: 'Recibe su informe y compara universidades y carreras con lo que aprendió.',
    img: '/app/iphone-informe.webp',
    alt: 'El informe final de Timon',
    tono: 'bg-[var(--crema)]',
  },
]

/** Lo que responde a la pregunta que deja el hero: ¿y cómo encuentra la suya? */
export function Siguiente() {
  return (
    <section className="mx-auto max-w-[1120px] px-4 pb-24 pt-16 text-center sm:px-5 md:pt-24">
      <h2 className="mx-auto max-w-[22ch] text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--navy)] [text-wrap:balance]">
        Y esto es solo una de las 300 carreras. ¿Cómo encuentra la suya?
      </h2>
      <p className="mx-auto mt-4 max-w-[48ch] text-[17px] text-[var(--texto2)]">
        En dos semanas, desde casa, recorre 16 áreas de trabajo, 300 carreras y 50 universidades.
      </p>

      <ol className="mt-12 grid gap-4 text-left md:grid-cols-3">
        {PASOS.map((p) => (
          <li key={p.n} className="flex flex-col overflow-hidden rounded-[22px] border border-[#e6ebf1] bg-white">
            <div className={`relative h-[230px] overflow-hidden ${p.tono}`}>
              <div className="absolute left-1/2 top-6 w-[80%] -translate-x-1/2 overflow-hidden rounded-t-[18px] shadow-[0_20px_40px_-20px_rgba(15,31,54,0.45)]">
                <Image src={p.img} alt={p.alt} width={720} height={1561} sizes="(min-width: 768px) 230px, 60vw" className="h-auto w-full" />
              </div>
            </div>
            <div className="p-6">
              <p className="flex items-baseline gap-3 text-[20px] font-semibold tracking-[-0.025em] text-[var(--navy)]">
                <span className="text-[15px] tabular-nums text-[var(--terra-hondo)]">{p.n}</span>
                {p.titulo}
              </p>
              <p className="mt-2 text-[15.5px] leading-[1.55] text-[var(--texto2)]">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link href="/#anotalo" className="btn group mt-12">
        {CTA_TEXTO}
        <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  )
}
