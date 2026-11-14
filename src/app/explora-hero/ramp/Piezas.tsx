"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { DONDE_SALUD_LISTA, PASOS_HERO, UNIVERSIDAD_DEMO } from "./datos";

/**
 * Piezas de la app de Timon armadas en HTML, sin fotos ni emojis (pedido de
 * Nicolas): las capturas de áreas y profesionales traen fotos de stock, así
 * que esas pantallas se recrean con el mismo contenido en texto. Todo sale
 * de la app: las áreas del catálogo, el relato del profesional virtual de
 * Salud, una universidad del comparador de demo y dónde se trabaja.
 */

export const TILES = [
  "Salud",
  "Ingeniería",
  "Tecnología",
  "Negocios",
  "Arquitectura",
  "Educación",
];

/** La elección de áreas: tarjetas por área, con la marca de elegida. */
export function AreasMini({
  elegidas = [],
  retrasos = [],
}: {
  elegidas?: string[];
  retrasos?: number[];
}) {
  return (
    <div className="bg-[#fbfaf7] p-4 sm:p-5">
      <p className="text-[13px] font-semibold text-[var(--navy)]">
        Elegí las áreas que te atraen
      </p>
      <p className="mt-0.5 text-[12px] text-[var(--tenue)]">
        16 áreas, cada una con su profesional
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TILES.map((t) => {
          const i = elegidas.indexOf(t);
          return (
            <li
              key={t}
              className="relative flex h-[64px] items-end rounded-[10px] bg-white p-3 ring-1 ring-[var(--borde)] sm:h-[78px]"
            >
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-[var(--navy)]">
                {t}
              </span>
              <span
                aria-hidden
                className="absolute right-2.5 top-2.5 h-5 w-5 rounded-full ring-1 ring-[var(--borde)]"
              />
              {i >= 0 && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-[10px] ring-[2.5px] ring-[var(--primario)]"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: retrasos[i] ?? 0 }}
                >
                  <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primario)] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                </motion.span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** La charla con el profesional virtual de Salud, quieta. */
export function CharlaMini() {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-[#fbfaf7] p-4 text-[13.5px] leading-snug">
      <p className="text-[12px] font-semibold text-[var(--tenue)]">
        Salud · charla con un médico clínico
      </p>
      <p className="self-end rounded-[12px] rounded-br-[4px] bg-[var(--primario)] px-3 py-2 text-white">
        ¿Cómo es un día de trabajo para vos?
      </p>
      <p className="self-start rounded-[12px] rounded-bl-[4px] bg-white px-3 py-2 text-[var(--navy)] ring-1 ring-[var(--borde)]">
        {PASOS_HERO.charla.split(". ")[0]}.
      </p>
    </div>
  );
}

/** Una universidad como aparece en el comparador. */
export function UniversidadMini() {
  const u = UNIVERSIDAD_DEMO;
  return (
    <div className="flex h-full flex-col bg-[#fbfaf7] p-4">
      <div className="rounded-[10px] bg-white p-3.5 ring-1 ring-[var(--borde)]">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[14px] font-semibold leading-tight text-[var(--navy)]">
            {u.nombre}
          </p>
          <span className="shrink-0 text-[11.5px] font-semibold text-[#0f9d6b]">
            {u.alineada}
          </span>
        </div>
        <span
          aria-hidden
          className="mt-2 block h-[4px] w-full rounded-full bg-[#0f9d6b]"
        />
        <p className="mt-3 text-[12.5px] text-[var(--texto2)]">{u.carrera}</p>
        <p className="mt-1 text-[12px] text-[var(--tenue)]">
          {u.datos.join(" · ")}
        </p>
      </div>
    </div>
  );
}

/** Dónde se trabaja en un área, como lo cuenta el módulo de profesionales. */
export function LugaresMini() {
  return (
    <div className="flex h-full flex-col bg-[#fbfaf7] p-4">
      <p className="text-[12px] font-semibold text-[var(--tenue)]">
        Dónde se trabaja · Salud
      </p>
      <ul className="mt-2.5 divide-y divide-[var(--borde)] rounded-[10px] bg-white text-[13.5px] text-[var(--navy)] ring-1 ring-[var(--borde)]">
        {DONDE_SALUD_LISTA.map((l) => (
          <li key={l} className="px-3 py-2">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** El perfil que arma en las paradas, como chip de la app. */
export function PerfilMini() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 bg-[#fbfaf7] p-4">
      <div className="rounded-[10px] bg-white p-3.5 ring-1 ring-[var(--borde)]">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="font-semibold text-[var(--navy)]">Su perfil</span>
          <span className="font-semibold text-[var(--primario)]">92 %</span>
        </div>
        <span
          aria-hidden
          className="mt-2 block h-[5px] overflow-hidden rounded-full bg-[var(--primario-suave)]"
        >
          <span className="block h-full w-[92%] rounded-full bg-[var(--primario)]" />
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 text-[12.5px] font-semibold text-[var(--navy)]">
        {["Análisis", "Curiosidad", "Creatividad"].map((r) => (
          <span
            key={r}
            className="rounded-[6px] bg-white px-2.5 py-1 ring-1 ring-[var(--borde)]"
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Una oportunidad de trabajo a través de la red. Todavía no existe: va marcada. */
export function OportunidadMini() {
  return (
    <div className="flex h-full flex-col justify-center bg-[#fbfaf7] p-4">
      <div className="rounded-[10px] bg-white p-3.5 ring-1 ring-[var(--borde)]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13.5px] font-semibold text-[var(--navy)]">
            Pasantía en un hospital
          </p>
          <span className="shrink-0 rounded-[5px] bg-[var(--primario-tinte)] px-2 py-0.5 text-[11px] font-semibold text-[var(--primario-hondo)]">
            Próximamente
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] text-[var(--tenue)]">
          Salud · a través de la red de Timon
        </p>
      </div>
    </div>
  );
}
