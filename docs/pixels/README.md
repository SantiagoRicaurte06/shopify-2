# Seguimiento

## La regla

**El theme no carga ningún pixel.** Ni uno.

No es una omisión: es lo único que garantiza que los eventos no se cuenten dos
veces. Si un pixel está en el theme _y_ además el canal oficial está conectado,
cada acción se registra por partida doble, la campaña optimiza sobre datos falsos
y el coste por adquisición que ves no es real.

La arquitectura vigente de Shopify es la **Web Pixels API / Eventos de cliente**:
los pixels corren en un sandbox y se suscriben a los eventos.
→ [Web Pixels API](https://shopify.dev/docs/api/web-pixels-api)

## Dónde va cada cosa

| Herramienta                     | Dónde se configura                                                                             |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Meta (Facebook e Instagram)** | Canal oficial de Meta en Shopify. Pixel de navegador más API de conversiones del lado servidor |
| **TikTok**                      | Canal oficial de TikTok en Shopify                                                             |
| **Google**                      | Canal oficial de Google y YouTube                                                              |
| **Cualquier otra**              | Custom Pixel en _Configuración → Eventos de cliente_                                           |

Para la última opción tienes
[`custom-pixel-template.js`](custom-pixel-template.js): pégalo en el admin,
rellena las constantes y borra los eventos que no necesites.

## Lo que hay que comprobar

Después de conectarlo todo, **abre el panel de Meta y el de TikTok y comprueba
que los eventos no llegan duplicados**.

La deduplicación entre el pixel de navegador y la API de conversiones se hace por
`event_id`. Ese comportamiento pertenece a Meta y a TikTok, no a Shopify, y **no
está verificado en esta documentación**. Confírmalo en sus paneles antes de
gastar presupuesto.

## Si algún día alguien quiere pegar un pixel en el theme

No lo hagas. Vuelve a leer el primer párrafo.
