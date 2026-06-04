'use client'

import { useState, type FormEvent } from 'react'

function TikTokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.84a8.16 8.16 0 004.77 1.53V6.92a4.85 4.85 0 01-1-.23z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const SUPPORT_LINKS = [
  { href: '#', label: 'Track Order' },
  { href: '#', label: 'Returns & Exchanges' },
  { href: '#', label: 'Help Center' },
  { href: '#', label: 'Contact Us' },
  { href: '#', label: 'Shipping Policy' },
]

const LEGAL_LINKS = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Accessibility' },
]

export function LumiereFooter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: integrate with newsletter service (e.g. Klaviyo, Mailchimp)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <>
      {/* ── Footer columns ── */}
      <footer
        className="bg-[#090909] border-t border-white/[0.07] py-20 px-10 pb-14"
        role="contentinfo"
      >
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr] gap-10 md:gap-[72px]">

          {/* Col 1: Newsletter */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-display italic text-[18px] font-bold text-white leading-[1.4] mb-3.5">
              Join the inner circle.<br />Get 15% off your first order.
            </h3>
            <p className="text-[12.5px] font-light leading-[1.72] text-[#888888] mb-7">
              Exclusive access to new drops, limited-edition colorways, and evidence-based skincare
              protocols — delivered directly to your inbox.
            </p>

            <form
              className="flex border border-white/[0.14]"
              aria-label="Newsletter signup"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                autoComplete="email"
                required
                disabled={submitted}
                className="flex-1 min-w-0 bg-transparent border-0 px-[18px] py-3.5 text-[12px] text-white placeholder-[#555555] outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitted}
                className="flex-shrink-0 bg-white text-black px-5 py-3.5 text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-[#D0CCCB] transition-colors duration-200 disabled:opacity-70"
              >
                {submitted ? 'Joined ✓' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Col 2: Support */}
          <div>
            <h4 className="text-[9px] font-bold tracking-[0.28em] uppercase text-white mb-6">
              Support
            </h4>
            <ul className="flex flex-col gap-3.5 list-none m-0 p-0" role="list">
              {SUPPORT_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[13px] font-light text-[#888888] hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Brand + Social */}
          <div>
            <p className="font-display text-[15px] font-bold tracking-[0.16em] uppercase text-white mb-3.5">
              Lumière Innovations
            </p>
            <p className="text-[12px] font-light leading-[1.72] text-[#888888] mb-7">
              Premium beauty technology engineered for the modern woman.
              Precision-crafted devices for visible, lasting results.
            </p>
            <h4 className="text-[9px] font-bold tracking-[0.28em] uppercase text-white mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3" aria-label="Social media links">
              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#888888] hover:border-white/[0.45] hover:text-white transition-all duration-200"
              >
                <TikTokIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#888888] hover:border-white/[0.45] hover:text-white transition-all duration-200"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* ── Legal strip ── */}
      <div className="bg-[#090909] border-t border-white/[0.05] py-[18px] px-10">
        <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-[11px] text-[#555555]">
            © {new Date().getFullYear()} Lumière Innovations. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] text-[#555555] hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
