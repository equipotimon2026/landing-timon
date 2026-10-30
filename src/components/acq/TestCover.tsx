/**
 * Imagen del lead magnet (el test de intereses en un celular), generada en el
 * ChatGPT de Nico el 26/10/2026. Reemplaza a la tapa dibujada en CSS, que se
 * veía "muy de IA". `circulo` llena el círculo de "Elegí cómo empezar".
 */
export function TestCover({ className = '', circulo = false }: { className?: string; circulo?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/test/portada.jpg"
      alt="El test de intereses de Timon en un celular"
      className={`object-cover ${
        circulo ? 'h-full w-full rounded-full' : 'aspect-[3/4] rounded-md shadow-[0_18px_40px_rgba(15,31,54,0.28)]'
      } ${className}`}
    />
  )
}
