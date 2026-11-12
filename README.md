# Transportes Treinta — sitio web

## Visibilidad y medición — noviembre de 2026

Mejora local del 6 de noviembre: Inicio reutiliza los enlaces de servicios
junto al selector de carga. Las tres páginas de servicio repiten Cotizar,
WhatsApp y Llamar después de las preguntas frecuentes, con el tipo de carga
preseleccionado y la medición de contacto existente. No agrega eventos ni
envía datos del formulario a Analytics. Respaldo de los dos componentes en
`output/leads-2026-11-06/antes/`. Estos cambios requieren publicación para
aparecer en el dominio oficial.

El sitio incorpora tres páginas de servicio con contenido pre-renderizado:
`/fletes-san-carlos`, `/transporte-pina-yuca` y
`/transporte-maquinaria-materiales`. Se enlazan desde Servicios y el pie,
y el build las incluye en el sitemap. Cada una tiene canonical, descripción,
datos de Service y preguntas frecuentes que también se ven en la página.
Las fotos describen la carga mostrada; no se inventan clientes, fechas ni rutas.

La propiedad GA4 es `562767634`, stream `16282064349`, medición
`G-57MSCT9L7E`, en la cuenta del negocio. `src/analitica.js` permite solo
eventos y parámetros explícitos: `quote_start`, `quote_step`, `quote_review`,
`whatsapp_click`, `phone_click` y `review_click`. Nombres, direcciones libres,
descripciones y texto del mensaje no forman parte de estos eventos. Las URLs
se envían sin query ni fragmento. Google Analytics se carga solo en el dominio
oficial y después de que el visitante permita la analítica. Las estadísticas
locales y de previews no entran en GA4. La medición automática mejorada está
desactivada en el stream para evitar capturar URLs de WhatsApp con mensajes.

En GA4, `whatsapp_click` y `phone_click` están marcados como eventos clave,
sin valor monetario y una vez por sesión. Son intentos de contacto: el sitio
no puede confirmar que el cliente envió el mensaje, recibió respuesta o
contrató el viaje. `quote_review` significa que llegó a revisar su cotización.
Vercel conserva las estadísticas generales sin enviar los parámetros de URL.

Search Console usa la etiqueta de verificación en `index.html`. No quitarla.
La propiedad es `https://transportestreinta.com/` y el sitemap es
`https://transportestreinta.com/sitemap.xml`. Se verificó la propiedad y Google
leyó las nueve páginas el 5 de noviembre de 2026.

El perfil de Google Maps está enlazado con el CID `15081357595470814468`.
Su categoría primaria ya es Trucking company, con Transportation service como
secundaria. Google pide verificarlo mediante video del lugar, equipo y prueba
de gestión. La verificación se dejó pendiente por indicación del usuario.
El enlace directo para pedir reseñas queda en `negocio.googleResena`: no
inventar uno. Hasta que Google lo proporcione, la invitación de reseñas usa
Facebook. No agregar testimonios ni estrellas inventadas.

### Enlaces para publicaciones y perfiles

Usar estos enlaces en publicaciones futuras; no editar las publicaciones de
otras personas ni enviar mensajes automáticamente:

- Perfil de Google: https://transportestreinta.com/?utm_source=google&utm_medium=organic&utm_campaign=perfil-google
- Piña en Facebook: https://transportestreinta.com/transporte-pina-yuca?utm_source=facebook&utm_medium=social&utm_campaign=pina-noviembre-2026
- Servicios en Facebook: https://transportestreinta.com/servicios?utm_source=facebook&utm_medium=social&utm_campaign=servicios-noviembre-2026
- Biografía de Instagram: https://transportestreinta.com/?utm_source=instagram&utm_medium=social&utm_campaign=instagram-bio
- Estado de WhatsApp: https://transportestreinta.com/cotizar?utm_source=whatsapp&utm_medium=social&utm_campaign=whatsapp-estado

Las campañas aceptadas están en `atribucionSegura`; al lanzar otra campaña,
añadir su identificador público ahí. El enlace anterior `google_perfil` se
normaliza a Google para mantener compatibilidad mientras se actualiza el perfil.

### Seguimiento de negocio

