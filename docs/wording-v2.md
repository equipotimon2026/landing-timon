# Wording v2 de la home (14/11/2026)

Textos de la home (`src/app/page.tsx` y `src/components/home/*`), antes y después.

Criterios:
- Rioplatense. Le hablamos a la madre o al padre, en concreto y con calidez, sin jerga.
- Se vende el **Programa Timon**, no una "app" ni un "test vocacional". Paga el padre y lo usa el chico.
- No se muestra precio. Todos los CTA llevan al formulario (`/api/padres`).
- Poco texto: un titular corto por sección y, como mucho, una línea. El visual cuenta el resto.
- La red (profesionales, universidades, empresas y eventos) es el valor central.
- Sin claims ni testimonios nuevos. Los datos son los que ya estaban en el repo o los que
  pasó el equipo (abajo, con su origen). Las tres citas de "Lo revisaron" salen de
  `LO_QUE_DICEN` (`src/lib/landing.ts`) y no cambiaron.

## Para confirmar antes de publicar

| Qué | Dónde aparece | Por qué hay que confirmarlo |
|---|---|---|
| "$300 mil a $1,3 M por mes" | Dolor | Lo pasó el equipo (14/11), pero no tiene fuente en el repo. Conviene citar de dónde sale. |
| "Te escribimos en menos de 24 h. Sin compromiso." | Microcopia de todos los CTA y del formulario | Es un compromiso de servicio: el equipo tiene que poder cumplirlo. |
| Empresas y eventos | Hero y red | El brief los pone como parte de la red. Si todavía no existen en el producto, conviene sacarlos o decir "próximamente". |
| "Profesionales: cuentan su día de trabajo" | Red | En la app la charla es con profesionales **virtuales**, y así lo dice el paso "Investiga". Si en la red también hay gente real, está bien; si no, hay que aclararlo. |
| "Con personas, no solo pantallas. El equipo los acompaña." | Para vos | Viene del brief ("acompañamiento real de personas del equipo"). Confirmar qué incluye. |
| Tarjeta "Vos ves cómo avanza" (Sofía, 9 de 13 paradas) | Para vos | Es una ilustración, no una captura del panel del padre. Si el panel real es distinto, cambiarla por una captura. |
| Timon / Timón | Todo el sitio | Se mantiene "Timon" sin tilde, como dice la regla de `src/lib/landing.ts`. |

## Tabla

