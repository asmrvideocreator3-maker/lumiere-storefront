import { ProductCard } from './ProductCard'
import { ComingSoonCard, type ComingSoonItem } from './ComingSoonCard'
import type { ProductListItem } from '@/lib/shopify'

interface ProductGridProps {
  products: ProductListItem[]
  /** Optional static teaser cards appended after live products. */
  comingSoonItems?: ComingSoonItem[]
}

export function ProductGrid({ products, comingSoonItems = [] }: ProductGridProps) {
  const totalItems = products.length + comingSoonItems.length

  if (totalItems === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lunara-muted text-sm">No products available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          // Eager-load first 4 cards to hit LCP targets
          priority={index < 4}
        />
      ))}
      {comingSoonItems.map((item) => (
        <ComingSoonCard key={item.id} item={item} />
      ))}
    </div>
  )
}
