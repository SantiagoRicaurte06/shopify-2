# Contexto del proyecto

Estado a fecha de la última sesión. Este archivo existe para retomar el trabajo
sin tener que reconstruir de memoria en qué punto estábamos.

---

## Qué estamos construyendo

Un theme de Shopify que funciona como **sistema reutilizable de landings de
producto** para Colombia. El objetivo no es una landing suelta, sino que este
flujo se haga desde el admin sin escribir código:

```
producto nuevo → metacampos → elegir secciones → publicar landing
```

Repositorio: `SantiagoRicaurte06/shopify-2`
Rama de trabajo: `claude/shopify-landing-colombia-f7z9gg`

---

## Dónde está montado

|                  |                                                                  |
| ---------------- | ---------------------------------------------------------------- |
| **Tienda**       | `k8zc3v-fm.myshopify.com`                                        |
| **Cuenta**       | `lunexaa.contact@gmail.com`                                      |
| **Theme**        | «Landings Colombia», id `192957645122`, **publicado (live)**     |
| **Vista previa** | https://k8zc3v-fm.myshopify.com?preview_theme_id=192957645122    |
| **Editor**       | https://k8zc3v-fm.myshopify.com/admin/themes/192957645122/editor |

El CLI ya está autenticado en este equipo. Para volver a subir cambios:

```bash
npx shopify theme push --theme 192957645122 --store k8zc3v-fm.myshopify.com --path theme --allow-live
```

El theme **está publicado**. Lo que evita que un cliente vea el contenido de
relleno es que **la tienda entera está protegida con contraseña**: cualquier
visita cae en `/password`. Comprobado el 8 de septiembre de 2026 con un
`curl` a la portada, que devuelve 200 en `/password`.

Dos consecuencias que conviene tener presentes:

1. Un `theme push` a ese id **sí** cambia el theme live. Hace falta
   `--allow-live`, y el CLI lo pide por algo.
2. El día que se quite la contraseña de la tienda, lo que haya subido queda
   visible de inmediato. Antes de ese día hay que haber sustituido los textos
   de relleno y las opiniones ficticias (ERRORES.md 9).

---

## Qué está hecho

- Theme completo sobre el **Skeleton Theme** de Shopify (MIT), que es el punto de
  partida que Shopify recomienda hoy.
- **16 secciones** de landing (`LP · …`), todas con presets: se añaden, reordenan
  y eliminan desde el editor.
- **17 theme blocks** en `/blocks`, reutilizables entre secciones.
- **17 snippets**. Dos concentran la lógica delicada: `responsive-image` decide
  todo lo relativo al LCP y `media` resuelve todos los tipos de medio.
- Un solo `landing.js`, sin dependencias. Las preguntas frecuentes usan
  `<details>` nativo, así que no cargan script.
- Plantilla `product.landing.json` con las dieciséis secciones montadas y
  contenido de demostración en español.
- Documentación completa en `docs/`.
- **Subido a la tienda sin errores** (8 de septiembre de 2026, al theme live,
  que está tras la contraseña de la tienda).

---

## Decisiones tomadas

| Decisión                                                        | Estado                                                                 |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Base: Skeleton Theme, no desde cero                             | Hecho                                                                  |
| Checkout nativo de Shopify                                      | Hecho                                                                  |
| **Sin contraentrega.** Solo pago online con Wompi               | Hecho                                                                  |
| Oferta con dos modos: `variants` (por defecto) y `quantity`     | Hecho                                                                  |
| Dropi: **aparcado**, el usuario pidió dejarlo de lado por ahora | La documentación en `docs/02-dropi.md` sigue ahí para cuando se retome |

### Tres reglas que están en el código

**Los precios nunca se escriben en el código.** En modo `variants` cada cifra
sale de Shopify, así que la página y el checkout no pueden discrepar. El modo
`quantity` obliga a repetir el descuento en un ajuste, y por eso el nivel muestra
siempre el total sin descuento tachado y avisa en pantalla de que el descuento se
aplica en el checkout.

**Las estrellas solo salen de datos reales.** De los metacampos estándar
`reviews.rating` y `reviews.rating_count`. Si el producto no los tiene, no se
pinta nada.

**Cero pixels en el theme.** Meta y TikTok por sus canales oficiales, el resto
por Custom Pixel en el admin. Es lo único que impide contar los eventos dos
veces.

