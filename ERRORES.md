# Errores y trampas encontradas

Registro vivo. Cada entrada es algo que ya costó tiempo una vez y no debería
volver a costarlo. Se escribe **mientras** se trabaja, no al final.

Formato: qué pasó → por qué → qué hacer en su lugar.

---

## 1. Contradicción entre la guía visual y el contexto del proyecto: contraentrega

**Qué pasó.** `GuiaVisual.png` muestra «Pago contraentrega» en cinco sitios
distintos (barra superior, sellos del hero, envíos, FAQ, CTA final).
`CONTEXTO.md` y `docs/03-pagos-colombia.md` dicen lo contrario: **sin
contraentrega, solo pago online con Wompi**.

**Por qué importa.** Anunciar contraentrega sin tenerla activa en la pasarela es
publicidad engañosa ante la SIC y genera pedidos que no se pueden cobrar.

**Qué se hizo.** Se siguió el contexto del proyecto, no la maqueta. La guía se
usa como referencia **visual** (composición, jerarquía, densidad), no como
fuente de datos comerciales. El ajuste `payment_cash` sigue en `false`.

**Regla.** Una maqueta define cómo se ve algo, nunca qué promete la tienda. Los
datos comerciales salen de los ajustes del theme o de Shopify.

---

## 2. Una sección no puede renderizar sus bloques dos veces

**Qué pasó.** Ya documentado en `CONTEXTO.md` y vuelve a ser relevante al
rediseñar secciones con dos disposiciones (cuadrícula / carrusel).

**Por qué.** Shopify rechaza la sección aunque las dos ramas del `if` nunca se
ejecuten a la vez. `theme check` **no** lo detecta; falla al subir.

**Qué hacer.** Un solo `{% content_for 'blocks' %}` y cambiar la disposición con
una clase en el contenedor. Ver `landing-demo.liquid`, que ya lo resuelve así.

---

## 3. Un ajuste `range` necesita al menos tres pasos

**Qué pasó.** Un `range` de 1 a 2 con `step: 1` es rechazado al subir.

**Qué hacer.** Para dos opciones, usar `select` con valores **de tipo cadena**
(`"1"`, `"2"`), nunca números. Es el caso de `columns_mobile` en
`landing-benefits.liquid`.

---

## 4. En la plantilla JSON, el valor de un `select` va entre comillas

**Qué pasó.** `"columns_mobile": 1` rompe; `"columns_mobile": "1"` funciona.

**Por qué.** El tipo del ajuste manda sobre lo que «parece» el valor.

---

## 5. `image_mobile` no es un caso de `srcset`, es un caso de `<picture>`

**Qué pasó.** Tentación de resolver la imagen de móvil con otro `srcset`.

**Por qué.** `srcset` sirve para el mismo encuadre a distinto tamaño.
Un encuadre distinto es contenido distinto y necesita `<source media>`.

**Dónde está resuelto.** `snippets/responsive-image.liquid`. No duplicar esa
lógica en las secciones: se pasa `image_mobile` y ya está.

---

## 6. Duplicar CSS en cada sección en lugar de subirlo a `critical.css`

**Qué pasó.** Al rediseñar, la vía rápida es escribir el mismo `display: flex`
con los mismos tokens en ocho `{% stylesheet %}` distintos.

**Por qué importa.** Shopify agrupa y subsetea los `{% stylesheet %}` por
página, así que no rompe nada, pero deja ocho sitios que hay que cambiar cuando
cambie el diseño.

**Regla adoptada.** Si una regla la usan dos o más secciones, sube a
`critical.css`. Si es de una sola sección, se queda en su `{% stylesheet %}`.

---

## 7. `text-transform: uppercase` en el antetítulo con texto ya en mayúsculas

**Qué pasó.** La plantilla traía `"eyebrow": "TEXTO DE DEMOSTRACIÓN"` y el CSS
del `.eyebrow` ya aplica `text-transform: uppercase`.

**Por qué importa.** El lector de pantalla lee las mayúsculas reales letra a
letra en algunos motores; las de CSS no. Además impide bajar a minúsculas desde
el editor.

