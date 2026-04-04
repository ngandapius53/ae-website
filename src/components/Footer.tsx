'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import styles from '@/components/Footer.module.css'

function XLogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.63 7.584H.48l8.6-9.83L0 1.154h7.594l5.243 6.932L18.9 1.153Zm-1.291 19.492h2.039L6.486 3.24H4.298L17.61 20.645Z" />
    </svg>
  )
}

function WhatsAppLogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 8 0C3.589 0 0 3.589 0 8a7.94 7.94 0 0 0 1.134 4.077L0 16l3.95-1.127A7.944 7.944 0 0 0 8 16c4.411 0 8-3.589 8-8a7.945 7.945 0 0 0-2.399-5.674zM8 14.5a6.5 6.5 0 0 1-3.31-.908l-.237-.14-2.345.669.679-2.286-.154-.234A6.48 6.48 0 0 1 1.5 8c0-3.584 2.916-6.5 6.5-6.5 1.737 0 3.37.676 4.598 1.904A6.46 6.46 0 0 1 14.5 8c0 3.584-2.916 6.5-6.5 6.5z" />
      <path d="M11.132 8.632c-.063-.314-.42-.532-.88-.71-.307-.119-.719-.237-.98-.364-.154-.074-.322-.093-.49.082-.173.18-.523.632-.64.761-.117.13-.234.146-.42.05-.188-.093-.79-.29-1.506-.924-.556-.496-.932-1.11-1.04-1.297-.107-.188-.011-.289.082-.383.084-.083.188-.218.28-.328.096-.11.128-.188.192-.314.063-.126.032-.237-.016-.332-.05-.096-.437-1.05-.6-1.437-.158-.379-.32-.328-.437-.334l-.372-.007a.713.713 0 0 0-.515.24c-.176.189-.672.656-.672 1.6 0 .945.688 1.86.783 1.99.096.126 1.353 2.062 3.276 2.892.457.197.814.315 1.092.404.458.146.874.126 1.203.077.367-.055 1.13-.461 1.289-.906.159-.446.159-.828.112-.907-.047-.079-.173-.126-.36-.22z" />
    </svg>
  )
}

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
                  href="https://www.facebook.com/share/1G4xN5pg7s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Open Facebook profile"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/arahenterprises11?igsh=cndveTZtdWVvazBk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Open Instagram profile"
                >
                  <Instagram size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Open X profile"><XLogoIcon size={20} /></a>
                <a
                  href="https://wa.me/966583625047?text=Hello%20ARAH%20ENTERPRISES%2C%20I%20want%20to%20chat%20with%20your%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Open WhatsApp business chat"
                >
                  <WhatsAppLogoIcon size={20} />
                </a>
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
              <div>
                <div className={styles.contactLineLabel}>Address</div>
                <span>KAMPALA NTINDA</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} />
              <span>
                Available on request
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


