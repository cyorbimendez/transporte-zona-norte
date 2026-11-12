import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react';
import { Box, Button, ButtonBase, Chip, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { cargas, destinosRapidos, negocio, noTransportamos, origenesRapidos, queSigue, rutas } from '../config';
import { calendario, encabezadoSemana, etiquetaFecha } from '../fechas';
import { linkWhatsApp, mensajeCotizacion, nuevaReferencia } from '../whatsapp';
import { paginaAnterior } from '../historial';
import { Franja, PlacaReferencia, fotoAdaptable } from '../components/ui';
import { m } from '../components/movimiento';
import { consentimientoActual, registrarEvento } from '../analitica';
import { linkWhatsAppGeneral } from '../whatsapp';

const PASOS = 4;
const HORARIOS = ['Mañana', 'Tarde', 'Flexible'];
const ETAPAS = ['Carga', 'Ruta', 'Fecha', 'Revisar'];
const tiempos = new Map([...rutas.nacional, ...rutas.zonaNorte].map((r) => [r.destino.toLowerCase(), r.tiempo]));

/* Prellenado desde el link: /cotizar?carga=agricola&destino=Limón&fecha=2026-10-02
   Así cada botón del sitio (y cada publicación de Facebook) puede
   abrir el cotizador con lo que el cliente ya eligió. */
function datosIniciales(params, dias) {
  const carga = params.get('carga');
  const fecha = params.get('fecha');
  const dia = dias.find((d) => d.iso === fecha);
  return {
    carga: cargas.some((c) => c.id === carga) ? carga : null,
    descripcion: '',
    origen: params.get('origen') || 'Pital',
    destino: params.get('destino') || '',
    fecha: dia && !dia.pasado ? fecha : null,
    flexible: false,
    horario: 'Flexible',
    nombre: '',
  };
}

export default function Cotizar() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const cal = useMemo(() => calendario(), []);
  const [q, setQ] = useState(() => datosIniciales(params, cal.dias));
  const [referencia] = useState(nuevaReferencia);
  const [enviado, setEnviado] = useState(false);
  const cambiar = (cambio) => setQ((x) => ({ ...x, ...cambio }));

  /* El paso vive en la URL para que el botón Atrás del celular vuelva
     al paso anterior en vez de sacar al cliente del cotizador. */
  const completo = [!!q.carga, !!(q.origen.trim() && q.destino.trim()), !!(q.fecha || q.flexible)];
  const maximo = completo.indexOf(false) === -1 ? PASOS : completo.indexOf(false) + 1;
  const paso = Math.min(Math.max(Number(params.get('paso')) || 1, 1), maximo);
  const puedeSeguir = paso === PASOS || completo[paso - 1];
  const listoEnviado = enviado && paso === PASOS;
  const pasoAnterior = useRef(paso);
  const medidos = useRef(new Set());
  const direccion = paso < pasoAnterior.current ? -1 : 1;
  const reducir = useReducedMotion();
  useEffect(() => { pasoAnterior.current = paso; }, [paso]);
  useEffect(() => {
    const medir = () => {
      if (consentimientoActual() !== 'si' || medidos.current.has(paso)) return;
      if (medidos.current.size === 0) registrarEvento('quote_start', { paso, carga: q.carga });
      medidos.current.add(paso);
      if (paso > 1) registrarEvento(paso === PASOS ? 'quote_review' : 'quote_step', { paso, carga: q.carga });
    };
    medir();
    window.addEventListener('tt-consentimiento', medir);
    return () => window.removeEventListener('tt-consentimiento', medir);
  }, [paso, q.carga]);

  const irA = (n) =>
    setParams((p) => {
      const nuevo = new URLSearchParams(p);
      nuevo.set('paso', String(n));
      return nuevo;
    });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (paso < PASOS) setEnviado(false);
  }, [paso, listoEnviado]);

  const cerrar = () => navigate(paginaAnterior(), { replace: true });

  const carga = cargas.find((c) => c.id === q.carga);
  const fechaTexto = q.flexible || !q.fecha ? 'Por definir' : `${etiquetaFecha(q.fecha)} · ${q.horario}`;
  const tiempo = q.origen.trim().toLowerCase() === 'pital' ? tiempos.get(q.destino.trim().toLowerCase()) : null;
  const mensaje = mensajeCotizacion({
    referencia,
    carga: carga?.titulo,
    descripcion: q.descripcion.trim(),
    origen: q.origen.trim(),
    destino: q.destino.trim(),
    fecha: fechaTexto,
    nombre: q.nombre.trim(),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: '100vh', md: 0 },
        '@supports (height: 100dvh)': { minHeight: { xs: '100dvh', md: 0 } },
        maxWidth: { md: 680 },
        mx: { md: 'auto' },
        my: { md: 5 },
        borderRadius: { md: 3 },
        overflow: { md: 'clip' },
        border: { md: '1px solid' },
        borderColor: { md: 'divider' },
        boxShadow: { md: '0 20px 50px rgba(10,46,31,.12)' },
        bgcolor: 'background.default',
      }}
    >
      <Box component="header" sx={{ position: { xs: 'sticky', md: 'static' }, top: 0, zIndex: 2, bgcolor: 'primary.main', color: '#fff' }}>
        <Stack spacing={1.75} sx={{ px: 2.5, pt: 1.5, pb: 2 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton onClick={cerrar} aria-label="Cerrar cotizador" sx={{ width: 40, height: 40, color: '#fff', border: '1px solid rgba(255,255,255,.24)' }}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ textAlign: 'center' }}>
              <Typography component="h1" sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 17 }}>
                Cotizar viaje
              </Typography>
              <Typography aria-live="polite" sx={{ fontSize: 12, color: 'rgba(255,255,255,.72)' }}>
                {listoEnviado ? 'WhatsApp abierto' : `Paso ${paso} de ${PASOS}`}
              </Typography>
            </Box>
            <Box sx={{ width: 40 }} />
          </Stack>
          <LayoutGroup id="pasos-cotizacion">
            <Box component="ol" aria-label="Pasos de la cotización" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.75 }}>
              {ETAPAS.map((etapa, i) => (
                <Box component="li" key={etapa} aria-current={paso === i + 1 ? 'step' : undefined} sx={{ position: 'relative', textAlign: 'center', pt: 1.25, pb: 0.75, borderTop: '2px solid', borderColor: i < paso ? 'secondary.main' : 'rgba(255,255,255,.2)', fontSize: 11, fontWeight: paso === i + 1 ? 700 : 400, color: i < paso ? '#fff' : 'rgba(255,255,255,.55)' }}>
                  {paso === i + 1 && <Box component={m.span} layoutId="etapa-activa" transition={{ duration: reducir ? 0 : 0.3 }} sx={{ position: 'absolute', inset: 0, borderRadius: 1, bgcolor: 'rgba(242,177,12,.14)' }} />}
                  <Box component="span" sx={{ position: 'relative' }}>{etapa}</Box>
                </Box>
              ))}
            </Box>
          </LayoutGroup>
        </Stack>
        <Franja />
      </Box>

      {!listoEnviado && paso > 1 && (
        <Box component={m.div} layout sx={{ px: { xs: 2.5, md: 4 }, pt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.75 }} aria-label="Su cotización hasta ahora">
          <AnimatePresence initial={false}>
            {[
              carga && { id: 'carga', texto: carga.titulo, paso: 1, Icono: Inventory2OutlinedIcon },
              paso > 2 && q.destino.trim() && { id: 'ruta', texto: `${q.origen.trim()} → ${q.destino.trim()}`, paso: 2, Icono: AltRouteIcon },
              paso > 3 && (q.fecha || q.flexible) && { id: 'fecha', texto: fechaTexto, paso: 3, Icono: EventOutlinedIcon },
            ].filter(Boolean).map(({ id, texto, paso: editar, Icono }) => (
              <Box component={m.div} layout key={id} initial={{ opacity: 0, y: reducir ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} sx={{ maxWidth: '100%', minWidth: 0 }}>
                <Chip icon={<Icono />} label={texto} onClick={() => irA(editar)} aria-label={`Editar ${id}: ${texto}`} sx={{ maxWidth: '100%', bgcolor: '#e2eade', color: 'primary.dark', '& .MuiChip-label': { whiteSpace: 'normal', overflowWrap: 'anywhere', py: 0.75 }, height: 'auto', minHeight: 36 }} />
              </Box>
            ))}
          </AnimatePresence>
        </Box>
      )}

      <Box sx={{ flex: 1, px: { xs: 2.5, md: 4 }, pt: 2.75, pb: 3.5 }}>
        {!listoEnviado && <Button href={linkWhatsAppGeneral} target="_blank" rel="noopener" startIcon={<WhatsAppIcon />} size="small" sx={{ mb: 2, px: 0 }}>¿Prefiere hablar con Nelson? WhatsApp directo</Button>}
        <AnimatePresence mode="wait" initial={false} custom={direccion}>
          <m.div
            key={`${paso}-${listoEnviado}`}
            custom={direccion}
            variants={{ entrar: (d) => ({ opacity: 0, x: reducir ? 0 : d * 20 }), visible: { opacity: 1, x: 0 }, salir: (d) => ({ opacity: 0, x: reducir ? 0 : d * -20 }) }}
            initial="entrar"
            animate="visible"
            exit="salir"
            transition={{ duration: reducir ? 0 : 0.18 }}
          >
            {paso === 1 && <PasoCarga q={q} cambiar={cambiar} />}
            {paso === 2 && <PasoRuta q={q} cambiar={cambiar} tiempo={tiempo} />}
            {paso === 3 && <PasoFecha q={q} cambiar={cambiar} cal={cal} />}
            {paso === 4 && !listoEnviado && (
              <PasoRevisar q={q} cambiar={cambiar} referencia={referencia} carga={carga} fechaTexto={fechaTexto} tiempo={tiempo} mensaje={mensaje} irA={irA} />
            )}
            {listoEnviado && <Enviado referencia={referencia} />}
          </m.div>
        </AnimatePresence>
      </Box>

      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 2,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          px: 2,
          pt: 1.5,
          pb: 'calc(12px + env(safe-area-inset-bottom))',
          display: 'flex',
          gap: 1.25,
        }}
      >
        {paso > 1 && !listoEnviado && (
          <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />} onClick={() => irA(paso - 1)} sx={{ px: 2.25 }}>
            Atrás
          </Button>
        )}
        {paso < PASOS && (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            disabled={!puedeSeguir}
            endIcon={<ArrowForwardIcon />}
            onClick={() => irA(paso + 1)}
            sx={{ fontWeight: 800, '&:hover': { bgcolor: 'secondary.dark' }, '&.Mui-disabled': { bgcolor: 'concreto.main', color: '#a09d95' } }}
          >
            Continuar
          </Button>
        )}
        {paso === PASOS && !listoEnviado && (
          /* Un <a> de verdad: la navegación la hace el navegador, no JS,
             así que Safari en iOS no la bloquea. El cambio de estado va
             después, en otro turno, para no quitar el enlace a medio clic. */
          <Button
            fullWidth
            href={linkWhatsApp(mensaje)}
            data-contact-context="quote"
            target="_blank"
            rel="noopener"
            variant="contained"
            color="success"
            size="large"
            startIcon={<WhatsAppIcon />}
            onClick={() => window.setTimeout(() => setEnviado(true), 0)}
            sx={{ fontWeight: 800 }}
          >
            Enviar por WhatsApp
          </Button>
        )}
        {listoEnviado && (
          <Button fullWidth variant="contained" color="primary" size="large" onClick={() => navigate('/', { replace: true })} sx={{ fontWeight: 800 }}>
            Volver al inicio
          </Button>
        )}
      </Box>
    </Box>
  );
}

