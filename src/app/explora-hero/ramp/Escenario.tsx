"use client";

import { useEffect, useState } from "react";
import { Check, MousePointer2 } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Recorte } from "../app-a/Recorte";
import { CORTES, PASOS_HERO } from "./datos";
import { UniversidadMini } from "./Piezas";
import { Circulo, Flecha, Nota } from "./Lapiz";
import { HojaInforme, RecorridoParadas } from "./Vistas";

const SALIDA = [0.16, 1, 0.3, 1] as const;
const RAPIDA = [0.7, 0, 0.2, 1] as const;
const DURACION = 4200;

const PANTALLA =
  "relative overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_30px_60px_-36px_rgba(15,31,54,0.45)]";
const TARJETA =
  "rounded-[10px] bg-white ring-1 ring-[rgba(15,31,54,0.07)] shadow-[0_16px_34px_-18px_rgba(15,31,54,0.35)]";

type Raton = { x: MotionValue<number>; y: MotionValue<number> };

/** Cuatro marcas en las esquinas de una pieza, como una selección. */
function Esquinas() {
  return (
    <>
      {[
        "-left-[5px] -top-[5px]",
        "-right-[5px] -top-[5px]",
        "-bottom-[5px] -left-[5px]",
        "-bottom-[5px] -right-[5px]",
      ].map((p) => (
        <span
          key={p}
          aria-hidden
          className={`absolute h-[5px] w-[5px] bg-[var(--primario)] ${p}`}
        />
      ))}
    </>
  );
}

/**
 * Una pieza flotante alrededor de la pantalla: entra con escalonado, se mueve
 * apenas todo el tiempo y sigue al mouse según su profundidad.
 */
