# Checklist de lanzamiento

Lo que está marcado como **hecho** se ha ejecutado en este repositorio. Lo demás
requiere una tienda y hay que hacerlo a mano.

---

## Verificación automática — hecha

- [x] `npx shopify theme check --path theme` → 85 archivos, **0 incidencias**.
      Funciona sin conexión a una tienda.
- [x] `npx prettier --check` → sin diferencias.
- [x] Todos los JSON parsean.
- [x] La plantilla usa 15 secciones de las 25 permitidas, y ninguna sección pasa
      de 50 bloques.

Para repetirlas:

```bash
npm run check
```

```bash
npm run format:check
```

---

## Subida e instalación

- [ ] `npx shopify theme push --unpublished --path theme` termina sin errores.
- [ ] El theme aparece en la lista de temas del admin.
- [ ] La vista previa carga sin errores en la consola del navegador.

---

## Editor de themes

- [ ] Cada una de las quince secciones `LP · …` **se puede añadir** desde el
      botón de añadir sección.
- [ ] Cada sección **se puede reordenar**.
- [ ] Cada sección **se puede eliminar**.
- [ ] Los bloques se pueden añadir, reordenar y eliminar dentro de su sección.
- [ ] **Duplicar `product.landing` como plantilla nueva** desde el editor
      funciona, y la copia es independiente.
- [ ] **Conectar un ajuste a un metacampo** con el selector de origen dinámico
      funciona.
- [ ] Si creaste el metaobjeto `landing_review`, el selector de la sección de
      opiniones lo encuentra.

---

## La tienda funcionando

- [ ] La galería de la portada pasa imágenes y el vídeo reproduce con póster.
- [ ] El selector de variantes cambia el precio.
- [ ] **Añadir al carrito funciona y llega al checkout.**
- [ ] En el modo `variants`, elegir un paquete y comprar añade **esa** variante.
- [ ] En el modo `quantity`, comprar dos unidades añade **dos**, y el descuento
      del checkout coincide con el que declaraste.
- [ ] La barra fija móvil aparece al bajar y **desaparece cuando el botón de
      compra está en pantalla**.
- [ ] El enlace de WhatsApp abre la conversación con el mensaje correcto.
- [ ] Las preguntas frecuentes abren y cierran **con JavaScript desactivado**.
- [ ] Con JavaScript desactivado, el formulario de compra sigue enviando la
      variante y la cantidad correctas.

---

## Contenido — lo que impide publicar

- [ ] **Ninguna opinión tiene la casilla de demostración marcada.** Si alguna la
      tiene, la página muestra «testimonio demo — contenido ficticio» a la vista
      de todos.
- [ ] Ningún texto dice «texto de demostración».
- [ ] Los plazos de envío son los que cumple la transportadora.
- [ ] La garantía es la que puedes sostener.
- [ ] Los medios de pago marcados son exactamente los que aceptas.
- [ ] Las fotos de clientes tienen permiso de quien las publicó.

---

## Rendimiento y accesibilidad

- [ ] Lighthouse en móvil: revisar LCP, CLS e INP.
- [ ] La imagen de la portada **no** carga con `loading="lazy"` (mírala en el
      inspector).
- [ ] Probado en 320, 375, 390, 430, 768, 1024 px y escritorio.
- [ ] El texto secundario mantiene contraste AA sobre el fondo.
- [ ] Se puede recorrer toda la página con el teclado y el foco siempre se ve.
- [ ] El enlace de salto al contenido funciona.

---

## SEO

- [ ] Los datos estructurados del producto validan.
- [ ] **No hay dos bloques `Product` en la misma página.** Si una app de SEO ya
      emite el suyo, desactiva el del theme en los ajustes.
- [ ] Las estrellas del agregado solo aparecen si el producto tiene
      `reviews.rating`. Si no hay valoración real, no debe verse ninguna.

---

## Seguimiento

- [ ] Meta y TikTok conectados por sus canales oficiales.
- [ ] Custom Pixel pegado en *Configuración → Eventos de cliente*.
- [ ] **Ningún pixel pegado en el theme.**
- [ ] Comprobar en los paneles de Meta y TikTok que los eventos **no llegan
      duplicados**.

---

## Dropi — la prueba que no se puede saltar

- [ ] Pedido de prueba → **aparece en Dropi**.
- [ ] **¿Vuelve el número de guía a Shopify?** Anota la respuesta:
      `___________________`
- [ ] Si no vuelve, decidir qué hacer y anotarlo.
- [ ] Con paquetes por variante: pedido de x2 → **se despachan dos unidades**.
- [ ] Probada una devolución completa.

Detalle en [02-dropi.md](02-dropi.md).

---

## Publicar

- [ ] Todo lo anterior resuelto.
- [ ] Publicar el theme.
- [ ] Hacer una compra real de prueba con dinero real y comprobar que llega.
