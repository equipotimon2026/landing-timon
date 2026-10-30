/**
 * Los 16 mundos del lead magnet "El Mapa de los 16 Mundos".
 *
 * Copia de las 16 áreas canónicas del catálogo de la app (repo `timon`,
 * `src/lib/demo/areas16.ts`, el módulo "Hablemos con Profesionales"): mismos
 * sub-mundos, carreras, ámbitos de trabajo y verdades del oficio. Las
 * preguntas están pasadas a segunda persona para que el chico se las haga a
 * sí mismo. `dia` es el relato en primera persona del profesional virtual de
 * la app: se muestra como relato de ejemplo, nunca como testimonio real.
 * Fotos CC0 en /public/mapa (créditos en public/mapa/CREDITS.md).
 *
 * Si cambia el catálogo de la app, regenerar este archivo.
 */

export type Mundo = {
  id: string
  nombre: string
  dia: string
  donde: string
  verdades: string[]
  submundos: { nombre: string; que: string; carreras: string[] }[]
  preguntas: string[]
}

export const MUNDOS: Mundo[] = [
  {
    "id": "negocios",
    "nombre": "Negocios, Economía y Finanzas",
    "dia": "Arranco temprano revisando los números y métricas de mis clientes, y después son reuniones: un fundador que no sabe si contratar, una empresa familiar que quiere ordenarse, un plan comercial que no cierra. Mucha conversación, mucha planilla y decisiones todo el tiempo.",
    "donde": "Empresas grandes y pymes, bancos, consultoras, startups, el negocio familiar o tu propio emprendimiento — casi cualquier rubro necesita gente de negocios.",
    "verdades": [
      "Emprender es mucho menos glamoroso de lo que se ve en redes: al principio hacés de todo, de vender a cargar cajas.",
      "Los números no son el objetivo, son el idioma: te cuentan si el negocio está sano o se está fundiendo.",
      "Gran parte del trabajo es con personas: negociar, liderar, convencer.",
      "Equivocarse es parte del oficio: los buenos no son los que nunca fallan, son los que aprenden rápido."
    ],
    "submundos": [
      {
        "nombre": "Gestión y estrategia",
        "que": "Llevar adelante empresas y equipos: ordenar, decidir, hacer que las cosas funcionen.",
        "carreras": [
          "Administración de Empresas",
          "Organización y Estrategia Empresarial",
          "Logística y Transporte",
          "Recursos Humanos y Relaciones Laborales"
        ]
      },
      {
        "nombre": "Números y finanzas",
        "que": "Entender, medir y proyectar la plata: cuentas, mercados, riesgo.",
        "carreras": [
          "Contabilidad y Contador Público",
          "Economía",
          "Finanzas y Mercados",
          "Actuario"
        ]
      },
      {
        "nombre": "Lo comercial y emprendedor",
        "que": "Crear cosas nuevas, vender, detectar oportunidades donde otros no las ven.",
        "carreras": [
          "Emprendimiento e Innovación",
          "Marketing y Comercialización",
          "Comercio Internacional y Negocios Globales",
          "Negocios digitales",
          "Negocios Inmobiliarios"
        ]
      },
      {
        "nombre": "Negocios de industrias específicas",
        "que": "Aplicar los negocios a un mundo puntual que te apasiona (deporte, campo, entretenimiento).",
        "carreras": [
          "Agronegocios",
          "Gestión Deportiva",
          "Negocios del Entretenimiento"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más crear algo propio desde cero, o hacer crecer y ordenar algo que ya existe?",
      "¿Disfrutás más los números y el análisis, o el trato con gente (vender, negociar, liderar equipos)?",
      "¿Te interesa el negocio en sí (te da igual el rubro), o hay una industria puntual que te tira (deporte, campo, entretenimiento)?",
      "¿Te tienta la adrenalina de arriesgar, o la solidez de planificar y tener todo bajo control?"
    ]
  },
  {
    "id": "turismo",
    "nombre": "Turismo, Hotelería y Gastronomía",
    "dia": "En el hotel el día arranca antes que los huéspedes: repaso de reservas, reunión corta con recepción y housekeeping, y después resolver con una sonrisa todo lo que se complica — un vuelo cancelado, una habitación que no llega a estar lista, un evento que se arma a último momento.",
    "donde": "Hoteles y cadenas, agencias y operadores de viaje, restaurantes, aerolíneas y cruceros, organización de eventos, organismos de turismo, o un emprendimiento propio gastronómico o de viajes.",
    "verdades": [
      "Trabajás cuando los demás descansan: fines de semana, feriados, temporada alta.",
      "El oficio es resolver: siempre algo se complica, y tu trabajo es que el huésped ni se entere.",
      "La parte linda es real: conocés gente de todo el mundo y ves a alguien disfrutar algo que armaste vos.",
      "No es solo atender: atrás hay mucha gestión de costos, equipos y proveedores."
    ],
    "submundos": [
      {
        "nombre": "Viajes y turismo",
        "que": "Diseñar y gestionar experiencias de viaje: destinos, itinerarios, gente de todos lados.",
        "carreras": [
          "Turismo"
        ]
      },
      {
        "nombre": "Hotelería y recepción",
        "que": "Que una estadía sea perfecta: gestionar un hotel, su equipo y sus huéspedes.",
        "carreras": [
          "Hotelería y Gestión Hotelera"
        ]
      },
      {
        "nombre": "Gastronomía",
        "que": "La cocina como oficio y como negocio: cocinar, crear cartas, dirigir una cocina.",
        "carreras": [
          "Gastronomía"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más crear la experiencia con tus manos (cocinar, recibir, guiar), o gestionarla desde atrás (organizar, administrar)?",
      "¿Te imaginás más viajando y conociendo lugares, o construyendo un lugar propio al que la gente llega?",
      "¿Te gusta el ritmo del servicio (todos los días distinto, gente nueva), o preferirías algo más planificado?",
      "¿Qué te tira más: la cocina, el hotel o el viaje?"
    ]
  },
  {
    "id": "exactas",
    "nombre": "Matemática y Ciencias Exactas",
    "dia": "Parte del día con papel, pizarrón o código, modelando un problema; parte discutiendo ideas con colegas y leyendo lo último que se publicó; y según la época del año, tomando mediciones o analizando los datos de un experimento. También doy clases en la facultad.",
    "donde": "Universidades e institutos de investigación (en Argentina, el CONICET), y cada vez más la industria: bancos y finanzas, empresas de datos y tecnología, laboratorios.",
    "verdades": [
      "La mayor parte del tiempo estás trabado en algo, y está bien: el oficio es convivir con problemas sin resolver.",
      "No hace falta ser un genio: hace falta curiosidad y constancia.",
      "La salida laboral es mucho más amplia de lo que se cree: quien sabe modelar y manejar datos es buscadísimo en la industria.",
      "Es un mundo colaborativo: grupos de trabajo, congresos, colegas de todo el mundo."
    ],
    "submundos": [
      {
        "nombre": "Matemática y datos",
        "que": "El lenguaje de los patrones: demostrar, modelar, encontrar estructura en los datos.",
        "carreras": [
          "Matemática",
          "Estadística y Ciencia de Datos"
        ]
      },
      {
        "nombre": "Física y universo",
        "que": "Entender la materia, la energía y el cosmos, del átomo a las galaxias.",
        "carreras": [
          "Física",
          "Astronomía"
        ]
      },
      {
        "nombre": "Química",
        "que": "La ciencia de las sustancias: qué son, cómo reaccionan, cómo transformarlas.",
        "carreras": [
          "Química"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más lo abstracto puro (demostrar, deducir con lápiz y papel), o lo experimental (laboratorio, mediciones)?",
      "¿Disfrutás entender por entender, o necesitás ver una aplicación concreta pronto?",
      "¿Te imaginás más investigando y enseñando, o llevando la ciencia a la industria (datos, finanzas, tecnología)?",
      "¿Qué pregunta te puede quitar el sueño: una de números, una del universo o una de moléculas?"
    ]
  },
  {
    "id": "ingenieria",
    "nombre": "Ingeniería y Tecnología",
    "dia": "Mitad y mitad: en la planta recorro la línea de producción, veo dónde se traba el proceso y hablo con los operarios; en la oficina son planos, costos e indicadores. Y cuando algo se rompe o un proyecto entra en fecha límite, el día planeado no existe más.",
    "donde": "Fábricas y plantas de todo tipo, energía y petróleo, automotrices, alimenticias, constructoras, consultoras, y también oficinas de diseño y desarrollo de producto.",
    "verdades": [
      "La ingeniería real es trabajo en equipo con gente muy distinta: operarios, gerentes, proveedores.",
      "Casi nunca existe la solución perfecta: existe la mejor solución posible con la plata y el tiempo que tenés.",
      "Ver funcionar algo que vos diseñaste o mejoraste no se compara con nada.",
      "La carrera cuesta, pero se necesitan ingenieros en todos lados y eso se nota al buscar trabajo."
    ],
    "submundos": [
      {
        "nombre": "Máquinas y energía",
        "que": "Diseñar y hacer andar lo que se mueve: motores, robots, circuitos, turbinas.",
        "carreras": [
          "Ingeniería Mecánica y Mecatrónica",
          "Ingeniería Eléctrica y Electrónica",
          "Ingeniería Aeronáutica y Aeroespacial",
          "Energía y Energías Renovables"
        ]
      },
      {
        "nombre": "Industria y producción",
        "que": "Optimizar cómo se produce: procesos, plantas, logística, eficiencia.",
        "carreras": [
          "Ingeniería Industrial y Producción"
        ]
      },
      {
        "nombre": "Química y bio aplicadas",
        "que": "La ingeniería que trabaja con moléculas, alimentos y el cuerpo humano.",
        "carreras": [
          "Ingeniería Química",
          "Ingeniería en Alimentos",
          "Bioingeniería e Ingeniería Biomédica"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más diseñar (calcular, planear en la compu) o estar en el terreno (planta, taller, obra)?",
      "¿Te tira lo enorme (una planta, un avión, una red eléctrica) o lo chico y preciso (un dispositivo, un circuito)?",
      "¿Preferís crear un producto nuevo, o hacer que un proceso que ya existe funcione cada vez mejor?",
      "¿Te interesa la máquina en sí, o lo que la máquina hace por la gente (salud, energía, alimentos)?"
    ]
  },
  {
    "id": "tecnologia",
    "nombre": "Tecnología e Informática",
    "dia": "Arranco con una reunión corta con el equipo para repartir el trabajo del día, y después horas de código: resolver un bug, construir una funcionalidad nueva, revisar el código de un compañero. Todo se prueba y se corrige mil veces antes de salir a los usuarios.",
    "donde": "Empresas de software y startups, bancos, e-commerce, estudios de videojuegos, consultoras — y muchísimo trabajo remoto, incluso para empresas del exterior.",
    "verdades": [
      "Programar es 20% escribir código y 80% pensar, leer y corregir.",
      "Te tiene que gustar aprender siempre: las herramientas cambian cada pocos años.",
      "No es un trabajo solitario: se programa en equipo y nos revisamos el código entre todos.",
      "Se puede probar gratis hoy mismo: si te enganchás horas resolviendo un problema, es buena señal."
    ],
    "submundos": [
      {
        "nombre": "Desarrollo de software",
        "que": "Crear programas y sistemas: pensar la lógica, escribir el código, verlo funcionar.",
        "carreras": [
          "Desarrollo de Software y Programación",
          "Informática y Sistemas"
        ]
      },
      {
        "nombre": "Datos e inteligencia artificial",
        "que": "Hacer que las máquinas aprendan y que los datos cuenten lo que nadie ve.",
        "carreras": [
          "Ciencia de Datos y Analítica",
          "Inteligencia Artificial y Robótica"
        ]
      },
      {
        "nombre": "Ciberseguridad y redes",
        "que": "Proteger y conectar: que los sistemas resistan ataques y que todo hable con todo.",
        "carreras": [
          "Ciberseguridad e Informática",
          "Telecomunicaciones y Redes"
        ]
      },
      {
        "nombre": "Videojuegos e interactivo",
        "que": "Crear mundos jugables: donde el código se junta con el arte y el diseño.",
        "carreras": [
          "Videojuegos y Diseño Interactivo"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más construir cosas nuevas (apps, juegos), o proteger y mantener sistemas que no pueden fallar?",
      "¿Te tira el código puro, o el código mezclado con otra cosa (arte en los juegos, matemática en la IA)?",
      "¿Preferís lo que se ve (interfaces, juegos) o lo invisible que sostiene todo (datos, redes, seguridad)?",
      "¿Te imaginás metido a fondo en un problema, solo, o creando en equipo con gente no técnica?"
    ]
  },
  {
    "id": "salud",
    "nombre": "Salud",
    "dia": "Consultorio a la mañana: pacientes de a uno, escuchar, revisar, pedir estudios, ajustar tratamientos. Algunos días hago guardia en el hospital, donde todo es más impredecible y se trabaja contra reloj.",
    "donde": "Hospitales públicos y privados, clínicas y sanatorios, consultorios propios, laboratorios, investigación, y roles de gestión dentro del sistema de salud.",
    "verdades": [
      "La carrera es larga y la residencia es dura: sin vocación no se sostiene.",
      "Gran parte del oficio es escuchar: muchas veces el diagnóstico está en lo que el paciente te cuenta.",
      "Convivís con el límite: no todo se cura, y eso también hay que aprenderlo.",
      "Es de las profesiones donde más claro se siente para qué trabajás."
    ],
    "submundos": [
      {
        "nombre": "Atención directa de pacientes",
        "que": "Estar en la primera línea: diagnosticar, tratar y cuidar personas.",
        "carreras": [
          "Medicina",
          "Enfermería",
          "Obstetricia",
          "Odontología"
        ]
      },
      {
        "nombre": "Rehabilitación y terapias",
        "que": "Acompañar procesos largos de recuperación, con vínculo sostenido en el tiempo.",
        "carreras": [
          "Kinesiología y Fisioterapia",
          "Fonoaudiología",
          "Terapia Ocupacional",
          "Psicomotricidad",
          "Musicoterapia"
        ]
      },
      {
        "nombre": "La ciencia detrás de la salud",
        "que": "Laboratorio, análisis y diagnóstico: la parte que el paciente casi no ve.",
        "carreras": [
          "Bioquímica",
          "Farmacia",
          "Física Médica",
          "Diagnóstico por Imágenes"
        ]
      },
      {
        "nombre": "Prevención y bienestar",
        "que": "Que la gente no se enferme: hábitos, alimentación, sistemas de salud.",
        "carreras": [
          "Nutrición",
          "Administración y Gestión de Salud"
        ]
      },
      {
        "nombre": "Lo técnico y quirúrgico",
        "que": "Precisión con las manos y con instrumentos, dentro y fuera del quirófano.",
        "carreras": [
          "Instrumentación Quirúrgica",
          "Óptica y Optometría",
          "Ortesis y Prótesis"
        ]
      }
    ],
    "preguntas": [
      "¿Te imaginás más con el paciente enfrente, o en el laboratorio y detrás de escena?",
      "¿Te atrae la urgencia y la acción rápida, o los procesos largos de recuperación y acompañamiento?",
      "¿Curar cuando algo ya pasó, o prevenir para que no pase (hábitos, alimentación, salud pública)?",
      "¿Qué pesa más para vos: la parte científica (biología, química) o el vínculo humano del cuidado?"
    ]
  },
  {
    "id": "deporte",
    "nombre": "Deporte y Actividad Física",
    "dia": "A la mañana doy clases en un colegio; a la tarde entreno a un plantel de hockey: planifico las cargas de la semana, corrijo técnica, mido cómo viene cada jugadora. Siempre en movimiento y siempre con gente.",
    "donde": "Colegios y clubes, gimnasios, equipos y deportistas de competencia, centros de rehabilitación, municipios y programas comunitarios, y el mundo de la gestión deportiva.",
    "verdades": [
      "Vivís del progreso del cuerpo de otros, no del tuyo: no hace falta ser crack, hace falta saber enseñar.",
      "Los horarios van a contramano: entrenás cuando los demás salen del trabajo o de la escuela.",
      "El progreso es lento y eso es lo lindo: ver a alguien lograr hoy lo que hace meses no podía.",
      "Hay más salidas de las que se cree: rendimiento, salud, gestión, investigación del movimiento."
    ],
    "submundos": [
      {
        "nombre": "Enseñar y entrenar",
        "que": "Formar con el cuerpo: dar clases, armar entrenamientos, acompañar el progreso de otros.",
        "carreras": [
          "Educación Física"
        ]
      },
      {
        "nombre": "Cuerpo y rendimiento",
        "que": "La ciencia del movimiento: recuperar lesiones, alimentar y potenciar el rendimiento.",
        "carreras": [
          "Kinesiología y Fisioterapia",
          "Nutrición"
        ]
      },
      {
        "nombre": "El deporte como industria",
        "que": "El negocio y el relato del deporte: gestionar clubes, contar y vender lo que pasa en la cancha.",
        "carreras": [
          "Gestión Deportiva",
          "Periodismo y Marketing Deportivo"
        ]
      }
    ],
    "preguntas": [
      "¿Te imaginás más entrenando y enseñando en el terreno, o gestionando y comunicando el deporte desde afuera?",
      "¿Te atrae el alto rendimiento (exigencia, competencia), o la actividad física como salud y bienestar para cualquiera?",
      "¿Te mueve más tu propio rendimiento, o hacer progresar el de otros?",
      "¿Preferís la cancha y el gimnasio, o el consultorio y la ciencia del cuerpo?"
    ]
  },
  {
    "id": "ecologia",
    "nombre": "Ciencias Naturales, Ambiente y Agro",
    "dia": "Depende de la época: en campaña son semanas de campo — relevar especies, revisar cámaras trampa, tomar muestras, botas embarradas. El resto del año es analizar datos, escribir informes y conseguir fondos para el próximo proyecto.",
    "donde": "Parques nacionales y reservas, CONICET y universidades, ONGs de conservación, consultoras ambientales, empresas agropecuarias y de alimentos, organismos del Estado.",
    "verdades": [
      "El campo es menos documental de naturaleza y más planilla de lo que parece: mucha paciencia y muchos datos.",
      "Gran parte del trabajo es escribir: proyectos, informes, publicaciones, pedidos de financiamiento.",
      "Conservar es negociar: se trabaja con productores, comunidades y guardaparques, no solo con animales.",
      "Ver recuperarse un ecosistema o una especie en la que trabajaste vale cada mosquito."
    ],
    "submundos": [
      {
        "nombre": "Ecosistemas y conservación",
        "que": "Entender y proteger el ambiente: especies, ecosistemas, sustentabilidad.",
        "carreras": [
          "Biología",
          "Ecología",
          "Medio Ambiente y Sustentabilidad"
        ]
      },
      {
        "nombre": "Los animales",
        "que": "La salud y el cuidado de los animales, de la mascota al campo.",
        "carreras": [
          "Veterinaria y Zootecnia"
        ]
      },
      {
        "nombre": "Campo y producción",
        "que": "Producir alimentos y recursos trabajando con la naturaleza.",
        "carreras": [
          "Agronomía y Ciencias Agrarias",
          "Producción Agropecuaria",
          "Ingeniería Forestal y Pesquera",
          "Alimentos y Tecnología Alimentaria"
        ]
      },
      {
        "nombre": "El laboratorio de lo vivo",
        "que": "Lo que no se ve a simple vista: genes, microbios, moléculas.",
        "carreras": [
          "Biotecnología",
          "Genética",
          "Microbiología",
          "Bioquímica"
        ]
      },
      {
        "nombre": "Tierra, mar y clima",
        "que": "El planeta como sistema físico: rocas, océanos, atmósfera, territorio.",
        "carreras": [
          "Ciencias de la Tierra y Geología",
          "Oceanografía",
          "Meteorología y Ciencias Atmosféricas",
          "Geografía"
        ]
      }
    ],
    "preguntas": [
      "¿Te imaginás más en el campo y la naturaleza, o en un laboratorio?",
      "¿Te atrae más lo vivo (animales, plantas, ecosistemas) o lo físico (clima, rocas, océanos)?",
      "¿Conservar y proteger, o producir (alimentos, campo) de forma sustentable?",
      "¿Los animales de a uno y de cerca, o los sistemas completos y a gran escala?"
    ]
  },
  {
    "id": "humanidades",
    "nombre": "Educación y Humanidades",
    "dia": "A la mañana estoy en un colegio como parte del equipo de orientación, trabajando con chicos, familias y docentes; a la tarde atiendo en consultorio. Mucho escuchar, mucho pensar cada caso, y siempre supervisión con colegas.",
    "donde": "Consultorios, escuelas y equipos de orientación, hospitales y centros de salud, universidades, programas sociales y comunitarios, empresas (recursos humanos, capacitación), investigación.",
    "verdades": [
      "Escuchar profesionalmente es una técnica que se entrena, no un don con el que nacés.",
      "Los procesos son lentos: los cambios de verdad llevan meses, y acompañarlos ES el trabajo.",
      "Hay que aprender a cuidarse: trabajás con el dolor de otros y eso pesa.",
      "El campo es enorme —clínica, educación, social, laboral— y casi todos terminamos combinando varios."
    ],
    "submundos": [
      {
        "nombre": "Psicología y acompañamiento",
        "que": "Entender la mente y acompañar los procesos internos de las personas.",
        "carreras": [
          "Psicología",
          "Psicopedagogía"
        ]
      },
      {
        "nombre": "Enseñar y educar",
        "que": "Transmitir, formar y pensar cómo se aprende, dentro y fuera del aula.",
        "carreras": [
          "Ciencias de la Educación y Pedagogía",
          "Educación Inicial y Primaria",
          "Educación Especial",
          "Educación y Tecnología",
          "Gestión y Administración Educativa"
        ]
      },
      {
        "nombre": "Entender y acompañar la sociedad",
        "que": "Por qué la gente y los grupos funcionan como funcionan — y cómo ayudar a quienes lo necesitan.",
        "carreras": [
          "Sociología",
          "Antropología",
          "Ciencias Sociales y Humanidades",
          "Trabajo Social",
          "Orientación Familiar y Gestión Intercultural",
          "Gerontología"
        ]
      },
      {
        "nombre": "Palabras e idiomas",
        "que": "Vivir de leer, escribir y pasar de una lengua a otra.",
        "carreras": [
          "Letras y Literatura",
          "Idiomas",
          "Traducción e Interpretación"
        ]
      },
      {
        "nombre": "Pensamiento, historia y cultura",
        "que": "Las grandes preguntas: de dónde venimos, por qué pensamos como pensamos, qué vale la pena guardar.",
        "carreras": [
          "Filosofía",
          "Historia",
          "Teología y Ciencias Religiosas",
          "Archivología y Bibliotecología"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más acompañar el proceso interno de una persona, o transmitir conocimiento a un grupo?",
      "¿Las personas de a una (consultorio, aula), o la sociedad entera (comunidades, problemáticas sociales)?",
      "¿Te tiran más las palabras y los idiomas, o las grandes preguntas (la mente, la historia, el sentido)?",
      "¿Preferís el contacto directo del aula o el consultorio, o leer, investigar y escribir?"
    ]
  },
  {
    "id": "juridicas",
    "nombre": "Derecho, Política y Estado",
    "dia": "Mucho leer y escribir: expedientes, contratos, dictámenes. Reuniones con clientes o con funcionarios, alguna audiencia, y cuando trabajo en política pública, discutir cómo redactar una norma para que funcione en la realidad y no solo en el papel.",
    "donde": "Estudios jurídicos, tribunales y el poder judicial, ministerios y organismos del Estado, áreas legales de empresas, organismos internacionales, ONGs.",
    "verdades": [
      "Se escribe muchísimo: el arma principal del abogado es el texto bien argumentado.",
      "Casi nada es como en las series: los juicios son lentos y la mayoría de los conflictos se resuelven negociando.",
      "La ley es una herramienta de cambio real: una buena norma mejora la vida de miles de personas.",
      "Hay que estudiar siempre: las leyes cambian y quien no se actualiza queda atrás."
    ],
    "submundos": [
      {
        "nombre": "El derecho en acción",
        "que": "Defender, asesorar y dar fe: la ley aplicada a casos y personas concretas.",
        "carreras": [
          "Derecho y Ciencias Jurídicas",
          "Escribanía y Notariado"
        ]
      },
      {
        "nombre": "Política y gestión pública",
        "que": "Cambiar las reglas del juego: el Estado, las políticas y las relaciones entre países.",
        "carreras": [
          "Ciencia Política",
          "Relaciones Internacionales",
          "Administración Pública y Gestión Estatal",
          "Políticas Públicas y Política Social"
        ]
      }
    ],
    "preguntas": [
      "¿Defender casos concretos de personas, o cambiar las reglas del juego para todos?",
      "¿Te atrae más argumentar y debatir (tribunales, negociación), o analizar y diseñar (políticas, gestión)?",
      "¿Te imaginás más entre expedientes y clientes, o en el Estado y las instituciones?",
      "¿Te mueve más lo nacional o lo internacional?"
    ]
  },
  {
    "id": "defensa",
    "nombre": "Defensa, Seguridad y Emergencias",
    "dia": "Cuando entra un caso arranca el protocolo: preservar la escena, levantar pruebas, documentar todo — un error de procedimiento puede arruinar una causa. Después viene el laboratorio y el informe pericial. En emergencias es coordinación pura: planes, simulacros, y cuando pasa de verdad, decidir rápido con información incompleta.",
    "donde": "Policías y fuerzas de seguridad, poder judicial y laboratorios forenses, fuerzas armadas, defensa civil y bomberos, seguridad privada, y áreas de higiene y seguridad de cualquier industria.",
    "verdades": [
      "El rigor es todo: una prueba mal levantada no sirve, y un plan que nunca se practicó tampoco.",
      "La jerarquía y el protocolo no son un capricho: en el momento crítico salvan vidas.",
      "Convivís con situaciones duras y hay que tener la cabeza preparada — el equipo importa muchísimo.",
      "La mayor parte del tiempo no es acción: es prevención, papeles y entrenamiento para el 1% donde todo se define."
    ],
    "submundos": [
      {
        "nombre": "Investigar el delito",
        "que": "Reconstruir qué pasó: la escena, las pruebas, el laboratorio forense.",
        "carreras": [
          "Criminología y Criminalística"
        ]
      },
      {
        "nombre": "Proteger y prevenir",
        "que": "Cuidar personas y lugares antes de que algo pase: seguridad pública y laboral.",
        "carreras": [
          "Seguridad Pública y Ciudadana",
          "Seguridad e Higiene Laboral"
        ]
      },
      {
        "nombre": "Defensa",
        "que": "La protección del país: las fuerzas armadas y su carrera profesional.",
        "carreras": [
          "Defensa y Fuerzas Armadas"
        ]
      },
      {
        "nombre": "Emergencias",
        "que": "Responder cuando todo urge: catástrofes, rescates, protección civil.",
        "carreras": [
          "Protección Civil y Emergencias"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más investigar después del hecho (pruebas, escena, laboratorio), o prevenir antes de que pase?",
      "¿La adrenalina de la emergencia, o la planificación paciente de la seguridad?",
      "¿Te imaginás en una institución con uniforme y jerarquía, o en un rol técnico y civil?",
      "¿Te mueve más el caso puntual (un delito, un rescate) o el sistema completo (que una ciudad sea segura)?"
    ]
  },
  {
    "id": "comunicacion",
    "nombre": "Comunicación y Marketing",
    "dia": "El día arranca leyendo todo: qué pasó, qué se está diciendo. Después depende del sombrero: si estoy en modo periodista son llamadas, chequeo de datos y escribir contra el cierre; si es para una marca, planificar campañas y pensar cómo contar algo para que a la audiencia le importe.",
    "donde": "Medios (diarios, radio, TV, portales), agencias de publicidad y comunicación, áreas de prensa y marketing de empresas y organismos, redes y contenido digital, o freelance.",
    "verdades": [
      "Escribir bien y rápido es el músculo básico, y se entrena todos los días.",
      "Chequear es sagrado: publicar algo falso te cuesta la reputación, que es tu capital.",
      "El cierre siempre manda: se trabaja con deadlines y hay que hacer las paces con eso.",
      "El oficio cambió mil veces de formato —papel, radio, redes— pero el fondo es el mismo: saber contar."
    ],
    "submundos": [
      {
        "nombre": "Periodismo y actualidad",
        "que": "Contar la realidad: investigar, preguntar, informar lo que pasa.",
        "carreras": [
          "Comunicación Social y Periodismo",
          "Periodismo y Marketing Deportivo"
        ]
      },
      {
        "nombre": "Comunicación estratégica y publicidad",
        "que": "Comunicar para persuadir: marcas, campañas, redes, audiencias.",
        "carreras": [
          "Comunicación Digital y Estratégica",
          "Publicidad y Relaciones Públicas",
          "Marketing y Comercialización"
        ]
      },
      {
        "nombre": "Gestión cultural y de medios",
        "que": "Hacer posible que la cultura y los medios lleguen a la gente.",
        "carreras": [
          "Gestión Cultural y de Medios"
        ]
      }
    ],
    "preguntas": [
      "¿Comunicar para informar (contar lo que pasa), o para persuadir (marcas, campañas, publicidad)?",
      "¿Te imaginás más frente a cámara o micrófono, o detrás (escribir, editar, planear estrategias)?",
      "¿Qué formato te atrapa más: texto, audio, video o redes?",
      "¿Te interesa más el mundo de los medios y la actualidad, o el de las marcas y el consumo?"
    ]
  },
  {
    "id": "audiovisual",
    "nombre": "Audiovisual y Medios",
    "dia": "En rodaje los días son largos e intensos: madrugar, armar el set, resolver mil imprevistos y sacar el plan de escenas del día sí o sí. Fuera de rodaje: desarrollar proyectos, escribir carpetas, buscar financiamiento y editar.",
    "donde": "Productoras de cine, series y publicidad, canales y plataformas, estudios de animación, agencias, y mucho freelance armando equipo proyecto por proyecto.",
    "verdades": [
      "El cine es trabajo en equipo extremo: nadie hace nada solo, y cada rubro depende de los demás.",
      "Por cada día de rodaje hay semanas de preparación y meses de edición.",
      "Se vive por proyectos: hay meses a full y meses de buscar el próximo — la publicidad y los encargos suelen pagar las cuentas.",
      "No hace falta ser director: foto, sonido, arte, montaje, producción... cada rol es un oficio en sí mismo."
    ],
    "submundos": [
      {
        "nombre": "Hacer cine y series",
        "que": "El rodaje y todo lo que lo rodea: dirigir, filmar, producir.",
        "carreras": [
          "Cine y Realización Audiovisual",
          "Producción Audiovisual y Cinematográfica"
        ]
      },
      {
        "nombre": "Escribir historias",
        "que": "La historia antes de la cámara: guiones, personajes, estructura.",
        "carreras": [
          "Guión y Escritura Audiovisual",
          "Escritura Creativa"
        ]
      },
      {
        "nombre": "Diseño audiovisual y animación",
        "que": "Crear imagen en movimiento sin filmarla: animar, componer, diseñar.",
        "carreras": [
          "Diseño Audiovisual",
          "Animación y Arte Digital"
        ]
      },
      {
        "nombre": "La imagen fija",
        "que": "Contar con una sola imagen: la fotografía como oficio y como arte.",
        "carreras": [
          "Fotografía"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más el rodaje (equipo, acción, caos lindo) o la escritura y la edición (más solo, más pantalla)?",
      "¿Contar historias inventadas (ficción) o reales (documental, registro)?",
      "¿Te imaginás dirigiendo la parte creativa, o produciendo para que todo sea posible (tiempos, plata, logística)?",
      "¿Qué te atrapa más: la imagen, la historia o el proceso de armado?"
    ]
  },
  {
    "id": "arte",
    "nombre": "Diseño y Arte",
    "dia": "Alterno clientes y obra propia: a la mañana avanzo la identidad de una marca — bocetos, propuestas, idas y vueltas con el cliente — y a la tarde ilustro para una muestra o preparo mis clases. Mucha pantalla, pero el cuaderno de bocetos siempre abierto.",
    "donde": "Estudios de diseño y agencias, áreas de diseño de empresas, editorial, moda e industria, galerías y ferias para la obra propia, docencia, y muchísimo freelance.",
    "verdades": [
      "Diseñar es resolver el problema de otro; el arte es expresar lo tuyo — la mayoría vivimos combinando ambos.",
      "El cliente no es el enemigo: escuchar y saber presentar una idea es la mitad del oficio.",
      "Del talento solo no se vive: hay que saber cobrar, mostrar el trabajo y sostener la constancia.",
      "La inspiración está sobrevalorada: el hábito de producir todos los días vale más."
    ],
    "submundos": [
      {
        "nombre": "Diseño gráfico y digital",
        "que": "Comunicar con imagen por encargo: marcas, pantallas, piezas visuales.",
        "carreras": [
          "Diseño Gráfico y Comunicación Visual",
          "Diseño Digital y Multimedia",
          "Animación y Arte Digital"
        ]
      },
      {
        "nombre": "Diseño de objetos y espacios",
        "que": "Diseñar lo que se usa y se habita: productos, ropa, interiores.",
        "carreras": [
          "Diseño Industrial",
          "Diseño de Indumentaria y Moda",
          "Diseño de Interiores"
        ]
      },
      {
        "nombre": "Arte libre y visual",
        "que": "Crear obra propia por expresión, no por encargo.",
        "carreras": [
          "Artes Visuales y Plásticas",
          "Artes Electrónicas e Interactivas",
          "Fotografía"
        ]
      },
      {
        "nombre": "Pensar y cuidar el arte",
        "que": "Escribir, analizar, curar y conservar el arte de otros.",
        "carreras": [
          "Historia y Crítica del Arte",
          "Curaduría y Gestión Artística",
          "Conservación y Restauración"
        ]
      }
    ],
    "preguntas": [
      "¿Crear por encargo resolviendo problemas de otros (diseño), o por expresión propia (arte)?",
      "¿Te tira más lo digital (pantalla) o lo material (manos, objetos, ropa, espacios)?",
      "¿Diseñar lo que se ve (gráfica, pantallas) o lo que se usa y se habita (objetos, interiores)?",
      "¿Crear obra propia, o analizar, cuidar y difundir la de otros?"
    ]
  },
  {
    "id": "artes",
    "nombre": "Artes, Música y Espectáculo",
    "dia": "A la tarde ensayo: repetir, ajustar, probar hasta que la escena o el tema suenan como tienen que sonar. A la noche, función o toco en vivo. A la mañana compongo, estudio mi instrumento y gestiono lo que viene: fechas, salas, elenco.",
    "donde": "Teatros y salas de concierto, compañías y elencos, orquestas y bandas, festivales, docencia (conservatorios, escuelas, clases particulares), y producción de espectáculos.",
    "verdades": [
      "El escenario es el 10%: el resto es ensayo, estudio y disciplina diaria.",
      "Vivir del arte casi siempre es diversificar: tocar, dirigir, enseñar, producir.",
      "Los nervios no se van nunca: se aprende a usarlos a favor.",
      "La constancia le gana al talento: conozco talentosos que dejaron y laburantes que viven de esto hace veinte años."
    ],
    "submundos": [
      {
        "nombre": "La música",
        "que": "Vivir del sonido: tocar, componer, dirigir.",
        "carreras": [
          "Música e Interpretación Musical",
          "Composición y Dirección Musical"
        ]
      },
      {
        "nombre": "La escena",
        "que": "El cuerpo y el escenario: actuar, bailar, interpretar en vivo.",
        "carreras": [
          "Teatro y Artes Escénicas",
          "Danza y Composición Coreográfica"
        ]
      },
      {
        "nombre": "Detrás del espectáculo",
        "que": "Que la función suceda: escenografía, luces, montaje.",
        "carreras": [
          "Escenografía e Iluminación"
        ]
      }
    ],
    "preguntas": [
      "¿Te imaginás más arriba del escenario (tocar, actuar, bailar) o detrás (componer, dirigir, montar)?",
      "¿Interpretar lo que crearon otros, o crear lo tuyo?",
      "¿Tu lenguaje natural es el sonido, o el cuerpo y la actuación?",
      "¿Cómo te llevás con la disciplina diaria del ensayo y con mostrarte en público?"
    ]
  },
  {
    "id": "arquitectura",
    "nombre": "Arquitectura, Construcción y Urbanismo",
    "dia": "Mitad estudio, mitad obra: en el estudio proyecto — dibujar, modelar, resolver cómo entra todo en el terreno y en el presupuesto — y en la obra verifico que lo construido sea lo proyectado, ajustando sobre la marcha con el constructor y los gremios.",
    "donde": "Estudios de arquitectura, constructoras y desarrolladoras, obra pública y municipios (urbanismo), estudio propio, y también interiorismo, paisajismo y dirección de obra independiente.",
    "verdades": [
      "Se proyecta con restricciones —terreno, plata, reglamentos— y la creatividad está en resolver adentro de eso.",
      "El dibujo es el idioma: todo lo que imaginás tiene que poder construirse desde tus planos.",
      "La relación con el cliente y con la obra es la mitad del trabajo: escuchar, negociar, coordinar gremios.",
      "Ver habitado un espacio que dibujaste es de las mejores sensaciones que existen."
    ],
    "submundos": [
      {
        "nombre": "Proyectar edificios",
        "que": "Diseñar los espacios donde vive la gente: la idea, el plano, la forma.",
        "carreras": [
          "Arquitectura"
        ]
      },
      {
        "nombre": "Construir y gestionar la obra",
        "que": "Hacer real el plano: estructuras, materiales, tiempos y equipos de obra.",
        "carreras": [
          "Construcción y Gestión de Obras",
          "Ingeniería Civil"
        ]
      },
      {
        "nombre": "Ciudad y paisaje",
        "que": "Pensar más allá del edificio: barrios, ciudades, espacios verdes.",
        "carreras": [
          "Urbanismo y Planificación Territorial",
          "Paisajismo"
        ]
      }
    ],
    "preguntas": [
      "¿Te atrae más diseñar (la idea, la estética, el plano) o construir (la obra, los materiales, que no se caiga)?",
      "¿Te tira el edificio de a uno, o la ciudad entera como sistema?",
      "¿Te imaginás más en el tablero y la compu, o con casco en la obra?",
      "¿Qué pesa más para vos: el lado artístico o el lado técnico y estructural?"
    ]
  }
]

export const TOTAL_CARRERAS = new Set(MUNDOS.flatMap((m) => m.submundos.flatMap((s) => s.carreras))).size
