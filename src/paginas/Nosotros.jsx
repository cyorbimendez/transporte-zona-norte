import { Box, Button, ButtonBase, Card, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import PlaceIcon from '@mui/icons-material/Place';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { dueño, galeria, negocio, resenas } from '../config';
import { linkTelefono, linkWhatsAppGeneral } from '../whatsapp';
import { Antetitulo, Franja, TituloSeccion, fotoAdaptable, margen } from '../components/ui';
import GaleriaFotos from '../components/GaleriaFotos';
import { Revelar } from '../components/movimiento';

export default function Nosotros() {
  const años = new Date().getFullYear() - dueño.desde;

  return (
    <>
      <Box component="header" sx={{ bgcolor: 'primary.main', color: '#fff' }}>
        <Container sx={{ px: margen, pt: { xs: 1.5, md: 6 }, pb: { md: 6 } }}>
          <Grid container columnSpacing={{ xs: 0, md: 6 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Antetitulo>La familia</Antetitulo>
              <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 52 }, mt: 0.5 }}>
                Nelson “30” Camacho
              </Typography>
              <Typography sx={{ display: { xs: 'none', md: 'block' }, mt: 2.5, fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,.86)' }}>
                {dueño.historia}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ position: 'relative', mx: { xs: -2.5, sm: -3, md: 0 }, mt: { xs: 2, md: 0 }, borderRadius: { md: 2 }, overflow: 'hidden' }}>
                <Box
                  component="img"
                  {...fotoAdaptable(dueño.foto, '(min-width: 900px) 540px, 100vw')}
                  alt={dueño.nombre}
                  sx={{
                    width: '100%',
                    height: { xs: 300, sm: 380, md: 460 },
                    objectFit: 'cover',
                    objectPosition: 'center 25%',
                    display: 'block',
                    bgcolor: 'primary.light',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 20, md: 24 },
                    bottom: 24,
                    bgcolor: 'secondary.main',
                    color: 'primary.dark',
                    px: 2,
                    py: 1.25,
                    borderRadius: 1,
                    boxShadow: '0 8px 20px rgba(0,0,0,.18)',
                  }}
                >
                  <Typography sx={{ fontSize: 11, fontWeight: 600 }}>Al volante desde {dueño.desde}</Typography>
                  <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{años} años</Typography>
                </Box>
                <Franja alto={8} paso={14} sx={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ px: margen, py: { xs: 2.75, md: 7 } }}>
        <Stack spacing={{ xs: 3.5, md: 7 }}>
          <Box>
            <Typography sx={{ display: { md: 'none' }, fontSize: 16, lineHeight: 1.6, mb: 3 }}>{dueño.historia}</Typography>
            <Box component="figure" sx={{ m: 0, py: 2.25, borderTop: '2px solid', borderBottom: '1px solid', borderColor: 'text.primary', borderBottomColor: 'divider', maxWidth: 760 }}>
              <Box aria-hidden sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 40, lineHeight: 0.6, color: 'secondary.main', mb: 1 }}>
                “
              </Box>
              <Typography component="blockquote" sx={{ m: 0, fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: { xs: 22, md: 32 }, lineHeight: 1.25, letterSpacing: '-0.015em' }}>
                {negocio.lema}
              </Typography>
            </Box>
          </Box>

          <Revelar><Galeria /></Revelar>

          <Grid container columnSpacing={{ xs: 0, md: 6 }} rowSpacing={3.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Resenas />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Contacto />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

function Galeria() {
  return (
    <Box component="section" id="galeria" aria-labelledby="titulo-galeria" sx={{ scrollMarginTop: 90 }}>
      <TituloSeccion>
        <span id="titulo-galeria">El camión en la carretera</span>
      </TituloSeccion>
      <GaleriaFotos fotos={galeria} />
      {negocio.facebook && (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', mt: 2 }}>
          <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Compartimos más fotos y viajes en Facebook.</Typography>
          <Button href={negocio.facebook} target="_blank" rel="noopener noreferrer" startIcon={<FacebookIcon />} sx={{ flex: 'none' }}>
            Ver más en Facebook
          </Button>
        </Stack>
      )}
    </Box>
  );
}

/* Dónde pedir reseñas: Google pesa más para aparecer en búsquedas
   locales; mientras no haya perfil, Facebook. */
const dondeResenar = negocio.googleResena
  ? { href: negocio.googleResena, sitio: 'Google', icono: <GoogleIcon />, color: '#1a73e8', hover: '#1765cc' }
  : negocio.facebook
    ? { href: negocio.facebook, sitio: 'Facebook', icono: <FacebookIcon />, color: '#1877f2', hover: '#166fe5' }
    : null;

function Resenas() {
  return (
    <Box component="section" aria-labelledby="titulo-resenas">
      <TituloSeccion
        accion={
          dondeResenar && resenas.length > 0 ? (
            <Button href={dondeResenar.href} target="_blank" rel="noopener" size="small" sx={{ minHeight: 32, px: 1, fontSize: 13, fontFamily: 'inherit', fontWeight: 600 }}>
              Dejar una reseña
            </Button>
          ) : null
        }
      >
        <span id="titulo-resenas">Reseñas</span>
      </TituloSeccion>

      {resenas.length > 0 ? (
        <Stack spacing={1.25}>
          {resenas.map((r) => (
            <Card key={r.nombre + r.texto} component="figure" sx={{ m: 0, px: 2, py: 1.75 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{r.nombre}</Typography>
                <Rating value={5} readOnly size="small" sx={{ color: 'secondary.main' }} />
              </Stack>
              <Typography component="blockquote" sx={{ m: 0, mt: 1, fontSize: 14, lineHeight: 1.5 }}>
                {r.texto}
              </Typography>
              <Typography component="figcaption" sx={{ mt: 1, fontSize: 12, color: 'text.secondary' }}>
                {r.lugar}
              </Typography>
            </Card>
          ))}
        </Stack>
      ) : (
        <Card sx={{ p: 2.25 }}>
          <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 16 }}>¿Ya trabajó con nosotros?</Typography>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 0.5, mb: 2 }}>
            Su opinión le ayuda a otros clientes a decidir.
            {dondeResenar && ` Déjenos una reseña en ${dondeResenar.sitio}: toma un minuto.`}
          </Typography>
          {dondeResenar && (
            <Button
              href={dondeResenar.href}
              data-review={negocio.googleResena ? 'google' : undefined}
              target="_blank"
              rel="noopener"
              variant="contained"
              startIcon={dondeResenar.icono}
              sx={{ bgcolor: dondeResenar.color, color: '#fff', '&:hover': { bgcolor: dondeResenar.hover } }}
            >
              Dejar una reseña
            </Button>
          )}
        </Card>
      )}
    </Box>
  );
}

