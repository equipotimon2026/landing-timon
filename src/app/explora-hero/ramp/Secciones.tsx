"use client";

import { ArrowRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Isotipo } from "@/components/home/Isotipo";
import { CONTACT_EMAIL } from "@/lib/programa";
import { URL_ENTRAR } from "@/lib/landing";
import { Circulo } from "./Lapiz";

const SALIDA = [0.16, 1, 0.3, 1] as const;
const H2 =
  "text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.022em] text-[var(--navy)]";

const aparece = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.8, delay: i * 0.08, ease: SALIDA },
});

/** Banner horizontal de Ramp ("ver qué pueden automatizar los agentes"). */
export function Banner() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-16">
      <motion.div
        {...aparece()}
        className="flex flex-col gap-5 rounded-[14px] border border-[var(--primario-suave)] bg-[var(--primario-tinte)] px-7 py-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-[17px] font-semibold text-[var(--navy)]">
            Probá el test de intereses, gratis.
          </p>
          <p className="mt-1 text-[15px] text-[var(--texto2)]">
            Dieciocho actividades y en un rato ve en qué áreas están sus
            intereses.
          </p>
        </div>
        <a
          href="/test"
          className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-[6px] bg-[var(--primario)] px-5 text-[15px] font-semibold text-white hover:bg-[var(--primario-hondo)] sm:self-auto"
        >
          Hacer el test <ArrowRight size={16} aria-hidden />
        </a>
      </motion.div>
    </section>
  );
}

/** Mismas preguntas que la home (src/app/page.tsx). */
const PREGUNTAS = [
  {
    q: "¿Es otro test vocacional?",
    a: "Arranca con unas paradas para conocerse, pero eso es solo el principio. Después investiga cómo se trabaja en cada área, recibe su informe y compara universidades.",
  },
  {
    q: "¿Mi hijo lo va a usar?",
    a: "Cada parada dura menos de 10 minutos y se hace desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Además, vos ves si avanza.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Empezar es gratis. El precio depende del plan, y te lo contamos cuando te escribimos.",
  },
  {
    q: "¿Quién está detrás?",
    a: "Somos Facu, Feli y Nico, de Argentina. Una psicopedagoga evaluó la metodología y un equipo profesional de la UBA la revisó.",
  },
  {
    q: "¿Puedo ver sus respuestas?",
    a: "No. Lo que responde es suyo. Vos ves cómo avanza y el informe final.",
  },
];

export function Preguntas() {
  return (
    <section
      id="preguntas"
      className="mx-auto grid max-w-[1440px] scroll-mt-20 gap-10 px-5 py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-16 lg:py-28"
    >
      <h2 className={H2}>
        Preguntas.{" "}
        <span className="text-[var(--tenue)]">Las que nos hacen siempre.</span>
      </h2>
      <div className="border-t border-[var(--borde)]">
        {PREGUNTAS.map((p) => (
          <details key={p.q} className="group border-b border-[var(--borde)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-medium tracking-[-0.015em] text-[var(--navy)] [&::-webkit-details-marker]:hidden">
              {p.q}
              <Plus
                size={18}
                aria-hidden
                className="shrink-0 text-[var(--tenue)] transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-[60ch] pb-6 text-[16.5px] text-[var(--texto2)]">
              {p.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Cierre de Ramp: tarjeta blanca con el CTA que pisa el footer navy. */
export function Cierre({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--primario)]">
      <section
        id="anotalo"
        className="scroll-mt-20 rounded-b-[28px] bg-white px-5 pb-20 pt-6 lg:rounded-b-[40px] lg:pb-28"
      >
        <div className="mx-auto max-w-[960px]">
          <h2 className={`text-center ${H2}`}>
            Que tu hijo no elija solo.{" "}
            <span className="text-[var(--primario)]">
              Que elija{" "}
              <span className="whitespace-nowrap">
                <Circulo semilla={13}>conectado</Circulo>.
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-center text-[17px] text-[var(--tenue)]">
            Dejanos tus datos y los de tu hijo. Te escribimos para contarte cómo
            sigue.
          </p>
          <div className="mt-10">{children}</div>
        </div>
      </section>
      <footer className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-12 pt-16 text-[14.5px] text-white/80 sm:grid-cols-2 lg:grid-cols-4 lg:px-16">
        <div>
          <p className="inline-flex items-center gap-2 text-[18px] font-semibold text-white">
            <Isotipo size={20} className="text-white" /> Timon
          </p>
          <p className="mt-3 max-w-[30ch]">
            Para que tu hijo elija carrera conociendo el mundo real.
          </p>
        </div>
        <nav aria-label="El programa" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-white">El programa</p>
          <a href="#modulos" className="hover:text-white">
            Qué incluye
          </a>
          <a href="#como-funciona" className="hover:text-white">
            Cómo funciona
          </a>
          <a href="/test" className="hover:text-white">
            Test de intereses gratis
          </a>
        </nav>
        <nav aria-label="Timon" className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-white">Timon</p>
          <a href="#historia" className="hover:text-white">
            Quiénes somos
          </a>
          <a href="#preguntas" className="hover:text-white">
            Preguntas
          </a>
          <a href={URL_ENTRAR} className="hover:text-white">
            Entrar
          </a>
        </nav>
        <div className="flex flex-col gap-2">
          <p className="mb-1 font-semibold text-white">Contacto</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
            {CONTACT_EMAIL}
          </a>
          <a href="/terminos" className="hover:text-white">
            Términos y condiciones
          </a>
        </div>
        <p className="border-t border-white/20 pt-6 text-[13px] text-white/70 sm:col-span-2 lg:col-span-4">
          © 2026 Timon. Hecho en Argentina.
        </p>
      </footer>
    </div>
  );
}
