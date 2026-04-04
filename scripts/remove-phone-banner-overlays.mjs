/**
 * Detects dark semi-transparent phone-number banners (white digits on dark tag)
 * in the lower portion of photos and replaces masked pixels using a blurred clone.
 *
 * Usage:
 *   node scripts/remove-phone-banner-overlays.mjs           # dry-run (safe scope)
 *   node scripts/remove-phone-banner-overlays.mjs --apply   # overwrite files
 *   node scripts/remove-phone-banner-overlays.mjs --apply --all-images  # entire public/ (risky)
 *
 * Default scope (avoids false positives on studio catalog shots): files under
 * public/perfumes/, public/luxury-fragrance/, or any basename matching /WhatsApp/i.
 */

import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

let sharp
try {
  const mod = await import('sharp')
  sharp = mod.default ?? mod
} catch {
  console.error('Install sharp: npm install sharp --save-dev')
  process.exit(1)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', 'public')
const EXT = new Set(['.jpeg', '.jpg', '.png', '.webp'])

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (EXT.has(path.extname(name).toLowerCase())) out.push(p)
  }
  return out
}

function defaultScope(relPosix, baseName) {
  if (/whatsapp/i.test(baseName)) return true
  return relPosix.startsWith('perfumes/') || relPosix.startsWith('luxury-fragrance/')
}

/** Box max filter (radius r); one pass over the image. */
function localMaxMap(lum, w, h, r) {
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let mx = 0
      for (let dy = -r; dy <= r; dy++) {
        const yy = y + dy
        if (yy < 0 || yy >= h) continue
        const row = yy * w
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx
          if (xx < 0 || xx >= w) continue
          const v = lum[row + xx]
          if (v > mx) mx = v
        }
      }
      out[y * w + x] = mx
    }
  }
  return out
}

/** Binary dilation: horizontal then vertical (fast separable approximation). */
function dilateSeparable(mask, w, h, yMin, yMax, rx, ry) {
  const tmp = new Uint8Array(w * h)
  for (let y = yMin; y < yMax; y++) {
    const row = y * w
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let dx = -rx; dx <= rx && !v; dx++) {
        const xx = x + dx
        if (xx >= 0 && xx < w && mask[row + xx]) v = 1
      }
      tmp[row + x] = v
    }
  }
  const out = new Uint8Array(w * h)
  for (let y = yMin; y < yMax; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let dy = -ry; dy <= ry && !v; dy++) {
        const yy = y + dy
        if (yy >= yMin && yy < yMax && tmp[yy * w + x]) v = 1
      }
      out[y * w + x] = v
    }
  }
  return out
}

function analyzeRegion(lum, lumMax, w, h, yStart, yEnd, clipRightX = null) {
  const mask = new Uint8Array(w * h)
  const xScan = clipRightX == null ? w : Math.min(w, clipRightX)
  for (let y = yStart; y < yEnd; y++) {
    for (let x = 0; x < xScan; x++) {
      const p = y * w + x
      const L = lum[p]
      const mx = lumMax[p]
      if (L < 80) {
        mask[p] = 1
      } else if (L < 132 && mx > 222) {
        mask[p] = 1
      }
    }
  }
  let dilated = dilateSeparable(mask, w, h, yStart, yEnd, 4, 3)
  dilated = dilateSeparable(dilated, w, h, yStart, yEnd, 3, 2)
  if (clipRightX != null) {
    const cap = Math.min(w, clipRightX + 25)
    for (let y = yStart; y < yEnd; y++) {
      for (let x = cap; x < w; x++) {
        dilated[y * w + x] = 0
      }
    }
  }

  return dilated
}

function validateBox(w, h, cnt, minX, minY, maxX, maxY, yStart) {
  const area = w * h
  if (cnt < 90) return null
  if (cnt > area * 0.032) return null

  const bw = maxX - minX + 1
  const bh = maxY - minY + 1
  if (bh > h * 0.42) return null
  // Overlay is almost always in the lower part of the photo.
  if (maxY < h * 0.58) return null
  if (bw < w * 0.045) return null
  // Wide banner OR stacked two-line numbers (taller than wide).
  const wideBanner = bw >= bh * 0.72
  const stackedDigits = bh >= bw * 0.75 && bw >= w * 0.1 && bh >= h * 0.04
  if (!wideBanner && !stackedDigits) return null
  // Phone tags are compact; reject full-width bottom shadows/bands.
  if (bw > w * 0.52) return null

  // Must sit mostly in the searched band (banner stickers live in lower photo)
  const centerY = (minY + maxY) / 2
  if (centerY < yStart + h * 0.02) return null

  const padX = Math.max(8, Math.floor(bw * 0.1))
  const padY = Math.max(8, Math.floor(bh * 0.18))
  minX = Math.max(0, minX - padX)
  maxX = Math.min(w - 1, maxX + padX)
  minY = Math.max(0, minY - padY)
  maxY = Math.min(h - 1, maxY + padY)

  return { minX, minY, maxX, maxY }
}

