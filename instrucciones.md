Quiero que trabajes directamente sobre mi repositorio actual de Shopify:

Repositorio:
https://github.com/SantiagoRicaurte06/shopify-2

Rama de trabajo:
claude/shopify-landing-colombia-f7z9gg

IMPORTANTE:
NO quiero crear otro theme desde cero.
NO quiero reemplazar la arquitectura actual.
NO quiero convertir esto en una landing HTML independiente.
Quiero evolucionar el sistema de landing que ya existe.

# OBJETIVO

Quiero transformar la landing de producto actual en una landing de ecommerce mucho más profesional, moderna y confiable para vender productos físicos en Colombia.

La referencia conceptual es una landing como:

https://www.hoopinz.com/products/plancha-a-vapor-ropa

pero NO quiero copiar su diseño, textos, imágenes, identidad, código ni estructura exacta.

Quiero tomar las buenas prácticas de ese tipo de ecommerce y llevarlas a un nivel visual superior.

La prioridad es:

1. Confianza
2. Claridad
3. Percepción de marca real
4. Calidad visual
5. Conversión
6. Performance
7. Mobile UX

La página NO debe parecer una página genérica de dropshipping.

Debe parecer una marca de ecommerce profesional.

# ESTADO ACTUAL DEL PROYECTO

El proyecto ya tiene una arquitectura bastante completa para esto.

Existe:

theme/templates/product.landing.json

y un sistema de secciones de landing reutilizables.

Ya existen secciones para:

* landing-hero
* landing-trust-bar
* landing-problem
* landing-solution
* landing-benefits
* landing-demo
* landing-how-it-works
* landing-reviews
* landing-ugc
* landing-offer
* landing-shipping
* landing-guarantee
* landing-faq
* landing-final-cta
* landing-sticky-cta

También existen bloques reutilizables en:

theme/blocks/

Y existe:

theme/assets/critical.css
theme/assets/landing.js

No rehagas estas funcionalidades desde cero.

Primero analiza la arquitectura actual y reutilízala.

# ARCHIVOS PRINCIPALES A REVISAR

Prioriza:

theme/templates/product.landing.json

theme/sections/landing-hero.liquid
theme/sections/landing-trust-bar.liquid
theme/sections/landing-problem.liquid
theme/sections/landing-solution.liquid
theme/sections/landing-benefits.liquid
theme/sections/landing-demo.liquid
theme/sections/landing-how-it-works.liquid
theme/sections/landing-reviews.liquid
theme/sections/landing-ugc.liquid
theme/sections/landing-offer.liquid
theme/sections/landing-shipping.liquid
theme/sections/landing-guarantee.liquid
theme/sections/landing-faq.liquid
theme/sections/landing-final-cta.liquid
theme/sections/landing-sticky-cta.liquid

También revisa:

theme/assets/critical.css
theme/assets/landing.js
theme/sections/header.liquid
theme/sections/footer.liquid

Y los bloques/snippets relacionados cuando sea necesario.

NO modifiques archivos que no sean necesarios.

# DIRECCIÓN VISUAL

Quiero una estética:

* premium
* moderna
* limpia
* minimalista
* ecommerce DTC
* profesional
* mobile-first
* visualmente atractiva
* con buena jerarquía tipográfica
* con mucho espacio en blanco
* imágenes grandes y protagonistas
* bordes suaves
* sombras muy discretas
* animaciones suaves
* CTA claramente visibles

Debe sentirse como una marca real.

NO quiero:

* colores excesivamente saturados
* exceso de tarjetas
* exceso de bordes
* gradients baratos
* sombras exageradas
* emojis como decoración
* textos gigantes sin propósito
* interfaces que parezcan dashboards
* estética de plantilla genérica
* diseño excesivamente recargado

# ESTRUCTURA DE LA LANDING

Quiero que la landing siga aproximadamente esta lógica:

1. BARRA SUPERIOR

---

Una barra muy discreta con información real.

Ejemplos:

"Envíos a toda Colombia"
"Compra segura"
"Soporte por WhatsApp"

NO usar:

"¡¡OFERTA TERMINA EN 05:32!!"

