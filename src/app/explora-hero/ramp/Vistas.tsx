"use client";

import { useEffect, useState } from "react";
import { Check, Send } from "lucide-react";
import { motion } from "motion/react";
import {
  CARRERAS,
  OTRA_MIRADA,
  PARADAS,
  PROFESIONALES,
  RASGOS,
  UNIVERSIDADES,
} from "./datos-app";

/**
 * Vistas de la app de Timon armadas en código (Plus Jakarta, azul de marca,
 * datos de datos-app.ts), para el hero y el bento. Nada de capturas con
 * fotos ni tipografías ajenas a la marca.
 */

const SALIDA = [0.16, 1, 0.3, 1] as const;
const enVista = { once: true, margin: "0px 0px -10% 0px" } as const;

function Barra({
  valor,
  retraso = 0,
  color = "var(--primario)",
  alto = 6,
}: {
  valor: number;
  retraso?: number;
  color?: string;
  alto?: number;
}) {
  return (
    <span
      className="block overflow-hidden rounded-full bg-[var(--primario-tinte)]"
      style={{ height: alto }}
    >
      <motion.span
        className="block h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${valor}%` }}
        viewport={enVista}
        transition={{ duration: 0.9, delay: retraso, ease: SALIDA }}
      />
    </span>
  );
}

/* ── El recorrido de 13 paradas (hero, paso 1) ─────────────────────────── */

const ESCALA = ["Me encanta", "Me gusta", "Me da igual", "No me gusta"];

/** Una actividad de cada tipo, que va cambiando mientras avanza el recorrido. */
function Actividad({ n }: { n: number }) {
  if (n === 0)
    return (
      <div>
        <p className="text-[11.5px] font-semibold text-[var(--primario)]">
          RIASEC Holland · intereses
        </p>
        <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[var(--navy)]">
          Entender cómo funciona algo hasta el fondo
        </p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {ESCALA.map((e, i) => (
            <motion.span
              key={e}
              className={`rounded-[8px] px-2.5 py-2 text-center text-[12.5px] font-semibold ring-1 ${i === 0 ? "bg-[var(--primario)] text-white ring-[var(--primario)]" : "bg-white text-[var(--navy)] ring-[var(--borde)]"}`}
              initial={i === 0 ? { scale: 1 } : false}
              animate={i === 0 ? { scale: [1, 0.96, 1] } : undefined}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </div>
    );
  if (n === 1)
    return (
      <div>
        <p className="text-[11.5px] font-semibold text-[var(--primario)]">
          Vos y el colegio · tu historia
        </p>
        <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[var(--navy)]">
          Tu historia dentro del sistema educativo.
        </p>
        <div className="mt-3 space-y-1.5">
          {[
            "Materias que más te gustaron",
            "Cómo te fue en cada etapa",
            "Qué cambiarías",
          ].map((t, i) => (
            <motion.p
              key={t}
              className="flex items-center gap-2 rounded-[8px] bg-white px-2.5 py-2 text-[12.5px] text-[var(--navy)] ring-1 ring-[var(--borde)]"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.15 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primario)]" />
              {t}
            </motion.p>
          ))}
        </div>
      </div>
    );
  return (
    <div>
      <p className="text-[11.5px] font-semibold text-[var(--primario)]">
        Otra mirada · alguien que te conoce
      </p>
      <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[var(--navy)]">
        {OTRA_MIRADA.invitacion}
      </p>
      <motion.p
        className="mt-3 rounded-[10px] rounded-bl-[3px] bg-white px-3 py-2.5 text-[12.5px] leading-snug text-[var(--navy)] ring-1 ring-[var(--borde)]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <span className="block text-[11px] font-semibold text-[var(--tenue)]">
          {OTRA_MIRADA.quien}
        </span>
        “{OTRA_MIRADA.respuesta}”
      </motion.p>
    </div>
  );
}

/** Las 13 paradas con sus nombres de la app, avanzando, y una actividad de cada tipo. */
export function RecorridoParadas() {
  const [hechas, setHechas] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setHechas((n) => (n >= 5 ? n : n + 1)), 750);
    return () => clearInterval(id);
  }, []);
  const tipo = hechas <= 3 ? 0 : hechas === 4 ? 1 : 2;
  return (
    <div className="grid gap-4 bg-[#fbfaf7] p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] sm:p-5">
      <div className="max-sm:hidden">
        <div className="flex items-center justify-between text-[12px] font-semibold text-[var(--navy)]">
          <span>Tu recorrido</span>
          <span className="text-[var(--primario)]">{hechas} de 13</span>
        </div>
        <span className="mt-2 block h-[4px] overflow-hidden rounded-full bg-[var(--primario-suave)]">
          <motion.span
            className="block h-full rounded-full bg-[var(--primario)]"
            animate={{ width: `${(hechas / 13) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </span>
        <ol className="mt-3 space-y-[3px]">
          {PARADAS.map((p, i) => {
            const hecha = i < hechas;
            const actual = i === hechas;
            return (
              <li
                key={p.titulo}
                className={`flex items-center gap-2 rounded-[6px] px-1.5 py-[3px] text-[12px] transition-colors ${actual ? "bg-white ring-1 ring-[var(--primario-suave)]" : ""}`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold transition-colors duration-300 ${
                    hecha
                      ? "bg-[var(--primario)] text-white"
                      : actual
                        ? "ring-2 ring-[var(--primario)] text-[var(--primario)]"
                        : "ring-1 ring-[var(--borde)] text-[var(--tenue)]"
                  }`}
                >
                  {hecha ? <Check size={10} strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`truncate ${hecha || actual ? "text-[var(--navy)]" : "text-[var(--tenue)]"}`}
                >
                  {p.titulo}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="flex flex-col justify-center rounded-[12px] bg-[var(--primario-tinte)] p-4">
        <motion.div
          key={tipo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: SALIDA }}
        >
          <Actividad n={tipo} />
        </motion.div>
      </div>
    </div>
  );
}

