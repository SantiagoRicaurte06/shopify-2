# Metaobjetos

Los metaobjetos guardan el contenido **repetible y reutilizable entre
productos**: una biblioteca de opiniones, preguntas y filas de envío que se usa
en varias landings sin volver a escribirla.

Son **opcionales**. Las secciones funcionan con bloques mientras no existan.

> **Créalos antes de elegir la fuente «Entradas de metaobjeto» en la sección de
> opiniones.** Un ajuste `metaobject_list` que apunta a una definición
> inexistente muestra un error en el editor.

## Por qué una definición propia y no la estándar

Shopify tiene un metaobjeto estándar `product_review`, pero es una **definición
restringida**: solo pueden usarla las apps de reseñas aprobadas, tras solicitud
y revisión. No está disponible para themes.
→ [documentación](https://shopify.dev/docs/apps/build/metaobjects/standard-review-metaobject)

Por eso aquí se define `landing_review` como metaobjeto personalizado. Este
theme es a medida, así que puede usar definiciones propias (los del Theme Store
no).

## Cómo crearlos

*Configuración → Datos personalizados → Metaobjetos → Añadir definición.*

En cada definición, **activa el acceso desde el escaparate** (*Storefronts*). Sin
eso el theme no puede leer las entradas.

---

## `landing_review`

Opiniones de clientes.

| Campo | Tipo | Obligatorio | Nota |
|---|---|---|---|
| `body` | Texto multilínea | Sí | La opinión |
| `rating` | Entero | Sí | De 0 a 5 |
| `author` | Una línea de texto | No | Nombre |
| `location` | Una línea de texto | No | Ciudad o región |
| `image` | Referencia a archivo | No | Foto del autor |
| `is_demo` | Verdadero o falso | Sí | **Marca el contenido ficticio** |

`is_demo` no es decorativo. Cuando está activo, la tarjeta muestra una etiqueta
visible que dice que es un testimonio de demostración, y la entrada queda fuera
de los datos estructurados. Déjalo activo en cualquier entrada de relleno.

> Máximo **50 entradas** por ajuste `metaobject_list`. La sección además tiene su
> propio límite configurable.

---

## `landing_faq`

Preguntas frecuentes reutilizables.

| Campo | Tipo | Obligatorio |
|---|---|---|
| `question` | Una línea de texto | Sí |
| `answer` | Texto enriquecido | Sí |

---

## `landing_shipping_row`

Filas de la tabla de envíos.

| Campo | Tipo | Obligatorio |
|---|---|---|
| `zone` | Una línea de texto | Sí |
| `time` | Una línea de texto | Sí |
| `note` | Una línea de texto | No |

Los plazos son una promesa al cliente. Escribe solo lo que la transportadora
cumple.

---

## Cómo se usan

En la sección de opiniones: cambia *Origen de las opiniones* a **Entradas de
metaobjeto** y elige las entradas en el selector.

Las secciones de preguntas y envíos usan bloques por ahora. Si quieres
alimentarlas desde metaobjetos, la vía es un metacampo de producto de tipo
`list.metaobject_reference` conectado por origen dinámico. Ver
[metafields.md](metafields.md).