function Flotante({
  children,
  className,
  orden,
  profundidad,
  raton,
  marcas = false,
}: {
  children: React.ReactNode;
  className: string;
  orden: number;
  profundidad: number;
  raton: Raton;
  marcas?: boolean;
}) {
  const x = useTransform(raton.x, (v) => v * profundidad);
  const y = useTransform(raton.y, (v) => v * profundidad);
  return (
    <motion.div
      className={`absolute z-20 ${orden >= 2 ? "max-sm:hidden" : ""} ${className}`}
      style={{ x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
        transition={{
          duration: 0.55,
          delay: 0.35 + orden * 0.16,
          ease: SALIDA,
        }}
      >
        <motion.div
          className={`relative ${TARJETA}`}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3.2 + orden * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orden * 0.3,
          }}
        >
          {marcas && <Esquinas />}
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Etiqueta({
  children,
  punto = true,
}: {
  children: React.ReactNode;
  punto?: boolean;
}) {
  return (
    <p className="flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[12.5px] font-semibold text-[var(--navy)]">
      {punto && (
        <span
          aria-hidden
          className="h-[6px] w-[6px] rounded-full bg-[var(--primario)]"
        />
      )}
      {children}
    </p>
  );
}

/** Un cursor que recorre puntos de la pantalla (en % de la pantalla). */
function Cursor({
  x,
  y,
  times,
  delay = 0,
  duracion = 2.8,
}: {
  x: string[];
  y: string[];
  times: number[];
  delay?: number;
  duracion?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className="absolute z-20 -ml-[3px] -mt-[2px] text-[var(--navy)] drop-shadow-[0_2px_3px_rgba(15,31,54,0.25)]"
      initial={{ left: x[0], top: y[0], opacity: 0 }}
      animate={{ left: x, top: y, opacity: 1 }}
      transition={{
        duration: duracion,
        times,
        delay,
        ease: "easeInOut",
        opacity: { duration: 0.25, delay },
      }}
    >
      <MousePointer2 size={22} fill="white" strokeWidth={1.6} />
    </motion.span>
  );
}

/* ── 1 · Cuenta qué le gusta ─────────────────────────────────────────── */
function Paso1({ raton }: { raton: Raton }) {
  return (
    <>
      <div className={PANTALLA}>
        <RecorridoParadas />
      </div>
      <Flotante
        raton={raton}
        orden={0}
        profundidad={14}
        marcas
        className="-top-5 left-[6%]"
      >
        <Etiqueta>13 paradas</Etiqueta>
      </Flotante>
      <Flotante
        raton={raton}
        orden={1}
        profundidad={-10}
        className="-bottom-5 right-[6%]"
      >
        <Etiqueta>10 dimensiones</Etiqueta>
      </Flotante>
      <Flotante
        raton={raton}
        orden={2}
        profundidad={-14}
        marcas
        className="-right-8 -top-5"
      >
        <Etiqueta punto={false}>Evaluado por psicopedagogas</Etiqueta>
      </Flotante>
      <Flotante
        raton={raton}
        orden={3}
        profundidad={16}
        className="-bottom-5 left-[8%]"
      >
        <Etiqueta punto={false}>Menos de 10 min por parada</Etiqueta>
      </Flotante>
    </>
  );
}

/* ── 2 · Habla con profesionales ─────────────────────────────────────── */
function Paso2({ raton }: { raton: Raton }) {
  const respuesta = PASOS_HERO.charla;
  const [letras, setLetras] = useState(0);
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;
    const arranque = setTimeout(() => {
      id = setInterval(
        () => setLetras((n) => Math.min(respuesta.length, n + 4)),
        26,
      );
    }, 1100);
    return () => {
      clearTimeout(arranque);
      clearInterval(id);
    };
  }, [respuesta.length]);

  return (
    <>
      <div
        className={`${PANTALLA} flex min-h-[290px] flex-col gap-3 bg-[#fbfaf7] p-5 text-[14.5px] leading-snug sm:min-h-[330px]`}
      >
        <p className="text-[12px] font-semibold text-[var(--tenue)]">
          Salud · charla con un médico clínico
        </p>
        <motion.p
          className="self-end rounded-[14px] rounded-br-[4px] bg-[var(--primario)] px-3.5 py-2.5 text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3, ease: SALIDA }}
        >
          ¿Cómo es un día de trabajo para vos?
        </motion.p>
        <motion.div
          className="max-w-[92%] self-start rounded-[14px] rounded-bl-[4px] bg-white px-3.5 py-2.5 text-[var(--navy)] ring-1 ring-[var(--borde)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.7, ease: SALIDA }}
        >
          {letras === 0 ? <Escribiendo /> : respuesta.slice(0, letras)}
        </motion.div>
      </div>
      <Flotante
        raton={raton}
        orden={0}
        profundidad={-12}
        marcas
        className="-bottom-12 -left-2 sm:-bottom-7 sm:-left-8"
      >
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primario-tinte)] text-[13px] font-semibold text-[var(--primario)]"
          >
            MC
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-[var(--navy)]">
              Médico clínico
            </span>
            <span className="block text-[11.5px] text-[var(--tenue)]">
              Profesional de Salud
            </span>
          </span>
        </div>
      </Flotante>
      <Flotante
        raton={raton}
        orden={1}
        profundidad={12}
        className="-right-3 -top-5 sm:-right-8"
      >
        <Etiqueta>Respondió en tu chat</Etiqueta>
      </Flotante>
      <Flotante
        raton={raton}
        orden={2}
        profundidad={-16}
        className="-right-8 top-[52%]"
      >
        <div className="px-3.5 py-2.5">
          <Escribiendo />
        </div>
      </Flotante>
      <Flotante
        raton={raton}
        orden={3}
        profundidad={16}
        className="-bottom-6 right-[18%]"
      >
        <Etiqueta punto={false}>Preguntale lo que quieras</Etiqueta>
      </Flotante>
    </>
  );
}

function Escribiendo() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="Escribiendo">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[var(--tenue)]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

