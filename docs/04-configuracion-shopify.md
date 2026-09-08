# Configuración en Shopify

Orden recomendado. Cada paso da por hecho el anterior.

## 1. Subir el theme

```bash
npm install
```

```bash
npx shopify theme push --unpublished --path theme
```

La primera vez te pedirá iniciar sesión y elegir tienda. Se sube **sin
publicar**, así que no afecta a lo que ven los clientes.

Para trabajar con recarga en vivo:

```bash
npx shopify theme dev --path theme
```

## 2. Ajustes del theme

*Editor de themes → Configuración*.

| Grupo | Qué configurar |
|---|---|
| **Tipografía** | Fuente principal y de títulos. La escala tipográfica multiplica el tamaño de cada nivel |
| **Diseño** | El ancho por defecto es «Landing (estrecho)», que es el que conviene a una página de venta |
| **Colores** | Fondo, texto, texto secundario, superficie, borde, acento, botón y color de oferta. **Comprueba el contraste del texto secundario sobre el fondo** |
| **Conversión** | Número de WhatsApp en formato internacional sin signos (`573001234567`), mensaje predefinido, mensaje de envío, política de envíos y política de garantía |
| **Medios de pago** | Marca solo los que tengas activos en Wompi |
| **SEO** | Deja los datos estructurados activos salvo que una app de SEO ya los emita |

Los textos de envío y garantía vienen con contenido de demostración. **Sustitúyelos
antes de publicar.** Describen promesas al cliente.

## 3. Pasarela de pago

Ver [03-pagos-colombia.md](03-pagos-colombia.md). Resumen: instalar Wompi,
introducir las llaves de producción, elegir los medios y activar.

Prueba una compra completa en modo sandbox antes de salir.

## 4. Metacampos y metaobjetos

- [metafields.md](metafields.md) — los metacampos opcionales del producto.
- [metaobjects.md](metaobjects.md) — `landing_review`, `landing_faq` y
  `landing_shipping_row`.

**Créalos antes de usar la fuente de metaobjeto en la sección de opiniones.** Un
ajuste `metaobject_list` que apunta a una definición inexistente muestra un
error en el editor. Mientras tanto, la sección funciona con bloques.

## 5. App de opiniones

Instala Judge.me, Loox o la que prefieras, y comprueba que escribe los
metacampos estándar `reviews.rating` y `reviews.rating_count`. Solo entonces
aparecerán las estrellas del agregado.

Si la app trae su propio bloque, puedes insertarlo dentro de la sección de
opiniones: acepta bloques de app.

## 6. Seguimiento

Ver [pixels/](pixels/). Resumen:

1. Meta y TikTok van por sus **canales oficiales**, no por el theme.
2. Todo lo demás va como **Custom Pixel** en *Configuración → Eventos de
   cliente*.
3. **No pegues ningún pixel en el theme.** Es lo único que garantiza que no se
   dupliquen eventos.

## 7. Descuentos automáticos

Solo si vas a usar el modo `quantity` de la oferta. En *Descuentos*, crea uno de
tipo *Cantidad de productos* con una cantidad mínima, y luego declara el mismo
porcentaje en cada nivel de la sección de oferta.

Si usas el modo `variants`, que es el recomendado, **no configures nada aquí**.

## 8. Publicar

Cuando el checklist de [06-checklist-lanzamiento.md](06-checklist-lanzamiento.md)
esté completo.
