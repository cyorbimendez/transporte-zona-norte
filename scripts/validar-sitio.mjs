import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { serviciosDetalle } from '../src/serviciosDetalle.js';

const root = new URL('../dist/', import.meta.url);
const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, 9);
const titulos = new Set();
for (const url of urls) {
  const ruta = new URL(url).pathname;
  const html = await readFile(new URL(ruta === '/' ? 'index.html' : ruta.slice(1) + '.html', root), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical: ${ruta}`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `Un solo H1: ${ruta}`);
  const titulo = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(titulo && !titulos.has(titulo), `Título único: ${ruta}`);
  titulos.add(titulo);
  assert.ok(html.includes('google-site-verification'), `Verificación: ${ruta}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    const datos = JSON.parse(m[1]);
    if (datos['@type'] === 'LocalBusiness') assert.equal(datos.hasMap, 'https://www.google.com/maps?cid=15081357595470814468');
  }
  for (const m of html.matchAll(/(?:src|href)="(\/(?:assets|img)\/[^"?]+)"/g)) await access(new URL(m[1].slice(1), root));
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)[^"\s]*"/g)) {
    const destino = m[1];
    assert.ok(urls.includes('https://transportestreinta.com' + destino), `Enlace interno ${destino} en ${ruta}`);
  }
  const s = serviciosDetalle.find(s => s.ruta === ruta);
  if (s) {
    assert.ok(html.includes('"@type":"Service"'), `Schema del servicio: ${ruta}`);
    for (const p of s.preguntas) assert.ok(html.includes(p.pregunta), `FAQ visible: ${ruta}`);
    assert.ok(html.includes('https://wa.me/50685528204?text='), `WhatsApp: ${ruta}`);
  }
  console.log(`OK ${ruta}`);
}
const noExiste = await readFile(new URL('404.html', root), 'utf8');
assert.equal(noExiste.includes('rel="canonical"'), false);
console.log('OK: nueve páginas, enlaces, imágenes, canonicals, FAQ y datos estructurados.');
