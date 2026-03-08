import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Paintbrush, Home, Building, Palette } from 'lucide-react'
import styles from '@/app/decoration/page.module.css'

export const metadata: Metadata = {
  title: 'Stylish Decoration - AE',
  description: 'Transform your space with expert interior decoration services.',
}

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
  { title: 'Modern Living Room', category: 'Residential', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=600&fit=crop' },
  { title: 'Luxury Bedroom', category: 'Residential', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=600&fit=crop' },
  { title: 'Corporate Office', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop' },
  { title: 'Restaurant Interior', category: 'Commercial', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop' },
  { title: 'Kitchen Design', category: 'Residential', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop' },
  { title: 'Retail Space', category: 'Commercial', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop' },
]

export default function DecorationPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop"
            alt="Elegant interior living room"
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
