import { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { negocio } from '../config';
import { Antetitulo, Logo30, fotoAdaptable } from './ui';

export default function FacebookPreview() {
  const [mostrar, setMostrar] = useState(false);
  const [ancho, setAncho] = useState(0);
  const contenedor = useRef(null);

  // El plugin necesita el ancho real en la URL, también al girar el celular.
  // No se contacta a Facebook hasta que la persona abre la vista del perfil.
  useEffect(() => {
    if (!mostrar || !contenedor.current) return;
    const elemento = contenedor.current;
    const medir = () => setAncho(Math.min(500, Math.floor(elemento.getBoundingClientRect().width)));
    medir();
    const observer = new ResizeObserver(medir);
    observer.observe(elemento);
    return () => observer.disconnect();
  }, [mostrar]);

  if (!negocio.facebook) return null;

  const parametros = new URLSearchParams({
    href: negocio.facebook,
    tabs: '',
    width: String(ancho),
    height: '130',
    small_header: 'false',
    adapt_container_width: 'true',
    hide_cover: 'true',
    show_facepile: 'false',
    locale: 'es_LA',
  });

  return (
    <Box component="section" aria-labelledby="titulo-facebook">
      <Grid container columnSpacing={{ md: 6 }} rowSpacing={2.5} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Antetitulo color="primary.main">En ruta</Antetitulo>
          <Typography id="titulo-facebook" variant="h2" sx={{ fontSize: { xs: 26, md: 36 }, mt: 0.75, maxWidth: 440 }}>
            También estamos en Facebook
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: { xs: 15, md: 17 }, lineHeight: 1.6, maxWidth: 440 }}>
            Conozca un poco más de nuestro día a día: fotos del camión, la carga y los viajes que compartimos desde la carretera.
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: 14, color: 'text.secondary' }}>
            Síganos y acompañe a Nelson en cada recorrido.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
          <Card sx={{ width: '100%', maxWidth: 500, mx: 'auto', overflow: 'hidden' }}>
            <Box
              component="img"
              {...fotoAdaptable('/img/carga-en-carretera.webp', '(min-width: 600px) 500px, calc(100vw - 40px)')}
              alt="Camión de Transportes Treinta con carga en sacos junto a una bodega"
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
              sx={{ display: 'block', width: '100%', height: { xs: 140, md: 170 }, objectFit: 'cover', objectPosition: 'center 55%', bgcolor: 'concreto.main' }}
            />
            <Box sx={{ px: { xs: 2, md: 2.5 }, pb: 2, pt: 2 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Logo30 tamaño={56} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography component="h3" sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: { xs: 19, md: 22 }, lineHeight: 1.2 }}>
                    {negocio.nombre}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mt: 0.5, color: 'text.secondary' }}>
                    <FacebookIcon sx={{ fontSize: 16, color: '#1877f2' }} />
                    <Typography sx={{ fontSize: 13 }}>Facebook · Pital, San Carlos</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Typography sx={{ mt: 1.75, mb: 2, fontSize: 14, lineHeight: 1.5 }}>
                {negocio.lema} Transporte de carga desde la Zona Norte a todo Costa Rica.
              </Typography>
              <Button href={negocio.facebook} target="_blank" rel="noopener noreferrer" variant="contained" fullWidth startIcon={<FacebookIcon />} endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}>
                Ver en Facebook
              </Button>
              <Button
                fullWidth
                onClick={() => setMostrar((actual) => !actual)}
                aria-expanded={mostrar}
                aria-controls="perfil-facebook"
                endIcon={<ExpandMoreIcon sx={{ transform: mostrar ? 'rotate(180deg)' : 'none' }} />}
                sx={{ mt: 0.75, fontSize: 13 }}
              >
                {mostrar ? 'Ocultar perfil de Facebook' : 'Mostrar perfil de Facebook'}
              </Button>
            </Box>

            <Box id="perfil-facebook" hidden={!mostrar} sx={{ borderTop: mostrar ? '1px solid' : 'none', borderColor: 'divider' }}>
              {mostrar && (
                <>
                  <Box ref={contenedor} sx={{ width: '100%', height: 130, bgcolor: 'background.default' }}>
                    {ancho > 0 && (
                      <Box
                        component="iframe"
                        title="Perfil de Transportes Treinta en Facebook"
                        src={`https://www.facebook.com/plugins/page.php?${parametros}`}
                        width={ancho}
                        height="130"
                        allow="encrypted-media; picture-in-picture; web-share"
                        sx={{ display: 'block', width: '100%', height: 130, border: 0 }}
                      />
                    )}
                  </Box>
                  <Typography sx={{ p: 2, fontSize: 12, lineHeight: 1.5, color: 'text.secondary' }}>
                    Si el perfil no aparece, puede abrirlo con el botón «Ver en Facebook».
                  </Typography>
                </>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
