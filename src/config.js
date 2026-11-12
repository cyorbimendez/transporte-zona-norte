/* ============================================================
   ÚNICO ARCHIVO QUE HAY QUE EDITAR PARA PONER EL SITIO EN VIVO.
   Todo lo que dice CAMBIAR o TODO es un dato real que falta.
   De aquí salen también los datos para Google (JSON-LD, ver
   src/datosEstructurados.js). Títulos y descripciones de cada
   página: src/seo.js.
   ============================================================ */

export const negocio = {
  nombre: 'Transportes Treinta',
  alias: 'Transportes 30',
  apodo: '30',

  // WhatsApp: 506 + 8 dígitos, sin '+', sin espacios.
  whatsapp: '50685528204',
  whatsappVisible: '8552 8204',
  telefono: '+506 8552 8204',
  email: 'transportestreinta@gmail.com',

  // Nombre, teléfono y zona tienen que coincidir letra por letra con
  // el Perfil de Empresa de Google y con Facebook.
  ubicacion: 'Pital, San Carlos, Alajuela',
  distrito: 'Pital',
  provincia: 'Alajuela',
  codigoPostal: '21006',
  mapa: 'https://www.google.com/maps?cid=15081357595470814468',
  horario: 'Disponible 24/7',
  respuestaWhatsApp: '1 a 3 horas',

  lema: 'Trabajo seguro, honorable y de palabra.',
  descripcion:
    'Transporte de carga y fletes desde Pital, San Carlos, a toda la Zona Norte y Costa Rica. Camión tándem con plataforma de 20+ t: piña y yuca, materiales de construcción, maquinaria y contenedores.',

  google: 'https://www.google.com/maps?cid=15081357595470814468',
  googleResena: null, // Google habilita el enlace de reseñas al verificar el perfil.
  facebook: 'https://www.facebook.com/profile.php?id=61594028973125',
  instagram: 'https://www.instagram.com/transportes30cr/',
};

export const dueño = {
  nombre: 'Nelson Camacho Segura',
  apodo: '30',
  desde: 2013, // 13 años en 2026
  origen: 'Pital, San Carlos',
  historia:
    'Nelson empezó a manejar camión en 2013. Hoy sigue al frente desde Pital, San Carlos: él contesta el WhatsApp y mueve la carga por todo el país. Su esposa sostiene la casa y sus hijos apoyan el negocio. Un servicio familiar, personal, sin intermediarios.',
  foto: '/img/nelson-camacho-retrato.webp',
  fotoTarjeta: '/img/mini/nelson-camacho-sonrisa.webp',
};

export const trayectoria = {
  desde: 2013,
  viajes: '+1,500',
};

/* Tipos de carga. El `id` viaja en el link de cotización
   (/cotizar?carga=agricola), así que no conviene cambiarlo. */
export const cargas = [
  {
    id: 'agricola',
    titulo: 'Carga agrícola',
    corto: 'Piña, yuca, tubérculos',
    detalle: 'Piña, yuca y tubérculos en cajas, jaulas o sacos, de la finca a la planta o a donde lo necesite.',
    foto: '/img/carga-pina-carretera.webp',
  },
  {
    id: 'construccion',
    titulo: 'Construcción',
    corto: 'Block, cemento, varilla',
    detalle: 'Bloques, cemento, varilla y tarimas, con entrega en la obra o a domicilio.',
    foto: '/img/transporte-materiales-en-tarimas.webp',
  },
  {
    id: 'maquinaria',
    titulo: 'Maquinaria',
    corto: 'Tractores, chapulines',
    detalle: 'Tractores, chapulines, retroexcavadoras y equipo pesado, hasta la finca, la obra o a domicilio.',
    foto: '/img/transporte-maquinaria-pesada.webp',
  },
  {
    id: 'contenedor',
    titulo: 'Contenedores y bines',
    corto: 'Bines, cajas, contenedores',
    detalle: 'Contenedores, bines y cajas de carga, a planta, bodega o puerto.',
    foto: '/img/camion-plataforma.webp',
  },
  {
    id: 'general',
    titulo: 'Fletes y carga general',
    corto: 'Cajas, sacos, tarimas',
    detalle: 'Fletes de carga dentro y fuera de la Zona Norte: cajas, sacos y tarimas. No hacemos mudanzas.',
    foto: '/img/carga-en-sacos.webp',
  },
  {
    id: 'otro',
    titulo: 'Otra carga',
    corto: 'Cuéntenos qué es',
    detalle: '¿No está en la lista? Pregunte sin compromiso.',
    foto: '/img/carga-con-lona.webp',
  },
];

/* Los trabajos más pedidos, con su propia sección en Servicios.
   `carga` es el tipo que queda elegido al tocar "Cotizar". */
