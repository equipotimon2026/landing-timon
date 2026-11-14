import Image from "next/image";
import type { Corte } from "../app-datos";

/**
 * Un pedazo de una captura real: muestra solo el rectángulo `corte` de la
 * imagen, escalado al ancho de la caja. Sirve para enseñar la parte que
 * importa de una pantalla sin el resto (ni el marco de un dispositivo).
 */
export function Recorte({
  corte,
  alt,
  sizes,
  className = "",
}: {
  corte: Corte;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const { ancho, alto, x, y, w, h } = corte;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div
        className="absolute"
        style={{
          width: `${(ancho / w) * 100}%`,
          height: `${(alto / h) * 100}%`,
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      >
        <Image
          src={corte.src}
          alt={alt}
          fill
          sizes={sizes}
          className="select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
