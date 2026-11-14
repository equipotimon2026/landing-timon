import { PasosA } from "./PasosA";

/**
 * Cómo funciona A, la elegida (14/11/2026). Para pasarla a landing-v2 alcanza
 * con llevar PasosA.tsx, Recorte.tsx y ../app-datos.ts y montar <PasosA />
 * después del hero: la sección ya trae su ancla #app.
 */
export default function AppA() {
  return (
    <div className="pt-16 lg:pt-24">
      <PasosA />
    </div>
  );
}
