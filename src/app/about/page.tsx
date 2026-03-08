import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Globe, Heart, Users } from 'lucide-react'
import styles from '@/app/about/page.module.css'

export const metadata: Metadata = {
  title: 'About Us - AE',
  description: 'Learn more about AE and our mission to transform spaces.',
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
          <h1 className={styles.heroTitle}>About AE</h1>
          <p className={styles.heroDescription}>
            Transforming spaces and creating experiences since 2014.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            <div className={styles.storyContent}>
              <h2 className={styles.storyTitle}>Our Story</h2>
              <p className={styles.storyText}>
                Founded in 2014, AE began with a simple vision: to transform ordinary spaces into extraordinary experiences. What started as a small interior design studio has grown into a comprehensive creative agency offering decoration, furniture, graphic design, and real estate services.
              </p>
              <p className={styles.storyText}>
                Our team of passionate designers, architects, and creative professionals work collaboratively to bring our clients&apos; visions to life. We believe that great design has the power to enhance quality of life, boost productivity, and create lasting impressions.
              </p>
              <p className={styles.storyText}>
                Today, AE is proud to be a trusted partner for homeowners, businesses, and investors seeking premium design and real estate solutions. Our commitment to excellence and client satisfaction remains at the heart of our mission.
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
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
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
            <h2 className={styles.ctaTitle}>Join Our Journey</h2>
            <p>Let&apos;s create something beautiful together.</p>
            <Link href="/contact" className="btn btn-primary">
              Get In Touch <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
