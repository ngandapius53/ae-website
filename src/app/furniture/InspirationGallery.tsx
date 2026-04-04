'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import styles from '@/app/furniture/page.module.css'

type InspirationItem = {
  src: string
  title: string
  category: string
  href?: string
}

type InspirationGroup = {
  category: string
  items: InspirationItem[]
}

export default function InspirationGallery({
  groups,
  initialCount = 9,
  step = 9,
}: {
  groups: InspirationGroup[]
  initialCount?: number
  step?: number
}) {
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    for (const g of groups) init[g.category] = Math.min(initialCount, g.items.length)
    return init
  })

  const orderedGroups = useMemo(() => groups, [groups])

  return (
    <>
      {orderedGroups.map((group) => {
        const shown = visibleCounts[group.category] ?? Math.min(initialCount, group.items.length)
        const canLoadMore = shown < group.items.length
        const visibleItems = group.items.slice(0, shown)

        return (
          <div key={group.category} className={styles.inspirationGroup}>
            <h3 className={styles.inspirationGroupTitle}>{group.category}</h3>
            <div className={styles.inspirationGrid}>
              {visibleItems.map((item) => (
                <a
                  key={item.src}
                  href={item.href ?? item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inspirationCard}
                  aria-label={`Open: ${item.title}`}
                >
                  <div className={styles.inspirationImage}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className={styles.inspirationOverlay}>
                    <span className={styles.inspirationWatermark}>ARAH ENTERPRISES</span>
                    <span className={styles.inspirationBadge}>{group.category}</span>
                    <h4 className={styles.inspirationTitle}>{item.title}</h4>
                  </div>
                </a>
              ))}
            </div>

            {canLoadMore && (
              <div className={styles.inspirationMore}>
                <button
                  type="button"
                  className={styles.inspirationMoreBtn}
                  onClick={() =>
                    setVisibleCounts((prev) => ({
                      ...prev,
                      [group.category]: Math.min((prev[group.category] ?? shown) + step, group.items.length),
                    }))
                  }
                >
                  Load more
                </button>
                <span className={styles.inspirationMoreMeta}>
                  Showing {shown} of {group.items.length}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