function TituloPaso({ titulo, bajada }) {
  return (
    <Box sx={{ mb: 2.25 }}>
      <Typography variant="h2" sx={{ fontSize: 26 }}>
        {titulo}
      </Typography>
      {bajada && <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 0.5 }}>{bajada}</Typography>}
    </Box>
  );
}

function Etiqueta({ htmlFor, children, opcional }) {
  return (
    <Box component="label" htmlFor={htmlFor} sx={{ display: 'block', fontSize: 13, fontWeight: 600, mb: 0.75 }}>
      {children}
      {opcional && (
        <Box component="span" sx={{ fontWeight: 400, color: 'text.secondary' }}>
          {' '}
          (opcional)
        </Box>
      )}
    </Box>
  );
}

function Opciones({ opciones, valor, alElegir, etiqueta }) {
  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', mt: 1 }} role="group" aria-label={etiqueta}>
      {opciones.map((o) => {
        const activo = valor === o;
        return (
          <Chip
            key={o}
            label={o}
            clickable
            onClick={() => alElegir(o)}
            aria-pressed={activo}
            color={activo ? 'primary' : 'default'}
            variant={activo ? 'filled' : 'outlined'}
            sx={{
              borderRadius: 1,
              fontSize: 13,
              height: 32,
              borderWidth: 1.5,
              ...(activo ? {} : { bgcolor: '#fff', borderColor: 'divider' }),
            }}
          />
        );
      })}
    </Stack>
  );
}

