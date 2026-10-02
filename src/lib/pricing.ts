/**
 * Precios de Timon en un solo lugar.
 *
 * Espejo de `src/lib/timon/pricing.ts` en la app (timon): si cambia uno,
 * cambiar el otro. Son dos deploys distintos y no comparten build.
 *
 * `LIST_PRICE_ARS` es el precio de lista. Las cuotas se sacaron (Nico,
 * 02/10/2026): por ahora es un pago único, el mismo monto que cobra la app.
 */

/** Precio de lista del recorrido completo, en pesos. */
export const LIST_PRICE_ARS = 140_000;

/** Reunión con psicopedagogo. Se suma más adelante, dentro del proceso. */
export const PSICO_ADDON_ARS = 50_000;

/** Grupo de referidos: 4 personas → 25% para los que todavía no pagaron. */
export const GROUP_SIZE_THRESHOLD = 4;
export const GROUP_DISCOUNT_PCT = 25;

/** Paradas gratis antes del paywall. La 4 en adelante es paga. */
export const FREE_STOPS = 3;
export const TOTAL_STOPS = 13;

export const fmtArs = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n);
