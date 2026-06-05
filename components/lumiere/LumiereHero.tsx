import Image from 'next/image'
import styles from './LumiereHero.module.css'

function GoogleIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

/**
 * LumiereHero — split-panel hero (white left / black right).
 * Devices are positioned absolutely in a stage that spans the full hero width,
 * allowing them to cross the colour-divide.
 *
 * Image swap: place /image_3dfdad.png (black) and /image_3dfda7.png (white)
 * in the /public directory. They will render automatically.
 */
export function LumiereHero() {
  return (
    <section
      id="duo"
      className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen overflow-hidden"
      aria-label="Lumière Innovations — hero"
    >
      {/* ── Left panel: white ── */}
      <div className="bg-white order-2 md:order-none">
        {/* z-20 keeps copy above device stage (z-10) */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 py-[52px] md:px-[64px] md:py-24">

          {/* Eyebrow */}
          <p className="flex items-center gap-3 text-[9.5px] font-semibold tracking-[0.34em] uppercase text-[#888888] mb-[30px]">
            <span className="w-7 h-px bg-[#D0CCCB] flex-shrink-0" aria-hidden="true" />
            Luxury Facial Technology
          </p>

          {/* Headline */}
          <h1
            className="font-display font-black text-black leading-[0.98] tracking-[-0.015em] mb-[30px]"
            style={{ fontSize: 'clamp(44px, 5vw, 80px)' }}
          >
            Radiate<br />
            <em className="italic">Confidence.</em><br />
            Define Beauty.
          </h1>

          {/* Google Reviews */}
          <div
            className="flex items-center gap-3 mb-11"
            role="region"
            aria-label="Google customer reviews"
          >
            <GoogleIcon />
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="text-[13px] leading-none"
                  style={{ color: '#F9AB00' }}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-[11.5px] text-[#888888]">
              <strong className="text-[#0A0A0A] font-semibold">4.9&#8239;/&#8239;5.0</strong>
              {' · '}
              <strong className="text-[#0A0A0A] font-semibold">2,140+</strong>
              {' '}verified reviews on Google
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <a
              href="#"
              aria-label="Shop the Black and White duo bundle"
              className="inline-flex items-center justify-center px-[38px] py-[15px] bg-black text-white text-[10px] font-bold tracking-[0.24em] uppercase border border-black rounded-full hover:bg-transparent hover:text-black transition-colors duration-200 whitespace-nowrap"
            >
              Shop The Duo
            </a>
            <a
              href="#results"
              aria-label="See customer results gallery"
              className="inline-flex items-center justify-center gap-2 px-[30px] py-[15px] bg-transparent text-[#0A0A0A] text-[10px] font-semibold tracking-[0.22em] uppercase border border-black/25 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-200 group whitespace-nowrap"
            >
              <svg
                className="w-[15px] h-[9px] group-hover:translate-x-1 transition-transform duration-200"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Show Us Your Works
            </a>
          </div>

        </div>
      </div>

      {/* ── Right panel: black ── */}
      <div
        className="bg-black relative order-1 md:order-none md:h-auto md:min-h-0 md:max-h-none"
        style={{ height: '58vmax', minHeight: 320, maxHeight: 460 }}
      >
        {/* Radial ambient glow */}
        <div
          className="absolute right-[15%] top-[20%] w-[380px] h-[380px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.045) 0%, transparent 68%)' }}
          aria-hidden="true"
        />
      </div>

      {/* ── Device stage: absolute, spans full hero width ──
          z-10 = above panels, below left copy (z-20) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-label="Product showcase — Black and White editions"
      >
        {/* BLACK device — foreground, crosses the colour divide */}
        <div
          className={styles.devBlack}
          role="img"
          aria-label="Lumière Black Edition microcurrent roller"
        >
          <div className={`relative w-full h-full ${styles.imgMask}`}>
            <Image
              src="/image_3dfdad.jpg"
              alt="Lumière Black Edition microcurrent roller"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={styles.editionLabel}>Black Edition</span>
        </div>

        {/* WHITE device — background layer */}
        <div
          className={styles.devWhite}
          role="img"
          aria-label="Lumière White Edition microcurrent roller"
        >
          <div className={`relative w-full h-full ${styles.imgMask}`}>
            <Image
              src="/image_3dfda7.jpg"
              alt="Lumière White Edition microcurrent roller"
              fill
              className="object-contain"
            />
          </div>
          <span className={styles.editionLabel}>White Edition</span>
        </div>
      </div>

    </section>
  )
}
