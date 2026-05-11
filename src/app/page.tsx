'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, Paintbrush, PenTool, Sofa, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from '@/app/page.module.css'

const services = [
  {
    icon: Paintbrush,
    title: 'Stylish Decoration',
    eyebrow: '01 / Interiors',
    description: 'Modern ceiling work, wall finishes, styling, and full interior decoration for homes, offices, and commercial spaces.',
    link: '/decoration',
    color: '#e94560',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop'
  },
  {
    icon: Sofa,
    title: 'Premium Furniture',
    eyebrow: '02 / Furniture',
    description: 'Custom and ready furniture selections with practical comfort, clean finishes, and a polished modern look.',
    link: '/furniture',
    color: '#0f3460',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop'
  },
  {
    icon: Sparkles,
    title: 'Luxury Fragrance',
    eyebrow: '03 / Fragrance',
    description: 'Elegant personal and home fragrances selected to create a memorable atmosphere for daily living and special spaces.',
    link: '/luxury-fragrance',
    color: '#b76e79',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop'
  },
  {
    icon: PenTool,
    title: 'Graphic Design',
    eyebrow: '04 / Branding',
    description: 'Logos, brand identity, posters, print work, and digital graphics made for businesses that need to be seen clearly.',
    link: '/graphic-design',
    color: '#16213e',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop'
  },
  {
    icon: Building2,
    title: 'Real Estate',
    eyebrow: '05 / Property',
    description: 'Property support for buyers, renters, sellers, and families looking for dependable real estate guidance.',
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

const featuredOffers = [
  {
    title: 'Interior Consultation',
    category: 'Decoration',
    price: 'From UGX 150,000',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=600&fit=crop',
    link: '/decoration'
  },
  {
    title: 'Custom Sofa Planning',
    category: 'Furniture',
    price: 'Quote on request',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
    link: '/furniture'
  },
  {
    title: 'Premium Fragrance Set',
    category: 'Luxury Fragrance',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=600&fit=crop',
    link: '/luxury-fragrance'
  },
  {
    title: 'Brand Starter Package',
    category: 'Graphic Design',
    price: 'From UGX 250,000',
    image: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=600&h=600&fit=crop',
    link: '/graphic-design'
  }
]

export default function Home() {
  return (
    <>
      <div className={styles.announcement}>
        <span>ARAH ENTERPRISES</span>
        <span>Decoration · Furniture · Fragrance · Design · Real Estate</span>
        <Link href="/contact">Book a consultation</Link>
      </div>

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
            Kampala Ntinda · Uganda
          </motion.span>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Uganda spaces, crafted with modern detail.
          </motion.h1>
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Interiors, furniture, luxury fragrance, graphic design, and real estate support brought together under one trusted brand.
          </motion.p>
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/contact" className="btn btn-primary">
              Start a Project <ArrowRight size={20} />
            </Link>
            <Link href="/decoration" className="btn btn-secondary">
              Explore Services
            </Link>
          </motion.div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      <section className={styles.marquee} aria-label="Arah services">
        <div>
          Decoration ✦ Furniture ✦ Luxury Fragrance ✦ Graphic Design ✦ Real Estate ✦ Kampala Ntinda ✦
          Decoration ✦ Furniture ✦ Luxury Fragrance ✦ Graphic Design ✦ Real Estate ✦ Kampala Ntinda ✦
        </div>
      </section>

      <section className={`section ${styles.services}`}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <span>Explore Our Craft</span>
            <h2 className="section-title">From room concept to finished lifestyle.</h2>
            <p className="section-subtitle">
              ARAH brings practical Ugandan service, careful finishing, and modern presentation into every project.
            </p>
          </div>
          <div className={styles.collectionGrid}>
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
                  <div className={styles.serviceMeta}>
                    <span>{service.eyebrow}</span>
                    <Link href={service.link} className={styles.serviceIconButton} style={{ background: service.color }} aria-label={`Open ${service.title} service page`}>
                      <service.icon size={24} color="#ffffff" />
                    </Link>
                  </div>
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

      <section className={`section ${styles.featured}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <span>Featured Services</span>
              <h2>Popular requests, picked for you.</h2>
            </div>
            <Link href="/contact">View all services <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.productGrid}>
            {featuredOffers.map((offer) => (
              <Link href={offer.link} className={styles.productCard} key={offer.title}>
                <div className={styles.productImage}>
                  <Image src={offer.image} alt={offer.title} fill sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <span>{offer.category}</span>
                <h3>{offer.title}</h3>
                <p>{offer.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.roots}>
        <div className={styles.rootsText}>
          <span>Our Roots</span>
          <h2>Built in Kampala. Made for everyday beauty.</h2>
          <p>
            ARAH Enterprises connects practical craft with modern presentation. From interior finishing and furniture selection to fragrance, branding, and property support, every service is shaped around real homes, real businesses, and real client needs.
          </p>
          <p>
            We work from Kampala Ntinda with a focus on clear communication, dependable execution, and polished results that help your space or brand feel complete.
          </p>
          <Link href="/about">Learn About ARAH <ArrowRight size={17} /></Link>
        </div>
        <div className={styles.rootsImage}>
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&h=1100&fit=crop"
            alt="Modern furnished interior"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
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