---

## Sobre las reseñas — punto abierto

El usuario pidió poner reseñas «de la web o ficticias».

Lo acordado: **las de demostración que ya trae el theme sirven para construir**.
Llevan `is_demo` activo, muestran una etiqueta visible de contenido ficticio y
quedan fuera de los datos estructurados. Eso es legítimo mientras se monta.

Lo que **no** se va a hacer: publicar la tienda con testimonios inventados o
copiados de otra web presentados como clientes reales. En Colombia eso es
publicidad engañosa ante la SIC y es motivo de cierre de cuenta publicitaria.

Camino para cuando haya que publicar: instalar Judge.me o Loox (ambas con plan
gratis), que escriben los metacampos estándar, y sustituir las de demostración
por reales. El theme ya soporta las dos rutas más un hueco para bloques de app.

---

## Sesión de rediseño visual

Se partió de `instrucciones.md` (el brief) y de `GuiaVisual.png` (la maqueta de
referencia). El encargo era elevar el sistema existente a «marca colombiana de
ecommerce moderna», **sin** rehacer la arquitectura.

### Sistema de diseño

Todo lo compartido vive en dos archivos y nada más:

- `snippets/css-variables.liquid` — los tokens. Se añadieron: escala de sombras
  derivada del color de texto del comerciante, un tamaño de título fluido
  (`--font-size-display`), el color de las estrellas, la pareja de colores del
  panel oscuro, `--reading-width`, transiciones y dos pasos más de espaciado.
- `assets/critical.css` — las primitivas compartidas: `.card`, `.icon-tile`,
  `.media-frame`, `.pill`, `.prose`, `.landing-split`, `.carousel-controls`,
  `.landing-grid`, `.landing-scroller` y las bandas de color.

**Bandas de color.** Una sección no puede ponerse una clase a sí misma: el
`"class"` del schema es fijo por tipo, no por instancia. La sección marca su
hijo raíz con `bg-soft` o `bg-dark` y `critical.css` pinta el envoltorio con
`:has()`. El mismo truco fija el encabezado. Está explicado en ERRORES.md 18.

### Qué cambió, por archivo

| Archivo                 | Qué se hizo                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `announcement-bar`      | De una frase a dos o tres sellos (bloques `trust-item`), sobre el panel oscuro. Sin urgencia, sin cuenta atrás.                                              |
| `header`                | Fijo al hacer scroll (opcional), buscador, y en móvil menú / marca / acciones con la marca centrada.                                                         |
| `landing-hero`          | Galería con miniaturas (columna lateral en escritorio) o carrusel, proporción configurable, columna de compra pegajosa y los sellos como una fila de cuatro. |
| `landing-problem`       | Admite imagen y se convierte en un split editorial.                                                                                                          |
| `landing-solution`      | Reutiliza `.landing-split` en vez de declarar su propia rejilla.                                                                                             |
| `landing-reviews`       | Panel de resumen con la media real, y carril deslizante en móvil.                                                                                            |
| `landing-shipping`      | Tabla en una sola tarjeta con filetes, y la política como nota aparte.                                                                                       |
| `landing-trust-bar`     | Rejilla con filetes en lugar de una fila suelta.                                                                                                             |
| `landing-final-cta`     | Admite imagen (pasa a dos columnas), precio real y **`cta_url`**, que es lo que permite reutilizarla fuera de una landing.                                   |
| `footer`                | Reescrito: marca, descripción, redes, contacto real, columnas de enlaces (bloque `footer-menu`), políticas de la tienda y medios de pago.                    |
| `landing.js`            | Se **extendió** `LandingCarousel` con miniaturas. No se reemplazó nada.                                                                                      |
| 10 secciones            | Ajuste `background` (ninguno / suave / oscuro) para alternar bandas desde el editor.                                                                         |
| 10 bloques + 7 snippets | Alineados con el sistema; se borraron las reglas que duplicaban una global.                                                                                  |

### Nuevo

- **Página de inicio** (`templates/index.json`) con tres secciones propias:
  `home-hero`, `home-value` y `home-featured`. Es secundaria —la venta pasa por
  las landings— pero ya no es el «Hello World» del Skeleton.
- **Página de contacto** (`templates/page.contact.json` + `sections/contact-form`)
  con el `{% form contact %}` nativo y los datos reales de la tienda.
