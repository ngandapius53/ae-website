'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import styles from '@/app/real-estate/page.module.css'

type GalleryItem = {
  src: string
  title: string
}

export default function PropertyGallery({
  items,
  initialCount = 6,
  step = 6,
}: {
  items: GalleryItem[]
  initialCount?: number
  step?: number
}) {
  const ordered = useMemo(() => items, [items])
  const [visibleCount, setVisibleCount] = useState(() => Math.min(initialCount, ordered.length))

  const visibleItems = ordered.slice(0, visibleCount)
  const canLoadMore = visibleCount < ordered.length

  return (
    <>
      <div className={styles.listingsGrid}>
        {visibleItems.map((item) => (
          <a
            key={item.src}
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.propertyCard} ${styles.propertyCardLink}`}
            aria-label={`Open photo: ${item.title}`}
          >
            <div className={styles.propertyImage}>
              <Image
                src={item.src}
                alt={item.title}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className={styles.propertyInfo}>
              <span className={styles.propertyLocation}>Tap to view</span>
              <h4 className={styles.propertyTitle}>{item.title}</h4>
            </div>
          </a>
        ))}
      </div>

      {canLoadMore && (
        <div className={styles.galleryMore}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setVisibleCount((c) => Math.min(c + step, ordered.length))}
          >
            Load more
          </button>
          <span className={styles.galleryMoreMeta}>
            Showing {visibleCount} of {ordered.length}
          </span>
        </div>
      )}
    </>
  )
}

