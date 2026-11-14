"use client";

import { useRef } from "react";
import {
  MotionConfig,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "motion/react";
import { urlRegistro } from "@/lib/programa";
import { PASOS, RECORRIDO, type Paso } from "../app-datos";
import { Recorte } from "./Recorte";

const SUAVE = [0.22, 1, 0.36, 1] as const;

/** Fondo de marca detrás de cada pantalla: tapa el violeta de la app con calor. */
const FONDOS = [
  "var(--crema)",
  "var(--cielo)",
  "var(--durazno)",
  "var(--arena)",
];

/**
 * Dónde cae el zoom en cada paso (escritorio). Porcentajes del panel.
 * El 1 baja la barra de perfil sobre el borde de arriba; el 2 saca la
 * tarjeta de Valentina por la izquierda; el 3 agranda los dos rasgos más
 * fuertes; el 4 aísla "Muy alineada", lejos del nombre de la universidad.
 */
const ZOOM: Record<number, { caja: string; celu: string }> = {
  1: { caja: "bottom-[-6%] left-[-6%] w-[44%]", celu: "w-[64%]" },
  2: { caja: "bottom-[-12%] right-[-8%] w-[46%]", celu: "w-[56%]" },
  3: { caja: "bottom-[-10%] left-[-9%] w-[26%]", celu: "w-[40%]" },
  4: { caja: "bottom-[-14%] right-[-5%] w-[30%]", celu: "w-[48%]" },
};

const TARJETA =
  "overflow-hidden rounded-[16px] bg-white ring-1 ring-[rgba(15,31,54,0.08)] shadow-[0_40px_70px_-40px_rgba(15,31,54,0.45),0_10px_24px_-14px_rgba(15,31,54,0.22)]";

function Escena({ paso, espejo }: { paso: Paso; espejo: boolean }) {
  const z = ZOOM[paso.n];
  const entra = (y: number, retraso: number, escala = 1) => ({
    initial: { opacity: 0, y, scale: escala },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "0px 0px -20% 0px" },
    transition: { duration: 0.9, delay: retraso, ease: SUAVE },
  });

  return (
    <div className="relative">
      {/* Escritorio: la pantalla grande, recortada, sangrando por un costado */}
      <motion.div
        {...entra(30, 0)}
        className="relative hidden overflow-hidden rounded-[32px] py-[9%] lg:block"
        style={{ background: FONDOS[paso.n - 1] }}
      >
        <motion.div
          {...entra(70, 0.15)}
          className={`relative w-[104%] ${espejo ? "ml-[-13%]" : "ml-[9%]"} ${TARJETA}`}
        >
          <Recorte corte={paso.pantalla} alt={paso.alt} sizes="900px" />
        </motion.div>
      </motion.div>

      {/* Celular: el recorte de la app en el teléfono, sin el teléfono */}
      <motion.div
        {...entra(24, 0)}
        className="relative aspect-[1/1.02] overflow-hidden rounded-[28px] lg:hidden"
        style={{ background: FONDOS[paso.n - 1] }}
      >
        <motion.div
          {...entra(50, 0.12)}
          className={`absolute left-[7%] top-[7%] w-[86%] ${TARJETA} rounded-[22px]`}
        >
          <Recorte corte={paso.celu} alt={paso.alt} sizes="300px" />
        </motion.div>
      </motion.div>

      {/* El zoom: lo que importa de la pantalla, más grande y por encima */}
      <motion.div
        {...entra(18, 0.55, 0.94)}
        className={`absolute z-10 hidden lg:block ${z.caja}`}
      >
        <div
          className={`${TARJETA} rounded-[14px] ring-[rgba(201,127,94,0.35)]`}
        >
          <Recorte corte={paso.detalle} alt="" sizes="520px" />
        </div>
      </motion.div>
      <motion.div
        {...entra(14, 0.45, 0.94)}
        className={`absolute bottom-[-6%] z-10 lg:hidden ${espejo ? "right-[-2%]" : "left-[-2%]"} ${z.celu} ${paso.n === 3 ? "hidden" : ""}`}
      >
        <div className={`${TARJETA} rounded-[12px]`}>
          <Recorte corte={paso.detalle} alt="" sizes="360px" />
        </div>
      </motion.div>
    </div>
  );
}

