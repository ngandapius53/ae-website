import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Home, Key, Search } from 'lucide-react'
import fs from 'fs/promises'
import path from 'path'
import styles from '@/app/real-estate/page.module.css'
import PropertyGallery from '@/app/real-estate/PropertyGallery'

export const metadata: Metadata = {
  title: 'Real Estate - AE',
  description: 'Find your dream property with our comprehensive real estate services.',
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const services = [
  { icon: Search, title: 'Property Search', description: 'Find the perfect property matching your criteria and budget.', href: '/contact?service=real-estate&topic=property-search' },
  { icon: Home, title: 'Buy & Sell', description: 'Expert guidance through buying or selling your property.', href: '/contact?service=real-estate&topic=buy-and-sell' },
  { icon: Building2, title: 'Investment', description: 'Strategic real estate investment opportunities and advice.', href: '/contact?service=real-estate&topic=investment-planning' },
  { icon: Key, title: 'Property Management', description: 'Comprehensive management services for landlords and investors.', href: '/contact?service=real-estate&topic=property-management' },
]

type GalleryItem = {
  src: string
  title: string
}

const realEstateImageExt = /\.(?:jpe?g|png|webp)$/i

function titleFromRealEstateFile(fileName: string) {
  const base = fileName.replace(/\.[^/.]+$/, '')
  const houseMatch = /^house-(\d+)$/i.exec(base)
  if (houseMatch) return `House Photo #${houseMatch[1]}`
  const reMatch = /^re-(\d+)$/i.exec(base)
  if (reMatch) return `Property Photo #${reMatch[1]}`
  return base.replace(/[-_]+/g, ' ').trim() || 'Property Photo'
}

async function getRealEstateGalleryItems(basePathPrefix: string): Promise<GalleryItem[]> {
  const baseDir = path.join(process.cwd(), 'public', 'real-estate')
  const dirs = ['houses'] as const
  const items: GalleryItem[] = []

  for (const dir of dirs) {
    const fullDir = path.join(baseDir, dir)
    let files: string[] = []

    try {
      files = await fs.readdir(fullDir)
    } catch {
      continue
    }

    files
      .filter((file) => realEstateImageExt.test(file))
      .sort((a, b) => a.localeCompare(b))
      .forEach((file) => {
        items.push({
          src: `${basePathPrefix}/real-estate/${dir}/${file}`,
          title: titleFromRealEstateFile(file),
        })
      })
  }

  return items
}

const interiors = [
  { title: 'Minimal Room Finish', image: `${basePath}/decoration/sarah-enterprise/interior-room-finish-minimal.jpeg` },
  { title: 'Modern Living Room Finish', image: `${basePath}/decoration/sarah-enterprise/living-room-finish-gray-modern.jpeg` },
  { title: 'LED Corridor Ceiling', image: `${basePath}/decoration/sarah-enterprise/ceiling-led-corridor-frame.jpeg` },
  { title: 'Modern Bathroom Vanity', image: `${basePath}/decoration/sarah-enterprise/bathroom-vanity-modern-gray.jpeg` },
  { title: 'TV Niche Feature Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-niche-lighting.jpeg` },
  { title: 'Illuminated TV Frame Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-frame-illuminated.jpeg` },
]

export default async function RealEstatePage() {
  const galleryItems = await getRealEstateGalleryItems(basePath)
  const heroImage = galleryItems[1]?.src ?? galleryItems[0]?.src

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={heroImage ?? `${basePath}/real-estate/properties/re-01.jpeg`}
            alt="Real estate property showcase"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Real Estate</h1>
          <p className={styles.heroDescription}>
            Find your dream property with expert guidance from our experienced real estate team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Real Estate Services</h2>
            <p className="section-subtitle">Comprehensive property solutions</p>
          </div>
          <div className="grid grid-4">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <service.icon size={28} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.listings}`}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">Recent property photos and inspiration</p>
          </div>
          {galleryItems.length > 0 ? (
            <PropertyGallery items={galleryItems} />
          ) : (
            <div className="text-center" style={{ marginTop: '30px' }}>
              <p className="section-subtitle">No property photos available yet.</p>
            </div>
          )}
          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link href="/contact" className="btn btn-primary">
              View All Properties <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.interiors}`}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Interior Designing</h2>
            <p className="section-subtitle">Transformations that elevate your property&#39;s value and lifestyle</p>
          </div>
          <div className={styles.interiorsGrid}>
            {interiors.map((item, idx) => (
              <div key={idx} className={styles.interiorCard}>
                <div className={styles.interiorImage}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className={styles.interiorInfo}>
                  <h4 className={styles.interiorTitle}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Looking to Sell Your Property?</h2>
            <p>Get the best value for your property with our expert selling services.</p>
            <Link href="/contact" className="btn btn-primary">
              Get a Valuation <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
