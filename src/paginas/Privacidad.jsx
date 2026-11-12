import { Button, Container, Link, Typography } from '@mui/material';
import { negocio } from '../config';
import { preferenciasAnalitica } from '../analitica';
import { CabeceraPagina, margen } from '../components/ui';

export default function Privacidad() {
  return <>
    <CabeceraPagina antetitulo="Su información" titulo="Privacidad y medición de visitas" />
    <Container sx={{ px: margen, py: 4, maxWidth: 800, '& h2': { mt: 3, mb: 1, fontSize: 23 } }}>
      <Typography>Última actualización: 5 de noviembre de 2026.</Typography>
      <Typography component="h2" variant="h3">Su cotización</Typography>
      <Typography>Lo que escribe en el cotizador se usa para preparar un mensaje de WhatsApp. El sitio no guarda un registro de esas cotizaciones en una base de datos. Usted revisa el mensaje antes de enviarlo. Si lo envía, Nelson recibe los detalles para atender su solicitud, y se aplican también las condiciones de WhatsApp.</Typography>
      <Typography component="h2" variant="h3">Visitas y contactos</Typography>
      <Typography>Usamos Vercel Web Analytics para estadísticas generales de visitas y Vercel Speed Insights para revisar el rendimiento de la página. Con su permiso, Google Analytics utiliza cookies para medir las páginas visitadas, los pasos del cotizador y los clics de WhatsApp, teléfono o reseñas. No enviamos a Google Analytics su nombre, la descripción de la carga, los lugares escritos en el cotizador ni el contenido del mensaje de WhatsApp. Un clic de contacto no confirma un viaje contratado.</Typography>
      <Typography sx={{ mt: 2 }}>Puede rechazar Google Analytics y seguir usando la página y el cotizador. También puede cambiar su elección aquí. Al desactivarlo, dejamos de enviar nuevos eventos; puede borrar las cookies ya guardadas desde su navegador.</Typography>
      <Button onClick={preferenciasAnalitica} variant="outlined" sx={{ mt: 2 }}>Cambiar preferencias de analítica</Button>
      <Typography component="h2" variant="h3">Servicios externos</Typography>
      <Typography>Al abrir WhatsApp, Google Maps, Facebook o Instagram, visita un servicio externo. El perfil de Facebook integrado se carga únicamente cuando elige mostrarlo.</Typography>
      <Typography component="h2" variant="h3">Contacto</Typography>
      <Typography>Para consultar sobre su información, escriba a <Link href={`mailto:${negocio.email}`}>{negocio.email}</Link> o contacte a Nelson al {negocio.whatsappVisible}.</Typography>
    </Container>
  </>;
}