function PasoCarga({ q, cambiar }) {
  return (
    <>
      <TituloPaso titulo="¿Qué necesita transportar?" bajada="Elija el tipo de carga." />
      <Box role="radiogroup" aria-label="Tipo de carga" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 1.25 }}>
        {cargas.map((c) => {
          const activo = q.carga === c.id;
          return (
            <ButtonBase
              key={c.id}
              role="radio"
              aria-checked={activo}
              onClick={() => cambiar({ carga: c.id })}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                textAlign: 'left',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: activo ? 'primary.main' : 'transparent',
                boxShadow: activo ? 'none' : '0 0 0 1px #e2dfd7',
              }}
            >
              <Box
                component="img"
                {...fotoAdaptable(c.foto, '(min-width: 900px) 200px, 50vw')}
                alt=""
                decoding="async"
                sx={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block', bgcolor: 'concreto.main' }}
              />
              <Box sx={{ px: 1.375, pt: 1.25, pb: 1.5 }}>
                <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{c.titulo}</Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.3, mt: 0.25 }}>{c.corto}</Typography>
              </Box>
              {activo && (
                <Box
                  aria-hidden
                  sx={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'grid', placeItems: 'center' }}
                >
                  <CheckIcon sx={{ fontSize: 16 }} />
                </Box>
              )}
            </ButtonBase>
          );
        })}
      </Box>

      <Box sx={{ mt: 2.25 }}>
        <Etiqueta htmlFor="descripcion" opcional>
          Describa la carga
        </Etiqueta>
        <TextField
          id="descripcion"
          fullWidth
          multiline
          minRows={3}
          value={q.descripcion}
          onChange={(e) => cambiar({ descripcion: e.target.value })}
          placeholder="Ej. 1,200 cajas de piña, tarimas de block, un tractor John Deere…"
        />
      </Box>

      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'flex-start', mt: 2.25, px: 1.75, py: 1.5, bgcolor: 'concreto.main', borderRadius: 1.5, fontSize: 13, lineHeight: 1.45 }}>
        <BlockIcon sx={{ fontSize: 20, color: 'primary.main', flex: 'none' }} />
        <span>No transportamos {noTransportamos.map((n) => n.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' ni $1')}.</span>
      </Stack>
    </>
  );
}

