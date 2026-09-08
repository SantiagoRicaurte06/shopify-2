# Arquitectura

## La idea

El objetivo no es una landing. Es que este flujo se haga desde el admin, sin
escribir código:

```
producto nuevo → metacampos → elegir secciones → publicar landing
```

Para eso, dos unidades distintas:

- **La sección es la unidad de composición.** Cada módulo narrativo es una
  sección con `presets`, así que el merchant la añade, reordena y elimina desde
  el editor. Son quince, frente al tope de veinticinco por plantilla.
- **El theme block es la unidad de reutilización.** `trust-item` lo comparten la
  portada, la barra de confianza y la llamada final. `media-item` lo comparten
  solución, demostración y contenido de clientes. Un archivo, tres usos.

## Regla que sostiene todo lo demás

> El theme **no lee metacampos con namespace y clave escritos en el código.**
> Expone ajustes; el merchant los conecta a metacampos con orígenes dinámicos.

Consecuencia: cambiar el modelo de datos no obliga a reescribir Liquid. La única
excepción es el contenido repetible (opiniones, preguntas, filas de envío), que
usa `metaobject_list` porque una lista no cabe en un ajuste de texto.

## Dónde vive cada dato

| Dato | Dónde | Por qué |
|---|---|---|
| Nombre, precio, precio de referencia, imágenes, vídeo, inventario | Producto y variante | Es dato nativo. Nunca se duplica |
| Paquetes x1/x2/x3 | **Variantes** (modo por defecto) | El precio mostrado y el del checkout son el mismo dato |
| Valoración media y número de opiniones | Metacampos estándar `reviews.rating` y `reviews.rating_count` | Los escribe la app de opiniones. Interoperable |
| Titulares y copy | Ajustes de sección o bloque, conectables a metacampos | El merchant edita en contexto; el metacampo es opcional |
| Opiniones, preguntas, filas de envío | Metaobjetos + `metaobject_list` | Biblioteca central reutilizable entre productos |
| Política de envíos, garantía, WhatsApp, medios de pago, JSON-LD | Ajustes del theme | Igual en toda la tienda. Se cambia en un sitio |

## Los dos snippets que concentran el riesgo

Ninguna sección repite esta lógica.

**`snippets/responsive-image.liquid`** es el único sitio que decide `sizes`,
`loading` y `fetchpriority`. Las secciones le pasan su posición en la página
(`section.index`) y si la imagen es la candidata a LCP. Las reglas de
rendimiento viven en un archivo en lugar de discutirse en quince.

**`snippets/media.liquid`** es el único sitio que ramifica por `media_type`.
Añadir un tipo de medio nuevo es una edición, no quince.

Cuando `theme check` avisó de que dos archivos compartían clases CSS, la
respuesta fue eliminar la duplicación, no silenciar el aviso:

- las estrellas se unificaron en `stars.liquid`, que ahora acepta una valoración
  explícita además de leer los metacampos;
- la tarjeta de opinión se extrajo a `review-card.liquid`, compartida por el
  bloque y por la ruta de metaobjeto;
- los estilos que comparten varios archivos (niveles de oferta, botones de
  carrusel, iframe de vídeo externo) pasaron a `critical.css`.

## Las tres capas de las opiniones

1. **Agregado** — solo de `reviews.rating` y `reviews.rating_count`. Si el
   producto no los tiene, **no se pinta ninguna estrella**. El theme nunca
   calcula una media a partir de contenido que escribió el merchant, porque eso
   no es una medición.
2. **Individuales** — bloques `review-item` o entradas del metaobjeto
   `landing_review`. Ambas rutas renderizan el mismo `review-card`.
3. **App** — la sección acepta bloques `@app`, así que Judge.me o Loox entran sin
   tocar código.

Las entradas marcadas como demostración muestran una etiqueta visible de
contenido ficticio y **quedan fuera del JSON-LD**. El marcado de resultados
enriquecidos solo se emite desde valoraciones reales.

## Los dos modos de la oferta

**`variants` (por defecto).** Cada nivel es una variante real. Todas las cifras
salen de Shopify. La página y el checkout no pueden discrepar porque leen el
mismo dato. Contrapartida: hay que mapear cada variante a N unidades en Dropi
([02-dropi.md](02-dropi.md)).

**`quantity`.** Un solo SKU comprado N veces, con descuento automático creado en
el admin. Shopify aplica ese descuento **en el checkout**, no en la página. Para
mostrar el total con descuento hay que repetir el porcentaje en un ajuste, y un
número en dos sitios se desincroniza. Por eso el bloque `offer-tier`:

- muestra siempre el total sin descuento tachado, y
- cuando hay descuento declarado, dice con palabras que se aplica en el
  checkout. Esa línea no es un ajuste y no se puede quitar.

En ambos modos los controles de selección viven **fuera** del `<form>` y se
enlazan con el atributo `form` de HTML, así que todo se envía correctamente sin
JavaScript. El script solo refleja la elección en la barra fija.

## Lo que el theme deliberadamente no hace

- **No toca el checkout.** `checkout.liquid` está retirado; personalizarlo es una
  app con Checkout UI extensions y suele requerir Plus.
- **No incrusta pixels.** Van por los canales oficiales y por un Custom Pixel en
  el admin. Al no cargarse desde el theme, es imposible duplicar eventos.
- **No implementa nada contra la API de Dropi.** Dropi actúa después del pedido.
- **No emite datos estructurados de FAQPage.** Google restringió esos resultados
  enriquecidos, y marcar preguntas que el propio vendedor escribió invita a una
  acción manual a cambio de poco.
- **No muestra logotipos de medios de pago.** Las marcas de Visa, PSE o Nequi son
  marcas registradas que este theme no puede redistribuir. Se muestran etiquetas
  de texto. El pie de página sí usa `payment_type_svg_tag`, que es el mecanismo
  que Shopify proporciona para eso.

## Rendimiento

- **CSS**: `critical.css` en el `<head>` más un `{% stylesheet %}` por sección y
  bloque. Shopify los agrupa y hace subsetting por página. Sin frameworks.
- **JS**: un solo `landing.js` como módulo diferido, sin dependencias. Cinco
  elementos personalizados: revelado al hacer scroll, barra fija, carrusel,
  selector de paquete y contador de cantidad. Las preguntas frecuentes usan
  `<details>` nativo, así que esa sección no carga script.
- **LCP**: la primera imagen de la portada va con `loading="eager"` y
  `fetchpriority="high"`. Nunca `lazy`.
- **CLS**: `image_tag` escribe `width` y `height` en toda imagen.
- **Vídeo**: póster siempre, `preload="none"`, nunca autoplay con sonido.

## Accesibilidad

Un solo `<h1>` (el nombre del producto), jerarquía correcta debajo, `<main>` con
enlace de salto, foco visible, objetivos táctiles de 44 px, `<fieldset>` y
`<legend>` en el selector de paquetes, menú móvil con `<details>` (widget de
revelación real, con teclado), y `prefers-reduced-motion` respetado en todas las
animaciones.