/* ── La hoja del informe ───────────────────────────────────────────────── */

function Seccion({
  n,
  titulo,
  children,
}: {
  n: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--borde)] py-4 first:border-t-0 first:pt-0">
      <p className="flex items-baseline gap-2">
        <span className="text-[11px] font-semibold text-[var(--primario)]">
          {n}
        </span>
        <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-[var(--navy)]">
          {titulo}
        </span>
      </p>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function Fila({
  nombre,
  detalle,
  valor,
  retraso,
}: {
  nombre: string;
  detalle?: string;
  valor: number;
  retraso: number;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
      <span className="truncate text-[12.5px] text-[var(--navy)]">
        {nombre}
        {detalle && <span className="text-[var(--tenue)]"> · {detalle}</span>}
      </span>
      <span className="text-[12px] font-semibold tabular-nums text-[var(--primario)]">
        {valor} %
      </span>
      <span className="col-span-2">
        <Barra valor={valor} retraso={retraso} alto={5} />
      </span>
    </div>
  );
}

/** Las secciones reales del informe, con los datos de muestra del demo. */
export const SECCIONES_INFORME = [
  {
    n: "01",
    titulo: "Tu esencia",
    cuerpo: (
      <div className="space-y-2">
        {RASGOS.map((r, i) => (
          <Fila
            key={r.nombre}
            nombre={r.nombre}
            valor={r.valor}
            retraso={0.1 + i * 0.08}
          />
        ))}
      </div>
    ),
  },
  {
    n: "02",
    titulo: "Los caminos",
    cuerpo: (
      <div className="space-y-2">
        {CARRERAS.map((c, i) => (
          <Fila
            key={c.nombre}
            nombre={c.nombre}
            detalle={c.campo}
            valor={c.valor}
            retraso={0.1 + i * 0.08}
          />
        ))}
      </div>
    ),
  },
  {
    n: "03",
    titulo: "Dónde construir",
    cuerpo: (
      <div className="space-y-2">
        {UNIVERSIDADES.slice(0, 3).map((u, i) => (
          <Fila
            key={u.corto}
            nombre={u.corto}
            detalle={`${u.tipo} · ${u.cuota}`}
            valor={u.valor}
            retraso={0.1 + i * 0.08}
          />
        ))}
      </div>
    ),
  },
  {
    n: "04",
    titulo: "Otra mirada",
    cuerpo: (
      <p className="rounded-[10px] bg-[var(--primario-tinte)] px-3 py-2.5 text-[12.5px] leading-snug text-[var(--navy)]">
        “{OTRA_MIRADA.respuesta}”{" "}
        <span className="text-[var(--tenue)]">· {OTRA_MIRADA.quien}</span>
      </p>
    ),
  },
  {
    n: "05",
    titulo: "Próximos pasos",
    cuerpo: (
      <p className="flex items-center justify-between gap-3 rounded-[10px] bg-white px-3 py-2.5 text-[12.5px] text-[var(--navy)] ring-1 ring-[var(--borde)]">
        Revisarlo con un profesional
        <span className="shrink-0 text-[11.5px] font-semibold text-[var(--primario)]">
          45 min · videollamada
        </span>
      </p>
    ),
  },
];

