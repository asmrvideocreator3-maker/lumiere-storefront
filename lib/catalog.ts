/**
 * Lunara launch catalog constants.
 *
 * Handles and variant IDs are used for CartDrawer cross-sell logic and
 * anywhere we need to reference specific products by identity rather than
 * by iterating the full catalog.
 *
 * Update these values whenever handles or variant IDs change in Shopify.
 */

export const CATALOG = {
  signatureSet: {
    handle: 'lunara-signature-14-piece-precision-collection',
    variantId: 'gid://shopify/ProductVariant/49163584766204',
    price: '32.00',
    compareAtPrice: '64.00',
    title: 'Lunara Signature 14-Piece Precision Collection',
  },
  essentialsSet: {
    handle: 'lunara-essentials-16-piece-rose-gold-brush-set',
    variantId: 'gid://shopify/ProductVariant/49163584798972',
    price: '14.99',
    compareAtPrice: '28.00',
    title: 'Lunara Essentials 16-Piece Rose Gold Brush Set',
  },
} as const

/** Cart subtotal threshold that unlocks free shipping. */
export const FREE_SHIPPING_THRESHOLD = 50