**Qué hacer.** Escribir el antetítulo en capitalización normal y dejar que el
CSS lo transforme.

---

## 8. Los precios nunca se escriben a mano

**Regla dura del proyecto, se repite aquí porque es la que más tienta.** Toda
cifra sale de `variant.price` / `variant.compare_at_price`. Si un diseño pide
un precio que Shopify no puede dar, el diseño está mal, no Shopify.

---

## 9. Reseñas de demostración: qué se cambió y qué NO

**Qué se pidió.** Ver cómo queda la sección con reseñas realistas en lugar de
«Nombre de ejemplo».

**Qué se hizo.** Se escribieron reseñas ficticias con nombres, ciudades y textos
verosímiles **en la plantilla** `product.landing.json`, que es dato, no código.

**Qué NO se tocó.** El mecanismo `is_demo` sigue intacto en
`blocks/review-item.liquid`, `snippets/review-card.liquid` y
`snippets/structured-data.liquid`: sigue existiendo el interruptor, sigue
pintando el aviso cuando está activo y sigue excluyendo el contenido ficticio de
los datos estructurados.

**Riesgo asumido, escrito aquí para que no se olvide.** Estas reseñas están con
`is_demo: false` para poder ver el diseño final sin el aviso encima. **No se
puede publicar la tienda así.** Antes de publicar: instalar Judge.me o Loox
(plan gratis, escriben los metacampos estándar) y sustituirlas por reales.
Publicar testimonios inventados en Colombia es publicidad engañosa ante la SIC y
motivo de cierre de cuenta publicitaria.

---

## 10. Las estrellas del agregado no se pueden falsear desde el theme

**Qué pasó.** Al poner reseñas ficticias, la media («4,8 de 5») sigue sin
aparecer, porque `snippets/stars.liquid` la lee **solo** de
`product.metafields.reviews.rating`.

**Por qué está bien así.** Una media es una medición. Si el theme la calculara a
partir de lo que escribió el vendedor, dejaría de ser una medición.

**Qué hacer para verla en la vista previa.** Rellenar a mano los metacampos
`reviews.rating` y `reviews.rating_count` del producto en el admin. Es un dato
en la tienda, no en el código.

---

## 11. Varios bloques reimplementaban en su `{% stylesheet %}` una regla que

`critical.css` ya definía globalmente

**Qué pasó.** Al elevar `benefit-item`, `step-item` y `guarantee-item` al
nuevo sistema de diseño apareció que:

- `.benefit-item__heading`, `.step-item__heading` y `.guarantee-item__heading`
  fijaban `font-size: var(--font-size-lg)` en un `<h3>`, y `critical.css` ya
  pone `h3 { font-size: var(--font-size-lg); }` de forma global.
- `.guarantee-item` fijaba `background-color: var(--color-background)` sobre
  un elemento que ya lleva la clase `.card`, que fija exactamente el mismo
  valor.
- `.review-card` hacía lo mismo con `.card`.

**Por qué importa.** No rompe nada visualmente (el valor coincide), pero es
la regla nº 6 de este archivo violada en miniatura: dos sitios que cambiar el
día que cambie el valor.

**Qué se hizo.** Se borraron las cinco reglas duplicadas y se dejó que la
clase global (`h3` o `.card`) hiciera el trabajo.

---

## 12. `@shopify/prettier-plugin-liquid` no es idempotente en una sola pasada

sobre todo el theme

**Qué pasó.** Tras `prettier --write "theme/**/*.{liquid,json,css,js}"`,
`prettier --check` sobre el mismo glob todavía marcaba 1-2 archivos como mal
formateados (primero `landing-final-cta.liquid`, luego, tras formatearlo,
`home-hero.liquid` y `landing-problem.liquid` — ninguno tocado por esta
tarea). Una segunda pasada de `--write` los deja estables y `--check` pasa
limpio.

**Por qué importa.** Si el pipeline de CI corre `prettier --check` una sola
vez después de `--write`, puede fallar por archivos ajenos a un PR concreto.

**Qué hacer.** Ejecutar `prettier --write` dos veces (o hasta que `--check`
quede limpio) antes de confiar en el resultado, sobre todo en un repo grande.

