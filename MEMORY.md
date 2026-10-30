# MEMORY — landing-timon

Registro de decisiones. Una entrada por decisión: qué se decidió, por qué, y
qué se descartó.

---

## 2026-09-07 — El hero pasa a ser la puerta de entrada

**Qué se decidió.** La primera pantalla de timonear.com deja de ser el hero
editorial ("Descubrí cómo pensás, qué estudiar y dónde empezar" + marquee de
carreras) y pasa a ser el formulario de entrada: campo de email, "Continuar",
Google. El contenido explicativo baja del fold.

**Por qué.** Reunión del 07/09/2026 con Feli y Chechu. Casi todo el que entra a
la landing ya sabe qué es Timon y viene a entrar; antes tenía que buscar el
botón chiquito arriba a la derecha o scrollear. Referencias miradas en vivo:
Duolingo y chess.com, que hacen exactamente esto. El hero editorial tenía
sentido cuando había que explicar el producto de punta a punta; ya no es el
caso.

**Qué se descartó.** Mantener el hero y solo agrandar el botón de "Empezar":
no resuelve el problema, sigue habiendo un paso extra entre caer y entrar.

**Implementación.** `HeroEntrada.tsx` (nuevo) reemplaza a `HeroUniversal.tsx` en
`page.tsx`. `HeroUniversal.tsx` queda en el repo sin usar, por si hay que
volver. El formulario NO autentica acá: manda el mail a
`app.timonear.com/entrar?email=…`, que es la única puerta real — no queremos
dos implementaciones de auth en dos deploys distintos.

---

## 2026-09-07 — Paleta unificada con la app

**Qué se decidió.** Los tokens de marca cambian de valor (los nombres quedan
igual): crema `#F5EDE0` → `#FAF8F3`, ocean `#1E5BA0` → `#2563EB`, navy
`#0F1F36` → `#0F1B33`, terra `#C97F5E` → ámbar `#F59E0B`. Se suman tokens de
vidrio líquido, radios y acentos (verde, rosa, índigo).

**Por qué.** Había tres paletas distintas conviviendo: la de esta landing, la
de la app (aproximaciones en oklch) y la del deck "Timón Final". El deck es la
dirección elegida, así que los otros dos se alinean a él.

**Qué se descartó.** Renombrar los tokens a algo más semántico. Habría tocado
todos los componentes sin cambiar nada visible; se hace después si molesta.

**Implementación.** `globals.css` y los hex hardcodeados de `PhoneCarousel`,
`ReportCarousel`, `InputSection`, `ViewToggle`, `InputMacBook`, `Marquee` y
`Logo`. Se agregó Instrument Serif itálica (`--font-serif`) para las líneas de
acento del deck.

---

## 2026-09-07 — Pricing en cuotas

**Qué se decidió.** La sección de precios arranca con un toggle entre 12 cuotas
y pago único, y el número grande es el de la cuota. Los valores viven en
`src/lib/pricing.ts`, no en los componentes.

**Por qué.** Feli: si mostrar 150 lucas asusta, mostremos 12 de 12. Quedaron
dos números pendientes de definir — el precio a partir del cual deja de
asustar, y la cantidad de cuotas que se percibe como beneficio (Feli: 3 no
mueve la aguja, 6 o 12 sí). Por eso están aislados en un archivo.

**Qué se descartó.** Suscripción mensual. Nico levantó que es fácil de
cancelar a mitad de camino; cuotas es un precio final pactado, no un servicio
que se da de baja. En ningún lado se dice "por mes".

---

## 2026-09-07 — FAQ en la landing

**Qué se decidió.** Sección de preguntas frecuentes nueva, arriba del footer.
Sin número de teléfono: quien necesita ayuda escribe por el chat flotante.

**Por qué.** Criterio de Feli para elegir qué preguntas entran: solo las que
bajan una duda que frena la compra. Por eso están las de plata, las de "¿pierdo
lo que hice?" y las de privacidad, y no hay relleno.

---

## 2026-09-08 — La landing se alinea al canvas "Rediseño Timón estilo Duolingo"

**Qué se decidió.** La referencia visual de la landing y de la app es el
canvas "Rediseño Timón estilo Duolingo" (artifact del 05/09/2026, 15
pantallas de escritorio + 15 de teléfono), que fue lo que aprobaron Fede y
Feli. Se toman de ahí las fuentes (DM Sans + Crimson Pro itálica + JetBrains
Mono), la tinta (`#0F1F36`), los grises azulados (`#5A6B85`, `#7C8CA6`), el
lavado de fondo azul/ámbar y el vidrio (`.glass`). Los nombres de token no
cambian; cambian los valores, en `globals.css`, igual que en la app.

