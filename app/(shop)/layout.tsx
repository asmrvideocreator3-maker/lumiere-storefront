import { CartProvider } from '@/components/cart/CartContext'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CartHeaderButton } from '@/components/cart/CartHeaderButton'

/**
 * Shop layout — wraps all Lunara storefront pages (/, /products/[handle]).
 * The route group (shop) is transparent to URL routing — paths are unchanged.
 */
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#080808] text-white min-h-screen flex flex-col">
      <CartProvider>
        {/* Announcement bar */}
        <div
          className="bg-black text-white overflow-hidden py-2.5 border-b border-white/[0.06]"
          role="marquee"
          aria-label="Store announcements"
        >
          <div className="flex animate-marquee whitespace-nowrap gap-0">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="flex items-center gap-8 pr-8 text-[10px] font-medium tracking-[0.2em] uppercase text-[#888]"
              >
                <span>Free shipping on US orders $50+</span>
                <span className="text-white/20" aria-hidden="true">✦</span>
                <span>Professional device sets — now live</span>
                <span className="text-white/20" aria-hidden="true">✦</span>
                <span>Cruelty-free &amp; dermatologist tested</span>
                <span className="text-white/20" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Sticky header — dark premium */}
        <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-sm border-b border-white/[0.08]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-[60px] sm:h-[72px] items-center justify-between">
              <a
                href="/"
                className="font-display text-xl sm:text-2xl font-bold tracking-[0.14em] uppercase text-white"
              >
                Lunara
              </a>

              <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                <a href="#products" className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#888] hover:text-white transition-colors duration-200">Products</a>
                <a href="#technology" className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#888] hover:text-white transition-colors duration-200">Technology</a>
                <a href="#reviews" className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#888] hover:text-white transition-colors duration-200">Reviews</a>
                <a href="#about" className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#888] hover:text-white transition-colors duration-200">About</a>
              </nav>

              <CartHeaderButton />
            </div>
          </div>
        </header>

        {children}

        <CartDrawer />

        <footer className="border-t border-white/[0.08] bg-[#0F0F0F] mt-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display text-lg font-bold tracking-[0.14em] uppercase text-white">
                Lunara
              </span>
              <p className="text-sm text-[#888] text-center">
                © {new Date().getFullYear()} Lunara Beauty. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs text-[#888] tracking-[0.12em] uppercase">
                <a href="/pages/shipping" className="hover:text-white transition-colors">Shipping</a>
                <a href="/pages/returns" className="hover:text-white transition-colors">Returns</a>
                <a href="/pages/privacy" className="hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </CartProvider>
    </div>
  )
}
