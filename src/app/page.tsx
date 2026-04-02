'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Paintbrush, Sofa, PenTool, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from '@/app/page.module.css'

const services = [
  {
    icon: Paintbrush,
    title: 'Stylish Decoration',
    description: 'Transform your space with our expert interior decoration services. We create stunning, personalized environments that reflect your unique style.',
    link: '/decoration',
    color: '#e94560',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop'
  },
  {
    icon: Sofa,
    title: 'Premium Furniture',
    description: 'Discover handpicked furniture collections that combine comfort, quality, and timeless design for your home or office.',
    link: '/furniture',
    color: '#0f3460',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop'
  },
  {
    icon: PenTool,
    title: 'Graphic Design',
    description: 'Elevate your brand with creative graphic design solutions. Logos, branding, marketing materials, and visual identity.',
    link: '/graphic-design',
    color: '#16213e',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop'
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Find your dream property with our comprehensive real estate services. Buy, sell, rent with expert guidance.',
    link: '/real-estate',
    color: '#e94560',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop'
  }
]

const features = [
  { number: '500+', label: 'Projects Completed' },
  { number: '10+', label: 'Years Experience' },
  { number: '200+', label: 'Happy Clients' },
  { number: '50+', label: 'Awards Won' }
]

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2069&auto=format&fit=crop"
            alt="Modern architecture exterior"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.span 
            className={styles.heroTag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to
          </motion.span>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Arah Enterprises
          </motion.h1>
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Your one-stop solution for Decoration, Furniture, Luxury Fragrance, Graphic Design & Real Estate
          </motion.p>
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/contact" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link href="/decoration" className="btn btn-secondary">
              View Portfolio
            </Link>
          </motion.div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      <section className={`section ${styles.services}`}>
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive design and real estate solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.serviceImage}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className={styles.serviceContent}>
                  <Link href={service.link} className={styles.serviceIconButton} style={{ background: service.color }} aria-label={`Open ${service.title} service page`}>
                    <service.icon size={32} color="#ffffff" />
                  </Link>
                  <h3 className={styles.serviceTitle}>
                    <Link href={service.link} className={styles.serviceTitleLink}>{service.title}</Link>
                  </h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <Link href={service.link} className={styles.serviceLink}>
                    Learn More <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className={styles.featureItem}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className={styles.featureNumber}>{feature.number}</span>
                <span className={styles.featureLabel}>{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Space?</h2>
            <p className={styles.ctaText}>
              Let&apos;s discuss your project and bring your vision to life.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}


