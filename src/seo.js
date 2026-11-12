import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { serviciosDetalle } from './serviciosDetalle';

/* Título y descripción de cada página. El build los escribe en el HTML
   de cada ruta (scripts/prerender.mjs), así Google los lee sin ejecutar
   JavaScript; al navegar dentro del sitio, usePagina los actualiza.

   Primero el servicio y el lugar, después la marca: la gente busca
   "flete San Carlos", todavía no "Transportes Treinta". */

export const SITIO = 'https://transportestreinta.com';

export const paginas = {
  ...Object.fromEntries(serviciosDetalle.map(s => [s.ruta, { nombre: s.nombre, titulo: `${s.titulo} | Transportes Treinta`, descripcion: s.descripcion }])),
  '/privacidad': {
    nombre: 'Privacidad', titulo: 'Privacidad y analítica | Transportes Treinta',
    descripcion: 'Cómo se utilizan los datos de su cotización y cómo elegir la medición de visitas en Transportes Treinta.',
  },
  '/': {
    nombre: 'Inicio',
    titulo: 'Transporte de carga y fletes en San Carlos | Transportes Treinta',
    descripcion:
      'Fletes y carga pesada desde Pital, San Carlos: piña, yuca, materiales y maquinaria a Ciudad Quesada, Aguas Zarcas, San José y todo Costa Rica. WhatsApp 8552 8204.',
  },
  '/servicios': {
    nombre: 'Servicios',
    titulo: 'Transporte de piña, yuca, materiales y maquinaria | Transportes Treinta',
    descripcion:
      'Piña y yuca en cajas, jaulas o sacos; materiales de construcción y maquinaria con entrega a domicilio; contenedores y carga general. Camión tándem de 20+ t desde San Carlos.',
  },
  '/cobertura': {
    nombre: 'Cobertura',
    titulo: 'Fletes en San Carlos, Zona Norte y todo Costa Rica | Transportes Treinta',
    descripcion:
      'Desde Pital, San Carlos: Aguas Zarcas, Ciudad Quesada, La Fortuna, Los Chiles, Sarapiquí, San José, Guanacaste, Limón y puertos. Tiempos aproximados de viaje.',
  },
  '/sobre-nosotros': {
    nombre: 'Sobre nosotros',
    titulo: 'Sobre nosotros: Nelson “30” Camacho | Transportes Treinta',
    descripcion:
      'Negocio familiar de transporte de carga en Pital, San Carlos. Nelson “30” Camacho maneja camión desde 2013: él contesta el WhatsApp y mueve la carga.',
  },
  '/cotizar': {
    nombre: 'Cotizar',
    titulo: 'Cotizar flete o transporte de carga | Transportes Treinta',
    descripcion:
      'Cotice su flete desde San Carlos en pocos pasos: tipo de carga, ruta y fecha. El mensaje le llega listo a WhatsApp.',
  },
};

export const noEncontrada = {
  titulo: 'Página no encontrada | Transportes Treinta',
  descripcion: 'Esta página no existe. Transporte de carga y fletes desde Pital, San Carlos, a todo Costa Rica.',
};

export const metaDe = (pathname) => paginas[pathname] ?? noEncontrada;

/* URL oficial de la página; null si la ruta no existe (404). */
export const canonicaDe = (pathname) => (paginas[pathname] ? SITIO + pathname : null);

/* Busca la etiqueta en <head> o la crea (en `pnpm dev` el HTML no trae
   las etiquetas de cada página: las pone el build). */
function etiqueta(tag, clave, nombre) {
  let el = document.head.querySelector(`${tag}[${clave}="${nombre}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(clave, nombre);
    document.head.appendChild(el);
  }
  return el;
}

export function usePagina() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { titulo, descripcion } = metaDe(pathname);
    const canonica = canonicaDe(pathname);
    document.title = titulo;
    etiqueta('meta', 'name', 'description').setAttribute('content', descripcion);
    etiqueta('meta', 'property', 'og:title').setAttribute('content', titulo);
    etiqueta('meta', 'property', 'og:description').setAttribute('content', descripcion);
    if (canonica) {
      etiqueta('link', 'rel', 'canonical').setAttribute('href', canonica);
      etiqueta('meta', 'property', 'og:url').setAttribute('content', canonica);
    }
  }, [pathname]);
}
