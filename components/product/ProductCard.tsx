import Image from 'next/image'
import Link from 'next/link'
import type { ProductListItem } from '@/lib/shopify'

interface ProductCardProps {
  product: ProductListItem
  /**
   * Pass true for the first 4 cards in the grid — tells next/image to eager-load
   * these above-the-fold images, which directly improves LCP score.
   */
  priority?: boolean
}

function formatPrice(amount: string): string {
  return `$${parseFloat(amount).toFixed(2)}`
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { minVariantPrice, maxVariantPrice } = product.priceRange
  const hasRange = minVariantPrice.amount !== maxVariantPrice.amount
  const priceDisplay = hasRange
    ? `From ${formatPrice(minVariantPrice.amount)}`
    : formatPrice(minVariantPrice.amount)

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      aria-label={`View ${product.title}`}
    >
      <article className="flex flex-col h-full">
        {/* ── Image ── */}
        {/* Fixed aspect-ratio container prevents CLS — space is always reserved */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-lunara-blush/30">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
              priority={priority}
            />
          ) : (
            /* Placeholder when no image is set in Shopify */
            <div className="absolute inset-0 flex items-center justify-center bg-lunara-blush/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-10 w-10 text-lunara-rose/20"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}

          {/* Sold-out overlay */}
          {!product.availableForSale && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-lunara-charcoal shadow-sm">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* ── Product info ── */}
        <div className="flex flex-col flex-1 pt-3 px-0.5">
          <h3 className="text-sm font-medium text-lunara-charcoal line-clamp-2 leading-snug flex-1">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-lunara-rose">
            {priceDisplay}
          </p>
        </div>

        {/* ── CTA ──
            Mobile (< sm): always visible — tap targets need to be present
            Desktop (sm+): fades in on hover for a cleaner grid look
        */}
        <div
          className={[
            'mt-3 w-full rounded-xl py-2.5 text-center text-sm font-semibold',
            'min-h-[40px] flex items-center justify-center',
            product.availableForSale
              ? 'bg-lunara-rose text-white'
              : 'bg-gray-100 text-lunara-muted cursor-not-allowed',
            // Always visible on mobile, hover-reveal on desktop
            'sm:opacity-0 sm:translate-y-1 sm:transition-all sm:duration-200',
            'sm:group-hover:opacity-100 sm:group-hover:translate-y-0',
          ].join(' ')}
          aria-hidden="true"
        >
          {product.availableForSale ? 'Shop Now' : 'Sold Out'}
        </div>
      </article>
    </Link>
  )
}
