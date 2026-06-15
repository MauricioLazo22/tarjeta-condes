import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
      ],
    },
    {
      source: "/(.*)\.(webp|png|jpg|jpeg|svg|ico|gif|woff2|woff|ttf|otf|css|js)$",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

export default nextConfig;