/** 4-connected components on dilated mask (y >= yStart). Returns bbox + pixel count per blob. */
function connectedComponents(dilated, w, h, yStart) {
  const seen = new Uint8Array(w * h)
  const out = []
  for (let y = yStart; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x
      if (!dilated[p] || seen[p]) continue
      const stack = [[x, y]]
      seen[p] = 1
      let minX = x
      let maxX = x
      let minY = y
      let maxY = y
      let count = 0
      while (stack.length) {
        const [cx, cy] = stack.pop()
        count++
        if (cx < minX) minX = cx
        if (cx > maxX) maxX = cx
        if (cy < minY) minY = cy
        if (cy > maxY) maxY = cy
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const nx = cx + dx
          const ny = cy + dy
          if (nx < 0 || nx >= w || ny < yStart || ny >= h) continue
          const np = ny * w + nx
          if (!dilated[np] || seen[np]) continue
          seen[np] = 1
          stack.push([nx, ny])
        }
      }
      out.push({ minX, minY, maxX, maxY, count })
    }
  }
  return out
}

function pickStickerComponent(components, w, h, yStart) {
  const scored = components
    .map((c) => {
      const bw = c.maxX - c.minX + 1
      const bh = c.maxY - c.minY + 1
      const box = validateBox(w, h, c.count, c.minX, c.minY, c.maxX, c.maxY, yStart)
      if (!box) return null
      const touchesBottom = c.maxY >= h - 4
      const leftBias = 1 - c.minX / w
      const compact = bw * bh
      let score = (touchesBottom ? 8000 : 0) + leftBias * 2000 - compact * 0.15
      return { c, box, score, touchesBottom }
    })
    .filter(Boolean)

  if (!scored.length) return null
  scored.sort((a, b) => b.score - a.score)
  return scored[0]
}

function maskFromComponent(dilated, w, h, yStart, comp) {
  let sx = -1
  let sy = -1
  for (let y = comp.minY; y <= comp.maxY && sx < 0; y++) {
    for (let x = comp.minX; x <= comp.maxX; x++) {
      if (dilated[y * w + x]) {
        sx = x
        sy = y
        break
      }
    }
  }
  if (sx < 0) return null

  const only = new Uint8Array(w * h)
  const seen = new Uint8Array(w * h)
  const stack = [[sx, sy]]
  seen[sy * w + sx] = 1
  while (stack.length) {
    const [cx, cy] = stack.pop()
    only[cy * w + cx] = 1
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx < 0 || nx >= w || ny < yStart || ny >= h) continue
      const np = ny * w + nx
      if (!dilated[np] || seen[np]) continue
      seen[np] = 1
      stack.push([nx, ny])
    }
  }
  return only
}

