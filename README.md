# Sistema de landings de producto para Shopify — Colombia

Theme personalizado de Shopify que funciona como sistema reutilizable de landings
de producto para el mercado colombiano.

El objetivo no es una landing. Es que este flujo se haga **desde el admin, sin
escribir código**:

```
producto nuevo → metacampos → elegir secciones → publicar landing
```

## Qué hay dentro

- **15 secciones** de landing (`LP · …`), todas con presets, así que se añaden,
  reordenan y eliminan desde el editor de themes.
- **15 theme blocks** en /blocks, trece propios y dos que vienen del Skeleton,
  reutilizables entre secciones.
- **17 snippets**, de los que dos concentran la lógica delicada:
  `responsive-image` decide todo lo relativo a LCP y `media` resuelve todos los
  tipos de medio.
- Un solo `landing.js`, **sin dependencias**. Las preguntas frecuentes usan
  `<details>` nativo, así que no cargan script.
- Español como idioma principal, inglés como secundario.

Construido sobre el [Skeleton Theme](https://github.com/Shopify/skeleton-theme)
de Shopify (MIT), que es el punto de partida que Shopify recomienda hoy. Su
`LICENSE.md` se conserva en `theme/`.

## Empezar

```bash
npm install
```

```bash
npx shopify theme push --unpublished --path theme
```

Luego sigue [docs/04-configuracion-shopify.md](docs/04-configuracion-shopify.md).

### Comprobaciones

```bash
npm run check
```

```bash
npm run format
```

`theme check` funciona sin conexión a una tienda. Estado actual: **85 archivos,
0 incidencias**.

## Documentación

| | |
|---|---|
| [00-investigacion.md](docs/00-investigacion.md) | Qué dice la documentación oficial, con enlaces |
| [01-arquitectura.md](docs/01-arquitectura.md) | Cómo está montado y por qué |
| [02-dropi.md](docs/02-dropi.md) | Las dos apps, qué está confirmado y qué no |
| [03-pagos-colombia.md](docs/03-pagos-colombia.md) | Wompi, medios de pago, y por qué no hay contraentrega |
| [04-configuracion-shopify.md](docs/04-configuracion-shopify.md) | Puesta en marcha paso a paso |
| [05-nuevo-producto.md](docs/05-nuevo-producto.md) | **Lanzar un producto nuevo sin código** |
| [06-checklist-lanzamiento.md](docs/06-checklist-lanzamiento.md) | Lo que hay que comprobar antes de publicar |
| [07-riesgos.md](docs/07-riesgos.md) | Qué está verificado y qué no |
| [metafields.md](docs/metafields.md) · [metaobjects.md](docs/metaobjects.md) | Datos personalizados |
| [pixels/](docs/pixels/) | Seguimiento, y por qué el theme no carga ningún pixel |

## Tres decisiones que conviene conocer

**Los precios nunca se escriben en el código.** En el modo de oferta por
variantes, cada cifra sale de Shopify, así que la página y el checkout no pueden
discrepar. El modo por cantidad existe, pero obliga a repetir el descuento en un
ajuste y por eso avisa en pantalla de que se aplica en el checkout.

**Las estrellas solo aparecen si hay valoración real.** Se leen de los metacampos
estándar `reviews.rating` y `reviews.rating_count`, que escribe la app de
opiniones. El theme nunca calcula una media a partir de contenido que escribió el
vendedor. Las opiniones de demostración muestran una etiqueta visible de
contenido ficticio y quedan fuera de los datos estructurados.

**El theme no carga ningún pixel.** Meta y TikTok van por sus canales oficiales y
el resto por un Custom Pixel en el admin. Es la única forma de que los eventos no
se cuenten dos veces.

## Estado

Verificado ejecutándolo: `theme check` y `prettier`, y los límites de la
plataforma en la plantilla.

**Sin verificar:** todo lo que necesita una tienda real. Subida, editor de
themes, compra de prueba, métricas de rendimiento y —lo más importante— si Dropi
devuelve el número de guía a Shopify. El detalle está en
[07-riesgos.md](docs/07-riesgos.md) y la lista de comprobación en
[06-checklist-lanzamiento.md](docs/06-checklist-lanzamiento.md).
