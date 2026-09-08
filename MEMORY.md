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