- **Ajustes «Marca y contacto»**: lema, descripción, correo, teléfono, dirección,
  horario y redes. Los usan el pie de página y la página de contacto, y cada
  dato se oculta mientras esté vacío.
- **`ERRORES.md`** — 23 trampas encontradas, con qué hacer en su lugar.
- **`scripts/auditar-theme.js`** — comprueba de una pasada lo que `theme check`
  no ve: bloques renderizados dos veces, rangos de menos de tres pasos, selects
  con valores numéricos en las plantillas, claves de traducción que faltan en
  cualquiera de los cuatro archivos de idioma, nombres de sección de más de 25
  caracteres y los límites de la plataforma. `npm run check` lo ejecuta.

### Lo que NO se tocó, a propósito

La lógica de precios de `landing-offer` (todo sigue saliendo de las variantes),
el mecanismo `is_demo`, la regla de que la valoración media solo viene de los
metacampos, la ausencia de pixels, el checkout nativo y la decisión de no
ofrecer contraentrega — que es donde la maqueta contradice al proyecto
(ERRORES.md 1).

### Las opiniones de la vista previa son ficticias

Están en `product.landing.json` e `index.json` con `is_demo` en `false` para
poder juzgar el diseño terminado sin el aviso encima. **No se puede publicar
así.** El mecanismo sigue intacto en el código y los datos estructurados nunca
las ven, porque `structured-data.liquid` solo lee los metacampos. Detalle
completo en ERRORES.md 9.

---

## Lo siguiente

1. **Falta saber qué producto se va a vender.** Sin eso, el copy y la paleta son
   genéricos. Con eso se puede escribir la landing entera con sentido y darle
   una identidad visual de verdad (ahora la paleta es sobria y neutra a
   propósito).
2. Crear un producto de ejemplo con variantes por paquete (x1, x2, x3) para ver
   la sección de oferta funcionando.
3. Rellenar las secciones con contenido coherente en lugar de los textos de
   relleno actuales.
4. Ajustar colores y tipografía para que quede llamativa.

---

## Verificación

**Ejecutado y correcto, en esta sesión:**

- `npx shopify theme check --path theme` → **93 archivos, 0 incidencias**.
- `node scripts/auditar-theme.js` → **sin incidencias** (71 liquid, 15 JSON).
- `npx prettier --check .` → limpio en todo el repositorio, no solo en
  `theme/`. El alcance quedó declarado en `.prettierignore`: fuera se dejan el
  brief original, la licencia del Skeleton y el lockfile.
- Referencias cruzadas: todo `{% render %}` apunta a un snippet que existe,
  todo icono pedido está dibujado (25) y todo icono ofrecido en un schema se
  puede pintar.

**Sin verificar todavía:** el recorrido por el editor de themes, una compra de
prueba completa y las métricas de Lighthouse. Nada de eso se puede comprobar sin
subir el theme. La lista está en `docs/06-checklist-lanzamiento.md`.

### Los errores que `theme check` no detecta

Estaban aquí como tres notas sueltas. Ahora son **`ERRORES.md`**, con 23
entradas, y `scripts/auditar-theme.js` comprueba automáticamente las que se
pueden comprobar. Ejecuta `npm run check` antes de subir.

---

## Documentación

|                                             |                                                  |
| ------------------------------------------- | ------------------------------------------------ |
| `docs/00-investigacion.md`                  | Qué dice la documentación oficial, con enlaces   |
| `docs/01-arquitectura.md`                   | Cómo está montado y por qué                      |
| `docs/02-dropi.md`                          | Aparcado, pero completo                          |
| `docs/03-pagos-colombia.md`                 | Wompi y por qué no hay contraentrega             |
| `docs/04-configuracion-shopify.md`          | Puesta en marcha                                 |
| `docs/05-nuevo-producto.md`                 | Lanzar un producto nuevo sin código              |
| `docs/06-checklist-lanzamiento.md`          | Qué comprobar antes de publicar                  |
| `docs/07-riesgos.md`                        | Qué está verificado y qué no                     |
| `docs/metafields.md`, `docs/metaobjects.md` | Datos personalizados                             |
| `docs/pixels/`                              | Seguimiento                                      |
| `ERRORES.md`                                | 23 trampas ya pisadas, con qué hacer en su lugar |
