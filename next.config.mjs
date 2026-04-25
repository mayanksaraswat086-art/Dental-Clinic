import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',

  // Use src directory
  // Note: This is automatically detected by Next.js when src/app exists

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compress: true,

  // Prefetching optimization
  experimental: {
    optimizeCss: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home-page',
        permanent: false,
      },
    ];
  }
};
export default nextConfig;