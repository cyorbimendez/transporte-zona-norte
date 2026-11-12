import { useId, useState } from 'react';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NorthIcon from '@mui/icons-material/North';
import { AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react';
import { rutas } from '../config';
import mapa from '../data/mapa-costa-rica.json';
import { m } from './movimiento';

// Ubicaciones aproximadas para el mapa ilustrativo; las curvas no son carreteras.
const lugares = {
  Pital: [-84.274, 10.451],
  'Aguas Zarcas': [-84.339, 10.375],
  'Ciudad Quesada': [-84.43, 10.323],
  Sarapiquí: [-84.018, 10.452],
  'La Fortuna': [-84.645, 10.47],
  'Santa Rosa de Pocosol': [-84.525, 10.627],
  'Los Chiles': [-84.713, 11.035],
  Upala: [-85.014, 10.898],
  'San José': [-84.08, 9.93],
  'Puerto Caldera': [-84.719, 9.912],
  Guanacaste: [-85.437, 10.635],
  'Peñas Blancas': [-85.61, 11.212],
  'Puerto Moín': [-83.085, 10.005],
  Limón: [-83.035, 9.99],
  'Zona Sur': [-83.467, 8.966],
};
const proyectar = ([lon, lat]) => [(lon + 86) * 135 + 35, (11.3 - lat) * 115 + 25];
const origen = proyectar(lugares.Pital);
const zonas = [{ id: 'zonaNorte', titulo: 'Zona Norte' }, { id: 'nacional', titulo: 'Nacional' }];

export default function ExploradorRutas() {
  const grupo = useId();
  const reducir = useReducedMotion();
  const [zona, setZona] = useState('zonaNorte');
  const [destino, setDestino] = useState(rutas.zonaNorte[0].destino);
  const actual = rutas[zona].find((r) => r.destino === destino);
  const final = proyectar(lugares[actual.destino]);
  const curva = `M${origen.join(',')} Q${(origen[0] + final[0]) / 2 + 25},${Math.min(origen[1], final[1]) - 28} ${final.join(',')}`;

  return (
    <LayoutGroup id={grupo}>
      <Box>
        <Box role="group" aria-label="Zona de cobertura" sx={{ display: 'flex', p: 0.5, gap: 0.5, bgcolor: 'concreto.main', borderRadius: 2, mb: 2 }}>
          {zonas.map((z) => (
            <ButtonBase key={z.id} aria-pressed={zona === z.id} onClick={() => { setZona(z.id); setDestino(rutas[z.id][0].destino); }} sx={{ position: 'relative', isolation: 'isolate', flex: 1, minHeight: 44, borderRadius: 1.5, color: zona === z.id ? 'primary.main' : 'text.secondary', fontWeight: 700, fontSize: 14 }}>
              {zona === z.id && <Box component={m.span} layoutId="zona-activa" transition={{ duration: reducir ? 0 : 0.3 }} sx={{ position: 'absolute', inset: 0, bgcolor: '#fff', borderRadius: 1.5, boxShadow: '0 2px 6px rgba(0,0,0,.08)', zIndex: -1 }} />}
              {z.titulo}
            </ButtonBase>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
          <Typography component="label" htmlFor={`${grupo}-destino`} sx={{ display: 'block', fontSize: 13, fontWeight: 600, mb: 0.75 }}>¿A dónde llevamos su carga?</Typography>
          <Box component="select" id={`${grupo}-destino`} value={destino} onChange={(e) => setDestino(e.target.value)} sx={{ width: '100%', minHeight: 48, borderRadius: 1.5, border: '1.5px solid', borderColor: 'divider', bgcolor: '#fff', color: 'primary.main', px: 1.5, font: 'inherit', fontWeight: 600 }}>
            {rutas[zona].map((r) => <option key={r.destino} value={r.destino}>{r.destino} · {r.tiempo}</option>)}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'minmax(250px, .75fr) minmax(0, 1fr)' }, gap: 2 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'primary.main', p: 0.75, borderRadius: 3 }}>
            <Box sx={{ border: '2px solid rgba(255,255,255,.85)', borderRadius: 2.25, px: 2, py: 1.5, height: '100%' }}>
              <Typography sx={{ color: 'rgba(255,255,255,.65)', fontSize: 11, letterSpacing: '.1em', mb: 0.25 }}>SALIDA DESDE</Typography>
              <Typography sx={{ color: '#fff', fontFamily: '"Archivo", sans-serif', fontSize: 26, fontWeight: 800, mb: 1.5 }}>Pital, San Carlos</Typography>
              {zonas.map((z) => (
                <Box key={z.id} role="group" aria-label={`Destinos de ${z.titulo}`} hidden={zona !== z.id}>
                  {rutas[z.id].map((r) => (
                    <ButtonBase key={r.destino} aria-label={`Ver ruta a ${r.destino}`} aria-pressed={destino === r.destino} onClick={() => setDestino(r.destino)} sx={{ width: '100%', minHeight: 52, position: 'relative', isolation: 'isolate', borderRadius: 1.5, color: destino === r.destino ? 'primary.dark' : '#fff', px: 1.25, py: 1, gap: 1.25, justifyContent: 'flex-start', textAlign: 'left' }}>
                      {destino === r.destino && <Box component={m.span} layoutId="ruta-activa" transition={{ duration: reducir ? 0 : 0.3 }} sx={{ position: 'absolute', inset: 0, bgcolor: 'secondary.main', borderRadius: 1.5, zIndex: -1 }} />}
                      <NorthIcon sx={{ fontSize: 18, transform: `rotate(${r.rumbo}deg)`, flex: 'none' }} />
                      <Typography component="span" sx={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{r.destino}</Typography>
                      <Typography component="span" sx={{ fontSize: 12, opacity: 0.8, flex: 'none' }}>{r.tiempo}</Typography>
                    </ButtonBase>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ bgcolor: 'primary.dark', color: '#fff', borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative', bgcolor: '#0c3826', px: 1, pt: 1, height: { xs: 280, sm: 320, md: 340 } }}>
              <m.svg viewBox="0 0 560 440" initial={false} animate={{ viewBox: zona === 'zonaNorte' ? '130 20 210 180' : '0 0 560 440' }} transition={{ duration: reducir ? 0 : 0.5 }} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }}>
                <path d={mapa.path} fill="#226b49" stroke="#4b8b6b" strokeWidth="1.5" />
                <text x="60" y="310" fill="#6eaa8a" fontSize="11" letterSpacing="2">OCÉANO PACÍFICO</text>
                <text x="390" y="100" fill="#6eaa8a" fontSize="11" letterSpacing="2">MAR CARIBE</text>
                {rutas[zona].map((r) => { const p = proyectar(lugares[r.destino]); return <circle key={r.destino} cx={p[0]} cy={p[1]} r="3.5" fill="#8eb59b" />; })}
                <AnimatePresence initial={false}>
                  <m.path key={destino} d={curva} fill="none" stroke="#f2b10c" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: reducir ? 1 : 0, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducir ? 0 : 0.65 }} />
                </AnimatePresence>
                <m.circle cx={final[0]} cy={final[1]} r="7" fill="#f2b10c" stroke="#0a2e1f" strokeWidth="3" animate={{ cx: final[0], cy: final[1] }} transition={{ duration: reducir ? 0 : 0.35 }} />
                <circle cx={origen[0]} cy={origen[1]} r="6" fill="#fff" stroke="#0a2e1f" strokeWidth="3" />
                <text x={origen[0] + 10} y={origen[1] - 10} fill="#fff" fontWeight="700" fontSize="14">Pital</text>
              </m.svg>
              <Typography sx={{ position: 'absolute', left: 16, bottom: 10, fontSize: 10, color: 'rgba(255,255,255,.55)' }}>Mapa ilustrativo · Costa Rica</Typography>
            </Box>
            <Box sx={{ p: { xs: 2, md: 2.5 } }}>
              <Box aria-live="polite" aria-atomic="true" sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,.6)', letterSpacing: '.08em' }}>SU PRÓXIMA RUTA</Typography>
                <Typography component="h3" sx={{ fontFamily: '"Archivo", sans-serif', fontSize: { xs: 21, md: 26 }, fontWeight: 800, lineHeight: 1.2, mt: 0.5 }}>Pital → {actual.destino}</Typography>
                <Typography sx={{ color: 'secondary.main', fontSize: 14, mt: 0.75 }}>Aprox. {actual.tiempo} de viaje con carga</Typography>
              </Box>
              <Button component={RouterLink} nativeButton={false} to={`/cotizar?destino=${encodeURIComponent(actual.destino)}`} variant="contained" color="secondary" endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>Cotizar esta ruta</Button>
            </Box>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 1.5, lineHeight: 1.45 }}>Tiempos aproximados desde Pital, sin contar carga y descarga. Confirmamos precio y fecha por WhatsApp.</Typography>
      </Box>
    </LayoutGroup>
  );
}
