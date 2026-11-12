import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import { crearCacheEmotion } from './emotion';
import { canonicaDe, metaDe, paginas, SITIO } from './seo';
import { datosEstructurados } from './datosEstructurados';

/* Entrada del pre-renderizado: solo corre en el build (Node), nunca en
   el navegador. scripts/prerender.mjs llama a render() por cada ruta. */

export { paginas, SITIO };

export function render(ruta) {
  const cache = crearCacheEmotion();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const html = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={ruta}>
        <App />
      </StaticRouter>
    </CacheProvider>
  );

  return {
    html,
    head: etiquetasHead(ruta),
    estilos: constructStyleTagsFromChunks(extractCriticalToChunks(html)),
  };
}

function etiquetasHead(ruta) {
  const { titulo, descripcion } = metaDe(ruta);
  const canonica = canonicaDe(ruta);
  return [
    `<title>${escapar(titulo)}</title>`,
    `<meta name="description" content="${escapar(descripcion)}" />`,
    canonica && `<link rel="canonical" href="${canonica}" />`,
    canonica && `<meta property="og:url" content="${canonica}" />`,
    `<meta property="og:title" content="${escapar(titulo)}" />`,
    `<meta property="og:description" content="${escapar(descripcion)}" />`,
    ...datosEstructurados(ruta).map((d) => `<script type="application/ld+json">${jsonSeguro(d)}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ');
}

const escapar = (texto) =>
  texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Un "</script>" dentro de un texto cerraría la etiqueta antes de tiempo. */
const jsonSeguro = (datos) => JSON.stringify(datos).replace(/</g, '\\u003c');
