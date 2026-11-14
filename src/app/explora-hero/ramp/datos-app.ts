/**
 * Datos de la app de Timon para las vistas armadas en código de
 * /explora-hero/ramp. Todo sale del repo `timon` (revisado el 14/11/2026):
 * - Las 13 paradas: src/components/journey-path/journey-steps-config.ts.
 * - Profesionales virtuales del catálogo: src/lib/demo/areas16.ts (son
 *   personajes de la app, no personas reales).
 * - Rasgos, carreras, universidades y "Otra mirada": los datos de muestra del
 *   demo (src/app/demo-nuevo-timon/_demo/mock.ts, src/lib/university-data.ts y
 *   las capturas de /public/app de "Sofía").
 * - Dónde se trabaja: src/lib/mundos.ts (copia del catálogo de la app).
 */

export const PARADAS = [
  { titulo: "¿Con quién te sentís identificado?", tipo: "Historias de otros" },
  { titulo: "Vos y el colegio", tipo: "Tu historia escolar" },
  { titulo: "Contexto familiar", tipo: "Tu familia" },
  { titulo: "Otra mirada", tipo: "Alguien que te conoce" },
  { titulo: "Dominancia", tipo: "Cómo pensás" },
  { titulo: "RIASEC Holland", tipo: "Perfil vocacional" },
  { titulo: "Inteligencias múltiples", tipo: "Aptitudes" },
  { titulo: "Chatiemos · Parte 1", tipo: "Personalidad" },
  { titulo: "Chatiemos · Parte 2", tipo: "Preguntas abiertas" },
  { titulo: "Autobiografía", tipo: "Tu historia" },
  { titulo: "Estilo de vida", tipo: "Vida laboral ideal" },
  { titulo: "Hablemos con profesionales", tipo: "Charlas" },
  { titulo: "Universidad", tipo: "Preferencias" },
];

/** Rasgos del informe de muestra ("Tu esencia"). */
export const RASGOS = [
  { nombre: "Análisis", valor: 92 },
  { nombre: "Curiosidad", valor: 86 },
  { nombre: "Creatividad", valor: 80 },
  { nombre: "Autonomía", valor: 76 },
];

/** Carreras del demo ("Los caminos"), con su compatibilidad. */
export const CARRERAS = [
  { nombre: "Economía", campo: "Ciencias Económicas", valor: 88 },
  { nombre: "Diseño Industrial", campo: "Diseño", valor: 72 },
  { nombre: "Ingeniería Ambiental", campo: "Ingeniería", valor: 51 },
];

/** Universidades del demo ("Dónde construir"), para Ingeniería en Sistemas. */
export const UNIVERSIDADES = [
  {
    nombre: "Universidad de Buenos Aires",
    corto: "UBA",
    tipo: "Pública",
    modalidad: "Presencial",
    cuota: "Gratuita",
    duracion: "5 años + CBC",
    zona: "Microcentro",
    valor: 94,
  },
  {
    nombre: "Instituto Tecnológico de Buenos Aires",
    corto: "ITBA",
    tipo: "Privada",
    modalidad: "Presencial",
    cuota: "$450 a 550 mil",
    duracion: "5 años",
    zona: "Puerto Madero",
    valor: 89,
  },
  {
    nombre: "Universidad Tecnológica Nacional",
    corto: "UTN",
    tipo: "Pública",
    modalidad: "Híbrida",
    cuota: "Gratuita",
    duracion: "5 años",
    zona: "Almagro",
    valor: 87,
  },
  {
    nombre: "Universidad Católica Argentina",
    corto: "UCA",
    tipo: "Privada",
    modalidad: "Presencial",
    cuota: "$380 a 480 mil",
    duracion: "4 años",
    zona: "Puerto Madero",
    valor: 78,
  },
];

/** Profesionales virtuales del catálogo de la app. */
export const PROFESIONALES = [
  { nombre: "Diego Moreira", rol: "Médico clínico", area: "Salud" },
  { nombre: "Sofía Méndez", rol: "Ingeniera en Sistemas", area: "Tecnología" },
  {
    nombre: "Ana Suárez",
    rol: "Diseñadora · Artista visual",
    area: "Diseño y Arte",
  },
  { nombre: "Julián Ortega", rol: "Arquitecto", area: "Arquitectura" },
  { nombre: "Lucía Ferreyra", rol: "Emprendedora", area: "Negocios" },
];

/** La charla con el profesional de Salud: su relato y una verdad del oficio (lib/mundos.ts). */
export const CHARLA = [
  { de: "alumno", texto: "¿Cómo es un día de trabajo para vos?" },
  {
    de: "pro",
    texto:
      "Consultorio a la mañana: pacientes de a uno, escuchar, revisar, pedir estudios, ajustar tratamientos. Algunos días hago guardia en el hospital.",
  },
  { de: "alumno", texto: "¿Qué es lo que nadie te cuenta?" },
  {
    de: "pro",
    texto:
      "La carrera es larga y la residencia es dura: sin vocación no se sostiene.",
  },
];

export const RESPUESTAS_RAPIDAS = [
  "¿Qué estudiaste?",
  "¿Qué es lo más lindo?",
  "¿Dónde trabajás?",
];

/** Dónde se trabaja, por área (lib/mundos.ts, campo "donde"). */
export const DONDE = [
  {
    area: "Salud",
    verdad:
      "La carrera es larga y la residencia es dura: sin vocación no se sostiene.",
    lugares: [
      "Hospitales públicos y privados",
      "Clínicas y sanatorios",
      "Consultorios propios",
      "Laboratorios",
      "Investigación",
      "Gestión del sistema de salud",
    ],
  },
  {
    area: "Tecnología",
    verdad: "Programar es 20% escribir código y 80% pensar, leer y corregir.",
    lugares: [
      "Empresas de software y startups",
      "Bancos",
      "E-commerce",
      "Estudios de videojuegos",
      "Consultoras",
      "Trabajo remoto para el exterior",
    ],
  },
  {
    area: "Diseño",
    verdad:
      "Diseñar es resolver el problema de otro; el arte es expresar lo tuyo.",
    lugares: [
      "Estudios de diseño y agencias",
      "Áreas de diseño de empresas",
      "Editorial",
      "Moda e industria",
      "Galerías y ferias",
      "Freelance",
    ],
  },
];

/** "Otra mirada" del demo: lo que contesta la madre de la alumna. */
export const OTRA_MIRADA = {
  invitacion: "Invitá a alguien que te conoce bien a sumar su mirada.",
  quien: "Madre",
  respuesta: "Es muy creativa y constante cuando algo le interesa.",
  suma: "Creatividad",
};
