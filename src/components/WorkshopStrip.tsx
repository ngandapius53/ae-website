import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from '@/components/WorkshopStrip.module.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const departments = [
  'Best Sellers',
  'Top 100 Offers',
  'New Arrivals',
  'Centre Tables',
  'Chairs',
  'Kitchens',
  'Shoe Racks',
  'Sofasets',
  'TV Stands',
  'Wardrobes',
  'Beds',
  'Perfumes',
]

export default function WorkshopStrip() {
  return (
    <section className={styles.strip} aria-label="ARAH Furniture Workshop departments">
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Image
            src={`${basePath}/arah-enterprises-logo.jpeg`}
            alt="Arah Enterprises logo"
            width={72}
            height={72}
            className={styles.logo}
          />
          <div>
            <span>The No. 1 ARAH Furniture Store</span>
            <strong>Furniture Workshop</strong>
          </div>
        </Link>

        <nav className={styles.departments} aria-label="Furniture departments">
          {departments.map((department) => (
            <Link key={department} href={department === 'Perfumes' ? '/luxury-fragrance' : '/furniture'}>
              {department}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.cta}>
          Request Quote <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
