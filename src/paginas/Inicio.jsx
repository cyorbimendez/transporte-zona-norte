import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonBase, Card, Container, Grid, Paper, Rating, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { dueño, negocio, preguntas, resenas, trabajos, trayectoria } from '../config';
import { linkTelefono, linkWhatsAppGeneral } from '../whatsapp';
import { Antetitulo, Deslizable, Franja, TituloSeccion, margen } from '../components/ui';
import FacebookPreview from '../components/FacebookPreview';
import { Revelar } from '../components/movimiento';
import GaleriaFotos from '../components/GaleriaFotos';
import SelectorCarga from '../components/SelectorCarga';
import ExploradorRutas from '../components/ExploradorRutas';
import { EnlacesServicios } from './ServicioDetalle';

export default function Inicio() {
  const años = new Date().getFullYear() - trayectoria.desde;

  return (
    <>
      <Portada años={años} />

      {/* En celular la tarjeta de acciones monta sobre la foto */}
      <Container sx={{ px: margen, display: { md: 'none' }, mt: '-34px', position: 'relative' }}>
        <TarjetaAcciones />
      </Container>

      <Container sx={{ px: margen, py: { xs: 3.5, md: 7 } }}>
        <Stack spacing={{ xs: 3.5, md: 7 }}>
          <Revelar><Cifras años={años} /></Revelar>
          <Revelar><QueMovemos /></Revelar>
          <Revelar><EnSanCarlos /></Revelar>
          <Revelar><EnRuta /></Revelar>
          {resenas.length > 0 && <Revelar><Resenas /></Revelar>}
          <Revelar><TarjetaNelson años={años} /></Revelar>
          <Revelar><FacebookPreview /></Revelar>
          <Revelar><Preguntas /></Revelar>
        </Stack>
      </Container>
    </>
  );
}

function Portada({ años }) {
  return (
    <Box component="section" aria-label="Portada" sx={{ bgcolor: 'primary.main', background: 'radial-gradient(ellipse at 80% 25%, #226849 0%, #10462f 50%, #0a2e1f 100%)', color: '#fff' }}>
      <Container sx={{ px: margen, pt: { xs: 1, md: 6 }, pb: { md: 8 } }}>
        <Grid container columnSpacing={{ xs: 0, md: 6 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Pastilla fondo="rgba(242,177,12,.16)" color="secondary.main" icono={<PlaceIcon sx={{ fontSize: 15 }} />}>
                Base en Pital, San Carlos
              </Pastilla>
              <Pastilla fondo="rgba(255,255,255,.1)" color="#fff" icono={<Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main' }} />}>
                Atención 24/7
              </Pastilla>
            </Stack>

            <Revelar demora={0.04}>
            <Typography variant="h1" sx={{ fontSize: { xs: 33, sm: 44, md: 56 }, mt: 2, textWrap: 'balance' }}>
              Transporte de carga desde San Carlos a todo Costa Rica.
            </Typography>
            </Revelar>

            <Typography sx={{ display: { xs: 'none', md: 'block' }, mt: 2.5, fontSize: 18, lineHeight: 1.55, color: 'rgba(255,255,255,.86)', maxWidth: 540 }}>
              <Box component="strong" sx={{ color: 'secondary.main' }}>{negocio.nombre}</Box>, también conocidos como{' '}
              <Box component="strong" sx={{ color: 'secondary.main' }}>{negocio.alias}</Box>. Fletes y carga pesada desde Pital:
              piña, yuca, materiales y maquinaria a Ciudad Quesada, Aguas Zarcas, San José y todo el país. Nelson “30” Camacho,{' '}
              {años} años en carretera.
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 4, maxWidth: 460 }}>
              <TarjetaAcciones />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Revelar demora={0.12}>
            <Box sx={{ position: 'relative', mx: { xs: -2.5, sm: -3, md: 0 }, mt: { xs: 2.5, md: 0 }, borderRadius: { md: 2 }, overflow: 'hidden' }}>
              <picture>
                <source media="(min-width: 900px)" srcSet="/img/camion-volcan.webp" />
                <Box
                  component="img"
                  src="/img/camion-volcan-ancho.webp"
                  alt="Camión de Transportes Treinta con una retroexcavadora sobre la plataforma, frente al volcán Arenal"
                  fetchPriority="high"
                  width="1122"
                  height="660"
                  sx={{
                    width: '100%',
                    height: { xs: 210, sm: 300, md: 'auto' },
                    aspectRatio: { md: '1 / 1' },
                    objectFit: 'cover',
                    objectPosition: { xs: 'center 55%', md: 'center 72%' },
                    display: 'block',
                    bgcolor: 'primary.dark',
                  }}
                />
              </picture>
              <Franja alto={8} paso={14} sx={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} />
            </Box>
            </Revelar>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Pastilla({ children, icono, fondo, color }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.625,
        fontSize: 12,
        fontWeight: 600,
        px: 1.25,
        py: 0.625,
        borderRadius: 4,
        bgcolor: fondo,
        color,
      }}
    >
      {icono}
      {children}
    </Box>
  );
}

