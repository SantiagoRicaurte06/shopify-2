# Investigación

Todo lo que sigue está leído en la fuente oficial que se cita. Donde no ha sido
posible verificar algo, se dice explícitamente en lugar de rellenar el hueco.

**Ninguna comisión, tarifa ni precio aparece en esta documentación.** Las cifras
que circulan en blogs no son tarifarios oficiales. Los enlaces a las páginas de
precios están en [03-pagos-colombia.md](03-pagos-colombia.md) para que los
consultes tú.

---

## Arquitectura de themes

| Hecho | Fuente |
|---|---|
| Directorios: `assets`, `blocks`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`. Solo `layout/theme.liquid` es obligatorio para poder subir el theme | [theme architecture](https://shopify.dev/docs/storefronts/themes/architecture) |
| `content_for_header` y `content_for_layout` son obligatorios en el layout | [layouts](https://shopify.dev/docs/storefronts/themes/architecture/layouts) |
| Una plantilla JSON renderiza **hasta 25 secciones**, y cada sección **hasta 50 bloques** | [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates) |
| Una sección necesita `presets` para poder añadirse desde el editor | [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates) |
| Los theme blocks viven en `/blocks`, se reutilizan entre secciones, se anidan **hasta 8 niveles** excluyendo la sección, y se renderizan con `{% content_for 'blocks' %}`. Tipos `@theme` y `@app` | [blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks), [schema](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/schema) |
| Los section groups son JSON en `sections/`, referenciados desde el layout con `{% sections %}` | [section groups](https://shopify.dev/docs/storefronts/themes/architecture/section-groups) |
| `{% stylesheet %}` y `{% javascript %}` se agrupan en un único bundle con subsetting por página | [JS & stylesheet tags](https://shopify.dev/docs/storefronts/themes/best-practices/javascript-and-stylesheet-tags) |

**La documentación no fija un número máximo de theme blocks por theme.** El plan
inicial citaba «300»; no aparece en la fuente y se ha retirado.

### Punto de partida

`shopify theme init` clona el **Skeleton Theme**, que es lo que Shopify recomienda
hoy para empezar un theme.
→ [crear un theme](https://shopify.dev/docs/storefronts/themes/getting-started/create)
· [Shopify/skeleton-theme](https://github.com/Shopify/skeleton-theme) (licencia MIT)

Horizon existe y es el theme insignia de Shopify, pero tiene **licencia
propietaria** y los themes derivados de él **no pueden publicarse en el Theme
Store**. → [Shopify/horizon](https://github.com/Shopify/horizon)

Este proyecto parte del Skeleton. Se conserva su `LICENSE.md` dentro de `theme/`
porque la licencia MIT lo exige.

---

## Landings reutilizables sin escribir código

Tres mecanismos, los tres verificados:

1. **Plantillas alternas por producto.** `product.landing.json` se asigna a cada
   producto desde su ficha en el admin.
2. **El merchant crea plantillas nuevas desde el editor de themes**, sin código:
   menú de página → *Crear plantilla* → nombre → plantilla base. Límite de
   **1.000 plantillas** en total. La plantilla nueva hereda las secciones de la
   base y luego se modifica. Asignarla a un producto se hace desde el admin, no
   desde el editor.
   → [plantillas](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates)

   *Este punto era el pilar sin verificar del plan anterior. Ahora está
   confirmado en la documentación oficial.*
3. **Theme blocks reutilizables** entre secciones.

---

## Metacampos, metaobjetos y orígenes dinámicos

- Los **orígenes dinámicos** permiten al merchant conectar un ajuste a un
  metacampo desde el editor, sin tocar Liquid. Tipos admitidos: `article`,
  `collection`, `collection_list`, `color`, `image_picker`, `page`, `product`,
  `product_list`, `richtext`, `inline_richtext`, `text`, `url`, `video`,
  `metaobject`, `metaobject_list`.
  **Límites: 100 orígenes dinámicos por plantilla JSON o section group, y 50 por
  ajuste o sección estática.** No están disponibles para los ajustes generales
  del theme.
  → [dynamic sources](https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources)
- Los ajustes `metaobject` y `metaobject_list` admiten **un solo
  `metaobject_type`** y `metaobject_list` acepta `limit` con **máximo 50**. Las
  definiciones personalizadas deben existir ya en la tienda o el ajuste muestra
  un error. En themes del Theme Store solo se permiten definiciones estándar
  (este theme es a medida, así que puede usar las personalizadas).
  → [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)
- Los namespaces `app--` y `shopify--` están reservados.
  → [ownership](https://shopify.dev/docs/apps/build/custom-data/ownership)

**Principio que se sigue en el theme:** no se leen metacampos con namespace y
clave escritos en el código. El theme expone ajustes; el merchant los conecta.
Solo el contenido repetible usa `metaobject_list`.

---

## Opiniones

- Existen los metacampos estándar de producto **`reviews.rating`** (tipo
  `rating`) y **`reviews.rating_count`** (tipo `number_integer`). Los escriben
  las apps de valoraciones y los themes deben leerlos de ahí.
  → [definiciones estándar](https://shopify.dev/docs/apps/build/metafields/list-of-standard-definitions)
- **Corrección importante respecto al plan anterior:** el metaobjeto estándar
  `product_review` es una **definición restringida**, disponible solo para apps
  de reseñas aprobadas tras solicitud y revisión. **No está disponible para
  themes.**
  → [standard review metaobject](https://shopify.dev/docs/apps/build/metaobjects/standard-review-metaobject)

  Por eso las opiniones individuales de este theme usan un metaobjeto
  **personalizado**, `landing_review`. Ver [metaobjects.md](metaobjects.md).

---

## Checkout

- `checkout.liquid` está retirado en Información, Envío y Pago, y se retiró en
  las páginas de agradecimiento y estado del pedido el **28 de agosto de 2025**
  para tiendas Plus. Los script tags en esas páginas: misma fecha para Plus,
  **26 de agosto de 2026** para el resto.
  → [checkout.liquid](https://shopify.dev/docs/storefronts/themes/architecture/layouts/checkout-liquid)
- La arquitectura vigente es **Checkout Extensibility / Checkout UI extensions**.
  → [Checkout UI extensions](https://shopify.dev/docs/api/checkout-ui-extensions/latest)

**El theme no toca el checkout.** Personalizarlo es una app, y editarlo suele
requerir Shopify Plus.

---

## Seguimiento y analítica

La arquitectura actual es la **Web Pixels API / Customer events**, con 15 eventos
estándar entre ellos `page_viewed`, `product_viewed`, `product_added_to_cart`,
`checkout_started` y `checkout_completed`.
→ [Web Pixels API](https://shopify.dev/docs/api/web-pixels-api) ·
[eventos estándar](https://shopify.dev/docs/api/web-pixels-api/standard-events)

**El theme no incrusta ningún pixel.** Ver [docs/pixels/](pixels/).

---

## Rendimiento

- Nunca aplicar `loading="lazy"` a la imagen LCP. Carga eager en las secciones
  visibles al entrar, `lazy` de la cuarta en adelante, usando `section.index` y
  `forloop.index`. Marcar la candidata a LCP con `fetchpriority="high"`.
  Proporcionar siempre un `sizes` explícito.
  → [never lazy-load LCP](https://shopify.dev/docs/storefronts/themes/best-practices/performance/never-lazy-load-lcp-image)
- `image_tag` genera el `srcset` y añade `width` y `height` automáticamente, que
  es lo que evita el salto de maquetación.
  → [image_tag](https://shopify.dev/docs/api/liquid/filters/image_tag)
- El filtro `structured_data` solo admite `product` y `article`, y **no emite
  valoraciones ni reseñas**. Por eso el JSON-LD de este theme se escribe a mano.
  → [structured_data](https://shopify.dev/docs/api/liquid/filters/structured_data)

---

## Herramientas

`shopify theme check` **funciona sin conexión a una tienda**. Comprobado
ejecutándolo en este repositorio: 85 archivos inspeccionados, 0 incidencias, sin
sesión iniciada. → [Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check)