const marca = { position: 'absolute', left: 5, width: 14, height: 14 };
const linea = { position: 'absolute', left: 11, width: 2, background: 'repeating-linear-gradient(#cbc8bf 0 5px, transparent 5px 9px)' };

function PasoRuta({ q, cambiar, tiempo }) {
  return (
    <>
      <TituloPaso titulo="¿De dónde a dónde?" bajada="Escriba el lugar o toque una opción." />
      {/* Línea de ruta: cada marca va pegada a su campo, así no se
          desalinea cuando los atajos ocupan más de una fila. */}
      <Box sx={{ position: 'relative', pl: '36px', pb: 2.25 }}>
        <Box aria-hidden sx={{ ...marca, top: 45, borderRadius: '50%', border: '3px solid', borderColor: 'primary.main', bgcolor: '#fff' }} />
        <Box aria-hidden sx={{ ...linea, top: 63, bottom: 0 }} />
        <Etiqueta htmlFor="origen">Recoger en</Etiqueta>
        <TextField id="origen" fullWidth value={q.origen} onChange={(e) => cambiar({ origen: e.target.value })} placeholder="Pital" />
        <Opciones etiqueta="Lugares de salida frecuentes" opciones={origenesRapidos} valor={q.origen} alElegir={(origen) => cambiar({ origen })} />
      </Box>
      <Box sx={{ position: 'relative', pl: '36px' }}>
        <Box aria-hidden sx={{ ...linea, top: 0, height: 41 }} />
        <Box aria-hidden sx={{ ...marca, top: 45, borderRadius: 0.5, bgcolor: 'secondary.main', border: '3px solid', borderColor: 'primary.dark' }} />
        <Etiqueta htmlFor="destino">Entregar en</Etiqueta>
        <TextField id="destino" fullWidth value={q.destino} onChange={(e) => cambiar({ destino: e.target.value })} placeholder="Puerto Caldera" />
        <Opciones etiqueta="Destinos frecuentes" opciones={destinosRapidos} valor={q.destino} alElegir={(destino) => cambiar({ destino })} />
      </Box>

      {tiempo && (
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: 'center', mt: 2.5, px: 2, py: 1.75, bgcolor: 'primary.main', color: '#fff', borderRadius: 1.5, border: '2px solid #fff', boxShadow: '0 0 0 2px #10462f' }}
        >
          <ScheduleIcon sx={{ fontSize: 26, color: 'secondary.main' }} />
          <Box>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,.76)' }}>Tiempo aproximado de viaje</Typography>
            <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 18 }}>{tiempo}</Typography>
          </Box>
        </Stack>
      )}
    </>
  );
}

