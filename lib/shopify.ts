/**
 * Shopify Storefront API client
 *
 * Provides typed helpers for fetching products and variants.
 * All variant IDs and SKUs are preserved as-returned from Shopify so they can
 * be used directly in Tangbuy fulfillment batch exports without transformation.
 *
 * Required env vars:
 *   SHOPIFY_STORE_DOMAIN              e.g. "your-store.myshopify.com"
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN   Storefront API public token
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifySelectedOption {
  name: string;  // e.g. "Color"
  value: string; // e.g. "Blue"
}

export interface ShopifyVariant {
  /** Shopify GID — e.g. "gid://shopify/ProductVariant/12345678" */
  id: string;
  /** SKU — primary matching field for Tangbuy sourcing batches */
  sku: string;
  /** Variant display title — e.g. "Blue / L" */
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: ShopifySelectedOption[];
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  image: ShopifyImage | null;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  /** Shopify GID — e.g. "gid://shopify/Product/12345678" */
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  vendor: string;
  productType: string;
  updatedAt: string;
  options: ShopifyProductOption[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  seo: {
    title: string | null;
    description: string | null;
  };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

/** Lightweight shape used on listing pages (collections, search, etc.) */
export interface ProductListItem {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  updatedAt: string;
  featuredImage: ShopifyImage | null;
  priceRange: ShopifyProduct['priceRange'];
  /** Variants included here so listing pages can export to Tangbuy without re-fetching */
  variants: Array<{
    id: string;
    sku: string;
    price: { amount: string; currencyCode: string };
    availableForSale: boolean;
    selectedOptions: ShopifySelectedOption[];
  }>;
}

/**
 * Flat row shape for Tangbuy fulfillment batch exports.
 * One row per variant — ready to paste into a CSV or send to an agent.
 */
export interface TangbuyVariantExport {
  /** Shopify product GID */
  productId: string;
  productTitle: string;
  productHandle: string;
  /** Shopify variant GID — matches the line item ID on an order */
  variantId: string;
  variantTitle: string;
  /** SKU used by Tangbuy to match and source the item */
  sku: string;
  price: string;
  currencyCode: string;
  /** Flattened option map — e.g. { Color: "Blue", Size: "L" } */
  options: Record<string, string>;
  availableForSale: boolean;
}

/** Pagination info returned alongside product list results */
export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

// ─── Internal response shapes (raw API → normalized) ─────────────────────────

interface RawImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface RawVariant {
  id: string;
  sku: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  image: RawImage | null;
}

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  vendor: string;
  productType: string;
  updatedAt: string;
  options: { id: string; name: string; values: string[] }[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  seo: { title: string | null; description: string | null };
  featuredImage: RawImage | null;
  images: { edges: { node: RawImage }[] };
  variants: { edges: { node: RawVariant }[] };
}

interface RawProductListItem {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  updatedAt: string;
  featuredImage: RawImage | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    edges: {
      node: {
        id: string;
        sku: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        selectedOptions: { name: string; value: string }[];
      };
    }[];
  };
}

// ─── Base fetch client ────────────────────────────────────────────────────────

const API_VERSION = '2025-01';

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}

async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: ShopifyFetchOptions): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      'Missing Shopify env vars. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local.'
    );
  }

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags ? { next: { tags } } : {}),
  });

  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API HTTP error: ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string; locations?: unknown }[];
  };

  if (json.errors?.length) {
    const messages = json.errors.map((e) => e.message).join(' | ');
    throw new Error(`Shopify GraphQL error: ${messages}`);
  }

  if (!json.data) {
    throw new Error('Shopify returned an empty data payload.');
  }

  return json.data;
}

// ─── GraphQL fragments ────────────────────────────────────────────────────────

const IMAGE_FIELDS = /* GraphQL */ `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

const VARIANT_FIELDS = /* GraphQL */ `
  fragment VariantFields on ProductVariant {
    id
    sku
    title
    availableForSale
    quantityAvailable
    selectedOptions {
      name
      value
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    image {
      ...ImageFields
    }
  }
`;

const PRODUCT_CORE_FIELDS = /* GraphQL */ `
  fragment ProductCoreFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    vendor
    productType
    updatedAt
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    seo {
      title
      description
    }
    featuredImage {
      ...ImageFields
    }
    images(first: 20) {
      edges {
        node {
          ...ImageFields
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          ...VariantFields
        }
      }
    }
  }
