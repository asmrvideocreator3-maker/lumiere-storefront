'use client'

/**
 * LumiereVideoMarquee
 *
 * Uses public streaming video placeholders out of the box.
 * Swap any videoUrl to a local /public path when your own clips are ready.
 *
 * Hydration guard: video elements only mount on the client via useEffect
 * so server and initial client renders are identical (no mismatch warnings).
 */

import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ReviewCard = {
  handle: string
  platform: 'tiktok' | 'instagram'
  videoUrl: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const reviewCards: ReviewCard[] = [
  {
    handle: '@glow.with.ava',
    platform: 'instagram',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-moisturizer-to-her-face-41154-large.mp4',
  },
  {
    handle: '@sofia.beaute',
    platform: 'tiktok',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-cleaning-her-face-with-a-cotton-pad-41151-large.mp4',
  },
  {
    handle: '@rachelskincare',
    platform: 'tiktok',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-skin-41158-large.mp4',
  },
  {
    handle: '@lumiere.love',
    platform: 'instagram',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-moisturizer-to-her-face-41154-large.mp4',
  },
  {
    handle: '@jadeglow_',
    platform: 'tiktok',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-cleaning-her-face-with-a-cotton-pad-41151-large.mp4',
  },
  {
    handle: '@beautybymar',
    platform: 'tiktok',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-skin-41158-large.mp4',
  },
  {
    handle: '@skin.rituals',
    platform: 'instagram',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-moisturizer-to-her-face-41154-large.mp4',
  },
  {
    handle: '@glowup.daily',
    platform: 'tiktok',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-skin-41158-large.mp4',
  },
]

/**
 * Duplicated for seamless loop.
 * Each slot = 158px card + 16px mr-4 = 174px.
 * 8 slots × 174px = 1 392px per set → translateX(-50%) = −1 392px ✓
 */
const MARQUEE_ITEMS = [...reviewCards, ...reviewCards]

// ─── Icons ────────────────────────────────────────────────────────────────────

function TikTokIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.84a8.16 8.16 0 004.77 1.53V6.92a4.85 4.85 0 01-1-.23z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// ─── VideoCard ─────────────────────────────────────────────────────────────────

type VideoCardProps = {
  card: ReviewCard
  /** True only after the parent has confirmed client mount */
  mounted: boolean
}

function VideoCard({ card, mounted }: VideoCardProps) {
  const [hovered, setHovered] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const showVideo = mounted && !videoError

  return (
    <div
      className="flex-none w-[158px] h-[280px] mr-4 relative rounded-2xl overflow-hidden bg-zinc-900 border cursor-pointer select-none"
      style={{
        borderColor: hovered ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.07)',
        transform: hovered ? 'scale(1.045)' : 'scale(1)',
        boxShadow: hovered
          ? '0 0 0 1px rgba(255,255,255,0.09), 0 20px 56px rgba(0,0,0,0.9), 0 0 28px rgba(255,255,255,0.05)'
          : '0 4px 16px rgba(0,0,0,0.5)',
        transition: 'transform 320ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 320ms ease, border-color 320ms ease',
        zIndex: hovered ? 10 : 'auto',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Background ── */}
      {showVideo ? (
        <video
          src={card.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="object-cover w-full h-full absolute inset-0 rounded-2xl z-0"
        />
      ) : (
        /* SSR skeleton + error fallback — bg-zinc-900 keeps layout stable */
        <div className="absolute inset-0 bg-zinc-900 rounded-2xl z-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
        </div>
      )}

      {/* ── Play button — dead centre ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        <div
          className="w-[46px] h-[46px] rounded-full flex items-center justify-center"
          style={{
            background: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.18)'}`,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            transition: 'background 320ms ease, border-color 320ms ease',
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
            style={{ marginLeft: 2, opacity: hovered ? 1 : 0.7 }}
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        </div>
      </div>

      {/* ── Bottom gradient + handle ── */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)',
          paddingBottom: 14,
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 40,
          zIndex: 2,
        }}
      >
        <p className="text-[10.5px] font-semibold text-white truncate leading-tight" style={{ opacity: 0.92 }}>
          {card.handle}
        </p>
      </div>

      {/* ── Platform badge — top right ── */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.58)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
          paddingLeft: 9,
          paddingRight: 9,
          paddingTop: 5,
          paddingBottom: 5,
          color: 'rgba(255,255,255,0.78)',
          zIndex: 3,
        }}
      >
        {card.platform === 'tiktok' ? <TikTokIcon /> : <InstagramIcon />}
        <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.07em' }}>
          {card.platform === 'tiktok' ? 'TikTok' : 'Instagram'}
        </span>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function LumiereVideoMarquee() {
  const [mounted, setMounted] = useState(false)
  const [paused, setPaused] = useState(false)

  // Hydration guard — videos only activate after client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="bg-[#0A0A0A] py-20 overflow-hidden"
      aria-label="Customer review videos"
    >
      {/* Section header */}
      <div className="text-center mb-14 px-10">
        <p className="text-[9px] font-semibold tracking-[0.36em] uppercase text-[#555555] mb-3.5">
          From Our Community
        </p>
        <h2
          className="font-display font-bold text-white leading-[1.1]"
          style={{ fontSize: 'clamp(24px, 2.8vw, 42px)' }}
        >
          As Seen on TikTok
          <em className="italic"> &amp; </em>
          Instagram
        </h2>
      </div>

      {/* Marquee wrapper — edge fade + pause on hover */}
      <div
        aria-hidden="true"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex animate-marquee-slow"
          style={{
            animationPlayState: paused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {MARQUEE_ITEMS.map((card, i) => (
            <VideoCard
              key={`${card.handle}-${i}`}
              card={card}
              mounted={mounted}
            />
          ))}
        </div>
      </div>

      {/* Social CTA */}
      <p className="text-center text-[11px] text-[#4A4A4A] mt-10 px-10">
        Tag us{' '}
        <span className="text-white/50 font-semibold tracking-[-0.01em]">
          @lumiere.innovations
        </span>
        {' '}to be featured
      </p>
    </section>
  )
}
