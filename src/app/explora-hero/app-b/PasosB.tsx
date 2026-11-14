"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { urlRegistro } from "@/lib/programa";
import { PASOS, RECORRIDO, type Paso } from "../app-datos";
import { Recorte } from "../app-a/Recorte";

const SUAVE = [0.22, 1, 0.36, 1] as const;
const DURACION = 7;

/** Detrás de cada pantalla, un fondo de marca distinto. */
const FONDOS = [
  "var(--crema)",
  "var(--cielo)",
  "var(--durazno)",
  "var(--arena)",
];

/** Dónde cae el zoom de cada paso dentro del escenario (escritorio). */
const ZOOM: Record<number, { caja: string }> = {
  1: { caja: "bottom-[7%] left-[5%] w-[42%]" },
  2: { caja: "bottom-[5%] right-[4%] w-[44%]" },
  3: { caja: "bottom-[6%] right-[5%] w-[33%]" },
  4: { caja: "bottom-[9%] right-[6%] w-[34%]" },
};

const TARJETA =
  "overflow-hidden bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_40px_70px_-36px_rgba(15,31,54,0.55),0_10px_24px_-14px_rgba(15,31,54,0.25)]";

const MANO = "font-[family-name:var(--font-mano)] leading-none";

/** Escenario: la pantalla del paso en capas. Cambia con un fundido y un leve ascenso. */
function Escenario({ paso, quieto }: { paso: Paso; quieto: boolean }) {
  const z = ZOOM[paso.n];
  const t = (retraso: number) => ({
    duration: quieto ? 0 : 0.7,
    delay: quieto ? 0 : retraso,
    ease: SUAVE,
  });
  return (
    <div
      className="relative aspect-[1/1.08] overflow-hidden rounded-[28px] transition-colors duration-700 lg:aspect-[1.18/1] lg:rounded-[36px]"
      style={{ background: FONDOS[paso.n - 1] }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={paso.n}
          className="absolute inset-0"
          exit={{ opacity: 0, transition: { duration: quieto ? 0 : 0.35 } }}
        >
          {/* escritorio: recorte de la pantalla grande */}
          <motion.div
            initial={quieto ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.1)}
            className={`absolute left-[8%] top-[8%] hidden w-[104%] rounded-[16px] lg:block ${TARJETA}`}
          >
            <Recorte corte={paso.pantalla} alt={paso.alt} sizes="860px" />
          </motion.div>
          {/* celular: recorte de la app del teléfono, sin teléfono */}
          <motion.div
            initial={quieto ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.05)}
            className={`absolute left-[8%] top-[7%] w-[84%] rounded-[20px] lg:hidden ${TARJETA}`}
          >
            <Recorte corte={paso.celu} alt={paso.alt} sizes="340px" />
          </motion.div>
          {/* el zoom a lo que importa, con su nota a mano */}
          <motion.div
            initial={quieto ? false : { opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={t(0.45)}
            className={`absolute z-10 hidden lg:block ${z.caja}`}
          >
            <div className={`${TARJETA} rounded-[18px] p-2.5 pt-0`}>
              <motion.p
                aria-hidden
                initial={quieto ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={t(0.85)}
                className={`truncate px-1.5 pb-2 pt-3 text-[20px] text-[var(--terra-hondo)] ${MANO}`}
              >
                {paso.nota}
              </motion.p>
              <div className="overflow-hidden rounded-[10px] ring-1 ring-[rgba(15,31,54,0.06)]">
                <Recorte corte={paso.detalle} alt="" sizes="480px" />
              </div>
            </div>
          </motion.div>
          {paso.n !== 3 && (
            <motion.div
              initial={quieto ? false : { opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={t(0.4)}
              className={`absolute bottom-[6%] right-[5%] z-10 lg:hidden ${paso.n === 1 ? "w-[62%]" : paso.n === 2 ? "w-[54%]" : "w-[46%]"}`}
            >
              <div className={`${TARJETA} rounded-[12px]`}>
                <Recorte corte={paso.detalle} alt="" sizes="260px" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Tramo del hilo entre dos números: se llena en terra a medida que avanza. */
function Tramo({
  lleno,
  className,
  vertical = false,
}: {
  lleno: MotionValue<number>;
  className: string;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`absolute overflow-hidden bg-white/15 ${className}`}
    >
      <motion.span
        className={`absolute inset-0 bg-[var(--terra)] ${vertical ? "origin-top" : "origin-left"}`}
        style={vertical ? { scaleY: lleno } : { scaleX: lleno }}
      />
    </span>
  );
}

function useTramo(i: number, activa: number, avance: MotionValue<number>) {
  return useTransform(avance, (p) => (i < activa ? 1 : i === activa ? p : 0));
}

function Numero({
  n,
  estado,
}: {
  n: number;
  estado: "hecho" | "activo" | "futuro";
}) {
  return (
    <span
      aria-hidden
      className={`display relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[21px] transition-[background-color,color,box-shadow] duration-500 lg:h-12 lg:w-12 lg:text-[23px] ${
        estado === "activo"
          ? "bg-[var(--terra)] text-white shadow-[0_0_0_6px_rgba(201,127,94,0.22)]"
          : estado === "hecho"
            ? "bg-[var(--navy)] text-[var(--terra)] ring-2 ring-[var(--terra)]"
            : "bg-[var(--navy)] text-white/55 ring-2 ring-white/20"
      }`}
    >
      {n}
    </span>
  );
}

function Detalle({ paso }: { paso: Paso }) {
  return (
    <>
      <p className="mt-3 max-w-[42ch] text-[17px] text-white/75">
        {paso.bajada}
      </p>
      <dl className="mt-5 grid gap-3 text-[15.5px]">
        {paso.tiempo && (
          <div>
            <dt className="text-white/50">Cuánto le lleva</dt>
            <dd className="text-white">{paso.tiempo}</dd>
          </div>
        )}
        <div>
          <dt className="text-white/50">Qué se lleva</dt>
          <dd className="font-semibold text-[var(--crema)]">{paso.lleva}</dd>
        </div>
      </dl>
    </>
  );
}

/**
 * "Cómo funciona", variante B: una escena en navy con los cuatro pasos en un
 * hilo numerado a la izquierda (arriba en celular) y la pantalla del paso a
 * la derecha, en capas. Avanza sola, despacio, mientras está a la vista: el
 * tramo del hilo que sigue al paso activo se llena con el tiempo. Elegir un
 * paso o pasar el mouse la frena. Con menos movimiento no avanza sola.
 */
export function PasosB() {
  const quieto = !!useReducedMotion();
  const seccion = useRef<HTMLElement>(null);
  const visible = useInView(seccion, { amount: 0.45 });
  const [activa, setActiva] = useState(0);
  const [auto, setAuto] = useState(true);
  const [encima, setEncima] = useState(false);
  const avance = useMotionValue(0);

  const corre = auto && !quieto && visible && !encima;

  useEffect(() => {
    if (!corre) return;
    const resto = DURACION * (1 - avance.get());
    const c = animate(avance, 1, {
      duration: resto,
      ease: "linear",
      onComplete: () => {
        avance.set(0);
        setActiva((a) => (a + 1) % PASOS.length);
      },
    });
    return () => c.stop();
  }, [corre, activa, avance]);

  const elegir = (i: number) => {
    setAuto(false);
    avance.set(1);
    setActiva(i);
  };

  const t0 = useTramo(0, activa, avance);
  const t1 = useTramo(1, activa, avance);
  const t2 = useTramo(2, activa, avance);
  const t3 = useTramo(3, activa, avance);
  const tramos = [t0, t1, t2, t3];
  const paso = PASOS[activa];
  const pausa = (
    <button
      type="button"
      onClick={() => {
        if (auto) return setAuto(false);
        avance.set(0);
        setAuto(true);
      }}
      className="mt-8 text-[14px] text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white motion-reduce:hidden"
    >
      {auto ? "Pausar" : "Que avance solo"}
    </button>
  );
  const estado = (i: number) =>
    i === activa ? "activo" : i < activa ? "hecho" : "futuro";

  return (
    <section
      ref={seccion}
      id="como-funciona"
      className="overflow-x-clip bg-[var(--navy)] py-20 text-white lg:py-28"
      onPointerEnter={(e) => e.pointerType === "mouse" && setEncima(true)}
      onPointerLeave={() => setEncima(false)}
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <h2 className="display max-w-[17ch] text-[clamp(2.3rem,4.4vw,3.7rem)]">
          De la primera parada a <strong>elegir dónde estudiar</strong>.
        </h2>
        <p className="mt-5 max-w-[44ch] text-[18px] text-white/70">
          Cuatro pasos, en este orden. {RECORRIDO.total}
        </p>

        {/* ── Celular: hilo horizontal arriba ─────────────────────────── */}
        <div className="mt-12 lg:hidden">
          <div className="relative flex items-center justify-between">
            <span
              aria-hidden
              className={`absolute -top-7 left-0 -rotate-3 text-[18px] text-[var(--terra)] ${MANO}`}
            >
              día 1
            </span>
            {PASOS.map((p, i) => (
              <div
                key={p.n}
                className="relative flex flex-1 items-center last:flex-none"
              >
                <button
                  type="button"
                  onClick={() => elegir(i)}
                  aria-label={`Paso ${p.n}: ${p.nombre}`}
                  aria-current={i === activa ? "step" : undefined}
                  className="rounded-full"
                >
                  <Numero n={p.n} estado={estado(i)} />
                </button>
                {i < PASOS.length - 1 && (
                  <Tramo
                    lleno={tramos[i]}
                    className="left-11 right-0 top-1/2 h-[2px] -translate-y-1/2"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 grid">
            {PASOS.map((p, i) => (
              <div
                key={p.n}
                className={`[grid-area:1/1] transition-opacity duration-500 ${i === activa ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={i !== activa}
              >
                <p className={`text-[21px] text-[var(--terra)] ${MANO}`}>
                  {p.nombre.toLowerCase()}
                </p>
                <h3 className="display mt-2 text-[30px]">{p.titulo}</h3>
                <Detalle paso={p} />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Escenario paso={paso} quieto={quieto} />
          </div>
          {pausa}
        </div>

        {/* ── Escritorio: hilo vertical a la izquierda, escenario a la derecha ── */}
        <div className="mt-14 hidden grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-16 lg:grid">
          <div className="relative">
            <span
              aria-hidden
              className={`absolute -top-9 left-0 -rotate-3 text-[21px] text-[var(--terra)] ${MANO}`}
            >
              día 1
            </span>
            <ol className="relative">
              {PASOS.map((p, i) => (
                <li key={p.n} className="relative pb-7 pl-[72px]">
                  <Tramo
                    vertical
                    lleno={tramos[i]}
                    className="bottom-0 left-[23px] top-12 w-[2px]"
                  />
                  <button
                    type="button"
                    onClick={() => elegir(i)}
                    aria-current={i === activa ? "step" : undefined}
                    className="group absolute left-0 top-0 rounded-full"
                    aria-label={`Paso ${p.n}: ${p.nombre}`}
                  >
                    <Numero n={p.n} estado={estado(i)} />
                  </button>
                  <button
                    type="button"
                    onClick={() => elegir(i)}
                    className="block w-full rounded-[10px] text-left"
                    tabIndex={-1}
                  >
                    <span
                      className={`block text-[20px] transition-colors duration-500 ${MANO} ${i === activa ? "text-[var(--terra)]" : "text-white/45"}`}
                    >
                      {p.nombre.toLowerCase()}
                    </span>
                    <span
                      className={`display mt-1.5 block transition-[color,font-size] duration-500 ${
                        i === activa
                          ? "text-[34px] text-white"
                          : "text-[22px] text-white/60 hover:text-white/90"
                      }`}
                    >
                      {p.titulo}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ${i === activa ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden" aria-hidden={i !== activa}>
                      <Detalle paso={p} />
                    </div>
                  </div>
                </li>
              ))}
              <li className="relative pl-[72px]">
                <span
                  aria-hidden
                  className="absolute left-[16px] top-0 h-4 w-4 rounded-full bg-[var(--terra)] ring-[6px] ring-[rgba(201,127,94,0.22)]"
                />
                <span
                  className={`block -rotate-2 text-[21px] text-[var(--terra)] ${MANO}`}
                >
                  día 14: llega su informe
                </span>
              </li>
            </ol>
            {pausa}
          </div>
          <div className="lg:sticky lg:top-28">
            <Escenario paso={paso} quieto={quieto} />
          </div>
        </div>

        {/* ── Lo que recibe la familia ─────────────────────────────────── */}
        <div className="mt-20 grid gap-8 border-t border-white/12 pt-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h3 className="display max-w-[16ch] text-[clamp(1.9rem,3vw,2.7rem)]">
            {RECORRIDO.finalTitulo}
          </h3>
          <div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {RECORRIDO.finalItems.map((t) => (
                <li
                  key={t}
                  className="flex items-baseline gap-3 text-[20px] font-semibold tracking-[-0.02em]"
                >
                  <span
                    aria-hidden
                    className={`text-[24px] text-[var(--terra)] ${MANO}`}
                  >
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[36ch] text-[17px] text-white/70">
                {RECORRIDO.finalBajada}
              </p>
              <a
                href={urlRegistro()}
                className="btn btn-terra self-start sm:self-auto"
              >
                Empezar el recorrido
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
