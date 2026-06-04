import { ProductCardSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-lunara-blush/40 via-lunara-cream to-white py-16 sm:py-20 lg:py-24 px-4">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="skeleton-shimmer h-3 w-24 rounded-full mx-auto" />
          <div className="skeleton-shimmer h-12 sm:h-14 w-4/5 rounded-xl mx-auto" />
          <div className="skeleton-shimmer h-12 sm:h-14 w-3/5 rounded-xl mx-auto" />
          <div className="skeleton-shimmer h-4 w-2/3 rounded mx-auto" />
          <div className="skeleton-shimmer h-12 w-44 rounded-full mx-auto mt-8" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="skeleton-shimmer h-8 w-32 rounded-lg mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  )
}