/* ── 3 · Conoce universidades y empresas ─────────────────────────────── */
function Paso3({ raton }: { raton: Raton }) {
  const modalidad = {
    left: "35.4%",
    top: "24.6%",
    width: "29.4%",
    height: "9.4%",
  };
  return (
    <>
      <div className={PANTALLA}>
        <div className="sm:hidden">
          <UniversidadMini />
        </div>
        <div className="max-sm:hidden">
          <Recorte
            corte={CORTES.comparador}
            alt="El comparador de universidades de Timon"
            sizes="(min-width: 1024px) 700px, 92vw"
          />
          <motion.span
            aria-hidden
            className="absolute z-10 flex items-center rounded-[999px] bg-white pl-[2.6%] text-[clamp(9px,1vw,14px)] text-[var(--navy)] ring-2 ring-[var(--primario)]"
            style={modalidad}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 1.1 }}
          >
            Presencial
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute left-[0.5%] top-[57%] z-10 h-[42%] w-[99%] rounded-[12px] ring-[3px] ring-[var(--primario)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.9 }}
          />
          <Cursor
            x={["70%", "50%", "50%", "60%", "60%"]}
            y={["94%", "29%", "29%", "70%", "70%"]}
            times={[0, 0.34, 0.5, 0.82, 1]}
            delay={0.1}
          />
        </div>
      </div>
      <Flotante
        raton={raton}
        orden={0}
        profundidad={12}
        marcas
        className="-right-3 -top-5 sm:-right-10"
      >
        <Etiqueta>Universidad de Buenos Aires · Muy alineada</Etiqueta>
      </Flotante>
      {/* [CONFIRMAR] "empresas": hoy la app muestra dónde se trabaja en cada área, sin empresas con nombre. */}
      <Flotante
        raton={raton}
        orden={1}
        profundidad={-12}
        className="-bottom-14 -left-3 sm:-left-8"
      >
        <div className="max-w-[240px] px-3.5 py-2.5">
          <p className="text-[11px] font-semibold text-[var(--tenue)]">
            Dónde se trabaja · Salud
          </p>
          <p className="mt-0.5 text-[13px] leading-snug text-[var(--navy)]">
            Hospitales, clínicas y laboratorios
          </p>
        </div>
      </Flotante>
      <Flotante
        raton={raton}
        orden={2}
        profundidad={-16}
        className="-top-5 left-[6%]"
      >
        <Etiqueta>Presencial</Etiqueta>
      </Flotante>
      <Flotante
        raton={raton}
        orden={3}
        profundidad={16}
        className="-bottom-12 right-[6%]"
      >
        <Etiqueta punto={false}>50 universidades</Etiqueta>
      </Flotante>
    </>
  );
}

/* ── 4 · Se lleva su informe ─────────────────────────────────────────── */
function Paso4({ raton }: { raton: Raton }) {
  return (
    <>
      <div className={`${PANTALLA} mx-auto max-w-[520px]`}>
        <HojaInforme desplaza />
      </div>
      <Flotante
        raton={raton}
        orden={0}
        profundidad={12}
        className="-bottom-5 right-0 sm:right-[4%]"
      >
        <p className="flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[12.5px] font-semibold text-[var(--navy)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primario)] text-white">
            <Check size={12} strokeWidth={3} />
          </span>
          Informe listo
        </p>
      </Flotante>
      <Flotante
        raton={raton}
        orden={1}
        profundidad={-12}
        marcas
        className="-top-11 left-0"
      >
        <Etiqueta>Tu esencia · Los caminos · Dónde construir</Etiqueta>
      </Flotante>
      {/* [CONFIRMAR] "queda conectado": qué parte de la red sigue disponible después del informe. */}
      <Flotante
        raton={raton}
        orden={2}
        profundidad={-16}
        className="-bottom-5 left-0"
      >
        <Etiqueta>Profesionales en su red</Etiqueta>
      </Flotante>
      <Flotante
        raton={raton}
        orden={3}
        profundidad={16}
        marcas
        className="-top-11 right-0"
      >
        <Etiqueta punto={false}>Revisalo con un profesional</Etiqueta>
      </Flotante>
    </>
  );
}

const PASOS = [Paso1, Paso2, Paso3, Paso4];

/** La raya que marca el tiempo del paso activo; al terminar pasa al siguiente. */
function Tiempo({
  frenado,
  alTerminar,
}: {
  frenado: boolean;
  alTerminar: () => void;
}) {
  return (
    <span
      className="esc-tiempo absolute inset-0 origin-left bg-[var(--primario)]"
      style={{
        animationDuration: `${DURACION}ms`,
        animationPlayState: frenado ? "paused" : "running",
      }}
      onAnimationEnd={alTerminar}
    />
  );
}

/**
 * El hero como recorrido guiado: cuatro pasos de unos 4 s, uno por vez, cada
 * uno con su leyenda y una sola pantalla de la app donde pasa algo. Alrededor
 * aparecen piezas blancas con datos reales que siguen al mouse y se mueven
 * apenas todo el tiempo. El indicador 1-2-3-4 marca el tiempo, se puede tocar
 * y se frena al pasar el mouse. En celular quedan dos piezas por paso. Con
 * menos movimiento no avanza solo.
 */
