# Metacampos

## La regla

**El theme no lee ningún metacampo con namespace y clave escritos en el código.**
Expone ajustes; tú los conectas a metacampos desde el editor con el selector de
origen dinámico.

Consecuencia práctica: **todos los metacampos de esta página son opcionales**. Si
no creas ninguno, el theme funciona igual y el copy vive en los ajustes de
sección. Los metacampos sirven para que el texto **viaje con el producto** y
sobreviva a un cambio de theme.

La única excepción son los dos metacampos estándar de valoración, que sí se leen
por su nombre porque son un estándar de la plataforma.

---

## Los dos que sí se leen por nombre

Los escribe tu app de opiniones. Tú no los creas a mano.

| Metacampo              | Tipo       | Para qué               |
| ---------------------- | ---------- | ---------------------- |
| `reviews.rating`       | Valoración | Media de las opiniones |
| `reviews.rating_count` | Entero     | Número de opiniones    |

→ [definiciones estándar de Shopify](https://shopify.dev/docs/apps/build/metafields/list-of-standard-definitions)

**Si el producto no los tiene, el theme no muestra ninguna estrella.** No hay
valor por defecto ni estimación. Una valoración inventada es peor que ninguna.

---

## Los opcionales que puedes crear

_Configuración → Datos personalizados → Productos → Añadir definición._

Namespace `custom` (`app--` y `shopify--` están reservados).

| Clave                  | Tipo                                                       | Se conecta a                |
| ---------------------- | ---------------------------------------------------------- | --------------------------- |
| `custom.hero_subtitle` | Una línea de texto                                         | Subtítulo de LP · Portada   |
| `custom.problem_intro` | Texto enriquecido                                          | Subtítulo de LP · Problema  |
| `custom.solution_body` | Texto enriquecido                                          | Texto de LP · Solución      |
| `custom.guarantee`     | Texto enriquecido                                          | Subtítulo de LP · Garantía  |
| `custom.hero_video`    | Referencia a archivo                                       | Vídeo de un bloque de medio |
| `custom.reviews`       | Lista de referencias a metaobjeto → `landing_review`       | Opiniones de LP · Opiniones |
| `custom.faq`           | Lista de referencias a metaobjeto → `landing_faq`          | Preguntas                   |
| `custom.shipping_rows` | Lista de referencias a metaobjeto → `landing_shipping_row` | Filas de envío              |

En todas, **activa el acceso desde el escaparate**. Sin eso el theme no las ve.

---

## Cómo conectar un ajuste a un metacampo

1. En el editor de themes, abre la sección.
2. Junto al campo de texto aparece un icono de base de datos.
3. Púlsalo y elige el metacampo.

El campo pasa a mostrar el valor del producto. Cambias de producto y el texto
cambia solo.

### Qué se puede conectar

Los tipos de ajuste que admiten orígenes dinámicos son `article`, `collection`,
`collection_list`, `color`, `image_picker`, `page`, `product`, `product_list`,
`richtext`, `inline_richtext`, `text`, `url`, `video`, `metaobject` y
`metaobject_list`. Cada tipo solo acepta metacampos compatibles: un ajuste de
color solo se conecta a un metacampo de color.

**Los ajustes generales del theme no admiten orígenes dinámicos.** Por eso la
política de envíos y la de garantía viven ahí: son de toda la tienda, no de un
producto.

### Límites

- **100 orígenes dinámicos** por plantilla JSON o section group.
- **50** por ajuste o sección estática.

→ [documentación](https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources)

---

## Cuándo usar qué

| Situación                                                         | Dónde ponerlo                                 |
| ----------------------------------------------------------------- | --------------------------------------------- |
| Copy de un solo producto que debe sobrevivir a un cambio de theme | Metacampo `custom.*`                          |
| Copy de un solo producto que no te importa perder                 | Ajuste de sección, sin conectar               |
| Contenido repetible reutilizable entre productos                  | Metaobjeto ([metaobjects.md](metaobjects.md)) |
| Algo igual en toda la tienda                                      | Ajuste del theme                              |
| Precio, nombre, imágenes, inventario                              | El producto. **Nunca lo dupliques**           |
