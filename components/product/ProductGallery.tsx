'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ShopifyImage } from '@/lib/shopify'

interface ProductGalleryProps {
  images: ShopifyImage[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-lunara-blush/20 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="h-12 w-12 text-lunara-rose/20"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    )
  }

  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-24">
      {/* Main image — fixed aspect ratio prevents CLS */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-lunara-blush/20">
        <Image
          src={activeImage.url}
          alt={activeImage.altText ?? title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-200"
        />

        {/* Prev / Next arrows — desktop only */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="h-4 w-4 text-lunara-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <svg className="h-4 w-4 text-lunara-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={[
                'relative flex-shrink-0 h-16 w-16 rounded-xl overflow-hidden transition-all duration-150',
                i === activeIndex
                  ? 'ring-2 ring-lunara-rose ring-offset-2'
                  : 'opacity-50 hover:opacity-80',
              ].join(' ')}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} — image ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
