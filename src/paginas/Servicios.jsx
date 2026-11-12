import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import BlockIcon from '@mui/icons-material/Block';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { camion, especialidades, negocio, noTransportamos, proceso } from '../config';
import { CabeceraPagina, Placa, TituloSeccion, fotoAdaptable, margen } from '../components/ui';
import SelectorCarga from '../components/SelectorCarga';
import { Revelar } from '../components/movimiento';
import { EnlacesServicios } from './ServicioDetalle';

export default function Servicios() {
  return (
    <>
      <CabeceraPagina
        antetitulo="Servicios"
        titulo="Transporte de carga agrícola, construcción y maquinaria"
        bajada="Fletes desde Pital, San Carlos, a la Zona Norte y todo el país. Si su carga no aparece aquí, escríbanos: casi siempre encontramos una solución."
      />
      <Container sx={{ px: margen, pt: { xs: 2.5, md: 5 }, pb: { xs: 3.5, md: 8 } }}>
        <Box component="section" aria-labelledby="titulo-lista-cargas">
          <TituloSeccion><span id="titulo-lista-cargas">¿Qué necesita transportar?</span></TituloSeccion>
          <Typography sx={{ color: 'text.secondary', mb: 2.5, fontSize: 14 }}>Elija su carga y conozca cómo la transportamos.</Typography>
          <SelectorCarga />
        </Box>
        <Revelar>
          <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mt: { xs: 4, md: 7 } }}>
            <Grid size={{ xs: 12, md: 6 }}><NuestroCamion /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><Stack spacing={3}><ComoTrabajamos /><NoTransportamos /></Stack></Grid>
          </Grid>
        </Revelar>
        <Especialidades />
        <EnlacesServicios />
      </Container>
    </>
  );
}

/* Los trabajos más pedidos, con texto propio: es lo que la gente busca
   ("transporte de piña", "flete de maquinaria"). */
function Especialidades() {
  return (
    <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: { xs: 1.5, md: 6 } }}>
      {especialidades.map((e) => (
        <Grid size={{ xs: 12, md: 6 }} key={e.titulo}>
          <Card component="section" aria-labelledby={`especialidad-${e.carga}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
              component="img"
              {...fotoAdaptable(e.foto, '(min-width: 900px) 560px, 100vw')}
              alt={e.alt}
              loading="lazy"
              decoding="async"
              sx={{ width: '100%', height: { xs: 190, md: 260 }, objectFit: 'cover', display: 'block', bgcolor: 'concreto.main' }}
            />
            <Stack spacing={1.25} sx={{ p: { xs: 2, md: 2.5 }, flex: 1, alignItems: 'flex-start' }}>
              <Typography id={`especialidad-${e.carga}`} variant="h3" component="h2" sx={{ fontSize: { xs: 20, md: 24 } }}>
                {e.titulo}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: 'text.secondary', lineHeight: 1.55, flex: 1 }}>{e.texto}</Typography>
              <Button component={RouterLink} nativeButton={false} to={`/cotizar?carga=${e.carga}`} endIcon={<ArrowForwardIcon />} sx={{ px: 0, minHeight: 36 }}>
                Cotizar
              </Button>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function NuestroCamion() {
  return (
    <Box component="section" aria-labelledby="titulo-camion">
      <TituloSeccion>
        <span id="titulo-camion">Nuestro camión</span>
      </TituloSeccion>
      <Card>
        <Box
          component="img"
          {...fotoAdaptable(camion.foto, '(min-width: 900px) 460px, 100vw')}
          alt={`${camion.tipo} de ${negocio.nombre}, con la carga cubierta con lona`}
          loading="lazy"
          decoding="async"
          sx={{ width: '100%', height: { xs: 190, md: 240 }, objectFit: 'cover', objectPosition: 'center 60%', display: 'block', bgcolor: 'concreto.main' }}
        />
        <Stack spacing={1.75} sx={{ p: 2 }}>
          <Box>
            <Typography component="h3" sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 18 }}>
              {camion.tipo}
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>{camion.para}</Typography>
          </Box>
          <Placa datos={camion.datos} />
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            Un solo camión, atendido por su dueño. Si su carga excede la capacidad, se lo indicamos de inmediato.
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}

function ComoTrabajamos() {
  return (
    <Box component="section" aria-labelledby="titulo-proceso">
      <TituloSeccion>
        <span id="titulo-proceso">Cómo trabajamos</span>
      </TituloSeccion>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {proceso.map((p, i) => (
          <Box component="li" key={p.titulo} sx={{ display: 'grid', gridTemplateColumns: '34px 1fr', columnGap: 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                aria-hidden
                sx={{
                  width: 30,
                  height: 30,
                  flex: 'none',
                  borderRadius: 1,
                  bgcolor: 'primary.main',
                  color: 'secondary.main',
                  fontFamily: '"Archivo", sans-serif',
                  fontWeight: 800,
                  fontSize: 14,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {i + 1}
              </Box>
              {i < proceso.length - 1 && <Box sx={{ flex: 1, width: 2, bgcolor: 'divider' }} />}
            </Box>
            <Box sx={{ pt: 0.5, pb: 2.25 }}>
              <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 15 }}>{p.titulo}</Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.4, mt: 0.25 }}>{p.detalle}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function NoTransportamos() {
  return (
    <Box component="section" aria-labelledby="titulo-no" sx={{ bgcolor: 'concreto.main', borderRadius: 2, p: 2.25 }}>
      <Typography id="titulo-no" variant="h3" component="h2" sx={{ fontSize: 17, mb: 1.5 }}>
        No transportamos
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}>
        {noTransportamos.map((n) => (
          <Box component="li" key={n} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.35 }}>
            <BlockIcon sx={{ fontSize: 18, color: 'error.main', flex: 'none' }} />
            {n}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
