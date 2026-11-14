"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  UserRoundCheck,
} from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Isotipo } from "@/components/home/Isotipo";
import { MUNDOS } from "@/lib/mundos";
import { FUNDADORES } from "@/lib/programa";
import { CITAS_EJEMPLO, HISTORIA_EJEMPLO } from "./contenido-ejemplo";
import { CITA_PSICOPEDAGOGA } from "./datos";
import { Flecha, Nota, Subrayado } from "./Lapiz";

/**
 * Capítulos de /explora-hero/ramp con identidad propia (pedido de Nicolas,
 * 14/11: "que a medida que scrolleás te des cuenta de que estás en otra
 * sección"). Cada uno cambia fondo, layout y tipo de visual: marquesina de
 * texto, titular gigante con cifras, trazos a mano, carrusel horizontal,
 * banda azul, banda navy, texto fijo al costado y una cita grande.
 */

const SALIDA = [0.16, 1, 0.3, 1] as const;
const aparece = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.8, delay: i * 0.08, ease: SALIDA },
});

/** Nombres cortos de las 16 áreas del catálogo, para las marquesinas. */
const CORTOS: Record<string, string> = {
  negocios: "Negocios",
  turismo: "Turismo y gastronomía",
  exactas: "Ciencias exactas",
  ingenieria: "Ingeniería",
  tecnologia: "Tecnología",
  salud: "Salud",
  deporte: "Deporte",
  ecologia: "Ambiente y agro",
  humanidades: "Educación",
  juridicas: "Derecho y política",
  defensa: "Seguridad y emergencias",
  comunicacion: "Comunicación",
  audiovisual: "Audiovisual",
  arte: "Diseño y arte",
  artes: "Música y escena",
  arquitectura: "Arquitectura",
};

/** Profesionales virtuales de cada área en la app (src/lib/demo/areas16.ts), en el mismo orden que MUNDOS. */
const ROLES = [
  "Emprendedora · Consultora de negocios",
  "Lic. en turismo · Gestión hotelera",
  "Física · Investigadora",
  "Ingeniero industrial",
  "Ingeniera en Sistemas",
  "Médico clínico",
  "Profesora de Ed. Física",
  "Biólogo · Conservacionista",
  "Psicóloga · Educadora",
  "Abogada · Política pública",
  "Criminalista · Emergencias",
  "Periodista · Comunicador",
  "Realizadora audiovisual",
  "Diseñadora · Artista visual",
  "Músico · Director de escena",
  "Arquitecto",
];

/* ── 2 · Prueba: marquesina de áreas, airosa ───────────────────────────── */
function Fila({
  items,
  invertida = false,
}: {
  items: string[];
  invertida?: boolean;
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`marquesina flex shrink-0 gap-10 pr-10 ${invertida ? "marquesina-inversa" : ""}`}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap text-[clamp(1.6rem,3vw,2.6rem)] font-light tracking-[-0.02em] text-[var(--navy)]"
          >
            {t}
            <span className="ml-10 text-[var(--primario)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Prueba() {
  const nombres = MUNDOS.map((m) => CORTOS[m.id] ?? m.nombre);
  return (
    <section className="overflow-hidden py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 sm:flex-row sm:items-baseline sm:justify-between lg:px-16">
        <p className="max-w-[46ch] text-[16px] text-[var(--texto2)]">
          <span className="font-semibold text-[var(--navy)]">
            16 áreas de trabajo, 300 carreras y 50 universidades.
          </span>{" "}
          Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe, y les
          gustó.
        </p>
        <a
          href="#testimonios"
          className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-[var(--primario)]"
        >
          Qué dicen de Timon <ArrowRight size={15} aria-hidden />
        </a>
      </div>
      <div className="mt-10 space-y-4">
        <Fila items={nombres.slice(0, 8)} />
        <Fila items={nombres.slice(8)} invertida />
      </div>
    </section>
  );
}

