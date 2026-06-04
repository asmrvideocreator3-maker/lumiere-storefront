export default function ProductLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="skeleton-shimmer h-3.5 w-10 rounded" />
        <div className="skeleton-shimmer h-3.5 w-2 rounded" />
        <div className="skeleton-shimmer h-3.5 w-24 rounded" />
        <div className="skeleton-shimmer h-3.5 w-2 rounded" />
        <div className="skeleton-shimmer h-3.5 w-40 rounded" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery skeleton */}
        <div className="space-y-3">
          <div className="skeleton-shimmer aspect-square w-full rounded-2xl" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-shimmer h-16 w-16 flex-shrink-0 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="space-y-4">
          <div className="skeleton-shimmer h-4 w-20 rounded-full" />
          <div className="skeleton-shimmer h-8 w-3/4 rounded-lg" />
          <div className="skeleton-shimmer h-8 w-1/2 rounded-lg" />
          <div className="skeleton-shimmer h-7 w-24 rounded-full mt-2" />

          {/* Variant buttons skeleton */}
          <div className="pt-2 space-y-3">
            <div className="skeleton-shimmer h-4 w-16 rounded" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-shimmer h-9 w-24 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Button skeleton */}
          <div className="skeleton-shimmer hidden lg:block h-13 w-full rounded-xl mt-2" />

          {/* Trust badges skeleton */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-shimmer h-11 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