**Por qué.** "No se ve como el diseño": con Plus Jakarta e Instrument Serif y
el crema plano la landing y la app no parecían el canvas.

**Qué se descartó.** Mantener Instrument Serif: la itálica del canvas es
Crimson Pro 600 y la app ya la cargaba.

---

## 2026-09-08 — El hero es el formulario, no dos botones

**Qué se decidió.** El hero replica la pantalla 01 del canvas: a la
izquierda la promesa y Timon con su globito; a la derecha la tarjeta con dos
pestañas ("Crear cuenta" con nombre + mail, "Ya tengo cuenta" con mail). El
submit manda a `app.timonear.com/entrar?modo=…&email=…&nombre=…&momento=…`,
que es la única puerta real. En teléfono es la pantalla M01: mascota, frase y
dos botones que van directo a la app. La fila "¿dónde estás hoy?" queda
dentro del hero y el momento elegido viaja en la query.

**Por qué.** Reunión del 07/09/2026: "que la primera solapa (el registro)
sea el hero section de la landing". Lo que había (dos botones sin campo)
seguía siendo un paso extra.

---

## 2026-09-08 — Precios visibles en la home y nuevo orden de secciones

**Qué se decidió.** Precios deja de ser una vista aparte y es una sección de
la home (`#precios`), entre "Qué devuelve" y el FAQ. Orden final: hero →
cómo funciona → antes/después + ejemplo del informe → precios → FAQ →
cierre. La navbar enlaza a las secciones; "Para colegios" sigue siendo una
vista propia. Se sacaron los números gigantes de fondo (`SectionMark`) y se
agregó la mención de que las preguntas se armaron con psicólogas y
psicopedagogas.

**Por qué.** Fede (06/09/2026): "en ninguna parte está el precio visible de
forma fácil", "no hablamos de que lo hicimos con psicólogos", "tengamos algo
tangible para mostrar".

---

## 2026-09-08 — El formulario de colegios manda de verdad

**Qué se decidió.** `ColegiosSection` hace POST a `/api/contact` con
`tipo: 'colegio'`; antes solo mostraba "recibimos tu solicitud" sin enviar
nada. `/api/contact` valida el mail y, si falta `RESEND_API_KEY`, devuelve
503 con `fallbackEmail` para que el chat y el formulario muestren
`info@timonear.com` en vez de un error mudo. Localmente no hay clave de
Resend: el envío real solo se puede verificar en el deploy.

---

## 2026-10-26 — La landing se rehace calcando acquisition.com, y nace /programa

**Qué se decidió.** Reunión con Feli del 23/10/2026: la home deja el estilo
Duolingo y copia la estructura, tipografía (Poppins), largo de textos y CTAs
de acquisition.com, con la paleta de Timon (su violeta → océano, su dorado →
ámbar, su negro → navy). Nuevas rutas:
- `/` — pregunta gigante + un botón, 4 números del producto, lead magnet,
  4 recursos gratis, preguntas, fundadores, footer azul con descargo.
- `/programa` — calco de acquisition.com/workshop con la oferta armada con
  la ecuación de valor de Hormozi (resultado: carrera + universidad + salida
  laboral; tiempo: 2 semanas; esfuerzo: <10 min por parada desde casa).
  Escasez real: cohorte fundadora de 100 (Facu y Feli llaman a cada familia).
- `/reporte` — lead magnet "Carreras nuevas por industria", calco de
  acquisition.com/roadmap. El pedido entra por `/api/contact` (tipo `reporte`).
- `/colegios` — la vista de colegios pasa a ser ruta propia, mismo contenido.

**Por qué.** "La landing actual no describe bien qué es Timon, parece hecha
con AI". Sin precio visible (asusta al chico, no al padre): se habla en la
llamada con la familia. Sin "orientación vocacional".

**Pendiente de aprobar o completar.** La garantía (`src/lib/programa.ts`) es
una propuesta: en la reunión quedó "a definir". Faltan el video explicativo,
la foto de los fundadores, el PDF real del reporte y testimonios reales (no
se muestra ninguno hasta tenerlos). La carta de /programa es un borrador
para que Facu y Feli la reescriban con su voz.

**Qué se descartó.** Mostrar un contador de lugares inventado
(`LUGARES_RESTANTES` queda en `null` hasta tener el número real) y citar
testimonios de la psicopedagoga sin permiso.

---

## 2026-10-26 (tarde) — Lead magnet nuevo: El Mapa de los 16 Mundos; /programa calcado de verdad

