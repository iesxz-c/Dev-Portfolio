import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Keep this if you still use SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [], // Remove "i.scdn.co" since it's Spotify-specific
  },

  experimental: {
    // Leave blank or remove if unused
  },
};

export default nextConfig;