NO crear urgencia artificial.

NO usar countdowns gigantes.

NO usar "últimas unidades" si no existe información real que lo demuestre.

2. HEADER

---

Mantener el header actual pero hacerlo visualmente más profesional.

Debe incluir:

* logo
* navegación cuando corresponda
* carrito
* menú móvil
* información de envío si está configurada

No hacer un header gigantesco.

3. HERO

---

Este es uno de los puntos más importantes.

Usar un layout de ecommerce premium:

IZQUIERDA:

* galería de producto grande
* thumbnails o navegación clara
* soporte para múltiples imágenes

DERECHA:

* pequeño eyebrow
* H1 del producto
* valoración solamente si existe información real
* descripción breve
* precio real de Shopify
* información de envío
* métodos de pago disponibles
* garantía si está configurada
* CTA principal
* WhatsApp si está configurado

El producto debe ser el protagonista.

El CTA debe ser muy claro.

Ejemplo conceptual:

"Comprar ahora"

o

"Agregar al carrito"

No utilizar copy agresivo.

4. TRUST BAR

---

Mantener una barra visual de confianza.

Por ejemplo:

✓ Compra segura
✓ Envíos a Colombia
✓ Soporte por WhatsApp
✓ Garantía

Pero únicamente mostrar afirmaciones que realmente estén configuradas.

5. PROBLEMA

---

Crear una sección visual que explique el problema que el producto resuelve.

No hacer una lista genérica de marketing.

Debe hablar de situaciones reales del usuario.

Idealmente:

imagen/lifestyle + texto

6. SOLUCIÓN

---

Mostrar el producto como solución.

Layout editorial:

imagen grande + explicación.

Explicar:

* cómo funciona
* qué hace
* por qué es útil
* qué diferencia tiene

Evitar superlativos imposibles de demostrar.

NO escribir:

"El mejor producto del mercado"

"Resultados garantizados"

"99,9% de eficacia"

si no existe una fuente verificable.

7. BENEFICIOS

---

Mostrar 3-5 beneficios principales.

No repetir características técnicas.

Diferenciar:

CARACTERÍSTICA:
"Tanque de X ml"

BENEFICIO:
"Puedes usarlo durante más tiempo sin tener que rellenarlo constantemente."

La presentación debe ser visual.

8. PRODUCTO EN USO

---

Esta sección es muy importante.

Quiero imágenes del producto siendo utilizado en situaciones reales.

Ejemplos:

* persona utilizando el producto
* producto en una casa
* producto sobre una mesa
* producto siendo utilizado correctamente

Las imágenes deben parecer lifestyle/product photography, no únicamente renders aislados.

No inventar imágenes de clientes reales.

9. CÓMO FUNCIONA

---

Mostrar 3 pasos simples.

Ejemplo:

1. Elige tu presentación
2. Realiza tu pedido
3. Recibe el producto

O, si el producto requiere instalación/uso:

1. Preparar
2. Usar
3. Obtener el resultado

La sección debe ser visual y muy sencilla.

10. QUÉ RECIBES

---

Mostrar:

* producto
* accesorios
* manual
* componentes

Únicamente si realmente forman parte del producto.

11. OFERTA / PAQUETES

---

Mantener la lógica actual de:

theme/sections/landing-offer.liquid

NO escribir precios manualmente.

Los precios deben seguir saliendo de Shopify.

Las variantes deben seguir siendo la fuente de verdad.

Diseñar las opciones como tarjetas premium.

Ejemplo conceptual:

┌──────────────────────┐
│  1 unidad            │
│  $XX.XXX             │
│  Comprar             │
└──────────────────────┘

┌──────────────────────┐
│  2 unidades          │
│  $XX.XXX             │
│  Comprar             │
└──────────────────────┘

┌──────────────────────┐
│  3 unidades          │
│  $XX.XXX             │
│  Comprar             │
└──────────────────────┘

Si existe descuento real en Shopify, mostrarlo.

NO inventar descuentos.

NO crear descuentos ficticios solamente para hacer que la landing parezca más agresiva.

12. ENVÍOS

---

Quiero una sección de logística mucho más confiable.

Mostrar claramente:

