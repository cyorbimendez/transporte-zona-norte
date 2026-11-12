/* Última página visitada fuera del cotizador, para que la X del
   cotizador lo devuelva adonde estaba (y no al paso anterior). */
let ultima = '/';

export function recordarPagina(pathname) {
  if (pathname !== '/cotizar') ultima = pathname;
}

export function paginaAnterior() {
  return ultima;
}
