'use client'

import { useRef, useState, useCallback } from 'react'

const REVIEWS = [
  {
    id: 1,
    quote: '"Within two weeks I noticed significantly less puffiness around my eyes and a subtle but real lift along my jawline. My skin already feels firmer and looks more awake."',
    name: 'Sofia M.',
    location: 'New York, NY',
    milestone: '2-Week Milestone',
    initial: 'S',
  },
  {
    id: 2,
    quote: '"Month one check-in: my cheekbones look more defined and my skin has this incredible healthy glow. Three people have asked if I\'ve \'done something different.\' Worth every penny."',
    name: 'Ava L.',
    location: 'Los Angeles, CA',
    milestone: '4-Week Milestone',
    initial: 'A',
  },
  {
    id: 3,
    quote: '"Two months in and the difference is unmistakable — sharper contours, softened fine lines, and a morning ritual I genuinely look forward to. This device has replaced three other tools."',
    name: 'Rachel K.',
    location: 'Miami, FL',
    milestone: '8-Week Milestone',
    initial: 'R',
  },
  {
    id: 4,
    quote: '"I\'ve tried every gua sha and roller on the market. This is on a completely different level — the microcurrent is real and the premium finish makes me want to display it on my vanity."',
    name: 'Jade T.',
    location: 'Chicago, IL',
    milestone: '8-Week Milestone',
    initial: 'J',
  },
]

const SCROLL_AMOUNT = 344 // 320px card + 24px gap

export function LumiereReviews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  function scrollTo(dir: 'prev' | 'next') {
    trackRef.current?.scrollBy({
      left: dir === 'next' ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="results"
      className="bg-white py-[108px]"
      aria-label="Real results and customer reviews"
    >
      {/* Header */}
      <div className="text-center max-w-[560px] mx-auto mb-[72px] px-10">
        <p className="text-[9px] font-semibold tracking-[0.36em] uppercase text-[#888888] mb-[18px]">
          Verified Results
        </p>
        <h2
          className="font-display font-bold text-black leading-[1.1]"
          style={{ fontSize: 'clamp(30px, 3.4vw, 52px)' }}
        >
          Real Results from<br />Real Routines.
        </h2>
      </div>

      {/* Before / After comparison */}
      <div
        className="max-w-[860px] mx-auto mb-20 grid grid-cols-1 sm:grid-cols-2 gap-[3px] bg-[#D0CCCB] border border-[#D0CCCB] px-10 sm:px-0"
        role="region"
        aria-label="Before and after skin comparison"
      >
        {/* Before */}
        <div className="aspect-[3/4] bg-[#EEECEB] relative overflow-hidden flex items-center justify-center">
          {/*
            Drop in before image:
            import Image from 'next/image'
            <Image src="/before-skin.jpg" alt="Skin texture before Lumière, Day 0"
                   fill style={{ objectFit: 'cover' }} />
          */}
          <div className="w-16 h-16 rounded-full bg-[#D0CCCB] flex items-center justify-center" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
          <span className="absolute top-[18px] left-[18px] text-[8.5px] font-bold tracking-[0.2em] uppercase bg-black text-white px-3.5 py-1.5">
            Before
          </span>
          <span className="absolute bottom-[18px] right-[18px] text-[9px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 bg-white border border-[#D0CCCB] text-black">
            Day 0
          </span>
        </div>

        {/* After */}
        <div className="aspect-[3/4] bg-[#EEECEB] relative overflow-hidden flex items-center justify-center">
          {/*
            Drop in after image:
            import Image from 'next/image'
            <Image src="/after-skin.jpg" alt="Skin texture after 8 weeks of Lumière"
                   fill style={{ objectFit: 'cover' }} />
          */}
          <div className="w-16 h-16 rounded-full bg-[#DDDCDB] flex items-center justify-center" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
          <span className="absolute top-[18px] left-[18px] text-[8.5px] font-bold tracking-[0.2em] uppercase bg-white border border-[#D0CCCB] text-black px-3.5 py-1.5">
            After
          </span>
          <span className="absolute bottom-[18px] right-[18px] text-[9px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 bg-white border border-[#D0CCCB] text-black">
            Week 8
          </span>
        </div>
      </div>

      {/* Reviews header + arrow navigation */}
      <div className="flex items-center justify-between max-w-[1100px] mx-auto px-10 mb-12">
        <h3
          className="font-display font-bold text-black"
          style={{ fontSize: 'clamp(22px, 2.6vw, 34px)' }}
        >
          What Our Customers Are Saying
        </h3>

        <div className="flex gap-2 flex-shrink-0">
          {(['prev', 'next'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollTo(dir)}
              disabled={dir === 'prev' ? !canPrev : !canNext}
              aria-label={dir === 'prev' ? 'Previous reviews' : 'Next reviews'}
              className="w-10 h-10 flex items-center justify-center border border-[#D0CCCB] rounded-full text-[#444444] hover:bg-black hover:text-white hover:border-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
            >
              <svg
                width="12"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
                className={dir === 'prev' ? 'rotate-180' : ''}
              >
                <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-10 max-w-[1100px] mx-auto"
        style={{ scrollbarWidth: 'none' }}
        role="list"
        aria-label="Customer reviews"
      >
        {REVIEWS.map((review) => (
          <article
            key={review.id}
            className="flex-none w-[320px] snap-start bg-[#F6F4F2] rounded-sm p-[36px_30px]"
            role="listitem"
          >
            <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="text-[13px]" style={{ color: '#F9AB00' }} aria-hidden="true">★</span>
              ))}
            </div>
            <p className="font-display italic text-[14.5px] font-normal leading-[1.78] text-[#444444] mb-7">
              {review.quote}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full bg-[#444444] text-white text-[13px] font-semibold flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                {review.initial}
              </div>
              <div>
                <p className="text-[11.5px] font-semibold text-black">{review.name}</p>
                <p className="text-[10.5px] text-[#888888] mt-0.5">{review.location}</p>
                <p
                  className="text-[9px] font-semibold tracking-[0.12em] uppercase mt-1"
                  style={{ color: '#2E7D32' }}
                >
                  ✓ Verified Buyer · {review.milestone}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
