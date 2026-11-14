import { BriefcaseBusiness, CalendarHeart, GraduationCap, UsersRound } from 'lucide-react'
import { Isotipo } from './Isotipo'
import { Dibujo, Trazo } from './Dibujo'

const NODOS = [
  {
    titulo: 'Profesionales',
    texto: 'Gente que trabaja de lo que le interesa y le cuenta cómo es su día.',
    Icono: UsersRound,
    clase: 'bg-[var(--ocean)] text-white',
    sub: 'text-white/75',
    giro: '-1.5deg',
  },
  {
    titulo: 'Universidades',
    texto: '50 universidades y 300 carreras, para ver dónde y cómo estudiar.',
    Icono: GraduationCap,
    clase: 'bg-[var(--terra)] text-white',
    sub: 'text-white/80',
    giro: '1.5deg',
  },
  {
    titulo: 'Empresas',
    texto: 'Los lugares donde se trabaja de eso, para verlo de cerca.',
    Icono: BriefcaseBusiness,
    clase: 'bg-[var(--crema)] text-[var(--navy)]',
    sub: 'text-[var(--texto2)]',
    giro: '1deg',
  },
  {
    titulo: 'Eventos',
    texto: 'Encuentros para conocer el mundo del trabajo en persona.',
    Icono: CalendarHeart,
    clase: 'bg-[var(--cielo)] text-[var(--navy)]',
    sub: 'text-[var(--texto2)]',
    giro: '-1deg',
  },
]

function Nodo({ n }: { n: (typeof NODOS)[number] }) {
  return (
    <li
      className={`tesela relative flex flex-col justify-between gap-8 rounded-[28px] p-7 sm:p-8 ${n.clase}`}
      style={{ rotate: n.giro }}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-current/10">
        <n.Icono size={22} aria-hidden />
      </span>
      <div>
        <p className="titulo text-[26px]">{n.titulo}</p>
        <p className={`mt-2 text-[16px] leading-snug ${n.sub}`}>{n.texto}</p>
      </div>
    </li>
  )
}

/**
 * La red: el corazón de Timon. Cuatro nodos de colores alrededor del
 * isotipo, unidos con trazos a mano que se dibujan al entrar en pantalla.
 */
export function Red() {
  return (
    <div className="relative mx-auto max-w-[1120px] px-5">
      <Dibujo retraso={0.2} className="absolute inset-x-5 inset-y-0 hidden lg:block">
        <svg viewBox="0 0 1000 520" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <Trazo d="M430 230 C 380 200, 350 150, 330 120" color="crema" ancho={2.5} />
          <Trazo d="M570 230 C 620 200, 650 150, 670 120" color="crema" ancho={2.5} orden={0.4} />
          <Trazo d="M430 290 C 380 320, 350 370, 330 400" color="crema" ancho={2.5} orden={0.8} />
          <Trazo d="M570 290 C 620 320, 650 370, 670 400" color="crema" ancho={2.5} orden={1.2} />
        </svg>
      </Dibujo>
      <ul className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_200px_1fr] lg:grid-rows-2 lg:gap-x-10 lg:gap-y-8">
        <Nodo n={NODOS[0]} />
        <li
          aria-hidden
          className="hidden items-center justify-center lg:row-span-2 lg:col-start-2 lg:row-start-1 lg:flex"
        >
          <span className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[var(--crema)] text-[var(--navy)] shadow-[0_0_0_14px_rgba(245,237,224,0.12),0_0_0_30px_rgba(245,237,224,0.06)]">
            <Isotipo size={78} trazo={3.4} />
          </span>
        </li>
        <Nodo n={NODOS[1]} />
        <Nodo n={NODOS[2]} />
        <Nodo n={NODOS[3]} />
      </ul>
    </div>
  )
}
