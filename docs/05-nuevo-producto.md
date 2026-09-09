# Lanzar un producto nuevo

**Sin escribir código.** Esto es el sistema funcionando.

---

## 1. Crear el producto

_Productos → Añadir producto_.

- Título, descripción, imágenes y vídeo. La primera imagen es la que se ve
  primero en la portada de la landing, así que elígela pensando en eso.
- Precio y, si hay oferta, precio de referencia.
- Inventario y SKU.

### Si vas a vender paquetes (recomendado)

Crea una opción llamada _Paquete_ con los valores que quieras:

| Variante   | Precio                   | Precio de referencia |
| ---------- | ------------------------ | -------------------- |
| 1 unidad   | el normal                | —                    |
| 2 unidades | el de dos con descuento  | el doble del normal  |
| 3 unidades | el de tres con descuento | el triple del normal |

Así el ahorro se calcula solo y **la página no puede mostrar un precio distinto
al del checkout**, porque leen el mismo dato.

> Cada variante hay que **mapearla a N unidades en Dropi a mano**. Ver
> [02-dropi.md](02-dropi.md).

---

## 2. Asignar la plantilla

En la ficha del producto, panel derecho, _Publicación en canales de venta_ →
**Plantilla de tema** → `product.landing`.

### Si quieres una landing distinta para este producto

En el editor de themes:

1. Menú desplegable de página, arriba → elegir _Producto_.
2. **Crear plantilla**.
3. Nombre, por ejemplo `product.serum`.
4. Basarla en `product.landing`.
5. Crear.

La plantilla nueva hereda las secciones y a partir de ahí es independiente.
Luego se asigna al producto desde el admin, como arriba. El límite de la tienda
son 1.000 plantillas.

---

## 3. Escribir la landing

Editor de themes, con el producto abierto. Las secciones se llaman `LP · …` para
que se agrupen juntas en la lista.

Recorrido por defecto:

| #   | Sección                   | Qué escribir                                                           |
| --- | ------------------------- | ---------------------------------------------------------------------- |
| 1   | LP · Portada              | Subtítulo con la promesa concreta. El título es el nombre del producto |
| 2   | LP · Barra de confianza   | Cuatro señales cortas                                                  |
| 3   | LP · Problema             | Tres o cuatro dolores en las palabras del cliente                      |
| 4   | LP · Solución             | Cómo funciona, con una imagen o vídeo                                  |
| 5   | LP · Beneficios           | Tres beneficios comprobables                                           |
| 6   | LP · Demostración         | El producto en uso                                                     |
| 7   | LP · Cómo funciona        | Los pasos de la compra a la entrega                                    |
| 8   | LP · Opiniones            | **Sustituye las de demostración por reales**                           |
| 9   | LP · Fotos de clientes    | Solo con permiso de quien las publicó                                  |
| 10  | LP · Oferta               | Modo `variants` si creaste variantes por paquete                       |
| 11  | LP · Envíos               | Plazos que la transportadora cumple de verdad                          |
| 12  | LP · Garantía             | La que ofreces de verdad                                               |
| 13  | LP · Preguntas frecuentes | Las que te llegan por WhatsApp                                         |
| 14  | LP · Llamada final        | El último empujón                                                      |
| 15  | LP · Botón fijo móvil     | Déjalo activo                                                          |

Puedes quitar, reordenar y duplicar secciones a voluntad. El tope es 25 por
plantilla y 50 bloques por sección.

### Conectar un texto a un metacampo

Si quieres que un texto viaje con el producto en vez de vivir en el theme:

1. Pulsa el icono de base de datos que aparece junto al campo.
2. Elige el metacampo.

Así el copy sobrevive a un cambio de theme. Ver [metafields.md](metafields.md).

---

## 4. Antes de publicar

- [ ] Ninguna sección dice «texto de demostración».
- [ ] **Ninguna opinión tiene marcada la casilla de demostración**, y todas son
      reales.
- [ ] Los plazos de envío son los que cumple la transportadora.
- [ ] La garantía es la que puedes sostener.
- [ ] Los medios de pago marcados son los que aceptas.
- [ ] Has hecho una compra de prueba y ha llegado al checkout.

El checklist completo está en
[06-checklist-lanzamiento.md](06-checklist-lanzamiento.md).