/* ── 3 · El cambio: titular gigante y cifras editoriales ───────────────── */
function Contador({ hasta, sufijo }: { hasta: number; sufijo: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const quieto = useReducedMotion();
  const [n, setN] = useState(quieto ? hasta : 0);
  useEffect(() => {
    if (!visto || quieto) return;
    const c = animate(0, hasta, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [visto, hasta, quieto]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {sufijo}
    </span>
  );
}

/**
 * Las cifras: World Economic Forum, Future of Jobs Report 2025. Verificar la
 * cita textual antes de publicar.
 */
export function Cambio() {
  return (
    <section className="bg-[var(--arena)] px-5 py-24 lg:px-16 lg:py-36">
      <motion.h2
        {...aparece()}
        className="mx-auto max-w-[14ch] text-balance text-center text-[clamp(3rem,7.4vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--navy)]"
      >
        Las carreras están cambiando{" "}
        <span className="text-[var(--primario)]">ahora</span>.
      </motion.h2>
      <motion.p
        {...aparece(1)}
        className="mx-auto mt-8 max-w-[44ch] text-center text-[18px] text-[var(--texto2)]"
      >
        Lo que hoy se estudia no es lo que mañana se va a pedir.
      </motion.p>
      <div className="mx-auto mt-20 grid max-w-[1100px] gap-12 border-t border-[var(--navy)]/15 pt-12 md:grid-cols-2 md:gap-16">
        <motion.div {...aparece(1)}>
          <p className="text-[clamp(5rem,11vw,9rem)] font-light leading-none tracking-[-0.05em] text-[var(--navy)]">
            <Contador hasta={39} sufijo="%" />
          </p>
          <p className="mt-4 max-w-[30ch] text-[18px] text-[var(--texto2)]">
            de las habilidades que hoy pide el trabajo va a cambiar o quedar
            vieja de acá a 2030.
          </p>
        </motion.div>
        <motion.div {...aparece(2)}>
          <p className="text-[clamp(5rem,11vw,9rem)] font-light leading-none tracking-[-0.05em] text-[var(--navy)]">
            <Contador hasta={170} sufijo="M" />
          </p>
          <p className="mt-4 max-w-[30ch] text-[18px] text-[var(--texto2)]">
            de puestos nuevos hasta 2030 en el mundo, y 92 millones que
            desaparecen.
          </p>
        </motion.div>
      </div>
      <p className="mx-auto mt-10 max-w-[1100px] text-[13px] text-[var(--tenue)]">
        Fuente: World Economic Forum, Future of Jobs Report 2025.
      </p>
    </section>
  );
}

/* ── 4 · El problema: fuentes sueltas unidas con trazos a mano ─────────── */
const FUENTES = [
  { texto: "folletos de universidades", clase: "left-[2%] top-[6%]" },
  { texto: "un test online", clase: "left-[8%] top-[46%]" },
  { texto: "lo que dice un amigo", clase: "left-[0%] top-[84%]" },
  { texto: "una charla en el colegio", clase: "right-[0%] top-[8%]" },
  { texto: "videos en redes", clase: "right-[8%] top-[48%]" },
  { texto: "lo que estudió un primo", clase: "right-[0%] top-[86%]" },
];
/** Flechas de cada fuente al centro (caja de 1000 × 420). */
const TRAZOS: {
  desde: [number, number];
  hasta: [number, number];
  curva: number;
}[] = [
  { desde: [250, 58], hasta: [430, 170], curva: 0.2 },
  { desde: [260, 205], hasta: [420, 210], curva: -0.15 },
  { desde: [232, 352], hasta: [430, 250], curva: -0.2 },
  { desde: [756, 62], hasta: [570, 170], curva: -0.2 },
  { desde: [740, 215], hasta: [580, 210], curva: 0.15 },
  { desde: [764, 356], hasta: [570, 250], curva: 0.2 },
];

export function Problema() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-16 lg:py-32">
      <motion.h2
        {...aparece()}
        className="mx-auto max-w-[20ch] text-balance text-center text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.022em] text-[var(--navy)]"
      >
        Solo, es muy difícil{" "}
        <Subrayado semilla={44}>seguirle el ritmo</Subrayado>.
      </motion.h2>
      <p className="mx-auto mt-4 max-w-[46ch] text-center text-[17px] text-[var(--texto2)]">
        Hoy la información para elegir carrera está desparramada. Timon la junta
        con la gente que la vive.
      </p>

      {/* Escritorio: las fuentes alrededor, flechas a mano al centro */}
      <div className="relative mx-auto mt-14 hidden h-[420px] max-w-[1000px] md:block">
        {FUENTES.map((f, i) => (
          <motion.p
            key={f.texto}
            className={`absolute font-[family-name:var(--font-mano)] text-[24px] leading-none text-[var(--navy)] ${f.clase}`}
            initial={{ opacity: 0, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
          >
            {f.texto}
          </motion.p>
        ))}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {TRAZOS.map((t, i) => (
            <Flecha
              key={i}
              ancho={1000}
              alto={420}
              desde={t.desde}
              hasta={t.hasta}
              curva={t.curva}
              semilla={50 + i}
              retraso={0.5 + i * 0.15}
              className="absolute inset-0"
            />
          ))}
        </div>
        <motion.div
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, delay: 1.5, ease: SALIDA }}
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primario)] text-white">
            <Isotipo size={48} trazo={4} />
          </span>
          <span className="text-[18px] font-semibold text-[var(--navy)]">
            Timon
          </span>
          <Nota className="mt-1">todo en un lugar</Nota>
        </motion.div>
      </div>

      {/* Celular: la lista y una flecha hacia Timon */}
      <div className="mt-10 flex flex-col items-center gap-2 md:hidden">
        {FUENTES.map((f) => (
          <p
            key={f.texto}
            className="font-[family-name:var(--font-mano)] text-[21px] leading-tight text-[var(--navy)]"
          >
            {f.texto}
          </p>
        ))}
        <Flecha
          ancho={40}
          alto={60}
          desde={[20, 0]}
          hasta={[20, 56]}
          curva={0.1}
          semilla={61}
          className="mt-2"
        />
        <span className="mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primario)] text-white">
          <Isotipo size={40} trazo={4} />
        </span>
      </div>
    </section>
  );
}

