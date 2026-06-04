'use client'

import { useCart } from './CartContext'

/**
 * Cart icon in the site header.
 * Shows a live item-count badge pulled from CartContext.
 * Clicking opens the CartDrawer.
 */
export function CartHeaderButton() {
  const { openDrawer, totalQuantity } = useCart()

  return (
    <button
      onClick={openDrawer}
      aria-label={`Open cart${totalQuantity > 0 ? ` — ${totalQuantity} item${totalQuantity === 1 ? '' : 's'}` : ''}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 sm:h-6 sm:w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>

      {/* Live count badge */}
      {totalQuantity > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-lunara-rose text-[10px] font-bold text-white"
          aria-hidden="true"
        >
          {totalQuantity > 9 ? '9+' : totalQuantity}
        </span>
      )}
    </button>
  )
}
