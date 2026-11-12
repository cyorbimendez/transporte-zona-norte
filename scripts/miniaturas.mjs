import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

/* Miniaturas para tarjetas y listas. Se muestran a ~170 px de ancho,
   así que 480 px alcanza para pantallas 2x/3x y pesan ~25 KB en vez
   de ~150 KB. En datos móviles rurales eso es la diferencia entre ver
   las fotos o no. */

const IMG_DIR = new URL('../public/img/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MINI_DIR = join(IMG_DIR, 'mini');
const ANCHO = 480;

await mkdir(MINI_DIR, { recursive: true });

const files = (await readdir(IMG_DIR)).filter((f) => f.endsWith('.webp'));

for (const file of files) {
  await sharp(join(IMG_DIR, file))
    .resize({ width: ANCHO, withoutEnlargement: true })
    .webp({ quality: 62, effort: 6 })
    .toFile(join(MINI_DIR, file));
  console.log(`${file} -> mini/${file}`);
}
console.log('done');
