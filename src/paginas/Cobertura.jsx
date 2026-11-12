import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { otrosLugares, puertos } from '../config';
import { CabeceraPagina, TituloSeccion, margen } from '../components/ui';
import ExploradorRutas from '../components/ExploradorRutas';

export default function Cobertura() {
  return (
    <>
      <CabeceraPagina antetitulo="Cobertura" titulo="San Carlos, Zona Norte y todo Costa Rica" bajada="Base en Pital, San Carlos. Servicio costa a costa, frontera a frontera." />
      <Container sx={{ px: margen, py: { xs: 3, md: 5 } }}>
        <Box component="section" aria-labelledby="titulo-rutas">
          <TituloSeccion><span id="titulo-rutas">¿A dónde vamos?</span></TituloSeccion>
          <Typography sx={{ color: 'text.secondary', fontSize: { xs: 14, md: 16 }, mb: 2.5 }}>Elija una zona y un destino. Le mostramos el viaje desde Pital y dejamos la ruta elegida en su cotización.</Typography>
          <ExploradorRutas />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4, mt: { xs: 4, md: 6 } }}>
          <Box component="section" aria-labelledby="titulo-puertos">
            <TituloSeccion><span id="titulo-puertos">Puertos y frontera</span></TituloSeccion>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {puertos.map((p) => <Button key={p.nombre} component={RouterLink} nativeButton={false} to={`/cotizar?destino=${encodeURIComponent(p.nombre)}`} variant="outlined" endIcon={<ArrowForwardIcon />}>{p.nombre}</Button>)}
            </Box>
          </Box>
          <Box component="section" aria-labelledby="titulo-otros">
            <TituloSeccion><span id="titulo-otros">También vamos a</span></TituloSeccion>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', lineHeight: 1.6 }}>{otrosLugares.join(' · ')}</Typography>
            <Typography sx={{ fontSize: 14, mt: 1.5 }}>¿Su destino no aparece? Vamos a todo el territorio nacional.</Typography>
            <Button component={RouterLink} nativeButton={false} to="/cotizar" variant="contained" color="secondary" sx={{ mt: 2 }}>Cotizar otro destino</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
