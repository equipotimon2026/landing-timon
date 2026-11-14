import Link from 'next/link'

const CONCEPTOS = [
  { href: '/explora-hero/a', titulo: 'Hero A: el abanico de futuros' },
  { href: '/explora-hero/b', titulo: 'Hero B: el camino' },
  { href: '/explora-hero/c', titulo: 'Hero C: probalo' },
  { href: '/explora-hero/red-a', titulo: 'Red A' },
  { href: '/explora-hero/red-b', titulo: 'Red B' },
]

export default function Explora() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-20">
      <h1 className="display text-[clamp(2rem,5vw,3.5rem)]">Exploración</h1>
      <ul className="mt-10 space-y-4 text-[20px]">
        {CONCEPTOS.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="text-[var(--ocean)] underline-offset-4 hover:underline">
              {c.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
