'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import styles from '@/components/Header.module.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/furniture', label: 'Shop Furniture' },
  { href: '/furniture', label: 'Sofasets' },
  { href: '/furniture', label: 'Beds' },
  { href: '/furniture', label: 'Wardrobes' },
  { href: '/furniture', label: 'TV Stands' },
  { href: '/luxury-fragrance', label: 'Perfumes' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About', isButton: true },
]

const searchRoutes = [
  { href: '/', keywords: ['home', 'main'] },
  { href: '/decoration', keywords: ['decoration', 'decor', 'interior'] },
  { href: '/furniture', keywords: ['furniture', 'sofa', 'table', 'chair'] },
  { href: '/luxury-fragrance', keywords: ['luxury fragrance', 'fragrance', 'perfume', 'scent'] },
  { href: '/graphic-design', keywords: ['graphic design', 'design', 'branding', 'logo'] },
  { href: '/real-estate', keywords: ['real estate', 'property', 'house', 'apartment'] },
  { href: '/checkout', keywords: ['checkout', 'order', 'payment'] },
  { href: '/about', keywords: ['about', 'team', 'company'] },
  { href: '/contact', keywords: ['contact', 'email', 'phone'] },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return
    }

    const match = searchRoutes.find((route) =>
      route.keywords.some((keyword) => normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery))
    )

    if (match) {
      router.push(match.href)
      setQuery('')
      setIsMobileMenuOpen(false)
      setIsMobileSearchOpen(false)
      return
    }

    router.push('/contact')
    setIsMobileMenuOpen(false)
    setIsMobileSearchOpen(false)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/arah-furniture-workshop-logo.jpeg`}
            alt="ARAH Enterprises Furniture Workshop"
            width={56}
            height={56}
            className={styles.logoImage}
            priority
          />
          <span className={styles.logoText}>
            <span className={styles.logoPrimary}>ARAH</span>
            <span className={styles.logoAccent}>Furniture Workshop</span>
          </span>
        </Link>

        <div className={styles.utilityBar}>
          <form className={`${styles.search} ${isMobileSearchOpen ? styles.searchOpen : ''}`} onSubmit={handleSearchSubmit}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search services..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={styles.searchInput}
              aria-label="Search pages"
            />
            <button type="submit" className={styles.searchSubmit}>Go</button>
          </form>
        </div>

        <div className={styles.mobileActions} aria-label="Quick actions">
          <Link href="/" className={`${styles.languageLink} ${styles.languageActive}`} aria-label="Use English">
            EN
          </Link>
          <Link href="/" className={styles.languageLink} aria-label="Use Japanese">
            日本
          </Link>
          <button
            type="button"
            className={styles.iconAction}
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label={isMobileSearchOpen ? 'Close search' : 'Open search'}
          >
            <Search size={22} />
          </button>
          <Link href="/checkout" className={styles.iconAction} aria-label="Open checkout">
            <ShoppingBag size={22} />
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${link.isButton ? styles.aboutButton : ''} ${isActiveLink(link.href) ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
