import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Handle SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;