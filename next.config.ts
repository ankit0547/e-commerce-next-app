import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["www.gravatar.com"],
};

export default nextConfig;
