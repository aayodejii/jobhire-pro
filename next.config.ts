import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds (temporary solution)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enable this if you want to ignore TypeScript errors during build
    ignoreBuildErrors: false, // Set to true only if needed
  },
};

export default nextConfig;