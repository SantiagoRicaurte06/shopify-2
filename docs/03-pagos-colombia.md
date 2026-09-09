# Pagos en Colombia

## El punto de partida

**Colombia no está entre los países soportados por Shopify Payments.** De
Latinoamérica solo aparece México. Si tu país no está en la lista, hay que usar
una pasarela de terceros.
→ [países soportados](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries)

No es una limitación evitable: es la razón por la que hay que elegir pasarela.

---

## Decisión tomada

**Wompi como pasarela única, sin contraentrega.**

Wompi es la pasarela de Bancolombia y la única con página oficial de plugin de
Shopify localizable.
→ [plugin de Shopify de Wompi](https://docs.wompi.co/en/docs/colombia/wompi-shopify-plugin/)

### Medios que soporta Wompi en Colombia

Leído en su documentación oficial de métodos de pago
([docs.wompi.co](https://docs.wompi.co/docs/colombia/metodos-de-pago/)):

| Identificador          | Medio                                  |
| ---------------------- | -------------------------------------- |
| `CARD`                 | Tarjeta de crédito y débito            |
| `PSE`                  | Transferencia bancaria por PSE         |
| `NEQUI`                | Nequi                                  |
| `DAVIPLATA`            | Daviplata                              |
| `BANCOLOMBIA_TRANSFER` | Transferencia desde cuenta Bancolombia |
| `BANCOLOMBIA_QR`       | Pago con QR de Bancolombia             |
| `BANCOLOMBIA_COLLECT`  | Efectivo en corresponsales bancarios   |
| `BANCOLOMBIA_BNPL`     | Cuatro cuotas sin interés              |
| `SU_PLUS`              | Pago a cuotas SU+                      |
| `PCOL`                 | Redención de Puntos Colombia           |

Esto cubre tarjeta, transferencia, billeteras, efectivo y financiación. **Addi
queda fuera del plan**: la financiación ya está cubierta por la propia pasarela,
y Addi exige constituir persona jurídica y aportar documentación societaria.

### Instalación

Los pasos, según la documentación de Wompi:

1. Entrar al enlace de instalación que da Wompi para acceder a los ajustes de
   pagos de tu tienda.
2. Wompi aparece como opción de pago. Pulsar **Connect**.
3. **Install App**.
4. Introducir las llaves **de producción** (pública y privada), que están en
   Wompi en _Desarrolladores_. Pulsar **Connect**.
5. Confirmar.
6. Introducir las credenciales de **sandbox** y conectar en modo de pruebas.
7. Elegir qué medios de pago se muestran en el checkout.
8. **Activar**.

Dos avisos de la propia documentación: usa las llaves de producción cuando
salgas a producción, no las de sandbox, y configura los webhooks aparte para las
notificaciones de transacción.

---

## Sin contraentrega: qué implica

La contraentrega es un **método de pago manual nativo** de Shopify (_Configuración
→ Pagos → Métodos de pago manuales → Pago contra entrega_). El pedido queda en
estado **Pendiente** hasta que lo marcas como pagado a mano.
→ [contra entrega](https://help.shopify.com/en/manual/payments/cash-on-delivery/activate-or-deactivate)
· [métodos manuales](https://help.shopify.com/en/manual/payments/manual-payments)

**Se ha decidido no activarla.** Consecuencias, dichas claramente:

- **A favor:** cobras antes de despachar. Desaparecen las devoluciones por
  rechazo en puerta, que son el mayor coste oculto del canal contraentrega.
- **En contra:** el canal Dropi es mayoritariamente contraentrega, y el comprador
  de ese canal suele esperar pagar al recibir. Es previsible que la conversión
  sea menor que la de un competidor que sí la ofrece.

El theme queda preparado por si cambias de idea: activar el método manual en el
admin y marcar la casilla correspondiente en los ajustes. No hay que reescribir
ninguna sección.

Mientras tanto, **el theme no dice en ningún sitio «paga al recibir»**. Los
mensajes de confianza se apoyan en lo que Wompi sí cubre.

---

## Otras pasarelas

Existen y funcionan con Shopify. No se han evaluado a fondo porque la decisión ya
está tomada, pero quedan aquí por si hace falta comparar:

| Proveedor    | Nota                                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| PayU Latam   | Tarjetas, PSE, efectivo, cuotas                                                                                                    |
| Mercado Pago | Tarjetas, PSE, cuotas, monedero                                                                                                    |
| ePayco       | Tarjetas, PSE, efectivo                                                                                                            |
| Addi         | Financiación sin tarjeta. Requiere persona jurídica y documentación societaria. [Ficha](https://apps.shopify.com/addi-payment-app) |

---

## Comisiones

**No aparece ninguna cifra en esta documentación, a propósito.** Las que circulan
en blogs no son tarifarios oficiales y cambian. Consúltalas tú antes de decidir:

- Wompi: https://wompi.com/
- PayU: https://colombia.payu.com/
- Mercado Pago: https://www.mercadopago.com.co/
- ePayco: https://epayco.com/

Cuando las tengas, anótalas aquí con la fecha en que las consultaste.

---

## Configuración en los ajustes del theme

En _Medios de pago_, marca **solo** los que tengas realmente activos en Wompi.
El aviso del propio editor lo dice: mostrar un medio que no ofreces es
publicidad engañosa.

Por defecto vienen marcados tarjeta, PSE, Nequi y Bancolombia. Daviplata,
efectivo en corresponsales y pago a cuotas vienen desmarcados porque dependen de
lo que actives en tu cuenta.
