import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, NavLink } from 'react-router';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { negocio } from '../config';
import { linkTelefono, linkWhatsAppGeneral } from '../whatsapp';
import { BotonWhatsAppRedondo, Marca, margen } from './ui';

export const enlaces = [
  { to: '/', etiqueta: 'Inicio' },
  { to: '/servicios', etiqueta: 'Servicios' },
  { to: '/cobertura', etiqueta: 'Cobertura' },
  { to: '/sobre-nosotros', etiqueta: 'Nosotros' },
];

/* En celular la barra se esconde al bajar y vuelve al subir: la
   navegación y el botón de cotizar viven abajo, al alcance del pulgar. */
export default function Encabezado({ ocultarEnMovil = false }) {
  const theme = useTheme();
  const escritorio = useMediaQuery(theme.breakpoints.up('md'));
  const bajando = useScrollTrigger({ threshold: 90 });

  return (
    <Slide appear={false} direction="down" in={escritorio || !bajando}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: 'primary.main', display: ocultarEnMovil ? { xs: 'none', md: 'flex' } : 'flex' }}
      >
        <Container sx={{ px: margen }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 80, sm: 88 }, py: { xs: 1.5, sm: 1 }, gap: { xs: 2, md: 1.5 } }}>
            <Box
              component={RouterLink}
              to="/"
              aria-label={`Inicio — ${negocio.nombre}`}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#fff', textDecoration: 'none', flexGrow: 1, minWidth: 0 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
                <Marca sobreOscuro sx={{ width: { xs: 'clamp(200px, 64vw, 250px)', sm: 250, md: 210, lg: 240 } }} />
                <Box component="span" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,.8)', lineHeight: 1.2 }}>
                  TRANSPORTE DE CARGA
                </Box>
              </Box>
            </Box>

            <Box component="nav" aria-label="Navegación principal" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
              {enlaces.map((e) => (
                <Button
                  key={e.to}
                  component={NavLink} nativeButton={false}
                  to={e.to}
                  end
                  sx={{
                    color: 'rgba(255,255,255,.86)',
                    minHeight: 40,
                    px: 1.5,
                    '&:hover': { bgcolor: 'rgba(255,255,255,.08)' },
                    '&.active': { color: '#fff', boxShadow: 'inset 0 -3px 0 #f2b10c', borderRadius: 0 },
                  }}
                >
                  {e.etiqueta}
                </Button>
              ))}
            </Box>

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' }, ml: 2, flexShrink: 0, whiteSpace: 'nowrap' }}>
              <Button href={linkTelefono} startIcon={<PhoneIcon />} sx={{ color: '#fff', display: { md: 'none', lg: 'inline-flex' } }}>
                {negocio.whatsappVisible}
              </Button>
              <Button href={linkWhatsAppGeneral} target="_blank" rel="noopener" variant="contained" color="success" startIcon={<WhatsAppIcon />}>
                WhatsApp
              </Button>
              <Button component={RouterLink} nativeButton={false} to="/cotizar" variant="contained" color="secondary">
                Cotizar viaje
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', display: { md: 'none' }, flexShrink: 0 }}>
              <IconButton
                href={linkTelefono}
                aria-label={`Llamar al ${negocio.telefono}`}
                sx={{ display: { xs: 'none', sm: 'inline-flex' }, width: 42, height: 42, color: '#fff', border: '1px solid rgba(255,255,255,.28)' }}
              >
                <PhoneIcon />
              </IconButton>
              <BotonWhatsAppRedondo />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
