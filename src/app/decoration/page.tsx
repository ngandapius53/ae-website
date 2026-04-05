import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Paintbrush, Home, Building, Palette } from 'lucide-react'
import styles from '@/app/decoration/page.module.css'

export const metadata: Metadata = {
  title: 'Stylish Decoration - AE',
  description: 'Transform your space with expert interior decoration services.',
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const features = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Create your dream home with personalized interior design solutions.'
  },
  {
    icon: Building,
    title: 'Commercial Design',
    description: 'Transform your business space into an inspiring professional environment.'
  },
  {
    icon: Palette,
    title: 'Color Consultation',
    description: 'Expert color schemes to enhance the mood and atmosphere of any space.'
  }
]

const projects = [
  { title: 'LED Hallway Ceiling', category: 'Ceiling Works', image: `${basePath}/decoration/sarah-enterprise/ceiling-led-hallway-linear.jpeg` },
  { title: 'LED Corridor Ceiling', category: 'Ceiling Works', image: `${basePath}/decoration/sarah-enterprise/ceiling-led-corridor-frame.jpeg` },
  { title: 'Modern Bathroom Vanity', category: 'Bathroom Finish', image: `${basePath}/decoration/sarah-enterprise/bathroom-vanity-modern-gray.jpeg` },
  { title: 'Gray Living Room Finish', category: 'Residential Finish', image: `${basePath}/decoration/sarah-enterprise/living-room-finish-gray-modern.jpeg` },
  { title: 'Modern Bedroom Accent Wall', category: 'Wall Feature', image: `${basePath}/furniture/work/bedroom-feature-wall-modern.jpeg` },
  { title: 'Gypsum Yin-Yang Wall Art', category: 'Wall Feature', image: `${basePath}/decoration/sarah-enterprise/gypsum-wall-art-yin-yang.jpeg` },
  { title: 'Geometric Divider Shelves', category: 'Partition Design', image: `${basePath}/decoration/sarah-enterprise/gypsum-divider-box-shelves.jpeg` },
  { title: 'Sculpted Gypsum Divider', category: 'Partition Design', image: `${basePath}/decoration/sarah-enterprise/gypsum-divider-sculpted-curves.jpeg` },
  { title: 'Decorative Niche Wall', category: 'Wall Niches', image: `${basePath}/decoration/sarah-enterprise/display-niche-wall-decor.jpeg` },
  { title: 'Decorative Display Shelves', category: 'Wall Niches', image: `${basePath}/furniture/quick/wall-shelves-display-white.jpeg` },
  { title: 'TV Niche Lighting Wall', category: 'Media Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-niche-lighting.jpeg` },
  { title: 'Curved Media Wall Console', category: 'Media Wall', image: `${basePath}/furniture/work/media-wall-unit-modern.jpeg` },
  { title: 'Circular TV Wall Concepts', category: 'Media Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-circular-concepts-collage.jpeg` },
  { title: 'Illuminated TV Frame Wall', category: 'Media Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-frame-illuminated.jpeg` },
  { title: 'Classic TV Wall Console', category: 'Media Wall', image: `${basePath}/furniture/quick/tv-wall-console-wood-white.jpeg` },
  { title: 'Minimal Interior Finish', category: 'Final Finish', image: `${basePath}/decoration/sarah-enterprise/interior-room-finish-minimal.jpeg` },
  { title: 'Kitchen Fit-Out (Island)', category: 'Kitchen Design', image: `${basePath}/decoration/interior-design/kitchen-fitout-led-ceiling-island.jpeg` },
  { title: 'Kitchen Fit-Out (LED Ceiling)', category: 'Kitchen Design', image: `${basePath}/decoration/interior-design/kitchen-fitout-led-ceiling-angle.jpeg` },
  { title: 'Modern Kitchen (Bar Stools)', category: 'Kitchen Design', image: `${basePath}/decoration/interior-design/kitchen-modern-island-bar-stools.jpeg` },
]

export default function DecorationPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={`${basePath}/decoration/interior-design/kitchen-modern-island-bar-stools.jpeg`}
            alt="Modern kitchen interior design"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Stylish Decoration</h1>
          <p className={styles.heroDescription}>
            Transform your space into a beautiful, functional environment that reflects your unique style.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.intro}>
            <h2 className="section-title">Design That Inspires</h2>
            <p className={styles.introText}>
              Our interior decoration services blend aesthetics with functionality to create spaces
              that not only look stunning but enhance your daily life. From concept to completion,
              we work closely with you to understand your vision and bring it to reality.
            </p>
          </div>

          <div className="grid grid-3">
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon size={28} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.gallery}`}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Projects</h2>
            <p className="section-subtitle">Explore our recent decoration projects</p>
          </div>
          <div className={styles.galleryGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.galleryItem}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryCategory}>{project.category}</span>
                  <h4 className={styles.galleryTitle}>{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Space?</h2>
            <p>Let&apos;s create something beautiful together.</p>
            <Link href="/contact" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