/* ── 7 · Las 16 áreas: carrusel horizontal ─────────────────────────────── */
export function CarruselAreas() {
  const pista = useRef<HTMLDivElement>(null);
  return (
    <section className="overflow-hidden bg-[var(--arena)] py-20 lg:py-28">
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-5 lg:px-16">
        <motion.h2
          {...aparece()}
          className="max-w-[18ch] text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.022em] text-[var(--navy)]"
        >
          16 áreas.{" "}
          <span className="text-[var(--tenue)]">
            Cada una con alguien que la vive.
          </span>
        </motion.h2>
        <div className="hidden gap-2 sm:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              aria-label={d < 0 ? "Ver anteriores" : "Ver siguientes"}
              onClick={() =>
                pista.current?.scrollBy({ left: d * 340, behavior: "smooth" })
              }
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--navy)] ring-1 ring-[var(--borde)] transition-colors hover:bg-[var(--primario)] hover:text-white"
            >
              <ArrowRight size={18} className={d < 0 ? "rotate-180" : ""} />
            </button>
          ))}
        </div>
      </div>
      <div
        ref={pista}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] lg:px-16"
      >
        {MUNDOS.map((m, i) => (
          <article
            key={m.id}
            className="flex w-[300px] shrink-0 snap-start flex-col justify-between rounded-[20px] bg-white p-6 sm:w-[320px]"
          >
            <div>
              <p className="text-[13px] font-semibold text-[var(--primario)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-[24px] font-medium leading-tight tracking-[-0.02em] text-[var(--navy)]">
                {CORTOS[m.id]}
              </h3>
              <p className="mt-4 text-[15.5px] leading-snug text-[var(--texto2)]">
                “{m.verdades[0]}”
              </p>
            </div>
            <p className="mt-8 border-t border-[var(--borde)] pt-4 text-[13.5px] text-[var(--tenue)]">
              {ROLES[i]}{" "}
              <span className="text-[var(--primario)]">
                · profesional virtual
              </span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── 8 · Confianza: banda azul con la cita grande ──────────────────────── */
/**
 * Solo lo documentado: tres psicopedagogas evaluaron el producto, un equipo
 * profesional de la UBA revisó la metodología, 13 paradas y 10 dimensiones,
 * y la revisión con un profesional como adicional.
 * [PSICÓLOGOS: nombres/matrícula]
 */
const PILARES = [
  {
    icono: Compass,
    titulo: "Un método, no un cuestionario",
    texto: "13 paradas y 10 dimensiones de análisis.",
  },
  {
    icono: UserRoundCheck,
    titulo: "Evaluado por psicopedagogas",
    texto:
      "Tres psicopedagogas lo evaluaron y un equipo de la UBA revisó la metodología.",
  },
  {
    icono: BookOpenCheck,
    titulo: "Un profesional para revisarlo",
    texto: "Si quieren, repasan el informe en una reunión aparte.",
  },
];

export function Confianza() {
  return (
    <section className="bg-[#4361EE] px-5 py-24 text-white lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[15px] font-semibold text-white/75">
          Pensado con psicopedagogas, no armado por un algoritmo
        </p>
        <motion.blockquote
          {...aparece()}
          className="mt-8 max-w-[20ch] text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.05] tracking-[-0.03em]"
        >
          “{CITA_PSICOPEDAGOGA.texto}”
        </motion.blockquote>
        <p className="mt-6 text-[16px] text-white/80">
          <span className="font-semibold text-white">
            {CITA_PSICOPEDAGOGA.quien}
          </span>{" "}
          · {CITA_PSICOPEDAGOGA.rol}
        </p>
        <ul className="mt-16 grid gap-10 border-t border-white/25 pt-10 md:grid-cols-3">
          {PILARES.map((p, i) => (
            <motion.li key={p.titulo} {...aparece(i)}>
              <p.icono size={26} strokeWidth={1.6} />
              <p className="mt-4 text-[18px] font-semibold">{p.titulo}</p>
              <p className="mt-1.5 text-[15.5px] text-white/80">{p.texto}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 10 · Momento: banda navy interactiva ──────────────────────────────── */
const MOMENTOS = [
  {
    id: "colegio",
    label: "Está en 4°, 5° o 6° año",
    texto:
      "Lo hace en dos semanas, un rato por día y desde el celular, antes de tener que anotarse en una carrera.",
  },
  {
    id: "termine",
    label: "Terminó y no sabe qué seguir",
    texto:
      "Ordena sus opciones: ve qué áreas le atraen, qué carreras van con él y dónde estudiarlas.",
  },
  {
    id: "cambio",
    label: "Se quiere cambiar de carrera",
    texto:
      "Antes de cambiar, ve cómo es el trabajo por dentro y compara carreras y universidades con su perfil.",
  },
];

export function Momento() {
  const [elegido, setElegido] = useState(0);
  return (
    <section className="bg-[var(--navy)] px-5 py-20 text-white lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.022em]">
          ¿En qué momento está tu hijo?{" "}
          <span className="text-white/55">Así lo ayuda Timon.</span>
        </h2>
        <div>
          <div
            role="radiogroup"
            aria-label="Momento de tu hijo"
            className="grid gap-2 sm:grid-cols-3"
          >
            {MOMENTOS.map((m, i) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={i === elegido}
                onClick={() => setElegido(i)}
                className={`min-h-[56px] rounded-[12px] px-4 py-3 text-left text-[15px] font-semibold leading-snug transition-colors ${
                  i === elegido
                    ? "bg-white text-[var(--navy)]"
                    : "bg-white/8 text-white/80 ring-1 ring-white/15 hover:bg-white/15"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <motion.p
            key={elegido}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
            className="mt-6 min-h-[3.2em] text-[19px] leading-snug text-white/90"
          >
            {MOMENTOS[elegido].texto}
          </motion.p>
          <a
            href="#anotalo"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#4361EE] px-6 text-[15.5px] font-semibold text-white hover:bg-[#3651d4]"
          >
            Quiero anotar a mi hijo <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── 12 · Historia: texto fijo a la izquierda, contenido a la derecha ──── */
export function Historia() {
  return (
    <section
      id="historia"
      className="scroll-mt-20 bg-[var(--arena)] px-5 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <p className="text-[14px] font-semibold text-[var(--primario)]">
              Quiénes somos
            </p>
            <h2 className="mt-3 text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[var(--navy)]">
              Hecho en Argentina.
            </h2>
          </div>
        </div>
        <div>
          {/* Borrador de ejemplo (contenido-ejemplo.ts): reemplazar por la historia real. */}
          {HISTORIA_EJEMPLO.parrafos.map((t, i) => (
            <motion.p
              key={t}
              {...aparece(i)}
              className={
                i === 0
                  ? "text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-[1.3] tracking-[-0.015em] text-[var(--navy)]"
                  : "mt-8 text-[18px] text-[var(--texto2)]"
              }
            >
              {t}
            </motion.p>
          ))}
          <ul className="mt-14 divide-y divide-[var(--navy)]/10 border-y border-[var(--navy)]/10">
            {FUNDADORES.map((f, i) => (
              <motion.li
                key={f.nombre}
                {...aparece(i)}
                className="flex items-baseline justify-between gap-6 py-6"
              >
                <span className="text-[clamp(1.8rem,3vw,2.6rem)] font-medium tracking-[-0.025em] text-[var(--navy)]">
                  {f.nombre}
                </span>
                <span className="text-right text-[15.5px] text-[var(--tenue)]">
                  {f.rol}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── 13 · Testimonios: una cita grande que rota ────────────────────────── */
/** La de la psicopedagoga es real y textual; las otras dos son DE EJEMPLO (contenido-ejemplo.ts). */
const CITAS = [
  {
    texto: CITA_PSICOPEDAGOGA.texto,
    quien: CITA_PSICOPEDAGOGA.quien,
    rol: CITA_PSICOPEDAGOGA.rol,
  },
  ...CITAS_EJEMPLO,
];

export function Testimonios() {
  const [i, setI] = useState(0);
  const [frenado, setFrenado] = useState(false);
  useEffect(() => {
    if (frenado) return;
    const id = setTimeout(() => setI((n) => (n + 1) % CITAS.length), 6000);
    return () => clearTimeout(id);
  }, [i, frenado]);
  const c = CITAS[i];
  return (
    <section
      id="testimonios"
      className="scroll-mt-20 bg-[var(--primario-tinte)] px-5 py-24 lg:px-16 lg:py-28"
      onMouseEnter={() => setFrenado(true)}
      onMouseLeave={() => setFrenado(false)}
    >
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[14px] font-semibold text-[var(--primario)]">
          Lo que dicen de Timon
        </p>
        <div className="mt-8 min-h-[260px] sm:min-h-[220px]">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: SALIDA }}
          >
            <blockquote className="max-w-[28ch] text-[clamp(1.8rem,3.6vw,3.2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-[var(--navy)]">
              “{c.texto}”
            </blockquote>
            <figcaption className="mt-6 text-[16px] text-[var(--texto2)]">
              <span className="font-semibold text-[var(--navy)]">
                {c.quien}
              </span>{" "}
              · {c.rol}
            </figcaption>
          </motion.figure>
        </div>
        <div className="mt-8 flex gap-2">
          {CITAS.map((x, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Ver la cita ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-[6px] rounded-full transition-all ${n === i ? "w-10 bg-[var(--primario)]" : "w-6 bg-[var(--primario-suave)] hover:bg-[var(--primario)]/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
