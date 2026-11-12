import { cargas, dueño, negocio, preguntas, pueblosZonaNorte } from './config';
import { SITIO, paginas } from './seo';
import { serviciosDetalle } from './serviciosDetalle';

/* Datos estructurados (JSON-LD) para Google. Se arman desde config.js
   para que nombre, teléfono, zona y horario sean siempre los mismos que
   se ven en la página: si no coinciden, Google desconfía.
   Los escribe el build en el HTML de cada página (entry-server.jsx). */

const ID_NEGOCIO = `${SITIO}/#negocio`;
const TODOS_LOS_DIAS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function negocioLocal() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ID_NEGOCIO,
    name: negocio.nombre,
    alternateName: negocio.alias,
    description: negocio.descripcion,
    slogan: negocio.lema,
    url: `${SITIO}/`,
    telephone: negocio.telefono.replace(/\s/g, ''),
    email: negocio.email,
    logo: `${SITIO}/img/marca/logo-fondo-claro.png`,
    image: ['/img/carga-en-sacos.webp', '/img/carga-con-lona.webp', '/img/carga-pina-carretera.webp'].map((f) => SITIO + f),
    founder: { '@type': 'Person', name: dueño.nombre },
    address: {
      '@type': 'PostalAddress',
      addressLocality: negocio.distrito,
      addressRegion: negocio.provincia,
      postalCode: negocio.codigoPostal,
      addressCountry: 'CR',
    },
    hasMap: negocio.mapa,
    areaServed: [...pueblosZonaNorte, 'San Carlos', 'Zona Norte', 'Costa Rica'].map((name) => ({ '@type': 'Place', name })),
    // 24/7: así lo pide Google (00:00 a 23:59, todos los días).
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: TODOS_LOS_DIAS,
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [negocio.facebook, negocio.google, negocio.instagram].filter(Boolean),
    makesOffer: cargas
      .filter((c) => c.id !== 'otro')
      .map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c.titulo, description: c.detalle } })),
  };
}

function sitioWeb() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITIO}/#sitio`,
    url: `${SITIO}/`,
    name: negocio.nombre,
    alternateName: negocio.alias,
    inLanguage: 'es-CR',
    publisher: { '@id': ID_NEGOCIO },
  };
}

function preguntasFrecuentes() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}

function migas(ruta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: paginas['/'].nombre, item: `${SITIO}/` },
      { '@type': 'ListItem', position: 2, name: paginas[ruta].nombre, item: SITIO + ruta },
    ],
  };
}

/* Bloques JSON-LD de cada ruta. La 404 no lleva ninguno. */
export function datosEstructurados(ruta) {
  if (!paginas[ruta]) return [];
  if (ruta === '/') return [negocioLocal(), sitioWeb(), preguntasFrecuentes()];
  const servicio = serviciosDetalle.find(s => s.ruta === ruta);
  if (servicio) return [negocioLocal(), migas(ruta), {
    '@context': 'https://schema.org', '@type': 'Service', '@id': SITIO + ruta + '#servicio',
    name: servicio.nombre, description: servicio.resumen, url: SITIO + ruta,
    provider: { '@id': ID_NEGOCIO }, areaServed: { '@type': 'Country', name: 'Costa Rica' },
  }, {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: servicio.preguntas.map(p => ({ '@type': 'Question', name: p.pregunta, acceptedAnswer: { '@type': 'Answer', text: p.respuesta } })),
  }];
  return [negocioLocal(), migas(ruta)];
}
