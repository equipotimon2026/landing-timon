# Investigación visual: hero y "la red" (14-11-2026)

**Resumen.**
1. scrut.io es la referencia principal: hero oscuro, centrado y corto (titular de 2 líneas con UNA palabra en gradiente, 2 CTAs) con el producto real asomando abajo; después la página alterna bloques claros y oscuros con un ritmo muy regular.
2. Lo que impacta en los 3 primeros segundos, en todas las referencias que cargaron: una sola idea a escala grande y una imagen concreta (persona, escena, producto vivo). Nunca una compu genérica ni cinco cosas compitiendo.
3. Para la red, los mejores (scrut, Stripe, Ramp) no dibujan una "telaraña": muestran nodos ricos con nombre y cara, un centro claro y flechas con etiqueta que cuentan qué viaja entre los nodos.

Capturas en `docs/hero-refs/` (1440x900, JPEG q75). `<sitio>-1500ms.jpg` es la entrada (1,5 s); `<sitio>.jpg` es el estado a los ~4 s. scrut está en `hero-refs/scrut/` y las secciones de red en `hero-refs/red/`.

---

## scrut.io (referencia principal)

Capturas: [hero con nav](hero-refs/scrut/00-hero-con-nav-y-banner.jpg) · [hero limpio](hero-refs/scrut/00-hero-limpio.jpg) · [hero + logos](hero-refs/scrut/01-hero-y-logos.jpg) · [producto del hero, frame A](hero-refs/scrut/13-hero-producto-frame-a.jpg) / [frame B](hero-refs/scrut/13-hero-producto-frame-b.jpg) · [stats y badges](hero-refs/scrut/02-stats-badges.jpg) · [segmentos + crew](hero-refs/scrut/03-journey-cards-crew-intro.jpg) · [grilla del crew](hero-refs/scrut/04-crew-grid.jpg) · [banner IA](hero-refs/scrut/05-ai-banner.jpg) · [integraciones](hero-refs/scrut/06-integrations-grid.jpg) · [features sticky (texto)](hero-refs/scrut/07-sticky-features-texto.jpg) · [testimonios, números, premios](hero-refs/scrut/08-testimonios-numeros-premios.jpg) · [arco de frameworks](hero-refs/scrut/09-arco-frameworks.jpg) · [diagrama de arquitectura](hero-refs/scrut/10-arquitectura-diagrama.jpg) · [G2 + roadmap + explore](hero-refs/scrut/11-g2-roadmap-explore.jpg) · [CTA final + footer](hero-refs/scrut/12-cta-form-footer.jpg) · [mobile](hero-refs/scrut/14-mobile-hero.jpg) · hojas de contacto [1](hero-refs/scrut/15-hoja-contacto-1.jpg) y [2](hero-refs/scrut/15-hoja-contacto-2.jpg) (incluyen el panel sticky de producto a la derecha, que en mi captura full-page no se ve).

### Estructura y ritmo de secciones
La página mide unos 14.700 px a 1440 de ancho. El orden:

| # | Sección | Fondo |
|---|---|---|
| 1 | Hero: chips de frameworks, H1, bajada, 2 CTAs, mockup del producto, 2 filas de logos de clientes | **oscuro** (navy) |
| 2 | 4 stat-cards (4.9/5 G2, 2.500+ clientes, 10M+ assets, 70+ frameworks) + fila de badges de premios | claro |
| 3 | "Where are you on your compliance journey?": 3 cards por segmento (startup / growth / enterprise); la tercera en oscuro | claro |
| 4 | "Your Agentic Compliance crew": card oscura con testimonio + métrica "200+ hrs → 40 hrs" junto a un mock del producto | claro |
| 5 | "Meet the Crew": grilla de 3x3 de agentes con nombre de rol, descripción y un resultado ("Weeks → one session") | claro |
| 6 | Banner oscuro redondeado: "Built for teams that take AI seriously" | caja oscura sobre claro |
| 7 | "Connects to 150+ tools": grilla de logos con el logo de Scrut grande al centro | claro |
| 8 | 3 bloques de features (Compliance / Risk / Trust): texto a la izquierda con lista de links, producto **sticky** a la derecha | claro |
| 9 | Testimonios en carrusel, 4 números con fuente, premios y analistas (bento) | claro |
| 10 | Arco de frameworks: "Already SOC 2? You're closer to ISO 27001 than you think" | claro |
| 11 | "AI that makes your team 10x faster": diagrama de arquitectura + 4 cards | **oscuro** |
| 12 | "#1 on G2…": equipo humano a la izquierda, reseñas a la derecha | claro |
| 13 | Banner oscuro "Not sure which frameworks you need? Find out in 2 minutes" (quiz) | caja oscura |
| 14 | "Explore more": 4 cards de recursos | claro |
| 15 | CTA final con formulario | **oscuro** |
| 16 | Footer | blanco |