`;

// ─── GraphQL queries ──────────────────────────────────────────────────────────

const GET_ALL_PRODUCTS_QUERY = /* GraphQL */ `
  query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: UPDATED_AT, reverse: true) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          availableForSale
          updatedAt
          featuredImage {
            ...ImageFields
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                sku
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

const GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductCoreFields
    }
  }
  ${PRODUCT_CORE_FIELDS}
  ${VARIANT_FIELDS}
  ${IMAGE_FIELDS}
`;

// ─── Normalizers ──────────────────────────────────────────────────────────────

function normalizeImage(raw: RawImage): ShopifyImage {
  return {
    url: raw.url,
    altText: raw.altText,
    width: raw.width,
    height: raw.height,
  };
}

function normalizeVariant(raw: RawVariant): ShopifyVariant {
  return {
    id: raw.id,
    sku: raw.sku,
    title: raw.title,
    availableForSale: raw.availableForSale,
    quantityAvailable: raw.quantityAvailable,
    selectedOptions: raw.selectedOptions,
    price: raw.price,
    compareAtPrice: raw.compareAtPrice,
    image: raw.image ? normalizeImage(raw.image) : null,
  };
}

function normalizeProduct(raw: RawProduct): ShopifyProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    availableForSale: raw.availableForSale,
    tags: raw.tags,
    vendor: raw.vendor,
    productType: raw.productType,
    updatedAt: raw.updatedAt,
    options: raw.options,
    priceRange: raw.priceRange,
    seo: raw.seo,
    featuredImage: raw.featuredImage ? normalizeImage(raw.featuredImage) : null,
    images: raw.images.edges.map(({ node }) => normalizeImage(node)),
    variants: raw.variants.edges.map(({ node }) => normalizeVariant(node)),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch a paginated list of products.
 *
 * Variants on each item include `id` and `sku` so you can generate Tangbuy
 * export rows from listing data without an extra per-product fetch.
 *
 * @param pageSize - Max products to return (1–250). Defaults to 50.
 * @param cursor   - Pass `pageInfo.endCursor` from a previous call to paginate forward.
 */
export async function getAllProducts(
  pageSize = 50,
  cursor?: string
): Promise<{ products: ProductListItem[]; pageInfo: PageInfo }> {
  type ResponseData = {
    products: {
      pageInfo: PageInfo;
      edges: { node: RawProductListItem }[];
    };
  };

  const data = await shopifyFetch<ResponseData>({
    query: GET_ALL_PRODUCTS_QUERY,
    variables: { first: pageSize, after: cursor ?? null },
    tags: ['products'],
  });

  const products: ProductListItem[] = data.products.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    availableForSale: node.availableForSale,
    updatedAt: node.updatedAt,
    featuredImage: node.featuredImage ? normalizeImage(node.featuredImage) : null,
    priceRange: node.priceRange,
    variants: node.variants.edges.map(({ node: v }) => ({
      id: v.id,
      sku: v.sku,
      price: v.price,
      availableForSale: v.availableForSale,
      selectedOptions: v.selectedOptions,
    })),
  }));

  return { products, pageInfo: data.products.pageInfo };
}

/**
 * Fetch a single product by URL handle with full variant, image, and SEO data.
 *
 * Returns `null` when the product doesn't exist or isn't published to
 * the Storefront API channel.
 */
export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  type ResponseData = { product: RawProduct | null };

  const data = await shopifyFetch<ResponseData>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
  });

  return data.product ? normalizeProduct(data.product) : null;
}

/**
 * Flatten all variants of a product into Tangbuy fulfillment export rows.
 *
 * Each row is one variant with its Shopify GID, SKU, price, and a flat
 * options map — suitable for CSV export or a batch fulfillment payload.
 *
 * @example
 *   const product = await getProductByHandle('wireless-earbuds');
 *   const rows = product ? getTangbuyExportRows(product) : [];
 *   // rows[0] → { variantId: 'gid://...', sku: 'WE-BLK-M', options: { Color: 'Black' }, ... }
 */
export function getTangbuyExportRows(
  product: ShopifyProduct | ProductListItem
): TangbuyVariantExport[] {
  return product.variants.map((variant) => ({
    productId: product.id,
    productTitle: product.title,
    productHandle: product.handle,
    variantId: variant.id,
    variantTitle: 'title' in variant ? variant.title : variant.selectedOptions.map((o) => o.value).join(' / '),
    sku: variant.sku,
    price: variant.price.amount,
    currencyCode: variant.price.currencyCode,
    options: Object.fromEntries(
      variant.selectedOptions.map((o) => [o.name, o.value])
    ),
    availableForSale: variant.availableForSale,
  }));
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}

const CREATE_CART_MUTATION = /* GraphQL */ `
  mutation CreateCart($variantId: ID!, $quantity: Int!) {
    cartCreate(input: {
      lines: [{ quantity: $quantity, merchandiseId: $variantId }]
    }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_CART_LINES_MUTATION = /* GraphQL */ `
  mutation AddCartLines($cartId: ID!, $variantId: ID!, $quantity: Int!) {
    cartLinesAdd(
      cartId: $cartId
      lines: [{ quantity: $quantity, merchandiseId: $variantId }]
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/** Create a new Shopify cart with one line item. */
export async function createCart(
  variantId: string,
  quantity = 1
): Promise<ShopifyCart> {
  type Data = {
    cartCreate: {
      cart: RawCart;
      userErrors: { field: string; message: string }[];
    };
  };

  const data = await shopifyFetch<Data>({
    query: CREATE_CART_MUTATION,
    variables: { variantId, quantity },
    cache: 'no-store',
  });

  if (data.cartCreate.userErrors.length) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join(', ')
    );
  }

  return data.cartCreate.cart;
}

/** Add a variant to an existing Shopify cart. */
export async function addCartLines(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<ShopifyCart> {
  type Data = {
    cartLinesAdd: {
      cart: RawCart;
      userErrors: { field: string; message: string }[];
    };
  };

  const data = await shopifyFetch<Data>({
    query: ADD_CART_LINES_MUTATION,
    variables: { cartId, variantId, quantity },
    cache: 'no-store',
  });

  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((e) => e.message).join(', ')
    );
  }

  return data.cartLinesAdd.cart;
}

// ─── Cart details (for CartDrawer) ────────────────────────────────────────────

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  merchandise: {
    id: string;
    title: string;
    image: ShopifyImage | null;
    product: {
      handle: string;
      title: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCartDetails {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: ShopifyCartLine[];
}

const GET_CART_QUERY = /* GraphQL */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  ...ImageFields
                }
                product {
                  handle
                  title
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

/** Fetch full cart details including line items. Returns null if cart not found. */
export async function getCart(
  cartId: string
): Promise<ShopifyCartDetails | null> {
  interface RawCartLine {
    id: string;
    quantity: number;
    cost: { totalAmount: { amount: string; currencyCode: string } };
    merchandise: {
      id: string;
      title: string;
      image: RawImage | null;
      product: { handle: string; title: string };
      price: { amount: string; currencyCode: string };
    };
  }
  interface RawCartDetails {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: { totalAmount: { amount: string; currencyCode: string } };
    lines: { edges: { node: RawCartLine }[] };
  }
  type ResponseData = { cart: RawCartDetails | null };

  const data = await shopifyFetch<ResponseData>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
  });

  if (!data.cart) return null;

  return {
    id: data.cart.id,
    checkoutUrl: data.cart.checkoutUrl,
    totalQuantity: data.cart.totalQuantity,
    cost: data.cart.cost,
    lines: data.cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      cost: node.cost,
      merchandise: {
        id: node.merchandise.id,
        title: node.merchandise.title,
        image: node.merchandise.image ? normalizeImage(node.merchandise.image) : null,
        product: node.merchandise.product,
        price: node.merchandise.price,
      },
    })),
  };
}
