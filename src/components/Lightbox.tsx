'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from '@/components/Lightbox.module.css'

interface LightboxProps {
  images: { title: string; category: string; image: string }[]
}

export default function Lightbox({ images }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className={styles.grid}>
        {images.map((item, index) => (
          <div 
            key={index} 
            className={styles.item}
            onClick={() => openLightbox(index)}
          >
            <div className={styles.image}>{item.image}</div>
            <div className={styles.overlay}>
              <span className={styles.category}>{item.category}</span>
              <h4 className={styles.title}>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.close} onClick={closeLightbox}>
            <X size={24} />
          </button>
          
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mainImage}>{images[currentIndex].image}</div>
            <div className={styles.caption}>
              <span className={styles.captionCategory}>{images[currentIndex].category}</span>
              <h3>{images[currentIndex].title}</h3>
            </div>
          </div>

          <button className={`${styles.nav} ${styles.prev}`} onClick={prevImage}>
            <ChevronLeft size={32} />
          </button>
          <button className={`${styles.nav} ${styles.next}`} onClick={nextImage}>
            <ChevronRight size={32} />
          </button>

          <div className={styles.thumbnails}>
            {images.map((item, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
              >
                {item.image}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