El ritmo es: un bloque oscuro grande al principio (hero, unos 1.370 px), uno en el medio (arquitectura, unos 1.650 px) y uno al final (CTA). Entre medio, todo es gris muy claro, cortado por 2 o 3 "cajas" oscuras redondeadas dentro del fondo claro. Calculo que es ~30 % oscuro y ~70 % claro. Cada sección arranca con un H2 centrado de 1 o 2 líneas y una bajada corta. Casi no hay secciones partidas en dos columnas, salvo las features con producto sticky.

### Cómo arma el hero
- **Composición:** todo centrado en una columna angosta (~600 px de texto). Arriba, una fila de chips con los frameworks (SOC 2, ISO 27001… "+65 more"). Debajo, el H1 en 2 líneas, una bajada de 3 líneas, 2 CTAs y, abajo, un mockup ancho del producto (~990 px) con borde violeta y esquinas redondeadas. Asoma cortado en el pliegue de 900 px.
- **Visual:** el producto real, con datos creíbles: "Evidence Task 125", "98/125 Evidences Automated", barras de progreso de colores, frameworks con sus logos. No es una compu ni un dispositivo: es la UI flotando sobre el fondo. Va rotando: un frame muestra la tarea de evidencias y otro un "Access Review" con un chat de "Scrut Teammates" superpuesto y un cursor animado ([A](hero-refs/scrut/13-hero-producto-frame-a.jpg) / [B](hero-refs/scrut/13-hero-producto-frame-b.jpg)).
- **Impacto:** viene del contraste. Fondo navy casi negro, titular blanco grande y **una sola palabra** ("compliance") pintada con gradiente aqua→celeste. El CTA principal usa el mismo gradiente, así que el ojo une palabra clave y botón. El fondo tiene una textura sutil de puntos (dot-matrix) que se desvanece.
- **Qué invita a seguir:** el mockup cortado por el pliegue (querés ver el resto) y, inmediatamente debajo, 2 filas de logos de clientes en gris sobre el mismo navy. El corte de oscuro a claro llega recién después de los logos.
- **Entrada:** entre 1 s y 4 s el hero está igual (comparé `d-hero-1s` con `d-hero-4s`): no hay una animación de entrada llamativa. Lo que se mueve es el contenido del mockup (cursor, barras, cambio de pantalla).

