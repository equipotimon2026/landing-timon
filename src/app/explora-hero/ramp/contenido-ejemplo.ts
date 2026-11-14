/**
 * CONTENIDO DE EJEMPLO para la vista previa local de /explora-hero/ramp
 * (pedido de Nicolas, 14/11/2026: "poné citas y llená todos los campos
 * vacíos"). Nada de esto es real: son textos de muestra para ver la página
 * terminada. NO puede ir a landing-v2 ni a producción mientras `esEjemplo`
 * sea true. Qué hace falta para reemplazar cada uno: docs/contenido-a-reemplazar.md.
 */
export const esEjemplo = true

/** Citas de muestra, con roles genéricos (sin nombres de personas ni instituciones). */
export const CITAS_EJEMPLO = [
  {
    texto: 'Mi hija tenía tres carreras en la cabeza y ninguna certeza. Hablar con gente que trabaja de eso le ordenó todo.',
    quien: 'Madre de una alumna de 5.º año',
    rol: 'Ciudad de Buenos Aires',
    esEjemplo: true,
  },
  {
    texto: 'Pensé que era otro test, pero terminé preguntándole a un médico cómo es una guardia. Eso no me lo contaba nadie.',
    quien: 'Estudiante de 17 años',
    rol: 'Provincia de Buenos Aires',
    esEjemplo: true,
  },
]

/** Borrador de la historia, solo con lo que se sabe (fundadores y roles en lib/programa.ts). */
export const HISTORIA_EJEMPLO = {
  esEjemplo: true,
  parrafos: [
    'Timon nace de una pregunta que todos nos hicimos a los 17: ¿cómo elegir una carrera sin conocer el mundo en el que vas a trabajar?',
    'Facu se ocupa del producto y la operación, Feli de los colegios y las familias, y Nico de la tecnología. Juntos armamos lo que nos hubiera gustado tener: un camino para conocerse y, sobre todo, para hablar con quienes ya viven cada carrera.',
  ],
}
