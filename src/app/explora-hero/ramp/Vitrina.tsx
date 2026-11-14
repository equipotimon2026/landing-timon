"use client";

import { useEffect, useState } from "react";
import { Building2, GraduationCap, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CHARLA,
  DONDE,
  PROFESIONALES,
  RESPUESTAS_RAPIDAS,
  UNIVERSIDADES,
} from "./datos-app";
import { Circulo } from "./Lapiz";

const SALIDA = [0.16, 1, 0.3, 1] as const;
const DURACION = 5200;

const PESTANAS = [
  {
    id: "pro",
    titulo: "Profesionales",
    icono: MessageCircle,
    texto: "Charla con profesionales de 16 áreas y les pregunta lo que quiera.",
  },
  {
    id: "uni",
    titulo: "Universidades",
    icono: GraduationCap,
    texto:
      "Compara por cuota, modalidad y zona, y ve cuáles van con su perfil.",
  },
  // [CONFIRMAR] empresas: hoy la app muestra dónde se trabaja en cada área, sin empresas con nombre.
  {
    id: "donde",
    titulo: "Dónde se trabaja",
    icono: Building2,
    texto: "Ve los lugares donde trabaja la gente de cada área.",
  },
];

/* ── Profesionales: la lista y la charla que se escribe ────────────────── */
function Charla() {
  const [visibles, setVisibles] = useState(1);
  const [letras, setLetras] = useState(0);
  useEffect(() => {
    if (visibles >= CHARLA.length) return;
    const msj = CHARLA[visibles];
    if (msj.de === "alumno") {
      const id = setTimeout(() => {
        setVisibles((n) => n + 1);
        setLetras(0);
      }, 500);
      return () => clearTimeout(id);
    }
    if (letras < msj.texto.length) {
      const id = setTimeout(() => setLetras((n) => n + 4), 22);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setVisibles((n) => n + 1);
      setLetras(0);
    }, 350);
    return () => clearTimeout(id);
  }, [visibles, letras]);

  const mostrados = CHARLA.slice(0, Math.min(visibles + 1, CHARLA.length));
  return (
    <div className="grid h-full md:grid-cols-[260px_minmax(0,1fr)]">
      <ul className="hidden border-r border-[var(--borde)] bg-[#fbfaf7] p-3 md:block">
        <li className="px-2 pb-2 text-[11.5px] font-semibold text-[var(--tenue)]">
          Profesionales virtuales
        </li>
        {PROFESIONALES.map((p, i) => (
          <li
            key={p.nombre}
            className={`flex items-center gap-2.5 rounded-[10px] px-2 py-2 ${i === 0 ? "bg-white ring-1 ring-[var(--primario-suave)]" : ""}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primario-tinte)] text-[11px] font-semibold text-[var(--primario)]">
              {p.nombre
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-[var(--navy)]">
                {p.nombre}
              </span>
              <span className="block truncate text-[11.5px] text-[var(--tenue)]">
                {p.rol} · {p.area}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex min-h-0 flex-col p-4 sm:p-5">
        <p className="border-b border-[var(--borde)] pb-3 text-[13px] font-semibold text-[var(--navy)]">
          Diego Moreira{" "}
          <span className="font-normal text-[var(--tenue)]">
            · Médico clínico · Salud
          </span>
        </p>
        <div className="flex flex-1 flex-col gap-2.5 overflow-hidden py-4 text-[14px] leading-snug">
          {mostrados.map((m, i) => {
            const escribiendo = i === visibles && m.de === "pro";
            const texto = i < visibles ? m.texto : m.texto.slice(0, letras);
            if (i === visibles && m.de === "alumno") return null;
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  m.de === "alumno"
                    ? "max-w-[80%] self-end rounded-[14px] rounded-br-[4px] bg-[var(--primario)] px-3.5 py-2.5 text-white"
                    : "max-w-[86%] self-start rounded-[14px] rounded-bl-[4px] bg-[#f4f5f8] px-3.5 py-2.5 text-[var(--navy)]"
                }
              >
                {escribiendo && letras === 0 ? "…" : texto}
              </motion.p>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-1.5 border-t border-[var(--borde)] pt-3">
          {RESPUESTAS_RAPIDAS.map((r) => (
            <span
              key={r}
              className="rounded-[8px] bg-[var(--primario-tinte)] px-2.5 py-1.5 text-[12px] font-semibold text-[var(--primario-hondo)]"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Universidades: el comparador con filtros que se aplican ───────────── */
function Comparador() {
  const [filtrado, setFiltrado] = useState(false);
  const [columnas, setColumnas] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setFiltrado(true), 900);
    const b = setTimeout(() => setColumnas(true), 1700);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  const filas = filtrado
    ? [...UNIVERSIDADES].sort((x, y) =>
        x.tipo === y.tipo ? y.valor - x.valor : x.tipo === "Pública" ? -1 : 1,
      )
    : [...UNIVERSIDADES].reverse();
  const FILTROS = ["Pública", "Presencial", "CABA"];
  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[12.5px] font-semibold text-[var(--navy)]">
          Filtros
        </span>
        {FILTROS.map((f, i) => (
          <motion.span
            key={f}
            className="rounded-[8px] px-2.5 py-1.5 text-[12px] font-semibold ring-1"
            animate={
              filtrado
                ? { backgroundColor: "var(--primario)", color: "#ffffff" }
                : { backgroundColor: "#ffffff", color: "var(--navy)" }
            }
            style={{
              ["--tw-ring-color" as string]: filtrado
                ? "var(--primario)"
                : "var(--borde)",
            }}
            transition={{ duration: 0.25, delay: i * 0.12 }}
          >
            {f}
          </motion.span>
        ))}
        <span className="ml-auto text-[12px] text-[var(--tenue)]">
          Ingeniería en Sistemas
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-[12px] ring-1 ring-[var(--borde)]">
        <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-3 bg-[#fbfaf7] px-4 py-2.5 text-[11.5px] font-semibold text-[var(--tenue)] md:grid-cols-[minmax(0,1.6fr)_90px_90px_130px_100px_minmax(0,1fr)]">
          <span>Universidad</span>
          <span className="hidden md:block">Tipo</span>
          <span className="hidden md:block">Modalidad</span>
          <span
            className={`hidden transition-opacity duration-500 md:block ${columnas ? "opacity-100" : "opacity-0"}`}
          >
            Cuota
          </span>
          <span
            className={`hidden transition-opacity duration-500 md:block ${columnas ? "opacity-100" : "opacity-0"}`}
          >
            Duración
          </span>
          <span>Qué tan alineada</span>
        </div>
        {filas.map((u, i) => {
          const fuera = filtrado && u.tipo !== "Pública";
          return (
            <motion.div
              key={u.corto}
              layout
              transition={{ layout: { duration: 0.6, ease: SALIDA } }}
              className={`grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center gap-3 border-t border-[var(--borde)] bg-white px-4 py-3 text-[13px] transition-opacity duration-500 md:grid-cols-[minmax(0,1.6fr)_90px_90px_130px_100px_minmax(0,1fr)] ${fuera ? "opacity-40" : ""}`}
            >
              <span className="truncate font-semibold text-[var(--navy)]">
                {u.nombre}
              </span>
              <span className="hidden text-[var(--texto2)] md:block">
                {u.tipo}
              </span>
              <span className="hidden text-[var(--texto2)] md:block">
                {u.modalidad}
              </span>
              <span
                className={`hidden text-[var(--texto2)] transition-opacity duration-500 md:block ${columnas ? "opacity-100" : "opacity-0"}`}
              >
                {u.cuota}
              </span>
              <span
                className={`hidden text-[var(--texto2)] transition-opacity duration-500 md:block ${columnas ? "opacity-100" : "opacity-0"}`}
              >
                {u.duracion}
              </span>
              <span className="flex items-center gap-2">
                <span className="block h-[6px] flex-1 overflow-hidden rounded-full bg-[var(--primario-tinte)]">
                  <motion.span
                    className="block h-full rounded-full bg-[var(--primario)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${u.valor}%` }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3 + i * 0.1,
                      ease: SALIDA,
                    }}
                  />
                </span>
                <span className="w-10 text-right text-[12px] font-semibold tabular-nums text-[var(--primario)]">
                  {filtrado && i === 0 ? (
                    <Circulo semilla={41} retraso={1.4}>
                      {u.valor} %
                    </Circulo>
                  ) : (
                    `${u.valor} %`
                  )}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-3 text-[12px] text-[var(--tenue)]">
        Datos de muestra del comparador de la app.
      </p>
    </div>
  );
}

