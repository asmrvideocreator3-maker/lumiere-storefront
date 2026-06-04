export interface ComingSoonItem {
  id: string
  title: string
  teaser: string
  badge?: string
}

interface ComingSoonCardProps {
  item: ComingSoonItem
}

export function ComingSoonCard({ item }: ComingSoonCardProps) {
  return (
    <article className="flex flex-col h-full">
      {/* Placeholder image area */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-lunara-blush/15 border border-lunara-blush/40">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-4 text-center">
          {/* Lab / beaker icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="h-10 w-10 text-lunara-rose/30"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 00.75-1.409V8.5c0-.618-.503-1.118-1.132-1.01a48.394 48.394 0 00-6.836 0c-.63-.11-1.132.39-1.132 1.01V13.591c0 .505.2.99.562 1.338M19.8 15H4.2m0 0L3 16.5M19.8 15l1.2 1.5m-18 0l2.7 3h12.6l2.7-3m-18 0h18"
            />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lunara-rose/70">
            {item.badge ?? 'In Lab Testing'}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-1 pt-3 px-0.5">
        <h3 className="text-sm font-medium text-lunara-charcoal line-clamp-2 leading-snug flex-1">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-lunara-muted line-clamp-2 leading-relaxed">
          {item.teaser}
        </p>
      </div>

      {/* Non-interactive CTA */}
      <div
        className="mt-3 w-full rounded-xl py-2.5 text-center text-sm font-semibold min-h-[40px] flex items-center justify-center bg-gray-50 text-lunara-muted border border-gray-100 cursor-default"
        aria-label="Coming soon — not yet available for purchase"
      >
        Coming Soon
      </div>
    </article>
  )
}
