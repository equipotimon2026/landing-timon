# Wording v2 de la home (14/11/2026)

Textos de la home (`src/app/page.tsx` y `src/components/home/*`), antes y después.
Criterios: rioplatense, le hablamos a la madre o al padre, concreto y cálido, sin jerga.
La red (profesionales, universidades, empresas y eventos) es el valor central.
No hay claims nuevos con números: los únicos datos son los que ya estaban (16 áreas,
300 carreras, 50 universidades, +10.000 combinaciones, 13 paradas, el dato del SPU).
Tampoco hay testimonios nuevos: las tres citas de "Lo revisaron" salen de
`LO_QUE_DICEN` en `src/lib/landing.ts` y no cambiaron.

## Para revisar antes de publicar

- **Empresas y eventos.** El brief pide presentar la red con estos cuatro nodos. Hay que
  confirmar que hoy existen como parte del producto. Si todavía no existen, conviene
  sacarlos o decir "próximamente".
- **Profesionales.** En la app, la charla del paso "Investiga" es con profesionales
  *virtuales*, y así lo dice la landing. En la sección de la red, "Profesionales" habla
  de gente real que cuenta su día: confirmar que eso es cierto.
- **Timon / Timón.** Se mantiene "Timon" sin tilde, como dice la regla de
  `src/lib/landing.ts`. Si la marca pasa a llevar tilde, hay que cambiarlo en todo el sitio.

## Tabla

