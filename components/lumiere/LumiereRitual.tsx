const STEPS = [
  {
    num: 'Step 01',
    label: 'Prep',
    body: 'Apply a hydrating conductive gel or premium facial oil to freshly cleansed skin. The rollers glide best on a nourished, slightly damp surface for optimal conductivity.',
    icon: (
      <svg width="19" height="22" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path d="M10 2C10 2 2 10 2 15a8 8 0 0016 0C18 10 10 2 10 2z" stroke="#888888" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 'Step 02',
    label: 'Sculpt',
    body: 'Glide the microcurrent rollers gently upward along the jawline and cheekbones, following the natural contours of the face with light, confident strokes for 3–5 minutes.',
    icon: (
      <svg width="22" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
        <path d="M2 9c2-5 4-7 6-7s3 5 5 5 3-7 6-7" stroke="#888888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 16c2-3 3-4 5-4s3 3 5 3 3-4 5-4" stroke="#888888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.38" />
      </svg>
    ),
  },
  {
    num: 'Step 03',
    label: 'Glow',
    body: 'Pat the remaining serum into the skin with fingertips to lock in hydration and reveal an instant, visibly lifted radiance. Use morning or evening — results compound over time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#888888" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.5" stroke="#888888" strokeWidth="1.4" />
      </svg>
    ),
  },
]

export function LumiereRitual() {
  return (
    <section
      id="ritual"
      className="bg-white border-t border-[#EEECEB] py-[108px] px-10"
      aria-label="The Sculpting Ritual — 3-step guide"
    >
      {/* Section header */}
      <div className="text-center max-w-[560px] mx-auto mb-20">
        <p className="text-[9px] font-semibold tracking-[0.36em] uppercase text-[#888888] mb-[18px]">
          Your Daily Protocol
        </p>
        <h2
          className="font-display font-bold text-black leading-[1.1]"
          style={{ fontSize: 'clamp(30px, 3.4vw, 52px)' }}
        >
          The Sculpting Ritual
        </h2>
      </div>

      {/* 3-step grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 max-w-[1080px] mx-auto border border-[#D0CCCB]"
        role="list"
      >
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`px-11 py-14 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[#D0CCCB]' : ''}`}
            role="listitem"
          >
            <p className="font-display text-[11px] font-normal tracking-[0.14em] text-[#888888] mb-9">
              {step.num}
            </p>
            <div
              className="w-12 h-12 border border-[#D0CCCB] rounded-full flex items-center justify-center mb-7"
              aria-hidden="true"
            >
              {step.icon}
            </div>
            <p className="text-[8.5px] font-bold tracking-[0.32em] uppercase text-black mb-3.5">
              {step.label}
            </p>
            <p className="text-sm font-light leading-[1.82] text-[#444444]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
