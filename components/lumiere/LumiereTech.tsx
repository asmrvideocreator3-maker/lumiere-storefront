const SPECS = [
  {
    title: 'Dual-Sphere Contouring',
    body: "Ergonomically engineered to perfectly mimic an aesthetician's deep kneading facial massage — targeting lymphatic drainage and muscle activation simultaneously through precision contact pressure.",
  },
  {
    title: 'Microcurrent Core',
    body: "Delivers low-voltage electrical currents at 350 μA · 200 Hz that mirror your body's natural bioelectrical impulses — visibly toning and re-educating facial muscles over a consistent use cycle.",
  },
  {
    title: 'Light-Activated Generation',
    body: 'Harnesses ambient light through the central solar panel indicator strip to power microcurrents seamlessly. No charging required — beautifully sustainable by design.',
  },
]

export function LumiereTech() {
  return (
    <section
      id="technology"
      className="bg-[#F6F4F2] py-[108px] px-10"
      aria-label="Product technology deep dive"
    >
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-[88px] items-center">

        {/* Left: focal product image */}
        <div
          className="w-full bg-[#1A1A1A] rounded-sm overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: '4 / 5' }}
          role="img"
          aria-label="Close-up of Lumière diamond-cut roller spheres"
        >
          {/*
            Swap in roller close-up image:
            import Image from 'next/image'
            <Image src="/roller-closeup.png" alt="Diamond-cut roller spheres"
                   fill style={{ objectFit: 'cover' }} />
            (wrap this section div with position:relative)
          */}
          <div className="flex flex-col items-center gap-5" aria-hidden="true">
            <div className="flex items-end gap-3.5">
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 32% 32%, #AAAAAA, #222222)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 -2px 8px rgba(0,0,0,0.35)',
                }}
              />
              <div
                className="w-[60px] h-[60px] rounded-full mb-1.5"
                style={{
                  background: 'radial-gradient(circle at 32% 32%, #AAAAAA, #222222)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 -2px 8px rgba(0,0,0,0.35)',
                }}
              />
            </div>
            <span className="text-[8.5px] tracking-[0.26em] uppercase text-[#888888] mt-1">
              Diamond-Cut Contouring Spheres
            </span>
          </div>
        </div>

        {/* Right: spec copy */}
        <div>
          <p className="text-[9px] font-semibold tracking-[0.36em] uppercase text-[#888888] mb-4">
            Advanced Engineering
          </p>
          <h2
            className="font-display font-bold text-black leading-[1.1] mb-14"
            style={{ fontSize: 'clamp(30px, 3.4vw, 52px)' }}
          >
            Engineered for<br />
            <em className="italic">Visible Results.</em>
          </h2>

          <div>
            {SPECS.map((spec, i) => (
              <div
                key={spec.title}
                className={`py-[30px] border-t border-black/10 ${i === SPECS.length - 1 ? 'border-b border-black/10' : ''}`}
              >
                <h3 className="flex items-center gap-3.5 text-[13px] font-semibold tracking-[0.03em] text-black mb-2.5">
                  <span className="block w-[18px] h-px bg-black flex-shrink-0" aria-hidden="true" />
                  {spec.title}
                </h3>
                <p className="text-[13.5px] font-light leading-[1.78] text-[#444444] pl-8">
                  {spec.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
