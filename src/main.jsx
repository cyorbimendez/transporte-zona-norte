import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { CacheProvider } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import { crearCacheEmotion } from './emotion';
import './styles.css';
import { configurarVisitaInterna, esVisitaInterna, filtrarEventoVercel } from './analitica';

configurarVisitaInterna();

const app = (
  <StrictMode>
    <CacheProvider value={crearCacheEmotion()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CacheProvider>
    {!esVisitaInterna() && <Analytics beforeSend={filtrarEventoVercel} />}
    {!esVisitaInterna() && <SpeedInsights beforeSend={filtrarEventoVercel} />}
  </StrictMode>
);

/* El build deja cada página ya dibujada en su HTML (scripts/prerender.mjs)
   y React solo la hidrata: le conecta los botones sin volver a dibujarla.
   Si el link trae parámetros (?carga=…, ?paso=…, ?fbclid=… de Facebook),
   la página depende del link y no del HTML guardado: se dibuja de nuevo.
   En `pnpm dev` no hay HTML previo y siempre se dibuja desde cero. */
const raiz = document.getElementById('root');

if (raiz.firstElementChild && !window.location.search) {
  hydrateRoot(raiz, app);
} else {
  createRoot(raiz).render(app);
}
