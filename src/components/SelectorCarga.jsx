import { useId, useState } from 'react';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react';
import { cargas } from '../config';
import { fotoAdaptable } from './ui';
import { m } from './movimiento';

export default function SelectorCarga() {
  const [seleccion, setSeleccion] = useState(cargas[0].id);
  const grupo = useId();
  const reducir = useReducedMotion();
  const actual = cargas.find((c) => c.id === seleccion);

  return (
    <LayoutGroup id={grupo}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'minmax(240px, .65fr) minmax(0, 1fr)' }, gap: { xs: 2, md: 3 } }}>
        <Box role="group" aria-label="Elegir tipo de carga" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr' }, gap: 1, alignContent: 'start' }}>
          {cargas.map((c, i) => (
            <ButtonBase
              key={c.id}
              aria-pressed={seleccion === c.id}
              aria-controls={`${grupo}-detalle`}
              onClick={() => setSeleccion(c.id)}
              sx={{ position: 'relative', isolation: 'isolate', borderRadius: 2, overflow: 'hidden', p: { xs: 1.5, md: 1.75 }, minHeight: { xs: 66, md: 70 }, border: '1px solid', borderColor: seleccion === c.id ? 'primary.main' : 'divider', bgcolor: 'background.paper', color: seleccion === c.id ? '#fff' : 'text.primary', textAlign: 'left', justifyContent: 'flex-start', gap: 1.25 }}
            >
              {seleccion === c.id && <Box component={m.span} layoutId="carga-activa" transition={{ duration: reducir ? 0 : 0.3 }} sx={{ position: 'absolute', inset: 0, bgcolor: 'primary.main', zIndex: -1 }} />}
              <Box component="span" aria-hidden sx={{ fontFamily: '"Archivo", sans-serif', fontSize: 12, opacity: 0.65, display: { xs: 'none', md: 'block' } }}>{String(i + 1).padStart(2, '0')}</Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography component="span" sx={{ display: 'block', fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: { xs: 13, md: 16 }, lineHeight: 1.25 }}>{c.titulo}</Typography>
                <Typography component="span" sx={{ display: { xs: 'none', md: 'block' }, fontSize: 12, mt: 0.5, opacity: 0.7 }}>{c.corto}</Typography>
              </Box>
              {seleccion === c.id && <CheckIcon sx={{ fontSize: 18, color: 'secondary.main', flex: 'none' }} />}
            </ButtonBase>
          ))}
        </Box>

        <Box component={m.div} layout="size" transition={{ layout: { duration: reducir ? 0 : 0.25 } }} id={`${grupo}-detalle`} sx={{ borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', overflow: 'hidden', minWidth: 0 }}>
          <Box sx={{ position: 'relative', height: { xs: 230, sm: 300, md: 310 }, bgcolor: 'primary.dark', overflow: 'hidden' }}>
            <AnimatePresence initial={false}>
              <Box
                component={m.img}
                key={actual.id}
                {...fotoAdaptable(actual.foto, '(min-width: 900px) 700px, 100vw')}
                alt={`Trabajo de Transportes Treinta: ${actual.titulo.toLowerCase()}`}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: reducir ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducir ? 0 : 0.3 }}
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
              />
            </AnimatePresence>
            <Box sx={{ position: 'absolute', left: 16, top: 16, bgcolor: 'rgba(10,46,31,.9)', color: '#fff', px: 1.5, py: 0.75, borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: '.05em' }}>UN CAMIÓN. DISTINTOS TRABAJOS.</Box>
          </Box>
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Cada descripción permanece en el HTML pre-renderizado. */}
            {cargas.map((c) => (
              <Box component={m.div} key={c.id} hidden={seleccion !== c.id} animate={{ opacity: seleccion === c.id ? 1 : 0 }} transition={{ duration: reducir ? 0 : 0.22 }}>
                <Typography component="h3" sx={{ fontFamily: '"Archivo", sans-serif', fontSize: { xs: 23, md: 28 }, fontWeight: 800, lineHeight: 1.15 }}>{c.titulo}</Typography>
                <Typography sx={{ color: 'text.secondary', mt: 1, mb: 2, fontSize: { xs: 14, md: 16 }, lineHeight: 1.5, minHeight: { md: 48 } }}>{c.detalle}</Typography>
                <Button component={RouterLink} nativeButton={false} to={`/cotizar?carga=${c.id}`} variant="contained" color="secondary" endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>Cotizar {c.titulo.toLowerCase()}</Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Typography sx={{ mt: 1.5, fontSize: 12, color: 'text.secondary' }}>Servicio para carga pesada desde Pital, San Carlos. No hacemos mudanzas residenciales.</Typography>
    </LayoutGroup>
  );
}
