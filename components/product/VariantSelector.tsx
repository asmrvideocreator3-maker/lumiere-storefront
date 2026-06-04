'use client'

import type { ShopifyProduct, ShopifyVariant } from '@/lib/shopify'

interface VariantSelectorProps {
  product: ShopifyProduct
  selectedVariant: ShopifyVariant
  onVariantChange: (variant: ShopifyVariant) => void
}

/**
 * Strip long supplier disclaimer text that Tangbuy/dropshipping suppliers
 * sometimes embed in variant option values. Truncates at 40 chars as a safety net
 * until the titles are cleaned up in Shopify Admin.
 */
function cleanOptionValue(value: string): string {
  // Remove parenthetical content that looks like a legal disclaimer
  const cleaned = value.replace(/\s*\((?:This product|Product is)[^)]*\)/gi, '').trim()
  return cleaned.length > 40 ? cleaned.slice(0, 40) + '…' : cleaned
}

export function VariantSelector({
  product,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  // Hide the selector entirely if there is only one variant with no meaningful options
  const hasOptions = product.options.some((o) => o.values.length > 1)
  if (!hasOptions) return null

  function handleSelect(optionName: string, optionValue: string) {
    // Merge the new selection into the current option set
    const current = Object.fromEntries(
      selectedVariant.selectedOptions.map((o) => [o.name, o.value])
    )
    current[optionName] = optionValue

    const match = product.variants.find((v) =>
      v.selectedOptions.every((o) => current[o.name] === o.value)
    )
    if (match) onVariantChange(match)
  }

  return (
    <div className="space-y-4">
      {product.options.map((option) => {
        if (option.values.length <= 1) return null

        const selectedValue = selectedVariant.selectedOptions.find(
          (o) => o.name === option.name
        )?.value

        return (
          <div key={option.id}>
            <p className="mb-2 text-sm font-medium text-lunara-charcoal">
              {option.name}
              {selectedValue && (
                <span className="ml-2 font-normal text-lunara-muted">
                  — {cleanOptionValue(selectedValue)}
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selectedValue === value
                const isAvailable = product.variants.some(
                  (v) =>
                    v.availableForSale &&
                    v.selectedOptions.some(
                      (o) => o.name === option.name && o.value === value
                    )
                )
                const display = cleanOptionValue(value)

                return (
                  <button
                    key={value}
                    onClick={() => handleSelect(option.name, value)}
                    disabled={!isAvailable}
                    title={value} // Full value on hover in case it's truncated
                    className={[
                      'px-3.5 py-2 text-xs sm:text-sm border rounded-xl transition-all duration-150 font-medium',
                      isSelected
                        ? 'border-lunara-rose bg-lunara-rose text-white shadow-sm'
                        : isAvailable
                        ? 'border-gray-200 bg-white text-lunara-charcoal hover:border-lunara-rose/50 hover:bg-lunara-blush/20'
                        : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through',
                    ].join(' ')}
                  >
                    {display}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
