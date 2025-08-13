import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // {
          //   key: "X-Content-Type-Options",
          //   value: "nosniff",
          // },
          // {
          //   key: "X-Frame-Options",
          //   value: "SAMEORIGIN",
          // },
          // {
          //   key: "X-XSS-Protection",
          //   value: "1; mode=block",
          // },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://host.domain.local https://host.other.local;",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
