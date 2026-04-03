import fs from 'fs/promises'
import path from 'path'

// Optimizes images under `public/furniture/inspiration/` to smaller `.webp` files.
// This does NOT remove or edit any watermarks/logos; it only compresses/resizes.
//
// Requires `sharp` to be installed locally (without changing the repo):
//   npm install sharp --no-save --no-package-lock

let sharp
try {
  const mod = await import('sharp')
  sharp = mod.default ?? mod
} catch {
  console.error(
    [
      'Missing dependency: sharp',
      '',
      'Install it locally (no repo changes):',
      '  npm install sharp --no-save --no-package-lock',
    ].join('\n'),
  )
  process.exit(1)
}

function parseArgs(argv) {
  const args = {
    dir: 'public/furniture/inspiration',
    maxSize: 1200,
    quality: 78,
    effort: 5,
    keepOriginals: false,
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dir') args.dir = argv[++i]
    else if (a === '--max') args.maxSize = Number(argv[++i] || '1200')
    else if (a === '--quality') args.quality = Number(argv[++i] || '78')
    else if (a === '--effort') args.effort = Number(argv[++i] || '5')
    else if (a === '--keep-originals') args.keepOriginals = true
    else if (a === '--help' || a === '-h') args.help = true
  }

  return args
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    // Only convert raster sources; skip existing webp to avoid Windows replace edge-cases.
    .filter((name) => /\.(jpe?g|png)$/i.test(name))
    .filter((name) => !/\.tmp\.webp$/i.test(name))
    .sort((a, b) => a.localeCompare(b))
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    console.log(
      [
        'Usage:',
        '  node scripts/optimize-inspiration-images.mjs [--dir public/furniture/inspiration] [--max 1200] [--quality 78] [--effort 5] [--keep-originals]',
        '',
        'Notes:',
        '- Re-encodes images to .webp and optionally deletes originals.',
      ].join('\n'),
    )
    process.exit(0)
  }

  const dir = path.resolve(process.cwd(), args.dir)
  await ensureDir(dir)

  const files = await listImages(dir)
  if (files.length === 0) {
    console.log(JSON.stringify({ dir, files: 0, optimized: 0 }, null, 2))
    return
  }

  let optimized = 0
  let bytesBefore = 0
  let bytesAfter = 0

  for (let i = 0; i < files.length; i++) {
    const name = files[i]
    const abs = path.join(dir, name)
    const st = await fs.stat(abs)
    bytesBefore += st.size

    const base = name.replace(/\.[^/.]+$/, '')
    const outName = `${base}.webp`
    const outAbs = path.join(dir, outName)
    const tmpAbs = path.join(dir, `${base}.tmp.webp`)

    const img = sharp(abs).rotate().resize({
      width: args.maxSize,
      height: args.maxSize,
      fit: 'inside',
      withoutEnlargement: true,
    })

    await img.webp({ quality: args.quality, effort: args.effort }).toFile(tmpAbs)

    // Replace existing output (Windows fs.rename won't overwrite).
    await fs.unlink(outAbs).catch(() => {})
    await fs.rename(tmpAbs, outAbs)
    optimized++

    const stOut = await fs.stat(outAbs)
    bytesAfter += stOut.size

    const isAlreadyWebp = /\.webp$/i.test(name)
    if (!args.keepOriginals && !isAlreadyWebp) {
      await fs.unlink(abs).catch(() => {})
    }

    if ((i + 1) % 25 === 0) {
      process.stderr.write(`optimized ${i + 1}/${files.length}\n`)
    }
  }

  console.log(
    JSON.stringify(
      {
        dir,
        files: files.length,
        optimized,
        bytesBefore,
        bytesAfter,
        savedBytes: bytesBefore - bytesAfter,
      },
      null,
      2,
    ),
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
