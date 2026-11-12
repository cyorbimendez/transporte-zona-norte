/* Calendario simple para elegir el día de carga. No se maneja
   disponibilidad: Nelson confirma la fecha por WhatsApp. */

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

export const encabezadoSemana = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

/* Fechas en hora local como 'AAAA-MM-DD'. Nunca toISOString(): en
   Costa Rica (UTC-6) cambia de día a las 6 p. m. */
export function aIso(fecha) {
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${m}-${d}`;
}

export function deIso(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
}

function hoy() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sumarDias(fecha, n) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + n);
}

function describir(fecha, base) {
  const iso = aIso(fecha);
  return {
    iso,
    numero: fecha.getDate(),
    dia: DIAS[fecha.getDay()],
    mes: MESES[fecha.getMonth()],
    esHoy: fecha.getTime() === base.getTime(),
    pasado: fecha < base,
    etiqueta: etiquetaFecha(iso),
  };
}

export function etiquetaFecha(iso) {
  const f = deIso(iso);
  return `${DIAS[f.getDay()]} ${f.getDate()} ${MESES[f.getMonth()]}`;
}

/* Tira de próximos días para la portada, empezando hoy. */
export function proximosDias(cantidad = 10) {
  const base = hoy();
  return Array.from({ length: cantidad }, (_, i) => describir(sumarDias(base, i), base));
}

/* Calendario de N semanas, empezando el lunes de esta semana. */
export function calendario(semanas = 6) {
  const base = hoy();
  const lunes = sumarDias(base, -((base.getDay() + 6) % 7));
  const dias = Array.from({ length: semanas * 7 }, (_, i) => describir(sumarDias(lunes, i), base));
  const primero = deIso(dias[0].iso);
  const ultimo = deIso(dias[dias.length - 1].iso);
  const mes = (f) => MESES[f.getMonth()].replace(/^./, (c) => c.toUpperCase());
  const titulo =
    primero.getMonth() === ultimo.getMonth()
      ? `${mes(primero)} ${primero.getFullYear()}`
      : `${mes(primero)} – ${mes(ultimo)} ${ultimo.getFullYear()}`;
  return { titulo, dias };
}