export const especialidades = [
  {
    carga: 'agricola',
    titulo: 'Transporte de piña y yuca',
    texto:
      'Piña, yuca y otros productos de finca, en cajas, jaulas o sacos (no a granel). De la finca a la planta empacadora, dentro de San Carlos, a San José o a donde lo necesite.',
    foto: '/img/carga-pina-carretera.webp',
    alt: 'Camión de Transportes Treinta con jaulas de piña en carretera',
  },
  {
    carga: 'maquinaria',
    titulo: 'Materiales y maquinaria a domicilio',
    texto:
      'Block, cemento, varilla y tarimas hasta la obra o la casa. Tractores, chapulines y retroexcavadoras hasta la finca o el proyecto. En la Zona Norte y en todo el país.',
    foto: '/img/camion-volcan-ancho.webp',
    alt: 'El camión con una retroexcavadora sobre la plataforma, frente al volcán Arenal',
  },
];

/* Datos técnicos del camión. La placa muestra solo las líneas que
   haya aquí; la última sale resaltada. */
export const camion = {
  tipo: 'Camión tándem con plataforma',
  para: 'Carga agrícola, construcción, maquinaria y contenedores.',
  foto: '/img/carga-con-lona.webp',
  datos: [
    { etiqueta: 'Plataforma', valor: '7,70 × 2,45 m' },
    { etiqueta: 'Capacidad de carga', valor: '20+ t' },
  ],
};

/* Son promesas al cliente: solo lo que de verdad se cumple.
   Fotos de la carga: se envían si el cliente las pide. */
export const proceso = [
  {
    titulo: 'Cotice en la página',
    detalle: 'Tipo de carga, ruta y fecha. Llega a WhatsApp con número de referencia.',
  },
  {
    titulo: 'Confirmamos precio y fecha',
    detalle: 'Respuesta en 1 a 3 horas, cualquier día.',
  },
  {
    titulo: 'Carga asegurada',
    detalle: 'Amarres y lona según la carga.',
  },
  {
    titulo: 'Entrega',
    detalle: 'Si necesita fotos al cargar o al entregar, solo pídalas.',
  },
];

/* Lo que ve el cliente después de enviar la cotización. */
export const queSigue = [
  'Nelson le confirma precio y fecha por WhatsApp.',
  'El día acordado cargamos y aseguramos su carga.',
  'Si necesita fotos al cargar o al entregar, solo pídalas.',
];

/* Lo que NO transportamos. Ser claro evita llamadas perdidas. */
export const noTransportamos = [
  'Ganado en pie',
  'Vidrio',
  'Inflamables o peligrosos',
  'Mudanzas residenciales',
];

/* Cobertura nacional. La base es Pital.
   Tiempos aproximados CON carga desde Pital, sin contar carga y
   descarga. `rumbo` es hacia dónde apunta la flecha del rótulo
   (grados: 0 = norte, 90 = este, -90 = oeste). */
export const rutas = {
  nacional: [
    { destino: 'San José', tiempo: '2 h 30 min', rumbo: -45 },
    { destino: 'Puerto Caldera', tiempo: '3 h', rumbo: -90 },
    { destino: 'Guanacaste', tiempo: '4 h', rumbo: -60 },
    { destino: 'Peñas Blancas', tiempo: '4 h 30 min', rumbo: -30 },
    { destino: 'Puerto Moín', tiempo: '3 h 30 min', rumbo: 60 },
    { destino: 'Limón', tiempo: '3 h 15 min', rumbo: 90 },
    { destino: 'Zona Sur', tiempo: '7 h', rumbo: 135 },
  ],
  zonaNorte: [
    { destino: 'Aguas Zarcas', tiempo: '25 min', rumbo: 180 },
    { destino: 'Ciudad Quesada', tiempo: '45 min', rumbo: -135 },
    { destino: 'Sarapiquí', tiempo: '1 h', rumbo: 90 },
    { destino: 'La Fortuna', tiempo: '1 h 15 min', rumbo: -90 },
    { destino: 'Santa Rosa de Pocosol', tiempo: '1 h 20 min', rumbo: -45 },
    { destino: 'Los Chiles', tiempo: '1 h 45 min', rumbo: 0 },
    { destino: 'Upala', tiempo: '2 h 30 min', rumbo: -60 },
  ],
};

/* Lugares que no salen en el rótulo pero también se atienden. */
export const otrosLugares = [
  'Venecia',
  'Florencia',
  'Guatuso',
  'Puntarenas',
  'San Vito',
  'Valle Central',
];

export const puertos = [
  { nombre: 'Puerto Caldera', tipo: 'puerto' },
  { nombre: 'Puerto Moín', tipo: 'puerto' },
  { nombre: 'Peñas Blancas', tipo: 'frontera' },
];

/* Pueblos de la Zona Norte que se atienden: portada y datos para Google. */
export const pueblosZonaNorte = [
  'Pital',
  'Aguas Zarcas',
  'Ciudad Quesada',
  'Venecia',
  'Florencia',
  'La Fortuna',
  'Santa Rosa de Pocosol',
  'Los Chiles',
  'Guatuso',
  'Upala',
  'Sarapiquí',
];