**Qué se decidió.**
- El "Reporte de carreras nuevas por industria" se reemplaza por **El Mapa de los 16
  Mundos** (`/mapa` captura, `/mapa/guia` el mapa). Elegido por Nico entre tres
  opciones (mapa, test exprés, charla con profesional virtual). Contenido: las 16
  áreas canónicas del catálogo de la app (`timon/src/lib/demo/areas16.ts`), copiadas
  a `src/lib/mundos.ts`: sub-mundos, 136 carreras, dónde se trabaja, verdades del
  oficio y las preguntas de cada área pasadas a segunda persona. Fotos CC0 en
  `public/mapa`. Se entrega al instante (sin esperar mail), se marca con estrellas
  (localStorage) y se descarga como PDF con imprimir. Cierra con el puente al
  programa: "ya sabés qué existe, falta cuál es el tuyo".
- La sección de recursos de la home queda en tres: el mapa, el programa y Timon en
  tu colegio.
- `/programa` se rehízo sobre el workshop-4b de acquisition.com estudiado bloque por
  bloque (mismo orden, mismo largo de texto, cards con el dolor y no la solución,
  sin footer). Acento azul océano en lugar del dorado (decisión de Nico).
- Fundadores: tres lugares de foto (Facu, Feli, Nico) en home y programa; las fotos
  se cargan en `FUNDADORES` de `src/lib/programa.ts`.

**Por qué.** Nico: el reporte "no se entiende" y quería algo que de verdad le sirva a
un chico que empieza a ver qué estudiar ("conocer profesiones") y que lo deje con
ganas de pagar el programa.

**Qué se descartó.** Test exprés (preguntas nuevas sin revisión de psicopedagogas) y
charla gratis con profesional virtual (gasto en Azure OpenAI por cada lead). Los
relatos "un día de trabajo" son del profesional virtual de la app: se muestran como
relato de ejemplo, con la aclaración al pie, nunca como testimonio real.

---

## 2026-10-26 (noche) — /programa se rehace sobre acquisition.com/o-vegas

**Qué se decidió.** La referencia correcta es `acquisition.com/o-vegas` (la que ve Nico),
no `/workshop`, que redirige a variantes A/B (`workshop-4b`). Estructura calcada:
franja con píldora · hero navy con pregunta en mayúsculas + subtítulo + video montado
sobre el borde · una línea con negrita + botón · "Lo que dicen" (papel texturado,
video vertical de alumno, capturas inclinadas con resaltador amarillo) · banda rasgada
"Lo que te llevás en 2 semanas" · 3 columnas #1/#2/#3 · botón · más capturas ·
formulario · 4 preguntas en barras navy con renglones cortos · botón · footer mínimo.
Fotos generadas en el ChatGPT de Nico (originales en ~/Downloads/timon-*.png).

**Capturas simuladas.** Nico pidió simular capturas de mensajes con lo que les
dijeron alumnos y familias. Se armaron con `ejemplo: true` en `src/app/programa/page.tsx`:
se ven solo en desarrollo, con la etiqueta EJEMPLO, y no se renderizan en producción
(`components/acq/Prueba.tsx`). Para publicarlas: reemplazar por el mensaje real con
permiso y poner `ejemplo: false`. La cita de la psicopedagoga es textual y sí sale.

---

## 2026-10-26 (cierre) — Oferta Hormozi y nuevo lead magnet: test de intereses

**Qué se decidió.**
- Oferta con nombre MAGIC: "Tu Carrera en 14 Días" (`OFERTA` en `src/lib/programa.ts`).
  Núcleo con nombre propio (#1 Tu Mapa Personal de Carreras, #2 Charlas con
  Profesionales, #3 El Informe para tu Familia), tres bonos que atacan objeciones
  (llamada 1 a 1 con un fundador, Mapa de los 16 Mundos, reunión con psicopedagoga
  —esta última `propuesta: true`, hoy se cobra $50.000 aparte—), escasez (los bonos
  son para los primeros 100) y la garantía antes del botón. Fotos de producto
  generadas en el ChatGPT de Nico.
- Lead magnet: `/test`, un test corto de intereses (Holland/RIASEC, 18 actividades)
  que devuelve tus tres fuertes y tus mundos de carreras, con el mail antes del
  resultado. Reemplaza al Mapa (que pasa a ser bono) y a un diagnóstico de
  situación que se probó y se descartó en el día. PENDIENTE: que una psicopedagoga
  revise las preguntas y el cruce tipo → mundo (`src/lib/test.ts`).
- "Cohorte" sale de todos los textos (no se entiende): "primeros 100 alumnos".
  El número "15 agentes de IA" de la home pasa a "3 psicopedagogas lo revisaron".

**Actualización (26/10/2026):** Nico descartó el bono de la reunión con psicopedagoga.
Quedan dos bonos: la llamada 1 a 1 con un fundador y el Mapa de los 16 Mundos. La
reunión con psicopedagoga sigue como adicional pago ($50.000).
