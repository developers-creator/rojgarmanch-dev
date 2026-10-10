import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Default is 4 hours, which keeps replaced CMS images stale for too long.
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cms.rojgarmanch.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/category/samaj", destination: "/desh-samaj", permanent: true },
      { source: "/category/desh-ramailo-sansar", destination: "/ramailo-sansar", permanent: true },
      { source: "/category/:slug", destination: "/:slug", permanent: true },
      { source: "/category/:slug/page/:page", destination: "/:slug/page/:page", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;