/* Tiempo aproximado desde Pital según el rótulo de rutas. */
export const tiempoDesdePital = (destino) =>
  [...rutas.zonaNorte, ...rutas.nacional].find((r) => r.destino === destino)?.tiempo;

/* Atajos del cotizador (un toque llena el campo). */
export const origenesRapidos = ['Pital', 'Ciudad Quesada', 'Aguas Zarcas', 'La Fortuna', 'Los Chiles', 'Sarapiquí'];
export const destinosRapidos = ['Puerto Caldera', 'Puerto Moín', 'San José', 'Guanacaste', 'Limón', 'Peñas Blancas', 'Zona Sur'];

/* Selección de fotografías del camión para Inicio y Nosotros. */
export const trabajos = [
  { foto: '/img/carga-en-sacos.webp', titulo: 'Carga en sacos', alt: 'Camión de Transportes Treinta cargado de sacos en un camino de lastre' },
  { foto: '/img/carga-con-lona.webp', titulo: 'Carga cubierta con lona', alt: 'Camión de Transportes Treinta con la carga cubierta con una lona azul' },
  { foto: '/img/carga-pina-carretera.webp', titulo: 'Piña en carretera', alt: 'Camión de Transportes Treinta transportando jaulas de piña por carretera' },
];

export const galeria = [
  ...trabajos,
  { foto: '/img/carga-en-carretera.webp', titulo: 'Listos para salir', alt: 'Camión de Transportes Treinta con sacos y carga agrícola junto a una bodega' },
  { foto: '/img/camion-volcan-ancho.webp', titulo: 'Transporte de maquinaria', alt: 'Camión con una retroexcavadora en la plataforma frente al volcán Arenal' },
  { foto: '/img/camion-7.webp', alt: 'El camión con postes de concreto sobre la plataforma' },
  { foto: '/img/camion-4.webp', alt: 'El camión con jaulas agrícolas en una planta empacadora' },
  { foto: '/img/camion-1.webp', alt: 'El camión con la plataforma y barandas listas para cargar' },
];

/* Reseñas reales de clientes. Mientras esté vacío, en su lugar se
   muestra una invitación a dejar reseña (Google si hay perfil, si no
   Facebook). NO poner reseñas inventadas: además de engañar al cliente,
   Google y Facebook penalizan los testimonios falsos.
   Formato:
   { nombre: 'Carlos M.', lugar: 'Finca piñera · Pital', texto: '...' } */
export const resenas = [];

/* Preguntas frecuentes: se muestran en la portada y Google las lee
   como FAQ (tienen que estar visibles en la página para valer). Son
   promesas al cliente: solo lo que de verdad se cumple. */
export const preguntas = [
  {
    pregunta: '¿Hacen fletes en San Carlos?',
    respuesta:
      'Sí. Hacemos fletes de carga desde Pital a Aguas Zarcas, Ciudad Quesada, toda la Zona Norte y el resto del país. El camión lleva más de 20 toneladas, así que es para cargas grandes: productos de finca, materiales de construcción, maquinaria y carga general. No hacemos mudanzas residenciales.',
  },
  {
    pregunta: '¿Transportan piña y yuca?',
    respuesta:
      'Sí. Llevamos piña, yuca y otros productos de finca en cajas, jaulas o sacos (no a granel): de la finca a la planta empacadora, dentro de San Carlos, a San José o a donde lo necesite.',
  },
  {
    pregunta: '¿Entregan materiales de construcción y maquinaria a domicilio?',
    respuesta:
      'Sí. Llevamos block, cemento, varilla, tarimas y maquinaria pesada hasta la obra, la finca o la casa, en la Zona Norte y en todo el país.',
  },
  {
    pregunta: '¿Qué zonas cubren?',
    respuesta: `La base es ${negocio.ubicacion}. Atendemos ${pueblosZonaNorte.slice(1, -1).join(', ')} y ${pueblosZonaNorte.at(-1)}, y viajamos a todo Costa Rica: San José, Guanacaste, Puntarenas, Limón, Zona Sur y puertos.`,
  },
  {
    pregunta: '¿Cómo cotizo un viaje?',
    respuesta: `En la página, en pocos pasos: tipo de carga, ruta y fecha. El mensaje le llega listo a WhatsApp. También puede escribir o llamar al ${negocio.whatsappVisible}. Respondemos en ${negocio.respuestaWhatsApp}.`,
  },
  {
    pregunta: '¿Cuál es el horario?',
    respuesta: `Atendemos 24/7, todos los días. Por WhatsApp respondemos en ${negocio.respuestaWhatsApp}.`,
  },
  {
    pregunta: '¿Transportes Treinta y Transportes 30 son lo mismo?',
    respuesta:
      'Sí, es la misma empresa. A Nelson Camacho, el dueño y chofer, todos le dicen "30". Por eso el negocio se llama Transportes Treinta y también se conoce como Transportes 30.',
  },
];
