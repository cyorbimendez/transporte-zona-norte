import { Box, Button, Card, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { negocio, camion } from '../config';
import { serviciosDetalle } from '../serviciosDetalle';
import { linkWhatsApp, linkTelefono } from '../whatsapp';
import { CabeceraPagina, margen, fotoAdaptable, Placa } from '../components/ui';

export function EnlacesServicios() {
  const { pathname } = useLocation();
  return <Box component="nav" aria-label="Servicios de transporte" sx={{ my: 4 }}>
    <Typography component="h2" variant="h3" sx={{ fontSize: 23, mb: 2 }}>Encuentre el transporte para su carga</Typography>
    <Grid container spacing={2}>
      {serviciosDetalle.filter(s => s.ruta !== pathname).map(s => <Grid size={{ xs: 12, md: 4 }} key={s.ruta}>
        <Card sx={{ p: 2.5, height: '100%' }}>
          <Link component={RouterLink} to={s.ruta} sx={{ fontWeight: 700, display: 'inline-block', py: 1 }}>{s.nombre}</Link>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 1 }}>{s.resumen}</Typography>
        </Card>
      </Grid>)}
    </Grid>
  </Box>;
}

export default function ServicioDetalle() {
  const { pathname } = useLocation();
  const s = serviciosDetalle.find(s => s.ruta === pathname);
  const whatsapp = linkWhatsApp(`*Consulta desde la página web*\nServicio: ${s.nombre}\n\nHola. Quisiera cotizar este transporte. Mi carga es: \nRecoger en: \nEntregar en: \nFecha: `);
  return <>
    <CabeceraPagina antetitulo="Servicios · Pital, San Carlos" titulo={s.titulo} bajada="Cotice directamente con Nelson. Base en Pital, San Carlos · Atención 24/7." />
    <Container sx={{ px: margen, py: { xs: 3, md: 6 } }}>
      <Typography sx={{ maxWidth: 800, fontSize: 17, mb: 3 }}>{s.resumen}</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 4 }}>
        <Button component={RouterLink} nativeButton={false} to={`/cotizar?carga=${s.carga}`} variant="contained" color="secondary">Cotizar este servicio</Button>
        <Button href={whatsapp} data-contact-context="service" target="_blank" rel="noopener" variant="contained" color="success" startIcon={<WhatsAppIcon />}>Consultar por WhatsApp</Button>
        <Button href={linkTelefono}>Llamar al {negocio.whatsappVisible}</Button>
      </Stack>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component="figure" sx={{ m: 0 }}>
            <Box component="img" {...fotoAdaptable(s.foto, '(min-width: 900px) 560px, 100vw')} alt={s.alt} width="1200" height="900" sx={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 2, display: 'block' }} />
            <Typography component="figcaption" sx={{ fontSize: 14, color: 'text.secondary', mt: 1.5 }}><strong>{s.tituloFoto}.</strong> {s.detalleFoto}</Typography>
          </Box>
          <Box sx={{ mt: 3 }}><Placa datos={camion.datos} /></Box>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 1 }}>Confirmamos si la carga es adecuada para el camión antes de acordar el viaje.</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Lista titulo="Qué transportamos" elementos={s.incluye} />
          <Lista titulo="Qué necesitamos para cotizar" elementos={s.preparar} />
          <Typography sx={{ mt: 2 }}>El precio depende de la ruta, las características de la carga y las condiciones de carga y descarga. Nelson confirma precio y fecha por WhatsApp.</Typography>
        </Grid>
      </Grid>
      <Box component="section" sx={{ mt: 5, maxWidth: 850 }}>
        <Typography component="h2" variant="h3" sx={{ fontSize: 24 }}>Preguntas sobre este servicio</Typography>
        {s.preguntas.map(p => <Box key={p.pregunta} sx={{ mt: 3 }}>
          <Typography component="h3" sx={{ fontSize: 18, fontWeight: 700 }}>{p.pregunta}</Typography>
          <Typography sx={{ mt: 1 }}>{p.respuesta}</Typography>
        </Box>)}
      </Box>
      <Box component="section" aria-label="Solicitar cotización" sx={{ mt: 4, p: { xs: 2.5, md: 3 }, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography component="h2" variant="h3" sx={{ fontSize: 24 }}>¿Necesita mover esta carga?</Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>Cuéntenos qué lleva, de dónde sale y a dónde va. Cotice sin compromiso; Nelson le confirma precio y disponibilidad. Respuesta por WhatsApp en {negocio.respuestaWhatsApp}.</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={RouterLink} nativeButton={false} to={`/cotizar?carga=${s.carga}`} variant="contained" color="secondary">Cotizar este servicio</Button>
          <Button href={whatsapp} data-contact-context="service" target="_blank" rel="noopener" variant="contained" color="success" startIcon={<WhatsAppIcon />}>Consultar por WhatsApp</Button>
          <Button href={linkTelefono}>Llamar al {negocio.whatsappVisible}</Button>
        </Stack>
      </Box>
      <Box sx={{ mt: 4 }}><Link component={RouterLink} to="/cobertura">Ver cobertura desde Pital y destinos nacionales</Link></Box>
      <EnlacesServicios />
    </Container>
  </>;
}

function Lista({ titulo, elementos }) {
  return <Box sx={{ mb: 3 }}>
    <Typography component="h2" variant="h3" sx={{ fontSize: 23 }}>{titulo}</Typography>
    <Box component="ul" sx={{ pl: 2.5, '& li': { mt: 1.25 } }}>{elementos.map(e => <li key={e}>{e}</li>)}</Box>
  </Box>;
}
