import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import { LayoutGroup, useReducedMotion } from 'motion/react';
import { m } from './movimiento';

const ALTO = 64;

const pestañas = [
  { to: '/', etiqueta: 'Inicio', icono: HomeOutlinedIcon, activo: HomeIcon },
  { to: '/servicios', etiqueta: 'Servicios', icono: LocalShippingOutlinedIcon, activo: LocalShippingIcon },
  { to: '/cotizar', etiqueta: 'Cotizar', centro: true },
  { to: '/cobertura', etiqueta: 'Cobertura', icono: AltRouteIcon, activo: AltRouteIcon },
  { to: '/sobre-nosotros', etiqueta: 'Nosotros', icono: PersonOutlineIcon, activo: PersonIcon },
];

/* Barra inferior en celular. El botón del centro (amarillo) es la
   acción principal del sitio: cotizar un viaje. */
export default function NavegacionMovil() {
  const { pathname } = useLocation();
  const actual = pestañas.some((p) => p.to === pathname) ? pathname : false;
  const reducir = useReducedMotion();

  return (
    <>
      {/* Espacio para que la barra no tape el final de la página */}
      <Box aria-hidden sx={{ height: `calc(${ALTO}px + env(safe-area-inset-bottom))`, display: { md: 'none' } }} />
      <Paper
        square
        elevation={0}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: (t) => t.zIndex.appBar,
          display: { md: 'none' },
          borderTop: '1px solid',
          borderColor: 'divider',
          pb: 'env(safe-area-inset-bottom)',
        }}
      >
        <LayoutGroup id="navegacion-movil">
        <BottomNavigation component="nav" aria-label="Navegación" showLabels value={actual} sx={{ height: ALTO }}>
          {pestañas.map(({ to, etiqueta, icono: Icono, activo: Activo, centro }) => (
            <BottomNavigationAction
              key={to}
              component={RouterLink} nativeButton={false}
              to={to}
              value={to}
              label={etiqueta}
              icon={centro ? <IconoCotizar /> : <Box sx={{ position: 'relative', width: 44, height: 28, display: 'grid', placeItems: 'center', isolation: 'isolate' }}>{actual === to && <Box component={m.span} layoutId="pagina-activa" transition={{ duration: reducir ? 0 : 0.3 }} sx={{ position: 'absolute', inset: 0, borderRadius: 3, bgcolor: '#e2eade', zIndex: -1 }} />}{actual === to ? <Activo /> : <Icono />}</Box>}
              sx={centro ? { color: 'primary.dark', '& .MuiBottomNavigationAction-label': { fontWeight: 700 } } : undefined}
            />
          ))}
        </BottomNavigation>
        </LayoutGroup>
      </Paper>
    </>
  );
}

function IconoCotizar() {
  return (
    <Box
      sx={{
        width: 52,
        height: 38,
        mt: '-8px',
        borderRadius: 1.5,
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 4px 10px rgba(242,177,12,.45)',
      }}
    >
      <RequestQuoteOutlinedIcon />
    </Box>
  );
}
