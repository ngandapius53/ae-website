import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Globe, Heart, Users } from 'lucide-react'
import styles from '@/app/about/page.module.css'

export const metadata: Metadata = {
  title: 'About ARAH Furniture Workshop',
  description: 'Learn about ARAH Enterprises Furniture Workshop in Kampala Ntinda.',
}

const values = [
  { icon: Heart, title: 'Passion', description: 'We pour our passion into every project, ensuring exceptional results.' },
  { icon: Award, title: 'Excellence', description: 'Committed to the highest standards of quality and craftsmanship.' },
  { icon: Users, title: 'Client Focus', description: 'Your vision and satisfaction are at the center of everything we do.' },
  { icon: Globe, title: 'Innovation', description: 'Embracing new ideas and cutting-edge design trends.' },
]

const stats = [
  { number: '500+', label: 'Projects Completed' },
  { number: '10+', label: 'Years Experience' },
  { number: '200+', label: 'Happy Clients' },
  { number: '25+', label: 'Team Members' },
]

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2400&auto=format&fit=crop"
            alt="Team in a modern office"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About ARAH Furniture Workshop</h1>
          <p className={styles.heroDescription}>
            Furniture, finishing, and home pieces made for everyday Ugandan living.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div className={styles.storyContent}>
              <h2 className={styles.storyTitle}>Our Workshop Story</h2>
              <p className={styles.storyText}>
                ARAH Enterprises is built around practical furniture work, room finishing, and customer support for homes and businesses around Kampala. The workshop brings together sofasets, beds, wardrobes, TV stands, tables, storage, and interior ideas under one place.
              </p>
              <p className={styles.storyText}>
                Customers can browse finished pieces, request custom work, ask for finishing guidance, and arrange details through the team. The goal is simple: clear communication, strong presentation, and furniture that fits real rooms.
              </p>
              <p className={styles.storyText}>
                The website now works like a furniture-shop catalog so clients can see departments, products, prices, and inquiry options quickly on phone or desktop.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
                alt="Interior design team planning a space"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={styles.storyPhoto}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.stats}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Workshop Values</h2>
            <p className="section-subtitle">The principles behind every furniture request</p>
          </div>
          <div className="grid grid-4">
            {values.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <value.icon size={28} />
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready To Furnish Your Space?</h2>
            <p>Send your room idea, product request, or custom measurement.</p>
            <Link href="/contact" className="btn btn-primary">
              Get In Touch <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
