import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductByHandle } from '@/lib/shopify'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductForm } from '@/components/product/ProductForm'

export const revalidate = 60

interface PageProps {
  params: { handle: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle)
  if (!product) return {}

  return {
    title: product.seo.title ?? product.title,
    description: product.seo.description ?? product.description.slice(0, 160),
    openGraph: {
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  }
}

// Trust badge definitions — matches CLAUDE.md trust signal requirements
const TRUST_BADGES = [
  {
    label: 'Cruelty-free',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-lunara-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    label: 'Dermatologist tested',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-lunara-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    label: 'Free shipping $50+',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-lunara-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: '30-day returns',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-lunara-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
]

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductByHandle(params.handle)

  if (!product) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-lunara-muted" aria-label="Breadcrumb">
        <a href="/" className="hover:text-lunara-rose transition-colors">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <a href="/#products" className="hover:text-lunara-rose transition-colors">
          All Products
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-lunara-charcoal truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Two-column layout — stacks on mobile, side-by-side on desktop */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        {/* ── Left: Image Gallery ── */}
        <ProductGallery images={product.images} title={product.title} />

        {/* ── Right: Product Info ── */}
        <div className="flex flex-col">

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-lunara-rose bg-lunara-blush/40 px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-lunara-charcoal leading-snug">
            {product.title}
          </h1>

          {/* Variant selector + price + Add to Cart — all client-side in ProductForm */}
          <div className="mt-4">
            <ProductForm product={product} />
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-2 gap-2.5">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white p-3 text-xs font-medium text-lunara-charcoal"
              >
                {badge.icon}
                {badge.label}
              </div>
            ))}
          </div>

          {/* Description */}
          {product.descriptionHtml && product.descriptionHtml !== '<p></p>' && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-lunara-muted mb-4">
                Product Details
              </h2>
              <div
                className="text-sm text-lunara-muted leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_strong]:text-lunara-charcoal [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          )}

        </div>
      </div>

      {/* Spacer prevents content sitting behind mobile sticky bar */}
      <div className="h-24 lg:hidden" aria-hidden="true" />
    </main>
  )
}
