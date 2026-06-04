'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartContext'
import { CATALOG, FREE_SHIPPING_THRESHOLD } from '@/lib/catalog'

export function CartDrawer() {
  const { isOpen, closeDrawer, cartData, isLoadingCart } = useCart()

  // Prevent background scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const total = cartData ? parseFloat(cartData.cost.totalAmount.amount) : 0
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)
  const freeShippingUnlocked = total >= FREE_SHIPPING_THRESHOLD
  const isEmpty = !cartData || cartData.lines.length === 0

  // Cross-sell: show Essentials Set when Signature Set is in cart but Essentials isn't
  const hasSignatureSet = cartData?.lines.some(
    (line) => line.merchandise.product.handle === CATALOG.signatureSet.handle
  )
  const hasEssentialsSet = cartData?.lines.some(
    (line) => line.merchandise.product.handle === CATALOG.essentialsSet.handle
  )
  const showCrossSell = hasSignatureSet && !hasEssentialsSet && !isEmpty

  const postAddTotal = total + parseFloat(CATALOG.essentialsSet.price)
  const afterAddRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - postAddTotal)

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={[
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-sm sm:max-w-md flex-col bg-white shadow-2xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-lg font-semibold text-lunara-charcoal">
              Your Cart
            </h2>
            {cartData && cartData.totalQuantity > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lunara-rose text-xs font-bold text-white">
                {cartData.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-lunara-muted hover:bg-gray-100 hover:text-lunara-charcoal transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Free shipping progress bar ── */}
        <div className="border-b border-gray-100 px-5 py-3">
          {freeShippingUnlocked ? (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Free shipping unlocked!
            </p>
          ) : (
            <p className="mb-1.5 text-xs text-lunara-muted">
              {isEmpty
                ? <>Spend <span className="font-semibold text-lunara-charcoal">${FREE_SHIPPING_THRESHOLD}</span> to unlock free shipping</>
                : <>Add <span className="font-semibold text-lunara-charcoal">${remaining.toFixed(2)}</span> more for free shipping</>
              }
            </p>
          )}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-lunara-rose transition-all duration-500"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">

          {isLoadingCart ? (
            <div className="flex items-center justify-center py-16">
              <svg
                className="animate-spin h-6 w-6 text-lunara-rose"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : isEmpty ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
              <svg
                className="h-14 w-14 text-lunara-blush mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="text-sm font-semibold text-lunara-charcoal mb-1">Your cart is empty</p>
              <p className="text-xs text-lunara-muted mb-6 max-w-[200px]">
                Add something beautiful to get started.
              </p>
              <button
                onClick={closeDrawer}
                className="text-xs font-semibold text-lunara-rose hover:underline"
              >
                Continue Shopping &rarr;
              </button>
            </div>
          ) : (
            /* ── Cart line items ── */
            <ul className="divide-y divide-gray-50 px-5 py-2" role="list">
              {cartData.lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-4">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-lunara-blush/30">
                    {line.merchandise.image ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-lunara-rose/20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeDrawer}
                      className="text-sm font-medium text-lunara-charcoal hover:text-lunara-rose transition-colors line-clamp-1"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.title !== 'Default Title' && (
                      <p className="text-xs text-lunara-muted mt-0.5 truncate">
                        {line.merchandise.title}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-xs text-lunara-muted">Qty: {line.quantity}</span>
                      <span className="text-sm font-semibold text-lunara-rose">
                        ${parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* ── Cross-sell: Complete Your Kit ── */}
          {showCrossSell && (
            <div className="mx-5 mb-4 rounded-2xl border border-lunara-blush bg-lunara-blush/20 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-lunara-rose mb-2.5">
                Complete Your Kit
              </p>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-lunara-charcoal leading-snug">
                    {CATALOG.essentialsSet.title}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-semibold text-lunara-rose">
                      ${CATALOG.essentialsSet.price}
                    </span>
                    <span className="text-xs text-lunara-muted line-through">
                      ${CATALOG.essentialsSet.compareAtPrice}
                    </span>
                  </div>
                  <p className="text-xs text-lunara-muted mt-1 leading-relaxed">
                    {afterAddRemaining > 0
                      ? `Add it — you'll only need $${afterAddRemaining.toFixed(2)} more for free shipping.`
                      : 'Add it and unlock free shipping on your order!'}
                  </p>
                </div>
                <Link
                  href={`/products/${CATALOG.essentialsSet.handle}`}
                  onClick={closeDrawer}
                  className="flex-shrink-0 rounded-xl bg-lunara-rose px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-lunara-rose-dark transition-colors"
                >
                  Add &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer: totals + checkout ── */}
        {!isEmpty && !isLoadingCart && cartData && (
          <div
            className="border-t border-gray-100 px-5 py-4 space-y-3"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-lunara-muted">Subtotal</span>
              <span className="font-semibold text-lunara-charcoal">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-lunara-muted text-center">
              Shipping & taxes calculated at checkout
            </p>
            <a
              href={cartData.checkoutUrl}
              className="flex items-center justify-center w-full min-h-[52px] rounded-xl bg-lunara-rose text-white text-sm font-semibold hover:bg-lunara-rose-dark active:scale-[0.99] transition-all duration-150"
            >
              Checkout — ${total.toFixed(2)}
            </a>
            <button
              onClick={closeDrawer}
              className="w-full text-xs text-lunara-muted hover:text-lunara-charcoal text-center transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
