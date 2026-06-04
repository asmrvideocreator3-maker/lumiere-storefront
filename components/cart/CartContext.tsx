'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { ShopifyCartDetails } from '@/lib/shopify'
import { getCartAction } from '@/app/actions/cart'

interface CartContextValue {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  /** Live item count — shown in the header badge. Updated on add + on drawer open. */
  totalQuantity: number
  setTotalQuantity: (qty: number) => void
  cartData: ShopifyCartDetails | null
  isLoadingCart: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [cartData, setCartData] = useState<ShopifyCartDetails | null>(null)
  const [isLoadingCart, setIsLoadingCart] = useState(false)

  const openDrawer = useCallback(async () => {
    setIsOpen(true)
    setIsLoadingCart(true)
    try {
      const data = await getCartAction()
      setCartData(data)
      if (data) setTotalQuantity(data.totalQuantity)
    } finally {
      setIsLoadingCart(false)
    }
  }, [])

  const closeDrawer = useCallback(() => setIsOpen(false), [])

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        totalQuantity,
        setTotalQuantity,
        cartData,
        isLoadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
