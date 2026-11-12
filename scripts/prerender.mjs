/* Pre-renderizado (SSG). Corre al final de `pnpm build`, después de los
   dos builds de Vite (navegador y SSR):

     1. Dibuja cada página con React en Node (src/entry-server.jsx).
     2. Guarda su HTML completo en dist/, con su título, descripción,
        canonical y datos estructurados.
     3. Genera dist/sitemap.xml con las mismas rutas.

   Google recibe el texto de cada página sin ejecutar JavaScript; en el
   navegador React solo conecta los botones (hydrateRoot en main.jsx).

   Salida (vercel.json usa cleanUrls: /servicios sirve servicios.html):
     /             → dist/index.html
     /servicios    → dist/servicios.html   … una por página de src/seo.js
     (no existe)   → dist/404.html, que Vercel sirve con estado 404 */

import { readFile, rm, writeFile } from 'node:fs/promises';

const raiz = new URL('../', import.meta.url);
const dist = new URL('dist/', raiz);
const ssr = new URL('.ssr/', raiz);

const { render, paginas, SITIO } = await import(new URL('entry-server.js', ssr).href);

const plantilla = await readFile(new URL('index.html', dist), 'utf8');
for (const marca of ['<!--app-head-->', '<!--app-html-->', '</head>']) {
  if (!plantilla.includes(marca)) throw new Error(`dist/index.html no tiene ${marca}`);
}

const archivoDe = (ruta) => (ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`);
const salidas = [...Object.keys(paginas).map((ruta) => [ruta, archivoDe(ruta)]), ['/404', '404.html']];

for (const [ruta, archivo] of salidas) {
  const { html, head, estilos } = render(ruta);
  // Reemplazos con función: un "$" en el contenido no se interpreta.
  const pagina = plantilla
    .replace('<!--app-head-->', () => head)
    .replace('</head>', () => `${estilos}\n  </head>`)
    .replace('<!--app-html-->', () => html);
  await writeFile(new URL(archivo, dist), pagina);
  console.log(`  ${ruta.padEnd(16)} → dist/${archivo}  (${(pagina.length / 1024).toFixed(0)} kB)`);
}

const hoy = new Date().toISOString().slice(0, 10);
const urls = Object.keys(paginas)
  .map((ruta) => `  <url>\n    <loc>${SITIO}${ruta}</loc>\n    <lastmod>${hoy}</lastmod>\n  </url>`)
  .join('\n');
await writeFile(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`  sitemap.xml      → ${Object.keys(paginas).length} páginas`);

await rm(ssr, { recursive: true, force: true });
