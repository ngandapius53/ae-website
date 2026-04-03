import fs from 'fs/promises'
import path from 'path'

// NOTE: This script is a best-effort filter to find *already clean* images.
// It does not edit images or remove any watermarks/logos.
//
// Requires `sharp` to be installed locally (we install it with `--no-save` when needed).
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
    src: null,
    out: null,
    max: null,
    minWidth: 0,
    minHeight: 0,
    size: 192,
    concurrency: 8,
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--src') args.src = argv[++i]
    else if (a === '--out') args.out = argv[++i]
    else if (a === '--max') args.max = Number(argv[++i])
    else if (a === '--min-width') args.minWidth = Number(argv[++i] || '0')
    else if (a === '--min-height') args.minHeight = Number(argv[++i] || '0')
    else if (a === '--size') args.size = Number(argv[++i] || '192')
    else if (a === '--concurrency') args.concurrency = Number(argv[++i] || '8')
    else if (a === '--help' || a === '-h') args.help = true
  }

  return args
}

function isBrandOrange(r, g, b) {
  // Tuned to Ashley-style orange; tries to avoid wood tones.
  if (r < 200) return false
  if (g < 80 || g > 190) return false
  if (b > 120) return false
  if (r - b < 140) return false
  if (r - g < 35) return false
  if (g - b < 35) return false
  return true
}

function isNearWhite(r, g, b) {
  return r >= 235 && g >= 235 && b >= 235
}

function isNearBlack(r, g, b) {
  return r <= 25 && g <= 25 && b <= 25
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b))
}

async function pool(items, concurrency, worker) {
  const results = new Array(items.length)
  let next = 0

  async function run() {
    while (true) {
      const i = next++
      if (i >= items.length) return
      results[i] = await worker(items[i], i)
    }
  }

  const workers = []
  const c = Math.max(1, Math.min(concurrency, items.length))
  for (let i = 0; i < c; i++) workers.push(run())
  await Promise.all(workers)
  return results
}

async function analyzeImage(filePath, size) {
  const input = await fs.readFile(filePath)

  // Resize so we can analyze quickly and consistently.
  const { data, info } = await sharp(input)
    .rotate()
    .resize(size, size, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const w = info.width
  const h = info.height
  const totalPx = w * h

  const bottomStart = Math.floor(h * 0.82)
  const topEnd = Math.ceil(h * 0.18)
  const leftEnd = Math.ceil(w * 0.22)
  const rightStart = Math.floor(w * 0.78)

  let orange = 0
  let bottomOrange = 0
  let bottomWhite = 0
  let bottomBlack = 0
  let topWhite = 0
  let topBlack = 0
  let cornerOrange = 0
  let bottomPx = 0
  let topPx = 0

  // Very small edge proxy: count high-contrast neighbors in bottom band.
  let bottomEdges = 0
  let bottomEdgeTotal = 0

  // Whole-image edge proxy to weed out flat slides.
  let edges = 0
  let edgeTotal = 0

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]

      const isO = isBrandOrange(r, g, b)
      if (isO) orange++

      const inCorner = (y < topEnd || y >= bottomStart) && (x < leftEnd || x >= rightStart)
      if (inCorner && isO) cornerOrange++

      if (y < topEnd) {
        topPx++
        if (isNearWhite(r, g, b)) topWhite++
        if (isNearBlack(r, g, b)) topBlack++
      }

      if (y >= bottomStart) {
        bottomPx++
        if (isO) bottomOrange++
        if (isNearWhite(r, g, b)) bottomWhite++
        if (isNearBlack(r, g, b)) bottomBlack++

        // Edge-ish: compare to right neighbor.
        if (x + 1 < w) {
          const idx2 = idx + 3
          const r2 = data[idx2]
          const g2 = data[idx2 + 1]
          const b2 = data[idx2 + 2]
          const diff = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2)
          if (diff > 140) bottomEdges++
          bottomEdgeTotal++
        }
      }

      // Whole-image edge-ish: compare to right neighbor.
      if (x + 1 < w) {
        const idx2 = idx + 3
        const r2 = data[idx2]
        const g2 = data[idx2 + 1]
        const b2 = data[idx2 + 2]
        const diff = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2)
        if (diff > 140) edges++
        edgeTotal++
      }
    }
  }

  const orangeFrac = orange / totalPx
  const bottomOrangeFrac = bottomOrange / Math.max(1, bottomPx)
  const bottomWhiteFrac = bottomWhite / Math.max(1, bottomPx)
  const bottomBlackFrac = bottomBlack / Math.max(1, bottomPx)
  const topWhiteFrac = topWhite / Math.max(1, topPx)
  const topBlackFrac = topBlack / Math.max(1, topPx)
  const cornerOrangeFrac = cornerOrange / totalPx
  const bottomEdgeFrac = bottomEdges / Math.max(1, bottomEdgeTotal)
  const edgeFrac = edges / Math.max(1, edgeTotal)

  return {
    orangeFrac,
    bottomOrangeFrac,
    bottomWhiteFrac,
    bottomBlackFrac,
    topWhiteFrac,
    topBlackFrac,
    cornerOrangeFrac,
    bottomEdgeFrac,
    edgeFrac,
  }
}

