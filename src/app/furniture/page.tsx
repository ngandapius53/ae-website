import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import fs from 'fs/promises'
import path from 'path'
import styles from '@/app/furniture/page.module.css'

export const metadata: Metadata = {
  title: 'Premium Furniture - AE',
  description: 'Discover premium furniture collections for your home and office.',
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const categories = [
  { title: 'Bedroom Furniture', count: 11, image: `${basePath}/furniture/work/bedframe-upholstered-gray.jpeg` },
  { title: 'Sofa Sets', count: 6, image: `${basePath}/furniture/work/sectional-sofa-teal.jpeg` },
  { title: 'TV & Console Units', count: 6, image: `${basePath}/furniture/work/tv-console-classic-white.jpeg` },
  { title: 'Kitchen & Storage', count: 5, image: `${basePath}/furniture/work/kitchen-hutch-gray-white.jpeg` },
]

const quickFeatured = [
  { name: 'Matte Black 3-Door Wardrobe', category: 'Bedroom', image: `${basePath}/furniture/quick/wardrobe-matte-black-clean.jpeg` },
  { name: 'White Panel Bed Frame', category: 'Bedroom', image: `${basePath}/furniture/quick/bedframe-white-set.jpeg` },
  { name: 'Modern Media Wall Unit', category: 'TV Unit', image: `${basePath}/furniture/quick/media-wall-unit-dark.jpeg` },
  { name: 'TV Wall Console (Wood/White)', category: 'TV Unit', image: `${basePath}/furniture/quick/tv-wall-console-wood-white.jpeg` },
  { name: 'Wall Display Shelves', category: 'Interior', image: `${basePath}/furniture/quick/wall-shelves-display-white.jpeg` },
  { name: 'Shoe Rack Organizer', category: 'Storage', image: `${basePath}/furniture/quick/shoe-rack-white.jpeg` },
  { name: 'Velvet Sofa (Gray + Gold)', category: 'Sofa', image: `${basePath}/furniture/quick/sofa-velvet-gray-gold.jpeg` },
  { name: 'Sectional Sofa (Green)', category: 'Sofa', image: `${basePath}/furniture/quick/sectional-sofa-green.jpeg` },
  { name: 'Sectional Sofa (Teal)', category: 'Sofa', image: `${basePath}/furniture/quick/sectional-sofa-teal-white.jpeg` },
  { name: 'Sectional Sofa (Beige)', category: 'Sofa', image: `${basePath}/furniture/quick/sectional-sofa-beige.jpeg` },
  { name: 'Leather Sectional (Built-in Table)', category: 'Sofa', image: `${basePath}/furniture/quick/sectional-leather-with-table.jpeg` },
  { name: 'White Sofa Set', category: 'Sofa', image: `${basePath}/furniture/quick/sofa-set-white-leather.jpeg` },
  { name: 'Tufted Loveseat (Gray)', category: 'Sofa', image: `${basePath}/furniture/quick/loveseat-tufted-gray-gold.jpeg` },
  { name: 'Tufted Corner Sofa (Gray)', category: 'Sofa', image: `${basePath}/furniture/quick/sofa-corner-tufted-gray-outdoor.jpeg` },
]

const workshopFeatured = [
  { name: 'Charcoal Display Cabinet', category: 'Storage', image: `${basePath}/furniture/work/display-cabinet-charcoal-oak.jpeg` },
  { name: 'White Orange Wardrobe Vanity', category: 'Storage', image: `${basePath}/furniture/work/wardrobe-vanity-white-orange.jpeg` },
  { name: 'Gray White Kitchen Hutch', category: 'Kitchen', image: `${basePath}/furniture/work/kitchen-hutch-gray-white.jpeg` },
  { name: 'Orange Showcase Sideboard', category: 'Kitchen', image: `${basePath}/furniture/work/sideboard-showcase-orange.jpeg` },
  { name: 'Upholstered Gray Bed Frame', category: 'Bedroom', image: `${basePath}/furniture/work/bedframe-upholstered-gray.jpeg` },
  { name: 'Compact White Kitchen Unit', category: 'Kitchen', image: `${basePath}/furniture/work/kitchen-unit-compact-white.jpeg` },
  { name: 'Compact Black Orange Kitchen Unit', category: 'Kitchen', image: `${basePath}/furniture/work/kitchen-unit-compact-black-orange.jpeg` },
  { name: 'Natural Wood Rolling Gas Cart', category: 'Kitchen', image: `${basePath}/furniture/work/rolling-gas-cart-natural-wood.jpeg` },
  { name: 'Ivory Fluted Sideboard Set', category: 'Storage', image: `${basePath}/furniture/work/fluted-sideboard-ivory-set.jpeg` },
  { name: 'Classic White TV Console', category: 'TV Unit', image: `${basePath}/furniture/work/tv-console-classic-white.jpeg` },
  { name: 'Oak White Media Console', category: 'TV Unit', image: `${basePath}/furniture/work/media-console-oak-white.jpeg` },
  { name: 'White Gold Fluted TV Stand', category: 'TV Unit', image: `${basePath}/furniture/work/fluted-tv-stand-white-gold.jpeg` },
  { name: 'Sky Blue Lounge Set', category: 'Sofa', image: `${basePath}/furniture/work/lounge-set-sky-blue.jpeg` },
  { name: 'Teal Sectional Sofa', category: 'Sofa', image: `${basePath}/furniture/work/sectional-sofa-teal.jpeg` },
  { name: 'Light Gray Sectional Sofa', category: 'Sofa', image: `${basePath}/furniture/work/sectional-sofa-light-gray.jpeg` },
  { name: 'Mid-Century Oak TV Stand', category: 'TV Unit', image: `${basePath}/furniture/work/tv-stand-midcentury-oak.jpeg` },
  { name: 'Black Fluted Coffee Table', category: 'Coffee Table', image: `${basePath}/furniture/work/coffee-table-fluted-black.jpeg` },
  { name: 'Gray L-Shaped Sofa', category: 'Sofa', image: `${basePath}/furniture/work/l-shaped-sofa-gray.jpeg` },
  { name: 'Modern Bedroom Feature Wall', category: 'Interior', image: `${basePath}/furniture/work/bedroom-feature-wall-modern.jpeg` },
]

const featured = [...quickFeatured, ...workshopFeatured]

type InspirationItem = {
  src: string
  title: string
  category: string
  href?: string
}

function cleanCaption(input: string) {
  // Fix common mojibake sequences from some Instagram responses.
  return input
    .replaceAll('â€™', "'")
    .replaceAll('â€œ', '"')
    .replaceAll('â€', '"')
    .replaceAll('â€“', '-')
    .replaceAll('â€”', '-')
    .replaceAll('ï¿½', '')
    .replaceAll('\u0000', '')
    .trim()
}

function categoryFromCaption(caption: string) {
  const c = caption.toLowerCase()
  if (c.includes('dining')) return 'Dining'
  if (c.includes('dresser') || c.includes('bed') || c.includes('mattress') || c.includes('night before')) return 'Bedroom'
  if (c.includes('living room') || c.includes('living space') || c.includes('center piece') || c.includes('cozy')) return 'Living Room'
  if (c.includes('easter') || c.includes('palm sunday') || c.includes('eid mubarak')) return 'Seasonal'
  if (c.includes('happy new month') || c.includes('stop by') || c.includes('when you can')) return 'Announcements'
  return 'Furniture'
}

function titleFromCaption(caption: string) {
  const c = caption.toLowerCase()
  if (c.includes('easter')) return 'Easter Weekend Hours'
  if (c.includes('happy new month')) return 'Happy New Month'
  if (c.includes('palm sunday')) return 'Palm Sunday Blessings'
  if (c.includes('eid mubarak')) return 'Eid Mubarak'
  if (c.includes('dining') && c.includes('chair')) return 'Dining Chairs Upgrade'
  if (c.includes('dresser')) return 'Perfect Dresser'
  if (c.includes('center piece') || c.includes('centerpiece')) return 'Center Pieces'
  if (c.includes('better mornings') || c.includes('night before')) return 'Better Mornings Start at Night'
  if (c.includes('cozy') && c.includes('corner')) return 'Cozy Corner Comfort'
  if (c.includes('classy')) return 'Classy Look'
  if (c.includes('living room')) return 'Living Room Inspiration'

  const firstLine = caption.split('\n').map((l) => l.trim()).find(Boolean) ?? 'Furniture Inspiration'
  return firstLine.length > 56 ? `${firstLine.slice(0, 53)}...` : firstLine
}

async function getAshleyInspirationItems(basePathPrefix: string): Promise<InspirationItem[]> {
  const manifestPath = path.join(
    process.cwd(),
    'public',
    'instagram',
    'ashley_homestoreuganda',
    'manifest.json',
  )

  try {
    const raw = await fs.readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(raw) as { items?: any[] }
    const items = Array.isArray(manifest.items) ? manifest.items : []

    const mapped = items.flatMap((item) => {
      const file = item?.files?.[0]?.file as string | undefined
      if (!file) return []

      const caption = cleanCaption(String(item?.caption ?? ''))
      const category = categoryFromCaption(caption)
      const title = titleFromCaption(caption)
      const src = `${basePathPrefix}/instagram/ashley_homestoreuganda/${file}`
      const href = item?.postUrl ? String(item.postUrl) : undefined

      return [{ src, title, category, href } satisfies InspirationItem]
    })

    return mapped
  } catch {
    return []
  }
}

function groupByCategory(items: InspirationItem[]) {
  const map = new Map<string, InspirationItem[]>()
  for (const item of items) {
    const list = map.get(item.category) ?? []
    list.push(item)
    map.set(item.category, list)
  }
  return map
}

export default async function FurniturePage() {
  const inspirationItems = await getAshleyInspirationItems(basePath)
  const inspirationByCategory = groupByCategory(inspirationItems)
  const inspirationCategoryOrder = ['Living Room', 'Bedroom', 'Dining', 'Seasonal', 'Announcements', 'Furniture']

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={`${basePath}/furniture/work/sectional-sofa-teal.jpeg`}
            alt="Furniture collection showcase"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Premium Furniture</h1>
          <p className={styles.heroDescription}>
            Handpicked furniture collections that combine comfort, quality, and timeless design.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.categories}>
            {categories.map((cat) => (
              <div key={cat.title} className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
                <span className={styles.categoryCount}>{cat.count} Products</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.featured}`}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle">Crafted pieces from our latest workshop collection</p>
          </div>
          <div className={styles.featuredGrid}>
            {featured.map((item) => (
              <div key={item.image} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{item.category}</span>
                  <h4 className={styles.productName}>{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Catalog <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {inspirationItems.length > 0 && (
        <section className={`section ${styles.inspiration}`}>
          <div className="container">
            <div className="text-center">
              <h2 className="section-title">Furniture Inspiration</h2>
              <p className="section-subtitle">Recent looks and ideas you can recreate at home</p>
            </div>

            {inspirationCategoryOrder.map((category) => {
              const items = inspirationByCategory.get(category)
              if (!items || items.length === 0) return null

              return (
                <div key={category} className={styles.inspirationGroup}>
                  <h3 className={styles.inspirationGroupTitle}>{category}</h3>
                  <div className={styles.inspirationGrid}>
                    {items.map((item) => (
                      <a
                        key={item.src}
                        href={item.href ?? item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.inspirationCard}
                        aria-label={`Open: ${item.title}`}
                      >
                        <div className={styles.inspirationImage}>
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className={styles.inspirationOverlay}>
                          <span className={styles.inspirationBadge}>{category}</span>
                          <h4 className={styles.inspirationTitle}>{item.title}</h4>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Need Custom Furniture?</h2>
            <p>We offer bespoke furniture solutions tailored to your exact specifications.</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