### Paleta y proporciones
- Navy de fondo: `rgb(3, 20, 50)` (#031432). Texto blanco puro en los bloques oscuros.
- Gradiente de marca: `linear-gradient(135-147deg, #00FDB3 → #43A6F7)` (verde agua → celeste). Lo usan **solo** en 3 lugares: la palabra destacada del titular, el CTA primario y algún acento ("superpowers?", "Find out in 2 minutes."). Nada de gradientes grandes de fondo.
- Fondo claro: gris azulado muy suave (aprox. #F3F5F9) con cards blancas encima.
- Acentos de iconos y overlines: violeta/índigo (#5B4FE0 aprox.), con algún dorado y verde por segmento.
- CTA secundario: píldora gris-azul translúcida sobre oscuro, texto blanco.

### Tipografía
- Titulares: **Rethink Sans** 600, H1 de 52 px con `letter-spacing: -2px` e interlineado de ~1,08. H2 de 40-44 px, H3 de 32 px. Siempre 600; nunca 700-800.
- Cuerpo: **Inter** de 16 px y peso 400, gris medio, con bajadas de máximo 3 líneas.
- La escala es moderada (52 px a 1440). El impacto no sale de un titular gigante sino del contraste oscuro/blanco y del color de una sola palabra.

### Cómo muestra el producto
- Siempre la UI real, recortada y simplificada, sobre una card blanca con sombra suave y bordes de 16-20 px. Nunca un marco de laptop.
- Composición en capas: una ventana principal con un panel más chico superpuesto que se sale del borde (chat de Teammates, "Automation Sources"). Esa superposición da profundidad sin 3D.
- En las features, el producto queda **sticky** a la derecha mientras el texto de la izquierda scrollea por 3 bloques (Compliance, Risk, Trust).

### Motion e interacciones
- Webflow Interactions (`data-w-id`), 55 animaciones activas al cargar, 1 canvas y 1 Lottie. Vi un cursor que se mueve dentro del mockup, la rotación de pantallas y barras que se llenan.
- Logos de testimonios y de clientes en carrusel horizontal.
- Popups agresivos (banner superior de webinar que rota, cookies y un modal de salida "One last thing…"). **No copiar.**

### Cards, iconos y diagramas
- Cards blancas con radio de ~16 px, borde de 1 px muy suave y padding generoso. Icono chico de color arriba a la izquierda, título de 20-22 px a 600 y descripción gris. En "Meet the Crew", cada card cierra con un resultado en violeta ("Hours → Minutes").
- La grilla del crew usa líneas finas con cruces en las intersecciones, tipo plano técnico, en vez de cards separadas.
- Iconos de línea, monocromos y de un solo color de acento por card.
- Diagramas: la arquitectura es un diagrama de cajas navy con borde fino azul, con etiquetas en píldora sobre las flechas ("Recommendations & Drafts", "Approved Actions", "Evidence & Signals") y una caja resaltada con borde/glow verde ("Human Review & Approval"). Usa líneas punteadas para el contexto y líneas sólidas para las acciones.

### Cómo presenta el ecosistema (lo más útil para "la red")
1. **Grilla de integraciones** ([06](hero-refs/scrut/06-integrations-grid.jpg)): una retícula de casillas, muchas vacías y unas 20 con un logo en tile blanco. El logo de Scrut, grande y con gradiente, va al centro. Las casillas vacías hacen que la red se sienta más grande de lo que se muestra. Algunos tiles llevan una mini etiqueta ("VIA MCP").
2. **Arco de frameworks** ([09](hero-refs/scrut/09-arco-frameworks.jpg)): un semicírculo de puntos con nodos-badge (SOC 2 arriba al centro, ISO, HIPAA, GDPR, NIST) y el titular dentro del arco. Cuenta "estás cerca de lo siguiente".
3. **Diagrama de arquitectura** ([10](hero-refs/scrut/10-arquitectura-diagrama.jpg)): capas apiladas (App → Teammates → Common Data Layer → Integraciones). La capa de datos lista 5 tipos de entidad como nodos circulares unidos por una curva punteada (People, Devices, Data, Controls, Integrations). Las flechas tienen nombre.

### Qué tomar para Timon y qué no
**Tomar:**
- La estructura del hero: oscuro, centrado, titular de 2 líneas con **una** palabra en gradiente, bajada corta, 2 CTAs y algo real asomando cortado por el pliegue. En Timon, en lugar de la UI, una "escena" real: caras de profesionales y chicos, una conversación, la ficha de una carrera.
- El navy profundo más un gradiente de marca usado con mucha disciplina: la palabra clave, el CTA primario y nada más.
- El ritmo: abrir oscuro, cuerpo claro con 1 o 2 cajas oscuras que cortan y cerrar oscuro con el CTA.
- Titulares a 600 con tracking negativo y cuerpo en Inter de 16 px. Se lee serio y moderno, sin gritar.
- La grilla de "red" con casillas vacías y el centro destacado, y las flechas con etiqueta que dicen qué viaja.
- Cards con un resultado concreto al pie ("Semanas → una charla"), que es el equivalente al "200 hrs → 40 hrs".
- Producto en capas (card principal + panel superpuesto) en lugar de un mockup de dispositivo.

**No tomar:**
- Las **píldoras/eyebrows en mayúsculas** arriba de cada H2 ("SCRUT TEAMMATES · AGENTIC AI", "COMPLIANCE", "RISK") ni la fila de chips arriba del H1. El founder no las quiere; el titular tiene que sostenerse solo.
- Los popups, el banner rotativo y el modal de salida.
- La densidad B2B: 16 secciones, premios de analistas, badges de G2. Para un padre o madre sobran; con 2 pruebas fuertes alcanza.
- El vocabulario de "dashboard": métricas tipo "98/125". Para Timon, el equivalente es humano (nombres, caras, citas).

---

## Heros de referencia

> Por cada sitio: qué impacta en los primeros 3 s y qué hace que quieras bajar.

- **Apple iPhone** ([final](hero-refs/apple-iphone.jpg) · [1,5 s](hero-refs/apple-iphone-1500ms.jpg)). La página de categoría abre con "iPhone" enorme en negro, una fila de miniaturas de modelos que entra en cascada (en el frame de 1,5 s faltan las últimas) y después la card "iPhone Duo / Hello, hello." con el producto en mano, foto real. Para bajar: la card siguiente asoma a la derecha y deja tensión horizontal.
- **Apple Vision Pro** ([final](hero-refs/apple-vision-pro.jpg)). Una persona a pantalla completa usando el producto, fondo blanco y nombre abajo a la izquierda. El impacto es la cara humana a escala grande. No hay nada más en pantalla.
- **Linear** ([final](hero-refs/linear.jpg) · [1,5 s](hero-refs/linear-1500ms.jpg)). A 1,5 s la pantalla está **negra vacía**; a 4 s ya hay titular y producto. Hace un fade-in escalonado. El titular blanco va a la izquierda, ~48 px. Abajo, la app real (issue "Faster app launch" con actividad) cortada por el pliegue. Para bajar: el producto se ve vivo y a medias.
- **Stripe** ([final](hero-refs/stripe.jpg)). La "onda" de gradiente naranja/rosa/violeta ocupa la diagonal derecha y el titular combina negro + gris en una sola frase larga. Arriba hay un contador vivo ("Global GDP running on Stripe: 1.749411…%") que se mueve: es un dato vivo que genera curiosidad. Logos al pie.
- **Vercel** ([final](hero-refs/vercel.jpg)). Fondo blanco, titular a la izquierda, triángulo negro al centro y 3 líneas de texto a la derecha. Es minimalismo extremo: la composición en 3 columnas es el impacto. No vi el globo ni la red de edge que tenía antes; la home cambió a "Agentic Infrastructure".
- **Raycast** ([final](hero-refs/raycast.jpg) · [1,5 s](hero-refs/raycast-1500ms.jpg)). Es el mejor ejemplo de entrada: a 1,5 s solo hay texto sobre negro; a 4 s aparecen detrás unas franjas rojas diagonales difuminadas (luz). Titular centrado de 2 líneas y un solo CTA chico abajo. El movimiento de entrada **es** el impacto.
- **Arc** ([final](hero-refs/arc.jpg)). Hoy es "A farewell to Arc" (anuncio de cierre): logo grande, titular serif y un botón. "Scroll to read what's happening" invita a bajar con el texto mismo. No es el hero de producto que conocíamos.
- **The Browser Company** ([final](hero-refs/thebrowsercompany.jpg) · [1,5 s](hero-refs/thebrowsercompany-1500ms.jpg)). A 1,5 s el sello del logo se está dibujando (las letras giran); a 4 s aparece una frase serif itálica. Es una entrada caligráfica, íntima y lenta.
- **Family** ([final](hero-refs/family.jpg) · [1,5 s](hero-refs/family-1500ms.jpg)). A 1,5 s todo está en blanco; a 4 s aparece un collage de ilustraciones 3D pastel alrededor del titular centrado. Es cálido y juguetón. "Explore Ethereum…" ya asoma abajo.
- **Lusion** ([final](hero-refs/lusion.jpg)). **No cargó en headless**: a ~11 s seguía el loader ("093"). Sin datos del hero.
- **Active Theory** ([final](hero-refs/activetheory.jpg)). **No soportado**: muestra "YOUR BROWSER IS NOT SUPPORTED" sobre un render 3D de fondo (anillo de vidrio con partículas). Se ve la intención (3D atmosférico), pero no el sitio real.
- **Locomotive** ([final](hero-refs/locomotive.jpg) · [1,5 s](hero-refs/locomotive-1500ms.jpg)). A 1,5 s hay un intro tipográfico ("Digital-First Agency / Based in Montreal" escribiéndose); a ~11 s, un retrato en video a pantalla completa bañado en rojo con el nombre serif enorme abajo. Impacto: una cara humana con color saturado.
- **basement.studio** ([final](hero-refs/basement.jpg)). A 4 s todo estaba negro (WebGL cargando). A ~11 s aparece una escena 3D de su oficina (arcade, aro de básquet, pantallas) con un toggle "HUMAN / MACHINE". Es un mundo explorable.
- **rauno.me** ([final](hero-refs/rauno.jpg)). Una card blanca con una bio grande en sans, un círculo amarillo saturado detrás y una cruz de cursor. La interacción es con el mouse (el círculo sigue o revela). Tiene personalidad con muy pocos elementos.
- **Titan** ([final](hero-refs/titan.jpg)), de land-book. Foto cenital real de un equipo trabajando, el nombre en serif gigante arriba a la izquierda y el texto chico abajo a la izquierda. Personas reales en su contexto: la promesa se lee en la foto.
- **Unicorn Studio** ([final](hero-refs/unicorn-studio.jpg) · [1,5 s](hero-refs/unicorn-studio-1500ms.jpg)), de land-book. A 1,5 s, negro; a 4 s, titular serif centrado y debajo un "lienzo" con reglas de diseño que muestra un gradiente 3D animado. Muestra el producto como obra, no como UI.
- **Teamtailor** ([final](hero-refs/teamtailor.jpg)), de land-book. Video/foto a pantalla completa de manos sobre una mesa (una entrevista), con "For hiring people." chico abajo a la izquierda. El momento humano es el producto. (Tapado por el banner de cookies.)
- **Mercury** ([final](hero-refs/mercury.jpg)). Un escritorio con silla en la cima de una montaña al amanecer, titular centrado "Radically different banking". Es una metáfora en una sola imagen: libertad + trabajo.

**No cargaron o quedaron bloqueados:** diagram.com (error SSL, también con www), awwwards.com (bloqueo anti-bot: la captura salió vacía y la borré), lusion.co (loader eterno en headless) y activetheory.net ("browser not supported"). godly.website hoy redirige a recent.design (un feed de shots en X, sin sitios); usé land-book.com para sumar Titan, Unicorn Studio y Teamtailor. siteinspire cargó, pero no elegí de ahí.

---

## Redes y ecosistemas

Capturas en `hero-refs/red/`:
- **Stripe Connect** ([hero](hero-refs/red/stripe-connect-hero.jpg) · [flujo de fondos](hero-refs/red/stripe-connect-flujo-fondos.jpg)). Un teléfono al centro con el dashboard de un comercio. A los lados, píldoras "Customer" con montos ($430, $280, $90) que se conectan por líneas al teléfono, y arriba "Shopify" con "$20" y "Merchant" con "$1,130". La red **cuenta una transacción**: cada nodo tiene rol y número. Más abajo, unas tabs ("Sellers collect payments", "Split payouts"…) cambian un diagrama de 3 nodos (Buyer → Platform → Seller) unidos por flechas punteadas animadas, con una leyenda de colores.
- **Stripe home, "The backbone of global commerce"** ([captura](hero-refs/red/stripe-backbone.jpg)). 4 números grandes y debajo un "estallido" de cientos de líneas finas violetas que convergen en un punto sobre un halo naranja. No muestra nodos: muestra **volumen**.
- **Ramp, "Systems that never spoke"** ([captura](hero-refs/red/ramp-systems-never-spoke.jpg)). Lo opuesto a una red: ventanas sueltas desparramadas (un mail, un PDF, una planilla, un form, un chat) para mostrar el caos de "antes". El dolor se ve y la solución llega en la sección siguiente. Aparte, su [card de integraciones](hero-refs/red/ramp-integraciones-card.jpg) es una nube de logos en círculos que se desvanece hacia los bordes.
- **Clerk** ([integraciones](hero-refs/red/clerk-integraciones.jpg) · [hero](hero-refs/red/clerk-hero.jpg)). Grillas de 3x2 con líneas finas sobre negro e iconos de línea. Es sobrio pero frío: solo logos, sin relación entre ellos.
- **Linear integrations** ([captura](hero-refs/red/linear-integrations.jpg)). Un directorio: sidebar de categorías y cards oscuras de 2 columnas (logo, nombre, "By Linear", 1 línea). Sirve para explorar, no para impactar.
- **Raycast Store** ([captura](hero-refs/red/raycast-store.jpg)). El hero es una nube de iconos de apps en tiles 3D con brillo, flotando sobre las franjas rojas, con "Store" grande y un buscador. Debajo, cards con autor (avatar + nombre) e instalaciones: la comunidad se ve como personas.
- **Supabase** ([captura](hero-refs/red/supabase-bento.jpg)). Un bento de productos (Database, Auth, Storage, Realtime, Vector…) donde cada celda tiene una micro-ilustración propia. Más abajo, un muro de tweets de la comunidad (lo vi en la página completa; no lo recorté).
- **Mercury**. No tiene una sección de red; vi esferas y halos abstractos en grises (en la página completa, no recortado).
- **Vercel**. En la home actual no encontré el diagrama de edge network ni un globo.

### Patrones que funcionan
1. **Nodos ricos con rol y dato.** Stripe Connect pone "Customer $430" y no un punto. La red se entiende cuando cada nodo dice quién es y qué aporta.
2. **Un centro claro.** Scrut pone su logo grande en medio de la grilla, y Stripe el teléfono. El ojo sabe dónde está "Timon".
3. **Flechas con etiqueta** (scrut: "Evidence & Signals", "Approved Actions"). Nombran lo que viaja entre los nodos.
4. **Casillas vacías y bordes que se desvanecen** (scrut, Ramp). Sugieren que la red sigue más allá de lo que se muestra.
5. **Un antes y un después.** Ramp muestra el caos y después el orden; da tensión narrativa.
6. **Reveal por estados**: las tabs de Stripe Connect y el sticky de scrut. La misma red se recorre de a un caso por vez.

### Qué evitar
- La telaraña genérica de puntos y líneas, sin nombres: no dice nada.
- Los directorios de logos (Linear, Clerk) como sección de impacto. Sirven como página secundaria.
- Las animaciones que son puro volumen (el estallido de Stripe) si la marca no tiene volumen para respaldarlas.
- Demasiados nodos en el primer frame: con 5 a 8 visibles alcanza; el resto se insinúa.

---

## Conclusiones para Timon

### Hero (8 principios)
1. **Una idea, un titular de 2 líneas, una palabra en color.** Como scrut: titular blanco sobre navy con la palabra clave en el gradiente de marca (por ejemplo, la palabra que nombra el futuro del chico). Nada más compite.
2. **Sacar la compu y mostrar personas.** Lo que impacta en Vision Pro, Titan, Teamtailor y Locomotive es una persona real a escala grande. Para Timon: la cara de un chico de 17 hablando con un profesional, o un mosaico de profesionales reales.
3. **Lo que asoma abajo tiene que ser concreto y estar cortado.** scrut corta el producto en el pliegue y Linear también. En Timon podría asomar la fila de "personas de la red" (fotos + profesión) cortada, para que den ganas de bajar.
4. **Entrada en 2 tiempos, no más.** Raycast y Linear: primero el texto (0-1 s) y después la imagen o la luz entra suave (1-2 s). Nada de loaders ni intros de 5 s (Lusion se queda cargando y no se ve nada).
5. **Fondo oscuro con una sola fuente de luz o color.** Las franjas de Raycast y el gradiente sutil con puntos de scrut. Da profundidad sin llenar.
6. **Titulares a 600 con tracking negativo, bajada de 2-3 líneas como máximo, 2 CTAs.** Escala de 52-64 px; el impacto sale del contraste, no del tamaño.
7. **Sin chips ni eyebrows arriba del titular.** La prueba social va debajo del pliegue (logos de colegios y universidades, o números), como hace scrut con los logos.
8. **Un dato vivo como gancho opcional** (el contador de Stripe): por ejemplo, "X charlas con profesionales esta semana" tickeando. Genera curiosidad sin cargar.

### La red (5 principios)
1. **Timon al centro, nodos con cara y rol alrededor** (profesional, carrera, universidad, empresa): una foto o logo más una línea ("Ingeniera en Mercado Libre"). Es el patrón de Stripe Connect llevado a personas.
2. **Flechas con lo que viaja**: "una charla", "un día en la oficina", "la cursada real". Así el padre entiende qué recibe el hijo de cada nodo.
3. **Mostrar 6-8 nodos y sugerir el resto** con una grilla que se desvanece o casillas vacías (scrut). Nunca 40 puntos.
4. **Recorrer por casos**: tabs o un sticky-scroll con "Si le gusta la medicina → estos 4 nodos se iluminan". Es el reveal por estados de Stripe y scrut.
5. **Opcional: el "antes"** al estilo Ramp, con el chico frente a folletos, rankings y consejos sueltos que no se hablan entre sí. Después, la red de Timon los ordena.