/**
 * La hoja del informe. Con `desplaza`, la hoja baja sola por sus secciones
 * (para el hero); si no, muestra las primeras `cuantas`.
 */
export function HojaInforme({
  desplaza = false,
  cuantas = SECCIONES_INFORME.length,
}: {
  desplaza?: boolean;
  cuantas?: number;
}) {
  const secciones = SECCIONES_INFORME.slice(0, cuantas);
  const hoja = (
    <div className="px-5 pb-5 pt-4">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--borde)] pb-3">
        <p className="text-[15px] font-semibold tracking-[-0.015em] text-[var(--navy)]">
          Tu informe
        </p>
        <span className="text-[11.5px] font-semibold text-[var(--tenue)]">
          Timon
        </span>
      </div>
      {secciones.map((s) => (
        <Seccion key={s.n} n={s.n} titulo={s.titulo}>
          {s.cuerpo}
        </Seccion>
      ))}
    </div>
  );
  if (!desplaza) return <div className="bg-white">{hoja}</div>;
  return (
    <div className="relative h-[330px] overflow-hidden bg-white sm:h-[380px]">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: ["0%", "0%", "-46%"] }}
        transition={{
          duration: 3.6,
          times: [0, 0.25, 1],
          ease: [0.45, 0, 0.25, 1],
        }}
      >
        {hoja}
      </motion.div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-white/0 shadow-[inset_0_-24px_20px_-12px_#fff]"
      />
    </div>
  );
}

/* ── Piezas del bento ──────────────────────────────────────────────────── */

