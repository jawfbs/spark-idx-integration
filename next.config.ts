import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.sparkplatform.com",
      },
      {
        protocol: "https",
        hostname: "*.sparkplatform.com",
      },
    ],
  },
};

export default nextConfig;
