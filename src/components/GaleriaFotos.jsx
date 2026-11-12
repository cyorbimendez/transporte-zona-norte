import { useId, useState } from 'react';
import { Box, ButtonBase, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react';
import { fotoAdaptable } from './ui';
import { m } from './movimiento';

export default function GaleriaFotos({ fotos }) {
  const [indice, setIndice] = useState(null);
  const [cerrando, setCerrando] = useState(false);
  const [direccion, setDireccion] = useState(1);
  const grupo = useId();
  const reducir = useReducedMotion();
  const foto = fotos[indice ?? 0];
  const cerrar = () => setCerrando(true);
  const mover = (paso) => {
    if (cerrando) return;
    setDireccion(paso);
    setIndice((actual) => (actual + paso + fotos.length) % fotos.length);
  };

  return (
    <LayoutGroup id={grupo}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: fotos.length === 3 ? '2fr 1fr' : 'repeat(4, 1fr)' }, gap: { xs: 1.25, md: 2 } }}>
        {fotos.map((item, i) => (
          <Box key={item.foto} component="figure" sx={{ m: 0, minWidth: 0, gridColumn: i === 0 ? { xs: '1 / -1', md: fotos.length === 3 ? '1' : 'span 2' } : fotos.length > 3 && i === fotos.length - 1 ? { xs: '1 / -1', md: 'span 2' } : undefined, gridRow: i === 0 ? { md: 'span 2' } : undefined }}>
            <ButtonBase
              aria-label={`Ampliar foto: ${item.titulo || item.alt}`}
              onClick={() => { setDireccion(1); setCerrando(false); setIndice(i); }}
              sx={{ position: 'relative', width: '100%', height: i === 0 ? { xs: 260, md: 456 } : { xs: 160, md: 220 }, borderRadius: 2.5, overflow: 'hidden', display: 'block', bgcolor: 'primary.dark', textAlign: 'left', '&:hover .ampliar': { bgcolor: 'secondary.main', color: 'primary.dark' } }}
            >
              <Box component={m.img} layoutId={`foto-${i}`} transition={{ layout: { duration: reducir ? 0 : 0.35 } }} {...fotoAdaptable(item.foto, i === 0 ? '(min-width: 900px) 760px, 100vw' : '(min-width: 900px) 380px, 50vw')} alt={item.alt} loading="lazy" decoding="async" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', display: 'block', opacity: indice === i && !cerrando ? 0 : 1 }} />
              <Box component="span" aria-hidden className="ampliar" sx={{ position: 'absolute', right: 12, top: 12, width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'rgba(10,46,31,.8)', color: '#fff', transition: 'background-color .2s' }}><OpenInFullIcon sx={{ fontSize: 15 }} /></Box>
              <Box component="span" sx={{ position: 'absolute', inset: 'auto 0 0', background: 'linear-gradient(transparent, rgba(4,24,15,.9))', color: '#fff', px: { xs: 1.5, md: 2 }, pt: 5, pb: 1.75 }}>
                <Typography component="span" sx={{ display: 'block', fontWeight: 600, fontSize: i === 0 ? { xs: 17, md: 21 } : { xs: 12, md: 14 }, lineHeight: 1.3 }}>{item.titulo || item.alt}</Typography>
              </Box>
            </ButtonBase>
          </Box>
        ))}
      </Box>

      <Modal open={indice !== null} onClose={cerrar} slotProps={{ backdrop: { sx: { bgcolor: 'rgba(3,20,12,.88)' } } }}>
        <Box component={m.div} layoutRoot tabIndex={-1} onClick={(e) => { if (e.target === e.currentTarget) cerrar(); }} sx={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 1.5, md: 4 }, outline: 'none' }}>
          <AnimatePresence onExitComplete={() => { setIndice(null); setCerrando(false); }}>
            {!cerrando && (
              <Box component={m.section} key="visor" role="dialog" aria-modal="true" aria-labelledby={`${grupo}-titulo`} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducir ? 0 : 0.12, delay: reducir ? 0 : 0.22 }} onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); mover(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); mover(-1); } }} sx={{ width: '100%', maxWidth: 1100, bgcolor: 'primary.dark', color: '#fff', borderRadius: 3, minWidth: 0 }}>
                <Stack direction="row" sx={{ px: 2, py: 1, gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography id={`${grupo}-titulo`} sx={{ fontWeight: 600, fontSize: { xs: 13, md: 17 }, lineHeight: 1.3 }}>{foto.titulo || foto.alt}</Typography>
                  <IconButton autoFocus onClick={cerrar} aria-label="Cerrar foto" sx={{ color: '#fff', flex: 'none', width: 44, height: 44 }}><CloseIcon /></IconButton>
                </Stack>
                <Box sx={{ position: 'relative', height: { xs: '55dvh', md: '68dvh' } }}>
                  <AnimatePresence initial={false} custom={direccion}>
                    <Box component={m.img} key={foto.foto} layoutId={`foto-${indice}`} src={foto.foto} alt={foto.alt} draggable={false} custom={direccion} variants={{ entrar: (d) => ({ opacity: 0, x: reducir ? 0 : d * 24 }), visible: { opacity: 1, x: 0 }, salir: (d) => ({ opacity: 0, x: reducir ? 0 : -d * 24 }) }} initial="entrar" animate="visible" exit="salir" transition={{ duration: reducir ? 0 : 0.2, layout: { duration: reducir ? 0 : 0.35 } }} drag={reducir ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18} onDragEnd={(_e, info) => { if (info.offset.x < -60) mover(1); if (info.offset.x > 60) mover(-1); }} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', touchAction: 'pan-y' }} />
                  </AnimatePresence>
                </Box>
                <Stack direction="row" sx={{ px: 2, py: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton onClick={() => mover(-1)} aria-label="Foto anterior" sx={{ color: '#fff', width: 44, height: 44 }}><ChevronLeftIcon /></IconButton>
                  <Typography aria-live="polite" sx={{ fontSize: 13 }}>{(indice ?? 0) + 1} de {fotos.length}</Typography>
                  <IconButton onClick={() => mover(1)} aria-label="Foto siguiente" sx={{ color: '#fff', width: 44, height: 44 }}><ChevronRightIcon /></IconButton>
                </Stack>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    </LayoutGroup>
  );
}
