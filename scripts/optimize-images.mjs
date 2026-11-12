import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const IMG_DIR = new URL('../public/img/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_WIDTH = 1200;

const files = await readdir(IMG_DIR);
const jpgs = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of jpgs) {
  const { name } = parse(file);
  const src = join(IMG_DIR, file);
  const webp = join(IMG_DIR, `${name}.webp`);
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 68, effort: 6 })
    .toFile(webp);
  console.log(`${file} -> ${name}.webp`);
}
console.log('done');