---

## 13. El repo no traía `node_modules`

**Qué pasó.** `npx prettier --write ...` fallaba con
`Cannot find package '@shopify/prettier-plugin-liquid'` porque no había
`node_modules` (aunque sí estaba en `package.json`). `npx shopify theme
check` sí funcionaba porque `@shopify/cli` se resuelve solo vía su propio
mecanismo.

**Qué hacer.** Correr `npm install` antes de `npm run format` en una
instalación nueva del repo.

---

## 14. Nombre de sección demasiado largo — RESUELTO

**Qué pasó.** `theme check` señaló que el texto de `t:sections.home_featured`
en `locales/es.default.schema.json` («Inicio · Productos destacados», 29
caracteres) supera los 25 que Shopify permite.

**Estado.** Corregido: se acortó a «Inicio · Destacados» y «Inicio · Ventajas».
La regla general y el comando para detectarlo de antemano están en la
**entrada 16**, que es la que hay que leer.

---

## 15. El anillo de foco de un `<input>` dentro de un contenedor con

`overflow: hidden` queda recortado

**Qué pasó.** `quantity-selector.liquid` envuelve el input y los botones de
paso en `.quantity`, que necesita `overflow: hidden` para que los tres
elementos lean como un solo control. La regla global
`:focus-visible { outline: 2px solid ...; outline-offset: 2px; }` de
`critical.css` se aplica también al `<input>` interior, y ese anillo, al
tener `outline-offset` positivo, queda cortado por el `overflow: hidden` del
padre — el teclado pierde la señal de foco.

**Qué se hizo.** Se suprimió el `outline` en `.quantity__input:focus-visible`
y se dibujó el anillo sobre `.quantity` completo con `:focus-within`, que no
sufre el recorte porque es el propio elemento con `overflow: hidden`.

**Regla.** Cualquier control compuesto (varios elementos que se ven como
uno) con `overflow: hidden` en el envoltorio necesita revisar dónde cae el
anillo de foco de sus hijos, no asumir que la regla global basta.

---

## 16. Los nombres de sección tienen un máximo de 25 caracteres

**Qué pasó.** `theme check` falló con `ValidSchemaName` en dos secciones
nuevas: «Inicio · Productos destacados» (29) y «Inicio · Propuesta de valor»
(27).

**Por qué es fácil caer.** El límite no está en el `{% schema %}`, sino en el
**valor traducido** que hay detrás de la clave `t:sections.x`. Se puede escribir
una clave corta y romperlo igualmente desde el archivo de idioma. Y hay que
comprobarlo en **todos** los idiomas: el inglés puede caber y el español no.

**Qué hacer.** Antes de dar por buena una sección nueva:

```bash
node -e "for(const f of ['theme/locales/es.default.schema.json','theme/locales/en.schema.json']){const s=require('./'+f).sections||{};for(const[k,v]of Object.entries(s))if(v.length>25)console.log(f,k,v.length,v)}"
```

**Qué se hizo.** Se acortaron a «Inicio · Destacados» y «Inicio · Ventajas».

---

## 17. Hay DOS espacios de nombres de traducción y no son intercambiables

**Qué pasó.** La sección de contacto usaba `"default": "t:contact.title"` en su
`{% schema %}` y la clave estaba en `theme/locales/es.default.json`.
`theme check` la rechazó:
`'t:contact.title' does not have a matching entry in 'locales/es.default.schema.json'`.

**Por qué.** Son dos archivos distintos con dos propósitos distintos:

| Dónde se usa                                                                   | Archivo                       | Sintaxis                           |
| ------------------------------------------------------------------------------ | ----------------------------- | ---------------------------------- |
| Dentro de `{% schema %}` (labels, info, defaults, nombres de sección y bloque) | `*.schema.json`               | `"t:labels.heading"`               |
| En el HTML de la plantilla, lo que ve el cliente                               | `es.default.json` / `en.json` | `{{ 'landing.add_to_cart' \| t }}` |

Una clave del editor **nunca** se resuelve contra el locale de tienda, ni al
revés.

