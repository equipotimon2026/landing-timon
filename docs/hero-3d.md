# Hero 3D

El hero muestra una sola MacBook en 3D con el informe real en la pantalla
(`public/app/mac-informe.webp`). Entra con la tapa entornada y se abre a medida
que se baja por el hero (la sección mide 185svh y la escena queda fija).

- Código: `src/components/home/hero3d/` (`Escena.tsx`, `Dispositivos3D.tsx`, `geometria.ts`).
- Stack: three 0.187, @react-three/fiber 9.8, @react-three/drei 10.7.
- **Modelos: propios, sin GLB.** La MacBook se arma en código (placas extruidas con
  bisel, teclas instanciadas, bisagra). No hay assets de terceros, así que no hay
  licencias que anotar ni archivos que comprimir con Draco/meshopt. Si algún día se
  pasa a un GLB, anotar acá la fuente y la licencia (CC0 o CC-BY) y comprimirlo con
  `npx gltf-transform optimize --compress draco`.
- Luz: Lightformers de drei dentro de `<Environment>` (softboxes), sin HDR externos.
  Sombra con `ContactShadows`.
- Carga: `next/dynamic` con `ssr: false`, montado en `requestIdleCallback`. Solo
  dibuja con el hero a la vista (IntersectionObserver → `frameloop="never"`).
- Fallback (la MacBook en DOM de `Dispositivos.tsx`) cuando: el usuario pidió menos
  movimiento, ahorro de datos, sin WebGL, o celular con menos de 6 núcleos o menos
  de 4 GB (Safari no informa la memoria: se asume suficiente).
