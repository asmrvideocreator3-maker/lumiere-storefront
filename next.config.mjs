/** @type {import('next').NextConfig} */
const config = {
  // Produces a self-contained Node.js server in .next/standalone/
  // Deploy that folder anywhere Node.js runs (Railway, Render, VPS, Docker)
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
    // Prefer AVIF, fall back to WebP — best compression for product images
    formats: ['image/avif', 'image/webp'],
  },
}

export default config
