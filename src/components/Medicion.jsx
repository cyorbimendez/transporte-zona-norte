import { useEffect, useRef, useState } from 'react';
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';
import { cambiarConsentimiento, consentimientoActual, registrarEvento, registrarPagina } from '../analitica';
import { metaDe } from '../seo';

export default function Medicion() {
  const { pathname } = useLocation();
  const [preferencia, setPreferencia] = useState(null);
  const [abierto, setAbierto] = useState(false);
  const ultima = useRef(null);
  useEffect(() => {
    setPreferencia(consentimientoActual());
    const cambio = () => setPreferencia(consentimientoActual());
    const abrir = () => setAbierto(true);
    window.addEventListener('tt-consentimiento', cambio);
    window.addEventListener('tt-preferencias', abrir);
    const clic = e => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href.startsWith('https://wa.me/')) registrarEvento('whatsapp_click', { contexto: a.dataset.contactContext || 'direct' });
      else if (href.startsWith('tel:')) registrarEvento('phone_click');
      else if (a.dataset.review === 'google') registrarEvento('review_click');
    };
    document.addEventListener('click', clic, true);
    return () => {
      window.removeEventListener('tt-consentimiento', cambio);
      window.removeEventListener('tt-preferencias', abrir);
      document.removeEventListener('click', clic, true);
    };
  }, []);
  useEffect(() => {
    if (preferencia !== 'si') { ultima.current = null; return; }
    if (ultima.current === pathname) return;
    ultima.current = pathname;
    registrarPagina(pathname, metaDe(pathname).titulo);
  }, [pathname, preferencia]);
  const elegir = valor => { cambiarConsentimiento(valor); setAbierto(false); };
  return <>
    {(abierto || preferencia === null) && <Paper component="aside" aria-label="Preferencias de analítica" elevation={3} sx={{ position: 'fixed', left: { xs: 12, sm: 24 }, right: { xs: 12, sm: 'auto' }, bottom: pathname === '/cotizar' ? 90 : { xs: 140, md: 24 }, width: { sm: 380 }, maxWidth: 'calc(100vw - 24px)', p: 2, zIndex: 1300, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 15 }}>¿Nos ayuda a mejorar la página?</Typography>
      <Typography sx={{ fontSize: 13, mt: 0.75 }}>Con su permiso medimos visitas y clics con Google Analytics. Sus datos del cotizador no se envían a esta herramienta. <Link component={RouterLink} to="/privacidad">Ver privacidad</Link>.</Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Button variant="outlined" size="small" onClick={() => elegir('no')}>No, gracias</Button>
        <Button variant="contained" size="small" onClick={() => elegir('si')}>Permitir analítica</Button>
      </Stack>
    </Paper>}
  </>;
}