function PasoFecha({ q, cambiar, cal }) {
  return (
    <>
      <TituloPaso titulo="¿Para cuándo?" bajada="Elija el día de carga. Nelson le confirma la fecha por WhatsApp." />
      <Box sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 1.5, pt: 1.75, pb: 1.5 }}>
        <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 15, px: 0.5, mb: 1.25 }}>{cal.titulo}</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, textAlign: 'center' }}>
          {encabezadoSemana.map((d) => (
            <Box key={d} aria-hidden sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', pb: 0.5 }}>
              {d}
            </Box>
          ))}
          {cal.dias.map((d) => {
            const activo = !q.flexible && q.fecha === d.iso;
            return (
              <ButtonBase
                key={d.iso}
                disabled={d.pasado}
                aria-pressed={activo}
                aria-label={d.etiqueta}
                onClick={() => cambiar({ fecha: d.iso, flexible: false })}
                sx={{
                  height: 44,
                  borderRadius: 1,
                  border: '1.5px solid',
                  fontFamily: '"Archivo", sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  flexDirection: 'column',
                  lineHeight: 1.1,
                  ...(d.pasado
                    ? { bgcolor: 'transparent', color: '#c2bfb7', borderColor: 'transparent' }
                    : activo
                      ? { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main' }
                      : { bgcolor: '#fff', color: 'text.primary', borderColor: d.esHoy ? 'primary.main' : 'concreto.main' }),
                }}
              >
                {d.numero}
                {/* El 1 de cada mes lleva el mes, para no confundir el 30 de un mes con el del otro */}
                {d.numero === 1 && (
                  <Box component="span" sx={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.75 }}>
                    {d.mes}
                  </Box>
                )}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ mt: 2.25 }}>
        <Typography id="titulo-horario" sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
          Hora de carga preferida
        </Typography>
        <Box role="group" aria-labelledby="titulo-horario" sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.75 }}>
          {HORARIOS.map((h) => {
            const activo = q.horario === h;
            return (
              <Button
                key={h}
                aria-pressed={activo}
                onClick={() => cambiar({ horario: h })}
                variant={activo ? 'contained' : 'outlined'}
                color="primary"
                sx={{ fontFamily: 'inherit', fontWeight: 600, fontSize: 14, px: 1, ...(activo ? {} : { bgcolor: '#fff', borderColor: 'divider', color: 'text.primary' }) }}
              >
                {h}
              </Button>
            );
          })}
        </Box>
      </Box>

      <ButtonBase
        aria-pressed={q.flexible}
        onClick={() => cambiar({ flexible: !q.flexible, fecha: null })}
        sx={{
          mt: 2.25,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1.25,
          textAlign: 'left',
          px: 1.75,
          py: 1.5,
          borderRadius: 1.5,
          border: '1.5px solid',
          borderColor: q.flexible ? 'primary.main' : 'divider',
          bgcolor: q.flexible ? '#e0ede6' : '#fff',
        }}
      >
        <EventAvailableIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Todavía no tengo fecha</Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Cotizar primero y agendar después</Typography>
        </Box>
        {q.flexible && <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
      </ButtonBase>
    </>
  );
}

