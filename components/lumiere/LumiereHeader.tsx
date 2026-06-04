'use client'

import { useState } from 'react'

const NAV_LINKS = [
  { href: '#duo', label: 'Shop Duo' },
  { href: '#technology', label: 'The Technology' },
  { href: '#results', label: 'Results' },
  { href: '#story', label: 'Our Story' },
] as const

export function LumiereHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── Top utility bar ── */}
      <div
        className="bg-black text-white text-center py-[11px] px-5 text-[10px] font-medium tracking-[0.22em] uppercase relative z-[200]"
        role="banner"
        aria-label="Store promotions"
      >
        FREE EXPRESS SHIPPING ON ALL ORDERS&nbsp;&nbsp;|&nbsp;&nbsp;30-DAY RISK-FREE TRIAL
      </div>

      {/* ── Sticky nav ── */}
      <nav
        className="sticky top-0 z-[190] bg-white/[0.97] backdrop-blur-[8px] border-b border-[#D0CCCB] h-[72px]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto h-full px-10 flex items-center justify-between relative">

          {/* Logo */}
          <a
            href="/lumiere"
            className="font-display text-[14.5px] font-bold tracking-[0.18em] uppercase text-black"
            aria-label="Lumière Innovations home"
          >
            Lumière Innovations
          </a>

          {/* Desktop links — absolutely centred */}
          <ul
            className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10 list-none m-0 p-0"
            role="list"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-[#888888] hover:text-black transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: bag + user + hamburger */}
          <div className="flex items-center gap-2">
            {/* Shopping bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0A0A0A] hover:bg-[#EEECEB] transition-colors duration-150"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>

            {/* User account */}
            <button
              type="button"
              aria-label="User account"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0A0A0A] hover:bg-[#EEECEB] transition-colors duration-150"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="lumiere-mobile-nav"
              className="flex lg:hidden flex-col gap-[5px] p-1.5 ml-1 bg-transparent border-0 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block w-[22px] h-px bg-black" />
              <span className="block w-[22px] h-px bg-black" />
              <span className="block w-[22px] h-px bg-black" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="lumiere-mobile-nav"
          className="fixed inset-0 z-[180] bg-white pt-[116px]"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-6 py-4 list-none m-0" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-[13px] font-medium tracking-[0.16em] uppercase border-b border-[#EEECEB] text-[#444444] hover:text-black transition-colors duration-150"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
