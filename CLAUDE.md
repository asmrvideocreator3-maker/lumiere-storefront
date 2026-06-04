# CLAUDE.md - Dropshipping E-Commerce Store Project

Standard operating procedures, tech stack definitions, and coding guidelines for the dropshipping storefront application.

## 1. Project Overview & Context
* **Goal:** Building a high-conversion, highly optimized dropshipping e-commerce storefront.
* **Current Status:** Infrastructure, branding, and fundamental storefront setup are already established. The focus is now on rapid feature iteration, conversion rate optimization (CRO), page layouts, and seamless API integrations.
* **Core Focus:** Fast load times, mobile-first responsiveness, seamless checkout flows, and dynamic product presentation.

---

## 2. Tech Stack & Architecture
* **Frontend:** Next.js 14+ (App Router) / React
* **Styling:** Tailwind CSS / Shadcn UI
* **State Management & Cart:** Zustand (Lightweight client-side store)
* **Backend / E-Commerce Engine:** Custom Storefront API / Next.js Commerce
* **Fulfillment / Dropshipping Agent:** Tangbuy (Handled via manual order processing, custom webhooks, or specific semi-automated fulfillment apps; no direct auto-sync provider API like AutoDS/DSers).
* **Analytics & Tracking:** Meta Pixel, Google Analytics 4, and TikTok Pixel events.

---

## 3. Core Development Commands

### Build & Development
* Start local dev server: `npm run dev`
* Production build: `npm run build`
* Linting: `npm run lint`

### Dependencies (npm)
* Add package: `npm install <package>`
* Add dev package: `npm install -D <package>`

---

## 4. Coding Guidelines & Standards

### Architecture & Code Style
* **Component Design:** Prioritize functional, reusable, component-driven architecture. Keep components highly modular (e.g., separate `ProductCard`, `AddToCartButton`, `CartDrawer`).
* **Performance First:** Implement aggressive image optimization (WebP/AVIF formats, explicit sizing, lazy loading) to maintain low Time-to-Interactive (TTI) scores.
* **Type Safety:** Strict typing for all product data structures, cart states, and API responses. Avoid using `any`.

### E-Commerce & Fulfillment Requirements
* **Tangbuy Workflow Support:** Ensure product schemas accommodate structural variations, product links, and specific properties required for agent sourcing. Provide clean data structures for exporting order/variant details when executing fulfillment batches.
* **Error Handling:** Gracefully handle API failures (e.g., out-of-stock variations, supplier timeouts, failed payment processing) with clean, user-friendly UI notifications.

---

## 5. UI & Styling Rules
* **Responsive Design:** Strict mobile-first implementation. Over 70% of traffic is expected to be mobile.
* **Theme & Tokens:** Utilize the established design system tokens for colors, typography, spacing, and border radiuses. Do not hardcode arbitrary values.
* **Loading States:** Provide immediate visual feedback for user actions via skeletons, spinners, or disabled state buttons (e.g., during checkout redirect or cart update).

---

## 6. Elite Skill Profile: Dropshipping Conversion & Growth Expert
When tasked with building, refining, or designing storefront features, you must operate as a world-class E-commerce CRO (Conversion Rate Optimization) Engineer. Your core directive is maximizing Average Order Value (AOV), Customer Lifetime Value (LTV), and minimizing Cart Abandonment.

### High-Conversion Implementation Rules:
1. **The 3-Second Rule:** Prioritize lightning-fast structural code. Optimize Critical CSS, implement aggressive image lazy-loading, and defer non-essential scripts so the landing page becomes interactive instantly.
2. **Frictionless Mobile Checkout:** Assume 80%+ of traffic is mobile. Buttons must be thumb-friendly (minimum 48px height), inputs must auto-trigger correct keyboards (e.g., `type="tel"` for phone numbers), and the "Add to Cart" CTA must stick to the bottom of the viewport on mobile product pages.
3. **Psychological Triggers & Trust:**
   * Automatically suggest optimal placements for dynamic social proof components (e.g., "X people bought this in the last 24 hours").
   * Build clean, non-spammy countdown timers or low-stock indicators that trigger real-time urgency.
   * Integrate clean layout zones for risk-reversal elements (e.g., "30-Day Money-Back Guarantee", "Secure SSL Encryption" badges) right below primary CTAs.
4. **Strategic Average Order Value (AOV) Boosters:**
   * **Pre-Purchase Upsells:** When coding product pages, include code structures for "Frequently Bought Together" bundle cross-sells.
   * **In-Cart Upsells:** Build the Zustand Cart Drawer to dynamically suggest a small add-on item or progress bar tracking toward "Free Shipping" (e.g., "Add $15 more for Free Shipping!").
5. **Data-Driven Event Tracking:** Never build a button or link to checkout without appending clean, robust client-side event listeners (Meta Pixel, GA4 tracking hooks) to capture `AddToCart`, `InitiateCheckout`, and custom funnel drop-offs.

---

## 7. Tangbuy Private-Label Sourcing SOP

Standard workflow for commissioning custom-branded products through Tangbuy for the Lunara line.

### Step 1 — Submit Lunara Brand Assets
* Provide the Tangbuy team with all vector artwork files (`.AI`, `.PDF`, `.PNG` at 300 DPI minimum).
* Clearly specify branding placement: brush handle engraving position, ferrule print area, and packaging dimensions.

### Step 2 — Customization Confirmation
* Request **laser engraving or silk screening** on brush handles with the Lunara wordmark or logo.
* Confirm **custom box printing** for retail packaging — specify pantone colors aligned with brand tokens (Rose: `#C4637A`, Gold: `#C9A96E`, Cream: `#FAF7F4`).
* Obtain a written confirmation of MOQ (minimum order quantity) and per-unit cost before approving.

### Step 3 — Sample Approval & Mass Production
* Request physical samples before authorizing mass production. Inspect bristle quality, ferrule finish, and packaging print accuracy.
* On sample approval, trigger mass production order in writing.
* Once fulfillment begins, **auto-sync tracking keys directly to Shopify** using the Tangbuy fulfillment app integration so order tracking updates automatically on the customer-facing store.

### Catalog Constants
The active launch SKUs are defined in `lib/catalog.ts`. Update handles and variant IDs there whenever new products are added or Shopify handles change.