* zonas
* tiempos reales
* información de despacho
* seguimiento cuando esté disponible
* transportadoras únicamente si realmente se utilizan

NO inventar transportadoras.

NO inventar tiempos de entrega.

NO decir "entrega garantizada en 24 horas" si no está verificado.

La claridad logística es una herramienta de confianza.

13. GARANTÍA

---

Diseñar una sección visual que explique:

* garantía
* cambios
* devoluciones
* soporte

Pero utilizar únicamente la información configurada realmente en Shopify.

No inventar una garantía de 30 días, 90 días, etc.

14. RESEÑAS

---

Mantener el sistema actual.

Las reseñas demo deben continuar identificándose como demo/ficticias.

Nunca convertir contenido ficticio en una reseña que parezca real.

Cuando existan reseñas reales, deben poder mostrarse correctamente.

Priorizar:

* rating
* comentario
* nombre
* ubicación
* fotografía si existe

Diseñar las cards de forma mucho más premium.

15. UGC

---

Mantener la sección para contenido generado por usuarios.

Pero no presentar imágenes de stock como si fueran clientes.

Si no existe UGC real, la sección puede quedar vacía o mostrarse de manera discreta.

16. FAQ

---

Crear un acordeón elegante.

Mantener <details> nativo siempre que sea posible.

No añadir JavaScript innecesario.

Preguntas recomendadas:

* ¿Cuánto tarda el envío?
* ¿Cómo puedo pagar?
* ¿Qué métodos de pago aceptan?
* ¿Tiene garantía?
* ¿Cómo hago seguimiento?
* ¿Qué incluye el paquete?
* ¿Puedo cambiar o devolver el producto?

Las respuestas deben venir de información real.

17. CTA FINAL

---

Una última sección muy limpia.

Debe tener:

* producto/beneficio principal
* resumen breve
* precio si corresponde
* CTA
* confianza
* WhatsApp si está configurado

No usar countdown.

No usar "compra ahora antes de que desaparezca".

No usar presión artificial.

18. STICKY CTA

---

Mantener el sticky CTA móvil existente.

Debe aparecer únicamente cuando el CTA principal está fuera de pantalla.

Debe ser pequeño y elegante.

No debe tapar contenido.

No convertirlo en una barra enorme.

# FOOTER

El footer actual es demasiado básico.

Mejorarlo considerablemente.

Debe tener:

* logo/nombre de marca
* descripción corta
* navegación
* ayuda
* contacto
* WhatsApp
* políticas
* envíos
* cambios/devoluciones
* métodos de pago
* copyright

Debe transmitir que existe una empresa real detrás de la tienda.

# GLOBAL DESIGN SYSTEM

Revisar:

theme/assets/critical.css

y mejorar:

* escala tipográfica
* spacing
* cards
* botones
* bordes
* sombras
* responsive
* sección alternada
* jerarquía visual
* estados hover
* focus states

Mantener variables CSS y el sistema existente.

No llenar cada sección con CSS duplicado si una regla global puede resolverlo.

# RESPONSIVE

Mobile es prioritario.

En móvil:

* hero debe ser excelente
* galería debe ser usable
* CTA debe ser muy visible
* texto no demasiado grande
* botones mínimo 44px
* imágenes no deben romper el layout
* cards deben apilarse correctamente
* sticky CTA debe funcionar
* FAQ debe ser cómodo
* no debe existir scroll horizontal accidental

# DESKTOP

En desktop quiero aprovechar el ancho disponible sin crear una página excesivamente ancha.

La página debe parecer editorial y premium.

# ANIMACIONES

Ya existe:

theme/assets/landing.js

NO reemplazarlo sin necesidad.

Ya existe:

* IntersectionObserver
* reveal animations
* carousel
* sticky CTA
* offer selection

Conservarlo.

Agregar animaciones únicamente si realmente mejoran UX.

Quiero:

* fade
* translate suave
* hover discreto
* transición de imágenes
* interacción de tarjetas

NO quiero:

* rebotes
* animaciones constantes
* parallax excesivo
* contadores
* loaders innecesarios
* efectos que perjudiquen performance

