'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import styles from './page.module.css'

const fragrances = Array.from({ length: 23 }, (_, index) => {
  const imageNumber = String(index + 1).padStart(2, '0')
  return {
    id: index + 1,
    image: `/luxury-fragrance/lf-${imageNumber}.jpeg`,
  }
})

export default function LuxuryFragrance() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <Image
          src="/luxury-fragrance/lf-01.jpeg"
          alt="Luxury Fragrance"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Luxury Fragrance</h1>
          <p className={styles.heroSubtitle}>Exquisite Arabian Perfumes</p>
        </div>
      </section>

      <section className={styles.intro}>
        <h2 className={styles.sectionTitle}>Premium Arabian Fragrances</h2>
        <p className={styles.introText}>
          Discover our exclusive collection of luxury Arabian perfumes,
          crafted with the finest ingredients from around the world.
          Each fragrance tells a story of elegance and sophistication.
        </p>
      </section>

      <section className={styles.collection}>
        <h2 className={styles.sectionTitle}>Our Collection</h2>
        <div className={styles.grid}>
          {fragrances.map((perfume) => (
            <div
              key={perfume.id}
              className={styles.card}
              onClick={() => setSelectedImage(perfume.image)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={perfume.image}
                  alt={`Perfume ${perfume.id}`}
                  fill
                  className={styles.cardImage}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxContent} onClick={(event) => event.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Perfume"
              fill
              className={styles.lightboxImage}
            />
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
            >
              <X size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