Para excluir visitas propias en un navegador, abrir una vez
`https://transportestreinta.com/?tt_internal=1`. Ese navegador deja de cargar
Google Analytics, Vercel Web Analytics y Speed Insights; la exclusión persiste
aunque cambie la IP. Repetir en cada navegador o dispositivo propio. Para
volver a medirlo, abrir `https://transportestreinta.com/?tt_internal=0` y
permitir la analítica de nuevo si se desea. Borrar los datos del sitio o usar
incógnito elimina esta exclusión. No compartir el enlace de exclusión con clientes.
No modifica retrospectivamente las estadísticas ya recibidas.

Nelson debe registrar la referencia TT de cada consulta recibida, la fuente,
si cotizó, si se contrató y el valor del viaje. No copiar esos datos a Analytics.
Comparar semanalmente visitas de Costa Rica, consultas recibidas y viajes
contratados por fuente. Antes de atribuir crecimiento, separar pruebas y
visitas propias. Una referencia se genera en el navegador; no es una reserva.

### Verificar cambios

`pnpm build` pre-renderiza el sitio y `pnpm validate` comprueba privacidad de
eventos, consentimiento, páginas, imágenes, enlaces, canonicals y JSON-LD.
Probar además un recorrido completo del cotizador a 390 px y el control de
preferencias. El respaldo anterior está en
`output/visibilidad-2026-11-05/antes/` y no se sube a Vercel.

Página estática de captación de clientes. El formulario de cotización no
tiene backend: arma un mensaje de WhatsApp y lo abre. Cero base de datos,
cero costo mensual, cero cosas que se caigan un domingo.

## Correr localmente

El proyecto usa **Node 24** y **pnpm 11** (el lockfile es `pnpm-lock.yaml`). Si `pnpm`
no está instalado en la compu, `npx pnpm@11 …` hace lo mismo.

```bash
pnpm install
pnpm dev         # http://localhost:5173
```

`package.json` fija la versión de Node para Vercel y la versión de pnpm
para que la instalación local y la de producción coincidan.

## Publicar (Vercel)

El dominio `transportestreinta.com` está en Vercel, enlazado en `.vercel/`.
Vercel instala y construye en su servidor con lo que dice `vercel.json`
(`pnpm install --frozen-lockfile` + `pnpm run build`, salida `dist/`).

```bash
pnpm build               # compila y pre-renderiza cada página (ver abajo)
npx vite preview         # ver la versión final en http://localhost:4173
npx vercel               # vista previa con URL propia (no toca el dominio)
npx vercel --prod        # publicar en transportestreinta.com
```

`.vercelignore` deja fuera `output/`, `assets/` y las fotos de trabajo:
no hacen falta para construir y solo hacen lenta la subida.

`vercel.json` también define caché larga para `/assets/` (nombres con
hash) y de un día para `/img/`, más encabezados de seguridad básicos.
Con `cleanUrls`, `/servicios` sirve `servicios.html`; una ruta que no
existe sirve `404.html` con estado 404 real (no hay redirección al inicio).

## Antes de publicar — lista de verificación

1. **`src/config.js`** — el número de WhatsApp en formato `506XXXXXXXX`
   (sin `+`, sin espacios, sin guiones), el nombre del negocio, el
   teléfono, el correo, el horario y las zonas reales. De aquí sale
   también el JSON-LD para Google: nombre, teléfono y zona tienen que
   coincidir letra por letra con el Perfil de Empresa de Google.
2. **`src/seo.js`** — el título y la descripción de cada página.
3. **`public/img/`** — las fotos de los camiones (ver `LEEME.txt`).
4. **Probar el botón de WhatsApp desde un celular real**, no desde el
   escritorio. Es la única función del sitio.

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Portada: acciones rápidas, selector de carga, explorador de rutas, fotos en ruta, Nelson, Facebook y preguntas frecuentes |
| `/servicios` | Tipos de carga, el camión, cómo trabajamos, lo que no llevamos, piña/yuca y maquinaria a domicilio |
| `/cobertura` | Rótulo de rutas desde Pital con tiempos aproximados |
| `/sobre-nosotros` | Historia, fotos del camión, reseñas, contacto |
| `/cotizar` | Cotizador en 4 pasos que termina en WhatsApp |

En celular hay barra inferior con el botón amarillo **Cotizar** al
centro. En escritorio, menú arriba.

### Links que abren el cotizador ya lleno

Sirven para publicaciones de Facebook o estados de WhatsApp:

