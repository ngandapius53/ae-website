import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Home, Key, Search } from 'lucide-react'
import styles from '@/app/real-estate/page.module.css'

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

const properties = [
  { title: 'Modern Downtown Apartment', location: 'New York, NY', price: '$850,000', beds: 2, baths: 2, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop' },
  { title: 'Luxury Beachfront Villa', location: 'Miami, FL', price: '$2,500,000', beds: 5, baths: 4, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop' },
  { title: 'Cozy Family Home', location: 'Los Angeles, CA', price: '$1,200,000', beds: 4, baths: 3, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
  { title: 'Penthouse Suite', location: 'Chicago, IL', price: '$1,800,000', beds: 3, baths: 3, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop' },
  { title: 'Mountain Retreat', location: 'Denver, CO', price: '$950,000', beds: 3, baths: 2, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop' },
  { title: 'Suburban Estate', location: 'Austin, TX', price: '$1,450,000', beds: 5, baths: 4, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop' },
]

const interiors = [
  { title: 'Minimal Room Finish', image: `${basePath}/decoration/sarah-enterprise/interior-room-finish-minimal.jpeg` },
  { title: 'Modern Living Room Finish', image: `${basePath}/decoration/sarah-enterprise/living-room-finish-gray-modern.jpeg` },
  { title: 'LED Corridor Ceiling', image: `${basePath}/decoration/sarah-enterprise/ceiling-led-corridor-frame.jpeg` },
  { title: 'Modern Bathroom Vanity', image: `${basePath}/decoration/sarah-enterprise/bathroom-vanity-modern-gray.jpeg` },
  { title: 'TV Niche Feature Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-niche-lighting.jpeg` },
  { title: 'Illuminated TV Frame Wall', image: `${basePath}/decoration/sarah-enterprise/tv-wall-frame-illuminated.jpeg` },
]

export default function RealEstatePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2400&auto=format&fit=crop"
            alt="City skyline with modern apartments"
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
            <p className="section-subtitle">Handpicked properties for you</p>
          </div>
          <div className={styles.listingsGrid}>
            {properties.map((property, index) => (
              <div key={index} className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.propertyInfo}>
                  <span className={styles.propertyLocation}>{property.location}</span>
                  <h4 className={styles.propertyTitle}>{property.title}</h4>
                  <div className={styles.propertyDetails}>
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