function Contacto() {
  const filas = [
    { icono: <WhatsAppIcon fontSize="small" />, k: 'WhatsApp', v: negocio.whatsappVisible, href: linkWhatsAppGeneral, externo: true, fondo: 'success.main', color: 'success.contrastText' },
    { icono: <PhoneIcon fontSize="small" />, k: 'Teléfono', v: negocio.telefono, href: linkTelefono },
    { icono: <MailOutlineIcon fontSize="small" />, k: 'Correo', v: negocio.email, href: `mailto:${negocio.email}` },
    negocio.facebook && { icono: <FacebookIcon fontSize="small" />, k: 'Facebook', v: negocio.nombre, href: negocio.facebook, externo: true },
    negocio.instagram && { icono: <InstagramIcon fontSize="small" />, k: 'Instagram', v: '@transportes30cr', href: negocio.instagram, externo: true },
    { icono: <PlaceIcon fontSize="small" />, k: 'Base', v: negocio.ubicacion, href: negocio.mapa, externo: true, fondo: 'secondary.main', color: 'secondary.contrastText' },
  ].filter(Boolean);

  return (
    <Box component="section" id="contacto" aria-labelledby="titulo-contacto" sx={{ scrollMarginTop: 80 }}>
      <TituloSeccion>
        <span id="titulo-contacto">Contacto</span>
      </TituloSeccion>
      <Card component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {filas.map((f, i) => (
          <li key={f.k}>
            <ButtonBase
              href={f.href}
              target={f.externo ? '_blank' : undefined}
              rel={f.externo ? 'noopener' : undefined}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1.75,
                px: 2,
                py: 1.75,
                textAlign: 'left',
                borderBottom: i < filas.length - 1 ? '1px solid' : 'none',
                borderColor: 'concreto.main',
                '&:hover': { bgcolor: 'background.default' },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: f.fondo || 'primary.main',
                  color: f.color || '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  flex: 'none',
                }}
              >
                {f.icono}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{f.k}</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 500, overflowWrap: 'anywhere' }}>{f.v}</Typography>
              </Box>
              <ChevronRightIcon sx={{ color: '#b5b2aa', flex: 'none' }} />
            </ButtonBase>
          </li>
        ))}
      </Card>
    </Box>
  );
}