function pickCandidates(rows, max) {
  // Heuristics:
  // - Very low orange across the image (avoid orange-logo/contact/sale labels).
  // - No orange in corners (logos tend to live there).
  // - Bottom band should not look like a banner (white-on-black or heavy edges).
  //
  // These are best-effort. Always manually review the chosen set.
  const candidates = rows
    .filter((r) => r)
    .filter((r) => r.width >= r.minWidth && r.height >= r.minHeight)
    .filter((r) => r.metrics.orangeFrac <= 0.0022)
    .filter((r) => r.metrics.cornerOrangeFrac <= 0.00025)
    .filter((r) => r.metrics.bottomOrangeFrac <= 0.0012)
    // Drop letterboxed / screenshot-y assets (common for branded story exports).
    .filter((r) => r.metrics.topBlackFrac <= 0.65 && r.metrics.bottomBlackFrac <= 0.65)
    .filter((r) => !(r.metrics.bottomWhiteFrac > 0.18 && r.metrics.bottomBlackFrac > 0.08))
    .filter((r) => r.metrics.bottomEdgeFrac <= 0.27)
    // Drop flat slides.
    .filter((r) => r.metrics.edgeFrac >= 0.012)
    .sort((a, b) => {
      // Lowest orange, then least banner-y.
      if (a.metrics.orangeFrac !== b.metrics.orangeFrac) return a.metrics.orangeFrac - b.metrics.orangeFrac
      if (a.metrics.cornerOrangeFrac !== b.metrics.cornerOrangeFrac)
        return a.metrics.cornerOrangeFrac - b.metrics.cornerOrangeFrac
      if (a.metrics.bottomEdgeFrac !== b.metrics.bottomEdgeFrac) return a.metrics.bottomEdgeFrac - b.metrics.bottomEdgeFrac
      return a.file.localeCompare(b.file)
    })

  return typeof max === 'number' && Number.isFinite(max) && max > 0 ? candidates.slice(0, max) : candidates
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help || !args.src) {
    console.log(
      [
        'Usage:',
        '  node scripts/select-plain-ashley-photos.mjs --src <folder> [--out <json>] [--max <n>]',
        '',
        'Examples:',
        '  node scripts/select-plain-ashley-photos.mjs --src tmp/ashley_300 --out tmp/plain_candidates.json --max 150',
        '',
        'Notes:',
        '- This does NOT remove or edit any watermarks.',
        '- It only tries to pick images that already look clean.',
      ].join('\n'),
    )
    process.exit(args.help ? 0 : 1)
  }

  const srcDir = path.resolve(process.cwd(), args.src)
  const outPath = args.out ? path.resolve(process.cwd(), args.out) : null

  const files = await listImages(srcDir)
  const absoluteFiles = files.map((name) => path.join(srcDir, name))

  const sizes = await pool(
    absoluteFiles,
    Math.max(1, Math.min(16, args.concurrency || 8)),
    async (absPath) => {
      const st = await fs.stat(absPath)
      return { absPath, bytes: st.size }
    },
  )

  const analyzed = await pool(
    sizes,
    Math.max(1, Math.min(12, args.concurrency || 8)),
    async (item, i) => {
      const file = path.basename(item.absPath)
      try {
        const meta = await sharp(item.absPath).metadata()
        const width = meta.width ?? 0
        const height = meta.height ?? 0
        const metrics = await analyzeImage(item.absPath, args.size || 192)
        return {
          file,
          src: item.absPath,
          bytes: item.bytes,
          width,
          height,
          minWidth: args.minWidth || 0,
          minHeight: args.minHeight || 0,
          metrics,
        }
      } catch {
        return null
      } finally {
        if ((i + 1) % 100 === 0) {
          process.stderr.write(`analyzed ${i + 1}/${sizes.length}\n`)
        }
      }
    },
  )

  const rows = analyzed.filter(Boolean)
  const candidates = pickCandidates(rows, args.max)

  const payload = {
    srcDir,
    totalFiles: files.length,
    analyzed: rows.length,
    selected: candidates.length,
    selectedFiles: candidates.map((c) => ({
      file: c.file,
      bytes: c.bytes,
      width: c.width,
      height: c.height,
      metrics: Object.fromEntries(Object.entries(c.metrics).map(([k, v]) => [k, Number(v.toFixed(6))])),
    })),
  }

  if (outPath) {
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf8')
  }

  console.log(JSON.stringify(payload, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