# CREDIBILIDAD — REGLA ABSOLUTA

No inventar:

* número de clientes
* reseñas
* nombres de clientes
* ciudades de clientes
* estadísticas
* certificaciones
* garantías
* descuentos
* precios
* transportadoras
* tiempos de entrega
* métodos de pago
* características técnicas
* resultados científicos
* porcentajes de efectividad

Si un dato no existe:

1. usa el dato dinámico de Shopify si existe
2. usa una configuración del theme si existe
3. deja un placeholder claramente identificable
4. no inventes el dato

# IMPORTANTE SOBRE URGENCIA

NO quiero:

* countdown gigante
* "la oferta termina hoy"
* "últimas unidades"
* "compra antes de que se agote"
* barras de urgencia falsas
* popups agresivos

La conversión debe venir principalmente de:

* buena presentación
* claridad
* confianza
* producto bien mostrado
* beneficios
* precio claro
* logística clara
* garantía
* reseñas reales
* FAQ
* buen CTA

# ARQUITECTURA

NO romper:

* Shopify product object
* variantes
* carrito
* checkout nativo
* product form
* payment icons
* WhatsApp
* reviews
* metaobjects
* metafields
* structured data
* responsive image system
* accessibility
* theme editor

Especialmente NO reemplazar la lógica de precios de:

theme/sections/landing-offer.liquid

Los precios deben seguir viniendo de Shopify.

# RESEÑAS

NO eliminar:

is_demo

ni la lógica que impide que las reseñas ficticias se presenten como reales.

# PERFORMANCE

Mantener la optimización existente.

Especialmente:

* LCP
* responsive images
* lazy loading cuando corresponda
* primera imagen del hero como prioridad
* no cargar librerías innecesarias
* no introducir frameworks
* no introducir dependencias si no son necesarias

El proyecto actualmente utiliza JavaScript vanilla para la landing.

Mantenerlo así salvo que exista una razón técnica fuerte.

# SHOPIFY THEME EDITOR

Todas las secciones deben seguir funcionando desde el Theme Editor.

Quiero poder:

* añadir
* eliminar
* mover
* configurar

las secciones sin editar código.

Si agregas nuevas configuraciones visuales, deben aparecer correctamente en el schema de cada sección.

No hardcodear contenido que debería ser configurable.

# ORDEN DE TRABAJO

Antes de modificar:

1. Analiza todos los archivos relevantes.
2. Entiende cómo se conectan entre sí.
3. Identifica qué estilos ya existen.
4. Identifica qué funcionalidad ya existe.
5. No dupliques funcionalidades.

Después:

1. Mejora primero el sistema visual global.
2. Mejora header/footer.
3. Mejora hero.
4. Mejora las secciones principales.
5. Mejora oferta.
6. Mejora confianza/envíos/garantía.
7. Mejora reviews.
8. Mejora FAQ.
9. Mejora CTA/sticky CTA.
10. Revisa responsive.

# VALIDACIÓN

Después de realizar los cambios ejecuta:

npx shopify theme check --path theme

y

npx prettier --check .

Corrige cualquier error.

También revisa:

* Liquid válido
* schemas válidos
* JSON válido
* accesibilidad
* responsive
* ausencia de overflow horizontal
* botones funcionales
* variantes funcionales
* carrito funcional
* CTA sticky funcional
* carrusel funcional
* reduced motion

# IMPORTANTE

NO quiero solamente que cambies colores.

Quiero una mejora integral de la experiencia visual.

Piensa como:

Senior Shopify Theme Developer
+
Senior UI/UX Designer
+
Ecommerce Conversion Designer

La referencia visual que debes perseguir es:

"marca colombiana de ecommerce moderna y confiable"

y no:

"landing de dropshipping genérica".

Antes de terminar, revisa la página completa como si fueras un cliente colombiano que nunca ha visto la marca.

Pregúntate:

"¿Esto parece una tienda real en la que confiaría mi dinero?"

Si alguna parte parece improvisada, genérica, agresiva o falsa, mejórala.

NO hagas cambios innecesarios a la arquitectura.

Prioriza calidad visual, confianza y conversión sin sacrificar mantenibilidad.
