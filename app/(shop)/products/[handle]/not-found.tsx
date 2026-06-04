import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-lunara-rose mb-4">
        404
      </p>
      <h1 className="font-display text-3xl font-semibold text-lunara-charcoal mb-3">
        Product not found
      </h1>
      <p className="text-lunara-muted mb-8 max-w-sm mx-auto">
        This product may have been removed or the link is incorrect.
      </p>
      <Link
        href="/#products"
        className="inline-flex items-center justify-center min-h-[48px] bg-lunara-rose text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-lunara-rose-dark transition-colors"
      >
        Back to All Products
      </Link>
    </main>
  )
}
