interface SkeletonProps {
  className?: string
}

/** Single shimmer block. Use className to set size. */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded ${className}`}
      aria-hidden="true"
    />
  )
}

/** Full product card placeholder — mirrors ProductCard dimensions exactly to prevent CLS. */
export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      {/* Image placeholder — same aspect-square as real card */}
      <div className="skeleton-shimmer aspect-square w-full rounded-2xl" />

      {/* Text lines */}
      <div className="pt-3 px-0.5 space-y-2">
        <div className="skeleton-shimmer h-3.5 w-3/4 rounded" />
        <div className="skeleton-shimmer h-3.5 w-1/2 rounded" />
      </div>

      {/* CTA placeholder */}
      <div className="skeleton-shimmer mt-3 h-10 w-full rounded-xl" />
    </div>
  )
}
