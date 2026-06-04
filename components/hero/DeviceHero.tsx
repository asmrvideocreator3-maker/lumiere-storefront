import styles from './DeviceHero.module.css'

/**
 * DeviceHero — full-viewport dark monochrome hero for the Lunara
 * microcurrent device launch. Server Component (no interactivity needed).
 *
 * Swap instruction for real product PNGs:
 *   Inside .deviceBlack / .deviceWhite, remove the <figure> element and
 *   replace with:
 *   <img src="/black-device.png" alt="Lunara Black Edition"
 *        style={{width:'100%',height:'100%',objectFit:'contain'}} />
 */
export function DeviceHero() {
  return (
    <section className={styles.hero} aria-label="Hero — Lunara device launch">

      {/* Background texture layers */}
      <div className={styles.heroAmbient} aria-hidden="true" />
      <div className={styles.heroGridTexture} aria-hidden="true" />
      <div className={styles.heroDivider} aria-hidden="true" />


      {/* ── LEFT: Copy column ── */}
      <div className={styles.heroCopy}>

        <p className={styles.eyebrow} aria-label="Product category">
          <span className={styles.eyebrowRule} aria-hidden="true" />
          Microcurrent Facial Technology
        </p>

        <h1 className={styles.headline}>
          Radiate<br />
          <em>Confidence.</em><br />
          Define Beauty.
        </h1>

        <p className={styles.subheading}>
          Experience the next generation of precision facial
          contouring and microcurrent technology.
        </p>

        <div className={styles.ctaRow}>
          {/* Primary CTA */}
          <a href="#products" className={styles.btnPrimary} aria-label="Shop the Black and White bundle">
            Shop The Duo
          </a>

          {/* Secondary CTA */}
          <a href="#gallery" className={styles.btnSecondary} aria-label="View customer results gallery">
            <svg
              className={styles.arrowIcon}
              width="16" height="10"
              viewBox="0 0 16 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 5h14M11 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Show Us Your Works
          </a>
        </div>

        {/* Google Reviews social proof */}
        <div className={styles.reviewsStrip} role="region" aria-label="Google customer reviews">
          {/* Google G mark — official brand colors */}
          <svg className={styles.googleG} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>

          <div className={styles.stars} aria-label="5 out of 5 stars">
            <span className={styles.starIcon} aria-hidden="true">★</span>
            <span className={styles.starIcon} aria-hidden="true">★</span>
            <span className={styles.starIcon} aria-hidden="true">★</span>
            <span className={styles.starIcon} aria-hidden="true">★</span>
            <span className={styles.starIcon} aria-hidden="true">★</span>
          </div>

          <p className={styles.reviewsMeta}>
            <strong>4.9{'\u2009'}/{'\u2009'}5.0</strong> on Google{'\u00A0\u00A0'}·{'\u00A0\u00A0'}<strong>2,140+</strong> verified reviews
          </p>
        </div>

      </div>{/* /heroCopy */}


      {/* ── RIGHT: Product imagery stage ── */}
      <div className={styles.heroStage} aria-label="Product showcase — Black and White editions">

        {/* Ambient glow plates */}
        <div className={`${styles.glow} ${styles.glowBlack}`} aria-hidden="true" />
        <div className={`${styles.glow} ${styles.glowWhite}`} aria-hidden="true" />

        {/* Floor reflection */}
        <div className={styles.stageFloor} aria-hidden="true" />


        {/* WHITE DEVICE — background layer */}
        <div className={`${styles.device} ${styles.deviceWhite}`} role="img" aria-label="White Edition">
          <figure className={styles.devicePlaceholderWhite} aria-hidden="true">
            <svg viewBox="0 0 90 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wHandle" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FAFAFA"/>
                  <stop offset="55%" stopColor="#ECEBE9"/>
                  <stop offset="100%" stopColor="#D4D2D0"/>
                </linearGradient>
                <linearGradient id="wHead" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF"/>
                  <stop offset="100%" stopColor="#DEDCDA"/>
                </linearGradient>
                <radialGradient id="wHighlight" cx="35%" cy="35%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </radialGradient>
              </defs>
              <ellipse cx="45" cy="38" rx="38" ry="35" fill="url(#wHead)"/>
              <ellipse cx="45" cy="33" rx="28" ry="23" fill="url(#wHighlight)" opacity="0.5"/>
              <rect x="37" y="70" width="16" height="24" rx="3" fill="#E2E0DE"/>
              <rect x="30" y="91" width="30" height="192" rx="15" fill="url(#wHandle)"/>
              <rect x="30" y="91" width="6" height="192" rx="3" fill="rgba(255,255,255,0.3)"/>
              <line x1="33" y1="180" x2="57" y2="180" stroke="rgba(0,0,0,0.10)" strokeWidth="0.6"/>
              <rect x="38" y="235" width="14" height="5" rx="2.5" fill="rgba(0,0,0,0.08)"/>
            </svg>
          </figure>
          <span className={styles.editionLabel}>White Edition</span>
        </div>


        {/* BLACK DEVICE — foreground layer */}
        <div className={`${styles.device} ${styles.deviceBlack}`} role="img" aria-label="Black Edition">
          <figure className={styles.devicePlaceholderBlack} aria-hidden="true">
            <svg viewBox="0 0 110 370" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bHandle" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2A2A2A"/>
                  <stop offset="45%" stopColor="#181818"/>
                  <stop offset="100%" stopColor="#0A0A0A"/>
                </linearGradient>
                <linearGradient id="bHead" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#333"/>
                  <stop offset="100%" stopColor="#0D0D0D"/>
                </linearGradient>
                <radialGradient id="bHighlight" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.12)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </radialGradient>
              </defs>
              <ellipse cx="55" cy="45" rx="47" ry="43" fill="url(#bHead)"/>
              <ellipse cx="55" cy="40" rx="35" ry="28" fill="url(#bHighlight)"/>
              <ellipse cx="55" cy="45" rx="47" ry="43" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
              <rect x="45" y="85" width="20" height="28" rx="4" fill="#161616"/>
              <rect x="36" y="110" width="38" height="240" rx="19" fill="url(#bHandle)"/>
              <rect x="36" y="110" width="5" height="240" rx="2.5" fill="rgba(255,255,255,0.06)"/>
              <line x1="55" y1="125" x2="55" y2="335" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
              <line x1="40" y1="220" x2="70" y2="220" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
              <rect x="47" y="285" width="16" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
            </svg>
          </figure>
          <span className={styles.editionLabel}>Black Edition</span>
        </div>


        {/* Floating specification badges */}
        <div className={`${styles.badge} ${styles.badgeTech}`} aria-label="Technology specification">
          <span className={styles.badgeLabel}>Microcurrent</span>
          <span className={styles.badgeValue}>350 μA · 200 Hz</span>
        </div>

        <div className={`${styles.badge} ${styles.badgeCert}`} aria-label="Regulatory certification">
          <span className={styles.badgeLabel}>Registered</span>
          <span className={styles.badgeValue}>FDA 510(k) Listed</span>
        </div>

      </div>{/* /heroStage */}


      {/* ── BOTTOM BAR — Learn How It Works ── */}
      <div className={styles.heroBottom}>
        <a href="#technology" className={styles.learnTrigger} aria-label="Watch how Lunara technology works">
          <span className={styles.playRing} aria-hidden="true">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1.5L10 6.5L1 11.5V1.5Z"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Learn How It Works
        </a>
      </div>

    </section>
  )
}
