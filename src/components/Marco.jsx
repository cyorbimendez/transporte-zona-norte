import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router';
import Encabezado from './Encabezado';
import NavegacionMovil from './NavegacionMovil';
import Pie from './Pie';
import { usePagina } from '../seo';
import { EntradaPagina } from './movimiento';
import { BotonWhatsAppRedondo } from './ui';

/* Estructura común a todas las páginas. En celular, el cotizador ocupa
   la pantalla completa (sin encabezado, pie ni barra inferior): tiene
   sus propios botones de Atrás / Continuar abajo. */
export default function Marco() {
  usePagina();
  const { pathname } = useLocation();
  const enCotizador = pathname === '/cotizar';

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Encabezado ocultarEnMovil={enCotizador} />
      <Box component="main" sx={{ flex: 1 }}>
        <EntradaPagina ruta={pathname}><Outlet /></EntradaPagina>
      </Box>
      <Pie ocultarEnMovil={enCotizador} />
      {!enCotizador && <BotonWhatsAppRedondo sx={{ display: { md: 'none' }, position: 'fixed', right: 16, bottom: 'calc(80px + env(safe-area-inset-bottom))', width: 50, height: 50, zIndex: 1101, boxShadow: 3 }} />}
      {!enCotizador && <NavegacionMovil />}
    </Box>
  );
}
