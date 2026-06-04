'use server'

import { cookies } from 'next/headers'
import { createCart, addCartLines, getCart } from '@/lib/shopify'
import type { ShopifyCartDetails } from '@/lib/shopify'

const CART_COOKIE = 'lunara_cart'
const CART_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

export interface AddToCartResult {
  success: boolean
  checkoutUrl: string
  totalQuantity: number
  error?: string
}

/**
 * Server action — creates or updates a Shopify cart and stores the cart ID
 * in an HttpOnly cookie. Safe to call directly from client components.
 *
 * Analytics events (AddToCart pixel) should fire client-side AFTER this
 * returns success: true, never before.
 */
export async function addToCartAction(variantId: string): Promise<AddToCartResult> {
  try {
    const cookieStore = cookies()
    const existingCartId = cookieStore.get(CART_COOKIE)?.value

    let cart

    if (existingCartId) {
      try {
        cart = await addCartLines(existingCartId, variantId, 1)
      } catch {
        // Cart is expired or invalid — create a fresh one
        cart = await createCart(variantId, 1)
      }
    } else {
      cart = await createCart(variantId, 1)
    }

    cookieStore.set(CART_COOKIE, cart.id, {
      maxAge: CART_TTL_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    return {
      success: true,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
    }
  } catch (err) {
    console.error('[addToCartAction]', err)
    return {
      success: false,
      checkoutUrl: '',
      totalQuantity: 0,
      error: err instanceof Error ? err.message : 'Failed to add to cart',
    }
  }
}

/**
 * Server action — reads the cart cookie and fetches full cart details
 * (line items, totals) for the CartDrawer. Returns null when cart is empty
 * or the cookie has expired.
 */
export async function getCartAction(): Promise<ShopifyCartDetails | null> {
  const cartId = cookies().get(CART_COOKIE)?.value
  if (!cartId) return null

  try {
    return await getCart(cartId)
  } catch {
    return null
  }
}
