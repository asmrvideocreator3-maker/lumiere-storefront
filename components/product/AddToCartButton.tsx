'use client'

import { useState } from 'react'
import { addToCartAction } from '@/app/actions/cart'
import { useCart } from '@/components/cart/CartContext'

interface AddToCartButtonProps {
  variantId: string
  availableForSale: boolean
  /** Slimmer height variant used inside the mobile sticky bar */
  compact?: boolean
}

type ButtonState = 'idle' | 'loading' | 'success' | 'error'

export function AddToCartButton({
  variantId,
  availableForSale,
  compact = false,
}: AddToCartButtonProps) {
  const [state, setState] = useState<ButtonState>('idle')
  const { setTotalQuantity } = useCart()

  const height = compact ? 'min-h-[44px]' : 'min-h-[52px]'

  if (!availableForSale) {
    return (
      <button
        disabled
        className={`w-full ${height} rounded-xl bg-gray-100 text-sm font-semibold text-lunara-muted cursor-not-allowed`}
      >
        Sold Out
      </button>
    )
  }

  async function handleClick() {
    if (state === 'loading') return
    setState('loading')

    const result = await addToCartAction(variantId)

    if (result.success) {
      // Update header badge without requiring a full cart fetch
      if (result.totalQuantity !== undefined) {
        setTotalQuantity(result.totalQuantity)
      }
      setState('success')
      setTimeout(() => setState('idle'), 2500)
    } else {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  const baseClass = `w-full ${height} rounded-xl text-sm font-semibold transition-all duration-200`

  if (state === 'loading') {
    return (
      <button disabled className={`${baseClass} bg-lunara-rose/80 text-white cursor-not-allowed`}>
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Adding…
        </span>
      </button>
    )
  }

  if (state === 'success') {
    return (
      <button disabled className={`${baseClass} bg-green-500 text-white`}>
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Added to Cart
        </span>
      </button>
    )
  }

  if (state === 'error') {
    return (
      <button
        onClick={handleClick}
        className={`${baseClass} bg-red-500 text-white hover:bg-red-600`}
      >
        Try Again
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseClass} bg-lunara-rose text-white hover:bg-lunara-rose-dark active:scale-[0.98]`}
    >
      Add to Cart
    </button>
  )
}
