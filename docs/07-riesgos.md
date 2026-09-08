# Riesgos y estado de cada afirmación

## Verificado en documentación oficial

Leído en la fuente que se cita en [00-investigacion.md](00-investigacion.md):

- Arquitectura de themes, secciones, theme blocks, plantillas JSON, section
  groups y sus límites (25 secciones, 50 bloques, 8 niveles de anidamiento).
- El Skeleton Theme es el punto de partida recomendado, con licencia MIT.
- Crear plantillas alternas desde el editor sin código, con tope de 1.000.
- Orígenes dinámicos y sus límites (100 por plantilla, 50 por ajuste).
- Ajustes `metaobject` y `metaobject_list`, con máximo de 50 entradas.
- Metacampos estándar `reviews.rating` y `reviews.rating_count`.
- El metaobjeto estándar `product_review` está **restringido a apps aprobadas**.
- Retirada de `checkout.liquid` y Checkout Extensibility como arquitectura
  vigente.
- Web Pixels API y sus eventos estándar.
- Colombia fuera de Shopify Payments.
- Wompi tiene plugin oficial de Shopify, y sus medios de pago en Colombia.
- Reglas de LCP, `sizes`, `loading` y `fetchpriority`.
- `theme check` funciona sin conexión a una tienda.

## Verificado ejecutándolo

- `theme check`: 85 archivos, 0 incidencias.
- `prettier --check`: sin diferencias.
- La plantilla respeta los límites de la plataforma.

## Sin verificar — pendiente de una tienda real

Nada de esto se ha podido ejecutar en esta sesión, y **no se afirma que
funcione**:

| Punto | Cómo comprobarlo |
|---|---|
| Que el theme suba e instale sin errores | `theme push` |
| Que cada sección se añada, reordene y elimine en el editor | A mano |
| Que duplicar `product.landing` funcione | A mano |
| Que el selector de origen dinámico conecte un ajuste a un metacampo | A mano |
| Que el `metaobject_list` encuentre `landing_review` | Tras crear la definición |
| Que la compra llegue al checkout con la variante y cantidad correctas | Pedido de prueba |
| Que la barra fija se oculte cuando el botón está en pantalla | A mano en móvil |
| Métricas reales de LCP, CLS e INP | Lighthouse |

## Riesgos abiertos

### Dropi

**Que Dropify devuelva el número de guía a Shopify no está confirmado.** Su ficha
oficial no lo afirma; la de Dropify PRO, que es de un tercero con solo cuatro
opiniones, sí. Es la pieza más importante del flujo y solo se resuelve con un
pedido de prueba real.

**La valoración de Dropify es 3,2 sobre 5 con un 31 % de reseñas de una
estrella.** Conviene leer las negativas antes de construir el negocio encima.

Nada más de Dropi está verificado: ni sincronización de inventario, ni
devoluciones, ni costes. No se ha implementado nada contra su API, y la única
«documentación» localizable son PDF de terceros que no se han usado.

### Vender sin contraentrega

Decisión tomada. El canal Dropi es mayoritariamente contraentrega, así que es
previsible que la conversión sea menor que la de un competidor que la ofrece. A
cambio desaparecen las devoluciones por rechazo en puerta.

El theme está preparado para añadirla después sin reescribir secciones.

### Desfase de precio en el modo `quantity`

Shopify aplica el descuento automático en el checkout, no en la página. Mostrar
el total con descuento obliga a repetir el porcentaje en un ajuste del theme. Si
los dos números dejan de coincidir, el cliente ve un precio y se le cobra otro.

Mitigación implementada: el nivel siempre muestra el total sin descuento tachado
y dice con palabras que el descuento se aplica en el checkout. **El modo
`variants`, que es el de por defecto, no tiene este problema.**

### Metaobjeto inexistente

Un ajuste `metaobject_list` que apunta a una definición que no existe en la
tienda muestra un error en el editor. Hay que crear `landing_review` antes de
usar esa fuente. La sección funciona con bloques mientras tanto.

### Duplicación de eventos

Si se pega un pixel en el theme además de conectar el canal oficial, los eventos
se cuentan dos veces y las campañas se optimizan sobre datos falsos. Por eso el
theme no carga ningún pixel. **La deduplicación por `event_id` entre el pixel de
navegador y la API de conversiones hay que confirmarla en los paneles de Meta y
TikTok.**

### Dos bloques de datos estructurados

Si una app de SEO emite su propio JSON-LD de producto, habrá dos en la página y
Search Console avisará. Por eso el del theme se puede desactivar desde los
ajustes.

## Requiere configuración

Alta en Wompi · definiciones de metacampos y metaobjetos · Custom Pixel ·
descuentos automáticos (solo en modo `quantity`) · mapeo de cada variante de
paquete a N unidades en Dropi.

## Requiere servicio externo

App de opiniones · canal de Meta · canal de TikTok · cuenta de Dropi y su app ·
edición del checkout, que necesita una app con Checkout UI extensions y en
muchos casos Shopify Plus.

## Comisiones

**No se cita ninguna cifra en toda esta documentación, a propósito.** Los enlaces
a los tarifarios oficiales están en
[03-pagos-colombia.md](03-pagos-colombia.md).