function Bloque({ paso, i }: { paso: Paso; i: number }) {
  const nodo = useRef<HTMLDivElement>(null);
  const pasado = useInView(nodo, { margin: "0px 0px -50% 0px" });
  const espejo = i % 2 === 1;
  const texto = (k: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: { duration: 0.7, delay: 0.08 * k, ease: SUAVE },
  });

  return (
    <li className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-x-6">
      {/* Nodo del hilo con el número del paso */}
      <div
        ref={nodo}
        className="relative z-10 flex justify-center pt-1 lg:pt-[3px]"
      >
        <span
          className={`display flex h-11 w-11 items-center justify-center rounded-full text-[22px] transition-[background-color,color,border-color] duration-500 lg:h-16 lg:w-16 lg:text-[30px] ${
            pasado
              ? "border-2 border-[var(--terra)] bg-[var(--terra)] text-white"
              : "border-2 border-[var(--borde)] bg-white text-[var(--tenue)]"
          }`}
          aria-hidden
        >
          {paso.n}
        </span>
      </div>

      <div
        className={`grid items-center gap-y-12 pb-24 lg:gap-x-16 lg:pb-36 ${
          espejo
            ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]"
            : "lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]"
        }`}
      >
        <div className={espejo ? "lg:order-2 lg:pl-4" : ""}>
          <motion.p
            {...texto(0)}
            className="text-[16px] font-semibold leading-none tracking-[-0.01em] text-[var(--terra-hondo)]"
          >
            <span className="sr-only">Paso {paso.n} de 4: </span>
            {paso.nombre}
          </motion.p>
          <motion.h3
            {...texto(1)}
            className="display mt-3 max-w-[14ch] text-[clamp(2rem,3.4vw,3.1rem)] text-[var(--navy)]"
          >
            {paso.titulo}
          </motion.h3>
          <motion.p
            {...texto(2)}
            className="mt-5 max-w-[40ch] text-[17.5px] text-[var(--texto2)]"
          >
            {paso.bajada}
          </motion.p>
          <motion.dl
            {...texto(3)}
            className="mt-8 max-w-[40ch] border-t border-[var(--borde)] text-[16px]"
          >
            {paso.tiempo && (
              <div className="grid gap-1 border-b border-[var(--borde)] py-3.5 sm:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="text-[var(--tenue)]">Cuánto le lleva</dt>
                <dd className="text-[var(--navy)]">{paso.tiempo}</dd>
              </div>
            )}
            <div className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] sm:gap-4">
              <dt className="text-[var(--tenue)]">Qué se lleva</dt>
              <dd className="font-semibold text-[var(--navy)]">{paso.lleva}</dd>
            </div>
          </motion.dl>
        </div>
        <div className={espejo ? "lg:order-1" : ""}>
          <Escena paso={paso} espejo={espejo} />
        </div>
      </div>
    </li>
  );
}

/**
 * "Cómo funciona", variante A: los cuatro pasos como bloques alternados
 * texto/pantalla, colgados de un hilo numerado que se llena con el scroll y
 * termina en lo que recibe la familia. Las pantallas son recortes de las
 * capturas reales en tarjetas, con un zoom superpuesto al detalle que importa.
 * Con menos movimiento (MotionConfig "user") las entradas son solo fundidos.
 */
export function PasosA() {
  const hilo = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: hilo,
    offset: ["start 50%", "end 50%"],
  });
  const avance = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="app"
        className="overflow-x-clip bg-white pb-20 pt-10 lg:pb-28"
      >
        <div className="mx-auto max-w-[1240px] px-5 lg:px-10">
          <div className="lg:pl-[112px]">
            <h2 className="display max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.4rem)] text-[var(--navy)]">
              Lo que hace tu hijo en Timon, <strong>paso a paso</strong>.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[18.5px] text-[var(--texto2)]">
              Cuatro pasos en orden. {RECORRIDO.total}
            </p>
          </div>

          <div className="relative mt-16 lg:mt-24">
            {/* El hilo: gris de fondo, terra a medida que se avanza */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[23px] top-2 w-[2px] bg-[var(--borde)] lg:left-[43px]"
            />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-[23px] top-2 w-[2px] origin-top bg-[var(--terra)] lg:left-[43px]"
              style={{ scaleY: avance }}
            />
            <ol ref={hilo} className="relative">
              {PASOS.map((p, i) => (
                <Bloque key={p.n} paso={p} i={i} />
              ))}
            </ol>

            {/* Llegada: lo que recibe la familia */}
            <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-x-6">
              <div className="relative z-10 flex justify-center">
                <span
                  aria-hidden
                  className="mt-10 h-5 w-5 rounded-full bg-[var(--terra)] ring-[6px] ring-[rgba(201,127,94,0.22)] lg:mt-14"
                />
              </div>
              <div className="relative overflow-hidden rounded-[32px] bg-[var(--bloque,var(--navy))] px-6 py-10 text-white lg:rounded-[40px] lg:px-16 lg:py-16">
                <h3 className="display max-w-[18ch] text-[clamp(2rem,3.6vw,3.2rem)]">
                  {RECORRIDO.finalTitulo}
                </h3>
                <ul className="mt-10 grid gap-px overflow-hidden rounded-[20px] bg-white/12 lg:grid-cols-3">
                  {RECORRIDO.finalItems.map((t, i) => (
                    <li
                      key={t}
                      className="flex items-baseline gap-4 bg-[var(--bloque,var(--navy))] px-1 py-5 lg:px-8 lg:py-8"
                    >
                      <span
                        aria-hidden
                        className="text-[17px] font-semibold tabular-nums leading-none text-[var(--terra)]"
                      >
                        {i + 1}
                      </span>
                      <span className="text-[21px] font-semibold tracking-[-0.02em] lg:text-[23px]">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <p className="max-w-[38ch] text-[17.5px] text-white/75">
                    {RECORRIDO.finalBajada}
                  </p>
                  <a
                    href={urlRegistro()}
                    className="btn btn-terra self-start lg:self-auto"
                  >
                    Empezar el recorrido
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
