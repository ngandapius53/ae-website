import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, PenTool, Palette, Type, Image as ImageIcon, Megaphone } from 'lucide-react'
import styles from '@/app/graphic-design/page.module.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: 'Graphic Design - AE',
  description: 'Creative graphic design services for your brand.',
}

const services = [
  { icon: Palette, title: 'Logo Design', description: 'Unique, memorable logos that represent your brand identity.' },
  { icon: Type, title: 'Brand Identity', description: 'Complete visual identity systems including colors, typography, and guidelines.' },
  { icon: ImageIcon, title: 'Print Design', description: 'Business cards, brochures, flyers, and all print materials.' },
  { icon: Megaphone, title: 'Marketing Materials', description: 'Social media graphics, ads, banners, and promotional content.' },
]

const portfolio = [
  { title: 'Client Work 01', category: 'Branding', image: `${basePath}/graphic-design/gd-01.jpeg` },
  { title: 'Client Work 02', category: 'Branding', image: `${basePath}/graphic-design/gd-02.jpeg` },
  { title: 'Client Work 03', category: 'Branding', image: `${basePath}/graphic-design/gd-03.jpeg` },
  { title: 'Client Work 04', category: 'Branding', image: `${basePath}/graphic-design/gd-04.jpeg` },
  { title: 'Client Work 05', category: 'Branding', image: `${basePath}/graphic-design/gd-05.jpeg` },
  { title: 'Client Work 06', category: 'Branding', image: `${basePath}/graphic-design/gd-06.jpeg` },
  { title: 'Client Work 07', category: 'Branding', image: `${basePath}/graphic-design/gd-07.jpeg` },
  { title: 'Client Work 08', category: 'Branding', image: `${basePath}/graphic-design/gd-08.jpeg` },
  { title: 'Client Work 09', category: 'Branding', image: `${basePath}/graphic-design/gd-09.jpeg` },
  { title: 'Client Work 10', category: 'Branding', image: `${basePath}/graphic-design/gd-10.jpeg` },
]

export default function GraphicDesignPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2400&auto=format&fit=crop"
            alt="Creative desk with design materials"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Graphic Design</h1>
          <p className={styles.heroDescription}>
            Elevate your brand with creative design solutions that make lasting impressions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Design Services</h2>
            <p className="section-subtitle">Comprehensive creative solutions for every need</p>
          </div>
          <div className="grid grid-2">
            {services.map((service) => (
              <div key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <service.icon size={28} />
                </div>
                <div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.portfolio}`}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Work</h2>
            <p className="section-subtitle">Recent design projects</p>
          </div>
          <div className={styles.portfolioGrid}>
            {portfolio.map((item, index) => (
              <div key={index} className={styles.portfolioItem}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className={styles.portfolioOverlay}>
                  <span className={styles.portfolioCategory}>{item.category}</span>
                  <h4 className={styles.portfolioTitle}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Let&apos;s Create Something Amazing</h2>
            <p>Share your vision and we&apos;ll bring it to life with stunning design.</p>
            <Link href="/contact" className="btn btn-primary">
              Start Your Project <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