| Lugar | Texto actual (v1) | Texto nuevo (v2) |
|---|---|---|
| `<title>` | Timon: que elija su camino conociendo el mundo | Programa Timon: antes de elegir carrera, que conozca el mundo |
| Meta description | Tu hijo se conoce, conoce el trabajo real y elige su carrera con fundamento. En dos semanas, desde casa. | Una red de profesionales, universidades, empresas y eventos para que tu hijo o hija elija carrera con los pies en la tierra. Dos semanas, desde casa. |
| Header · anclas | El informe · La red · Preguntas · Entrar | Cómo funciona · La red · Preguntas · Entrar |
| Header · botón | Anotalo | Anotalo (sin cambios) |
| Hero · etiqueta | Para madres y padres | Programa Timon · para madres y padres |
| Hero · titular | Que elija su camino conociendo el mundo. | Antes de elegir carrera, que conozca el mundo. |
| Hero · bajada | Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa. | Una red de profesionales, universidades, empresas y eventos para que tu hijo o hija elija con los pies en la tierra. |
| Hero · botón | Quiero que mi hijo lo haga | Quiero que mi hijo elija bien |
| Hero · microcopia | — | Te escribimos en menos de 24 h. Sin compromiso. |
| Hero · link | Ver el informe | Cómo funciona |
| Hero · nota a mano | puede empezar gratis | su informe, tal cual lo ve |
| Hero · stickers | Acto 1 · Quién es / Acto 2 · Sus caminos / Acto 3 · Dónde estudiarlo | 300 carreras / 16 áreas de trabajo / 50 universidades |
| Dolor · titular | Nadie conoce todas las opciones a los 17. | Elegir a ciegas sale caro. |
| Dolor · dato 1 | 4 de cada 10 ingresantes deja la carrera en el primer año. | **4 de cada 10** (diez muñequitos, cuatro en terra) · ingresantes deja la carrera en el primer año. Fuente sin cambios: SPU, cohorte 2019 · vía iProfesional |
| Dolor · dato 2 | — | Una cuota privada: **$300 mil a $1,3 M** por mes. |
| Dolor · dato 3 | — | **1 año** y esa plata, si elige mal. |
| Red · etiqueta | La red | El Programa Timon |
| Red · título | No es un test. Es una red. | Sin cambios |
| Red · bajada | El trabajo real detrás de cada carrera. | Para que elija conociendo el mundo real. |
| Red · diagrama | — | Tu hijo o hija → Timon → Profesionales (cuentan su día de trabajo) · Universidades (50 para comparar) · Empresas (donde se trabaja de eso) · Eventos (para verlo en persona) |
| Red · números | 16 áreas de trabajo · 300 carreras · 50 universidades · +10.000 combinaciones analizadas | Sin cambios |
| Red · CTA | — | Quiero que mi hijo elija bien + microcopia |
| Cómo funciona · etiqueta | El informe | Cómo funciona |
| Cómo funciona · título | Un informe en tres actos. | Cuatro pasos. Pantallas reales. |
| Paso 1 | Acto 1 · Quién es. | **Se conoce.** 13 paradas cortas para conocerse. Menos de 10 minutos cada una. |
| Paso 2 | — | **Investiga.** Pregunta cómo es el trabajo real. Charla con profesionales virtuales de 16 áreas. |
| Paso 3 | Acto 2 · Sus caminos. | **Se descubre.** Un informe que habla de quién es. Sus rasgos y las carreras que van con su perfil. |
| Paso 4 | Acto 3 · Dónde estudiarlos. | **Compara.** Universidades, comparadas en serio. Por cuota, modalidad y zona. |
| Notas sobre las pantallas | su informe, tal cual lo ve | parada por parada · se guarda solo ✓ · 16 áreas para recorrer · elige lo que le atrae · del rasgo más fuerte al más suave · en sus palabras · cuota · modalidad · zona · qué tan alineada está |
| Aclaración | Capturas de la app con datos de ejemplo. | Sin cambios |
| Para vos · etiqueta | — | Para vos |
| Para vos · título | — | Fácil para tu hijo. Tranquilo para vos. |
| Para vos · avance | Vos ves cómo avanza. Sus respuestas son suyas. | **Vos ves cómo avanza.** (ilustración: Sofía, 9 de 13 paradas) · Sus respuestas son suyas: ves el avance y el informe final. |
| Para vos · tiempo | 13 paradas de menos de 10 minutos. / Dos semanas, a su ritmo. | **2 semanas** (calendario de 14 días) · a su ritmo, un rato por día. |
| Para vos · lugar | — | **Desde casa.** En el celular o en la compu. |
| Para vos · personas | — | **Con personas, no solo pantallas.** El equipo los acompaña. (iniciales de Facu, Feli y Nico) |
| Para vos · gratis | — | sin tarjeta · **Empezar es gratis.** Y después ven juntos si sigue. |
| Para vos · CTA | — | Quiero que mi hijo elija bien + microcopia |
| Confianza · título | Lo revisaron quienes saben. | Sin cambios (mismas tres citas) |
| Formulario · título | Anotalo hoy. | Que elija bien. |
| Formulario · bajada | Después elegís: pagar ahora o que empiece gratis. | Dejanos tus datos. Te escribimos en menos de 24 h, sin compromiso. |
| Formulario · nota a mano | — | te lleva 1 minuto |
| Preguntas · título | Preguntas. | Preguntas de madres y padres. |
| Preguntas · CTA | — | Quiero que mi hijo elija bien + microcopia |
| FAQ 1 | ¿Es un test vocacional? No. El recorrido lo ayuda a conocerse, y después le muestra el trabajo real, las carreras y dónde estudiarlas. | ¿Es otro test vocacional? No. Los tests son solo el arranque. Después investiga el trabajo real con la red, recibe su informe y compara universidades. |
| FAQ 2 | ¿Cuánto tiempo lleva? 13 paradas de menos de 10 minutos. Lo ideal es hacerlas en dos semanas, a su ritmo. | ¿Mi hijo lo va a usar? Son paradas de menos de 10 minutos, desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Y vos ves cómo avanza. |
| FAQ 3 | ¿Cuánto cuesta? Puede empezar gratis. El informe completo es un pago único, no una suscripción. | ¿Cuánto cuesta? Depende del plan. Empezar es gratis, y el resto lo vemos juntos en la llamada. |
| FAQ 4 | ¿Reemplaza a un profesional? No. Es una guía para decidir con fundamento. Si quieren, repasan el resultado con un profesional. | ¿Quién está detrás? Facu, Feli y Nico, un equipo argentino. Una psicopedagoga evaluó la metodología y un equipo profesional de la UBA la revisó. |
| FAQ 5 | ¿Vas a ver sus respuestas? No. Ves cómo avanza y su informe final. Lo que responde es suyo. | Sin cambios |
| Celular · barra fija | — | Quiero que mi hijo elija bien (aparece al pasar el hero y se esconde en el formulario) |
| Footer | Soy estudiante · Colegios · Términos · info@timonear.com + aviso legal | Sin cambios |

El formulario (`Anotalo.tsx`) no cambió de texto: sus etiquetas y mensajes son el
contrato con `/api/padres` y con el flujo de pago.
