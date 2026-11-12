import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from 'react';
import { esVisitaInterna, preferenciasAnalitica } from '../analitica';
import { serviciosDetalle } from '../serviciosDetalle';
import { negocio } from '../config';
import { linkTelefono, linkWhatsAppGeneral } from '../whatsapp';
import { enlaces } from './Encabezado';
import { Franja, Marca, margen } from './ui';

/* Nombre, dirección y teléfono aquí tienen que coincidir con el
   Perfil de Empresa de Google (NAP). */
export default function Pie({ ocultarEnMovil = false }) {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'rgba(255,255,255,.82)',
        display: ocultarEnMovil ? { xs: 'none', md: 'block' } : 'block',
      }}
    >
      <Franja />
      <Container sx={{ px: margen, pt: { xs: 4, md: 6 }, pb: 3 }}>
        <Grid container spacing={{ xs: 3.5, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Marca sobreOscuro sx={{ width: 300, mb: 2 }} />
            <Typography variant="body2" sx={{ maxWidth: 380, lineHeight: 1.6 }}>
              {negocio.lema} Fletes y transporte de carga desde Pital, San Carlos, a toda Costa Rica. También
              conocidos como {negocio.alias}.
            </Typography>
          </Grid>

          {/* En celular la barra inferior ya cumple esta función */}
          <Grid size={{ md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Titulo>Páginas</Titulo>
            <Stack spacing={1.25} component="nav" aria-label="Páginas del sitio">
              {enlaces.map((e) => (
                <Link key={e.to} component={RouterLink} to={e.to} underline="hover" sx={{ color: 'inherit', fontSize: 14 }}>
                  {e.etiqueta}
                </Link>
              ))}
              {serviciosDetalle.map(s => <Link key={s.ruta} component={RouterLink} to={s.ruta} sx={{ color: 'inherit', fontSize: 14 }}>{s.nombre}</Link>)}
              <Link component={RouterLink} to="/cotizar" underline="hover" sx={{ color: 'secondary.main', fontSize: 14, fontWeight: 600 }}>
                Cotizar un viaje
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Titulo>Contacto</Titulo>
            <Stack spacing={1.25}>
              <Item icono={<WhatsAppIcon fontSize="small" />} href={linkWhatsAppGeneral} externo>
                WhatsApp {negocio.whatsappVisible}
              </Item>
              <Item icono={<PhoneIcon fontSize="small" />} href={linkTelefono}>
                {negocio.telefono}
              </Item>
              <Item icono={<MailOutlineIcon fontSize="small" />} href={`mailto:${negocio.email}`}>
                {negocio.email}
              </Item>
              {negocio.facebook && (
                <Item icono={<FacebookIcon fontSize="small" />} href={negocio.facebook} externo>
                  Facebook
                </Item>
              )}
              {negocio.instagram && (
                <Item icono={<InstagramIcon fontSize="small" />} href={negocio.instagram} externo>
                  Instagram
                </Item>
              )}
              <Item icono={<GoogleIcon fontSize="small" />} href={negocio.google} externo>Ver en Google Maps</Item>
              <Item icono={<PlaceIcon fontSize="small" />} href={negocio.mapa} externo>
                {negocio.ubicacion}
              </Item>
              <Item icono={<AccessTimeIcon fontSize="small" />}>{negocio.horario}</Item>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link component={RouterLink} to="/privacidad" sx={{ color: 'inherit', fontSize: 13 }}>Privacidad</Link>
          <Link component="button" onClick={preferenciasAnalitica} sx={{ color: 'inherit', fontSize: 13 }}>Preferencias de analítica</Link>
        </Stack>
        <EstadoVisitaInterna />

        <Typography
          variant="caption"
          component="p"
          sx={{ mt: 4, pt: 2.5, borderTop: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.56)' }}
        >
          © {new Date().getFullYear()} {negocio.nombre}. Transporte de carga desde Pital, San Carlos, para toda Costa Rica.
        </Typography>
      </Container>
    </Box>
  );
}

function EstadoVisitaInterna() {
  const [excluida, setExcluida] = useState(false);
  useEffect(() => setExcluida(esVisitaInterna()), []);
  return excluida ? <Typography sx={{ mt: 2, fontSize: 13, color: 'rgba(255,255,255,.8)' }}>Sus visitas están excluidas de las estadísticas en este navegador.</Typography> : null;
}

function Titulo({ children }) {
  return (
    <Typography component="h2" variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 1.25 }}>
      {children}
    </Typography>
  );
}

function Item({ icono, href, externo, children }) {
  const contenido = (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', fontSize: 14 }}>
      <Box sx={{ color: 'secondary.main', display: 'flex', flex: 'none' }}>{icono}</Box>
      <span>{children}</span>
    </Stack>
  );
  if (!href) return contenido;
  return (
    <Link
      href={href}
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noopener' : undefined}
      underline="hover"
      sx={{ color: 'inherit', overflowWrap: 'anywhere' }}
    >
      {contenido}
    </Link>
  );
}
