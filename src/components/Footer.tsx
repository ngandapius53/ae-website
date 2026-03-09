'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import styles from '@/components/Footer.module.css'

export default function Footer() {
  const pathname = usePathname()
  const showAboutInfo = pathname === '/about' || pathname.startsWith('/about/')

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.grid} ${!showAboutInfo ? styles.gridWithoutAbout : ''}`}>
          {showAboutInfo && (
            <div className={styles.column}>
              <h3 className={styles.logo}>ARAH ENTERPRISES</h3>
              <p className={styles.description}>
                Your premier destination for stylish decoration, premium furniture,
                creative graphic design, and real estate solutions.
              </p>
              <div className={styles.social}>
                <a
                  href="https://www.facebook.com/share/v/1FJAP5pQUe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Open Facebook profile"
                >
                  <Facebook size={20} />
                </a>
                <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
                <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
                <a href="#" className={styles.socialLink}><Linkedin size={20} /></a>
              </div>
            </div>
          )}

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Services</h4>
            <Link href="/decoration" className={styles.link}>Stylish Decoration</Link>
            <Link href="/furniture" className={styles.link}>Furniture</Link>
            <Link href="/graphic-design" className={styles.link}>Graphic Design</Link>
            <Link href="/real-estate" className={styles.link}>Real Estate</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/checkout" className={styles.link}>Checkout Info</Link>
            <Link href="/contact" className={styles.link}>Get Quote</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <span>NTINDA</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} />
              <span>
                +256708924166
                <br />
                +256702027566
                <br />
                +256709928840
              </span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} />
              <span>arahcompanies369@gmail.com</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 ARAH ENTERPRISES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