async function loadPreviewLuminance(filePath) {
  const { data, info } = await sharp(filePath)
    .rotate()
    .resize(640, 640, { fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const w = info.width
  const h = info.height
  const ch = info.channels
  const lum = new Float32Array(w * h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch
      lum[y * w + x] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    }
  }
  return { lum, sw: w, sh: h }
}

function mapPreviewToFull(x, y, w0, h0, sw, sh) {
  return {
    fx: Math.max(0, Math.min(w0 - 1, Math.round((x * w0) / sw))),
    fy: Math.max(0, Math.min(h0 - 1, Math.round((y * h0) / sh))),
  }
}

function detectSticker(lum, lumMax, sw, sh, yStart, clipRightX) {
  const dilated = analyzeRegion(lum, lumMax, sw, sh, yStart, sh, clipRightX)
  const comps = connectedComponents(dilated, sw, sh, yStart)
  const picked = pickStickerComponent(comps, sw, sh, yStart)
  if (!picked) return null
  let only = maskFromComponent(dilated, sw, sh, yStart, picked.c)
  if (!only) return null
  only = dilateSeparable(only, sw, sh, yStart, sh, 2, 2)
  return { mask: only, box: picked.box }
}

async function processFile(filePath, apply) {
  const meta = await sharp(filePath).metadata()
  if (!meta.width || !meta.height) return { changed: false, filePath }
  const w0 = meta.width
  const h0 = meta.height

  const { lum, sw, sh } = await loadPreviewLuminance(filePath)
  const lumMax = localMaxMap(lum, sw, sh, 4)

  const leftClip = Math.ceil(sw * 0.62)
  const yStart = Math.floor(sh * 0.42)
  let det = detectSticker(lum, lumMax, sw, sh, yStart, leftClip)
  if (!det) det = detectSticker(lum, lumMax, sw, sh, Math.floor(sh * 0.35), leftClip)
  if (!det) det = detectSticker(lum, lumMax, sw, sh, yStart, null)

  if (!det?.mask) {
    return { changed: false, filePath }
  }

  const box = det.box
  const { minX: sx0, minY: sy0, maxX: sx1, maxY: sy1 } = box
  const tl = mapPreviewToFull(sx0, sy0, w0, h0, sw, sh)
  const br = mapPreviewToFull(sx1, sy1, w0, h0, sw, sh)
  let x0 = Math.min(tl.fx, br.fx)
  let y0 = Math.min(tl.fy, br.fy)
  let x1 = Math.max(tl.fx, br.fx)
  let y1 = Math.max(tl.fy, br.fy)

  const finalMask = new Uint8Array(w0 * h0)
  for (let fy = y0; fy <= y1; fy++) {
    const sy = Math.min(sh - 1, Math.floor((fy * sh) / h0))
    for (let fx = x0; fx <= x1; fx++) {
      const sx = Math.min(sw - 1, Math.floor((fx * sw) / w0))
      if (det.mask[sy * sw + sx]) finalMask[fy * w0 + fx] = 1
    }
  }

  let mcount = 0
  for (let fy = y0; fy <= y1; fy++) {
    for (let fx = x0; fx <= x1; fx++) {
      if (finalMask[fy * w0 + fx]) mcount++
    }
  }

  const minPixels = Math.max(80, Math.floor((w0 * h0 * 80) / (1920 * 1080)))
  if (mcount < minPixels) return { changed: false, filePath }
  if (mcount > w0 * h0 * 0.014) return { changed: false, filePath }

  if (!apply) {
    return {
      changed: true,
      filePath,
      bbox: { x0, y0, x1, y1, bw: x1 - x0 + 1, bh: y1 - y0 + 1, pixels: mcount },
    }
  }

  const { data, info } = await sharp(filePath).rotate().ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const ch = info.channels
  const blurredBuf = await sharp(filePath).rotate().blur(32).ensureAlpha().raw().toBuffer()
  const out = Buffer.from(data)

  for (let fy = y0; fy <= y1; fy++) {
    for (let fx = x0; fx <= x1; fx++) {
      if (!finalMask[fy * w0 + fx]) continue
      const i = (fy * w0 + fx) * ch
      out[i] = blurredBuf[i]
      out[i + 1] = blurredBuf[i + 1]
      out[i + 2] = blurredBuf[i + 2]
      if (ch === 4) out[i + 3] = data[i + 3]
    }
  }

  const ext = path.extname(filePath).toLowerCase()
  const pipeline = sharp(out, { raw: { width: w0, height: h0, channels: ch } }).withMetadata(false)

  const tmp = `${filePath}.tmp`
  if (ext === '.png') {
    await pipeline.png({ compressionLevel: 9 }).toFile(tmp)
  } else if (ext === '.webp') {
    await pipeline.webp({ quality: 88, effort: 5 }).toFile(tmp)
  } else {
    await pipeline.jpeg({ quality: 92, mozjpeg: true }).toFile(tmp)
  }

  await fsPromises.rename(tmp, filePath)
  return { changed: true, filePath, bbox: { x0, y0, x1, y1, pixels: mcount } }
}

function isMain() {
  try {
    return path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1] || '')
  } catch {
    return false
  }
}

if (isMain()) {
  const apply = process.argv.includes('--apply')
  const allImages = process.argv.includes('--all-images')
  const dirArg = process.argv.find((a) => a.startsWith('--dir='))
  const rootDir = dirArg ? path.resolve(ROOT, '..', dirArg.slice('--dir='.length)) : ROOT
  let files = walk(rootDir).sort()
  if (!allImages) {
    files = files.filter((f) => {
      const rel = path.relative(ROOT, f).replace(/\\/g, '/')
      return defaultScope(rel, path.basename(f))
    })
  }

  const scopeNote = allImages ? '(all images)' : '(WhatsApp + perfumes + luxury-fragrance only)'
  console.log(
    `Scanning ${files.length} images ${scopeNote} under ${path.relative(path.join(ROOT, '..'), rootDir) || 'public'} ...`,
  )
  const results = []
  for (const f of files) {
    try {
      const r = await processFile(f, apply)
      results.push(r)
    } catch (e) {
      console.error('FAIL', f, e.message)
    }
  }

  const hit = results.filter((r) => r.changed)
  console.log(apply ? `Patched ${hit.length} file(s).` : `Would patch ${hit.length} file(s) (dry-run).`)
  for (const r of hit) {
    console.log(' ', r.filePath.replace(rootDir + path.sep, ''))
    if (r.bbox) console.log('    bbox', r.bbox)
  }
}

export { processFile, walk, ROOT }
