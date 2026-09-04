import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  /**
   * Advertising used to be a top-level section. It is now a leaf page under
   * Production, where the scope-of-work document puts it, so the old URL is
   * redirected rather than left to 404 — anything already linking to it keeps
   * working and passes its equity to the new address.
   */
  async redirects() {
    return [
      {
        source: "/:lang(ne|en)/advertising",
        destination: "/:lang/production/advertising",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
