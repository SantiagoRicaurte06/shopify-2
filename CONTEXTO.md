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

| | |
|---|---|
| **Tienda** | `k8zc3v-fm.myshopify.com` |
| **Cuenta** | `lunexaa.contact@gmail.com` |
| **Theme** | «Landings Colombia», id `192957645122`, **sin publicar** |
| **Vista previa** | https://k8zc3v-fm.myshopify.com?preview_theme_id=192957645122 |
| **Editor** | https://k8zc3v-fm.myshopify.com/admin/themes/192957645122/editor |

El CLI ya está autenticado en este equipo. Para volver a subir cambios:

```bash
npx shopify theme push --theme 192957645122 --store k8zc3v-fm.myshopify.com --path theme
```

El theme está **sin publicar**, así que no afecta a lo que verían los clientes.

---

## Qué está hecho

- Theme completo sobre el **Skeleton Theme** de Shopify (MIT), que es el punto de
  partida que Shopify recomienda hoy.
- **15 secciones** de landing (`LP · …`), todas con presets: se añaden, reordenan
  y eliminan desde el editor.
- **15 theme blocks** en `/blocks`, reutilizables entre secciones.
- **17 snippets**. Dos concentran la lógica delicada: `responsive-image` decide
  todo lo relativo al LCP y `media` resuelve todos los tipos de medio.
- Un solo `landing.js`, sin dependencias. Las preguntas frecuentes usan
  `<details>` nativo, así que no cargan script.
- Plantilla `product.landing.json` con las quince secciones montadas y contenido
  de demostración en español.
- Documentación completa en `docs/`.
- **Subido a la tienda sin errores.**

---

## Decisiones tomadas

| Decisión | Estado |
|---|---|
| Base: Skeleton Theme, no desde cero | Hecho |
| Checkout nativo de Shopify | Hecho |
| **Sin contraentrega.** Solo pago online con Wompi | Hecho |
| Oferta con dos modos: `variants` (por defecto) y `quantity` | Hecho |
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

**Ejecutado y correcto:**

- `npx shopify theme check --path theme` → 85 archivos, 0 incidencias. Funciona
  sin conexión a una tienda.
- `npx prettier --check` → sin diferencias.
- Subida a la tienda real → sin errores.
- La plantilla usa 15 secciones de 25 y ninguna sección pasa de 50 bloques.

**Sin verificar todavía:** el recorrido por el editor de themes (añadir,
reordenar y eliminar cada sección), una compra de prueba completa, y las
métricas de Lighthouse. La lista está en `docs/06-checklist-lanzamiento.md`.

### Tres errores que `theme check` no detecta y la tienda sí

Vale la pena recordarlo porque volverán a aparecer:

1. **Una sección no puede renderizar sus bloques dos veces**, ni siquiera en
   ramas de un `if` que nunca se ejecutan a la vez. Hay que cambiar de
   disposición con una clase, no duplicando el contenedor.
2. **Un ajuste `range` necesita al menos tres pasos.** Un rango de 1 a 2 lo
   rechaza. Para dos opciones hay que usar un `select`.
3. **El valor de un `select` en la plantilla JSON tiene que ser una cadena**,
   aunque parezca un número: `"1"`, no `1`.

Hay un script en el historial de la sesión que audita todos los rangos del theme
de una vez; merece la pena reejecutarlo si se añaden ajustes nuevos.

---

## Documentación

| | |
|---|---|
| `docs/00-investigacion.md` | Qué dice la documentación oficial, con enlaces |
| `docs/01-arquitectura.md` | Cómo está montado y por qué |
| `docs/02-dropi.md` | Aparcado, pero completo |
| `docs/03-pagos-colombia.md` | Wompi y por qué no hay contraentrega |
| `docs/04-configuracion-shopify.md` | Puesta en marcha |
| `docs/05-nuevo-producto.md` | Lanzar un producto nuevo sin código |
| `docs/06-checklist-lanzamiento.md` | Qué comprobar antes de publicar |
| `docs/07-riesgos.md` | Qué está verificado y qué no |
| `docs/metafields.md`, `docs/metaobjects.md` | Datos personalizados |
| `docs/pixels/` | Seguimiento |
