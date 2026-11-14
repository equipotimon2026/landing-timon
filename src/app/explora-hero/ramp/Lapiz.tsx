"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Trazos a lápiz (pedido de Nicolas, 14/11/2026): subrayados, círculos,
 * resaltados y flechas que se dibujan una vez al entrar en pantalla. Cada
 * trazo tiene un temblor que sale de una semilla fija (el dibujo es siempre
 * el mismo, sin saltos al hidratar) y se calcula en píxeles reales del texto,
 * así el grosor no se deforma. Se usan pocos y nunca encima del texto.
 */

const COLOR = "var(--primario)";

/** Pseudoaleatorio con semilla, para que el temblor sea estable. */
function azar(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
}

const dibujo = (retraso = 0, duracion = 0.8) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: {
    pathLength: {
      duration: duracion,
      delay: retraso,
      ease: [0.45, 0, 0.25, 1] as const,
    },
    opacity: { duration: 0.01, delay: retraso },
  },
});

const aD = (puntos: number[][]) =>
  puntos.reduce(
    (d, [x, y], i) =>
      `${d}${i === 0 ? "M" : " L"}${x.toFixed(1)} ${y.toFixed(1)}`,
    "",
  );

/** Mide el ancho y alto de un elemento (y los actualiza si cambia). */
function useTamano<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [tam, setTam] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setTam({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, tam] as const;
}

/** Una línea casi recta de 0 a w, con temblor. */
function linea(semilla: number, w: number, y: number, amplitud: number) {
  const r = azar(semilla);
  return aD(
    Array.from({ length: 8 }, (_, i) => [
      (i * w) / 7 + r() * 3,
      y + r() * amplitud,
    ]),
  );
}

/** Subrayado de dos pasadas bajo un texto. */
export function Subrayado({
  children,
  semilla = 3,
  retraso = 0.3,
}: {
  children: React.ReactNode;
  semilla?: number;
  retraso?: number;
}) {
  const [ref, { w }] = useTamano<HTMLSpanElement>();
  return (
    <span ref={ref} className="relative inline-block">
      {children}
      {w > 0 && (
        <svg
          aria-hidden
          width={w}
          height={14}
          viewBox={`0 0 ${w} 14`}
          className="pointer-events-none absolute -bottom-[0.32em] left-0 overflow-visible"
        >
          <motion.path
            d={linea(semilla, w, 5, 3)}
            fill="none"
            stroke={COLOR}
            strokeWidth={2.6}
            strokeLinecap="round"
            {...dibujo(retraso)}
          />
          <motion.path
            d={linea(semilla + 7, w * 0.92, 9, 3)}
            fill="none"
            stroke={COLOR}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.65}
            {...dibujo(retraso + 0.25, 0.6)}
          />
        </svg>
      )}
    </span>
  );
}

/** Un óvalo a mano alrededor de un texto, que no cierra perfecto. */
export function Circulo({
  children,
  semilla = 5,
  retraso = 0.3,
}: {
  children: React.ReactNode;
  semilla?: number;
  retraso?: number;
}) {
  const [ref, { w, h }] = useTamano<HTMLSpanElement>();
  const r = azar(semilla);
  const pasos = 28;
  const rx = w / 2 + 10;
  const ry = h / 2 + 1;
  const d = aD(
    Array.from({ length: pasos + 3 }, (_, i) => {
      const t = (i / pasos) * Math.PI * 2 - 0.5;
      const extra = i > pasos ? 4 : 0;
      return [
        w / 2 + Math.cos(t) * (rx + r() * 4 + extra),
        h / 2 + Math.sin(t) * (ry + r() * 3),
      ];
    }),
  );
  return (
    <span ref={ref} className="relative inline-block">
      {children}
      {w > 0 && (
        <svg
          aria-hidden
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
        >
          <motion.path
            d={d}
            fill="none"
            stroke={COLOR}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...dibujo(retraso, 0.9)}
          />
        </svg>
      )}
    </span>
  );
}

/** Resaltador a mano detrás de un texto. */
export function Resaltado({
  children,
  retraso = 0.3,
}: {
  children: React.ReactNode;
  retraso?: number;
}) {
  const [ref, { w, h }] = useTamano<HTMLSpanElement>();
  return (
    <span ref={ref} className="relative inline-block">
      {w > 0 && (
        <svg
          aria-hidden
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
        >
          <motion.path
            d={linea(11, w + 8, h * 0.62, 3)}
            transform="translate(-4 0)"
            fill="none"
            stroke="var(--primario-suave)"
            strokeWidth={h * 0.42}
            strokeLinecap="round"
            {...dibujo(retraso, 0.7)}
          />
        </svg>
      )}
      <span className="relative">{children}</span>
    </span>
  );
}

/**
 * Flecha a mano de `desde` a `hasta` (en px dentro de su caja), con una curva
 * suave y la punta en dos trazos.
 */
export function Flecha({
  ancho,
  alto,
  desde,
  hasta,
  curva = 0.25,
  semilla = 9,
  retraso = 0.4,
  className = "",
}: {
  ancho: number;
  alto: number;
  desde: [number, number];
  hasta: [number, number];
  curva?: number;
  semilla?: number;
  retraso?: number;
  className?: string;
}) {
  const r = azar(semilla);
  const [x1, y1] = desde;
  const [x2, y2] = hasta;
  const mx = (x1 + x2) / 2 - (y2 - y1) * curva + r() * 4;
  const my = (y1 + y2) / 2 + (x2 - x1) * curva + r() * 4;
  const cuerpo = `M${x1} ${y1} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2} ${y2}`;
  const ang = Math.atan2(y2 - my, x2 - mx);
  const punta = (giro: number, largo: number) => {
    const a = ang + Math.PI + giro;
    return `M${x2} ${y2} L${(x2 + Math.cos(a) * largo).toFixed(1)} ${(y2 + Math.sin(a) * largo).toFixed(1)}`;
  };
  return (
    <svg
      aria-hidden
      width={ancho}
      height={alto}
      viewBox={`0 0 ${ancho} ${alto}`}
      className={`pointer-events-none overflow-visible ${className}`}
    >
      <motion.path
        d={cuerpo}
        fill="none"
        stroke={COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        {...dibujo(retraso, 0.7)}
      />
      <motion.path
        d={punta(0.45, 11 + r() * 2)}
        fill="none"
        stroke={COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        {...dibujo(retraso + 0.65, 0.18)}
      />
      <motion.path
        d={punta(-0.5, 10 + r() * 2)}
        fill="none"
        stroke={COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        {...dibujo(retraso + 0.75, 0.18)}
      />
    </svg>
  );
}

/** Nota corta en letra a mano (Kalam), máximo 3 o 4 palabras. */
export function Nota({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`pointer-events-none whitespace-nowrap font-[family-name:var(--font-mano)] text-[19px] leading-none text-[var(--primario)] ${className}`}
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.9 }}
    >
      {children}
    </motion.span>
  );
}
