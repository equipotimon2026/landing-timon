/**
 * Precios de Timon en un solo lugar.
 *
 * De la reunión del 07/09/2026 quedaron dos números por definir y son
 * justamente los dos que viven acá:
 *
 *  1. `LIST_PRICE_ARS` — el precio a partir del cual el número deja de
 *     asustar. Hoy está el precio de lista actual, sin cambiar.
 *  2. `INSTALLMENTS` — la cantidad de cuotas a partir de la cual la gente
 *     lo percibe como beneficio y no como truco. Feli: 3 no mueve la aguja,
 *     6 o 12 ya se siente bien.
 *
 * Cambiar estos dos valores actualiza la landing, el paywall y el link de
 * pago que se le manda al que paga. No hay precios hardcodeados en la UI.
 */

/** Precio de lista del recorrido completo, en pesos. */
export const LIST_PRICE_ARS = 140_000;

/** Reunión con psicopedagogo. Se suma más adelante, dentro del proceso. */
export const PSICO_ADDON_ARS = 50_000;

/** Cuotas ofrecidas. */
export const INSTALLMENTS = 12;

/**
 * Descuento por pagar de una en vez de en cuotas. La cuota no lleva interés
 * nuestro: el precio en cuotas es el de lista, y el pago único baja.
 */
export const UPFRONT_DISCOUNT_PCT = 10;

/** Grupo de referidos: 4 personas → 25% para los que todavía no pagaron. */
export const GROUP_SIZE_THRESHOLD = 4;
export const GROUP_DISCOUNT_PCT = 25;

/** Paradas gratis antes del paywall. La 4 en adelante es paga. */
export const FREE_STOPS = 3;
export const TOTAL_STOPS = 13;

export const upfrontPriceArs = () =>
  Math.round((LIST_PRICE_ARS * (100 - UPFRONT_DISCOUNT_PCT)) / 100 / 100) * 100;

export const installmentArs = () =>
  Math.round(LIST_PRICE_ARS / INSTALLMENTS / 100) * 100;

export const fmtArs = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n);