```
https://transportestreinta.com/cotizar?carga=agricola
https://transportestreinta.com/cotizar?destino=Puerto%20Caldera
https://transportestreinta.com/cotizar?carga=maquinaria&destino=Guanacaste
```

`carga` acepta: `agricola`, `construccion`, `maquinaria`,
`contenedor`, `general`, `otro`. También `fecha=AAAA-MM-DD`.

## Datos que se editan en `src/config.js`

- `resenas` — reseñas **reales**. Vacío = se muestra la invitación a
  dejar reseña (en Google si `negocio.google` tiene link; si no, Facebook).
- `camion.datos` — medidas y capacidad de carga (20+ t).
- `proceso` / `queSigue` — lo que se le promete al cliente. Fotos de
  la carga: solo si las pide.

El calendario del cotizador es solo para elegir el día: no muestra
disponibilidad. La fecha se confirma por WhatsApp.

## Fotos

Después de agregar o cambiar una foto en `public/img/`:

```bash
pnpm img:mini     # miniaturas livianas para tarjetas (public/img/mini/)
```

## Marca y fotografías

El logo entregado de **Transportes Treinta 30** se usa en el encabezado y
el pie mediante `Marca` (`src/components/ui.jsx`). Las versiones con
transparencia, recortadas al contenido y optimizadas, están en
`public/img/marca/`. `Logo30` usa el 30 extraído del original para espacios
cuadrados; también aparece en el favicon y el ícono de inicio del celular.

Se seleccionaron cuatro fotografías de la carpeta de material del negocio:
carga en carretera, carga con lona, carga en sacos y piña en carretera.
Están en WebP con miniaturas en `public/img/mini/`. `trabajos` y `galeria`
en `src/config.js` controlan las fotos de Inicio y Nosotros; las tarjetas
de Servicios y el cotizador reutilizan esas mismas imágenes.

Los afiches con texto, la publicación de septiembre y los videos quedan
como material para redes. No se cargan en la web. La vista previa al
compartir el sitio usa `public/img/og-treinta30.jpg`, con el logo nuevo.

## Movimiento e interacciones

Motion anima las entradas de las secciones de Inicio, los cambios de página
y los pasos del cotizador. Las tarjetas y botones tienen respuestas al
pasar el cursor o pulsar. El color verde, el amarillo de Cotizar y el logo
original se mantienen, con tarjetas más suaves y esquinas redondeadas.

Las fotos de Inicio y Nosotros abren un visor ampliado con botones, flechas
del teclado y deslizamiento. Escape cierra el visor y devuelve el foco a la
foto de origen. Las fotos grandes se cargan al abrirlas; las tarjetas siguen
usando miniaturas.

### Explorar antes de cotizar

`SelectorCarga` se comparte entre Inicio y Servicios: seis opciones siempre
visibles, una foto que cambia con la selección y un enlace de cotización
con el tipo de carga elegido. Motion desplaza el resaltado, cruza las fotos
y adapta el panel. Todas las descripciones siguen en el HTML de cada página.

`ExploradorRutas` se comparte entre Inicio y Cobertura. Conserva el rótulo
verde en escritorio; en celular usa un selector nativo para elegir destino.
Al cambiar de zona, el mapa acerca la Zona Norte o muestra el país completo.
La ruta se dibuja desde Pital y **Cotizar esta ruta** lleva el destino al
formulario. El mapa y los tiempos son ilustrativos: no hay navegación GPS,
consulta de disponibilidad ni llamadas a un servicio de mapas.

El contorno local `src/data/mapa-costa-rica.json` viene de Natural Earth
1:50m, de dominio público. Su URL de origen queda dentro del archivo:
https://www.naturalearthdata.com/about/terms-of-use/

La fecha se elige en el cotizador, después de la carga y la ruta. Sus etapas
tienen nombre y un indicador móvil; las selecciones aparecen como etiquetas
editables durante el recorrido. El botón final sigue siendo un enlace real
a WhatsApp. Las fotos ahora usan una composición con una imagen principal
y otras de apoyo; el visor comparte la posición de la miniatura para ampliar
y cerrar la imagen. La navegación móvil también desplaza su indicador activo.

La copia previa a esta segunda etapa está en
`output/experiencia-motion-2026-10-30/antes/`.

