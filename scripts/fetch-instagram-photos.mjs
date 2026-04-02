import fs from 'fs/promises'
import path from 'path'

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function parseArgs(argv) {
  const args = {
    username: null,
    count: 12,
    dest: null,
    overwrite: false,
    includeVideoCovers: true,
    allCarousel: false,
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--username' || a === '-u') {
      args.username = argv[++i]
    } else if (a === '--count' || a === '-c') {
      args.count = Number(argv[++i] || '12')
    } else if (a === '--dest' || a === '-d') {
      args.dest = argv[++i]
    } else if (a === '--overwrite') {
      args.overwrite = true
    } else if (a === '--no-video-covers') {
      args.includeVideoCovers = false
    } else if (a === '--all-carousel') {
      args.allCarousel = true
    } else if (a === '--help' || a === '-h') {
      args.help = true
    }
  }

  return args
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

function pickLargestCandidate(candidates) {
  if (!Array.isArray(candidates) || candidates.length === 0) return null
  const sorted = [...candidates].sort((a, b) => (b.width || 0) - (a.width || 0))
  return sorted[0]
}

function extractImagesFromMedia(media) {
  const best = pickLargestCandidate(media?.image_versions2?.candidates)
  if (!best?.url) return []
  return [
    {
      url: best.url,
      width: best.width ?? null,
      height: best.height ?? null,
    },
  ]
}

function extractImagesFromItem(item, includeVideoCovers) {
  // media_type: 1=image, 2=video, 8=carousel
  if (!item) return []

  if (item.media_type === 1) return extractImagesFromMedia(item)

  if (item.media_type === 2) {
    return includeVideoCovers ? extractImagesFromMedia(item) : []
  }

  if (item.media_type === 8 && Array.isArray(item.carousel_media)) {
    const out = []
    for (const media of item.carousel_media) {
      if (media?.media_type === 1) out.push(...extractImagesFromMedia(media))
      else if (media?.media_type === 2 && includeVideoCovers) out.push(...extractImagesFromMedia(media))
    }
    return out
  }

  return []
}

function extensionFromUrl(rawUrl) {
  try {
    const u = new URL(rawUrl)
    const ext = path.extname(u.pathname)
    return ext || '.jpg'
  } catch {
    return '.jpg'
  }
}

async function fetchFeedPage(username, count, maxId) {
  const params = new URLSearchParams({ count: String(count) })
  if (maxId) params.set('max_id', maxId)

  const feedUrl = `https://www.instagram.com/api/v1/feed/user/${username}/username/?${params.toString()}`
  const options = {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-IG-App-ID': '936619743392459',
      Referer: `https://www.instagram.com/${username}/`,
    },
  }

  const maxAttempts = 4
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const resp = await fetch(feedUrl, options)

    if (resp.status === 429) {
      if (attempt === maxAttempts) {
        throw new Error('Rate limited by Instagram (HTTP 429). Try again later.')
      }
      // Backoff a bit, then retry.
      await sleep(3000 * attempt)
      continue
    }

    if (!resp.ok) {
      const body = await resp.text().catch(() => '')
      throw new Error(`Instagram feed request failed (${resp.status}). ${body.slice(0, 200)}`)
    }

    return resp.json()
  }

  throw new Error('Unexpected error fetching Instagram feed.')
}

async function fetchFeedItems(username, totalCount) {
  const pageSize = 12
  const requestDelayMs = 650

  const items = []
  const seen = new Set()
  let pagesFetched = 0
  let maxId = null
  let moreAvailable = true

  while (items.length < totalCount && moreAvailable) {
    const remaining = totalCount - items.length
    const data = await fetchFeedPage(username, Math.min(pageSize, remaining), maxId)
    pagesFetched++

    const pageItems = Array.isArray(data?.items) ? data.items : []
    for (const it of pageItems) {
      const key = String(it?.id || it?.pk || it?.code || '')
      if (!key || seen.has(key)) continue
      seen.add(key)
      items.push(it)
      if (items.length >= totalCount) break
    }

    moreAvailable = Boolean(data?.more_available)
    maxId = typeof data?.next_max_id === 'string' && data.next_max_id.length > 0 ? data.next_max_id : null
    if (!moreAvailable || !maxId) break

    // Be polite to reduce rate-limit risk.
    await sleep(requestDelayMs)
  }

  return { items, pagesFetched }
}