export function Escenario() {
  const quieto = useReducedMotion();
  const [activo, setActivo] = useState(0);
  const [frenado, setFrenado] = useState(false);
  const Paso = PASOS[activo];
  const textos = PASOS_HERO.pasos[activo];
  const siguiente = () => setActivo((n) => (n + 1) % PASOS.length);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const raton = {
    x: useSpring(mx, { stiffness: 80, damping: 18 }),
    y: useSpring(my, { stiffness: 80, damping: 18 }),
  };

  return (
    <div
      className="rounded-[18px] border border-[var(--borde)] bg-[var(--escenario)] p-4 sm:p-6 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12 lg:p-10"
      onMouseEnter={() => setFrenado(true)}
      onMouseLeave={() => {
        setFrenado(false);
        mx.set(0);
        my.set(0);
      }}
      onMouseMove={(e) => {
        if (quieto) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
    >
      <div className="flex flex-col">
        {/* Leyenda del paso activo: arriba de la pantalla en celular */}
        <div
          className="min-h-[118px] sm:min-h-[100px] lg:min-h-[170px]"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: RAPIDA }}
            >
              <p className="text-[14px] font-semibold text-[var(--primario)]">
                Paso {activo + 1} de 4
              </p>
              <p className="mt-1.5 text-[clamp(1.35rem,2.3vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--navy)]">
                {textos.titulo}
              </p>
              <p className="mt-2 text-[15.5px] text-[var(--tenue)]">
                {textos.bajada}
              </p>
              {activo === 1 && (
                <div className="relative mt-6 hidden h-[70px] lg:block">
                  <Nota className="absolute left-0 top-0">
                    preguntale lo que quieras
                  </Nota>
                  <Flecha
                    ancho={280}
                    alto={40}
                    desde={[0, 4]}
                    hasta={[270, 30]}
                    curva={-0.15}
                    semilla={17}
                    retraso={0.6}
                    className="absolute left-[110px] top-[26px]"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <ol
          aria-label="Pasos"
          className="mt-3 grid grid-cols-4 gap-2 lg:mt-auto lg:grid-cols-1 lg:gap-0"
        >
          {PASOS_HERO.pasos.map((p, i) => (
            <li key={p.titulo}>
              <button
                type="button"
                onClick={() => setActivo(i)}
                aria-current={i === activo ? "step" : undefined}
                aria-label={`Paso ${i + 1}: ${p.corto}`}
                className={`w-full text-left lg:border-t lg:border-[var(--borde)] lg:pt-3 ${
                  i === activo
                    ? "text-[var(--navy)]"
                    : "text-[var(--tenue)] hover:text-[var(--navy)]"
                }`}
              >
                <span className="relative flex items-center gap-3 text-[15px] font-medium">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-colors duration-300 ${
                      i === activo
                        ? "bg-[var(--primario)] text-white"
                        : "bg-white text-[var(--tenue)] ring-1 ring-[var(--borde)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i === activo && (
                    <span
                      key={activo}
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-0 hidden lg:block"
                    >
                      <Circulo semilla={30 + i}>
                        <span className="block h-6 w-6" />
                      </Circulo>
                    </span>
                  )}
                  <span className="hidden lg:inline">{p.corto}</span>
                </span>
                <span className="relative mt-3 block h-[3px] overflow-hidden rounded-full bg-[var(--primario-suave)] lg:h-[2px] lg:bg-transparent">
                  {i === activo && (
                    <Tiempo
                      key={activo}
                      frenado={frenado || Boolean(quieto)}
                      alTerminar={siguiente}
                    />
                  )}
                  {i < activo && (
                    <span className="absolute inset-0 bg-[var(--primario)] lg:hidden" />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* La pantalla del paso y sus piezas */}
      <div className="relative mt-8 grid min-h-[300px] items-center px-3 pb-12 pt-4 sm:pb-6 sm:min-h-[360px] sm:px-10 lg:mt-0 lg:min-h-[500px] lg:pb-14">
        <AnimatePresence initial={false}>
          <motion.div
            key={activo}
            className="relative col-start-1 row-start-1 w-full"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.5, ease: RAPIDA }}
          >
            <Paso raton={raton} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
