import { Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CabeceraPagina, margen } from '../components/ui';

/* Se sirve con estado 404 real (dist/404.html): Google no la indexa y
   el cliente que llegó por un link viejo encuentra por dónde seguir. */
export default function NoEncontrada() {
  return (
    <>
      <CabeceraPagina antetitulo="Error 404" titulo="Esta página no existe" />
      <Container sx={{ px: margen, py: { xs: 3.5, md: 7 } }}>
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.6, maxWidth: 620 }}>
          Puede que el link esté mal escrito o que la página haya cambiado de lugar. Si necesita mover una carga,
          cotice aquí mismo.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
          <Button component={RouterLink} nativeButton={false} to="/cotizar" variant="contained" color="secondary" size="large" endIcon={<ArrowForwardIcon />}>
            Cotizar un viaje
          </Button>
          <Button component={RouterLink} nativeButton={false} to="/" variant="outlined" size="large">
            Ir al inicio
          </Button>
        </Stack>
      </Container>
    </>
  );
}