function PasoRevisar({ q, cambiar, referencia, carga, fechaTexto, tiempo, mensaje, irA }) {
  const resumen = [
    { icono: Inventory2OutlinedIcon, k: 'Carga', v: carga ? carga.titulo + (q.descripcion.trim() ? ` — ${q.descripcion.trim()}` : '') : '—', paso: 1 },
    { icono: AltRouteIcon, k: 'Ruta', v: `${q.origen.trim()} → ${q.destino.trim()}${tiempo ? ` · aprox. ${tiempo}` : ''}`, paso: 2 },
    { icono: EventOutlinedIcon, k: 'Fecha', v: fechaTexto, paso: 3 },
  ];
  return (
    <>
      <TituloPaso titulo="Revise y envíe" bajada="Se abre WhatsApp con el mensaje listo. Usted lo revisa antes de enviarlo." />
      <Stack spacing={2.25}>
        <PlacaReferencia referencia={referencia} />
        <Box>
          <Etiqueta htmlFor="nombre" opcional>
            Su nombre o empresa
          </Etiqueta>
          <TextField id="nombre" fullWidth autoComplete="name" value={q.nombre} onChange={(e) => cambiar({ nombre: e.target.value })} placeholder="Ej. Finca Los Laureles" />
        </Box>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          {resumen.map(({ icono: Icono, k, v, paso }, i) => (
            <Stack
              component="li"
              key={k}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'flex-start', px: 1.75, py: 1.5, borderBottom: i < resumen.length - 1 ? '1px solid' : 'none', borderColor: 'concreto.main' }}
            >
              <Icono sx={{ fontSize: 20, color: 'primary.main', mt: 0.25 }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{k}</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 500, overflowWrap: 'anywhere' }}>{v}</Typography>
              </Box>
              <Button size="small" onClick={() => irA(paso)} aria-label={`Editar ${k.toLowerCase()}`} sx={{ minHeight: 28, px: 1, fontFamily: 'inherit', fontWeight: 600, fontSize: 13 }}>
                Editar
              </Button>
            </Stack>
          ))}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
            Vista previa del mensaje
          </Typography>
          <Box sx={{ bgcolor: '#e5ddd5', borderRadius: 2, p: 1.75 }}>
            <Box
              sx={{
                ml: 3,
                bgcolor: '#dcf8c6',
                borderRadius: '8px 8px 2px 8px',
                px: 1.5,
                py: 1.25,
                fontSize: 13,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
                boxShadow: '0 1px 1px rgba(0,0,0,.08)',
              }}
            >
              {mensaje}
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

function Enviado({ referencia }) {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', pt: { xs: 5, md: 3 } }}>
      <Box sx={{ width: 84, height: 84, borderRadius: '50%', bgcolor: 'primary.main', display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px rgba(242,177,12,.35)' }}>
        <CheckIcon sx={{ fontSize: 44, color: 'secondary.main' }} />
      </Box>
      <Typography variant="h2" sx={{ fontSize: 28 }}>
        Mensaje listo en WhatsApp
      </Typography>
      <Typography sx={{ fontSize: 15, color: 'text.secondary', maxWidth: '30ch', lineHeight: 1.5 }}>
        Nelson responde normalmente en{' '}
        <Box component="strong" sx={{ color: 'text.primary' }}>
          {negocio.respuestaWhatsApp}
        </Box>{' '}
        con el precio y la confirmación de fecha.
      </Typography>
      <PlacaReferencia referencia={referencia} />
      <Box sx={{ width: '100%', textAlign: 'left', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mt: 1 }}>
        <Typography sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 700, fontSize: 15, mb: 1.5 }}>Qué sigue</Typography>
        <Stack component="ol" spacing={1.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {queSigue.map((t, i) => (
            <Stack component="li" key={t} direction="row" spacing={1.25} sx={{ fontSize: 14, lineHeight: 1.4 }}>
              <Box component="span" sx={{ fontFamily: '"Archivo", sans-serif', fontWeight: 800, color: 'primary.main', width: 16, flex: 'none' }}>
                {i + 1}
              </Box>
              <span>{t}</span>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
        ¿No se abrió WhatsApp? Escriba al {negocio.whatsappVisible} y mencione la referencia.
      </Typography>
    </Stack>
  );
}
