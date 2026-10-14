import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Re-optimizing runs sharp in-process; keep optimized images for a day.
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cms.rojgarmanch.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "flagcdn.com" },
    ],
  },
  async redirects() {
    return [
      // Old `?page=N` category links move to the `/page/N/` form.
      {
        source: "/:slug((?!search|publication|api).*)",
        has: [{ type: "query", key: "page", value: "(?<page>[2-9]|[1-9][0-9]+)" }],
        destination: "/:slug/page/:page/",
        permanent: true,
      },
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
