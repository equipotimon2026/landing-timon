"use client";

import { useState } from "react";
import { Anotalo } from "@/components/home/Anotalo";
import { Cabecera } from "./Cabecera";
import { Vitrina } from "./Vitrina";
import { Hero } from "./Hero";
import { Modulos } from "./Modulos";
import { Camino } from "./Narrativa";
import {
  Cambio,
  CarruselAreas,
  Confianza,
  Historia,
  Momento,
  Problema,
  Prueba,
  Testimonios,
} from "./Capitulos";
import { Banner, Cierre, Preguntas } from "./Secciones";

/**
 * /explora-hero/ramp: la home de Timon con el formato de ramp.com
 * (docs/referencias-hero/ramp.md). Relato (pedido de Nicolas, 14/11): el
 * mundo cambia rápido → solo es difícil seguirle el ritmo → Timon está
 * conectado con quienes lo viven y tu hijo entra a esa red → la conexión lo
 * acompaña en el tiempo. Cada sección es un capítulo con su fondo,
 * su layout y su tipo de visual (Capitulos.tsx): hero → marquesina de áreas →
 * titular gigante con cifras (crema) → el problema a mano → vitrina (tinte) →
 * bento → carrusel de áreas (crema) → banda azul → línea de tiempo → banda
 * navy → banner → historia fija (crema) → cita grande (tinte) → preguntas →
 * cierre sobre el footer azul.
 * El mail del hero viaja al formulario de padres, que se monta de nuevo con
 * ese mail ya cargado.
 */
export function RampPagina() {
  const [email, setEmail] = useState("");
  const alEnviar = (m: string) => {
    setEmail(m);
    requestAnimationFrame(() =>
      document
        .getElementById("anotalo")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <div className="ramp">
      <Cabecera />
      <main>
        <Hero alEnviar={alEnviar} />
        <Prueba />
        <Cambio />
        <Problema />
        <Vitrina />
        <Modulos />
        <CarruselAreas />
        <Confianza />
        <Camino />
        <Momento />
        <Banner />
        <Historia />
        <Testimonios />
        <Preguntas />
        <Cierre>
          <Anotalo key={email} emailInicial={email} />
        </Cierre>
      </main>
    </div>
  );
}
