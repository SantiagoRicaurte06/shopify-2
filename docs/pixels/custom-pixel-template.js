/**
 * Plantilla de Custom Pixel para Shopify.
 *
 * CÓMO SE USA
 * Admin → Configuración → Eventos de cliente → Añadir → Pixel personalizado.
 * Pega este archivo ahí, rellena las constantes de arriba y guarda.
 *
 * NO PEGUES ESTO EN EL THEME. Ese es justamente el error que este archivo
 * existe para evitar.
 *
 * POR QUÉ NO VA EN EL THEME
 * Los pixels de Shopify corren en un sandbox y reciben los eventos por la Web
 * Pixels API. Si además incrustas el pixel en el theme, cada acción se cuenta
 * dos veces: el algoritmo de la campaña optimiza sobre datos falsos y el coste
 * por adquisición que ves no es real.
 *
 * Meta y TikTok tienen canal oficial en Shopify. Conéctalos ahí, no aquí.
 * Este archivo es para todo lo demás.
 *
 * Documentación:
 * https://shopify.dev/docs/api/web-pixels-api
 * https://shopify.dev/docs/api/web-pixels-api/standard-events
 */

// ---------------------------------------------------------------------------
// Rellena esto.
// ---------------------------------------------------------------------------

/** Identificador de tu herramienta de analítica. */
const ANALYTICS_ID = "";

/** Ponlo en false cuando termines de probar. */
const DEBUG = true;

// ---------------------------------------------------------------------------

/**
 * Envía el evento a tu herramienta.
 *
 * Sustituye el cuerpo por la llamada real. Se deja vacío a propósito: enviar
 * datos a un servicio que no has elegido no es un valor por defecto razonable.
 */
function send(eventName, payload) {
  if (DEBUG) {
    console.log("[custom pixel]", eventName, payload);
  }

  if (!ANALYTICS_ID) return;

  // Ejemplo, si usaras una API propia:
  //
  // navigator.sendBeacon(
  //   'https://tu-endpoint.example/collect',
  //   JSON.stringify({ id: ANALYTICS_ID, event: eventName, ...payload })
  // );
}

// ---------------------------------------------------------------------------
// Eventos estándar. Comenta los que no necesites: cada uno que dejas activo es
// una petición más por visita.
// ---------------------------------------------------------------------------

analytics.subscribe("page_viewed", (event) => {
  send("page_viewed", {
    url: event.context.document.location.href,
    title: event.context.document.title,
  });
});

analytics.subscribe("product_viewed", (event) => {
  const variant = event.data.productVariant;

  send("product_viewed", {
    productId: variant.product.id,
    variantId: variant.id,
    title: variant.product.title,
    price: variant.price.amount,
    currency: variant.price.currencyCode,
  });
});

analytics.subscribe("product_added_to_cart", (event) => {
  const line = event.data.cartLine;

  send("product_added_to_cart", {
    variantId: line.merchandise.id,
    quantity: line.quantity,
    value: line.cost.totalAmount.amount,
    currency: line.cost.totalAmount.currencyCode,
  });
});

analytics.subscribe("checkout_started", (event) => {
  const checkout = event.data.checkout;

  send("checkout_started", {
    value: checkout.totalPrice.amount,
    currency: checkout.currencyCode,
    items: checkout.lineItems.length,
  });
});

analytics.subscribe("checkout_completed", (event) => {
  const checkout = event.data.checkout;

  send("checkout_completed", {
    orderId: checkout.order?.id,
    value: checkout.totalPrice.amount,
    currency: checkout.currencyCode,
    items: checkout.lineItems.length,
  });
});

// ---------------------------------------------------------------------------
// Otros eventos disponibles, por si los necesitas:
//
//   alert_displayed · cart_viewed · collection_viewed · search_submitted
//   product_removed_from_cart · payment_info_submitted
//   checkout_address_info_submitted · checkout_contact_info_submitted
//   checkout_shipping_info_submitted · ui_extension_errored
//
// ---------------------------------------------------------------------------
// ANTES DE DARLO POR BUENO
//
//   1. Pon DEBUG en true, navega por la tienda y comprueba en la consola que
//      cada evento se dispara UNA vez.
//   2. Haz una compra de prueba completa.
//   3. Comprueba en el panel de Meta y en el de TikTok que los eventos NO
//      llegan duplicados. La deduplicación entre el pixel de navegador y la API
//      de conversiones se hace por event_id, y hay que confirmarla ahí: no está
//      verificada en esta documentación.
//   4. Pon DEBUG en false.
// ---------------------------------------------------------------------------
