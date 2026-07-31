import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.*.*.*"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5123/api/:path*",
      },
      {
        source: "/openapi/:path*",
        destination: "http://localhost:5123/openapi/:path*",
      },
    ];
  },
};

export default nextConfig;
