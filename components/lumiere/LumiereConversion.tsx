/**
 * LumiereConversion — full-bleed black final CTA section.
 * Displays both device silhouettes + headline + primary shop button.
 * Server Component — no interactivity.
 */
export function LumiereConversion() {
  return (
    <section
      id="story"
      className="bg-black py-[120px] px-10 pb-[100px] text-center relative overflow-hidden"
      aria-label="Elevate your daily ritual — final CTA"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.035) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Device duo display */}
      <div
        className="relative h-[260px] max-w-[400px] mx-auto mb-[72px] sm:mb-[56px]"
        aria-hidden="true"
      >
        {/* Black device */}
        <div
          className="absolute rounded-[20px] overflow-hidden flex items-center justify-center"
          style={{
            width: 150, height: 245,
            left: '50%', top: 0,
            transform: 'translateX(-70%) rotate(-5deg)',
            background: '#141414',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 20px 56px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)',
            zIndex: 2,
          }}
        >
          <svg viewBox="0 0 110 370" fill="none" width="64" height="214">
            <defs>
              <linearGradient id="convBH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2A2A2A" /><stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
              <linearGradient id="convBHd" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#333" /><stop offset="100%" stopColor="#0D0D0D" />
              </linearGradient>
            </defs>
            <ellipse cx="55" cy="45" rx="47" ry="43" fill="url(#convBHd)" />
            <rect x="45" y="85" width="20" height="28" rx="4" fill="#161616" />
            <rect x="36" y="110" width="38" height="240" rx="19" fill="url(#convBH)" />
            <rect x="36" y="110" width="5" height="240" rx="2.5" fill="rgba(255,255,255,0.05)" />
          </svg>
        </div>

        {/* White device */}
        <div
          className="absolute rounded-[20px] overflow-hidden flex items-center justify-center"
          style={{
            width: 122, height: 200,
            left: '50%', top: 30,
            transform: 'translateX(10%) rotate(7deg)',
            background: '#EDEBE9',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 16px 44px rgba(0,0,0,0.75)',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 90 300" fill="none" width="54" height="180">
            <defs>
              <linearGradient id="convWH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FAFAFA" /><stop offset="100%" stopColor="#D4D2D0" />
              </linearGradient>
              <linearGradient id="convWHd" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#DEDCDA" />
              </linearGradient>
            </defs>
            <ellipse cx="45" cy="38" rx="38" ry="35" fill="url(#convWHd)" />
            <rect x="37" y="70" width="16" height="24" rx="3" fill="#E2E0DE" />
            <rect x="30" y="91" width="30" height="192" rx="15" fill="url(#convWH)" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h2
        className="font-display font-black text-white leading-[1.04] tracking-[-0.01em] mb-5 relative"
        style={{ fontSize: 'clamp(42px, 5.5vw, 80px)' }}
      >
        Elevate Your<br />
        <em className="italic">Daily Ritual.</em>
      </h2>

      <p className="text-[13px] font-light tracking-[0.1em] text-[#888888] mb-[52px] relative">
        Both editions. One ritual. Infinite confidence.
      </p>

      <a
        href="#duo"
        aria-label="Shop the complete Lumière duo"
        className="inline-flex items-center justify-center gap-2.5 px-[52px] py-5 bg-white text-black text-[10px] font-bold tracking-[0.28em] uppercase border border-white rounded-full hover:bg-transparent hover:text-white transition-colors duration-200 relative"
      >
        Shop The Duo
        <svg width="15" height="9" viewBox="0 0 16 10" fill="none" aria-hidden="true">
          <path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