/* ── Dónde se trabaja: lugares por área, con selector que cambia ───────── */
function Lugares() {
  const [area, setArea] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setArea((n) => (n + 1) % DONDE.length), 1700);
    return () => clearInterval(id);
  }, []);
  const actual = DONDE[area];
  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div className="flex gap-1.5">
        {DONDE.map((d, i) => (
          <button
            key={d.area}
            type="button"
            onClick={() => setArea(i)}
            className={`rounded-[8px] px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${i === area ? "bg-[var(--primario)] text-white" : "bg-white text-[var(--navy)] ring-1 ring-[var(--borde)]"}`}
          >
            {d.area}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul
          key={actual.area}
          className="mt-4 grid auto-rows-[96px] grid-cols-2 content-start gap-2.5 md:grid-cols-3"
          initial="fuera"
          animate="dentro"
          exit="sale"
          variants={{ dentro: { transition: { staggerChildren: 0.05 } } }}
        >
          {actual.lugares.map((l) => (
            <motion.li
              key={l}
              variants={{
                fuera: { opacity: 0, y: 10 },
                dentro: { opacity: 1, y: 0 },
                sale: { opacity: 0, y: -6 },
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-[12px] bg-white p-3.5 ring-1 ring-[var(--borde)]"
            >
              <span className="text-[13.5px] font-semibold leading-snug text-[var(--navy)]">
                {l}
              </span>
              <span className="mt-3 w-max rounded-[6px] bg-[var(--primario-tinte)] px-2 py-0.5 text-[11px] font-semibold text-[var(--primario-hondo)]">
                {actual.area}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <motion.p
        key={`v-${actual.area}`}
        className="mt-auto rounded-[12px] bg-[var(--primario-tinte)] px-4 py-3 text-[13.5px] leading-snug text-[var(--navy)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="block text-[11.5px] font-semibold text-[var(--primario)]">
          Lo que nadie te cuenta · {actual.area}
        </span>
        {actual.verdad}
      </motion.p>
    </div>
  );
}

const VISTAS = [Charla, Comparador, Lugares];

/**
 * "Con Timon, conectado con quienes lo viven" como vitrina al estilo Ramp:
 * tres pestañas que rotan solas cada ~5 s (con su barra de tiempo, se pueden
 * tocar y se frenan con el mouse) sobre un escenario grande con capas detrás.
 * Cada pestaña es una vista de la app armada en código con datos de la app.
 */
export function Vitrina() {
  const quieto = useReducedMotion();
  const [activa, setActiva] = useState(0);
  const [frenada, setFrenada] = useState(false);
  const Vista = VISTAS[activa];
  return (
    <div className="bg-[var(--primario-tinte)]">
      <section
        id="red"
        className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-20 lg:px-16 lg:py-28"
      >
        <div className="max-w-[760px]">
          <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--navy)]">
            Con Timon, tu hijo está conectado{" "}
            <span className="text-[var(--primario)]">
              con quienes lo viven.
            </span>
          </h2>
        </div>

        <div
          className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12"
          onMouseEnter={() => setFrenada(true)}
          onMouseLeave={() => setFrenada(false)}
        >
          <div>
            <div
              role="tablist"
              aria-label="La red de Timon"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
            >
              {PESTANAS.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  aria-selected={i === activa}
                  onClick={() => setActiva(i)}
                  className={`relative shrink-0 overflow-hidden rounded-[10px] px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
                    i === activa
                      ? "bg-white text-[var(--navy)] ring-1 ring-[var(--borde)] shadow-[0_8px_20px_-14px_rgba(15,31,54,0.4)]"
                      : "text-[var(--tenue)] hover:text-[var(--navy)]"
                  }`}
                >
                  {p.titulo}
                  {i === activa && (
                    <span
                      key={activa}
                      className="esc-tiempo absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--primario)]"
                      style={{
                        animationDuration: `${DURACION}ms`,
                        animationPlayState:
                          frenada || quieto ? "paused" : "running",
                      }}
                      onAnimationEnd={() =>
                        setActiva((n) => (n + 1) % VISTAS.length)
                      }
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="relative mt-5">
              <span
                aria-hidden
                className="absolute inset-x-6 -bottom-3 top-3 rounded-[18px] bg-white/70 ring-1 ring-[var(--borde)]"
              />
              <span
                aria-hidden
                className="absolute inset-x-12 -bottom-6 top-6 rounded-[18px] bg-white/40 ring-1 ring-[var(--borde)]"
              />
              <div className="relative h-[480px] overflow-hidden rounded-[18px] bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_40px_80px_-50px_rgba(15,31,54,0.5)] md:h-[540px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activa}
                    className="h-full"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: SALIDA }}
                  >
                    <Vista />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:content-center">
            {PESTANAS.map((p, i) => (
              <li
                key={p.id}
                className={`transition-opacity duration-300 ${i === activa ? "opacity-100" : "opacity-60"}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--primario-tinte)] text-[var(--primario)]">
                  <p.icono size={18} />
                </span>
                <p className="mt-3 text-[16px] font-semibold text-[var(--navy)]">
                  {p.titulo}
                </p>
                <p className="mt-1 text-[14.5px] text-[var(--texto2)]">
                  {p.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