| Lugar | Texto actual (v1) | Texto nuevo (v2) |
|---|---|---|
| `<title>` | Timon: que elija su camino conociendo el mundo | Timon: antes de elegir carrera, que conozca el mundo |
| Meta description | Tu hijo se conoce, conoce el trabajo real y elige su carrera con fundamento. En dos semanas, desde casa. | Timon le muestra a tu hijo o hija cómo es el trabajo de verdad, con una red de profesionales, universidades, empresas y eventos. Empieza gratis, desde casa. |
| Header · ancla 1 | El informe | La app |
| Header · botón | Anotalo | Anotalo (sin cambios) |
| Hero · etiqueta | Para madres y padres | Para madres y padres (sin cambios) |
| Hero · titular | Que elija su camino conociendo el mundo. | Antes de elegir carrera, que conozca el mundo. |
| Hero · bajada | Se conoce, conoce el trabajo real y elige con fundamento. En dos semanas, desde casa. | Timon le muestra a tu hijo o hija cómo es el trabajo de verdad, con una red de profesionales, universidades, empresas y eventos. Y lo acompaña a elegir. |
| Hero · botón | Quiero que mi hijo lo haga | Quiero que lo haga |
| Hero · link | Ver el informe | Mirá la app por dentro |
| Hero · nota a mano | puede empezar gratis | su informe, tal cual lo ve |
| Hero · línea chica | — | Empieza gratis · Desde casa · A su ritmo |
| Hero · stickers | Acto 1 · Quién es / Acto 2 · Sus caminos / Acto 3 · Dónde estudiarlo | 300 carreras / 16 áreas de trabajo / 50 universidades |
| Problema · etiqueta | — | El problema |
| Problema · frase | Nadie conoce todas las opciones a los 17. | A los 17, nadie conoce todas las opciones. |
| Problema · dato | 4 de cada 10 ingresantes deja la carrera en el primer año. | Sin cambios (misma fuente: SPU, cohorte 2019 · vía iProfesional) |
| App · etiqueta | El informe | La app por dentro |
| App · título | Un informe en tres actos. | Así lo vive, paso a paso. |
| App · bajada | — | Cuatro partes, desde el celular o la compu. Estas son las pantallas reales. |
| App · paso 1 | Acto 1 · Quién es. | **Se conoce.** Unos tests cortos para conocerse. 13 paradas de menos de 10 minutos. No hay respuestas buenas ni malas, y el avance se guarda solo. |
| App · paso 2 | — | **Investiga.** Recorre las áreas y pregunta cómo es el trabajo. Elige las áreas que le llaman la atención y charla con profesionales virtuales de cada una sobre su día a día. |
| App · paso 3 | Acto 2 · Sus caminos. | **Se descubre.** Un informe que habla de quién es. Sus rasgos, lo que lo mueve y las carreras que van con su perfil, ordenadas por compatibilidad. |
| App · paso 4 | Acto 3 · Dónde estudiarlos. | **Compara.** Dónde estudiar, comparado en serio. Universidades para cada carrera, con filtros por cuota, modalidad y zona. Pública o privada, de un vistazo. |
| App · notas sobre las pantallas | su informe, tal cual lo ve | parada por parada · se guarda solo ✓ · 16 áreas para recorrer · elige lo que le atrae · del rasgo más fuerte al más suave · en sus palabras · cuota · modalidad · zona · qué tan alineada está |
| App · aclaración | Capturas de la app con datos de ejemplo. | Sin cambios |
| Red · título | No es un test. Es una red. | Sin cambios |
| Red · bajada | El trabajo real detrás de cada carrera. | Detrás de cada carrera hay gente que la trabaja. Timon acerca a tu hijo o hija a ese mundo. |
| Red · nodo 1 | — | **Profesionales.** Gente que trabaja de lo que le interesa y le cuenta cómo es su día. |
| Red · nodo 2 | — | **Universidades.** 50 universidades y 300 carreras, para ver dónde y cómo estudiar. |
| Red · nodo 3 | — | **Empresas.** Los lugares donde se trabaja de eso, para verlo de cerca. |
| Red · nodo 4 | — | **Eventos.** Encuentros para conocer el mundo del trabajo en persona. |
| Red · números | 16 áreas de trabajo · 300 carreras · 50 universidades · +10.000 combinaciones analizadas | Sin cambios |
| Bento · título | — | Fácil de hacer. Tranquilo para vos. |
| Bento · tiempo | 13 paradas de menos de 10 minutos. | Sin cambios |
| Bento · desde casa | Dos semanas, a su ritmo. | Sin cambios |
| Bento · informe | (captura sin texto) | Quién es, qué carreras van con su perfil y dónde estudiarlas. |
| Bento · precio | — | Empieza gratis. El informe completo es un pago único, no una suscripción. |
| Bento · privacidad | Vos ves cómo avanza. Sus respuestas son suyas. | Sin cambios |
| Confianza · título | Lo revisaron quienes saben. | Sin cambios |
| Anotalo · título | Anotalo hoy. | Que empiece hoy. |
| Anotalo · bajada | Después elegís: pagar ahora o que empiece gratis. | Dejás tus datos y elegís: que arranque gratis o pagar ahora. |
| Anotalo · nota a mano | — | te lleva 1 minuto |
| Preguntas · título | Preguntas. | Preguntas de madres y padres. |
| Preguntas · botón | — | Quiero que lo haga |
| FAQ · ¿Es un test vocacional? | No. El recorrido lo ayuda a conocerse, y después le muestra el trabajo real, las carreras y dónde estudiarlas. | No. Arranca con unos tests cortos para que se conozca, y después le muestra el trabajo real, las carreras y dónde estudiarlas. |
| FAQ · ¿Cuánto cuesta? | Puede empezar gratis. El informe completo es un pago único, no una suscripción. | Empieza gratis. El informe completo es un pago único, no una suscripción. |
| FAQ · ¿Cuánto tiempo lleva? | 13 paradas de menos de 10 minutos. Lo ideal es hacerlas en dos semanas, a su ritmo. | Sin cambios |
| FAQ · ¿Vas a ver sus respuestas? | No. Ves cómo avanza y su informe final. Lo que responde es suyo. | Sin cambios |
| FAQ · ¿Reemplaza a un profesional? | No. Es una guía para decidir con fundamento. Si quieren, repasan el resultado con un profesional. | No. Es una guía para elegir con fundamento. Si quieren, después repasan el resultado con un profesional. |
| Footer | Soy estudiante · Colegios · Términos · info@timonear.com + aviso legal | Sin cambios |

El formulario (`Anotalo.tsx`) no cambió de texto: sus etiquetas y mensajes son el
contrato con `/api/padres` y con el flujo de pago.
