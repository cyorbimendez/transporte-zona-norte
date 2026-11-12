export const MEDICION = 'G-57MSCT9L7E';
export const CLAVE_CONSENTIMIENTO = 'tt-analitica-v1';
export const CLAVE_INTERNA = 'tt-visita-interna-v1';
const rutas = new Set(['/', '/servicios', '/cobertura', '/sobre-nosotros', '/cotizar', '/fletes-san-carlos', '/transporte-pina-yuca', '/transporte-maquinaria-materiales', '/privacidad']);
const cargas = new Set(['agricola', 'construccion', 'maquinaria', 'contenedor', 'general', 'otro']);
const eventos = new Set(['quote_start', 'quote_step', 'quote_review', 'whatsapp_click', 'phone_click', 'review_click']);

export function rutaPublica(pathname) { return rutas.has(pathname) ? pathname : '/404'; }
export function urlPublica(url) {
  const u = new URL(url, 'https://transportestreinta.com');
  return u.origin + rutaPublica(u.pathname);
}

export function atribucionSegura(search, referrer = '') {
  const p = new URLSearchParams(search);
  const source = p.get('utm_source') === 'google_perfil' ? 'google' : p.get('utm_source');
  const medium = p.get('utm_medium');
  const campaign = p.get('utm_campaign');
  const resultado = {};
  if (['facebook', 'instagram', 'whatsapp', 'google', 'bing', 'chatgpt.com'].includes(source)) resultado.campaign_source = source;
  if (['social', 'referral', 'organic', 'qr'].includes(medium)) resultado.campaign_medium = medium;
  if (['pina-noviembre-2026', 'servicios-noviembre-2026', 'perfil-google', 'instagram-bio', 'facebook-perfil', 'whatsapp-estado'].includes(campaign)) resultado.campaign_name = campaign;
  try { resultado.page_referrer = new URL(referrer).origin + '/'; } catch { resultado.page_referrer = ''; }
  return resultado;
}

export function parametrosEvento(nombre, datos = {}) {
  if (!eventos.has(nombre)) return null;
  const seguros = {};
  if (cargas.has(datos.carga)) seguros.cargo_type = datos.carga;
  if (Number.isInteger(datos.paso) && datos.paso >= 1 && datos.paso <= 4) seguros.quote_step = datos.paso;
  if (['direct', 'quote', 'mobile', 'service'].includes(datos.contexto)) seguros.contact_context = datos.contexto;
  return seguros;
}

export function consentimientoActual() {
  try { return window.localStorage.getItem(CLAVE_CONSENTIMIENTO); } catch { return null; }
}

export function esVisitaInterna() {
  try { return window.localStorage.getItem(CLAVE_INTERNA) === 'si'; } catch { return false; }
}

export function configurarVisitaInterna() {
  const url = new URL(window.location.href);
  const opcion = url.searchParams.get('tt_internal');
  if (opcion !== '1' && opcion !== '0') return;
  try {
    if (opcion === '1') {
      window.localStorage.setItem(CLAVE_INTERNA, 'si');
      window.localStorage.setItem(CLAVE_CONSENTIMIENTO, 'no');
      window[`ga-disable-${MEDICION}`] = true;
    } else window.localStorage.removeItem(CLAVE_INTERNA);
  } catch { return; }
  url.searchParams.delete('tt_internal');
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
}

export function filtrarEventoVercel(evento) {
  return esVisitaInterna() ? null : { ...evento, url: urlPublica(evento.url) };
}

let iniciada = false;
const atribucion = typeof window === 'undefined' ? {} : atribucionSegura(window.location.search, document.referrer);

export function iniciarAnalitica() {
  if (typeof window === 'undefined' || esVisitaInterna() || !['transportestreinta.com', 'www.transportestreinta.com'].includes(window.location.hostname) || consentimientoActual() !== 'si') return false;
  window[`ga-disable-${MEDICION}`] = false;
  if (iniciada) return true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', MEDICION, {
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    page_location: urlPublica(window.location.href), ...atribucion,
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEDICION}`;
  document.head.appendChild(script);
  iniciada = true;
  return true;
}

export function registrarPagina(pathname, titulo) {
  if (!iniciarAnalitica()) return;
  const datos = { page_location: window.location.origin + rutaPublica(pathname), page_title: titulo, ...atribucion };
  window.gtag('set', datos);
  window.gtag('event', 'page_view', datos);
}

export function registrarEvento(nombre, datos) {
  const seguros = parametrosEvento(nombre, datos);
  if (!seguros || !iniciarAnalitica()) return;
  window.gtag('event', nombre, { ...seguros, page_location: urlPublica(window.location.href), ...atribucion });
}

export function cambiarConsentimiento(valor) {
  try { window.localStorage.setItem(CLAVE_CONSENTIMIENTO, valor); } catch { /* Sin almacenamiento no se activa la medición. */ }
  window[`ga-disable-${MEDICION}`] = valor !== 'si';
  window.dispatchEvent(new Event('tt-consentimiento'));
}

export function preferenciasAnalitica() { window.dispatchEvent(new Event('tt-preferencias')); }
