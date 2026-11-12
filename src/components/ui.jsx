import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { linkWhatsAppGeneral } from '../whatsapp';

/* Margen lateral de todas las páginas: 20 px en celular. */
export const margen = { xs: 2.5, sm: 3 };

/* Versión liviana de una foto para tarjetas (ver scripts/miniaturas.mjs). */
export const mini = (src) => src.replace('/img/', '/img/mini/');

/* Props de <img> que dejan al navegador elegir miniatura o foto
   completa según el tamaño en pantalla. */
export const fotoAdaptable = (src, sizes) => ({
  src: mini(src),
  srcSet: `${mini(src)} 480w, ${src} 1200w`,
  sizes,
});

/* Franja diagonal tipo señal de carga. El único gesto decorativo. */
export function Franja({ alto = 6, paso = 10, sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        height: alto,
        flex: 'none',
        background: `repeating-linear-gradient(-45deg, #f2b10c 0 ${paso}px, #0a2e1f ${paso}px ${paso * 2}px)`,
        ...sx,
      }}
    />
  );
}

export function Logo30({ tamaño = 42 }) {
  return (
    <Box
      component="img"
      src="/img/marca/simbolo-30.webp"
      alt=""
      width={tamaño}
      height={tamaño}
      sx={{
        width: tamaño,
        height: tamaño,
        flex: 'none',
        borderRadius: 1.5,
        display: 'block',
      }}
    />
  );
}

/* Archivos del logo original, con el margen transparente recortado. */
export function Marca({ sobreOscuro = false, sx }) {
  return (
    <Box
      component="img"
      src={`/img/marca/logo-fondo-${sobreOscuro ? 'oscuro' : 'claro'}.webp`}
      alt="Transportes Treinta 30"
      width="1000"
      height="207"
      sx={{ display: 'block', width: 240, maxWidth: '100%', height: 'auto', ...sx }}
    />
  );
}

export function BotonWhatsAppRedondo({ sx }) {
  return (
    <IconButton
      href={linkWhatsAppGeneral}
      data-contact-context="mobile"
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp"
      sx={{
        width: 42,
        height: 42,
        flex: 'none',
        bgcolor: 'success.main',
        color: 'success.contrastText',
        '&:hover': { bgcolor: 'success.dark' },
        ...sx,
      }}
    >
      <WhatsAppIcon />
    </IconButton>
  );
}

export function Antetitulo({ children, color = 'secondary.main', sx }) {
  return (
    <Typography component="p" variant="overline" sx={{ color, display: 'block', ...sx }}>
      {children}
    </Typography>
  );
}

/* Cabecera verde de cada página, con la franja abajo. */
export function CabeceraPagina({ antetitulo, titulo, bajada }) {
  return (
    <Box component="header" sx={{ bgcolor: 'primary.main', color: '#fff' }}>
      <Container sx={{ px: margen, pt: { xs: 1.5, md: 6 }, pb: { xs: 2.5, md: 6 } }}>
        <Antetitulo>{antetitulo}</Antetitulo>
        <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 48 }, mt: 0.5 }}>
          {titulo}
        </Typography>
        {bajada && (
          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.82)', maxWidth: 620, display: { xs: 'none', md: 'block' } }}>
            {bajada}
          </Typography>
        )}
      </Container>
      <Franja />
    </Box>
  );
}

export function TituloSeccion({ children, accion, component = 'h2' }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: 1.5, md: 2.5 } }}>
      <Typography variant="h3" component={component} sx={{ fontSize: { xs: 19, md: 26 } }}>
        {children}
      </Typography>
      {accion}
    </Stack>
  );
}

/* Fila deslizable de lado en celular (sale del margen hasta el borde
   de la pantalla) y rejilla normal en escritorio. */
export function Deslizable({ children, columnas = 3, gap = 1.25, sx }) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: { md: `repeat(${columnas}, minmax(0, 1fr))` },
        gap: { xs: gap, md: 2.5 },
        overflowX: { xs: 'auto', md: 'visible' },
        mx: { xs: -2.5, sm: -3, md: 0 },
        px: { xs: 2.5, sm: 3, md: 0 },
        pb: { xs: 0.5, md: 0 },
        scrollSnapType: { xs: 'x mandatory', md: 'none' },
        scrollPaddingInline: { xs: '20px', sm: '24px' },
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        '& > *': { flex: 'none', scrollSnapAlign: 'start' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/* Placa de datos técnicos: dato duro, no adorno. La última celda va
   en negativo, como la placa de un camión. */
export function Placa({ datos }) {
  if (!datos?.length) return null;
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${datos.length}, auto)`,
        border: '1.5px solid',
        borderColor: 'text.primary',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {datos.map((d, i) => {
        const ultima = i === datos.length - 1;
        return (
          <Box
            key={d.etiqueta}
            sx={{
              px: 1.25,
              py: 1,
              borderLeft: i ? '1.5px solid' : 'none',
              borderColor: 'text.primary',
              bgcolor: ultima ? 'text.primary' : 'transparent',
              color: ultima ? 'background.default' : 'text.primary',
              minWidth: 0,
            }}
          >
            <Typography
              component="div"
              sx={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.72 }}
            >
              {d.etiqueta}
            </Typography>
            <Typography component="div" sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
              {d.valor}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export function PlacaReferencia({ referencia }) {
  return (
    <Box sx={{ display: 'flex', border: '1.5px solid', borderColor: 'text.primary', borderRadius: 1, overflow: 'hidden', width: 'fit-content' }}>
      <Box component="span" sx={{ px: 1.5, py: 0.75, fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 13 }}>
        Referencia
      </Box>
      <Box
        component="span"
        sx={{
          px: 1.5,
          py: 0.75,
          fontFamily: '"Archivo", sans-serif',
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: '0.04em',
          bgcolor: 'text.primary',
          color: 'background.default',
        }}
      >
        {referencia}
      </Box>
    </Box>
  );
}
