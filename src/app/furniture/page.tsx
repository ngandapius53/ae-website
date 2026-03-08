import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sofa, Armchair, Lamp, Table } from 'lucide-react'
import styles from '@/app/furniture/page.module.css'

export const metadata: Metadata = {
  title: 'Premium Furniture - AE',
  description: 'Discover premium furniture collections for your home and office.',
}

const categories = [
  { icon: Sofa, title: 'Sofas & Couches', count: 45, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop' },
  { icon: Armchair, title: 'Chairs & Seating', count: 38, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop' },
  { icon: Table, title: 'Tables & Desks', count: 52, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop' },
  { icon: Lamp, title: 'Lighting', count: 67, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop' },
]

const featured = [
  { name: 'Modern Sectional Sofa', price: '$2,499', category: 'Living Room', image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&h=400&fit=crop' },
  { name: 'Executive Office Desk', price: '$1,299', category: 'Office', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop' },
  { name: 'Velvet Accent Chair', price: '$699', category: 'Living Room', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop' },
  { name: 'Marble Coffee Table', price: '$899', category: 'Living Room', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop' },
  { name: 'King Size Platform Bed', price: '$1,899', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop' },
  { name: 'Designer Floor Lamp', price: '$349', category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop' },
]

export default function FurniturePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2400&auto=format&fit=crop"
            alt="Modern sofa in living room"
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
            <p className="section-subtitle">Our most popular furniture pieces</p>
          </div>
          <div className={styles.featuredGrid}>
            {featured.map((item, index) => (
              <div key={index} className={styles.productCard}>
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