/** Profesionales: tres tarjetas en abanico y una burbuja que se escribe. */
export function PilaProfesionales() {
  const texto =
    "Consultorio a la mañana: pacientes de a uno, escuchar, revisar, pedir estudios, ajustar tratamientos.";
  const [letras, setLetras] = useState(0);
  const [arranca, setArranca] = useState(false);
  useEffect(() => {
    if (!arranca || letras >= texto.length) return;
    const id = setTimeout(() => setLetras((n) => n + 3), 26);
    return () => clearTimeout(id);
  }, [arranca, letras]);
  return (
    <div className="flex h-full flex-col gap-4 bg-[#fbfaf7] p-5">
      <div className="relative h-[118px] shrink-0">
        {PROFESIONALES.slice(0, 3).map((p, i) => (
          <motion.div
            key={p.nombre}
            className="absolute inset-x-0 rounded-[12px] bg-white p-3.5 ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_14px_30px_-20px_rgba(15,31,54,0.4)]"
            style={{ top: (2 - i) * 20, zIndex: 3 - (2 - i) }}
            initial={{ scale: 1 - (2 - i) * 0.05, opacity: 0 }}
            whileInView={{
              scale: 1 - (2 - i) * 0.05,
              opacity: 1,
              rotate: (2 - i) * -1.5,
            }}
            viewport={enVista}
            transition={{ duration: 0.5, delay: 0.12 * i, ease: SALIDA }}
          >
            <div
              className={`flex items-center gap-2.5 ${i === 2 ? "" : "invisible"}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primario-tinte)] text-[12px] font-semibold text-[var(--primario)]">
                {p.nombre
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold text-[var(--navy)]">
                  {p.rol}
                </span>
                <span className="block truncate text-[12px] text-[var(--tenue)]">
                  {p.area} · profesional virtual
                </span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="self-end rounded-[12px] rounded-br-[3px] bg-[var(--primario)] px-3.5 py-2 text-[12.5px] text-white"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={enVista}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        ¿Cómo es un día de trabajo para vos?
      </motion.p>
      <motion.p
        className="max-w-[92%] rounded-[12px] rounded-bl-[3px] bg-white px-3.5 py-2.5 text-[12.5px] leading-snug text-[var(--navy)] ring-1 ring-[var(--borde)]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={enVista}
        transition={{ duration: 0.4, delay: 0.9 }}
        onAnimationComplete={() => setArranca(true)}
      >
        <span className="block text-[11px] font-semibold text-[var(--primario)]">
          Médico clínico
        </span>
        {letras === 0 ? "…" : texto.slice(0, letras)}
      </motion.p>
    </div>
  );
}

/** Universidades: un ranking corto con barras que se llenan y sus datos. */
export function RankingUniversidades() {
  return (
    <ol className="h-full space-y-2 bg-[#fbfaf7] p-5">
      {UNIVERSIDADES.map((u, i) => (
        <li
          key={u.corto}
          className="rounded-[10px] bg-white p-3 ring-1 ring-[var(--borde)]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-semibold text-[var(--navy)]">
              <span className="mr-1.5 text-[var(--tenue)]">{i + 1}</span>
              {u.corto}
            </span>
            <span className="text-[12px] font-semibold tabular-nums text-[var(--primario)]">
              {u.valor} %
            </span>
          </div>
          <span className="mt-2 block">
            <Barra valor={u.valor} retraso={0.15 + i * 0.1} alto={5} />
          </span>
          <p className="mt-1.5 text-[11.5px] text-[var(--tenue)]">
            {u.tipo} · {u.modalidad} · {u.cuota}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Su perfil: las 13 paradas con sus nombres, cinco hechas. */
export function StepperParadas() {
  return (
    <div className="h-full bg-[#fbfaf7] p-5">
      <div className="flex items-center justify-between text-[12px] font-semibold">
        <span className="text-[var(--navy)]">13 paradas · 10 dimensiones</span>
        <span className="text-[var(--primario)]">5 de 13</span>
      </div>
      <span className="mt-2 block">
        <Barra valor={38} alto={5} />
      </span>
      <ol className="mt-3 space-y-1">
        {PARADAS.slice(0, 7).map((p, i) => (
          <motion.li
            key={p.titulo}
            className="flex items-center gap-2 text-[12.5px]"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={enVista}
            transition={{ duration: 0.35, delay: 0.05 * i }}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${
                i < 5
                  ? "bg-[var(--primario)] text-white"
                  : i === 5
                    ? "text-[var(--primario)] ring-2 ring-[var(--primario)]"
                    : "text-[var(--tenue)] ring-1 ring-[var(--borde)]"
              }`}
            >
              {i < 5 ? <Check size={10} strokeWidth={3} /> : i + 1}
            </span>
            <span
              className={i <= 5 ? "text-[var(--navy)]" : "text-[var(--tenue)]"}
            >
              {p.titulo}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** Otra mirada: la invitación, la respuesta y lo que suma al perfil. */
export function OtraMiradaVista() {
  return (
    <div className="h-full space-y-2.5 bg-[#fbfaf7] p-5">
      <div className="rounded-[10px] bg-white p-3 ring-1 ring-[var(--borde)]">
        <p className="text-[12.5px] font-semibold text-[var(--navy)]">
          {OTRA_MIRADA.invitacion}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-[6px] bg-[var(--primario)] px-2.5 py-1 text-[11.5px] font-semibold text-white">
          <Send size={11} /> Invitación enviada
        </p>
      </div>
      <motion.div
        className="rounded-[10px] rounded-bl-[3px] bg-white p-3 ring-1 ring-[var(--borde)]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={enVista}
        transition={{ duration: 0.45, delay: 0.3 }}
      >
        <p className="text-[11px] font-semibold text-[var(--tenue)]">
          Responde: {OTRA_MIRADA.quien}
        </p>
        <p className="mt-1 text-[12.5px] leading-snug text-[var(--navy)]">
          “{OTRA_MIRADA.respuesta}”
        </p>
      </motion.div>
      <motion.p
        className="flex items-center gap-2 text-[12px] font-semibold text-[var(--primario)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={enVista}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Check size={13} strokeWidth={3} /> Se suma a su perfil:{" "}
        {OTRA_MIRADA.suma}
      </motion.p>
    </div>
  );
}
