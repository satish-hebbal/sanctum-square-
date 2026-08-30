import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load the dev server's JS chunks and HMR
  // socket when testing against the network URL — Next blocks that by
  // default. Without this, the phone gets HTML and CSS but no JavaScript at
  // all, so nothing that depends on a click handler (the theme toggle, the
  // mobile menu's enhancements) actually runs.
  allowedDevOrigins: ["192.168.29.38"],
  images: {
    // Source media is pre-encoded to WebP by `npm run media`; the optimiser
    // only has to resize and (where supported) re-encode to AVIF.
    formats: ["image/avif", "image/webp"],
    // 75 is next/image's default and must stay listed; 88 is the site
    // setting, defined once in src/lib/media.ts.
    qualities: [75, 88],
    deviceSizes: [360, 420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [160, 240, 320, 480],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
