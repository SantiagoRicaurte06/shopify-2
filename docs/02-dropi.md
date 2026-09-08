# Dropi

## Resumen

El theme es **agnóstico a Dropi**. Dropi actúa después de que el pedido existe en
Shopify, así que no impone nada al frontend. No hay una sola línea de código en
este repositorio que hable con Dropi.

La única decisión de la landing que le afecta es la de paquetes: si usas
variantes por paquete, **cada variante hay que mapearla a N unidades en Dropi a
mano**.

---

## La app

Hay dos aplicaciones en el App Store que conectan Shopify con Dropi. Los datos
son los de sus fichas oficiales.

### Dropify — la oficial

- **Editor:** Dropi, Cali, Colombia
- **Ficha:** https://apps.shopify.com/dropify-5
- **Publicada:** 19 de julio de 2021
- **Precio:** gratis instalarla; se paga el coste de la mercancía y el envío de
  cada pedido gestionado
- **Valoración:** 3,2 sobre 5, con 55 opiniones. **El 31 % son de una estrella**
- **Idioma:** solo español

Qué dice que hace:

- importar productos del catálogo de Dropi a Shopify;
- sincronizar los pedidos de Shopify a Dropi en tiempo real;
- un checkout de contraentrega de un solo paso.

**Lo que su ficha no afirma:** que devuelva el número de guía o el estado del
envío a Shopify. Es la pieza más importante del flujo y no está confirmada.

### Dropify PRO — de un tercero

- **Editor:** DIGITAL TRENDING GROUP LLC, Doral, Florida. **No es Dropi.**
- **Ficha:** https://apps.shopify.com/dropi-pro
- **Conecta con:** Dropi PRO
- **Valoración:** 4,6 sobre 5, pero **con solo 4 opiniones**
- **Idioma:** solo español

Su ficha **sí** afirma que sincroniza la información de seguimiento una vez se
despachan los pedidos.

### Cómo elegir

La decisión tomada es documentar **Dropify**, la oficial. Dos cosas que conviene
tener presentes antes de construir el negocio encima:

1. Una valoración de 3,2 con un 31 % de reseñas de una estrella es una señal de
   fiabilidad irregular. Merece la pena leer las reseñas negativas.
2. Si resulta que Dropify no devuelve el tracking y Dropify PRO sí, estás
   eligiendo entre la app del proveedor real y la de un tercero con una muestra
   de cuatro opiniones. Ninguna de las dos opciones es cómoda, y por eso la
   prueba de la sección siguiente importa.

---

## Lo que NO está verificado

Nada de esto aparece en la ficha oficial y **no debe darse por cierto**:

- que el tracking vuelva a Shopify;
- la frecuencia real de sincronización;
- el comportamiento del inventario, los precios y las variantes;
- devoluciones, cambios y garantías;
- costes, comisiones y tarifas.

La única «documentación de API» de Dropi localizable son PDF subidos por
terceros a sitios de compartición de documentos. **No es fuente oficial y no se
ha usado.** Este repositorio no implementa nada contra la API de Dropi.

---

## Flujo asumido

```
Shopify (producto) → compra → pedido en Shopify
        │
        └─→ [Dropify] → pedido en Dropi → fulfillment → transportadora
                                                │
                                                └─→ tracking → ¿vuelve a Shopify?
```

El signo de interrogación es literal. Compruébalo antes de lanzar.

---

## Comprobación manual en tu cuenta

Hazla con un pedido de prueba real antes de gastar un peso en tráfico.

- [ ] Instalar Dropify y conectarla con el token de integración de tu cuenta de
      Dropi.
- [ ] Importar un producto y comprobar que llegan título, imágenes, variantes y
      precio.
- [ ] Hacer un pedido de prueba en la tienda.
- [ ] **Comprobar que el pedido aparece en Dropi**, y cuánto tarda en aparecer.
- [ ] **Comprobar si el número de guía vuelve a Shopify.** Mira el pedido en el
      admin: ¿tiene información de seguimiento? ¿Le llega al cliente el correo de
      envío con la guía?
- [ ] Si no vuelve: decidir entre notificar a mano o reevaluar la app. Anótalo
      en el checklist de lanzamiento.
- [ ] Si usas variantes por paquete, **mapear cada variante a N unidades en
      Dropi** y comprobar con un pedido de x2 que se despachan dos unidades.
- [ ] Probar una devolución y un cambio de principio a fin.
- [ ] Anotar los costes reales que ves en tu panel. No te fíes de ninguna cifra
      que hayas leído en un blog.

---

## Nota sobre el checkout de un paso

Dropify incluye un checkout de contraentrega de un solo paso. **Este theme no lo
usa.** La decisión tomada fue vender con el checkout nativo de Shopify y sin
contraentrega, así que el botón de compra hace un `add to cart` normal y el
cliente paga en el checkout de Shopify con la pasarela.

Si más adelante quieres usar ese formulario, es un cambio de arquitectura, no un
ajuste: el CTA dejaría de apuntar a `/cart/add` y pasaría a una app de terceros
en el camino crítico de la compra. Habría que probarlo entero antes.
