import fs from 'fs/promises';
import path from 'path';

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true }).catch(() => {});
}

async function main() {
  const defaultSrc = 'C:\\\\Users\\\\DELL Inspiron\\\\OneDrive\\\\bb';
  const src = process.env.SRC || defaultSrc;
  const projectRoot = process.cwd();
  const dest = path.join(projectRoot, 'public', 'graphic-design');

  await ensureDir(dest);

  const entries = await fs.readdir(src, { withFileTypes: true });
  const images = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b));

  let i = 1;
  const copied = [];
  for (const name of images) {
    const ext = path.extname(name).toLowerCase();
    const newName = `gd-${String(i).padStart(2, '0')}${ext}`;
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, newName);
    await fs.copyFile(srcPath, destPath);
    copied.push(newName);
    i++;
  }

  console.log(JSON.stringify({ src, dest, count: copied.length, files: copied }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

