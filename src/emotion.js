import createCache from '@emotion/cache';

/* Caché de estilos de MUI (Emotion). Misma llave en el build y en el
   navegador: así el navegador reconoce los estilos que ya vienen en el
   HTML pre-renderizado y no los vuelve a insertar. */
export const crearCacheEmotion = () => createCache({ key: 'css' });
