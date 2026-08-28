import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide dev indicator (less noise in production)
  devIndicators: false,
  allowedDevOrigins: ["192.168.1.86"],

  // ===== Performance / SEO quick wins =====

  // Enable build-time compression for client bundles
  compress: true,

  // Disable source maps in production (smaller bundles, faster load)
  productionBrowserSourceMaps: false,

  // Enable React strict mode + SWC minification (default in Next 14+ but explicit)
  reactStrictMode: true,

  // Image optimization defaults
  images: {
    // Whitelist next/image to use Next.js built-in optimizer
    formats: ["image/avif", "image/webp"],
    // Allow responsive images up to 1920px wide
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers + caching for static assets (helps PageSpeed "Serve static assets with an efficient cache policy")
  async headers() {
    return [
      {
        // Long-cache all Next.js static chunks
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Allow images to be cached 1 day
        source: "/:path*.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      {
        // Security headers on all pages
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // Enable poweredByHeader off (hide X-Powered-By — minor security best practice)
  poweredByHeader: false,
};

export default nextConfig;
