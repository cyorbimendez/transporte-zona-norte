import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import theme from './theme';
import Marco from './components/Marco';
import Inicio from './paginas/Inicio';
import Servicios from './paginas/Servicios';
import Cobertura from './paginas/Cobertura';
import Nosotros from './paginas/Nosotros';
import Cotizar from './paginas/Cotizar';
import NoEncontrada from './paginas/NoEncontrada';
import ServicioDetalle from './paginas/ServicioDetalle';
import Privacidad from './paginas/Privacidad';
import { serviciosDetalle } from './serviciosDetalle';
import Medicion from './components/Medicion';
import { recordarPagina } from './historial';
import { Movimiento } from './components/movimiento';

/* El sitio completo, sin el router: el navegador lo envuelve en
   BrowserRouter (main.jsx) y el build en StaticRouter (entry-server.jsx).
   Si se agrega una página, también va en `paginas` de src/seo.js. */
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Movimiento>
        <CssBaseline />
        <DesplazamientoDeRuta />
        <Medicion />
        <Routes>
          <Route element={<Marco />}>
            <Route index element={<Inicio />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="cobertura" element={<Cobertura />} />
            <Route path="sobre-nosotros" element={<Nosotros />} />
            <Route path="cotizar" element={<Cotizar />} />
            {serviciosDetalle.map(s => <Route key={s.ruta} path={s.ruta.slice(1)} element={<ServicioDetalle />} />)}
            <Route path="privacidad" element={<Privacidad />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </Movimiento>
    </ThemeProvider>
  );
}

/* Anclas de la versión anterior (una sola página). Si alguien guardó
   o compartió un link viejo, llega a la página nueva equivalente. */
const anclasViejas = {
  '#servicios': '/servicios',
  '#flota': '/servicios',
  '#cobertura': '/cobertura',
  '#familia': '/sobre-nosotros',
  '#contacto': '/sobre-nosotros#contacto',
};

function DesplazamientoDeRuta() {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    recordarPagina(pathname);

    if (pathname === '/' && anclasViejas[hash]) {
      navigate(anclasViejas[hash], { replace: true });
      return;
    }

    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    // Salto directo: se llega desde otra página, una animación larga no aporta.
    document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash, pathname, navigate]);

  return null;
}
