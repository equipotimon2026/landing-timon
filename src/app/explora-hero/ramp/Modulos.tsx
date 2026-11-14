"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { MODULOS } from "./datos";
import {
  HojaInforme,
  OtraMiradaVista,
  PilaProfesionales,
  RankingUniversidades,
  StepperParadas,
} from "./Vistas";

const SALIDA = [0.16, 1, 0.3, 1] as const;

/**
 * "Una plataforma para todo", al estilo Ramp: titular en dos tonos con dos
 * botones y un bento de dos tarjetas grandes y tres chicas, una por módulo
 * real de la app, con su pantalla adentro. Las tarjetas entran con un fundido.
 */
/** Cada módulo con su vista de la app armada en código. */
function Vista({ id }: { id: string }) {
  if (id === "profesionales") return <PilaProfesionales />;
  if (id === "universidades") return <RankingUniversidades />;
  if (id === "test") return <StepperParadas />;
  if (id === "informe") return <HojaInforme cuantas={2} />;
  return <OtraMiradaVista />;
}

export function Modulos() {
  return (
    <section
      id="modulos"
      className="mx-auto max-w-[1440px] scroll-mt-20 px-5 pb-20 lg:px-16 lg:pb-28"
    >
      <h2 className="max-w-[24ch] text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.022em] text-[var(--navy)]">
        Timon está conectado con quienes viven cada carrera.{" "}
        <span className="text-[var(--tenue)]">
          Tu hijo entra a esa red. Así es como entra.
        </span>
      </h2>
      <div className="mt-7 flex flex-wrap gap-2">
        <a
          href="#anotalo"
          className="inline-flex h-11 items-center rounded-[6px] bg-[var(--primario)] px-5 text-[15px] font-semibold text-white hover:bg-[var(--primario-hondo)]"
        >
          Quiero anotar a mi hijo
        </a>
        <a
          href="/test"
          className="inline-flex h-11 items-center rounded-[6px] bg-[var(--primario-tinte)] px-5 text-[15px] font-semibold text-[var(--primario-hondo)] hover:bg-[var(--primario-suave)]"
        >
          Probar el test gratis
        </a>
      </div>

      <ul className="mt-12 grid gap-3 md:grid-cols-6">
        {MODULOS.map((m, i) => (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: SALIDA }}
            className={`group relative flex flex-col overflow-hidden rounded-[14px] bg-[var(--escenario)] ${
              m.grande
                ? "h-[400px] md:col-span-3 lg:h-[460px]"
                : "h-[340px] md:col-span-2 lg:h-[380px]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 p-6">
              <h3 className="max-w-[26ch] text-[18px] font-medium leading-[1.3] tracking-[-0.02em] text-[var(--navy)]">
                {m.titulo} <span className="text-[var(--tenue)]">{m.gris}</span>
              </h3>
              <ArrowUpRight
                size={18}
                aria-hidden
                className="shrink-0 text-[var(--tenue)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primario)]"
              />
            </div>
            <div className="relative mx-6 min-h-0 flex-1 translate-y-3 transition-transform duration-500 group-hover:translate-y-1">
              <div className="h-[calc(100%+12px)] overflow-hidden rounded-t-[12px] ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_24px_50px_-30px_rgba(15,31,54,0.4)]">
                <Vista id={m.id} />
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
