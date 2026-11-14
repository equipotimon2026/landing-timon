/**
 * "Cómo funciona", contado paso a paso para las variantes app-a y app-b.
 *
 * Todo sale de lo que ya dice la home (Recorrido.tsx, docs/wording-v2.md,
 * src/lib/programa.ts) o de lo que se lee en las capturas de la demo
 * (/public/app, datos ficticios de "Sofía"). Lo único con duración conocida
 * es el paso 1 (13 paradas de menos de 10 minutos) y el total (dos semanas,
 * un rato por día, desde el celular): el resto no lleva tiempo para no
 * inventarlo.
 *
 * Las pantallas se muestran recortadas: cada `Corte` es un rectángulo en
 * píxeles de la captura original. mac-comparador muestra la UBA, así que de
 * esa captura solo se usan los filtros y la barra de "Muy alineada".
 */

export type Corte = {
  src: string;
  /** Tamaño de la captura completa, en px. */
  ancho: number;
  alto: number;
  /** Rectángulo visible, en px de la captura. */
  x: number;
  y: number;
  w: number;
  h: number;
};

const mac = (
  nombre: string,
  x: number,
  y: number,
  w: number,
  h: number,
): Corte => ({
  src: `/app/mac-${nombre}.webp`,
  ancho: 1800,
  alto: 1125,
  x,
  y,
  w,
  h,
});

const tel = (
  nombre: string,
  x: number,
  y: number,
  w: number,
  h: number,
): Corte => ({
  src: `/app/iphone-${nombre}.webp`,
  ancho: 720,
  alto: 1561,
  x,
  y,
  w,
  h,
});

export type Paso = {
  n: number;
  nombre: string;
  /** Qué hace tu hijo, en una frase. */
  titulo: string;
  bajada: string;
  /** Cuánto le lleva: solo cuando está en los datos. */
  tiempo: string | null;
  /** Qué se lleva al terminar el paso. */
  lleva: string;
  /** Recorte grande en escritorio. */
  pantalla: Corte;
  /** Recorte del celular: la pieza principal en mobile. */
  celu: Corte;
  /** Zoom a lo importante, superpuesto. */
  detalle: Corte;
  /** Nota a mano que señala el detalle. */
  nota: string;
  alt: string;
};

export const PASOS: Paso[] = [
  {
    n: 1,
    nombre: "Se conoce",
    titulo: "Empieza por conocerse.",
    bajada:
      "Hace 13 paradas sobre sí mismo: qué le atrae, su historia en el colegio, su familia, y hasta la mirada de alguien que lo conoce bien.",
    tiempo:
      "Menos de 10 minutos cada parada, desde el celular. El avance se guarda solo.",
    lleva: "Su perfil, armado con sus propias respuestas.",
    pantalla: mac("test", 330, 300, 1140, 825),
    celu: tel("test", 0, 330, 720, 1050),
    detalle: mac("test", 1145, 134, 315, 88),
    nota: "su perfil, listo",
    alt: "El camino de paradas de Timon: tres completadas y la cuarta por empezar",
  },
  {
    n: 2,
    nombre: "Investiga",
    titulo: "Después, mira el trabajo por dentro.",
    bajada:
      "Elige las áreas que le atraen entre 16 y charla con un profesional virtual de cada una. Pregunta lo que quiera; cada charla cierra con una síntesis.",
    tiempo: null,
    lleva: "Las áreas que le interesan de verdad, y por qué.",
    pantalla: mac("investigacion", 440, 205, 920, 735),
    celu: tel("investigacion", 0, 250, 720, 1200),
    detalle: mac("investigacion", 1056, 561, 304, 232),
    nota: "charla con Valentina, psicóloga",
    alt: "Las áreas de trabajo con fotos y el profesional de cada una, con dos sugeridas",
  },
  {
    n: 3,
    nombre: "Se descubre",
    titulo: "Recibe un informe sobre quién es.",
    bajada:
      "Sus rasgos, del más fuerte al más suave, contados en sus palabras. Y las carreras que van con ese perfil.",
    tiempo: null,
    lleva: "Su informe: quién es y qué caminos le cierran.",
    pantalla: mac("informe", 640, 362, 880, 690),
    celu: tel("informe", 30, 230, 670, 990),
    detalle: mac("informe", 200, 128, 310, 452),
    nota: "su informe, por dentro",
    alt: "La esencia en el informe: rasgos de Análisis a Expresión, con su puntaje",
  },
  {
    n: 4,
    nombre: "Compara",
    titulo: "Y elige dónde estudiar.",
    bajada:
      "Compara universidades por cuota, modalidad y zona, y ve cuánto se acerca cada una a su perfil.",
    tiempo: null,
    lleva: "Las universidades que van con él, una al lado de la otra.",
    pantalla: mac("comparador", 440, 160, 1130, 500),
    celu: tel("comparador", 0, 200, 720, 1080),
    detalle: mac("comparador", 1340, 770, 200, 60),
    nota: "qué tan alineada está",
    alt: "El comparador de universidades con filtros de cuota, modalidad y ubicación",
  },
];

export const RECORRIDO = {
  total: "Dos semanas, un rato por día, desde el celular.",
  finalTitulo: "Al final, la familia tiene algo concreto para hablar.",
  finalItems: [
    "Quién es tu hijo",
    "Qué carreras van con él",
    "Dónde estudiarlas",
  ],
  finalBajada: "Todo en su informe. Y mientras tanto, vos ves si avanza.",
};