async function downloadToFile(url, destPath, referer) {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Referer: referer || 'https://www.instagram.com/',
    },
  })

  if (!resp.ok) {
    throw new Error(`Download failed (${resp.status}) for ${url}`)
  }

  const ab = await resp.arrayBuffer()
  await fs.writeFile(destPath, new Uint8Array(ab))
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help || !args.username) {
    console.log(
      [
        'Usage:',
        '  node scripts/fetch-instagram-photos.mjs --username <handle> [--count 12] [--dest <folder>] [--overwrite] [--no-video-covers] [--all-carousel]',
        '',
        'Notes:',
        '- Downloads image(s) from recent posts into public/instagram/<handle>/ by default.',
        '- Uses publicly accessible endpoints; may be rate-limited by Instagram.',
      ].join('\n'),
    )
    process.exit(args.help ? 0 : 1)
  }

  if (!Number.isFinite(args.count) || args.count <= 0) {
    throw new Error(`Invalid --count: ${args.count}`)
  }

  const username = args.username.replace(/^@/, '')
  const dest = args.dest || path.join(process.cwd(), 'public', 'instagram', username)
  await ensureDir(dest)

  const { items, pagesFetched } = await fetchFeedItems(username, args.count)

  const manifest = {
    username,
    fetchedAt: new Date().toISOString(),
    countRequested: args.count,
    pagesFetched,
    items: [],
  }

  let totalDownloaded = 0
  let totalSkipped = 0
  let totalErrors = 0

  for (const item of items) {
    const code = item?.code || item?.pk || 'unknown'
    const postUrl = item?.code ? `https://www.instagram.com/p/${item.code}/` : null
    const captionText = item?.caption?.text || null

    let images = extractImagesFromItem(item, args.includeVideoCovers)
    if (!args.allCarousel && images.length > 1) images = images.slice(0, 1)
    const files = []

    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      const ext = extensionFromUrl(img.url)
      const fileName = `${code}-${String(i + 1).padStart(2, '0')}${ext}`
      const filePath = path.join(dest, fileName)

      if (!args.overwrite && (await exists(filePath))) {
        totalSkipped++
        files.push({ file: fileName, skipped: true, sourceUrl: img.url, width: img.width, height: img.height })
        continue
      }

      try {
        await downloadToFile(img.url, filePath, postUrl || `https://www.instagram.com/${username}/`)
        totalDownloaded++
        files.push({ file: fileName, skipped: false, sourceUrl: img.url, width: img.width, height: img.height })
      } catch (err) {
        totalErrors++
        files.push({
          file: fileName,
          skipped: false,
          error: err instanceof Error ? err.message : String(err),
          sourceUrl: img.url,
          width: img.width,
          height: img.height,
        })
      }
    }

    manifest.items.push({
      id: item?.id || null,
      pk: item?.pk || null,
      code: item?.code || null,
      mediaType: item?.media_type ?? null,
      takenAt: typeof item?.taken_at === 'number' ? new Date(item.taken_at * 1000).toISOString() : null,
      postUrl,
      caption: captionText,
      files,
    })
  }

  const manifestPath = path.join(dest, 'manifest.json')
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')

  console.log(
    JSON.stringify(
      {
        username,
        dest,
        requestedItems: args.count,
        returnedItems: items.length,
        pagesFetched,
        downloaded: totalDownloaded,
        skipped: totalSkipped,
        errors: totalErrors,
        manifest: manifestPath,
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
