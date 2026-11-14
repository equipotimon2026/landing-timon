"use client";

import { motion } from "motion/react";
import { CharlaMini, OportunidadMini, PerfilMini } from "./Piezas";
import { Flecha, Nota } from "./Lapiz";

const SALIDA = [0.16, 1, 0.3, 1] as const;
const H2 =
  "text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.022em] text-[var(--navy)]";

const aparece = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.8, delay: i * 0.08, ease: SALIDA },
});

/**
 * El camino en el tiempo: hoy decide, durante la carrera sigue conectado y
 * después se le abren oportunidades. Solo la primera etapa existe hoy en la
 * app; las otras dos van marcadas [CONFIRMAR].
 */
const ETAPAS = [
  {
    cuando: "Hoy",
    titulo: "Decide qué estudiar.",
    texto:
      "Se conoce en 13 paradas, charla con profesionales de 16 áreas, recibe su informe y compara universidades.",
    Pieza: PerfilMini,
    existe: true,
  },
  {
    // [CONFIRMAR] No existe en la app: seguir hablando con profesionales durante la carrera.
    cuando: "Durante la carrera",
    titulo: "Sigue conectado.",
    texto:
      "Habla con profesionales mientras cursa y se mantiene al día con hacia dónde va su área.",
    Pieza: CharlaMini,
    existe: false,
  },
  {
    // [CONFIRMAR] No existe en la app: oportunidades laborales a través de la red.
    cuando: "Después",
    titulo: "Se le abren puertas.",
    texto:
      "La misma red de profesionales y empresas le acerca oportunidades de trabajo.",
    Pieza: OportunidadMini,
    existe: false,
  },
];

export function Camino() {
  return (
    <section
      id="como-funciona"
      className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-20 lg:px-16 lg:py-28"
    >
      <motion.h2 {...aparece()} className={`max-w-[24ch] ${H2}`}>
        No es un test de una vez.{" "}
        <span className="text-[var(--tenue)]">
          La conexión lo acompaña en el camino.
        </span>
      </motion.h2>
      <ol className="relative mt-14 grid gap-10 lg:mt-28 md:grid-cols-3 md:gap-6">
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-[11px] hidden h-[2px] origin-left bg-[var(--primario)] md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1.6, ease: SALIDA }}
        />
        <div className="absolute -top-12 left-[16%] hidden lg:block">
          <Flecha
            ancho={330}
            alto={44}
            desde={[0, 30]}
            hasta={[320, 34]}
            curva={-0.12}
            semilla={21}
            retraso={1}
          />
        </div>
        <Nota className="absolute -top-[68px] left-[20%] hidden lg:block">
          y sigue conectado
        </Nota>
        {ETAPAS.map((e, i) => (
          <motion.li key={e.cuando} {...aparece(i + 1)} className="relative">
            <span
              className={`relative z-10 block h-6 w-6 rounded-full border-[3px] border-[var(--primario)] ${i === 0 ? "bg-[var(--primario)]" : "bg-white"}`}
            />
            <p className="mt-5 text-[14px] font-semibold text-[var(--primario)]">
              {e.cuando}
            </p>
            <h3 className="mt-1 text-[22px] font-medium tracking-[-0.018em] text-[var(--navy)]">
              {e.titulo}
            </h3>
            <p className="mt-2 max-w-[34ch] text-[16px] text-[var(--texto2)]">
              {e.texto}
            </p>
            <div className="mt-6 h-[200px] overflow-hidden rounded-[14px] ring-1 ring-[var(--borde)]">
              <e.Pieza />
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
