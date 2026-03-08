'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import styles from '@/components/MultiGallery.module.css'

interface GalleryImage {
  id: number
  title: string
  category: string
  image: string
}

interface MultiGalleryProps {
  images: GalleryImage[]
}

export default function MultiGallery({ images }: MultiGalleryProps) {
  const [filter, setFilter] = useState('All')
  
  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))]
  
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter)

  return (
    <div className={styles.gallery}>
      <div className={styles.filterBar}>
        <Filter size={20} />
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className={styles.grid}>
        {filteredImages.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.image}>{item.image}</div>
            <div className={styles.overlay}>
              <span className={styles.category}>{item.category}</span>
              <h4 className={styles.title}>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