function TarjetaAcciones() {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, boxShadow: '0 14px 32px rgba(6,30,20,.18)', display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      <Button
        component={RouterLink} nativeButton={false}
        to="/cotizar"
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<ArrowForwardIcon />}
        sx={{ minHeight: 56, justifyContent: 'space-between', fontSize: 17, fontWeight: 800, '&:hover': { bgcolor: 'secondary.dark' } }}
      >
        Cotizar un viaje
      </Button>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        <Button href={linkWhatsAppGeneral} target="_blank" rel="noopener" variant="contained" color="success" startIcon={<WhatsAppIcon />} sx={{ minHeight: 46 }}>
          WhatsApp
        </Button>
        <Button href={linkTelefono} variant="outlined" color="primary" startIcon={<PhoneIcon />} sx={{ minHeight: 46 }}>
          Llamar
        </Button>
      </Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        Respuesta por WhatsApp en {negocio.respuestaWhatsApp} · 24/7
      </Typography>
    </Paper>
  );
}

function Cifras({ años }) {
  const cifras = [
    [`${años} años`, 'en carretera'],
    [trayectoria.viajes, 'viajes realizados'],
    ['Nacional', 'costa a costa'],
  ];
  return (
    <Box
      component="ul"
      aria-label="Trayectoria"
      sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBlock: '1px solid', borderColor: 'divider' }}
    >
      {cifras.map(([cifra, texto], i) => (
        <Box component="li" key={texto} sx={{ py: { xs: 1.75, md: 3 }, pl: i ? { xs: 1.75, md: 4 } : 0, borderLeft: i ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Typography component="div" sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: { xs: 22, md: 36 }, color: 'primary.main', lineHeight: 1 }}>
            {cifra}
          </Typography>
          <Typography component="div" sx={{ fontSize: { xs: 12, md: 15 }, color: 'text.secondary', mt: 0.5 }}>
            {texto}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function QueMovemos() {
  return (
    <Box component="section" aria-labelledby="titulo-carga">
      <TituloSeccion
        accion={
          <Button component={RouterLink} nativeButton={false} to="/servicios" size="small" sx={{ minHeight: 32, px: 1, fontSize: 13, fontFamily: 'inherit', fontWeight: 600 }}>
            Ver todo
          </Button>
        }
      >
        <span id="titulo-carga">¿Qué movemos?</span>
      </TituloSeccion>
      <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>Elija su carga. Le mostramos el trabajo y dejamos su cotización lista para empezar.</Typography>
      <SelectorCarga />
      <EnlacesServicios />
    </Box>
  );
}

function EnRuta() {
  return (
    <Box component="section" aria-labelledby="titulo-en-ruta">
      <TituloSeccion
        accion={
          <Button component={RouterLink} nativeButton={false} to="/sobre-nosotros" size="small" sx={{ minHeight: 32, px: 1, fontSize: 13, fontFamily: 'inherit', fontWeight: 600, flex: 'none' }}>
            Ver más fotos
          </Button>
        }
      >
        <span id="titulo-en-ruta">El camión en ruta</span>
      </TituloSeccion>
      <Typography sx={{ mb: 2, fontSize: { xs: 14, md: 16 }, color: 'text.secondary', maxWidth: 700 }}>
        Carga agrícola, sacos y viajes con la carga cubierta. Un mismo camión, preparado para distintos trabajos.
      </Typography>
      <GaleriaFotos fotos={trabajos} />
    </Box>
  );
}

function Resenas() {
  return (
    <Box component="section" aria-labelledby="titulo-resenas">
      <TituloSeccion>
        <span id="titulo-resenas">Lo que dicen los clientes</span>
      </TituloSeccion>
      <Deslizable columnas={3}>
        {resenas.map((r) => (
          <Card key={r.nombre + r.texto} component="figure" sx={{ m: 0, width: { xs: 270, md: 'auto' }, p: 2, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Rating value={5} readOnly size="small" sx={{ color: 'secondary.main' }} />
            <Typography component="blockquote" sx={{ m: 0, fontSize: 14, lineHeight: 1.5 }}>
              “{r.texto}”
            </Typography>
            <Box component="figcaption" sx={{ mt: 'auto' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{r.nombre}</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{r.lugar}</Typography>
            </Box>
          </Card>
        ))}
      </Deslizable>
    </Box>
  );
}

function TarjetaNelson({ años }) {
  return (
    <ButtonBase
      component={RouterLink} nativeButton={false}
      to="/sobre-nosotros"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: { xs: 1.75, md: 3 },
        p: { xs: 1.5, md: 2.5 },
        borderRadius: 2,
        bgcolor: 'primary.dark',
        color: '#fff',
        textAlign: 'left',
        width: '100%',
      }}
    >
      <Box
        component="img"
        src={dueño.fotoTarjeta}
        alt=""
        loading="lazy"
        sx={{ width: { xs: 64, md: 112 }, height: { xs: 64, md: 112 }, borderRadius: 1.5, objectFit: 'cover', flex: 'none', bgcolor: 'primary.light' }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Antetitulo>Al volante · {años} años</Antetitulo>
        <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: { xs: 17, md: 26 }, lineHeight: 1.15 }}>
          Nelson “30” Camacho
        </Typography>
        <Typography sx={{ fontSize: { xs: 13, md: 16 }, color: 'rgba(255,255,255,.78)', mt: 0.25 }}>
          Él contesta y él maneja. Sin intermediarios.
        </Typography>
      </Box>
      <ChevronRightIcon sx={{ color: 'secondary.main', flex: 'none' }} />
    </ButtonBase>
  );
}

function EnSanCarlos() {
  return (
    <Box component="section" aria-labelledby="titulo-san-carlos">
      <TituloSeccion accion={<Button component={RouterLink} nativeButton={false} to="/cobertura" size="small" sx={{ flex: 'none' }}>Ver cobertura</Button>}>
        <span id="titulo-san-carlos">Fletes en San Carlos y todo Costa Rica</span>
      </TituloSeccion>
      <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: 'text.secondary', mb: 2.5 }}>Desde Pital a la finca, la planta, la obra o el puerto. Explore los destinos y cotice su ruta.</Typography>
      <ExploradorRutas />
    </Box>
  );
}

/* Mismas preguntas que lee Google (FAQPage en datosEstructurados.js). */
function Preguntas() {
  return (
    <Box component="section" aria-labelledby="titulo-preguntas">
      <TituloSeccion>
        <span id="titulo-preguntas">Preguntas frecuentes</span>
      </TituloSeccion>
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', maxWidth: 860 }}>
        {preguntas.map((p) => (
          <Accordion
            key={p.pregunta}
            disableGutters
            square
            elevation={0}
            sx={{ bgcolor: 'transparent', borderBottom: '1px solid', borderColor: 'divider', '&::before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 56 }}>
              <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: { xs: 15, md: 17 } }}>{p.pregunta}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: 'text.secondary', lineHeight: 1.6 }}>{p.respuesta}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
