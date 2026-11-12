import { negocio } from './config';

/**
 * Arma el link de WhatsApp.
 *
 * Siempre https://wa.me/ — nunca el esquema whatsapp://, que muere en
 * escritorios sin la app instalada. wa.me funciona en móvil, escritorio
 * y web.whatsapp.com.
 */
export function linkWhatsApp(mensaje) {
  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const linkTelefono = `tel:${negocio.telefono.replace(/\s/g, '')}`;

/**
 * Referencia corta para que cliente y chofer hablen del mismo viaje.
 */
export function nuevaReferencia() {
  return `TT-${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Mensaje estructurado de cotización.
 *
 * La primera línea es un marcador de origen: permite saber, sin ninguna
 * herramienta de analítica, cuáles mensajes vienen de la página web y
 * cuáles de Facebook o de una tarjeta. Si esta línea deja de aparecer,
 * la página dejó de generar clientes. No cambiarla.
 */
export function mensajeCotizacion({ referencia, carga, descripcion, origen, destino, fecha, nombre }) {
  const lineas = [
    '*Cotización desde la página web*',
    `Ref: ${referencia}`,
    '',
    `Carga: ${carga || '—'}`,
    descripcion ? `Detalle: ${descripcion}` : null,
    `Recoger en: ${origen || '—'}`,
    `Entregar en: ${destino || '—'}`,
    `Fecha: ${fecha || 'Por definir'}`,
    nombre ? `Nombre: ${nombre}` : null,
  ];
  return lineas.filter((l) => l !== null).join('\n');
}

export const mensajeGeneral = `*Consulta desde la página web*

Hola. Quisiera información sobre transporte de carga.`;

export const linkWhatsAppGeneral = linkWhatsApp(mensajeGeneral);
