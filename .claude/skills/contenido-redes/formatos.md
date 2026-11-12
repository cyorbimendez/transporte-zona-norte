# Recetas por canal

Datos de contacto: siempre de `src/config.js` (`negocio.whatsapp`,
`negocio.whatsappVisible`, `negocio.facebook`, `negocio.instagram`).

## Facebook — publicación con foto o video

Forma (es la del caption que el dueño escribió y aprobó):

```
<Gancho: lo que se ve, una línea.> <1-2 emojis>

En Transportes Treinta <el servicio que corresponde a la foto, con las palabras de `cargas` en config.js>.

¿Necesita transportar su carga? Solicite su cotización por WhatsApp:
📲 8552 8204
https://wa.me/50685528204

Indíquenos el origen, el destino, el tipo de carga y la fecha del servicio.

#TransportesTreinta #<2 o 3 más>
```

- Si la publicación es de un solo tipo de carga, se puede cambiar el link
  de WhatsApp por el cotizador ya lleno:
  `https://transportestreinta.com/cotizar?carga=<id>`. Los `id` válidos
  están en `cargas` de config.js. El mensaje llega con la marca
  `*Cotización desde la página web*`.
- Hashtags: 3 o 4, relacionados con la foto. Opciones: `#TransportesTreinta`,
  `#Transportes30`, `#TransporteDeCarga`, `#Fletes`, `#SanCarlos`,
  `#ZonaNorte`, `#CostaRica`, `#TransporteAgrícola`. Meta reduce el
  alcance cuando hay demasiados hashtags o no tienen que ver con la foto.

## Instagram

Igual que Facebook, con dos cambios: los links del texto no se pueden
tocar, así que el cierre es `📲 WhatsApp 8552 8204 · enlace en el perfil`,
y se pueden usar hasta 5 hashtags.

## Reel o video corto

- **Formatos:** vertical 9:16 de 1080×1920 (Reels, Stories y estados) y
  4:5 de 1080×1350 (feed).
- **Duración:** de 7 a 15 s. La carga se ve desde el primer segundo.
- **Texto encima:** 2 o 3 tarjetas, de 5 palabras como máximo cada una,
  con mayúscula solo al inicio y punto final. Última tarjeta:
  `Cotice su transporte` / `WhatsApp 8552 8204` / `Pital, San Carlos · Toda Costa Rica`.
- **Zona segura (1080×1920):** el texto va dentro de x 80–820 e
  y 300–1200. Abajo y a la derecha quedan los botones de la app.
- **Sin sonido:** el video tiene que entenderse sin audio.
- **Música:** no meter canciones con derechos en el archivo. Se agregan
  desde la biblioteca de música de Facebook o Instagram al publicar. Si
  se deja el audio original, anotar en `notas.md` → Pendiente que una
  persona lo escuche antes de publicar.
- **Archivo:** si el video es de otro día, no decir que es de hoy.

## Estado de WhatsApp

Quien lo ve ya tiene el número. Son 1 a 3 líneas:

```
<Gancho de la foto.> 🚛
¿Necesita transportar su carga? Responda este estado y le cotizamos.
```

Se puede agregar el link de la publicación de Facebook o de
`https://transportestreinta.com`.

## Perfil de Empresa de Google (Novedades)

- **Perfil sin verificar:** si `negocio.google` es `null` en config.js,
  el perfil no está verificado. Dejar el texto listo y anotar en
  Pendiente que se publica cuando Google lo verifique.
- **Lo importante primero:** la vista previa corta el texto después de
  la primera o segunda línea. El máximo es de 1500 caracteres.
- **Sin teléfono ni links en el texto:** Google puede rechazar la
  publicación. Se usa el botón: **Llamar**, o **Más información** con
  `https://transportestreinta.com/cotizar?carga=<id>`.
- **Palabras clave:** "transporte de carga", "fletes", "Pital, San
  Carlos", "Zona Norte". Cada una una vez, donde caiga natural.
- **Foto:** una foto real del trabajo.

## Respuesta a una reseña (Google o Facebook)

- **Reseña positiva:** agradecer con el nombre que muestra la reseña.
  Mencionar el trabajo solo si la persona lo mencionó. Firmar:
  `Nelson — Transportes Treinta`.
- **Reseña negativa:** agradecer, sin discutir ni dar detalles del
  viaje en público. Invitar a resolverlo por WhatsApp al 8552 8204.
- **Pedir reseñas:** con el link de `negocio.google` si existe; si no,
  con el de Facebook. Nunca a cambio de un descuento o un regalo.

## Imagen o gráfico (edición de foto o prompt para generar)

- **Foto real primero:** partir de una foto real con ajustes suaves
  (luz, color, recorte). Una escena inventada del camión engaña al
  cliente.
- **Camión idéntico al de la foto:** el prompt pide conservarlo igual.
  Es un camión rígido, no un cabezal con remolque, con un eje delantero
  y dos traseros en tándem (tres ejes), y el mismo color, visera,
  parrilla y plataforma. Sin logos, letras ni placas inventadas.
- **Fondo:** recortar en vez de regenerar. Montañas, volcanes y edificios
  conservan la forma y el lugar que tienen en la foto. No agregar
  paisaje.
- **Carga:** solo la que se ve. Sin sacos, rótulos ni amarres de más.
- **Texto en el gráfico:** el prompt lleva la lista exacta del texto. El
  número `8552 8204` sí va. Links, `fb.com`, `@usuario` y códigos QR no
  van en la imagen: van en el caption.
- **Colores:** verde `#10462f`, verde oscuro `#0a2e1f`, dorado `#f2b10c`
  y blanco. El verde WhatsApp (`#25d366`) solo para el botón de contacto.
  Salen de `src/theme.js`.
- **Formatos:** feed 4:5 (1080×1350); Reels y estados 9:16 (1080×1920).
- **Revisión:** antes de entregar, comparar con la foto original los
  ejes, la carga, el fondo y la ortografía de cada palabra.
