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

---

# Wording v3: sin etiquetas y con voz de persona (14/11/2026, pedido de Nicolas)

Hilo de toda la página, en palabras de Nicolas: "Timón lo ayuda a decidir su futuro. Con
profesionales, empresas y universidades entiende hacia dónde va el mundo y cómo elegir bien
algo que es difícil." Cada sección empuja un tramo: **la decisión es difícil** (Dolor) →
**Timon la acompaña con el mundo real** (Red, Cómo funciona, Para vos) → **tu hijo elige con
claridad** (formulario y preguntas).

Criterios de esta pasada:
- Cada sección se presenta solo con su titular. Se sacaron todas las etiquetas y chips: los
  eyebrows en mono mayúscula (`.etiqueta`), los "01 · Se conoce" de los pasos, los stickers
  sobre las pantallas, el chip "sin tarjeta", el badge "En camino" y las pastillas con
  puntito de las etapas (ahora texto con un tilde verde en las hechas).
- Suena a alguien de Timon hablándole a un padre o una madre: primera persona del plural
  ("te escribimos", "somos Facu, Feli y Nico"), frases concretas, sin "No es X, es Y", sin
  tríadas de marketing y sin titulares que arranquen igual.
- Una idea por titular. Los titulares no repiten las frases del hero ("hacia dónde va el
  mundo", "qué hay ahí afuera", "con criterio").
- Se mantienen los datos y los pendientes de arriba. Las citas de `LO_QUE_DICEN` no se
  tocaron (`src/lib/landing.ts` no cambió). El formulario solo cambió el estilo de sus dos
  leyendas, no el texto.

## Titular del hero: opciones para elegir

| # | Titular | |
|---|---|---|
| 1 | Elegir carrera es difícil. No lo hagas a ciegas. | |
| 2 | Que elija su futuro hablando con quienes ya están ahí. | |
| 3 | Antes de elegir, que vea hacia dónde va el mundo. | ← en el hero |
| 4 | Decidir su futuro, con el mundo real de su lado. | |

## Antes y después

| Sección | Antes (v2) | Después (v3) |
|---|---|---|
| Hero · titular | Antes de elegir carrera, que conozca el mundo. | Antes de elegir, que vea hacia dónde va el mundo. |
| Hero · apoyo | Una red de profesionales, universidades, empresas y eventos para que tu hijo o hija elija con los pies en la tierra. | Profesionales, universidades y empresas lo ayudan a entender qué hay ahí afuera y a elegir con criterio. |
| Hero · extras | Etiqueta "Programa Timon · para madres y padres", stickers, nota a mano y link "Cómo funciona" | Sin eyebrow, sin stickers, sin nota a mano y sin link "Cómo funciona" |
| `<title>` | Programa Timon: antes de elegir carrera, que conozca el mundo | Programa Timon: para que tu hijo elija carrera con claridad |
| Meta description | Una red de profesionales, universidades, empresas y eventos para que tu hijo o hija elija carrera con los pies en la tierra. Dos semanas, desde casa. | Elegir carrera es difícil. Con profesionales, universidades y empresas, tu hijo o hija entiende sus opciones y decide con claridad. Dos semanas, desde casa. |
| Open Graph · description | No es un test. Es una red: 16 áreas de trabajo, 300 carreras y 50 universidades. | 16 áreas de trabajo, 300 carreras y 50 universidades para que tu hijo o hija decida sabiendo qué elige. |
| Botón principal (`CTA_TEXTO`, también en el hero y la barra fija del celular) | Quiero que mi hijo elija bien | Quiero anotar a mi hijo |
| Dolor · titular | Elegir a ciegas sale caro. | A los 17, elegir carrera es difícil de verdad. |
| Dolor · cuota | Etiqueta "UNA CUOTA PRIVADA" · $300 mil a $1,3 M · por mes. | Una universidad privada cuesta · $300 mil a $1,3 M · por mes. (sigue pendiente la fuente) |
| Dolor · año | 1 año · y esa plata, si elige mal. | 1 año · más esas cuotas, si después se cambia de carrera. |
| Red · etiqueta | El Programa Timon | (sin etiqueta) |
| Red · titular | No es un test. Es una red. | Que sepa cómo es trabajar de eso antes de anotarse. |
| Red · bajada | Para que elija conociendo el mundo real. | Así no decide por un folleto o por lo que le contó un amigo. |
| Cómo funciona · etiqueta | Cómo funciona | (sin etiqueta) |
| Cómo funciona · titular | Cuatro pasos. Pantallas reales. | Esto es lo que hace tu hijo en Timon. |
| Paso 1 | 01 · SE CONOCE · 13 paradas cortas para conocerse. · Menos de 10 minutos cada una. | Empieza con 13 paradas sobre sí mismo. · Menos de 10 minutos cada una. El avance se guarda solo. |
| Paso 2 | 02 · INVESTIGA · Pregunta cómo es el trabajo real. · Charla con profesionales virtuales de 16 áreas. | Pregunta sobre 16 áreas de trabajo. · Charla con profesionales virtuales y se queda con lo que le atrae. |
| Paso 3 | 03 · SE DESCUBRE · Un informe que habla de quién es. · Sus rasgos y las carreras que van con su perfil. | Le llega un informe con sus rasgos. · Del más fuerte al más suave, y las carreras que van con ese perfil. |
| Paso 4 | 04 · COMPARA · Universidades, comparadas en serio. · Por cuota, modalidad y zona. | Al final, compara universidades. · Por cuota, modalidad y zona, y ve cuánto se acerca cada una a su perfil. |
| Pasos · stickers sobre las pantallas | parada por parada · se guarda solo ✓ · 16 áreas para recorrer · elige lo que le atrae · del rasgo más fuerte al más suave · en sus palabras · cuota · modalidad · zona · qué tan alineada está | (sacados; lo que decían pasó a la línea de cada paso) |
| Pasos · celular | Etiqueta + titular | Titular + la línea del paso |
| Para vos · etiqueta | Para vos | (sin etiqueta) |
| Para vos · titular | Fácil para tu hijo. Tranquilo para vos. | Vos sabés en qué anda sin tener que preguntarle. |
| Para vos · avance | Vos ves cómo avanza. · badge "EN CAMINO" · etapas en pastillas con puntito | Así ves su avance. · "En camino" en texto · etapas en texto, con tilde las hechas |
| Para vos · privacidad | Sus respuestas son suyas: ves el avance y el informe final. | Lo que responde es suyo. Vos ves el avance y el informe final. |
| Para vos · tiempo | 2 semanas · a su ritmo, un rato por día. | 2 semanas · Un rato por día, cuando le quede cómodo. |
| Para vos · lugar | Desde casa. · En el celular o en la compu. | Desde casa. · Con el celular o la compu, sin moverse. |
| Para vos · personas | Con personas, no solo pantallas. · El equipo los acompaña. | Del otro lado hay personas. · El equipo de Timon los acompaña. (sigue pendiente qué incluye) |
| Para vos · gratis | Sticker "sin tarjeta" · Empezar es gratis. · Y después ven juntos si sigue. | Empezar es gratis. · No pide tarjeta. Después deciden juntos si sigue. |
| Confianza · titular | Lo revisaron quienes saben. | Se lo mostramos a gente que sabe del tema. |
| Formulario · titular | Que elija bien. | Contanos de tu hijo o hija. |
| Formulario · bajada | Dejanos tus datos. Te escribimos en menos de 24 h, sin compromiso. | Te escribimos por WhatsApp en menos de 24 h. Sin compromiso. (24 h sigue pendiente) |
| Formulario · leyendas | TUS DATOS · TU HIJO O HIJA (mono mayúscula) | Tus datos · Tu hijo o hija (texto normal en negrita) |
| Preguntas · titular | Preguntas de madres y padres. | Lo que suelen preguntarnos. |
| FAQ 1 | ¿Es otro test vocacional? No. Los tests son solo el arranque. Después investiga el trabajo real con la red, recibe su informe y compara universidades. | ¿Es otro test vocacional? Arranca con unas paradas para conocerse, pero eso es solo el principio. Después investiga cómo se trabaja en cada área, recibe su informe y compara universidades. |
| FAQ 2 | ¿Mi hijo lo va a usar? Son paradas de menos de 10 minutos, desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Y vos ves cómo avanza. | ¿Mi hijo lo va a usar? Cada parada dura menos de 10 minutos y se hace desde el celular. Lo probaron alumnos de 5° y 6° año del Colegio María Guadalupe y les gustó. Además, vos ves si avanza. |
| FAQ 3 | ¿Cuánto cuesta? Depende del plan. Empezar es gratis, y el resto lo vemos juntos en la llamada. | ¿Cuánto cuesta? Empezar es gratis. El precio depende del plan, y te lo contamos cuando te escribimos. |
| FAQ 4 | ¿Quién está detrás? Facu, Feli y Nico, un equipo argentino. Una psicopedagoga evaluó… | ¿Quién está detrás? Somos Facu, Feli y Nico, de Argentina. Una psicopedagoga evaluó… (resto igual) |
| FAQ 5 | ¿Vas a ver sus respuestas? No. Ves cómo avanza y su informe final. Lo que responde es suyo. | ¿Puedo ver sus respuestas? No. Lo que responde es suyo. Vos ves cómo avanza y el informe final. |

Sin cambios: header, diagrama de la red, los cuatro números, la aclaración de las capturas,
las tres citas, el formulario (salvo las leyendas) y el footer.

Para confirmar, además de la lista de arriba:
- **Timon o Timón.** Nicolas escribió "Timón" en el hilo; la regla de `src/lib/landing.ts`
  dice "Timon" sin tilde. La página sigue sin tilde hasta que se decida.
- **"Quiero anotar a mi hijo"** deja afuera a "hija" para que el botón entre en una línea en
  el celular. Si se prefiere neutro: "Quiero anotarlo" o "Anotar a mi hijo o hija".
- **Botón del formulario.** Sigue diciendo "Quiero que mi hijo lo haga". Se puede igualar
  al CTA, pero es parte del flujo de `/api/padres` y no se tocó.
