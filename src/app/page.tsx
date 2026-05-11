'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, CreditCard, Heart, Paintbrush, PenTool, Search, ShieldCheck, ShoppingBag, Sofa, Sparkles, Truck, X } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from '@/app/page.module.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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
    title: 'L-Shaped Sofa Set',
    category: 'Sofasets',
    price: '2,500,000 UGX',
    oldPrice: '2,800,000 UGX',
    discount: '-11%',
    image: '/furniture/work/l-shaped-sofa-gray.jpeg',
    link: '/furniture'
  },
  {
    title: 'Modern TV Wall Unit',
    category: 'TV Stands',
    price: '1,500,000 UGX',
    oldPrice: '1,800,000 UGX',
    discount: '-17%',
    image: '/furniture/work/media-wall-unit-modern.jpeg',
    link: '/furniture'
  },
  {
    title: 'Upholstered Bed Frame',
    category: 'Beds',
    price: '3,500,000 UGX',
    oldPrice: '4,000,000 UGX',
    discount: '-13%',
    image: '/furniture/work/bedframe-upholstered-gray.jpeg',
    link: '/furniture'
  },
  {
    title: 'Coffee Table Set',
    category: 'Centre Tables',
    price: '1,000,000 UGX',
    oldPrice: '1,200,000 UGX',
    discount: '-17%',
    image: '/furniture/work/coffee-table-fluted-black.jpeg',
    link: '/furniture'
  },
  {
    title: 'Wardrobe Matte Black',
    category: 'Wardrobes',
    price: '2,400,000 UGX',
    oldPrice: '2,700,000 UGX',
    discount: '-11%',
    image: '/furniture/work/wardrobe-matte-black.jpeg',
    link: '/furniture'
  },
  {
    title: 'Kitchen Cabinet Unit',
    category: 'Kitchens',
    price: '1,500,000 UGX',
    oldPrice: '1,800,000 UGX',
    discount: '-17%',
    image: '/furniture/work/kitchen-unit-compact-white.jpeg',
    link: '/furniture'
  }
]

const shopCategories = [
  { name: 'Sofasets', count: 84, href: '/furniture' },
  { name: 'Beds', count: 78, href: '/furniture' },
  { name: 'Perfumes', count: 23, href: '/luxury-fragrance' },
  { name: 'Dining Tables', count: 48, href: '/furniture' },
  { name: 'TV Stands', count: 27, href: '/furniture' },
  { name: 'Wardrobes', count: 24, href: '/furniture' },
  { name: 'Centre Tables', count: 21, href: '/furniture' },
  { name: 'Cupboards', count: 16, href: '/furniture' },
  { name: 'Shoe Racks', count: 10, href: '/furniture' }
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof featuredOffers)[number] | null>(null)

  return (
    <>
      <div className={styles.announcement}>
        <span>Working Mon - Sun</span>
        <Link href="/contact">Order via WhatsApp</Link>
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
            The No. 1 ARAH Furniture Store
          </motion.span>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Furniture, interiors and home pieces delivered in Uganda.
          </motion.h1>
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Shop sofasets, beds, TV stands, wardrobes, dining sets, decoration, fragrance and custom interior services from Kampala Ntinda.
          </motion.p>
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/contact" className="btn btn-primary">
              Inquire on WhatsApp <ArrowRight size={20} />
            </Link>
            <Link href="/furniture" className="btn btn-secondary">
              Shop Furniture
            </Link>
          </motion.div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      <section className={styles.shopShell}>
        <aside className={styles.categoryPanel}>
          <div className={styles.panelTitle}>All Departments</div>
          {shopCategories.map((category) => (
            <Link href={category.href} key={category.name} className={styles.categoryLink}>
              <span>{category.name}</span>
              <small>{category.count} Items</small>
            </Link>
          ))}
        </aside>
        <div className={styles.shopMain}>
          <div className={styles.shopToolbar}>
            <div>
              <span>Furniture Collection</span>
              <h2>Latest Products</h2>
              <p>Showing 1-6 of our popular furniture requests</p>
            </div>
            <Link href="/furniture">More Furniture <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.shopGrid}>
            {featuredOffers.map((offer) => (
              <button
                type="button"
                className={styles.shopCard}
                key={offer.title}
                onClick={() => setSelectedProduct(offer)}
                aria-label={`Open ${offer.title}`}
              >
                <div className={styles.saleBadge}>{offer.discount}</div>
                <div className={styles.shopActions}>
                  <span><Heart size={14} /> Wishlist</span>
                  <span>Compare</span>
                </div>
                <div className={styles.shopImage}>
                  <Image src={`${basePath}${offer.image}`} alt={offer.title} fill sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
                <div className={styles.shopInfo}>
                  <small>{offer.category}</small>
                  <h3>{offer.title}</h3>
                  <p><del>{offer.oldPrice}</del> <strong>{offer.price}</strong></p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className={styles.productModal} onClick={() => setSelectedProduct(null)}>
          <div className={styles.productDialog} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.productClose}
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product preview"
            >
              <X size={24} />
            </button>
            <div className={styles.productPreviewImage}>
              <Image
                src={`${basePath}${selectedProduct.image}`}
                alt={selectedProduct.title}
                fill
                sizes="(max-width: 768px) 92vw, 48vw"
              />
            </div>
            <div className={styles.productPreviewInfo}>
              <span>{selectedProduct.category}</span>
              <h2>{selectedProduct.title}</h2>
              <p><del>{selectedProduct.oldPrice}</del> <strong>{selectedProduct.price}</strong></p>
              <Link href="/contact" className={styles.productInquiry}>
                Inquire now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}

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

      <section className={`section ${styles.howShop}`}>
        <div className="container">
          <div className={styles.howIntro}>
            <span>How It Works</span>
            <h2>Shop, inquire and receive your furniture at the door.</h2>
            <p>Search products, browse categories, send your request, confirm details, and arrange delivery with the ARAH team.</p>
          </div>
          <div className={styles.howGrid}>
            <div><Search size={26} /><h3>Search Products</h3><p>Use the search button to find sofas, beds, tables, wardrobes, TV stands, or decoration items.</p></div>
            <div><ShoppingBag size={26} /><h3>Send Inquiry</h3><p>Open the item or service page and contact us with the exact product or custom work you need.</p></div>
            <div><Truck size={26} /><h3>Delivery Support</h3><p>We help arrange delivery and installation details around Kampala and nearby areas.</p></div>
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
          <div className={styles.trustBadges}>
            <div><Truck size={28} /><h3>We Deliver To Your Door</h3><p>A delivery service you can depend on.</p></div>
            <div><ShieldCheck size={28} /><h3>Customer Support</h3><p>Satisfied customers are our best ads.</p></div>
            <div><CreditCard size={28} /><h3>Secure Payments</h3><p>Deposit and payment guidance available.</p></div>
          </div>
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