**Trampa añadida.** El `default` de un ajuste `richtext` tiene que venir
envuelto en `<p>…</p>`, también cuando el valor llega desde una clave `t:`. El
`<p>` va en el archivo de idioma, no en el schema.

**Qué se hizo.** Se añadió el grupo `contact` a los dos `*.schema.json`, con el
mensaje de éxito ya envuelto en `<p>`.

---

## 18. Una sección no puede ponerse una clase a sí misma

**Qué pasó.** Para alternar el fondo de las secciones hacía falta pintar el
`<section class="shopify-section">` que genera Shopify. El `"class"` del schema
es fijo por **tipo** de sección, no por instancia, así que no sirve para un
ajuste que el comerciante cambia sección a sección.

**Qué se hizo.** La sección pone una clase marcadora (`bg-soft` / `bg-dark`) en
su **hijo raíz** y `critical.css` pinta el envoltorio con `:has()`:

```css
.shopify-section:has(> .bg-soft) {
  background-color: var(--color-surface);
}
```

Cero marcado extra, la banda ocupa todo el ancho del viewport y el ajuste sigue
siendo por instancia.

**Lo mismo aplica a `position: sticky` en el encabezado.** Un elemento pegajoso
solo viaja dentro de su bloque contenedor, y el envoltorio de la sección mide
exactamente lo mismo que el encabezado, así que ponerlo en el `<header>` no hace
nada. Va en el envoltorio, por la misma vía `:has()`.

---

## 19. `overflow-x: hidden` en el `body` rompe `position: sticky`

**Qué pasó.** Para blindar la página contra el scroll horizontal accidental, el
reflejo es `body { overflow-x: hidden }`. Eso crea un contenedor de scroll y
deja de funcionar el encabezado fijo y la columna de compra pegajosa del hero.

**Qué hacer.** `overflow-x: clip`. Recorta igual y **no** crea contenedor de
scroll, así que `sticky` sigue anclado al viewport.

---

## 20. El precio del panel oscuro y los sellos: contraste

**Qué pasó.** Al añadir la banda `bg-dark`, los componentes que se pintan solos
para fondo claro (`.card`, `.button--primary`, `.eyebrow`, `.muted`) quedaban
ilegibles dentro de ella.

**Qué se hizo.** `critical.css` redefine esos cuatro casos **una sola vez**
bajo `.shopify-section:has(> .bg-dark)`, en lugar de que cada sección que use
fondo oscuro se acuerde de arreglarlos.

**Regla.** Cuando se añade una variante de tema (oscuro, invertido), la
adaptación de los componentes compartidos va junto a la variante, no repartida
por las secciones que la usan.

---

## 21. El filtro `ternary` no existe en Liquid

**Qué pasó.** Al escribir `home-hero.liquid` se intentó decidir el atributo
`sizes` de la imagen en línea con
`is_full | default: false | ternary: '100vw', '...'`, copiando un idioma de
otros lenguajes de plantillas. Liquid (ni el estándar ni el de Shopify) tiene
filtro `ternary`; el render habría fallado en tiempo de compilación de la
sección.

**Qué hacer.** Resolver la rama con `assign` + `if/else` antes del render:

```liquid
assign hero_sizes = '(min-width: 750px) 50vw, 100vw' if section.settings.layout == 'full' assign
hero_sizes = '100vw' endif
```

**Por qué no lo detectó nada automático.** `theme check` no evalúa filtros
inventados como error de sintaxis en todos los casos; conviene no fiarse solo
de él para Liquid inválido y revisar el render mentalmente (o probarlo) antes
de darlo por bueno.

---

## 22. Una sección de landing reutilizada fuera de la landing — RESUELTO

**Qué pasó.** `landing-final-cta` tenía el destino del botón fijo en el código
como `#landing-offer`. Al reutilizar la sección en la home, donde no hay
sección de oferta, el botón no fallaba pero tampoco llevaba a ningún sitio.

**Estado.** Corregido: la sección tiene ahora un ajuste `cta_url` que cae por
defecto en `#landing-offer`, así que las landings de producto siguen igual y en
la home apunta al catálogo.