`src/components/movimiento.jsx` centraliza la configuración. Respeta
`prefers-reduced-motion`: omite desplazamientos y las transiciones del
cotizador y del visor. Si se activa esa preferencia durante una entrada,
el contenido queda completamente visible. El HTML pre-renderizado tampoco
empieza oculto. `movimiento-features.js` carga las funciones completas de
Motion en un archivo separado después del primer render.

La actualización de octubre de 2026 usa React 19.3.1, MUI 9.5.0,
React Router 8.5.1, Vite 8.3.5 y Motion 14.9.0. Se migraron los Grid de MUI
al atributo `size` y las propiedades de estilo a `sx`.

La copia local anterior a esta actualización está en
`output/modernizacion-motion-2026-10-30/antes/`, incluyendo `src/`, scripts,
configuración y lockfile. Para volver a esa versión, restaurar esos archivos
y ejecutar `pnpm install --frozen-lockfile` y `pnpm build`. `output/` está
excluido de la publicación.

## Vista previa de Facebook

La portada muestra una tarjeta de Facebook después de Nelson y antes de
las preguntas frecuentes (`src/components/FacebookPreview.jsx`). Usa el
enlace de `negocio.facebook` en `src/config.js`, el logo del sitio y una
foto local del camión: esa portada y el texto se actualizan manualmente.
En Nosotros, debajo de la galería, hay otro enlace para ver más fotos.

El plugin oficial de Facebook se carga solo al tocar **Mostrar perfil de
Facebook** y muestra una vista compacta con el botón Seguir. No usa SDK,
tokens ni servicios de pago. La tarjeta y
**Ver en Facebook** siguen disponibles si el plugin no muestra contenido.
El perfil depende de que Facebook permita incrustar esa página pública;
conviene probarlo también sin iniciar sesión y con bloqueadores. No se
incluye un feed: en la prueba local Facebook devolvió el encabezado del
perfil, pero no las publicaciones.

## De dónde vienen los clientes

Cada mensaje generado por el formulario empieza con
`*Cotización desde la página web*`, para identificar las consultas que
llegan desde el sitio.

Vercel Web Analytics registra las visitas y Speed Insights mide el
rendimiento real. Ambos componentes se cargan desde `src/main.jsx`.
Para ver los datos, habilitar Analytics y Speed Insights en el proyecto
de Vercel y visitar el sitio después de publicar.

## Notas técnicas

- **Pre-renderizado (SSG).** `pnpm build` corre tres pasos: el build
  normal de Vite, un build SSR de `src/entry-server.jsx` (en `.ssr/`,
  se borra solo) y `scripts/prerender.mjs`, que dibuja cada ruta de
  `paginas` (`src/seo.js`) con React en Node y guarda su HTML completo
  en `dist/`: texto, título, descripción, canonical, Open Graph y
  JSON-LD. Google (y Bing, y los buscadores de IA) leen la página sin
  ejecutar JavaScript. También genera `dist/sitemap.xml` y `404.html`.
- En el navegador React **hidrata** ese HTML (`hydrateRoot`): conecta los
  botones sin volver a dibujar. Si el link trae parámetros (`?carga=`,
  `?paso=`, `?fbclid=`), dibuja desde cero, porque la página depende del
  link. Todo lo que dependa de la fecha de hoy (la tira de días de la
  portada) se calcula en un `useEffect`, nunca durante el render: el HTML
  se hizo el día del build.
- Una página nueva va en dos lugares: la `<Route>` en `src/App.jsx` y su
  título/descripción en `paginas` de `src/seo.js`. El build la
  pre-renderiza y la agrega al sitemap sola.
- Las preguntas frecuentes (`preguntas` en `config.js`) se muestran en la
  portada y salen también como FAQPage en el JSON-LD: Google exige que
  estén visibles.
- El botón final del cotizador es un `<a href="https://wa.me/...">`
  de verdad: la navegación la hace el navegador, no JavaScript. No
  cambiarlo por `window.open()` detrás de un `await` o un `fetch`:
  Safari en iOS bloquea esa navegación y el cotizador deja de
  funcionar en silencio.
- El paso del cotizador va en la URL (`?paso=2`) para que el botón
  Atrás del celular vuelva al paso anterior.
- Se usa `https://wa.me/`, nunca el esquema `whatsapp://`.
