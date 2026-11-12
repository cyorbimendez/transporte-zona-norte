import { test } from 'node:test';
import assert from 'node:assert/strict';
import { atribucionSegura, CLAVE_CONSENTIMIENTO, CLAVE_INTERNA, cambiarConsentimiento, configurarVisitaInterna, esVisitaInterna, filtrarEventoVercel, iniciarAnalitica, parametrosEvento, registrarEvento, urlPublica } from '../src/analitica.js';

test('los datos de una cotización nunca pasan a los parámetros de medición', () => {
  const privados = { nombre: 'Cliente privado', descripcion: 'Carga confidencial', origen: 'Finca privada', destino: 'Dirección privada', referencia: 'TT-1234', carga: 'agricola', paso: 4, contexto: 'quote' };
  assert.deepEqual(parametrosEvento('quote_review', privados), { cargo_type: 'agricola', quote_step: 4, contact_context: 'quote' });
  assert.deepEqual(parametrosEvento('phone_click', { carga: 'Cliente privado', paso: 19, contexto: 'Texto libre' }), {});
  assert.equal(parametrosEvento('evento_desconocido', privados), null);
});

test('las URLs de medición no incluyen parámetros, fragmentos ni rutas libres', () => {
  assert.equal(urlPublica('https://transportestreinta.com/cotizar?origen=Finca&nombre=Cliente#privado'), 'https://transportestreinta.com/cotizar');
  assert.equal(urlPublica('https://transportestreinta.com/Cliente-privado?email=a@example.com'), 'https://transportestreinta.com/404');
});

test('campañas reconocidas se atribuyen sin aceptar texto libre como datos de analítica', () => {
  assert.deepEqual(atribucionSegura('?utm_source=facebook&utm_medium=social&utm_campaign=pina-noviembre-2026&nombre=Cliente', 'https://facebook.com/private?token=secreto'), { campaign_source: 'facebook', campaign_medium: 'social', campaign_name: 'pina-noviembre-2026', page_referrer: 'https://facebook.com/' });
  assert.deepEqual(atribucionSegura('?utm_source=Cliente&utm_campaign=cliente@example.com'), { page_referrer: '' });
});

test('Google Analytics no se carga antes del permiso y deja de emitir al revocarlo', () => {
  const datos = new Map();
  const scripts = [];
  globalThis.window = {
    location: { hostname: 'transportestreinta.com', href: 'https://transportestreinta.com/cotizar?nombre=Cliente' },
    localStorage: { getItem: k => datos.get(k) ?? null, setItem: (k, v) => datos.set(k, v) },
    dispatchEvent() {},
  };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  assert.equal(iniciarAnalitica(), false);
  registrarEvento('whatsapp_click');
  assert.equal(scripts.length, 0);
  datos.set(CLAVE_CONSENTIMIENTO, 'si');
  registrarEvento('whatsapp_click', { nombre: 'Cliente', contexto: 'quote' });
  assert.equal(scripts.length, 1);
  assert.equal(JSON.stringify(window.dataLayer).includes('Cliente'), false);
  const cantidad = window.dataLayer.length;
  cambiarConsentimiento('no');
  registrarEvento('phone_click');
  assert.equal(window.dataLayer.length, cantidad);
  assert.equal(window['ga-disable-G-57MSCT9L7E'], true);
  delete globalThis.window;
  delete globalThis.document;
});

test('la visita interna queda fuera de GA4, Vercel y Speed Insights aunque tenga permiso', () => {
  const datos = new Map([[CLAVE_CONSENTIMIENTO, 'si']]);
  let limpia;
  globalThis.window = {
    location: { hostname: 'transportestreinta.com', href: 'https://transportestreinta.com/?tt_internal=1&utm_source=facebook' },
    localStorage: { getItem: k => datos.get(k) ?? null, setItem: (k,v) => datos.set(k,v), removeItem: k => datos.delete(k) },
    history: { state: {}, replaceState: (_s,_t,url) => { limpia = url; } },
  };
  configurarVisitaInterna();
  assert.equal(esVisitaInterna(), true);
  assert.equal(iniciarAnalitica(), false);
  assert.equal(datos.get(CLAVE_CONSENTIMIENTO), 'no');
  assert.equal(limpia, '/?utm_source=facebook');
  assert.equal(filtrarEventoVercel({ type: 'pageview', url: window.location.href }), null);
  assert.equal(filtrarEventoVercel({ type: 'vital', url: window.location.href }), null);
  window.location.href = 'https://transportestreinta.com/?tt_internal=0';
  configurarVisitaInterna();
  assert.equal(datos.has(CLAVE_INTERNA), false);
  assert.deepEqual(filtrarEventoVercel({ type: 'pageview', url: 'https://transportestreinta.com/cotizar?nombre=Privado' }), { type: 'pageview', url: 'https://transportestreinta.com/cotizar' });
  delete globalThis.window;
});