**Regla que deja.** Un ancla escrita en el código de una sección es una
suposición sobre en qué página se va a usar esa sección. En un theme cuyo
objetivo es reutilizar secciones entre plantillas, el destino es un ajuste con
un valor por defecto, nunca una constante.

---

## 23. Un ajuste `collection` en la plantilla JSON se guarda como el _handle_, no como objeto

**Qué pasó.** Al dejar `home-featured` configurada de fábrica en
`templates/index.json`, hacía falta un valor de colección que exista siempre,
sin inventar el handle de una colección real de la tienda (que esta tarea no
conoce).

**Qué se hizo.** Se usó `"collection": "frontpage"`, la colección de sistema
que Shopify crea automáticamente en toda tienda («Home page»). Puede estar
vacía, y la sección ya contempla ese caso (simplemente no pinta tarjetas), así
que no hay dato inventado ni error si el comerciante no la ha usado nunca.

**Qué hacer.** El comerciante debe elegir su colección real desde el editor de
temas antes de publicar; `frontpage` es solo un valor de arranque que nunca
rompe la sección.

---

## 24. Rectificar contra el brief punto por punto encuentra lo que la vista no

**Qué pasó.** Al terminar el rediseño, la landing se veía bien y todas las
comprobaciones pasaban. Al releer `instrucciones.md` apartado por apartado
apareció que el **punto 10, «QUÉ RECIBES»**, no tenía sección: ni existía antes
ni se había creado. La maqueta también la tenía («¿Qué incluye la compra?») y
aun así se había pasado por alto, porque una página bien compuesta no delata lo
que le falta — solo lo que le sobra.

**Qué se hizo.** Se creó `sections/landing-includes.liquid` con el bloque
`blocks/include-item.liquid`, que además soporta el estado «no incluido»:
decirlo cuesta una línea y evita una reclamación.

**Regla.** Terminar no es «se ve bien y las comprobaciones pasan». Es recorrer
el encargo apartado por apartado, con el encargo delante, marcando cada uno.
Los huecos se encuentran leyendo la lista, no mirando la página.

---

## 25. Lo que sigue sin poder verificarse desde aquí

Para que nadie lo dé por probado:

- **Nada se ha subido a la tienda.** `theme check` y el script de auditoría se
  ejecutan sin conexión. La comprobación real es
  `npx shopify theme push --theme 192957645122 --store k8zc3v-fm.myshopify.com --path theme`.
- **El recorrido por el editor de themes** (añadir, mover y borrar cada sección)
  no se ha hecho. Es donde salen los errores de la entrada 2 y la 3.
- **La galería con miniaturas** solo se ha razonado, no visto: el carril lateral
  en escritorio, el gesto de deslizar en móvil y la sincronización de la
  miniatura activa necesitan un navegador.
- **Lighthouse** no se ha ejecutado. El hero cambió de estructura y es donde se
  mide el LCP.
- **Una compra de prueba completa**, con el selector de paquete y el checkout.

La lista larga está en `docs/06-checklist-lanzamiento.md`.

---

## 26. El diff se llena de archivos que nadie tocó, por el fin de línea

**Qué pasó.** Después de formatear, `git status` marcaba como modificados una
docena de archivos que esta tarea no tocó (`404.liquid`, `cart.liquid`,
`layout/theme.liquid`, los `docs/*`…). Comprobado con
`git diff --ignore-all-space --ignore-blank-lines`, el cambio real era **cero
líneas** en todos: solo CRLF ↔ LF.

**Por qué.** Prettier escribe LF. Git en Windows, con `core.autocrlf`, devuelve
CRLF al hacer checkout. Cada pasada de formato reintroduce la diferencia y el
diff deja de ser legible: los cambios de verdad se pierden entre el ruido.

**Qué se hizo.** Se añadió `.gitattributes` con `* text=auto eol=lf` y los
binarios marcados. A partir de ahora lo guardado es siempre LF y el checkout en
Windows se ve igual que antes.

**Cómo distinguirlo la próxima vez, antes de asustarse:**

```bash
git diff --ignore-all-space --ignore-blank-lines --stat
```

