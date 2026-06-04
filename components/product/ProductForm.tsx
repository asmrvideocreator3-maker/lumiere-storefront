'use client'

import { useState } from 'react'
import type { ShopifyProduct, ShopifyVariant } from '@/lib/shopify'
import { VariantSelector } from './VariantSelector'
import { AddToCartButton } from './AddToCartButton'

interface ProductFormProps {
  product: ShopifyProduct
}

/**
 * Client component that owns variant selection state and renders:
 * - Dynamic price (updates on variant change)
 * - Variant option buttons
 * - Desktop Add to Cart button
 * - Mobile sticky bottom CTA bar
 *
 * Keeping all three in one component ensures the selected variantId is
 * always in sync between the selector and both button instances.
 */
export function ProductForm({ product }: ProductFormProps) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(
    // Default to first available variant, fall back to first variant
    product.variants.find((v) => v.availableForSale) ?? product.variants[0]
  )

  const { price, compareAtPrice } = selectedVariant

  const discountPercent =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount)
      ? Math.round(
          (1 - parseFloat(price.amount) / parseFloat(compareAtPrice.amount)) * 100
        )
      : null

  return (
    <>
      {/* ── Price — re-renders on variant change ── */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-2xl font-semibold text-lunara-rose">
          ${parseFloat(price.amount).toFixed(2)}{' '}
          <span className="text-sm font-normal text-lunara-muted">
            {price.currencyCode}
          </span>
        </span>

        {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
          <span className="text-base text-lunara-muted line-through">
            ${parseFloat(compareAtPrice.amount).toFixed(2)}
          </span>
        )}

        {discountPercent && discountPercent > 0 && (
          <span className="text-xs font-bold text-white bg-lunara-rose px-2.5 py-1 rounded-full">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* ── Availability tag ── */}
      {!selectedVariant.availableForSale && (
        <p className="text-sm font-medium text-red-500 mt-1">
          This variant is currently sold out
        </p>
      )}

      {/* ── Variant selector ── */}
      <div className="mt-5">
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
      </div>

      {/* ── Desktop Add to Cart (hidden on mobile — mobile uses sticky bar) ── */}
      <div className="mt-6 hidden lg:block">
        <AddToCartButton
          variantId={selectedVariant.id}
          availableForSale={selectedVariant.availableForSale}
        />
      </div>

      {/* ── Mobile sticky CTA bar ──
          Fixed to the bottom of the viewport on mobile.
          Uses safe-area-inset-bottom so it clears the iOS home indicator.
          lg:hidden ensures it disappears on desktop where the inline button is shown. */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-lg">
          <AddToCartButton
            variantId={selectedVariant.id}
            availableForSale={selectedVariant.availableForSale}
            compact
          />
        </div>
      </div>
    </>
  )
}