Si sale vacío para un archivo, ese archivo no ha cambiado de verdad.

---

## 27. Los argumentos de `render` no admiten filtros ni comparaciones

**Qué pasó.** El push falló con `Liquid syntax error: Expected end_of_string but
found pipe` y `... but found comparison`. Cuatro casos:

```liquid
{% render 'button', label: 'contact.send' | t %} ← filtro
{% render 'section-header', center: has_image == false %} ← comparación
{% render 'button', url: section.settings.cta_url | default: '#landing-offer' %}
```

**Por qué importa.** `theme check` da los cuatro por buenos. El error solo
aparece al subir, y la sección **no llega al servidor**, lo que a su vez hace
fallar todas las plantillas JSON que la referencian — con un mensaje que apunta
a la plantilla y no al archivo culpable.

**Qué hacer.** Resolver el valor antes, con `assign`:

```liquid
{%- liquid
  assign send_label = 'contact.send' | t
  assign cta_destination = section.settings.cta_url | default: '#landing-offer'
-%}
{% render 'button', label: send_label, url: cta_destination %}
```

**Detectado ahora automáticamente** por `scripts/auditar-theme.js`
(`render-con-filtro`, `render-con-comparacion`).

---

## 28. Dentro de `{% liquid %}` cada línea es una etiqueta independiente

Dos formas de romperlo, las dos cometidas en esta sesión:

**a) Partir una condición en varias líneas.**

```liquid
{%- liquid
  if a != blank
    or b != blank      ← "Unknown tag 'or'"
  endif
-%}
```

La condición entera tiene que caber en una sola línea, por larga que quede.

**b) Escribir un delimitador dentro de un comentario del bloque.**

```liquid
{%- liquid
  # los argumentos de {% render
%}
no admiten... ← el "%}" cierra la etiqueta -%}
```

El bloque se cierra en ese `%}` y el resto del código se imprime como texto en
la página. Me pasó **dos veces seguidas**, escribiendo el comentario que
explicaba el error 27.

**Regla.** En un comentario dentro de `{% liquid %}`, nunca escribas `{%` ni
`%}`. Di «una etiqueta render», no `{% render %}`.

**Detectado ahora automáticamente** (`liquid-condicion-partida`,
`liquid-delimitador`), y verificado reintroduciendo el fallo a propósito.

---

## 29. El primer push de una sección nueva falla por orden de subida

**Qué pasó.** El primer `theme push` con secciones nuevas devolvió:

> El tipo de sección 'landing-includes' no hace referencia a una sección de
> archivo existente

aunque el archivo iba en esa misma subida.

**Por qué.** El CLI sube en paralelo y Shopify valida cada JSON contra lo que ya
hay en el servidor. Si la plantilla llega antes que su sección, la rechaza.

**Qué hacer.** Repetir el push: la segunda pasada ya encuentra los archivos.
Pero **antes de repetirlo, comprueba que el error sea realmente de orden**: en
esta sesión dos de esos mensajes no eran de orden, sino síntoma del error 27 —
la sección nunca llegó porque tenía un fallo de sintaxis. La forma de
distinguirlos es subir solo el archivo sospechoso:

```bash
npx shopify theme push --only sections/mi-seccion.liquid ...
```

Eso muestra el error verdadero en lugar del daño colateral.

---

## 30. «Sin publicar» era cierto cuando se escribió, no cuando se leyó

**Qué pasó.** `CONTEXTO.md` decía que el theme `192957645122` estaba **sin
publicar**, y así se le reportó al usuario antes de subir. Al listar los themes
resultó estar **live**.

**Por qué importa.** La autorización para subir se dio sobre una premisa falsa.
La documentación describe un estado del pasado; el estado real vive en la
tienda.

**Qué hacer.** Antes de cualquier push, mirar el estado real, no el documentado:

```bash
npx shopify theme list --store <tienda>
```

**Matiz que cambia la gravedad.** La tienda entera está protegida con
contraseña, así que el theme live no es visible al público. Eso reduce el riesgo
pero no lo elimina: el día que se quite la contraseña, lo que esté subido queda
visible de inmediato.
